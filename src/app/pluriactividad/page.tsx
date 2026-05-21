import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickAnswer } from "@/components/QuickAnswer";
import { FAQ } from "@/components/FAQ";
import { LastUpdated } from "@/components/LastUpdated";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

const ogUrl = `${SITE_URL}/api/og?title=${encodeURIComponent("Pluriactividad 2026 · autónomo + cuenta ajena")}&subtitle=${encodeURIComponent("Bonificación cuota RETA · devolución exceso · cómo se calcula")}&tag=Pluriactividad`;

export const metadata: Metadata = {
  title: "Pluriactividad 2026 · autónomo + trabajador por cuenta ajena",
  description: "Cómo cotiza el autónomo en pluriactividad (autónomo + asalariado): bonificación 50%/75% primeros años, devolución de exceso de cotización, requisitos y cómo solicitarlo.",
  alternates: { canonical: "/pluriactividad" },
  openGraph: {
    title: "Pluriactividad 2026",
    description: "Autónomo + cuenta ajena: bonificación y devolución exceso cotización.",
    images: [{ url: ogUrl, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [ogUrl] },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Pluriactividad 2026: autónomo + trabajador por cuenta ajena",
  description: "Guía sobre la pluriactividad en España: cotización en dos regímenes, bonificación de cuota RETA, devolución del exceso, requisitos y solicitud.",
  datePublished: "2026-05-20",
  dateModified: "2026-05-20",
  author: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/pluriactividad` },
};

const faqs = [
  {
    q: "¿Qué es estar en pluriactividad?",
    a: "Estás en pluriactividad cuando cotizas simultáneamente en dos regímenes distintos de la Seguridad Social: por ejemplo, autónomo (RETA) + trabajador por cuenta ajena (Régimen General). No confundir con pluriempleo (dos trabajos por cuenta ajena).",
  },
  {
    q: "¿Cuánto cotizo de menos siendo pluriactivo?",
    a: "Puedes elegir bonificación en cuota RETA: 50% durante los primeros 18 meses y 75% durante los siguientes 18 meses, hasta un máximo de 36 meses. La bonificación se aplica sobre la cuota mínima del tramo correspondiente. Solo si tu actividad de cuenta ajena tiene base de cotización mínima ≥ a 15.876 €/año (estimado SMI 2025).",
  },
  {
    q: "¿Y qué es la devolución de exceso de cotización?",
    a: "Si las cotizaciones combinadas (autónomo + cuenta ajena) superan el límite máximo legal anual, tienes derecho a que la TGSS te devuelva el 50% del exceso (con tope del 50% de las cuotas RETA pagadas). El límite 2026 está en torno a 16.500 €/año combinados. Hay que solicitarlo expresamente antes del 30 de abril del año siguiente.",
  },
  {
    q: "¿Puedo elegir entre bonificación y devolución?",
    a: "Son compatibles para distintos periodos. Durante los meses con bonificación (50%/75%), no se aplica el cálculo del exceso. Tras agotar los 36 meses, puedes solicitar devolución cada año si superas el límite.",
  },
  {
    q: "¿Cómo solicito la bonificación de pluriactividad?",
    a: "En el alta como autónomo, marca expresamente la opción 'pluriactividad' en el modelo TA.0521. Aporta el contrato de trabajo o certificado de empresa. La TGSS aplica la bonificación automáticamente desde el alta. Si te diste de alta sin solicitarla, puedes pedirla posteriormente en cualquier Administración de la TGSS.",
  },
  {
    q: "¿Pierdo la tarifa plana si soy pluriactivo?",
    a: "Sí. La bonificación de pluriactividad y la tarifa plana son incompatibles. Tienes que elegir una. Para ingresos altos por cuenta ajena (>SMI), la pluriactividad suele compensar más. Para ingresos bajos por cuenta ajena, la tarifa plana puede ser mejor.",
  },
  {
    q: "¿Tengo derecho a doble prestación por desempleo?",
    a: "Acumulas cotizaciones en ambos regímenes pero las prestaciones se calculan según el régimen donde cotices la actividad que cesa. Si pierdes el empleo por cuenta ajena, cobras paro por Régimen General. Si cesas como autónomo, cobras cese de actividad por RETA (si lo tienes contratado).",
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Breadcrumbs items={[{ label: "Pluriactividad" }]} />

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Pluriactividad 2026: autónomo + cuenta ajena
        </h1>
        <p className="mt-3 text-neutral-600 max-w-3xl">
          Cómo cotiza, qué bonificaciones tienes, y cómo recuperar el exceso si pagas
          de más entre los dos regímenes.
        </p>
        <LastUpdated date="2026-05-20" source="Fuente: TGSS, BOE (Ley 20/2007)" className="mt-3" />
      </header>

      <QuickAnswer
        question="¿Qué bonificación tengo en pluriactividad?"
        answer="Si trabajas a la vez por cuenta ajena y como autónomo (pluriactividad), tienes dos opciones: (1) bonificación del 50% en la cuota RETA los primeros 18 meses y del 75% los 18 siguientes (máximo 36 meses), o (2) si tus cotizaciones combinadas superan el límite anual (~16.500 € en 2026), puedes pedir devolución del 50% del exceso, antes del 30 de abril del año siguiente. Son incompatibles con la tarifa plana de nuevo autónomo."
        updatedAt="2026-05-20"
      />

      <article className="prose prose-neutral max-w-3xl mt-8 space-y-5">
        <h2 className="text-xl font-bold text-neutral-900">Tabla de bonificaciones</h2>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <caption className="sr-only">Bonificación cuota RETA por pluriactividad</caption>
            <thead>
              <tr className="border-b border-neutral-300">
                <th scope="col" className="text-left py-2 font-semibold text-neutral-900">Periodo</th>
                <th scope="col" className="text-right py-2 font-semibold text-neutral-900">Bonificación</th>
                <th scope="col" className="text-right py-2 font-semibold text-neutral-900">Cuota efectiva (tramo 1)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">Meses 1-18</th>
                <td className="text-right py-2 font-semibold text-neutral-900">50%</td>
                <td className="text-right py-2 text-neutral-700">~100 €/mes</td>
              </tr>
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">Meses 19-36</th>
                <td className="text-right py-2 font-semibold text-neutral-900">75%</td>
                <td className="text-right py-2 text-neutral-700">~50 €/mes</td>
              </tr>
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">A partir del mes 37</th>
                <td className="text-right py-2 font-semibold text-neutral-900">0%</td>
                <td className="text-right py-2 text-neutral-700">Cuota completa por tramo</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          <strong>Aplica sobre la cuota mínima del tramo</strong>. Si eliges base superior
          a la mínima, la bonificación es sobre la mínima y pagas el resto íntegro.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">Devolución del exceso de cotización</h2>
        <p>
          Si entre el RETA y el Régimen General has cotizado más del <strong>límite máximo
          anual combinado</strong> (~16.500 €/año en 2026), tienes derecho a recuperar el
          <strong> 50% del exceso</strong>, con un tope del 50% de las cuotas RETA pagadas ese año.
        </p>

        <h3 className="text-lg font-semibold text-neutral-900">Cómo solicitarla</h3>
        <ol>
          <li><strong>Plazo</strong>: antes del 30 de abril del año siguiente al ejercicio.</li>
          <li><strong>Solicitud</strong>: en cualquier Administración TGSS o por Sede Electrónica con certificado digital.</li>
          <li><strong>Documentación</strong>: declaración de la renta y certificados de cotización ambos regímenes.</li>
          <li><strong>Pago</strong>: la TGSS abona en cuenta en 1-3 meses.</li>
        </ol>

        <h2 className="text-xl font-bold text-neutral-900">¿Cuándo conviene pluriactividad vs tarifa plana?</h2>
        <ul>
          <li><strong>Pluriactividad (bonificación)</strong>: cuando tu trabajo por cuenta ajena cubre ya parte de tus cotizaciones de Seguridad Social. La cuota neta puede ser muy baja.</li>
          <li><strong>Tarifa plana</strong>: si tu trabajo por cuenta ajena es a tiempo parcial o por debajo del SMI. La tarifa plana de 88,64 €/mes es más predecible.</li>
        </ul>
        <p>
          Si dudas, suele compensar más la pluriactividad cuando tu sueldo por cuenta ajena
          es ≥ SMI completo (~16.576 €/año en 2026).
        </p>

        <h2 className="text-xl font-bold text-neutral-900">Marco legal</h2>
        <ul>
          <li><strong>Ley 20/2007</strong>, del Estatuto del trabajo autónomo (art. 28).</li>
          <li><strong>Real Decreto 1/1994</strong>, Texto refundido LGSS.</li>
          <li><strong>Orden de la TGSS</strong> que regula la devolución del exceso (anualizada).</li>
        </ul>
      </article>

      <section className="mt-10">
        <FAQ items={faqs} />
      </section>

      <section className="mt-10 rounded-lg border border-neutral-200 bg-white p-5">
        <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-3">Relacionado</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <Link href="/cuota-autonomo" className="text-sm text-[#B91C1C] hover:underline">
            → Calculadora cuota autónomo (sin bonificación)
          </Link>
          <Link href="/guias/tarifa-plana" className="text-sm text-[#B91C1C] hover:underline">
            → Tarifa plana 2026 (alternativa)
          </Link>
          <Link href="/guias/alta-autonomo" className="text-sm text-[#B91C1C] hover:underline">
            → Cómo darse de alta (con pluriactividad)
          </Link>
          <Link href="/cuota-autonomo-societario" className="text-sm text-[#B91C1C] hover:underline">
            → Autónomo societario 2026
          </Link>
        </div>
      </section>
    </div>
  );
}
