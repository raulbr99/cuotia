import { streamText, convertToModelMessages, stepCountIs, type UIMessage } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { SYSTEM_PROMPT } from "@/lib/chat/system-prompt";
import { fiscalTools } from "@/lib/chat/tools";
import { getSupabase } from "@/lib/supabase";

const RATE_LIMIT_MAX = 12; // mensajes
const RATE_LIMIT_WINDOW_MIN = 10;

/**
 * Rate limit por IP usando Supabase como store.
 * Tabla chat_rate_limits: ip text PK, count int, window_start timestamptz
 * Si la tabla no existe (proyecto nuevo), permite siempre (open mode).
 */
async function checkRateLimit(ip: string): Promise<{ ok: boolean; remaining: number }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: true, remaining: RATE_LIMIT_MAX };

  const now = new Date();
  const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW_MIN * 60 * 1000);

  try {
    // Get current count in window
    const { data, error } = await supabase
      .from("chat_rate_limits")
      .select("count, window_start")
      .eq("ip", ip)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      // tabla no existe o error: permitir
      return { ok: true, remaining: RATE_LIMIT_MAX };
    }

    if (!data || new Date(data.window_start) < windowStart) {
      // Nueva ventana
      await supabase.from("chat_rate_limits").upsert({
        ip,
        count: 1,
        window_start: now.toISOString(),
      });
      return { ok: true, remaining: RATE_LIMIT_MAX - 1 };
    }

    if (data.count >= RATE_LIMIT_MAX) {
      return { ok: false, remaining: 0 };
    }

    await supabase
      .from("chat_rate_limits")
      .update({ count: data.count + 1 })
      .eq("ip", ip);

    return { ok: true, remaining: RATE_LIMIT_MAX - data.count - 1 };
  } catch {
    // Cualquier error de DB → permitir (no romper UX)
    return { ok: true, remaining: RATE_LIMIT_MAX };
  }
}

function getIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  if (!process.env.OPENROUTER_API_KEY) {
    return new Response(
      JSON.stringify({ error: "OpenRouter no configurado en el servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const ip = getIp(req);
  const rl = await checkRateLimit(ip);
  if (!rl.ok) {
    return new Response(
      JSON.stringify({
        error: `Demasiados mensajes. Espera ${RATE_LIMIT_WINDOW_MIN} minutos.`,
      }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: { messages: UIMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }
  const { messages } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("messages required", { status: 400 });
  }

  // Truncate excesivo (evita coste runaway)
  const truncated = messages.slice(-20);

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  // Default: Gemini 2.5 Flash (cheap, rápido). Fallback opcional con env.
  const modelName = process.env.OPENROUTER_MODEL ?? "google/gemini-2.5-flash";

  const result = streamText({
    model: openrouter(modelName),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(truncated),
    tools: fiscalTools,
    // Permitir múltiples steps para tool calling
    stopWhen: stepCountIs(5),
    // Telemetria simple
    onError: ({ error }) => {
      console.error("[chat] streamText error:", error);
    },
  });

  return result.toUIMessageStreamResponse({
    headers: {
      "x-ratelimit-remaining": rl.remaining.toString(),
    },
  });
}

export const dynamic = "force-dynamic";
export const maxDuration = 60;
