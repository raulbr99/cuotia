import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Newspaper, ArrowRight, Calendar } from "lucide-react";
import { formatBlogDate, getAllTags } from "@/lib/blog";
import { getAllPublishedPosts } from "@/lib/blog-all";

// ISR: revalida cada hora para recoger los posts auto-generados (Supabase) sin redeploy.
export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";
const ogUrl = `${SITE_URL}/api/og?title=${encodeURIComponent("Blog · cambios fiscales para autónomos")}&subtitle=${encodeURIComponent("Verifactu, MEI, tramos, SMI, IRPF · noticias en lenguaje claro")}&tag=Blog`;

export const metadata: Metadata = {
  title: "Blog · noticias fiscales para autónomos en España",
  description: "Análisis claros de los cambios fiscales que afectan a los autónomos: tramos de cotización, IRPF, Verifactu, MEI, SMI y modelos AEAT.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog Cuotia", description: "Cambios fiscales explicados en claro", images: [{ url: ogUrl, width: 1200, height: 630 }] },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog Cuotia",
  url: `${SITE_URL}/blog`,
  inLanguage: "es-ES",
  publisher: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
};

export default async function Page() {
  const sorted = await getAllPublishedPosts();
  const tags = getAllTags(sorted).slice(0, 14);
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl flex items-center gap-3">
          <Newspaper className="h-7 w-7 text-[#B91C1C]" />
          Blog
        </h1>
        <p className="mt-3 text-neutral-700 max-w-3xl">
          Cambios fiscales que afectan a los autónomos, explicados sin jerga. Sin
          publicidad encubierta, sin recomendaciones de gestoría.
        </p>
      </header>

      {tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Link
              key={t.slug}
              href={`/blog/tema/${t.slug}`}
              className="rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-700 hover:border-[#B91C1C] hover:text-[#B91C1C]"
            >
              {t.tag} <span className="text-neutral-400">{t.count}</span>
            </Link>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {sorted.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block  rounded-xl border border-neutral-200 bg-white p-6 hover:bg-white hover:border-neutral-300 transition-all"
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
    </div>
  );
}
