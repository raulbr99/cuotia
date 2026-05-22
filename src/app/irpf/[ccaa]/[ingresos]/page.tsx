import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickAnswer } from "@/components/QuickAnswer";
import { FAQ } from "@/components/FAQ";
import { LastUpdated } from "@/components/LastUpdated";
import { RelatedCalcs } from "@/components/RelatedCalcs";
import { calcularIRPFConCCAA, CCAA_NAMES, type CCAA } from "@/lib/irpf-ccaa";
import { eur, pct } from "@/lib/format";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

const INGRESOS_TARGETS = [15000, 20000, 25000, 30000, 40000, 50000, 60000, 80000, 100000];

function slugFromIngresos(n: number): string {
  return `${n}-euros`;
}

function ingresosFromSlug(slug: string): number | null {
  const m = slug.match(/^(\d+)-euros?$/);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  if (isNaN(n) || n < 1000 || n > 500000) return null;
  return n;
}

export async function generateStaticParams() {
  const ccaas = (Object.keys(CCAA_NAMES) as CCAA[]).filter(
    (c) => c !== "navarra" && c !== "pais-vasco"
  );
  return ccaas.flatMap((ccaa) =>
    INGRESOS_TARGETS.map((n) => ({ ccaa, ingresos: slugFromIngresos(n) }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ccaa: string; ingresos: string }>;
}): Promise<Metadata> {
  const { ccaa, ingresos } = await params;
  if (!(ccaa in CCAA_NAMES)) return { title: "No encontrado" };
  const n = ingresosFromSlug(ingresos);
  if (n === null) return { title: "No encontrado" };

  const nombre = CCAA_NAMES[ccaa as CCAA];
  const r = calcularIRPFConCCAA(n, ccaa as CCAA);

  const title = `IRPF en ${nombre} para ${n.toLocaleString("es-ES")} € (2026)`;
  const description = r.esRegimenForal
    ? `${nombre} aplica régimen foral. Para calcular tu IRPF con base de ${n.toLocaleString("es-ES")} €/año consulta la Hacienda Foral correspondiente.`
    : `Cuánto IRPF paga un autónomo con ${n.toLocaleString("es-ES")} € de base imponible en ${nombre} en 2026: ${eur(r.total)} al año (tipo efectivo ${pct(r.tipoEfectivo)}).`;

  const ogUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(`IRPF ${nombre} ${n.toLocaleString("es-ES")} €`)}&subtitle=${encodeURIComponent(r.esRegimenForal ? "Régimen foral" : `${eur(r.total)} (${pct(r.tipoEfectivo)} efectivo)`)}&tag=IRPF`;

  return {
    title,
    description,
    alternates: { canonical: `/irpf/${ccaa}/${ingresos}` },
    openGraph: { title, description, images: [{ url: ogUrl, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", images: [ogUrl] },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ ccaa: string; ingresos: string }>;
}) {
  const { ccaa, ingresos } = await params;
  if (!(ccaa in CCAA_NAMES)) notFound();
  const n = ingresosFromSlug(ingresos);
  if (n === null) notFound();

  const ccaaKey = ccaa as CCAA;
  const nombre = CCAA_NAMES[ccaaKey];
  const r = calcularIRPFConCCAA(n, ccaaKey);

  // Comparativa rápida con Madrid (CCAA más barata) y Cataluña (alta)
  const refs: { ccaa: CCAA; nombre: string }[] = (
    [
      { ccaa: "madrid", nombre: CCAA_NAMES.madrid },
      { ccaa: "cataluna", nombre: CCAA_NAMES.cataluna },
      { ccaa: "valencia", nombre: CCAA_NAMES.valencia },
      { ccaa: "andalucia", nombre: CCAA_NAMES.andalucia },
    ] as { ccaa: CCAA; nombre: string }[]
  ).filter((x) => x.ccaa !== ccaaKey);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `IRPF en ${nombre} para ${n.toLocaleString("es-ES")} € (2026)`,
    description: `Cálculo del IRPF para un autónomo con ${n.toLocaleString("es-ES")} € de base imponible en ${nombre}.`,
    datePublished: "2026-05-22",
    dateModified: "2026-05-22",
    author: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/irpf/${ccaa}/${ingresos}` },
  };

  const faqs = r.esRegimenForal
    ? [
        {
          q: `¿Por qué ${nombre} es régimen foral?`,
          a: `${nombre} tiene Hacienda propia con sus propias escalas de IRPF. No se rige por el sistema estatal + autonómico. Para calcular tu IRPF consulta directamente la Hacienda Foral.`,
        },
      ]
    : [
        {
          q: `¿Cuánto IRPF pago con ${n.toLocaleString("es-ES")} € en ${nombre}?`,
          a: `${eur(r.total)} al año (tipo efectivo ${pct(r.tipoEfectivo)}). De ese total, ${eur(r.estatal)} es estatal y ${eur(r.autonomico)} autonómico de ${nombre}.`,
        },
        {
          q: "¿Es lo mismo el tipo efectivo que el marginal?",
          a: `No. El tipo marginal es el porcentaje del último tramo en el que cae tu base; el tipo efectivo es el porcentaje real que pagas sobre el total. Con ${n.toLocaleString("es-ES")} €/año en ${nombre} tu tipo efectivo es ${pct(r.tipoEfectivo)}.`,
        },
        {
          q: "¿Por qué cambia el IRPF según CCAA?",
          a: "Cada Comunidad Autónoma fija su propia escala autonómica del IRPF (la mitad del impuesto). La escala estatal es común a todas. Madrid tiene la escala autonómica más baja; Cataluña y Asturias las más altas.",
        },
        {
          q: "¿Estas cifras incluyen mínimos personales y deducciones?",
          a: "No. Son cálculos sobre la base imponible bruta. No incluyen mínimo personal (~5.550 €), familiares (descendientes, ascendientes), aportaciones a planes de pensiones, deducciones por vivienda o por CCAA específicas. Tu IRPF real será algo menor.",
        },
      ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Breadcrumbs
        items={[
          { label: "IRPF por CCAA", href: "/calculadora-irpf" },
          { label: nombre, href: `/irpf/${ccaa}` },
          { label: `${n.toLocaleString("es-ES")} €` },
        ]}
      />

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          IRPF en {nombre} para {n.toLocaleString("es-ES")} € (2026)
        </h1>
        <p className="mt-3 text-neutral-600 max-w-3xl">
          {r.esRegimenForal
            ? `${nombre} aplica régimen fiscal foral con sus propias escalas.`
            : `Cálculo aproximado de tu IRPF anual con base imponible de ${n.toLocaleString("es-ES")} € en ${nombre}, combinando escala estatal + autonómica.`}
        </p>
        <LastUpdated date="2026-05-22" source="Fuente: AEAT, BOE autonómicos" className="mt-3" />
      </header>

      {r.esRegimenForal ? (
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm text-amber-900">
            <strong>{nombre} es régimen foral.</strong> Cuotia no calcula IRPF foral.
            Consulta directamente la Hacienda Foral de {nombre} en sus portales oficiales.
          </p>
        </section>
      ) : (
        <>
          <QuickAnswer
            question={`¿Cuánto IRPF se paga con ${n.toLocaleString("es-ES")} € en ${nombre}?`}
            answer={`Un autónomo con ${n.toLocaleString("es-ES")} € de base imponible en ${nombre} paga aproximadamente ${eur(r.total)} de IRPF al año (tipo efectivo ${pct(r.tipoEfectivo)}). De ese total, ${eur(r.estatal)} es escala estatal y ${eur(r.autonomico)} es escala autonómica de ${nombre}. La cifra no incluye mínimos personales ni deducciones específicas.`}
            updatedAt="2026-05-22"
          />

          <div className="grid gap-4 sm:grid-cols-2 mb-8">
            <div className="rounded-xl border-2 border-[#FECACA] bg-[#FEF2F2] p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">IRPF anual</p>
              <p className="mt-1 font-bold text-3xl text-[#B91C1C]">{eur(r.total)}</p>
              <p className="mt-2 text-sm text-neutral-700">
                Tipo efectivo <strong className="text-neutral-900">{pct(r.tipoEfectivo)}</strong>
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-5 text-sm space-y-1">
              <div className="flex justify-between"><span className="text-neutral-500">Escala estatal</span><span className="font-medium text-neutral-900">{eur(r.estatal)}</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Escala {nombre}</span><span className="font-medium text-neutral-900">{eur(r.autonomico)}</span></div>
              <div className="border-t border-neutral-200 pt-2 flex justify-between">
                <span className="font-semibold text-neutral-900">Total</span>
                <span className="font-bold text-neutral-900">{eur(r.total)}</span>
              </div>
              <div className="border-t border-neutral-200 pt-2 flex justify-between">
                <span className="text-neutral-500">Neto tras IRPF</span>
                <span className="font-semibold text-neutral-900">{eur(n - r.total)}</span>
              </div>
            </div>
          </div>

          <article className="prose prose-neutral max-w-3xl space-y-5">
            <h2 className="text-xl font-bold text-neutral-900">Comparativa con otras CCAA</h2>
            <p className="text-sm">
              Para los mismos {n.toLocaleString("es-ES")} € de base imponible, esta es la
              comparativa con otras 4 Comunidades Autónomas:
            </p>
            <div className="not-prose overflow-x-auto my-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-neutral-300">
                    <th scope="col" className="text-left py-2 font-semibold text-neutral-900">CCAA</th>
                    <th scope="col" className="text-right py-2 font-semibold text-neutral-900">IRPF anual</th>
                    <th scope="col" className="text-right py-2 font-semibold text-neutral-900">Tipo efectivo</th>
                    <th scope="col" className="text-right py-2 font-semibold text-[#B91C1C]">Δ vs {nombre}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr className="bg-[#FEF2F2]">
                    <th scope="row" className="py-2 font-semibold text-neutral-900 text-left">{nombre} (esta página)</th>
                    <td className="text-right py-2 font-semibold text-neutral-900">{eur(r.total)}</td>
                    <td className="text-right py-2 text-neutral-700">{pct(r.tipoEfectivo)}</td>
                    <td className="text-right py-2">—</td>
                  </tr>
                  {refs.slice(0, 3).map((ref) => {
                    const rr = calcularIRPFConCCAA(n, ref.ccaa);
                    if (rr.esRegimenForal) return null;
                    const diff = rr.total - r.total;
                    return (
                      <tr key={ref.ccaa}>
                        <th scope="row" className="py-2 font-normal text-neutral-700 text-left">
                          <Link href={`/irpf/${ref.ccaa}/${ingresos}`} className="text-[#B91C1C] hover:underline">{ref.nombre}</Link>
                        </th>
                        <td className="text-right py-2 text-neutral-700">{eur(rr.total)}</td>
                        <td className="text-right py-2 text-neutral-500">{pct(rr.tipoEfectivo)}</td>
                        <td className={`text-right py-2 font-medium ${diff > 0 ? "text-[#B91C1C]" : diff < 0 ? "text-green-700" : ""}`}>
                          {diff > 0 ? `+${eur(diff)}` : diff < 0 ? `${eur(diff)}` : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <h2 className="text-xl font-bold text-neutral-900">Lo que no incluye este cálculo</h2>
            <ul>
              <li>Mínimo personal (~5.550 € exento)</li>
              <li>Mínimos por descendientes (~2.400 € por hijo)</li>
              <li>Aportaciones a planes de pensiones (reducen base hasta 1.500 €/año)</li>
              <li>Deducciones autonómicas específicas de {nombre} (vivienda, donativos, etc.)</li>
              <li>Reducción del 5% por gastos de difícil justificación (estimación directa simplificada)</li>
            </ul>
            <p>
              Por estos motivos, tu IRPF real <strong>será menor que {eur(r.total)}</strong>.
              Consulta la calculadora interactiva para ajustar tu caso.
            </p>
          </article>
        </>
      )}

      <section className="mt-10">
        <FAQ items={faqs} title={`Preguntas para ${n.toLocaleString("es-ES")} € en ${nombre}`} />
      </section>

      <section className="mt-10 rounded-lg border border-neutral-200 bg-white p-5">
        <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-3">
          Otros ingresos en {nombre}
        </p>
        <div className="flex flex-wrap gap-2">
          {INGRESOS_TARGETS.filter((x) => x !== n).map((x) => (
            <Link
              key={x}
              href={`/irpf/${ccaa}/${slugFromIngresos(x)}`}
              className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 hover:border-[#B91C1C] hover:text-[#B91C1C]"
            >
              {x.toLocaleString("es-ES")} €
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-neutral-600">
          ¿Otra Comunidad?{" "}
          <Link href={`/calculadora-irpf`} className="text-[#B91C1C] underline">
            calculadora completa con selector de CCAA
          </Link>.
        </p>
      </section>

      <RelatedCalcs current="irpf" related={["cuota", "neto", "retencion", "slvsauto"]} />
    </div>
  );
}
