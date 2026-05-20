import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      ...items.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.label,
        ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
      })),
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav
        className="mb-6 flex items-center font-mono text-[10px] uppercase tracking-[0.15em] text-[#606060]"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="transition-colors hover:text-[#D1FF26]">/</Link>
        {items.map((c, i) => (
          <span key={i} className="flex items-center">
            <span className="mx-2 text-[#404040]">/</span>
            {c.href ? (
              <Link href={c.href} className="transition-colors hover:text-[#D1FF26]">{c.label}</Link>
            ) : (
              <span className="text-white">{c.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
