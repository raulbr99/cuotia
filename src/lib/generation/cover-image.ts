// Genera la portada con OpenRouter (modelo de imagen Gemini) y la sube a
// Supabase Storage (bucket público 'blog-images'). Devuelve la URL pública o null.
import { getSupabase } from "@/lib/supabase";

const IMAGE_MODEL = process.env.BLOG_IMAGE_MODEL || "google/gemini-3.1-flash-image-preview";

// Direcciones de arte rotativas: dan variedad de estilo entre portadas sin
// perder la coherencia de marca (que se fija en buildCoverPrompt).
const ART_DIRECTIONS = [
  "editorial magazine photography, shallow depth of field, soft natural light",
  "minimalist 3D render, soft studio lighting, smooth matte clay materials",
  "clean flat vector illustration, simple geometric shapes, subtle paper grain",
  "isometric illustration, neat tidy composition, soft long shadows",
  "conceptual still-life photography, props arranged on a surface, gentle top light",
  "modern paper-cut collage, layered cut shapes, soft drop shadows",
];

function pickDirection(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return ART_DIRECTIONS[h % ART_DIRECTIONS.length];
}

// Compone el prompt final: concepto único por post + dirección de arte rotativa
// (por slug) + marco de marca FIJO. Así varían tema y estilo, pero todas se
// reconocen como del mismo sitio.
export function buildCoverPrompt(concept: string, seed: string): string {
  return `${concept}. Visual style: ${pickDirection(seed)}. Brand frame (keep consistent across all images): warm off-white / cream background (#FAFAF7) with a single editorial red (#B91C1C) accent, premium, tasteful, minimal. Absolutely NO text, no letters, no numbers, no words, no logos, no charts. Landscape 16:9, high quality.`;
}

export async function generateAndStoreCover(prompt: string, slug: string): Promise<string | null> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return null;

  let res: Response;
  try {
    res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "X-Title": "Cuotia blog cover",
      },
      body: JSON.stringify({
        model: IMAGE_MODEL,
        modalities: ["text", "image"],
        messages: [{ role: "user", content: prompt }],
      }),
    });
  } catch {
    return null;
  }
  if (!res.ok) return null;

  const data = await res.json();
  const message = data.choices?.[0]?.message;
  // Formato OpenRouter: message.images[].image_url.url (data URL base64)
  const dataUrl: string | undefined = message?.images?.[0]?.image_url?.url;
  if (!dataUrl || !dataUrl.startsWith("data:")) return null;

  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!match) return null;
  const mime = match[1];
  const ext = mime.split("/")[1].replace("jpeg", "jpg");
  const bytes = Buffer.from(match[2], "base64");

  const supabase = getSupabase();
  if (!supabase) return null;

  const path = `${slug}.${ext}`;
  const { error } = await supabase.storage
    .from("blog-images")
    .upload(path, bytes, { contentType: mime, upsert: true });
  if (error) {
    console.error("[blog-gen] cover upload error:", error.message);
    return null;
  }

  const { data: pub } = supabase.storage.from("blog-images").getPublicUrl(path);
  return pub?.publicUrl ?? null;
}
