import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";

// IndexNow protocol: https://www.indexnow.org/documentation
// Permite notificar a Bing, Yandex, Naver y otros search engines de cambios
// en URLs para indexación inmediata. Gratis, sin cuota diaria.
// Google NO usa IndexNow (de momento).

const INDEXNOW_KEY = "f7594366468d434548a2e2c619ed903d";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const HOST = "cuotia.es";

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

async function submitBatch(urls: string[]): Promise<{ ok: boolean; status: number; body?: string }> {
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "cuotia.es IndexNow client",
    },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });
  const text = await res.text().catch(() => "");
  return { ok: res.ok, status: res.status, body: text.slice(0, 200) };
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

  // IndexNow acepta hasta 10.000 URLs por POST. Para Cuotia (~180 URLs) basta con 1 batch.
  // Si crece, batches de 1.000.
  const batches: string[][] = [];
  for (let i = 0; i < urls.length; i += 1000) {
    batches.push(urls.slice(i, i + 1000));
  }

  const results = await Promise.all(batches.map(submitBatch));
  const successful = results.filter((r) => r.ok).length;

  return NextResponse.json({
    ok: results.every((r) => r.ok),
    submitted: urls.length,
    batches: results.length,
    successfulBatches: successful,
    results,
    sample: urls.slice(0, 5),
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
  });
}

// POST: para futuro uso desde la build (mandar solo URLs nuevas)
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
  const urls = (body.urls ?? []).filter((u) => u.startsWith(`https://${HOST}/`));
  if (urls.length === 0) {
    return NextResponse.json({ error: "Sin URLs válidas para cuotia.es" }, { status: 400 });
  }
  const result = await submitBatch(urls);
  return NextResponse.json({
    ...result,
    submitted: urls.length,
  });
}

export const dynamic = "force-dynamic";
