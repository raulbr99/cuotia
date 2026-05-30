// Redacción y revisión (QA) del post con el AI SDK + OpenRouter.
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import { z } from "zod";
import type { NewsResult } from "@/lib/news/perplexity";
import { CUOTIA_FACTS, CUOTIA_PAGES } from "@/lib/generation/facts";

export const WRITER_MODEL = process.env.BLOG_WRITER_MODEL || "anthropic/claude-sonnet-4.6";

const postSchema = z.object({
  title: z.string().describe("Titular claro y específico, 30-70 caracteres, sin clickbait"),
  slug: z.string().describe("kebab-case, solo a-z 0-9 y guiones, derivado del titular"),
  description: z.string().describe("Meta description, 110-155 caracteres, con la keyword y el año"),
  category: z.string().describe("Una de: Novedades, Normativa, Análisis, Guía, Comparativas"),
  tag: z.string().describe("Etiqueta corta de 1-2 palabras, p.ej. 'RETA', 'IRPF', 'Verifactu'"),
  content: z
    .string()
    .describe(
      "Cuerpo en MARKDOWN: ## secciones, párrafos claros, al menos una tabla, enlaces internos [texto](/ruta), y un párrafo final de aviso de que es informativo (no asesoramiento). 600-1000 palabras.",
    ),
  imagePrompt: z.string().describe("Prompt en inglés para generar una portada editorial abstracta, sin texto"),
});

export type GeneratedPost = z.infer<typeof postSchema>;

const reviewSchema = z.object({
  // Sin .min()/.max(): Anthropic structured output no soporta minimum/maximum en números.
  confidence: z.number().describe("Confianza de 0 a 100 en que el post es correcto y publicable"),
  publishable: z.boolean().describe("true solo si no hay errores fácticos ni cifras inventadas"),
  issues: z.array(z.string()).describe("Lista de problemas detectados (vacía si todo correcto)"),
});

export type PostReview = z.infer<typeof reviewSchema>;

function openrouter() {
  return createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });
}

// Routing de OpenRouter: ignora Azure (devuelve "resource blocked" para esta
// cuenta) y prefiere el endpoint directo del proveedor del modelo.
const OR_SETTINGS = {
  provider: { ignore: ["azure"], allow_fallbacks: true },
};

// OpenRouter enruta a distintos proveedores en cada llamada; algunos fallan de
// forma transitoria (rate limit, proveedor bloqueado). Reintentar suele caer en
// un proveedor sano.
async function withRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      console.error(`[blog-gen] intento ${i + 1}/${attempts} falló:`, e instanceof Error ? e.message : e);
    }
  }
  throw lastErr;
}

// Tema a desarrollar, elegido por el planificador (backlog) o derivado de noticias.
export interface TopicInput {
  title: string;
  targetKeyword?: string;
  angle?: string;
  internalLink?: string;
  category?: string;
}

export async function writePost(topic: TopicInput, news?: NewsResult | null): Promise<GeneratedPost | null> {
  if (!process.env.OPENROUTER_API_KEY) return null;

  const newsBlock =
    news && news.summary.trim()
      ? `## NOVEDADES RECIENTES (contexto; úsalas SOLO si son relevantes para este tema)
${news.summary}
${news.citations.length ? `Fuentes: ${news.citations.slice(0, 6).join(", ")}` : ""}`
      : "";

  const prompt = `Eres redactor de Cuotia (cuotia.es), web de calculadoras fiscales para autónomos en España. Escribe UN artículo de blog en español sobre el tema indicado.

## TEMA A DESARROLLAR
Título orientativo: ${topic.title}
${topic.targetKeyword ? `Keyword objetivo: ${topic.targetKeyword}` : ""}
${topic.angle ? `Ángulo/enfoque: ${topic.angle}` : ""}
${topic.internalLink ? `Enlaza de forma natural a esta página de Cuotia: ${topic.internalLink}` : ""}

${newsBlock}

## ${CUOTIA_FACTS}

## ${CUOTIA_PAGES}

## REGLAS INNEGOCIABLES
1. Cíñete al TEMA indicado y resuélvelo de forma completa y útil (responde la intención de búsqueda del lector).
2. NO inventes cifras. Usa SOLO los datos verificados de arriba o cifras de las novedades. Si no puedes confirmar una cifra, dilo en vez de inventarla.
3. Tono Cuotia: directo, claro, sin jerga ni paternalismo. Nada de relleno.
4. Estructura markdown: 4-6 secciones con ##, al menos UNA tabla útil, y enlaces internos markdown a las calculadoras relevantes (mínimo 2, incluyendo el enlace sugerido).
5. Termina SIEMPRE con un párrafo breve: "Esta información es orientativa y no sustituye el asesoramiento de un gestor."
6. El slug en kebab-case describe el tema (incluye el año si aplica). La description: 110-155 caracteres con la keyword.

Devuelve el objeto estructurado.`;

  try {
    const { object } = await withRetry(() =>
      generateObject({ model: openrouter()(WRITER_MODEL, OR_SETTINGS), schema: postSchema, prompt }),
    );
    return object;
  } catch (e) {
    console.error("[blog-gen] writePost error:", e);
    return null;
  }
}

export async function reviewPost(post: GeneratedPost, referenceText?: string): Promise<PostReview | null> {
  if (!process.env.OPENROUTER_API_KEY) return null;

  const prompt = `Eres editor fiscal senior. Revisa este borrador para Cuotia y decide si es publicable SIN revisión humana.

## DATOS VERIFICADOS DE REFERENCIA
${CUOTIA_FACTS}
${referenceText ? `\n## CONTEXTO ADICIONAL\n${referenceText}` : ""}

## BORRADOR
Título: ${post.title}
Descripción: ${post.description}
Contenido:
${post.content}

## CRITERIOS
- ¿Alguna cifra fiscal contradice los datos verificados o parece inventada? (motivo de NO publicar)
- ¿Afirmaciones sin respaldo en las novedades ni en los datos verificados?
- ¿Tono y estructura adecuados? ¿Incluye disclaimer y enlaces internos?
Sé estricto: ante la duda sobre una cifra, baja la confianza. Devuelve confidence (0-100), publishable e issues.`;

  try {
    const { object } = await withRetry(() =>
      generateObject({
        model: openrouter()(process.env.BLOG_REVIEWER_MODEL || WRITER_MODEL, OR_SETTINGS),
        schema: reviewSchema,
        prompt,
      }),
    );
    return object;
  } catch (e) {
    console.error("[blog-gen] reviewPost error:", e);
    return null;
  }
}
