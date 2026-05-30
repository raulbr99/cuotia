// Accesores combinados: posts curados (estáticos, src/lib/blog.ts) + posts
// auto-generados (Supabase, src/lib/blog-db.ts). El blog y el sitemap usan estos.
// Los estáticos ganan ante un slug duplicado.
import { getPublishedPosts, getPostBySlug, type BlogPost } from "@/lib/blog";
import { getDbPublishedPosts, getDbPostBySlug } from "@/lib/blog-db";

export async function getAllPublishedPosts(): Promise<BlogPost[]> {
  const staticPosts = getPublishedPosts();
  const dbPosts = await getDbPublishedPosts();
  const seen = new Set(staticPosts.map((p) => p.slug));
  const merged = [...staticPosts, ...dbPosts.filter((p) => !seen.has(p.slug))];
  return merged.sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  return getPostBySlug(slug) ?? (await getDbPostBySlug(slug));
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const posts = await getAllPublishedPosts();
  return posts.map((p) => p.slug);
}
