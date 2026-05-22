import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

// Vercel Cron lo invoca con header `Authorization: Bearer ${CRON_SECRET}`.
// Si no hay CRON_SECRET, dejamos la ruta abierta (útil para pruebas manuales).
function isAuthorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

// Palabras clave que vigilamos en los títulos del BOE
const KEYWORDS = [
  "autónomo",
  "autonomo",
  "autónomos",
  "autonomos",
  "RETA",
  "trabajador autónomo",
  "IRPF",
  "IVA",
  "Seguridad Social",
  "Tesorería General",
  "tarifa plana",
  "MEI",
  "cotización",
  "factura electrónica",
  "Verifactu",
  "Agencia Tributaria",
  "modelo 303",
  "modelo 130",
  "modelo 100",
  "modelo 111",
  "modelo 347",
  "Salario Mínimo",
];

interface BoeEntry {
  id: string;
  titulo: string;
  url: string;
  seccion?: string;
}

function todayInMadrid(): string {
  // BOE publica por fecha Madrid. Devolvemos YYYYMMDD.
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(new Date()).replace(/-/g, "");
}

async function fetchBoeSumario(yyyymmdd: string): Promise<BoeEntry[]> {
  const url = `https://www.boe.es/diario_boe/xml.php?id=BOE-S-${yyyymmdd}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "cuotia.es BOE watcher" },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const xml = await res.text();

  // Parser ligero: extraemos <item> con id, titulo, urlPdf
  const entries: BoeEntry[] = [];
  const itemRegex = /<item[^>]*identificador="([^"]+)"[^>]*>([\s\S]*?)<\/item>/g;
  let m: RegExpExecArray | null;
  while ((m = itemRegex.exec(xml)) !== null) {
    const id = m[1];
    const block = m[2];
    const titulo = (block.match(/<titulo[^>]*>([\s\S]*?)<\/titulo>/)?.[1] || "").trim();
    if (!titulo) continue;
    entries.push({
      id,
      titulo,
      url: `https://www.boe.es/diario_boe/txt.php?id=${id}`,
    });
  }
  return entries;
}

function matchKeywords(titulo: string): string[] {
  const lower = titulo.toLowerCase();
  return KEYWORDS.filter((k) => lower.includes(k.toLowerCase()));
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase no configurado" }, { status: 500 });
  }

  const yyyymmdd = todayInMadrid();
  const fecha = `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`;

  const entries = await fetchBoeSumario(yyyymmdd);

  const matches: { entry: BoeEntry; keywords: string[] }[] = [];
  for (const entry of entries) {
    const kws = matchKeywords(entry.titulo);
    if (kws.length > 0) matches.push({ entry, keywords: kws });
  }

  // Insertamos los nuevos en boe_alerts (unique constraint evita duplicados)
  const rows = matches.flatMap(({ entry, keywords }) =>
    keywords.map((palabra_clave) => ({
      fecha_boe: fecha,
      boe_id: entry.id,
      titulo: entry.titulo,
      url: entry.url,
      palabra_clave,
    }))
  );

  let inserted = 0;
  if (rows.length > 0) {
    const { data, error } = await supabase
      .from("boe_alerts")
      .upsert(rows, { onConflict: "boe_id,palabra_clave", ignoreDuplicates: true })
      .select("id");
    if (error) {
      return NextResponse.json(
        { error: error.message, scanned: entries.length, matches: matches.length },
        { status: 500 }
      );
    }
    inserted = data?.length ?? 0;
  }

  return NextResponse.json({
    ok: true,
    fecha,
    scanned: entries.length,
    matches: matches.length,
    inserted,
    sample: matches.slice(0, 3).map((m) => ({ titulo: m.entry.titulo, keywords: m.keywords })),
  });
}

export const dynamic = "force-dynamic";
