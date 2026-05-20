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
      <p className="tech-label mb-3">SECTION // FAQ</p>
      <h2 className="mb-6 font-display text-3xl uppercase tracking-tight text-white">{title}</h2>
      <div className="grid gap-px bg-[#1A1A1A]">
        {items.map((it, i) => (
          <details key={i} className="group bg-[#0F0F0F] p-5 open:bg-[#0A0A0A]">
            <summary className="flex cursor-pointer list-none items-center justify-between text-[14px] font-semibold text-white">
              <span>{it.q}</span>
              <span className="text-xl text-[#D1FF26] transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 text-[13px] leading-relaxed text-[#A0A0A0]">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
