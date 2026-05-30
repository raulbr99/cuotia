// Pipeline de generación de un post: noticias → redacción → gate de QA → portada → insert.
// Lo invocan el cron semanal (/api/cron/generate-post) y el botón manual (/api/blog/generate).
import { fetchLatestFiscalNews, type NewsResult } from "@/lib/news/perplexity";
import { writePost, reviewPost, WRITER_MODEL } from "@/lib/generation/write-post";
import { generateAndStoreCover } from "@/lib/generation/cover-image";
import { dbSlugExists, insertDbPost } from "@/lib/blog-db";
import { getPostBySlug } from "@/lib/blog";

export interface PipelineResult {
  ok: boolean;
  status: "published" | "draft" | "skipped";
  slug?: string;
  title?: string;
  qaScore?: number;
  issues?: string[];
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

export async function runGenerationPipeline(injectedNews?: NewsResult): Promise<PipelineResult> {
  // 1. Noticias (sonar vía OpenRouter, o inyectadas para pruebas)
  const news = injectedNews ?? (await fetchLatestFiscalNews());
  if (!news || news.summary.trim().length < 200) {
    return {
      ok: false,
      status: "skipped",
      reason: "Sin contenido de noticias suficiente (¿OPENROUTER_API_KEY o búsqueda vacía?)",
    };
  }

  // 2. Redacción
  const draft = await writePost(news);
  if (!draft) {
    return { ok: false, status: "skipped", reason: "Fallo al redactar (¿falta OPENROUTER_API_KEY?)" };
  }

  // 3. Gate de QA automático (sin revisión humana, pero no publicamos basura)
  const review = await reviewPost(draft, news);
  const threshold = Number(process.env.BLOG_QA_THRESHOLD || 60);
  const score = review?.confidence ?? 0;
  const publishable = (review?.publishable ?? false) && score >= threshold;
  const status: "published" | "draft" = publishable ? "published" : "draft";

  // 4. Slug único + portada (no bloqueante: si falla, post sin imagen)
  const slug = await uniqueSlug(draft.slug || draft.title);
  const imageUrl = await generateAndStoreCover(draft.imagePrompt, slug);

  // 5. Insert
  const ins = await insertDbPost({
    slug,
    title: draft.title,
    description: draft.description,
    content: draft.content,
    category: draft.category || "Novedades",
    tag: draft.tag || "Actualidad",
    imageUrl,
    sourceUrls: news.citations,
    model: WRITER_MODEL,
    qaScore: score,
    status,
  });
  if (!ins.ok) {
    return { ok: false, status: "skipped", reason: `Error al guardar en Supabase: ${ins.error}` };
  }

  return {
    ok: true,
    status,
    slug,
    title: draft.title,
    qaScore: score,
    issues: review?.issues,
    reason:
      status === "draft"
        ? `Guardado como borrador (QA ${score} < ${threshold}); requiere revisión manual antes de publicar`
        : undefined,
  };
}
