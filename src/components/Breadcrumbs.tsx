import Link from "next/link";
import { ChevronRight } from "lucide-react";

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
      <nav className="mb-4 flex items-center text-xs text-neutral-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#B91C1C]">Inicio</Link>
        {items.map((c, i) => (
          <span key={i} className="flex items-center">
            <ChevronRight className="mx-1 h-3 w-3 text-neutral-300" />
            {c.href ? (
              <Link href={c.href} className="hover:text-[#B91C1C]">{c.label}</Link>
            ) : (
              <span className="font-medium text-neutral-700">{c.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
