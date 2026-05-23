import type { Metadata } from "next";
import { InvoiceGenerator } from "@/components/InvoiceGenerator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedCalcs } from "@/components/RelatedCalcs";
import { CalculatorSchema, SpeakableSchema } from "@/components/Schemas";
import { FAQ } from "@/components/FAQ";
import { AffiliateCard } from "@/components/AffiliateCard";
import { AFFILIATES_BY_PAGE } from "@/lib/affiliates";

const ogUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es"}/api/og?title=${encodeURIComponent("Generador de facturas PDF")}&subtitle=${encodeURIComponent("Crea facturas legalmente válidas en 1 minuto · Sin registro")}&tag=Facturas`;

export const metadata: Metadata = {
  title: "Generador de facturas gratis para autónomos · descarga PDF",
  description: "Crea facturas profesionales en 1 minuto: emisor, cliente, líneas, IVA, retención IRPF. Descarga gratis en PDF. Sin registro.",
  alternates: { canonical: "/generador-facturas" },
  openGraph: { title: "Generador de facturas PDF gratis", description: "Sin registro, en 1 minuto", images: [{ url: ogUrl, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: [ogUrl] },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 print:max-w-none print:py-0">
      <CalculatorSchema
        name="Generador de facturas autónomo"
        description="Crea facturas profesionales en PDF con todos los campos legales (NIF, IVA, retención IRPF) en 1 minuto."
        path="/generador-facturas"
        category="BusinessApplication"
      />
      <SpeakableSchema />
      <div className="print:hidden">
        <Breadcrumbs items={[{ label: "Generador de facturas" }]} />
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Generador de facturas</h1>
          <p className="mt-3 text-neutral-700 max-w-3xl">
            Rellena los datos a la izquierda, mira la factura en directo y descarga
            en PDF. Sin registro. Tus datos se quedan en tu navegador (localStorage),
            no se envían a ningún servidor.
          </p>
          <p className="mt-3 text-sm text-neutral-600 max-w-3xl">
            <strong>Aviso Verifactu:</strong> este generador produce PDFs estándar válidos
            hasta junio 2027. Desde el 1 de julio de 2027 los autónomos están obligados a
            usar software de facturación certificado. Más en{" "}
            <a href="/verifactu" className="text-[#B91C1C] underline">Verifactu para autónomos</a>.
          </p>
        </header>
      </div>

      <InvoiceGenerator />

      <section className="print:hidden mt-16">
        <FAQ
          items={[
            { q: "¿Es legal una factura generada con esta herramienta?", a: "Sí, siempre que incluya los datos obligatorios: número correlativo, fecha, datos completos de emisor y receptor (incluido NIF), descripción de los servicios, base imponible, tipo y cuota de IVA. Esta calculadora incluye todos esos campos." },
            { q: "¿Tengo que enviarla en papel?", a: "No. La AEAT acepta facturas en PDF enviadas por email como factura electrónica simple. Solo necesitas conservar copia 4 años. Si quieres factura electrónica firmada para AdminPública, necesitas certificado digital + plataforma específica (Face)." },
            { q: "¿Qué retención IRPF aplico?", a: "Profesionales facturando a empresas españolas: 15% (general) o 7% si eres nuevo autónomo (durante 3 años desde el alta). Facturando a otros autónomos no retienes nada en algunos casos. Facturas a extranjero: sin retención." },
            { q: "¿Y el IVA?", a: "Regla general: 21%. Servicios formativos, educación, sanidad: exento. Hay tipos reducidos del 10% y 4% para ciertos productos. Si facturas dentro de la UE a empresa con NIF intracomunitario, factura sin IVA con 'inversión del sujeto pasivo'." },
            { q: "¿Se guardan mis datos en algún sitio?", a: "Solo en tu navegador (localStorage). Si cambias de dispositivo o limpias datos, se pierden. Para conservar facturas, descárgalas en PDF tras crearlas." },
            { q: "¿Cuánto debo conservar las facturas?", a: "4 años desde el final del periodo de presentación del impuesto. Mejor 6 años por seguridad (plazo prescripción Mercantil). Conservación digital es válida." },
          ]}
        />
      </section>
      <RelatedCalcs current="facturas" related={["retencion", "iva", "verifactu", "irpf"]} />

      <AffiliateCard {...AFFILIATES_BY_PAGE.generadorFacturas} />
        </div>
  );
}
