// Acceso a los posts auto-generados que viven en Supabase (tabla blog_posts).
// Complementa los posts curados en src/lib/blog.ts. La fusión de ambos está en
// src/lib/blog-all.ts.
import { getSupabase } from "@/lib/supabase";
import type { BlogPost } from "@/lib/blog";

interface DbRow {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tag: string;
  image_url: string | null;
  date_published: string;
  date_modified: string | null;
}

const COLS = "slug,title,description,content,category,tag,image_url,date_published,date_modified";

function rowToPost(r: DbRow): BlogPost {
  return {
    slug: r.slug,
    title: r.title,
    description: r.description,
    content: r.content,
    category: r.category,
    tag: r.tag,
    imageUrl: r.image_url ?? undefined,
    datePublished: r.date_published,
    dateModified: r.date_modified ?? undefined,
  };
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function getDbPublishedPosts(): Promise<BlogPost[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("blog_posts")
    .select(COLS)
    .eq("status", "published")
    .lte("date_published", today())
    .order("date_published", { ascending: false });
  if (error || !data) return [];
  return (data as DbRow[]).map(rowToPost);
}

export async function getDbPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("blog_posts")
    .select(COLS)
    .eq("slug", slug)
    .eq("status", "published")
    .lte("date_published", today())
    .maybeSingle();
  if (error || !data) return null;
  return rowToPost(data as DbRow);
}

// Comprueba si un slug ya está ocupado (en cualquier estado, para no reusarlo).
export async function dbSlugExists(slug: string): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;
  const { data } = await supabase.from("blog_posts").select("slug").eq("slug", slug).maybeSingle();
  return !!data;
}

export interface NewDbPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tag: string;
  imageUrl?: string | null;
  sourceUrls?: string[];
  model?: string;
  qaScore?: number;
  status?: "published" | "draft";
}

export async function insertDbPost(p: NewDbPost): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: "Supabase no configurado" };
  const { error } = await supabase.from("blog_posts").insert({
    slug: p.slug,
    title: p.title,
    description: p.description,
    content: p.content,
    category: p.category,
    tag: p.tag,
    image_url: p.imageUrl ?? null,
    source_urls: p.sourceUrls ?? [],
    model: p.model ?? null,
    qa_score: p.qaScore ?? null,
    status: p.status ?? "published",
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
