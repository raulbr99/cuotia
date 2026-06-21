// Pipeline de generación de un post: tema (backlog) → redacción → gate de QA → portada → insert.
// Lo invocan el cron diario (/api/cron/generate-post) y el botón manual (/api/blog/generate).
import { fetchLatestFiscalNews, type NewsResult } from "@/lib/news/perplexity";
import { writePost, reviewPost, WRITER_MODEL, type TopicInput } from "@/lib/generation/write-post";
import { generateAndStoreCover, buildCoverPrompt } from "@/lib/generation/cover-image";
import { dbSlugExists, insertDbPost } from "@/lib/blog-db";
import { getNextTopic, markTopicUsed, pendingTopicCount } from "@/lib/generation/blog-topics-db";
import { getPostBySlug, relatedToText } from "@/lib/blog";
import { getAllPublishedPosts } from "@/lib/blog-all";
import { submitToIndexNow, INDEXNOW_HOST } from "@/lib/indexnow";

export interface PipelineResult {
  ok: boolean;
  status: "published" | "draft" | "skipped";
  slug?: string;
  title?: string;
  topic?: string;
  qaScore?: number;
  issues?: string[];
  remainingTopics?: number;
  reason?: string;
}

function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = slugify(base) || `post-${Date.now()}`;
  let n = 2;
  while (getPostBySlug(slug) || (await dbSlugExists(slug))) {
    slug = `${slugify(base)}-${n++}`;
    if (n > 25) {
      slug = `${slugify(base)}-${Date.now()}`;
      break;
    }
  }
  return slug;
}

export async function runGenerationPipeline(
  injectedNews?: NewsResult | null,
  injectedTopic?: TopicInput,
): Promise<PipelineResult> {
  // 1. Tema: del backlog planificado (garantiza diversidad). Si se agota, se
  //    deriva de las noticias recientes como respaldo. injectedTopic permite probar.
  const topic = injectedTopic ? null : await getNextTopic();
  let news: NewsResult | null = injectedNews ?? null;
  let effectiveTopic: TopicInput;

  if (injectedTopic) {
    effectiveTopic = injectedTopic;
  } else if (topic) {
    effectiveTopic = topic;
  } else {
    news = news ?? (await fetchLatestFiscalNews());
    if (!news || news.summary.trim().length < 200) {
      return { ok: false, status: "skipped", reason: "Backlog de temas vacío y sin noticias suficientes" };
    }
    effectiveTopic = {
      title: "Novedades fiscales recientes para autónomos",
      angle: "Explica las novedades fiscales más relevantes de las últimas semanas para el autónomo",
      internalLink: "/calendario-fiscal",
      category: "Novedades",
    };
  }

  // 2. Redacción sobre el tema (news como contexto opcional + posts afines para
  //    enlazado interno entre artículos → clusters temáticos).
  const allPosts = await getAllPublishedPosts();
  const relatedPosts = relatedToText(
    `${effectiveTopic.title} ${effectiveTopic.targetKeyword ?? ""} ${effectiveTopic.category ?? ""}`,
    allPosts,
    6,
  ).map((p) => ({ title: p.title, slug: p.slug }));
  const draft = await writePost(effectiveTopic, news, relatedPosts);
  if (!draft) {
    return { ok: false, status: "skipped", reason: "Fallo al redactar (¿falta OPENROUTER_API_KEY?)" };
  }

  // 3. Gate de QA automático (sin revisión humana, pero no publicamos basura)
  const review = await reviewPost(draft, news?.summary ?? effectiveTopic.angle);
  const threshold = Number(process.env.BLOG_QA_THRESHOLD || 60);
  const score = review?.confidence ?? 0;
  const publishable = (review?.publishable ?? false) && score >= threshold;
  const status: "published" | "draft" = publishable ? "published" : "draft";

  // 4. Slug único + portada (no bloqueante: si falla, post sin imagen)
  const slug = await uniqueSlug(draft.slug || draft.title);
  const imageUrl = await generateAndStoreCover(buildCoverPrompt(draft.imagePrompt, slug), slug);

  // 5. Insert
  const ins = await insertDbPost({
    slug,
    title: draft.title,
    description: draft.description,
    content: draft.content,
    category: draft.category || effectiveTopic.category || "Guía",
    tag: draft.tag || "Autónomos",
    imageUrl,
    sourceUrls: news?.citations ?? [],
    model: WRITER_MODEL,
    qaScore: score,
    status,
  });
  if (!ins.ok) {
    return { ok: false, status: "skipped", reason: `Error al guardar en Supabase: ${ins.error}` };
  }

  // 6. Marcar el tema como usado para no repetirlo
  if (topic) await markTopicUsed(topic.id, slug);
  const remainingTopics = await pendingTopicCount();

  // 7. Ping inmediato a IndexNow (Bing/Yandex/…) con la URL recién publicada,
  //    sin esperar al cron diario de las 9:00. Best-effort: si falla no afecta
  //    a la generación. (Google no usa IndexNow; ahí se confía en el sitemap.)
  if (status === "published") {
    try {
      await submitToIndexNow([
        `https://${INDEXNOW_HOST}/blog/${slug}`,
        `https://${INDEXNOW_HOST}/blog`,
      ]);
    } catch {
      // ignorar: la indexación no debe tumbar la publicación
    }
  }

  return {
    ok: true,
    status,
    slug,
    title: draft.title,
    topic: effectiveTopic.title,
    qaScore: score,
    issues: review?.issues,
    remainingTopics,
    reason:
      status === "draft"
        ? score < threshold
          ? `Borrador: QA ${score} por debajo del umbral ${threshold}; requiere revisión manual`
          : `Borrador: el revisor lo marcó NO publicable (QA ${score}); revisar los issues antes de publicar`
        : remainingTopics > 0 && remainingTopics <= 5
          ? `Publicado. Quedan ${remainingTopics} temas en el backlog — conviene ampliarlo pronto.`
          : undefined,
  };
}
