import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CalcLink {
  href: string;
  title: string;
  desc: string;
}

const ALL: Record<string, CalcLink> = {
  cuota: { href: "/cuota-autonomo", title: "Cuota autónomo", desc: "15 tramos + tarifa plana 88,64 €" },
  irpf: { href: "/calculadora-irpf", title: "IRPF + modelo 130", desc: "Estatal + 17 CCAA + pago fraccionado" },
  iva: { href: "/calculadora-iva", title: "IVA + modelo 303", desc: "Añade, quita o calcula trimestre" },
  neto: { href: "/neto-bruto", title: "Neto / Bruto", desc: "Lo que te queda al mes" },
  despido: { href: "/calculadora-despido", title: "Despido + finiquito", desc: "33 d/año + finiquito completo" },
  baja: { href: "/baja-medica", title: "Baja médica", desc: "Enfermedad común / accidente laboral" },
  jubilacion: { href: "/jubilacion-autonomo", title: "Jubilación", desc: "Pensión según base y años" },
  dietas: { href: "/dietas-kilometraje", title: "Dietas + km", desc: "Límites exentos 2026" },
  facturas: { href: "/generador-facturas", title: "Generador facturas", desc: "PDF legalmente válido 1 min" },
  retencion: { href: "/retencion-irpf-facturas", title: "Retención IRPF facturas", desc: "15% / 7% / 19% / 2% / 0%" },
  societario: { href: "/cuota-autonomo-societario", title: "Cuota autónomo societario", desc: "Base 1.424,40 €/mes (+42,4% 2026)" },
  pluriactividad: { href: "/pluriactividad", title: "Pluriactividad", desc: "Bonificación 50%/75% en cuota" },
  slvsauto: { href: "/sl-vs-autonomo", title: "SL vs Autónomo", desc: "Comparativa por nivel de ingresos" },
  verifactu: { href: "/verifactu", title: "Verifactu", desc: "Obligatorio julio 2027" },
  calendario: { href: "/calendario-fiscal", title: "Calendario fiscal", desc: "Plazos 303, 130, 100, 111…" },
};

type CalcId = keyof typeof ALL;

interface RelatedCalcsProps {
  current: CalcId;
  related: CalcId[];
  title?: string;
}

export function RelatedCalcs({ current, related, title = "Calculadoras relacionadas" }: RelatedCalcsProps) {
  const items = related.filter((id) => id !== current && ALL[id]).slice(0, 4);
  if (items.length === 0) return null;

  return (
    <section className="mt-12 border-t border-neutral-200 pt-10">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#B91C1C] mb-4">
        Siguiente paso
      </p>
      <h2 className="font-serif text-2xl text-neutral-900 mb-6">{title}</h2>
      <div className="grid gap-px bg-neutral-200 border border-neutral-200 sm:grid-cols-2">
        {items.map((id) => {
          const c = ALL[id];
          return (
            <Link
              key={c.href}
              href={c.href}
              className="group block bg-[#FAFAF7] p-5 transition-colors hover:bg-white"
            >
              <p className="font-serif text-lg leading-tight text-neutral-900 group-hover:text-[#B91C1C] flex items-center justify-between gap-2">
                {c.title}
                <ArrowUpRight className="h-4 w-4 text-neutral-400 transition-all group-hover:text-[#B91C1C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0" />
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-neutral-600">{c.desc}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
