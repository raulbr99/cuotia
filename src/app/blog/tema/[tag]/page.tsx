import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Tag, ArrowRight, Calendar } from "lucide-react";
import { formatBlogDate, getAllTags, getPostsByTagSlug } from "@/lib/blog";
import { getAllPublishedPosts } from "@/lib/blog-all";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

// ISR: recoge los posts auto-generados (Supabase) sin redeploy.
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags(await getAllPublishedPosts());
  return tags.map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag: slug } = await params;
  const posts = await getAllPublishedPosts();
  const info = getAllTags(posts).find((t) => t.slug === slug);
  if (!info) return {};
  const title = `Artículos sobre ${info.tag} para autónomos`;
  const description = `Guías y novedades sobre ${info.tag} para autónomos en España. ${info.count} artículo${info.count === 1 ? "" : "s"} con datos oficiales actualizados.`;
  return {
    title,
    description,
    alternates: { canonical: `/blog/tema/${slug}` },
    // Evita páginas de tag con un solo post (thin content): noindex hasta que haya ≥2.
    robots: info.count < 2 ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog/tema/${slug}`,
      images: [{ url: `${SITE_URL}/api/og?title=${encodeURIComponent(info.tag)}&subtitle=${encodeURIComponent("Artículos para autónomos")}&tag=Blog`, width: 1200, height: 630 }],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { tag: slug } = await params;
  const posts = await getAllPublishedPosts();
  const info = getAllTags(posts).find((t) => t.slug === slug);
  if (!info) notFound();

  const tagged = getPostsByTagSlug(slug, posts);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Artículos sobre ${info.tag}`,
    url: `${SITE_URL}/blog/tema/${slug}`,
    inLanguage: "es-ES",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tagged.length,
      itemListElement: tagged.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/blog/${p.slug}`,
        name: p.title,
      })),
    },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: info.tag }]} />

      <header className="mb-10">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl flex items-center gap-3">
          <Tag className="h-7 w-7 text-[#B91C1C]" />
          {info.tag}
        </h1>
        <p className="mt-3 text-neutral-700 max-w-3xl">
          {info.count} artículo{info.count === 1 ? "" : "s"} sobre <strong>{info.tag}</strong> para autónomos, con datos oficiales actualizados.
        </p>
      </header>

      <div className="space-y-4">
        {tagged.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-xl border border-neutral-200 bg-white p-6 hover:border-neutral-300 transition-all"
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="rounded-full bg-white text-[#B91C1C] text-[10px] font-semibold uppercase tracking-wider px-2 py-1">
                {post.tag}
              </span>
              <span className="text-xs text-neutral-500 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatBlogDate(post.datePublished)}
              </span>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 group-hover:text-[#B91C1C] transition-colors flex items-center gap-2">
              {post.title}
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h2>
            <p className="text-sm text-neutral-700 mt-2">{post.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <Link href="/blog" className="text-sm text-[#B91C1C] hover:underline">
          ← Todos los artículos
        </Link>
      </div>
    </div>
  );
}
