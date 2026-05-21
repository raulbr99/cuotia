import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickAnswer } from "@/components/QuickAnswer";
import { FAQ } from "@/components/FAQ";
import { LastUpdated } from "@/components/LastUpdated";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

const ogUrl = `${SITE_URL}/api/og?title=${encodeURIComponent("SL vs Autónomo 2026")}&subtitle=${encodeURIComponent("Cuándo compensa crear sociedad · comparativa por nivel ingresos")}&tag=SL+vs+Autónomo`;

export const metadata: Metadata = {
  title: "SL vs Autónomo 2026 · cuándo compensa crear sociedad",
  description: "Comparativa fiscal SL (Sociedad Limitada) vs autónomo persona física en 2026. Cuándo conviene cambiar según ingresos, ventajas/desventajas reales, costes ocultos.",
  alternates: { canonical: "/sl-vs-autonomo" },
  openGraph: {
    title: "SL vs Autónomo 2026",
    description: "Comparativa fiscal según nivel de ingresos.",
    images: [{ url: ogUrl, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [ogUrl] },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "SL vs Autónomo 2026: cuándo compensa cambiar a sociedad",
  description: "Análisis fiscal de la elección entre seguir como autónomo persona física o crear una Sociedad Limitada en 2026. Tablas comparativas a distintos niveles de ingresos.",
  datePublished: "2026-05-20",
  dateModified: "2026-05-20",
  author: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/sl-vs-autonomo` },
};

const faqs = [
  {
    q: "¿A partir de qué ingresos conviene crear una SL?",
    a: "Como regla aproximada, a partir de ~60.000-80.000 € de beneficio anual (después de gastos) puede empezar a compensar fiscalmente, especialmente si no necesitas sacar todo el dinero a tu cuenta personal cada año. Por debajo de 40.000 €, el autónomo persona física suele salir más rentable por la simplicidad y la tarifa plana inicial.",
  },
  {
    q: "¿Por qué la SL es más cara en gestión?",
    a: "Costes recurrentes adicionales: gestoría/contabilidad obligatoria (~150-300 €/mes), depósito de cuentas anuales (~50 €), libros contables, auditoría si superas umbrales. Coste de constitución inicial: notaría + registro mercantil ~600-1.000 €. Además el administrador-socio paga autónomo societario (~451 €/mes en 2026).",
  },
  {
    q: "¿Qué impuestos paga una SL en 2026?",
    a: "Impuesto sobre Sociedades del 25% sobre el beneficio (15% los dos primeros años para empresas nuevas, hasta 50.000 € de base). Si reparte dividendos, el socio paga IRPF del ahorro (19%, 21%, 23%, 27% o 28% según importe). Más el IVA trimestral si aplica.",
  },
  {
    q: "¿Las pérdidas se compensan en SL?",
    a: "Sí. Las pérdidas en Impuesto sobre Sociedades pueden compensarse con beneficios de ejercicios futuros sin límite temporal (con restricciones cuantitativas si superas 1 M€). El autónomo persona física también puede, pero con limitaciones distintas en IRPF.",
  },
  {
    q: "¿Qué ventajas tiene la SL más allá de lo fiscal?",
    a: "Responsabilidad limitada al capital aportado (3.000 € mínimo), separación patrimonial, mejor imagen ante clientes grandes, facilidad para incorporar socios, escalabilidad. Como autónomo respondes con todo tu patrimonio personal (salvo ley 14/2013 que permite proteger vivienda habitual).",
  },
  {
    q: "¿Puedo cambiar de autónomo a SL en cualquier momento?",
    a: "Sí. Te das de baja como autónomo persona física (salvo si vas a ser administrador societario, donde mantienes RETA), constituyes la SL, y empiezas a facturar a través de ella. Algunos clientes pueden requerir transición o nuevo contrato.",
  },
  {
    q: "¿Es cierto que con SL pago menos impuestos?",
    a: "Solo si dejas parte del beneficio en la sociedad como reservas. Si necesitas sacar todo el dinero como sueldo o dividendos, terminas pagando casi lo mismo o más (porque sumas Sociedades + IRPF/dividendos + autónomo societario + gestoría). La SL compensa cuando puedes capitalizar la empresa o aplazar el consumo personal.",
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Breadcrumbs items={[{ label: "SL vs Autónomo" }]} />

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          SL vs Autónomo 2026
        </h1>
        <p className="mt-3 text-neutral-600 max-w-3xl">
          Cuándo compensa crear una Sociedad Limitada y cuándo conviene seguir como
          autónomo persona física. Tablas comparativas reales por nivel de ingresos.
        </p>
        <LastUpdated date="2026-05-20" source="Fuente: AEAT, normativa Impuesto Sociedades" className="mt-3" />
      </header>

      <QuickAnswer
        question="¿Cuándo compensa pasar de autónomo a SL en 2026?"
        answer="Como regla aproximada, a partir de 60.000-80.000 € de beneficio neto anual la SL empieza a compensar fiscalmente, especialmente si no necesitas sacar todo el dinero como sueldo y puedes capitalizar la empresa. Por debajo de 40.000 € el autónomo persona física suele ser más rentable por simplicidad y la tarifa plana inicial. Hay que contar costes de gestoría obligatoria (~200 €/mes), constitución (~700 €), depósito cuentas y la cuota de autónomo societario (~451 €/mes en 2026). La decisión depende de cuánto dinero necesitas extraer personalmente cada año."
        updatedAt="2026-05-20"
      />

      <article className="prose prose-neutral max-w-3xl mt-8 space-y-5">
        <h2 className="text-xl font-bold text-neutral-900">Comparativa por nivel de ingresos (2026)</h2>
        <p>
          <em>Asumiendo gastos deducibles 5.000 €/año, todo el beneficio retirado como
          sueldo (escenario peor para SL), administrador único cotizando autónomo societario.</em>
        </p>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <caption className="sr-only">Comparativa carga fiscal y SS según ingresos brutos anuales</caption>
            <thead>
              <tr className="border-b border-neutral-300">
                <th scope="col" className="text-left py-2 font-semibold text-neutral-900">Ingresos brutos/año</th>
                <th scope="col" className="text-right py-2 font-semibold text-neutral-900">Autónomo (neto)</th>
                <th scope="col" className="text-right py-2 font-semibold text-neutral-900">SL (neto)</th>
                <th scope="col" className="text-right py-2 font-semibold text-[#B91C1C]">Ganador</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">30.000 €</th>
                <td className="text-right py-2 text-neutral-700">~19.500 €</td>
                <td className="text-right py-2 text-neutral-700">~16.200 €</td>
                <td className="text-right py-2 font-semibold text-[#B91C1C]">Autónomo</td>
              </tr>
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">50.000 €</th>
                <td className="text-right py-2 text-neutral-700">~30.500 €</td>
                <td className="text-right py-2 text-neutral-700">~27.800 €</td>
                <td className="text-right py-2 font-semibold text-[#B91C1C]">Autónomo</td>
              </tr>
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">80.000 €</th>
                <td className="text-right py-2 text-neutral-700">~46.000 €</td>
                <td className="text-right py-2 text-neutral-700">~46.200 €</td>
                <td className="text-right py-2 font-semibold text-[#B91C1C]">≈ Empate</td>
              </tr>
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">120.000 €</th>
                <td className="text-right py-2 text-neutral-700">~64.800 €</td>
                <td className="text-right py-2 text-neutral-700">~69.500 €</td>
                <td className="text-right py-2 font-semibold text-[#B91C1C]">SL</td>
              </tr>
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">200.000 €</th>
                <td className="text-right py-2 text-neutral-700">~101.000 €</td>
                <td className="text-right py-2 text-neutral-700">~114.300 €</td>
                <td className="text-right py-2 font-semibold text-[#B91C1C]">SL</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-neutral-500">
          Valores aproximados. Real depende de CCAA, mínimos personales, deducciones,
          gestoría real y cuánto dinero retiras vs capitalizas. Consulta con un gestor.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">Costes ocultos de la SL</h2>
        <ul>
          <li><strong>Constitución</strong>: notaría + registro mercantil + ITP = ~700-1.000 € (una vez)</li>
          <li><strong>Capital social mínimo</strong>: 3.000 € (puedes constituir con 1 € en SL "exprés" pero asumes restricciones)</li>
          <li><strong>Gestoría obligatoria</strong>: ~150-300 €/mes (12 nóminas + IS + IVA + cuentas anuales)</li>
          <li><strong>Cuota autónomo societario</strong>: ~451 €/mes en 2026 (base mínima 1.424,40 €/mes)</li>
          <li><strong>Depósito cuentas anuales</strong>: ~50 €/año en Registro Mercantil</li>
          <li><strong>Auditoría</strong>: obligatoria si superas dos de estos tres: activo &gt; 2,85 M€, cifra negocio &gt; 5,7 M€, &gt;50 empleados</li>
        </ul>

        <h2 className="text-xl font-bold text-neutral-900">Ventajas no fiscales de la SL</h2>
        <ul>
          <li><strong>Responsabilidad limitada</strong> al capital aportado (no respondes con bienes personales)</li>
          <li><strong>Imagen más profesional</strong> para clientes grandes (algunos solo trabajan con SL)</li>
          <li><strong>Escalabilidad</strong>: puedes incorporar socios fácilmente</li>
          <li><strong>Continuidad</strong>: la empresa sigue existiendo si tú falleces o te jubilas</li>
          <li><strong>Beneficios diferidos</strong>: puedes aplazar el consumo personal acumulando reservas</li>
        </ul>

        <h2 className="text-xl font-bold text-neutral-900">Cuándo NO crear SL</h2>
        <ul>
          <li>Si <strong>necesitas sacar todo el beneficio</strong> cada año como sueldo (no aprovechas el diferimiento)</li>
          <li>Si tus <strong>ingresos brutos son &lt; 40.000 €</strong> (la gestoría se come la ventaja fiscal)</li>
          <li>Si <strong>acabas de empezar</strong> y aún no validas el modelo (mejor probar como autónomo)</li>
          <li>Si <strong>no quieres complicaciones contables</strong> (la SL requiere doble entrada, libros, IS)</li>
        </ul>

        <h2 className="text-xl font-bold text-neutral-900">Cuándo SÍ crear SL</h2>
        <ul>
          <li><strong>Beneficio sostenido &gt; 70.000 €/año</strong> con capacidad de capitalizar</li>
          <li><strong>Clientes grandes o sector regulado</strong> que exigen SL</li>
          <li>Quieres <strong>responsabilidad limitada</strong> (negocio con riesgo, ventas físicas, inmuebles)</li>
          <li><strong>Vas a incorporar socios</strong> o buscar inversión</li>
          <li><strong>Patrimonio personal alto</strong> que quieres proteger</li>
        </ul>
      </article>

      <section className="mt-10">
        <FAQ items={faqs} />
      </section>

      <section className="mt-10 rounded-lg border border-neutral-200 bg-white p-5">
        <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-3">Relacionado</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <Link href="/cuota-autonomo-societario" className="text-sm text-[#B91C1C] hover:underline">
            → Cuota autónomo societario 2026 (+42,4%)
          </Link>
          <Link href="/cuota-autonomo" className="text-sm text-[#B91C1C] hover:underline">
            → Calculadora cuota autónomo persona física
          </Link>
          <Link href="/neto-bruto" className="text-sm text-[#B91C1C] hover:underline">
            → Cuánto te queda como autónomo
          </Link>
          <Link href="/calculadora-irpf" className="text-sm text-[#B91C1C] hover:underline">
            → IRPF + modelo 130
          </Link>
        </div>
      </section>
    </div>
  );
}
