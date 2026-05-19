interface FAQItem {
  q: string;
  a: string;
}

export function FAQ({ items, title = "Preguntas frecuentes" }: { items: FAQItem[]; title?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
  return (
    <section className="max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 className="text-2xl font-bold text-gray-900 mb-5">{title}</h2>
      <div className="space-y-3">
        {items.map((it, i) => (
          <details key={i} className="group rounded-xl border border-gray-200 bg-white p-4 open:shadow-sm">
            <summary className="cursor-pointer text-sm font-semibold text-gray-900 list-none flex items-center justify-between">
              <span>{it.q}</span>
              <span className="text-emerald-600 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-sm text-gray-700 mt-3 leading-relaxed">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
