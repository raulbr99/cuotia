import { ArrowUpRight, Sparkles } from "lucide-react";

export interface AffiliatePartner {
  name: string;
  href: string;
  description: string;
  features?: string[];
  badge?: string;
  /**
   * Disclosure visible: cumplimiento LSSI-CE/RGPD.
   * Siempre se renderiza al final. NO ocultarlo.
   */
  disclosureShort?: string;
}

interface AffiliateCardProps {
  title?: string;
  intro?: string;
  partners: AffiliatePartner[];
}

/**
 * Bloque "Recomendado" con afiliados.
 * Cumple buenas prácticas:
 * - Disclosure explícito (afiliado).
 * - target=_blank + rel="sponsored noopener noreferrer".
 * - Sin oscurecer el resto del contenido (no popups, no autoplay).
 */
export function AffiliateCard({ title, intro, partners }: AffiliateCardProps) {
  if (partners.length === 0) return null;
  const single = partners.length === 1;

  return (
    <aside className="mt-10 rounded-xl border border-neutral-200 bg-white p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FEF2F2] flex-shrink-0">
          <Sparkles className="h-4 w-4 text-[#B91C1C]" strokeWidth={2} />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-[#B91C1C] font-semibold mb-1">
            Recomendados
          </p>
          <h3 className="font-bold text-base text-neutral-900">
            {title ?? "Si necesitas gestoría profesional"}
          </h3>
          {intro && <p className="mt-1 text-sm text-neutral-600">{intro}</p>}
        </div>
      </div>

      <div className={`grid gap-3 ${single ? "" : "sm:grid-cols-2"}`}>
        {partners.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="group block rounded-lg border border-neutral-200 bg-[#FAFAF7] p-4 transition-colors hover:border-[#B91C1C] hover:bg-white"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-semibold text-neutral-900 group-hover:text-[#B91C1C]">
                  {p.name}
                </span>
                {p.badge && (
                  <span className="text-[10px] uppercase tracking-wider text-[#B91C1C] bg-[#FEF2F2] px-1.5 py-0.5 rounded">
                    {p.badge}
                  </span>
                )}
              </div>
              <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-[#B91C1C] flex-shrink-0" />
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">{p.description}</p>
            {p.features && p.features.length > 0 && (
              <ul className="mt-2 space-y-0.5 text-[12px] text-neutral-600">
                {p.features.map((f) => (
                  <li key={f}>· {f}</li>
                ))}
              </ul>
            )}
          </a>
        ))}
      </div>

      <p className="mt-4 text-[10px] text-neutral-400 leading-relaxed">
        <strong>Aviso afiliado:</strong> los enlaces de esta sección pueden generar
        una comisión para Cuotia si contratas con el proveedor. El precio para ti es
        el mismo. No condiciona nuestras calculadoras ni recomendaciones objetivas.
      </p>
    </aside>
  );
}
