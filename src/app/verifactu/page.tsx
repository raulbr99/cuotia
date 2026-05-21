import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickAnswer } from "@/components/QuickAnswer";
import { FAQ } from "@/components/FAQ";
import { LastUpdated } from "@/components/LastUpdated";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

const ogUrl = `${SITE_URL}/api/og?title=${encodeURIComponent("Verifactu autónomos 2026")}&subtitle=${encodeURIComponent("Aplazado a julio 2027 · qué cambia · cómo prepararte")}&tag=Verifactu`;

export const metadata: Metadata = {
  title: "Verifactu autónomos 2026 · qué es, plazos, cómo prepararte",
  description:
    "Verifactu para autónomos: obligatorio desde 1 julio 2027 (aplazado desde julio 2026). Software certificado, factura con QR, firma digital. Sanciones hasta 50.000 €. Guía actualizada.",
  alternates: { canonical: "/verifactu" },
  openGraph: {
    title: "Verifactu autónomos 2026",
    description: "Aplazado a julio 2027. Requisitos del software, sanciones, cómo prepararte.",
    images: [{ url: ogUrl, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [ogUrl] },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Verifactu autónomos 2026: qué es, plazos y cómo prepararte",
  description: "Guía sobre Verifactu para autónomos en 2026: aplazamiento a julio 2027, software certificado, requisitos AEAT, sanciones.",
  datePublished: "2026-05-20",
  dateModified: "2026-05-20",
  author: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/verifactu` },
};

const faqs = [
  {
    q: "¿Cuándo es obligatorio Verifactu para autónomos?",
    a: "Desde el 1 de julio de 2027 para autónomos persona física. El plazo original era el 1 de julio de 2026 pero se aplazó por Real Decreto aprobado a finales de 2025. Las sociedades mercantiles (SL, SA) están obligadas desde el 1 de enero de 2026.",
  },
  {
    q: "¿Qué es Verifactu exactamente?",
    a: "Verifactu es el sistema de la Agencia Tributaria que obliga al software de facturación a generar facturas firmadas digitalmente, con código QR, encadenadas criptográficamente y enviables a la AEAT en tiempo real (de forma voluntaria u obligatoria). Su objetivo es luchar contra el fraude del software de doble uso.",
  },
  {
    q: "¿Qué requisitos debe cumplir el software de facturación?",
    a: "Debe ser un Sistema Informático de Facturación (SIF) certificado: firma digital en cada factura, código QR verificable, encadenamiento criptográfico con factura anterior y siguiente, registro inalterable, posibilidad de envío automático a AEAT.",
  },
  {
    q: "¿A quién NO le aplica Verifactu?",
    a: "Autónomos en módulos sin facturación B2B, regímenes especiales (agricultura, ganadería, pesca), País Vasco y Navarra (que ya tienen TicketBAI). Si solo emites tickets en TPV o solo usas Excel/Word, en principio no aplica directamente, pero conviene migrar a software adaptado.",
  },
  {
    q: "¿Qué sanciones tiene usar software no certificado?",
    a: "Hasta 50.000 € por ejercicio fiscal por usar software no certificado o que permita alterar registros. Las multas son acumulativas y pueden afectar a varios ejercicios.",
  },
  {
    q: "¿El generador de facturas de Cuotia es Verifactu-compatible?",
    a: "No. El generador de facturas de Cuotia produce PDFs estándar legalmente válidos hasta junio 2027. A partir de julio 2027, si eres autónomo, necesitarás migrar a un software de facturación certificado.",
  },
  {
    q: "¿Qué pasa con la factura electrónica B2B?",
    a: "Es un sistema distinto. La factura electrónica B2B (Ley Crea y Crece) no es obligatoria todavía para autónomos. Tiene su propio calendario pendiente de desarrollo reglamentario.",
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Breadcrumbs items={[{ label: "Verifactu" }]} />

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Verifactu para autónomos 2026
        </h1>
        <p className="mt-3 text-neutral-600 max-w-3xl">
          Sistema obligatorio de software de facturación certificado para autónomos
          a partir del 1 de julio de 2027 (aplazado).
        </p>
        <LastUpdated date="2026-05-20" source="Fuente: AEAT, BOE" className="mt-3" />
      </header>

      <QuickAnswer
        question="¿Cuándo es obligatorio Verifactu para autónomos?"
        answer="Verifactu es obligatorio para autónomos persona física desde el 1 de julio de 2027 (aplazado desde julio 2026). Las sociedades mercantiles (SL, SA) están obligadas desde el 1 de enero de 2026. Requiere usar software de facturación certificado que firme digitalmente, incluya QR y permita envío a AEAT. Sanciones por software no certificado: hasta 50.000 €/año."
        updatedAt="2026-05-20"
      />

      <article className="prose prose-neutral max-w-3xl mt-8 space-y-5">
        <h2 className="text-xl font-bold text-neutral-900">Calendario actualizado</h2>
        <div className="not-prose grid gap-3 my-4">
          <div className="rounded-lg border border-neutral-200 bg-white p-4">
            <p className="text-[11px] uppercase tracking-wider text-[#B91C1C] font-semibold mb-1">Vigente</p>
            <p className="font-semibold text-neutral-900">Sociedades mercantiles (SL, SA)</p>
            <p className="text-sm text-neutral-600 mt-1">Obligatorio desde el <strong>1 de enero de 2026</strong>.</p>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-4">
            <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">Próximo</p>
            <p className="font-semibold text-neutral-900">Autónomos persona física</p>
            <p className="text-sm text-neutral-600 mt-1">
              Obligatorio desde el <strong>1 de julio de 2027</strong> (originalmente julio 2026, pospuesto).
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-neutral-900">Qué tiene que hacer tu software</h2>
        <ul>
          <li><strong>Firma digital</strong> en cada factura emitida.</li>
          <li><strong>Código QR</strong> verificable por el receptor en cada factura.</li>
          <li><strong>Encadenamiento criptográfico</strong>: cada factura referencia a la anterior y la siguiente.</li>
          <li><strong>Registro inalterable</strong>: no se puede modificar una factura ya emitida sin dejar rastro.</li>
          <li><strong>Envío a AEAT</strong>: posibilidad de mandar los registros en tiempo real o de forma voluntaria.</li>
        </ul>

        <h2 className="text-xl font-bold text-neutral-900">Quién está exento</h2>
        <ul>
          <li>Autónomos en módulos sin facturación B2B</li>
          <li>Regímenes especiales (agricultura, ganadería, pesca)</li>
          <li>País Vasco y Navarra (ya operan con TicketBAI, sistema equivalente foral)</li>
          <li>Quien emite solo tickets en TPV (otros sistemas)</li>
        </ul>

        <h2 className="text-xl font-bold text-neutral-900">Qué hacer ahora si eres autónomo</h2>
        <ol>
          <li><strong>Si ya usas software de facturación</strong>: pregunta a tu proveedor si está homologado o lo estará antes de julio 2027.</li>
          <li><strong>Si usas Excel, Word o PDF manual</strong>: empieza a buscar software adaptado. La AEAT publicará un listado oficial de SIFs certificados.</li>
          <li><strong>Si usas el <Link href="/generador-facturas" className="text-[#B91C1C] underline">generador de Cuotia</Link></strong>: es válido hasta junio 2027. Después, migra a software certificado.</li>
          <li><strong>Si dudas</strong>: consulta con tu gestor o asesor fiscal antes del verano 2027.</li>
        </ol>

        <h2 className="text-xl font-bold text-neutral-900">Sanciones</h2>
        <p>
          La Ley Antifraude 11/2021 (artículo 201 bis) sanciona el uso de software no
          certificado con multas de hasta <strong>50.000 € por ejercicio fiscal</strong>.
          Las multas son acumulativas y pueden cubrir varios ejercicios atrás si se detecta
          que has usado software de doble uso.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">No confundir con factura electrónica B2B</h2>
        <p>
          Verifactu y la factura electrónica obligatoria B2B (Ley Crea y Crece) son sistemas
          distintos. La factura electrónica B2B aún no está vigente para autónomos: tiene su
          propio calendario pendiente de desarrollo reglamentario y portales B2B públicos.
        </p>
      </article>

      <section className="mt-10">
        <FAQ items={faqs} />
      </section>

      <section className="mt-10 rounded-lg border border-neutral-200 bg-white p-5">
        <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-3">Relacionado</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <Link href="/generador-facturas" className="text-sm text-[#B91C1C] hover:underline">
            → Generador de facturas (PDF estándar válido hasta jul 2027)
          </Link>
          <Link href="/blog/verifactu-pospuesto-julio-2027" className="text-sm text-[#B91C1C] hover:underline">
            → Análisis del aplazamiento
          </Link>
          <Link href="/calendario-fiscal" className="text-sm text-[#B91C1C] hover:underline">
            → Calendario fiscal trimestral
          </Link>
          <Link href="/cuota-autonomo" className="text-sm text-[#B91C1C] hover:underline">
            → Calculadora cuota autónomo 2026
          </Link>
        </div>
      </section>
    </div>
  );
}
