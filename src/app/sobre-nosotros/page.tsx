import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Calculator, Shield, BookOpen, Mail, ExternalLink, CheckCircle2 } from "lucide-react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

const ogUrl = `${SITE_URL}/api/og?title=${encodeURIComponent("Sobre CalcAutónomo")}&subtitle=${encodeURIComponent("Quién operamos el sitio, fuentes oficiales y metodología")}&tag=Sobre+nosotros`;

export const metadata: Metadata = {
  title: "Sobre CalcAutónomo · quién opera el sitio + metodología + fuentes",
  description: "Quién está detrás de CalcAutónomo, fuentes oficiales (BOE, AEAT, TGSS), metodología de cálculo, política de actualizaciones y limitaciones.",
  alternates: { canonical: "/sobre-nosotros" },
  openGraph: { title: "Sobre CalcAutónomo", description: "Metodología, fuentes y transparencia.", images: [{ url: ogUrl, width: 1200, height: 630 }] },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Sobre CalcAutónomo",
  url: `${SITE_URL}/sobre-nosotros`,
  inLanguage: "es-ES",
  mainEntity: {
    "@type": "Organization",
    name: "CalcAutónomo",
    url: SITE_URL,
    description: "Calculadoras fiscales gratuitas para autónomos en España. Sin registros, sin emails, sin venta de servicios.",
    foundingDate: "2026-05-20",
    knowsAbout: ["IRPF", "IVA", "Cuota autónomo", "RETA", "Tarifa plana", "Modelo 130", "Modelo 303", "Despido", "Finiquito", "Baja médica autónomo", "Jubilación autónomo"],
    areaServed: { "@type": "Country", name: "España" },
  },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <Breadcrumbs items={[{ label: "Sobre nosotros" }]} />

      <article className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold sm:text-4xl">Sobre CalcAutónomo</h1>
        <p className="text-lg text-neutral-700">
          CalcAutónomo es un sitio independiente con calculadoras fiscales gratuitas
          para autónomos en España. Sin registros, sin emails, sin venta de servicios
          de gestoría. Está hecho para que puedas hacer tus números rápido y bien
          informado.
        </p>

        <h2 className="text-2xl font-bold mt-10">Qué hacemos</h2>
        <ul>
          <li><strong>Calculadoras precisas</strong>: cuota de autónomo, IRPF estatal + autonómico de las 17 CCAA, IVA, modelo 130, neto/bruto, despido y finiquito, baja médica, jubilación, dietas y kilometraje.</li>
          <li><strong>Herramientas</strong>: generador de facturas PDF, calendario fiscal con todas las fechas del año.</li>
          <li><strong>Guías</strong>: alta como autónomo paso a paso, gastos deducibles, tarifa plana.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10">Qué NO hacemos</h2>
        <ul>
          <li>No somos gestoría. Las calculadoras son orientativas.</li>
          <li>No vendemos servicios de asesoría. Solo monetizamos con AdSense.</li>
          <li>No guardamos tus datos. Todos los cálculos ocurren en tu navegador.</li>
          <li>No enviamos emails comerciales (solo newsletter opcional con cambios fiscales).</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10">Fuentes oficiales que usamos</h2>
        <p>
          Toda la información se basa en normativa publicada en fuentes oficiales:
        </p>

        <div className="not-prose grid gap-3 my-6">
          {[
            { name: "BOE (Boletín Oficial del Estado)", url: "https://www.boe.es", what: "Real Decreto-ley 13/2022 y leyes posteriores con tramos vigentes." },
            { name: "Agencia Tributaria (AEAT)", url: "https://sede.agenciatributaria.gob.es", what: "Escalas IRPF estatales, tipos de IVA, modelos tributarios." },
            { name: "Tesorería General Seguridad Social", url: "https://sede.seg-social.gob.es", what: "Cuotas RETA por tramos, tarifa plana, prestaciones." },
            { name: "Boletines oficiales autonómicos", url: "https://www.boe.es/diario_boa/", what: "Escalas IRPF de cada Comunidad Autónoma." },
          ].map((src) => (
            <a key={src.url} href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3  rounded-xl border border-neutral-200 bg-white p-4 hover:border-[#B91C1C] hover:bg-white">
              <ExternalLink className="h-5 w-5 text-[#B91C1C] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-neutral-900 m-0">{src.name}</p>
                <p className="text-sm text-neutral-700 m-0">{src.what}</p>
              </div>
            </a>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-10">Metodología de cálculo</h2>
        <ul>
          <li><strong>Cuota autónomo</strong>: aplicamos los 15 tramos del sistema de cotización por ingresos reales (RD-ley 13/2022 + actualizaciones).</li>
          <li><strong>IRPF</strong>: escala estatal half (9,5% a 24,5%) + escala autonómica específica por CCAA. Sumamos tramo a tramo.</li>
          <li><strong>Modelo 130</strong>: 20% sobre rendimiento neto del trimestre menos retenciones soportadas.</li>
          <li><strong>IVA</strong>: tipos vigentes 21% / 10% / 4% / exento.</li>
          <li><strong>Indemnización despido</strong>: 33 días/año improcedente (tope 24 mens.), 20 días/año objetivo/colectivo (tope 12).</li>
          <li><strong>Base reguladora jubilación</strong>: media de los últimos 25 años cotizados (norma vigente 2027).</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10">Limitaciones honestas</h2>
        <div className="not-prose  rounded-xl border-2 border-[#FECACA] bg-[#FEF2F2] p-5 my-6">
          <p className="text-sm text-neutral-900 mb-2 font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Las calculadoras NO tienen en cuenta:
          </p>
          <ul className="text-sm text-neutral-900 list-disc list-inside space-y-1">
            <li>Mínimos personales y familiares (descendientes, mayores 65 años, discapacidad)</li>
            <li>Deducciones autonómicas específicas (vivienda, donativos regionales)</li>
            <li>Reducción por rendimiento del trabajo</li>
            <li>Aportaciones a planes de pensiones (reducen base imponible)</li>
            <li>Régimen foral de Navarra y País Vasco (consulta Hacienda Foral)</li>
            <li>Circunstancias personales que afectan al cálculo final</li>
          </ul>
          <p className="text-sm text-neutral-900 mt-3 mb-0">
            <strong>Para presentar tus modelos oficiales</strong>: usa el portal de la
            AEAT o consulta a un gestor.
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-10">Política de actualizaciones</h2>
        <p>
          Revisamos y actualizamos los tramos vigentes cuando:
        </p>
        <ul>
          <li>El BOE publica nuevos tipos o tramos</li>
          <li>Una CCAA modifica su escala autonómica</li>
          <li>Cambia la cuota mínima/máxima del RETA</li>
          <li>Se publica el nuevo SMI (afecta a la prórroga de la tarifa plana)</li>
        </ul>
        <p>
          Cada calculadora muestra la fecha de última actualización debajo del título.
          La fecha del sitio en su conjunto: <time dateTime="2026-05-20">20 de mayo de 2026</time>.
        </p>

        <h2 className="text-2xl font-bold mt-10">Modelo de negocio</h2>
        <p>
          CalcAutónomo se sostiene con anuncios contextuales (Google AdSense). No
          vendemos datos, no hacemos cross-selling de gestorías, no tenemos planes
          premium. Si quieres apoyar el proyecto, comparte el sitio o suscríbete a
          la newsletter para recibir avisos de cambios fiscales.
        </p>

        <h2 className="text-2xl font-bold mt-10">Contacto</h2>
        <p className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-[#B91C1C]" />
          ¿Has detectado un error en un cálculo? ¿Sugerencias de calculadoras? Escríbenos a
          <a href="mailto:hola@cuotia.es" className="text-[#B91C1C]">hola@cuotia.es</a>.
        </p>

        <div className="not-prose mt-12  bg-white border border-[#B91C1C] p-6">
          <p className="font-semibold m-0 mb-3 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-[#B91C1C]" />
            Empieza por las calculadoras más usadas
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { href: "/cuota-autonomo", label: "Cuota autónomo" },
              { href: "/calculadora-irpf", label: "IRPF + modelo 130" },
              { href: "/calculadora-despido", label: "Despido y finiquito" },
              { href: "/generador-facturas", label: "Generador de facturas" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="flex items-center gap-2 text-sm text-[#B91C1C] hover:text-[#B91C1C]">
                <CheckCircle2 className="h-4 w-4" /> {l.label}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
