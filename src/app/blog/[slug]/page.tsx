import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleSchema } from "@/components/Schemas";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { formatBlogDate, getRelatedPosts, tagSlug } from "@/lib/blog";
import { getPublishedPostBySlug, getAllPublishedPosts, getAllPublishedSlugs } from "@/lib/blog-all";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

// ISR: los posts auto-generados (Supabase) que no estén en el build se renderizan
// on-demand y se cachean; revalidate refresca el contenido.
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getAllPublishedSlugs()).map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};
  const ogUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.description.slice(0, 100))}&tag=${encodeURIComponent(post.tag)}`;
  const ogImage = post.imageUrl || ogUrl;
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
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: [ogImage] },
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
      <div key={key++} className="my-6 overflow-x-auto  border border-neutral-200">
        <table className="w-full text-sm">
          <thead className="bg-white">
            <tr>
              {tableHeaders.map((h, i) => (
                <th key={i} className="px-3 py-2 text-left font-semibold text-xs uppercase text-neutral-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
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
      blocks.push(<h2 key={key++} className="text-2xl font-bold text-neutral-900 mt-10 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      flushBuffer();
      flushTable();
      blocks.push(<h3 key={key++} className="text-xl font-bold text-neutral-900 mt-6 mb-3">{line.slice(4)}</h3>);
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
          <ul key={key++} className="my-4 space-y-1 list-disc list-inside text-neutral-700">
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
      <ul key={key++} className="my-4 space-y-1 list-disc list-inside text-neutral-700">
        {buffer.map((it, i) => <li key={i} dangerouslySetInnerHTML={{ __html: renderInline(it) }} />)}
      </ul>,
    );
  }
  return blocks;
}

function renderInline(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#B91C1C] underline hover:text-[#B91C1C]">$1</a>');
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPublishedPosts();
  const otherPosts = getRelatedPosts(post, allPosts, 3);
  const ogUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.description.slice(0, 100))}&tag=${encodeURIComponent(post.tag)}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <ArticleSchema
        headline={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        datePublished={post.datePublished}
        dateModified={post.dateModified || post.datePublished}
        imageUrl={post.imageUrl || ogUrl}
      />
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.tag, href: `/blog/tema/${tagSlug(post.tag)}` }]} />

      <article>
        <div className="flex items-baseline gap-3 mb-3">
          <Link
            href={`/blog/tema/${tagSlug(post.tag)}`}
            className="rounded-full bg-white text-[#B91C1C] text-[10px] font-semibold uppercase tracking-wider px-2 py-1 hover:underline"
          >
            {post.tag}
          </Link>
          <span className="text-xs text-neutral-500 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <time dateTime={post.datePublished}>{formatBlogDate(post.datePublished)}</time>
          </span>
        </div>

        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl mb-4">{post.title}</h1>
        <p className="text-lg text-neutral-700 mb-8">{post.description}</p>

        {post.imageUrl && (
          <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden border border-neutral-200">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="speakable text-neutral-700">
          {renderContent(post.content)}
        </div>


        <hr className="my-10 border-neutral-200" />

        <Link href="/blog" className="text-sm text-[#B91C1C] hover:text-[#B91C1C] inline-flex items-center gap-1 mb-8">
          <ArrowLeft className="h-4 w-4" /> Volver al blog
        </Link>

        {otherPosts.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Artículos relacionados</h2>
            <div className="space-y-3">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group block  rounded-xl border border-neutral-200 bg-white p-4 hover:bg-white hover:border-neutral-300 transition-all"
                >
                  <p className="font-semibold text-neutral-900 group-hover:text-[#B91C1C] flex items-center gap-2">
                    {p.title} <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-sm text-neutral-700 mt-1">{p.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
