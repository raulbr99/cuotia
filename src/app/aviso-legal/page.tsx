import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LastUpdated } from "@/components/LastUpdated";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

export const metadata: Metadata = {
  title: "Aviso legal · Cuotia",
  description: "Aviso legal de Cuotia conforme a la LSSI-CE: titular, condiciones de uso, propiedad intelectual, responsabilidades y legislación aplicable.",
  alternates: { canonical: "/aviso-legal" },
  robots: { index: true, follow: false },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Aviso legal" }]} />

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Aviso legal</h1>
        <LastUpdated date="2026-05-20" className="mt-3" />
      </header>

      <article className="prose prose-neutral max-w-3xl space-y-5">
        <h2 className="text-xl font-bold text-neutral-900">1. Información del titular</h2>
        <p>
          En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la
          Información y Comercio Electrónico (LSSI-CE), se informa de los siguientes datos:
        </p>
        <ul>
          <li><strong>Titular del sitio web</strong>: Cuotia (proyecto personal independiente)</li>
          <li><strong>Sitio web</strong>: <Link href="/" className="text-[#B91C1C] underline">{SITE_URL}</Link></li>
          <li><strong>Contacto</strong>: <a href="mailto:hola@cuotia.es" className="text-[#B91C1C] underline">hola@cuotia.es</a></li>
          <li><strong>Actividad</strong>: publicación de calculadoras fiscales gratuitas e información sobre normativa fiscal para autónomos en España. Sin venta de servicios ni asesoría fiscal individualizada.</li>
        </ul>

        <h2 className="text-xl font-bold text-neutral-900">2. Objeto</h2>
        <p>
          Cuotia ofrece herramientas gratuitas de cálculo y contenido informativo
          sobre tributación de autónomos en España. La utilización del sitio implica
          la aceptación expresa de este aviso legal.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">3. Naturaleza orientativa del contenido</h2>
        <p>
          <strong>Cuotia no presta servicios de asesoría fiscal, laboral, jurídica ni
          tributaria.</strong> Todos los cálculos y contenidos publicados tienen carácter
          meramente <em>informativo y orientativo</em>. Se basan en la interpretación de
          la normativa vigente publicada en el BOE y en fuentes oficiales (AEAT, TGSS),
          pero no sustituyen el asesoramiento profesional individualizado.
        </p>
        <p>
          Para la presentación de modelos tributarios, declaraciones o cualquier
          actuación con efectos legales, el usuario debe consultar con un gestor,
          asesor fiscal o abogado colegiado, o utilizar directamente los servicios
          oficiales de la AEAT y la Seguridad Social.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">4. Exclusión de responsabilidad</h2>
        <p>
          El titular del sitio no se hace responsable de:
        </p>
        <ul>
          <li>Errores u omisiones en los cálculos producidos por desactualización normativa, errores de programación o circunstancias particulares del usuario no contempladas.</li>
          <li>Decisiones tomadas por el usuario basándose en los resultados de las calculadoras.</li>
          <li>Daños o perjuicios derivados del uso de la información publicada.</li>
          <li>Indisponibilidad temporal del servicio por mantenimiento, fallos técnicos o causas de fuerza mayor.</li>
          <li>Contenido de sitios web de terceros enlazados desde Cuotia.</li>
        </ul>

        <h2 className="text-xl font-bold text-neutral-900">5. Propiedad intelectual</h2>
        <p>
          El diseño, los textos originales y el código de Cuotia están protegidos por
          derechos de propiedad intelectual del titular. Se permite el uso personal y
          la cita parcial con atribución y enlace a la fuente.
        </p>
        <p>
          Los datos fiscales (tipos, escalas, tramos) provienen de fuentes oficiales
          de dominio público (BOE, AEAT, TGSS) y no son objeto de protección por
          derechos de autor.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">6. Enlaces externos</h2>
        <p>
          Cuotia enlaza a sitios web oficiales (BOE, AEAT, TGSS) y a otros recursos
          de interés. El titular no controla el contenido de los sitios enlazados ni
          se responsabiliza de su disponibilidad o exactitud.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">7. Modificaciones</h2>
        <p>
          El titular se reserva el derecho a modificar este aviso legal en cualquier
          momento. Las modificaciones tendrán efecto desde su publicación en el sitio.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">8. Legislación aplicable y jurisdicción</h2>
        <p>
          Este aviso legal se rige por la legislación española. Para cualquier
          controversia derivada del uso del sitio, las partes se someten a los
          juzgados y tribunales del domicilio del titular en España, salvo norma
          imperativa que disponga lo contrario.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">9. Política de privacidad y cookies</h2>
        <p>
          Para información sobre tratamiento de datos y cookies, consulta nuestra{" "}
          <Link href="/privacidad" className="text-[#B91C1C] underline">política de privacidad</Link>.
        </p>
      </article>
    </div>
  );
}
