import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickAnswer } from "@/components/QuickAnswer";
import { FAQ } from "@/components/FAQ";
import { LastUpdated } from "@/components/LastUpdated";
import { RelatedCalcs } from "@/components/RelatedCalcs";
import { findTramo } from "@/lib/cuota-autonomo";
import { calcularIRPFAnual } from "@/lib/irpf";
import { eur, pct } from "@/lib/format";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

const BRUTO_TARGETS = [15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 100000];

function slugFromIngresos(n: number): string {
  return `${n}-euros-brutos`;
}

function ingresosFromSlug(slug: string): number | null {
  const m = slug.match(/^(\d+)-euros?-brutos?$/);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  if (isNaN(n) || n < 5000 || n > 500000) return null;
  return n;
}

const DEFAULT_GASTOS_PCT = 0.15; // 15% gastos típicos

function calcNeto(bruto: number, gastosPct: number = DEFAULT_GASTOS_PCT) {
  const gastos = bruto * gastosPct;
  const ingresoMensual = Math.max(0, (bruto - gastos) / 12);
  const tramo = findTramo(ingresoMensual);
  const cuotaAnual = tramo.cuotaMin * 12;
  const baseImponible = Math.max(0, bruto - gastos - cuotaAnual);
  const { cuota: irpf, tipoEfectivo } = calcularIRPFAnual(baseImponible);
  const neto = bruto - gastos - cuotaAnual - irpf;
  return { gastos, tramo, cuotaAnual, baseImponible, irpf, tipoEfectivo, neto, netoMensual: neto / 12 };
}

export async function generateStaticParams() {
  return BRUTO_TARGETS.map((n) => ({ ingresos: slugFromIngresos(n) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ingresos: string }>;
}): Promise<Metadata> {
  const { ingresos } = await params;
  const n = ingresosFromSlug(ingresos);
  if (n === null) return { title: "No encontrado" };
  const r = calcNeto(n);
  const title = `Neto autónomo con ${n.toLocaleString("es-ES")} € brutos (2026)`;
  const description = `Si facturas ${n.toLocaleString("es-ES")} € brutos al año como autónomo, te quedan aproximadamente ${eur(r.neto)} netos (${eur(r.netoMensual)}/mes) tras gastos, cuota y IRPF.`;
  const ogUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(`Neto autónomo ${n.toLocaleString("es-ES")} € brutos`)}&subtitle=${encodeURIComponent(`Te quedan ${eur(r.netoMensual)}/mes neto`)}&tag=Neto`;

  return {
    title,
    description,
    alternates: { canonical: `/neto-bruto/${ingresos}` },
    openGraph: { title, description, images: [{ url: ogUrl, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", images: [ogUrl] },
  };
}

export default async function Page({ params }: { params: Promise<{ ingresos: string }> }) {
  const { ingresos } = await params;
  const n = ingresosFromSlug(ingresos);
  if (n === null) notFound();

  const r = calcNeto(n);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Neto autónomo con ${n.toLocaleString("es-ES")} € brutos (2026)`,
    datePublished: "2026-05-22",
    dateModified: "2026-05-22",
    author: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/neto-bruto/${ingresos}` },
  };

  const faqs = [
    {
      q: `¿Cuánto me queda neto con ${n.toLocaleString("es-ES")} € brutos como autónomo?`,
      a: `Aproximadamente ${eur(r.neto)} netos al año (${eur(r.netoMensual)}/mes) en este escenario tipo: ${eur(r.gastos)} de gastos deducibles (15% asumido), ${eur(r.cuotaAnual)} de cuota autónomo (tramo ${r.tramo.numero}), ${eur(r.irpf)} de IRPF estatal estimado.`,
    },
    {
      q: "¿Cómo se calcula el neto del autónomo?",
      a: `Bruto − Gastos − Cuota Seguridad Social − IRPF = Neto. En este caso: ${eur(n)} − ${eur(r.gastos)} − ${eur(r.cuotaAnual)} − ${eur(r.irpf)} = ${eur(r.neto)}. El % de retención es aproximadamente ${pct(1 - r.neto / n)} sobre tu facturación bruta.`,
    },
    {
      q: "¿Por qué es solo aproximado?",
      a: "Asumimos 15% de gastos deducibles (varía mucho según actividad), cuota mínima del tramo (puedes elegir más alta), IRPF estatal sin escala autonómica (cada CCAA cambia el resultado) y sin deducciones personales (descendientes, planes de pensiones reducen).",
    },
    {
      q: "¿Cómo aumentar el neto?",
      a: "Maximizar gastos deducibles legítimos (material, suministros home office, formación), aplicar tarifa plana si eres nuevo autónomo (88,64 €/mes en lugar de cuota mínima del tramo), aportar a planes de pensiones (reducen base IRPF hasta 1.500 €/año), elegir CCAA con IRPF bajo (Madrid).",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Breadcrumbs items={[
        { label: "Neto / Bruto", href: "/neto-bruto" },
        { label: `${n.toLocaleString("es-ES")} € brutos` },
      ]} />

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Neto autónomo con {n.toLocaleString("es-ES")} € brutos (2026)
        </h1>
        <p className="mt-3 text-neutral-600 max-w-3xl">
          Si facturas {n.toLocaleString("es-ES")} € brutos al año, esto es lo que te
          queda tras gastos, cuota y IRPF (escenario orientativo).
        </p>
        <LastUpdated date="2026-05-22" source="Fuente: TGSS, AEAT, RD-ley 3/2026" className="mt-3" />
      </header>

      <QuickAnswer
        question={`¿Cuánto me queda neto con ${n.toLocaleString("es-ES")} € brutos?`}
        answer={`Aproximadamente ${eur(r.neto)} netos al año (${eur(r.netoMensual)}/mes). Asume 15% de gastos deducibles típicos, cuota mínima del tramo ${r.tramo.numero} (${eur(r.tramo.cuotaMin)}/mes) y escala IRPF estatal sin deducciones personales. Tu neto real puede ser distinto según tu situación.`}
        updatedAt="2026-05-22"
      />

      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <div className="rounded-xl border-2 border-[#FECACA] bg-[#FEF2F2] p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">Tu neto anual</p>
          <p className="mt-1 font-bold text-3xl text-[#B91C1C]">{eur(r.neto)}</p>
          <p className="mt-2 text-sm text-neutral-700">
            <strong className="text-neutral-900">{eur(r.netoMensual)}</strong> / mes
          </p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-5 text-sm space-y-1">
          <div className="flex justify-between"><span className="text-neutral-500">Ingresos brutos</span><span className="font-medium text-neutral-900">{eur(n)}</span></div>
          <div className="flex justify-between"><span className="text-neutral-500">– Gastos (15%)</span><span className="font-medium text-neutral-900">– {eur(r.gastos)}</span></div>
          <div className="flex justify-between"><span className="text-neutral-500">– Cuota autónomo</span><span className="font-medium text-neutral-900">– {eur(r.cuotaAnual)}</span></div>
          <div className="flex justify-between"><span className="text-neutral-500">– IRPF estatal</span><span className="font-medium text-neutral-900">– {eur(r.irpf)}</span></div>
          <div className="border-t border-neutral-200 pt-2 flex justify-between">
            <span className="font-semibold text-neutral-900">Neto</span>
            <span className="font-bold text-neutral-900">{eur(r.neto)}</span>
          </div>
        </div>
      </div>

      <article className="prose prose-neutral max-w-3xl space-y-5">
        <h2 className="text-xl font-bold text-neutral-900">Cómo subir tu neto</h2>
        <ul>
          <li>
            <strong>Tarifa plana</strong> (nuevos autónomos): 88,64 €/mes en lugar de
            {' '}{eur(r.tramo.cuotaMin)}/mes → ahorras hasta{' '}
            {eur(Math.max(0, (r.tramo.cuotaMin - 88.64) * 12))} el primer año.
          </li>
          <li>
            <strong>Maximizar gastos deducibles</strong>: home office (%), material,
            gestoría, formación, dietas, kilometraje (0,26 €/km).
          </li>
          <li>
            <strong>Aportar a plan de pensiones</strong>: hasta 1.500 €/año reduce base
            imponible IRPF.
          </li>
          <li>
            <strong>Elegir CCAA con IRPF bajo</strong>: Madrid es la más barata, Cataluña
            la más cara. Diferencia: ~2.000 €/año en ingresos altos.
          </li>
        </ul>

        <h2 className="text-xl font-bold text-neutral-900">Otros escenarios típicos</h2>
        <p>
          Este cálculo asume 15% de gastos. Si tus gastos reales son mayores (oficina,
          empleados, materiales), tu neto sube. Si son menores, baja. Para una
          estimación a tu caso, usa la{' '}
          <Link href="/neto-bruto" className="text-[#B91C1C] underline">
            calculadora completa
          </Link>
          {' '}con tus números.
        </p>
      </article>

      <section className="mt-10">
        <FAQ items={faqs} title={`Preguntas sobre ${n.toLocaleString("es-ES")} € brutos`} />
      </section>

      <section className="mt-10 rounded-lg border border-neutral-200 bg-white p-5">
        <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-3">Otros ingresos brutos</p>
        <div className="flex flex-wrap gap-2">
          {BRUTO_TARGETS.filter((x) => x !== n).map((x) => (
            <Link
              key={x}
              href={`/neto-bruto/${slugFromIngresos(x)}`}
              className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 hover:border-[#B91C1C] hover:text-[#B91C1C]"
            >
              {x.toLocaleString("es-ES")} €
            </Link>
          ))}
        </div>
      </section>

      <RelatedCalcs current="neto" related={["cuota", "irpf", "slvsauto", "facturas"]} />
    </div>
  );
}
