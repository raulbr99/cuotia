// Protocolo IndexNow: notifica a Bing, Yandex, Naver, Seznam… de URLs nuevas o
// modificadas para indexación inmediata. Gratis, sin cuota. Google NO lo usa.
// https://www.indexnow.org/documentation
export const INDEXNOW_KEY = "f7594366468d434548a2e2c619ed903d";
export const INDEXNOW_HOST = "cuotia.es";
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export interface IndexNowBatchResult {
  ok: boolean;
  status: number;
  body?: string;
}

async function submitBatch(urls: string[]): Promise<IndexNowBatchResult> {
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "cuotia.es IndexNow client",
    },
    body: JSON.stringify({
      host: INDEXNOW_HOST,
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList: urls,
    }),
  });
  const text = await res.text().catch(() => "");
  return { ok: res.ok, status: res.status, body: text.slice(0, 200) };
}

export interface IndexNowResult {
  ok: boolean;
  submitted: number;
  batches: number;
  successfulBatches: number;
  results: IndexNowBatchResult[];
}

// Envía URLs a IndexNow en lotes de 1.000 (el protocolo admite 10.000 por POST).
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  if (urls.length === 0) {
    return { ok: true, submitted: 0, batches: 0, successfulBatches: 0, results: [] };
  }
  const batches: string[][] = [];
  for (let i = 0; i < urls.length; i += 1000) {
    batches.push(urls.slice(i, i + 1000));
  }
  const results = await Promise.all(batches.map(submitBatch));
  return {
    ok: results.every((r) => r.ok),
    submitted: urls.length,
    batches: results.length,
    successfulBatches: results.filter((r) => r.ok).length,
    results,
  };
}
