import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickAnswer } from "@/components/QuickAnswer";
import { FAQ } from "@/components/FAQ";
import { LastUpdated } from "@/components/LastUpdated";
import { RelatedCalcs } from "@/components/RelatedCalcs";
import { TarifaHoraVsProyectoCalc } from "@/components/calculators/TarifaHoraVsProyectoCalc";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

const ogUrl = `${SITE_URL}/api/og?title=${encodeURIComponent("Tarifa hora vs precio cerrado")}&subtitle=${encodeURIComponent("Calcula tu rate efectivo y compara modelos")}&tag=Freelance`;

export const metadata: Metadata = {
  title: "Tarifa hora vs precio cerrado por proyecto · calculadora freelance 2026",
  description:
    "¿Cobras por hora o por proyecto? Calcula cuál te conviene: facturación anual, rate efectivo, breakeven, horas trabajadas. Comparativa para freelancers en España.",
  alternates: { canonical: "/tarifa-hora-vs-proyecto" },
  openGraph: {
    title: "Tarifa hora vs precio cerrado · calculadora 2026",
    description: "Compara modelos de facturación. Rate efectivo + breakeven.",
    images: [{ url: ogUrl, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [ogUrl] },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tarifa hora vs precio cerrado: comparativa para freelancers (2026)",
  description: "Cómo decidir si te conviene cobrar por hora o por proyecto cerrado como freelancer en España. Rate efectivo, breakeven, ejemplos.",
  datePublished: "2026-05-23",
  dateModified: "2026-05-23",
  author: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/tarifa-hora-vs-proyecto` },
};

const faqs = [
  {
    q: "¿Qué es mejor, cobrar por hora o por proyecto?",
    a: "Depende de tu eficiencia. Cobrar por hora es predecible pero tope tus ingresos al tiempo. Cobrar por proyecto cerrado puede multiplicar tu facturación si entregas con menos horas que las estimadas (premium por eficiencia y experiencia). Como regla, si llevas 2+ años haciendo el mismo tipo de trabajo y tu velocidad supera al freelancer junior medio, proyecto cerrado te conviene.",
  },
  {
    q: "¿Cómo calculo el rate efectivo de un proyecto?",
    a: "Precio del proyecto ÷ horas reales invertidas (incluyendo reuniones, revisiones, retrabajos). Por ejemplo: proyecto 3.000 € + 50 horas reales = 60 €/h rate efectivo. Compáralo con tu tarifa hora habitual: si el rate proyecto es mayor, ese cliente paga más por tu hora real.",
  },
  {
    q: "¿Cuál es el breakeven en horas?",
    a: "Las horas máximas que puedes dedicar a un proyecto para que su rate efectivo iguale tu tarifa hora. Fórmula: precio_proyecto ÷ tarifa_hora = horas_breakeven. Si tu tarifa hora es 50 €/h y aceptas un proyecto de 3.000 €, tu breakeven es 60 horas. Si dedicas más, estás cobrando menos por hora que tu tarifa habitual.",
  },
  {
    q: "¿Por qué no todos cobramos por proyecto?",
    a: "Tres razones: (1) requiere experiencia para estimar bien; subestimar = trabajar gratis. (2) Asumes el riesgo del scope creep (cliente pide más sin pagar más). (3) Algunos clientes (consultoría continua, mantenimiento) compran tiempo, no entregables. Empezar con proyectos pequeños bien cerrados ayuda a calibrar tu velocidad.",
  },
  {
    q: "¿Cómo subo mis tarifas sin perder clientes?",
    a: "Tres tácticas que funcionan: (1) Sube solo a clientes nuevos (no toques los actuales hasta que cambien scope). (2) Pasa de tarifa hora a precio cerrado con paquetes value-based (alineas precio con resultado del cliente, no horas tuyas). (3) Crea retainers mensuales: cobras fijo por X horas/mes, las uses o no.",
  },
  {
    q: "¿Qué incluye el 'precio cerrado'?",
    a: "Idealmente: entregable definido, número fijo de revisiones, plazo y proceso. Lo que NO incluye debe estar explícito en el contrato: cambios fuera de scope, urgencias, soporte post-entrega. Sin esto, scope creep te come el margen.",
  },
  {
    q: "¿Es mejor cobrar por adelantado o al final?",
    a: "Como freelancer en España, lo profesional es 50% al inicio + 50% al entregar. Para clientes nuevos, 50/50 es defensivo. Para clientes recurrentes, 100% a fin de mes es habitual. NUNCA empezar trabajo sin contrato firmado y al menos primer pago confirmado.",
  },
  {
    q: "¿Cuántas horas al mes son realistas para un freelance solo?",
    a: "Entre 100-140 horas facturables/mes es saludable (asume reuniones, admin, marketing y descanso). 160+ es burnout territory. Si necesitas facturar mucho más, sube tarifa o cambia a proyecto cerrado.",
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Breadcrumbs items={[{ label: "Tarifa hora vs proyecto" }]} />

      <header className="mb-6 max-w-3xl">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Tarifa hora vs precio cerrado por proyecto
        </h1>
        <p className="mt-3 text-neutral-600">
          Calcula cuál te conviene como freelance: facturación anual, rate efectivo
          y breakeven point. Compara los dos modelos con tus números reales.
        </p>
        <LastUpdated date="2026-05-23" className="mt-3" />
      </header>

      <QuickAnswer
        question="¿Conviene cobrar por hora o por proyecto cerrado?"
        answer="Depende de tu eficiencia. Si tu velocidad real supera a la del freelance junior medio, cobrar por proyecto cerrado multiplica tu facturación con menos horas trabajadas (premium por experiencia). Si aún estás aprendiendo o el scope cambia mucho, cobrar por hora protege tus ingresos. La métrica clave es el rate efectivo: precio del proyecto ÷ horas reales invertidas. Si supera tu tarifa hora habitual, el proyecto te conviene."
        updatedAt="2026-05-23"
      />

      <TarifaHoraVsProyectoCalc />

      <article className="prose prose-neutral max-w-3xl mt-12 space-y-5">
        <h2 className="text-xl font-bold text-neutral-900">El motivo por el que muchos freelancers cobran de menos</h2>
        <p>
          La trampa más común: cobras por hora, te haces eficiente, y como tardas menos
          en hacer lo mismo, <strong>facturas menos</strong>. El cliente se beneficia
          de tu mejora, no tú.
        </p>
        <p>
          El precio cerrado por proyecto invierte la lógica: el cliente paga por el
          resultado, no por tu tiempo. Si entregas con menos horas que las estimadas,
          el rate efectivo sube. Tu experiencia pasa a ser tuya, no del cliente.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">Cuándo cambiar de modelo</h2>
        <ul>
          <li>
            <strong>Llevas 2+ años haciendo este tipo de trabajo</strong> — sabes estimar
            con razonable precisión
          </li>
          <li>
            <strong>El scope es definible</strong> — puedes decir qué incluye y qué no
          </li>
          <li>
            <strong>Tu velocidad real es ≥ media del sector</strong> — el cliente no se
            sentirá engañado pagando por entregable
          </li>
          <li>
            <strong>El cliente tiene presupuesto fijo</strong> — prefiere certidumbre a
            facturas variables
          </li>
        </ul>

        <h2 className="text-xl font-bold text-neutral-900">Cómo gestionar el scope creep</h2>
        <p>
          El riesgo número uno del precio cerrado: el cliente pide cosas no incluidas
          y tú las haces "por buena fe". Cuatro reglas:
        </p>
        <ol>
          <li>
            <strong>Contrato con scope explícito</strong> — qué incluye, qué NO, cuántas
            revisiones, qué proceso
          </li>
          <li>
            <strong>Hourly rate para extras</strong> — cualquier petición fuera de scope
            se factura aparte a tu tarifa hora normal
          </li>
          <li>
            <strong>Acepta el cambio con presupuesto nuevo</strong> — "esto cambia el
            scope, te paso presupuesto adicional en 24h"
          </li>
          <li>
            <strong>Cobra revisiones extra</strong> — 3 rondas incluidas, 4ª en adelante
            150 €/cada una
          </li>
        </ol>

        <h2 className="text-xl font-bold text-neutral-900">Modelos híbridos</h2>
        <p>
          No es binario. Tres híbridos que funcionan:
        </p>
        <ul>
          <li>
            <strong>Retainer mensual</strong>: cobras fijo por X horas/mes (las uses o no).
            Predecible para ti, flexibilidad para el cliente.
          </li>
          <li>
            <strong>Proyecto con cap horas</strong>: precio cerrado pero con techo de
            horas máximas — si lo superas, se factura aparte.
          </li>
          <li>
            <strong>Performance fee</strong>: precio bajo + bonus por resultado
            (ventas, conversiones, KPI). Solo si puedes medir y el cliente confía.
          </li>
        </ul>
      </article>

      <section className="mt-10">
        <FAQ items={faqs} />
      </section>

      <RelatedCalcs current="neto" related={["cuota", "irpf", "retencion", "facturas"]} />
    </div>
  );
}
