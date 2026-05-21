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
      <h2 className="mb-5 text-2xl font-bold text-neutral-900">{title}</h2>
      <div className="space-y-3">
        {items.map((it, i) => (
          <details key={i} className="group rounded-xl border border-neutral-200 bg-white p-4 open:shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-neutral-900">
              <span>{it.q}</span>
              <span className="text-xl text-[#B91C1C] transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
