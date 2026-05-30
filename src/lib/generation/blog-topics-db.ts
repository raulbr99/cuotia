// Backlog de temas en Supabase (tabla blog_topics): elige el siguiente tema a
// escribir, lo marca como usado, y auto-siembra desde topics.ts si está vacío.
import { getSupabase } from "@/lib/supabase";
import { SEED_TOPICS } from "@/lib/generation/topics";
import type { TopicInput } from "@/lib/generation/write-post";

export interface DbTopic extends TopicInput {
  id: string;
}

// Inserta SEED_TOPICS si la tabla está vacía (idempotente).
export async function seedTopicsIfEmpty(): Promise<void> {
  const supabase = getSupabase();
  if (!supabase || SEED_TOPICS.length === 0) return;
  const { count } = await supabase.from("blog_topics").select("id", { count: "exact", head: true });
  if ((count ?? 0) > 0) return;
  const rows = SEED_TOPICS.map((t) => ({
    title: t.title,
    target_keyword: t.targetKeyword ?? null,
    angle: t.angle ?? null,
    internal_link: t.internalLink ?? null,
    category: t.category ?? null,
    season_month: t.seasonMonth ?? 0,
    priority: t.priority ?? 3,
  }));
  await supabase.from("blog_topics").insert(rows);
}

const SELECT_COLS = "id,title,target_keyword,angle,internal_link,category";

// Categorías con cálculos numéricos precisos (tablas en euros, ejemplos casilla a
// casilla): el redactor comete errores de cifras y el revisor las manda a borrador.
// El cron las EVITA para poder publicar de forma autónoma; quedan reservadas para
// generación manual con revisión (o hasta que se agoten las categorías seguras).
const RISKY_CATEGORIES = new Set([
  "comparativas-decisiones",
  "como-rellenar-modelos",
  "cuota-cotizacion",
]);

interface TopicRow {
  id: string;
  title: string;
  target_keyword: string | null;
  angle: string | null;
  internal_link: string | null;
  category: string | null;
}

function rowToTopic(r: TopicRow): DbTopic {
  return {
    id: r.id,
    title: r.title,
    targetKeyword: r.target_keyword ?? undefined,
    angle: r.angle ?? undefined,
    internalLink: r.internal_link ?? undefined,
    category: r.category ?? undefined,
  };
}

// Siguiente tema pendiente: prioriza los de este mes (o atemporales) y la
// prioridad alta; elige al azar entre los mejores para variar. null si no quedan.
export async function getNextTopic(): Promise<DbTopic | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  await seedTopicsIfEmpty();

  const month = new Date().getMonth() + 1;
  let rows: TopicRow[] = [];

  const seasonal = await supabase
    .from("blog_topics")
    .select(SELECT_COLS)
    .eq("status", "pending")
    .in("season_month", [month, 0])
    .order("priority", { ascending: false })
    .limit(40);
  rows = (seasonal.data as TopicRow[]) ?? [];

  if (rows.length === 0) {
    const any = await supabase
      .from("blog_topics")
      .select(SELECT_COLS)
      .eq("status", "pending")
      .order("priority", { ascending: false })
      .limit(40);
    rows = (any.data as TopicRow[]) ?? [];
  }

  if (rows.length === 0) return null;

  // Prefiere categorías seguras (auto-publicables). Solo cae a las de cálculo si
  // ya no quedan seguras pendientes.
  const safe = rows.filter((r) => !RISKY_CATEGORIES.has(r.category ?? ""));
  const pool = safe.length > 0 ? safe : rows;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  return rowToTopic(pick);
}

export async function markTopicUsed(id: string, slug: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  await supabase
    .from("blog_topics")
    .update({ status: "used", slug, used_at: new Date().toISOString() })
    .eq("id", id);
}

export async function pendingTopicCount(): Promise<number> {
  const supabase = getSupabase();
  if (!supabase) return 0;
  const { count } = await supabase
    .from("blog_topics")
    .select("id", { count: "exact", head: true })
    .eq("status", "pending");
  return count ?? 0;
}
