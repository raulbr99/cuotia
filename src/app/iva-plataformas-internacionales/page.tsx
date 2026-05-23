import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickAnswer } from "@/components/QuickAnswer";
import { FAQ } from "@/components/FAQ";
import { LastUpdated } from "@/components/LastUpdated";
import { RelatedCalcs } from "@/components/RelatedCalcs";
import { IvaPlataformasCalc } from "@/components/calculators/IvaPlataformasCalc";
import { PLATAFORMAS } from "@/lib/iva-plataformas";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

const ogUrl = `${SITE_URL}/api/og?title=${encodeURIComponent("IVA plataformas internacionales 2026")}&subtitle=${encodeURIComponent("Stripe · Airbnb · Upwork · App Store · 13 plataformas")}&tag=IVA`;

export const metadata: Metadata = {
  title: "IVA en plataformas internacionales 2026 · Stripe, Airbnb, Upwork, Amazon",
  description:
    "Cómo facturar como autónomo en España cuando cobras a través de Stripe, PayPal, Upwork, Airbnb, Booking, Viator, Amazon, AdSense, App Store, Patreon o Twitch. Reverse charge, ROI/VIES, modelo 349.",
  alternates: { canonical: "/iva-plataformas-internacionales" },
  openGraph: {
    title: "IVA plataformas internacionales 2026",
    description: "Stripe, Airbnb, Upwork, App Store y más. Reverse charge + ROI/VIES + modelo 349.",
    images: [{ url: ogUrl, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [ogUrl] },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "IVA en plataformas internacionales 2026: guía + calculadora",
  description:
    "Reglas IVA para autónomos españoles facturando a/vía Stripe, Airbnb, Upwork, Amazon y otras plataformas. Cuándo aplica reverse charge, ROI/VIES y modelo 349.",
  datePublished: "2026-05-23",
  dateModified: "2026-05-23",
  author: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/iva-plataformas-internacionales` },
};

const faqs = [
  {
    q: "¿Cuál es la regla general del IVA en plataformas internacionales?",
    a: "Depende de si la plataforma actúa como tu cliente directo (marketplace fiscal: Airbnb, Booking, App Store, Google Play, Patreon) o como mero procesador de pagos (Stripe, PayPal, Upwork). En el primer caso facturas a la plataforma. En el segundo facturas al cliente final y aplicas las reglas según su país/tipo.",
  },
  {
    q: "¿Qué es la inversión del sujeto pasivo (reverse charge)?",
    a: "Cuando facturas a una empresa de otro país de la UE con NIF intracomunitario válido, no aplicas IVA español. El cliente declara el IVA de su país (lo 'invierte'). Lo indicas en factura con la mención 'Operación intracomunitaria. Inversión del sujeto pasivo (art. 84 LIVA)'. Antes necesitas estar dado de alta en ROI/VIES (modelo 036, casilla 582).",
  },
  {
    q: "¿Cuándo necesito el ROI/VIES?",
    a: "Antes de emitir la primera factura intracomunitaria a empresas UE (incluye plataformas como Stripe Ireland, Google Ireland, Apple, Booking, Airbnb). Te das de alta con modelo 036, casilla 582. Verifica el NIF de tu cliente en https://ec.europa.eu/taxation_customs/vies/ antes de facturar.",
  },
  {
    q: "¿Cómo facturo a Stripe?",
    a: "Stripe es solo procesador de pagos, no tu cliente. Tu cliente real es quien te pagó (puede ser España, UE, fuera UE). Aplicas las reglas según ese cliente. Por otro lado, Stripe te factura su comisión desde Irlanda (B2B intracomunitario con reverse charge) — esa comisión va en tus gastos deducibles.",
  },
  {
    q: "¿Cómo facturo si soy host de Airbnb o Booking?",
    a: "Airbnb y Booking NO son tus clientes fiscales — son intermediarios. Tres casos: (1) Alquiler turístico SIN servicios hoteleros: EXENTO de IVA, no facturas al huésped (declaras como rendimiento de capital inmobiliario en IRPF, no como actividad económica). (2) Alquiler turístico CON servicios hoteleros (limpieza durante estancia, desayuno, recepción): facturas al huésped con IVA 10% como actividad económica de hostelería. (3) La COMISIÓN que Airbnb/Booking te cobra es B2B intracomunitario con reverse charge: la pagas tú y va como gasto deducible. Desde junio 2024, Booking aplica IVA 21% a la comisión si no le has facilitado NIF intracomunitario válido (modelo 036 casilla 582).",
  },
  {
    q: "¿Y si soy guía turístico vendiendo en Viator o GetYourGuide?",
    a: "Le facturas al cliente final (turista), no a la plataforma. Para servicios de guía turístico el IVA se devenga donde se presta el servicio: si el tour es en España, aplicas IVA 21% incluso si el cliente es turista extranjero particular. Si el cliente final es empresa UE con NIF: reverse charge. Si es empresa fuera UE: no sujeto. La comisión de Viator/GetYourGuide es gasto deducible con reverse charge.",
  },
  {
    q: "¿Y Upwork o Fiverr?",
    a: "Son intermediarios, no marketplaces fiscales. Tu cliente real es la empresa o particular que te contrata. Si es empresa UE con NIF: reverse charge. Si es empresa USA u otro fuera UE: no sujeto a IVA español. Si es particular: aplica IVA español 21%.",
  },
  {
    q: "¿Cómo facturo a Apple App Store o Google Play?",
    a: "Apple y Google actúan como vendedores al cliente final (te compran la app/contenido y la revenden). Tú les facturas a ellos directamente: Apple Distribution International en Irlanda, Google Ireland Ltd. Reverse charge B2B intracomunitario. Necesitas ROI/VIES + modelo 349.",
  },
  {
    q: "¿Y AdSense / YouTube?",
    a: "Desde 2023 Google AdSense paga desde Google Ireland Ltd (UE). Le facturas tú a Google (B2B intracomunitario): reverse charge, ROI/VIES, modelo 349. Antes era desde USA y era operación no sujeta. Verifica en tu cuenta AdSense desde qué entidad te están pagando.",
  },
  {
    q: "¿Qué pasa si vendo servicios digitales a particulares UE?",
    a: "Regla especial: si superas 10.000 €/año en ventas de servicios digitales a particulares UE, debes inscribirte en One-Stop-Shop (OSS) y aplicar el IVA del país del cliente. Por debajo, aplicas IVA español 21%. No confundir con servicios profesionales no digitales (consultoría, diseño), que tienen otras reglas.",
  },
  {
    q: "¿El modelo 349 es trimestral o mensual?",
    a: "Trimestral si tus operaciones intracomunitarias del trimestre no superan 50.000 €. Mensual si las superas (4 trimestres seguidos consecutivos). Plazos: del 1 al 20 del mes siguiente al periodo. Si te equivocas con plataformas grandes (Airbnb, Booking) es fácil superar el umbral mensual.",
  },
  {
    q: "¿Y si Hacienda me audita?",
    a: "Debes poder demostrar: (1) Alta ROI/VIES, (2) Certificados de pago de cada plataforma con NIF UE, (3) Verificación del NIF intracomunitario en VIES en el momento de cada factura. Conserva pantallazos. Hacienda puede revisar 4 años atrás.",
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Breadcrumbs items={[{ label: "IVA plataformas internacionales" }]} />

      <header className="mb-6 max-w-3xl">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          IVA en plataformas internacionales 2026
        </h1>
        <p className="mt-3 text-neutral-600">
          Stripe, PayPal, Upwork, Fiverr, Airbnb, Booking, Viator, Amazon, AdSense,
          App Store, Google Play, Patreon, Twitch. Cómo facturar correctamente como
          autónomo en España, sin liarte con reverse charge y ROI/VIES.
        </p>
        <LastUpdated date="2026-05-23" source="Fuente: AEAT, Directiva 2006/112/CE" className="mt-3" />
      </header>

      <QuickAnswer
        question="¿Cómo facturo cuando cobro a través de Stripe, Airbnb, Upwork u otras plataformas?"
        answer="Hay dos grupos. Marketplaces fiscales (App Store, Google Play, Patreon, Twitch, AdSense) actúan COMO TU CLIENTE: les facturas a ellos directamente — B2B intracomunitario con reverse charge si son UE (requiere ROI/VIES + modelo 349) o no sujeto si son fuera UE. Plataformas intermediarias (Stripe, PayPal, Upwork, Fiverr, Amazon Seller, Airbnb, Booking, Viator) son solo procesadores: tu cliente fiscal es el usuario final. Aplicas IVA 21% si tu cliente es España particular, reverse charge si es empresa UE con NIF, IVA del país (vía OSS si >10K€) si es particular UE con servicios digitales, no sujeto si es fuera UE. CASO ESPECIAL Airbnb/Booking: si alquilas vivienda sin servicios hoteleros, está EXENTO de IVA (no facturas)."
        updatedAt="2026-05-23"
      />

      <IvaPlataformasCalc />

      <article className="prose prose-neutral max-w-3xl mt-12 space-y-5">
        <h2 className="text-xl font-bold text-neutral-900">Las 13 plataformas cubiertas</h2>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-neutral-300">
                <th scope="col" className="text-left py-2 font-semibold text-neutral-900">Plataforma</th>
                <th scope="col" className="text-left py-2 font-semibold text-neutral-900">Sede fiscal</th>
                <th scope="col" className="text-left py-2 font-semibold text-neutral-900">Tipo</th>
                <th scope="col" className="text-left py-2 font-semibold text-neutral-900">¿Facturas a la plataforma?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {PLATAFORMAS.map((p) => (
                <tr key={p.id}>
                  <th scope="row" className="py-2 text-left font-medium text-neutral-900">{p.nombre}</th>
                  <td className="py-2 text-neutral-700">{p.pais}</td>
                  <td className="py-2 text-neutral-700 capitalize">{p.tipo}</td>
                  <td className="py-2 text-neutral-700">
                    {p.esClienteDirecto ? "Sí (marketplace fiscal)" : "No (facturas al cliente final)"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold text-neutral-900">Marketplace fiscal vs procesador de pago</h2>
        <p>
          <strong>Marketplace fiscal</strong>: la plataforma compra tu servicio
          y lo revende al usuario final. Ejemplos: Apple App Store, Google Play,
          Patreon, Airbnb (hosts profesionales), Booking, Viator, Google AdSense.
          Tú le facturas a la plataforma, no al usuario.
        </p>
        <p>
          <strong>Procesador de pago / intermediario</strong>: la plataforma
          procesa el pago pero el contrato es entre tú y el usuario. Ejemplos:
          Stripe, PayPal, Upwork, Fiverr, Amazon (productos vendidos por ti).
          Facturas al cliente final aplicando las reglas IVA según su país y tipo.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">ROI/VIES: paso obligatorio</h2>
        <p>
          Si vas a facturar a CUALQUIER empresa UE (incluida una plataforma con
          sede en Irlanda, Países Bajos, Luxemburgo…) necesitas estar dado de
          alta en el Registro de Operadores Intracomunitarios (ROI).
        </p>
        <ol>
          <li>Modelo 036 (presentación telemática AEAT) marcando la casilla 582.</li>
          <li>Hacienda tarda hasta 3 meses en darte el alta efectiva.</li>
          <li>Hasta que estés dado de alta, tus facturas a empresas UE llevan IVA español (luego es lío rectificarlas).</li>
          <li>Verifica tu propio NIF intracomunitario en <a href="https://ec.europa.eu/taxation_customs/vies/" target="_blank" rel="noopener noreferrer">VIES</a> una vez dado de alta.</li>
        </ol>

        <h2 className="text-xl font-bold text-neutral-900">Modelo 349: el que casi nadie presenta bien</h2>
        <p>
          Declaración informativa trimestral (o mensual si superas 50.000 €/trimestre)
          de operaciones intracomunitarias. Resumen de cada cliente UE: NIF + total
          facturado en el periodo.
        </p>
        <p>
          <strong>Importante</strong>: muchos gestores se olvidan del 349 si solo
          tienes una plataforma como Airbnb o AdSense. Sin presentarlo, sanción
          mínima 300 €.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">Para servicios digitales B2C: OSS</h2>
        <p>
          Si vendes servicios digitales (apps, ebooks, contenido streaming,
          cursos online) directamente a particulares de la UE (no vía marketplace
          que retiene el IVA), tienes que aplicar el IVA del país del cliente.
        </p>
        <p>
          Para no tener que registrarte en 27 países, existe el sistema <strong>One-Stop-Shop (OSS)</strong>:
          declaras todo desde España con el modelo 369. Obligatorio si superas
          10.000 €/año en ventas a particulares UE.
        </p>
      </article>

      <section className="mt-10">
        <FAQ items={faqs} />
      </section>

      <RelatedCalcs current="iva" related={["retencion", "facturas", "cuota", "verifactu"]} />
    </div>
  );
}
