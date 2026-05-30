// Genera la portada con OpenRouter (modelo de imagen Gemini) y la sube a
// Supabase Storage (bucket público 'blog-images'). Devuelve la URL pública o null.
import { getSupabase } from "@/lib/supabase";

const IMAGE_MODEL = process.env.BLOG_IMAGE_MODEL || "google/gemini-3.1-flash-image-preview";

export async function generateAndStoreCover(imagePrompt: string, slug: string): Promise<string | null> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return null;

  const styled = `${imagePrompt}. Editorial premium magazine cover, abstract, clean composition, cream/off-white background (#FAFAF7) with a single editorial red accent (#B91C1C), minimalist, no text, no letters, no words, landscape 16:9, soft natural light, high quality.`;

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
        messages: [{ role: "user", content: styled }],
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
