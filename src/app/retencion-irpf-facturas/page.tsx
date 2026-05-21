import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickAnswer } from "@/components/QuickAnswer";
import { FAQ } from "@/components/FAQ";
import { LastUpdated } from "@/components/LastUpdated";
import { RetencionIRPFCalc } from "@/components/calculators/RetencionIRPFCalc";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

const ogUrl = `${SITE_URL}/api/og?title=${encodeURIComponent("Calculadora retención IRPF facturas 2026")}&subtitle=${encodeURIComponent("15% general · 7% nuevos autónomos · 19% alquileres")}&tag=Retención`;

export const metadata: Metadata = {
  title: "Calculadora retención IRPF en facturas 2026 · 15%, 7%, 19%",
  description: "Calcula cuánto te retiene un cliente en tu factura: 15% general profesional, 7% nuevos autónomos primeros 3 años, 19% alquileres, 2% agrícolas. Con IVA incluido.",
  alternates: { canonical: "/retencion-irpf-facturas" },
  openGraph: {
    title: "Retención IRPF facturas 2026",
    description: "15% / 7% / 19% / 2% según tipo de actividad.",
    images: [{ url: ogUrl, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [ogUrl] },
};

const calcSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora retención IRPF en facturas 2026",
  url: `${SITE_URL}/retencion-irpf-facturas`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
};

const faqs = [
  {
    q: "¿Qué porcentaje me retienen en una factura como autónomo?",
    a: "El 15% por defecto si eres profesional facturando a una empresa española. Si eres nuevo autónomo (año de alta + 2 siguientes), puedes aplicar el 7%. Para arrendamiento de inmuebles a empresa: 19%. Actividades agrícolas: 2% (1% ganadería intensiva). Facturando a particulares: 0% (sin retención).",
  },
  {
    q: "¿Cuándo aplica el 7% en vez del 15%?",
    a: "Cuando eres profesional persona física (sección 2ª del IAE) y estás en el año de alta como autónomo o en los dos siguientes ejercicios. Debes marcarlo expresamente en la factura. No aplica a empresarios (sección 1ª del IAE).",
  },
  {
    q: "¿Cómo se calcula la retención sobre el importe?",
    a: "Se aplica sobre la base imponible (antes del IVA). Fórmula: base × tipo retención. El IVA se calcula también sobre la base, y el cliente te paga (base + IVA – retención). Ejemplo: base 1.000 € + IVA 21% (210 €) – retención 15% (150 €) = recibes 1.060 €.",
  },
  {
    q: "¿Quién ingresa la retención a Hacienda?",
    a: "El cliente (pagador). Te retiene en la factura y luego ingresa ese importe a Hacienda a tu nombre vía modelo 111 (trimestral) y modelo 190 (resumen anual). Tú la recuperas o pagas la diferencia en la declaración de la Renta.",
  },
  {
    q: "¿Tengo que poner la retención en la factura?",
    a: "Sí. Debes indicar expresamente el porcentaje y el importe de retención IRPF. Sin esta mención, el cliente no sabrá retener correctamente. El generador de facturas de Cuotia incluye el campo.",
  },
  {
    q: "¿Y si facturo a un particular?",
    a: "No hay retención. Los particulares no son agentes retenedores. Tú pagas el IRPF directamente vía declaración de la Renta o modelo 130 trimestral si menos del 70% de tus ingresos llevan retención.",
  },
  {
    q: "¿Las retenciones de mis facturas son lo que pago de IRPF?",
    a: "No exactamente. Son un anticipo. Al hacer la declaración de la Renta se calcula tu IRPF total según tus ingresos y tramos. Si lo que te retuvieron es menos, pagas diferencia. Si es más, te devuelven.",
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <Breadcrumbs items={[{ label: "Retención IRPF facturas" }]} />

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Calculadora retención IRPF en facturas 2026
        </h1>
        <p className="mt-3 text-neutral-600 max-w-3xl">
          Cuánto te retiene un cliente en cada factura según tu actividad y antigüedad
          como autónomo.
        </p>
        <LastUpdated date="2026-05-20" source="Fuente: AEAT (modelo 111)" className="mt-3" />
      </header>

      <QuickAnswer
        question="¿Cuánto IRPF retiene un cliente en mi factura?"
        answer="Depende de tu actividad: el 15% por defecto si eres profesional facturando a empresa española, el 7% si eres nuevo autónomo (primeros 3 años desde el alta como profesional sección 2ª IAE), el 19% si facturas arrendamiento de inmuebles a empresa, el 2% para actividades agrícolas. Facturando a particulares no hay retención (0%). La retención se aplica sobre la base imponible (antes del IVA) y el cliente la ingresa a Hacienda a tu nombre."
        updatedAt="2026-05-20"
      />

      <RetencionIRPFCalc />

      <article className="prose prose-neutral max-w-3xl mt-12 space-y-5">
        <h2 className="text-xl font-bold text-neutral-900">Tabla resumen de tipos 2026</h2>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <caption className="sr-only">Tipos de retención IRPF aplicables a facturas de autónomos en 2026</caption>
            <thead>
              <tr className="border-b border-neutral-300">
                <th scope="col" className="text-left py-2 font-semibold text-neutral-900">Actividad</th>
                <th scope="col" className="text-right py-2 font-semibold text-neutral-900">Tipo</th>
                <th scope="col" className="text-left py-2 font-semibold text-neutral-900 pl-4">Cuándo aplica</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">Profesional general</th>
                <td className="text-right py-2 font-semibold text-neutral-900">15%</td>
                <td className="py-2 text-neutral-600 pl-4">Por defecto, profesionales sección 2ª IAE facturando a empresa</td>
              </tr>
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">Nuevo autónomo</th>
                <td className="text-right py-2 font-semibold text-neutral-900">7%</td>
                <td className="py-2 text-neutral-600 pl-4">Año de alta + 2 siguientes (solo sección 2ª)</td>
              </tr>
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">Alquiler inmuebles</th>
                <td className="text-right py-2 font-semibold text-neutral-900">19%</td>
                <td className="py-2 text-neutral-600 pl-4">Arrendamiento a empresa</td>
              </tr>
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">Agrícola/Ganadera</th>
                <td className="text-right py-2 font-semibold text-neutral-900">2% / 1%</td>
                <td className="py-2 text-neutral-600 pl-4">2% general, 1% ganadería intensiva</td>
              </tr>
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">Facturas a particular</th>
                <td className="text-right py-2 font-semibold text-neutral-900">0%</td>
                <td className="py-2 text-neutral-600 pl-4">El particular no retiene</td>
              </tr>
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">Intracomunitaria</th>
                <td className="text-right py-2 font-semibold text-neutral-900">0%</td>
                <td className="py-2 text-neutral-600 pl-4">Cliente UE con NIF intracomunitario</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold text-neutral-900">Empresario vs profesional (clave)</h2>
        <p>
          La retención IRPF en facturas <strong>solo aplica a profesionales</strong>
          (epígrafes IAE sección 2ª: abogados, médicos, consultores, programadores,
          arquitectos...). Si eres <strong>empresario</strong> (sección 1ª: comercio,
          restaurante, fabricación...), no aplica retención en tus facturas, aunque
          factures a empresa.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">¿Cómo te afecta a la Renta?</h2>
        <p>
          Las retenciones soportadas son <strong>pagos a cuenta del IRPF</strong>.
          Al hacer la declaración anual, Hacienda calcula tu IRPF total y compara
          con lo retenido:
        </p>
        <ul>
          <li><strong>Retenido &gt; IRPF debido</strong>: te devuelven la diferencia</li>
          <li><strong>Retenido &lt; IRPF debido</strong>: pagas la diferencia</li>
        </ul>
        <p>
          Si llevas modelo 130 trimestral (porque menos del 70% de tus ingresos llevan
          retención), las retenciones se suman a tus pagos fraccionados a cuenta.
        </p>
      </article>

      <section className="mt-10">
        <FAQ items={faqs} />
      </section>

      <section className="mt-10 rounded-lg border border-neutral-200 bg-white p-5">
        <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-3">Relacionado</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <Link href="/generador-facturas" className="text-sm text-[#B91C1C] hover:underline">
            → Generador de facturas (con retención IRPF)
          </Link>
          <Link href="/calculadora-irpf" className="text-sm text-[#B91C1C] hover:underline">
            → IRPF anual + modelo 130 trimestral
          </Link>
          <Link href="/neto-bruto" className="text-sm text-[#B91C1C] hover:underline">
            → Cuánto te queda al mes
          </Link>
          <Link href="/calculadora-iva" className="text-sm text-[#B91C1C] hover:underline">
            → IVA y modelo 303
          </Link>
        </div>
      </section>
    </div>
  );
}
