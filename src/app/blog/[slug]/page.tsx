import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { ArticleSchema } from "@/components/Schemas";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { POSTS, getPostBySlug, formatBlogDate } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const ogUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.description.slice(0, 100))}&tag=${encodeURIComponent(post.tag)}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified || post.datePublished,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: [ogUrl] },
  };
}

function renderContent(md: string): React.ReactElement[] {
  const blocks: React.ReactElement[] = [];
  const lines = md.trim().split("\n");
  let buffer: string[] = [];
  let inList = false;
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];
  let key = 0;

  function flushBuffer() {
    if (buffer.length === 0) return;
    const text = buffer.join(" ").trim();
    if (text) blocks.push(<p key={key++} className="my-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: renderInline(text) }} />);
    buffer = [];
  }

  function flushTable() {
    if (tableHeaders.length === 0 && tableRows.length === 0) return;
    blocks.push(
      <div key={key++} className="my-6 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((h, i) => (
                <th key={i} className="px-3 py-2 text-left font-semibold text-xs uppercase text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tableRows.map((row, i) => (
              <tr key={i}>{row.map((c, j) => <td key={j} className="px-3 py-2" dangerouslySetInnerHTML={{ __html: renderInline(c) }} />)}</tr>
            ))}
          </tbody>
        </table>
      </div>,
    );
    tableHeaders = [];
    tableRows = [];
    inTable = false;
  }

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flushBuffer();
      flushTable();
      blocks.push(<h2 key={key++} className="text-2xl font-bold text-gray-900 mt-10 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      flushBuffer();
      flushTable();
      blocks.push(<h3 key={key++} className="text-xl font-bold text-gray-900 mt-6 mb-3">{line.slice(4)}</h3>);
    } else if (/^[-*] /.test(line)) {
      flushBuffer();
      flushTable();
      if (!inList) {
        inList = true;
        buffer = [];
      }
      buffer.push(line.replace(/^[-*] /, ""));
    } else if (line.startsWith("|")) {
      flushBuffer();
      if (!inTable) {
        inTable = true;
        tableHeaders = line.split("|").map((c) => c.trim()).filter(Boolean);
        continue;
      }
      if (/^\|[\s|:-]+\|$/.test(line)) continue;
      tableRows.push(line.split("|").map((c) => c.trim()).filter((c) => c.length > 0));
    } else if (line.trim() === "") {
      if (inList) {
        blocks.push(
          <ul key={key++} className="my-4 space-y-1 list-disc list-inside text-gray-700">
            {buffer.map((it, i) => <li key={i} dangerouslySetInnerHTML={{ __html: renderInline(it) }} />)}
          </ul>,
        );
        buffer = [];
        inList = false;
      } else {
        flushBuffer();
      }
      flushTable();
    } else {
      if (inList) {
        flushBuffer();
        inList = false;
      }
      buffer.push(line);
    }
  }

  flushBuffer();
  flushTable();
  if (inList && buffer.length > 0) {
    blocks.push(
      <ul key={key++} className="my-4 space-y-1 list-disc list-inside text-gray-700">
        {buffer.map((it, i) => <li key={i} dangerouslySetInnerHTML={{ __html: renderInline(it) }} />)}
      </ul>,
    );
  }
  return blocks;
}

function renderInline(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-emerald-700 underline hover:text-emerald-800">$1</a>');
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const sortedPosts = [...POSTS].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
  const otherPosts = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <ArticleSchema
        headline={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        datePublished={post.datePublished}
        dateModified={post.dateModified || post.datePublished}
      />
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.tag }]} />

      <article>
        <div className="flex items-baseline gap-3 mb-3">
          <span className="rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold uppercase tracking-wider px-2 py-1">
            {post.tag}
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <time dateTime={post.datePublished}>{formatBlogDate(post.datePublished)}</time>
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">{post.title}</h1>
        <p className="text-lg text-gray-600 mb-8">{post.description}</p>

        <div className="speakable text-gray-700">
          {renderContent(post.content)}
        </div>

        <AdSlot format="rectangle" className="my-10" />

        <hr className="my-10 border-gray-200" />

        <Link href="/blog" className="text-sm text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 mb-8">
          <ArrowLeft className="h-4 w-4" /> Volver al blog
        </Link>

        {otherPosts.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Otros artículos</h2>
            <div className="space-y-3">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group block rounded-lg border border-gray-200 bg-white p-4 hover:shadow-sm hover:border-gray-300 transition-all"
                >
                  <p className="font-semibold text-gray-900 group-hover:text-emerald-700 flex items-center gap-2">
                    {p.title} <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{p.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
