import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickAnswer } from "@/components/QuickAnswer";
import { FAQ } from "@/components/FAQ";
import { LastUpdated } from "@/components/LastUpdated";
import { findTramo, TRAMOS_2026, TARIFA_PLANA_MENSUAL, DESGLOSE_RETA_2026, TIPO_TOTAL_COTIZACION_RETA_2026_PCT } from "@/lib/cuota-autonomo";
import { CUOTA_INGRESOS_TARGETS as INGRESOS_TARGETS, cuotaSlug as slugFromIngresos } from "@/lib/seo-targets";
import { eur } from "@/lib/format";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

// Solo se sirven las URLs prerenderizadas en generateStaticParams;
// cierra el espacio ilimitado de URLs indexables (crawl budget / index bloat).
export const dynamicParams = false;

function ingresosFromSlug(slug: string): number | null {
  const match = slug.match(/^(\d+)-euros?-mes$/);
  if (!match) return null;
  const n = parseInt(match[1], 10);
  if (isNaN(n) || n < 0 || n > 50000) return null;
  return n;
}

export async function generateStaticParams() {
  return INGRESOS_TARGETS.map((n) => ({ ingresos: slugFromIngresos(n) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ingresos: string }>;
}): Promise<Metadata> {
  const { ingresos } = await params;
  const n = ingresosFromSlug(ingresos);
  if (n === null) return { title: "No encontrado" };

  const title = `Cuota autónomo para ${n.toLocaleString("es-ES")} € al mes (2026)`;
  const tramo = findTramo(n);
  const description = `Si tu rendimiento neto es ${n.toLocaleString("es-ES")} €/mes, tu cuota de autónomo 2026 es ${eur(tramo.cuotaMin)} (tramo ${tramo.numero}). Tarifa plana 88,64 €/mes. Datos RD-ley 3/2026.`;
  const ogUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(`Cuota autónomo ${n.toLocaleString("es-ES")} €/mes`)}&subtitle=${encodeURIComponent(`Cuota mínima ${eur(tramo.cuotaMin)} · Tramo ${tramo.numero} · Tarifa plana 88,64 €`)}&tag=Cuota`;

  return {
    title,
    description,
    alternates: { canonical: `/cuota-autonomo/${ingresos}` },
    openGraph: {
      title,
      description,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: [ogUrl] },
  };
}

export default async function Page({ params }: { params: Promise<{ ingresos: string }> }) {
  const { ingresos } = await params;
  const n = ingresosFromSlug(ingresos);
  if (n === null) notFound();

  const tramo = findTramo(n);
  const anual = tramo.cuotaMin * 12;
  const ahorroAnualTarifaPlana = (tramo.cuotaMin - TARIFA_PLANA_MENSUAL) * 12;

  const tramoIdx = TRAMOS_2026.findIndex((t) => t.numero === tramo.numero);
  const tramoAnterior = tramoIdx > 0 ? TRAMOS_2026[tramoIdx - 1] : null;
  const tramoSiguiente = tramoIdx < TRAMOS_2026.length - 1 ? TRAMOS_2026[tramoIdx + 1] : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Cuota autónomo para ${n.toLocaleString("es-ES")} €/mes (2026)`,
    description: `Cálculo exacto de la cuota mensual de autónomo en 2026 para rendimiento neto de ${n.toLocaleString("es-ES")} €/mes según RD-ley 3/2026.`,
    datePublished: "2026-05-22",
    dateModified: "2026-05-22",
    author: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/cuota-autonomo/${ingresos}` },
  };

  const faqs = [
    {
      q: `¿Cuánto paga de autónomo si ingreso ${n.toLocaleString("es-ES")} € netos al mes?`,
      a: `La cuota mínima del tramo correspondiente (tramo ${tramo.numero}) es ${eur(tramo.cuotaMin)}/mes en 2026. Esto incluye contingencias comunes + profesionales + cese de actividad + formación + MEI 0,9%. Si eres nuevo autónomo, puedes aplicar la tarifa plana de 88,64 €/mes durante los primeros 12 meses.`,
    },
    {
      q: `¿Puedo elegir pagar más para tener mejor pensión?`,
      a: `Sí. En tu tramo (${tramo.numero}) puedes cotizar entre la cuota mínima ${eur(tramo.cuotaMin)} y la máxima ${eur(tramo.cuotaMax)}/mes. Cotizar por la máxima sube tu base reguladora para jubilación, baja médica y otras prestaciones, pero pagas más cada mes.`,
    },
    {
      q: `¿Y si me equivoco al estimar mis ingresos?`,
      a: `La Seguridad Social regulariza tu cuota tras presentar la declaración de la Renta. Si declaraste ingresos menores a los reales, pagas la diferencia retroactiva. Si los declaraste mayores, te devuelven el exceso.`,
    },
    {
      q: `¿Tengo derecho a tarifa plana con estos ingresos?`,
      a: `La tarifa plana (88,64 €/mes) está disponible para nuevos autónomos en su primer año, independientemente del nivel de ingresos. La prórroga de 12 meses adicionales solo aplica si tu rendimiento neto anual queda por debajo del SMI (~16.576 €/año en 2026 = ~1.381 €/mes). Con ${n.toLocaleString("es-ES")} €/mes ${n * 12 < 16576 ? "SÍ tendrías derecho a prórroga" : "NO tendrías derecho a prórroga"}.`,
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Breadcrumbs items={[
        { label: "Cuota autónomo", href: "/cuota-autonomo" },
        { label: `${n.toLocaleString("es-ES")} €/mes` },
      ]} />

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Cuota de autónomo para {n.toLocaleString("es-ES")} €/mes (2026)
        </h1>
        <p className="mt-3 text-neutral-600 max-w-3xl">
          Cálculo exacto según los 15 tramos vigentes (RD-ley 3/2026) si tu rendimiento
          neto mensual es de {n.toLocaleString("es-ES")} €.
        </p>
        <LastUpdated date="2026-05-22" source="Fuente: TGSS, BOE (RD-ley 3/2026)" className="mt-3" />
      </header>

      <QuickAnswer
        question={`¿Cuánto pago de autónomo con ${n.toLocaleString("es-ES")} €/mes?`}
        answer={`Tu cuota mínima mensual de autónomo en 2026 es ${eur(tramo.cuotaMin)} (tramo ${tramo.numero}). Eso son ${eur(anual)} al año. Si eliges cotizar por la base máxima del tramo, pagarías ${eur(tramo.cuotaMax)}/mes. Como nuevo autónomo, podrías aplicar tarifa plana 88,64 €/mes y ahorrar ${eur(Math.max(0, ahorroAnualTarifaPlana))} el primer año.`}
        updatedAt="2026-05-22"
      />

      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <div className="rounded-xl border-2 border-[#FECACA] bg-[#FEF2F2] p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">Tu cuota mensual</p>
          <p className="mt-1 font-bold text-3xl text-[#B91C1C]">{eur(tramo.cuotaMin)}</p>
          <p className="mt-2 text-sm text-neutral-700">
            {eur(anual)} al año · tramo {tramo.numero}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Si aplicas tarifa plana</p>
          <p className="mt-1 font-bold text-3xl text-neutral-900">88,64 €</p>
          <p className="mt-2 text-sm text-neutral-700">
            primeros 12 meses · ahorras <strong className="text-neutral-900">{eur(Math.max(0, ahorroAnualTarifaPlana))}</strong>
          </p>
        </div>
      </div>

      <article className="prose prose-neutral max-w-3xl space-y-5">
        <h2 className="text-xl font-bold text-neutral-900">Tu tramo en detalle</h2>
        <p>
          Con {n.toLocaleString("es-ES")} €/mes de rendimiento neto, estás en el{" "}
          <strong>tramo {tramo.numero}</strong> ({tramo.label}). Las cuotas vigentes 2026 para
          este tramo son:
        </p>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-neutral-300">
                <th scope="col" className="text-left py-2 font-semibold text-neutral-900">Concepto</th>
                <th scope="col" className="text-right py-2 font-semibold text-neutral-900">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">Rango de ingresos del tramo</th>
                <td className="text-right py-2 text-neutral-700">
                  {tramo.minIngresos > 0 ? `${eur(tramo.minIngresos)} – ` : "Hasta "}
                  {tramo.maxIngresos ? `${eur(tramo.maxIngresos)}/mes` : "+"}
                </td>
              </tr>
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">Cuota mínima mensual</th>
                <td className="text-right py-2 font-semibold text-neutral-900">{eur(tramo.cuotaMin)}</td>
              </tr>
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">Cuota máxima mensual</th>
                <td className="text-right py-2 font-semibold text-neutral-900">{eur(tramo.cuotaMax)}</td>
              </tr>
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">Coste anual (mínima)</th>
                <td className="text-right py-2 font-semibold text-neutral-900">{eur(anual)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {(tramoAnterior || tramoSiguiente) && (
          <>
            <h2 className="text-xl font-bold text-neutral-900">Tramos vecinos</h2>
            <div className="not-prose grid gap-3 sm:grid-cols-2 my-4">
              {tramoAnterior && (
                <div className="rounded-lg border border-neutral-200 bg-white p-4">
                  <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">
                    Tramo {tramoAnterior.numero} (anterior)
                  </p>
                  <p className="text-sm text-neutral-700">
                    Hasta {tramoAnterior.maxIngresos ? eur(tramoAnterior.maxIngresos) : "—"}/mes
                  </p>
                  <p className="font-semibold text-neutral-900 mt-1">{eur(tramoAnterior.cuotaMin)}/mes</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Pagas <strong>{eur(Math.max(0, tramo.cuotaMin - tramoAnterior.cuotaMin))}</strong> más que el tramo anterior
                  </p>
                </div>
              )}
              {tramoSiguiente && (
                <div className="rounded-lg border border-neutral-200 bg-white p-4">
                  <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">
                    Tramo {tramoSiguiente.numero} (siguiente)
                  </p>
                  <p className="text-sm text-neutral-700">
                    Desde {eur(tramoSiguiente.minIngresos)}/mes
                  </p>
                  <p className="font-semibold text-neutral-900 mt-1">{eur(tramoSiguiente.cuotaMin)}/mes</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Si subes ingresos: <strong>+{eur(Math.max(0, tramoSiguiente.cuotaMin - tramo.cuotaMin))}</strong> más al mes
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        <h2 className="text-xl font-bold text-neutral-900">Cómo se calcula</h2>
        <p>
          La cuota mensual incluye varios conceptos sobre tu base de cotización:
        </p>
        <ul>
          {DESGLOSE_RETA_2026.map((d) => (
            <li key={d.concepto}>
              <strong>{d.concepto}</strong>: {d.pct}{d.nota ? ` (${d.nota})` : ""}
            </li>
          ))}
        </ul>
        <p>
          Total: <strong>{TIPO_TOTAL_COTIZACION_RETA_2026_PCT}</strong> sobre la base de cotización del tramo {tramo.numero}.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">¿Qué pasa si cambian tus ingresos?</h2>
        <p>
          Puedes <strong>cambiar de tramo hasta 6 veces al año</strong> (cada 2 meses) en la
          sede electrónica de la Seguridad Social. Si tus ingresos reales del año son distintos
          a lo declarado, la TGSS regulariza tu cuota tras presentar la Renta del ejercicio.
        </p>
      </article>

      <section className="mt-10">
        <FAQ items={faqs} title={`Preguntas frecuentes para ${n.toLocaleString("es-ES")} €/mes`} />
      </section>

      <section className="mt-10 rounded-lg border border-neutral-200 bg-white p-5">
        <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-3">Calcula otros ingresos</p>
        <div className="flex flex-wrap gap-2">
          {INGRESOS_TARGETS.filter((x) => x !== n).map((x) => (
            <Link
              key={x}
              href={`/cuota-autonomo/${slugFromIngresos(x)}`}
              className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 hover:border-[#B91C1C] hover:text-[#B91C1C]"
            >
              {x.toLocaleString("es-ES")} €/mes
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-neutral-600">
          ¿Otro ingreso? Usa la{" "}
          <Link href="/cuota-autonomo" className="text-[#B91C1C] underline">
            calculadora completa con tabla de los 15 tramos
          </Link>.
        </p>
      </section>
    </div>
  );
}
