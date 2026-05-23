import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { ArticleSchema } from "@/components/Schemas";
import Link from "next/link";
import { CheckCircle2, Calendar } from "lucide-react";

const PUBLISHED = "2026-05-20";
const MODIFIED = "2026-05-20";

export const metadata: Metadata = {
  title: "Cómo darse de alta como autónomo en 2026 · paso a paso",
  description: "Guía completa: modelo 036/037, alta en RETA, tarifa plana, plazos y errores comunes. Sin gestoría.",
  alternates: { canonical: "/guias/alta-autonomo" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cómo darse de alta como autónomo en España",
  description: "Guía paso a paso para registrarse como autónomo: hacienda + seguridad social.",
  totalTime: "PT30M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Alta en Hacienda", text: "Modelo 036 o 037 con tu actividad económica (epígrafe IAE)." },
    { "@type": "HowToStep", position: 2, name: "Alta en RETA", text: "TA.0521 en la Tesorería de la Seguridad Social dentro de 30 días desde el inicio." },
    { "@type": "HowToStep", position: 3, name: "Elegir mutua", text: "Selecciona mutua colaboradora para cobertura de bajas." },
    { "@type": "HowToStep", position: 4, name: "Tarifa plana", text: "Marca la casilla en el TA.0521 si tienes derecho." },
  ],
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <ArticleSchema
        headline="Cómo darse de alta como autónomo en 2026"
        description="Guía paso a paso: modelo 036/037, alta en RETA, tarifa plana, plazos y errores comunes."
        path="/guias/alta-autonomo"
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <Breadcrumbs items={[{ label: "Guías", href: "/guias" }, { label: "Alta autónomo" }]} />
      <article className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold sm:text-4xl">Cómo darse de alta como autónomo en 2026</h1>
        <p className="text-xs text-neutral-500 flex items-center gap-1.5 my-3 not-prose">
          <Calendar className="h-3 w-3" />
          Publicado <time dateTime={PUBLISHED}>20 de mayo de 2026</time>
          {PUBLISHED !== MODIFIED && <> · Actualizado <time dateTime={MODIFIED}>20 de mayo de 2026</time></>}
        </p>
        <p className="text-lg text-neutral-700">
          Antes de emitir tu primera factura, tienes que registrarte en dos sitios:
          <strong> Hacienda</strong> y <strong>Seguridad Social</strong>. Los dos trámites son online,
          gratuitos y se hacen el mismo día. Te explico cómo, sin gestoría.
        </p>

        <h2 className="text-2xl font-bold mt-10">Paso 1 · Hacienda (modelo 036 o 037)</h2>
        <p>
          Es la declaración censal: le dices a la AEAT qué actividad económica vas a
          ejercer y cómo vas a tributar. El <strong>036</strong> es la versión completa;
          el <strong>037</strong> es la simplificada (para la mayoría de autónomos
          persona física basta).
        </p>
        <ul className="space-y-2">
          {[
            "Acceso en sede.agenciatributaria.gob.es con cl@ve PIN o certificado digital",
            "Marca casilla 110 (alta) y casilla 111 (fecha de inicio)",
            "Indica el epígrafe IAE correspondiente a tu actividad (búscalo en la lista oficial)",
            "Elige régimen de IVA y de IRPF (general o módulos)",
            "Presenta. Recibes acuse al instante con tu NIF activado para facturar",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#B91C1C] mt-0.5 flex-shrink-0" />
              <span>{step}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold mt-10">Paso 2 · Seguridad Social (modelo TA.0521)</h2>
        <p>
          Alta en el Régimen Especial de Trabajadores Autónomos (RETA). Tienes
          <strong> 30 días naturales</strong> desde la fecha indicada en Hacienda. Se
          hace en la Sede Electrónica de la TGSS.
        </p>
        <ul className="space-y-2">
          {[
            "Acceso en sede.seg-social.gob.es con cl@ve o certificado",
            "Servicio: 'Alta en trabajo autónomo' (TA.0521)",
            "Datos: identificación, actividad, fecha de inicio",
            "Elige tu base de cotización (la mínima es ~1.196,70 € en 2026)",
            "Elige mutua colaboradora (Asepeyo, Fremap, Mutua Universal...)",
            "Marca la casilla 'tarifa plana' si tienes derecho",
            "Domicilia tu cuenta bancaria para el pago mensual de la cuota",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#B91C1C] mt-0.5 flex-shrink-0" />
              <span>{step}</span>
            </li>
          ))}
        </ul>


        <h2 className="text-2xl font-bold mt-10">¿Tienes derecho a tarifa plana?</h2>
        <p>
          La <strong>tarifa plana de 88,64 €/mes durante 12 meses</strong> aplica si:
        </p>
        <ul>
          <li>Es tu <strong>primer alta</strong> en RETA, o</li>
          <li>No has cotizado en RETA durante los <strong>últimos 2 años</strong>, o</li>
          <li>3 años si la última vez ya la disfrutaste</li>
        </ul>
        <p>
          Prorrogable otros 12 meses si tu rendimiento neto anual queda por debajo del
          SMI (~16.576 € en 2026). Más en nuestra <Link href="/guias/tarifa-plana" className="text-[#B91C1C] underline">guía de tarifa plana</Link>.
        </p>

        <h2 className="text-2xl font-bold mt-10">Plazos importantes</h2>
        <ul>
          <li>Alta en Hacienda <strong>antes</strong> de empezar la actividad (mismo día vale)</li>
          <li>Alta en RETA <strong>en los 30 días siguientes</strong></li>
          <li>Si te retrasas en RETA: 60 días de recargo del 20% en la primera cuota</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10">Errores comunes</h2>
        <ul>
          <li><strong>Olvidarte del IAE correcto</strong> → no te dejará facturar bien. Si trabajas en varios sectores, puedes darte de alta en varios epígrafes.</li>
          <li><strong>No marcar la tarifa plana</strong> en TA.0521 → pierdes el derecho al ahorro. Si lo olvidaste, puedes solicitarlo después en plazo limitado.</li>
          <li><strong>Confundir IRPF con IVA</strong> → son impuestos distintos. Las facturas a empresas llevan retención del 15% (IRPF) y el 21% (IVA). Hablamos de ambos en sus calculadoras.</li>
        </ul>

        <div className="mt-12  bg-white border border-[#B91C1C] p-6">
          <h3 className="text-lg font-semibold m-0">Calcula tu cuota antes de darte de alta</h3>
          <p className="mt-2 mb-3">
            Para saber lo que vas a pagar al mes según tus ingresos previstos:
          </p>
          <Link href="/cuota-autonomo" className="inline-flex items-center gap-2 rounded-md bg-[#B91C1C] text-white px-4 py-2  font-medium text-sm hover:opacity-90">
            Calcular cuota autónomo
          </Link>
        </div>
      </article>

      <FAQ
        items={[
          { q: "¿Puedo darme de alta y baja como autónomo varias veces al año?", a: "Sí. Antes solo 3 veces, desde 2023 las que necesites. Pero si das de baja antes de 3 meses, no acumulas tarifa plana." },
          { q: "¿Necesito gestoría para darme de alta?", a: "No. Los trámites son gratuitos y se hacen online en 30 minutos. Una gestoría cuesta ~50-100€ y solo te ahorra trámite. Te será más útil cuando empieces a facturar." },
          { q: "¿Tengo que tener clientes ya para darme de alta?", a: "No. Puedes darte de alta antes de empezar a facturar para estar 'listo'. Pero pagarás cuota desde el día 1. Mejor coordínalo con tu primera factura." },
          { q: "¿Y si trabajo por cuenta ajena además?", a: "Es la pluriactividad. Te puedes dar de alta en RETA además de seguir cotizando por tu trabajo. Hay bonificaciones específicas para pluriactividad." },
        ]}
      />
    </div>
  );
}
