import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LastUpdated } from "@/components/LastUpdated";

export const metadata: Metadata = {
  title: "Política de privacidad · Cuotia",
  description: "Cómo trata Cuotia los datos personales: newsletter, analytics, cookies, derechos del usuario conforme al RGPD y la LOPD-GDD.",
  alternates: { canonical: "/privacidad" },
  robots: { index: true, follow: false },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Privacidad" }]} />

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Política de privacidad</h1>
        <LastUpdated date="2026-05-20" className="mt-3" />
      </header>

      <article className="prose prose-neutral max-w-3xl space-y-5">
        <h2 className="text-xl font-bold text-neutral-900">Resumen rápido</h2>
        <div className="not-prose rounded-lg border border-[#FECACA] bg-[#FEF2F2] p-5 my-4">
          <ul className="text-sm text-neutral-900 list-disc list-inside space-y-1">
            <li><strong>Las calculadoras NO envían tus números a ningún servidor.</strong> Todo el cálculo ocurre en tu navegador.</li>
            <li>Solo guardamos tu email si <strong>tú</strong> te suscribes a la newsletter (opt-in voluntario).</li>
            <li>Usamos analytics agregado sin cookies persistentes (Vercel Analytics).</li>
            <li>No vendemos ni cedemos datos a terceros.</li>
          </ul>
        </div>

        <h2 className="text-xl font-bold text-neutral-900">1. Responsable del tratamiento</h2>
        <p>
          Cuotia, contacto en{" "}
          <a href="mailto:hola@cuotia.es" className="text-[#B91C1C] underline">hola@cuotia.es</a>.
          Más información en el{" "}
          <Link href="/aviso-legal" className="text-[#B91C1C] underline">aviso legal</Link>.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">2. Datos que tratamos y para qué</h2>

        <h3 className="text-lg font-semibold text-neutral-900">a) Calculadoras (no se almacenan)</h3>
        <p>
          Los valores que introduces en las calculadoras (ingresos, gastos, base
          de cotización, etc.) <strong>se procesan exclusivamente en tu navegador</strong>.
          No se envían a ningún servidor de Cuotia ni de terceros. No los almacenamos.
        </p>
        <p>
          Algunas calculadoras (generador de facturas, IRPF por CCAA) guardan datos
          en <code>localStorage</code> de tu navegador para que no tengas que
          reintroducirlos. Estos datos <strong>nunca salen de tu dispositivo</strong> y
          puedes borrarlos limpiando el almacenamiento del navegador.
        </p>

        <h3 className="text-lg font-semibold text-neutral-900">b) Newsletter (opt-in voluntario)</h3>
        <p>
          Si decides suscribirte, guardamos tu email para enviarte avisos sobre cambios
          fiscales (nuevos tramos, modelos, plazos). Base legal: consentimiento expreso
          (art. 6.1.a RGPD).
        </p>
        <ul>
          <li><strong>Datos</strong>: email, fecha de alta, fuente (qué página te llevó a suscribirte).</li>
          <li><strong>Proveedor</strong>: Supabase (servidor en la UE).</li>
          <li><strong>Conservación</strong>: hasta que te des de baja.</li>
          <li><strong>Cómo darte de baja</strong>: en cualquier email o escribiendo a hola@cuotia.es.</li>
        </ul>

        <h3 className="text-lg font-semibold text-neutral-900">c) Analytics agregado</h3>
        <p>
          Usamos <strong>Vercel Analytics</strong> y <strong>Speed Insights</strong> para
          conocer páginas vistas, dispositivos y rendimiento. Estos datos son agregados
          y anónimos (no se identifica a usuarios individuales). No usan cookies
          persistentes y son compatibles con el RGPD.
        </p>

        <h3 className="text-lg font-semibold text-neutral-900">d) Publicidad (Google AdSense, futuro)</h3>
        <p>
          Cuando activemos publicidad, Google AdSense podrá usar cookies para mostrar
          anuncios contextuales. En ese momento aparecerá un banner de consentimiento
          y se actualizará esta política para detallar los proveedores y finalidades.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">3. Cookies</h2>
        <p>
          Actualmente Cuotia <strong>no instala cookies</strong> propias ni de terceros
          que requieran consentimiento. Solo usa <code>localStorage</code> técnico para
          recordar tus preferencias de calculadora (no es cookie).
        </p>
        <p>
          Si activamos publicidad o herramientas de tracking adicionales, se mostrará
          un banner de consentimiento conforme a la LSSI-CE.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">4. Destinatarios de los datos</h2>
        <p>
          No cedemos tus datos a terceros, salvo a:
        </p>
        <ul>
          <li><strong>Vercel</strong> (proveedor de hosting y analytics, EE.UU. con SCC del RGPD)</li>
          <li><strong>Supabase</strong> (proveedor del newsletter, UE)</li>
        </ul>

        <h2 className="text-xl font-bold text-neutral-900">5. Transferencias internacionales</h2>
        <p>
          Vercel está en EE.UU. Para garantizar protección equivalente al RGPD,
          opera bajo las Cláusulas Contractuales Tipo (SCC) de la Comisión Europea.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">6. Tus derechos</h2>
        <p>
          Como interesado, tienes derecho a:
        </p>
        <ul>
          <li><strong>Acceso</strong>: saber qué datos tuyos tenemos.</li>
          <li><strong>Rectificación</strong>: corregir datos inexactos.</li>
          <li><strong>Supresión</strong> ("derecho al olvido"): borrar tu email del newsletter.</li>
          <li><strong>Oposición</strong>: oponerte al tratamiento.</li>
          <li><strong>Portabilidad</strong>: recibir tus datos en formato estructurado.</li>
          <li><strong>Limitación</strong>: restringir el uso temporalmente.</li>
        </ul>
        <p>
          Para ejercerlos, escribe a{" "}
          <a href="mailto:hola@cuotia.es" className="text-[#B91C1C] underline">hola@cuotia.es</a>{" "}
          indicando tu solicitud. Respondemos en un máximo de 30 días.
        </p>
        <p>
          Si consideras que vulneramos tus derechos, puedes presentar una reclamación
          ante la{" "}
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-[#B91C1C] underline">
            Agencia Española de Protección de Datos (AEPD)
          </a>.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">7. Cambios en esta política</h2>
        <p>
          Esta política puede actualizarse. La versión vigente está siempre publicada
          en esta URL con la fecha de última actualización al inicio.
        </p>
      </article>
    </div>
  );
}
