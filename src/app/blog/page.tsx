import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Newspaper, ArrowRight, Calendar } from "lucide-react";
import { POSTS, formatBlogDate } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://calc-autonomo.vercel.app";
const ogUrl = `${SITE_URL}/api/og?title=${encodeURIComponent("Blog · cambios fiscales para autónomos")}&subtitle=${encodeURIComponent("Verifactu, MEI, tramos, SMI, IRPF · noticias en lenguaje claro")}&tag=Blog`;

export const metadata: Metadata = {
  title: "Blog · noticias fiscales para autónomos en España",
  description: "Análisis claros de los cambios fiscales que afectan a los autónomos: tramos de cotización, IRPF, Verifactu, MEI, SMI y modelos AEAT.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog CalcAutónomo", description: "Cambios fiscales explicados en claro", images: [{ url: ogUrl, width: 1200, height: 630 }] },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog CalcAutónomo",
  url: `${SITE_URL}/blog`,
  inLanguage: "es-ES",
  publisher: { "@type": "Organization", name: "CalcAutónomo", url: SITE_URL },
};

export default function Page() {
  const sorted = [...POSTS].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl flex items-center gap-3">
          <Newspaper className="h-7 w-7 text-emerald-600" />
          Blog
        </h1>
        <p className="mt-3 text-gray-600 max-w-3xl">
          Cambios fiscales que afectan a los autónomos, explicados sin jerga. Sin
          publicidad encubierta, sin recomendaciones de gestoría.
        </p>
      </header>

      <div className="space-y-4">
        {sorted.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md hover:border-gray-300 transition-all"
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold uppercase tracking-wider px-2 py-1">
                {post.tag}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatBlogDate(post.datePublished)}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors flex items-center gap-2">
              {post.title}
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h2>
            <p className="text-sm text-gray-600 mt-2">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
