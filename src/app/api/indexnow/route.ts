import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";
import {
  submitToIndexNow,
  INDEXNOW_HOST,
  INDEXNOW_KEY_LOCATION,
} from "@/lib/indexnow";

// Cron diario (9:00): reenvía TODAS las URLs del sitemap a IndexNow
// (Bing, Yandex, Naver…). El ping inmediato de cada post nuevo lo hace el
// pipeline de generación; este cron es la red de seguridad periódica.

function isAuthorized(req: Request): boolean {
  // Triggers automáticos (vercel cron) llevan Authorization: Bearer ${CRON_SECRET}.
  // Triggers manuales pueden usar el ADMIN_TOKEN.
  const cronSecret = process.env.CRON_SECRET;
  const adminToken = process.env.ADMIN_TOKEN;
  const auth = req.headers.get("authorization");
  if (cronSecret && auth === `Bearer ${cronSecret}`) return true;
  if (adminToken && auth === `Bearer ${adminToken}`) return true;
  // Si no hay ningún secret configurado, permitimos (útil para test inicial).
  if (!cronSecret && !adminToken) return true;
  return false;
}

async function getAllSitemapUrls(): Promise<string[]> {
  const entries = await sitemap();
  return entries.map((e) => (typeof e.url === "string" ? e.url : String(e.url)));
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const onlyParam = url.searchParams.get("only"); // CSV de rutas específicas
  const limit = parseInt(url.searchParams.get("limit") ?? "0", 10);

  let urls = await getAllSitemapUrls();
  if (onlyParam) {
    const paths = onlyParam.split(",").map((p) => p.trim());
    urls = urls.filter((u) => paths.some((p) => u.endsWith(p)));
  }
  if (limit > 0) urls = urls.slice(0, limit);

  const result = await submitToIndexNow(urls);
  return NextResponse.json({
    ...result,
    sample: urls.slice(0, 5),
    keyLocation: INDEXNOW_KEY_LOCATION,
  });
}

// POST: enviar solo URLs concretas (p. ej. desde la build o un trigger puntual).
export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { urls?: string[] } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body JSON inválido" }, { status: 400 });
  }
  const urls = (body.urls ?? []).filter((u) => u.startsWith(`https://${INDEXNOW_HOST}/`));
  if (urls.length === 0) {
    return NextResponse.json({ error: "Sin URLs válidas para cuotia.es" }, { status: 400 });
  }
  const result = await submitToIndexNow(urls);
  return NextResponse.json(result);
}

export const dynamic = "force-dynamic";
