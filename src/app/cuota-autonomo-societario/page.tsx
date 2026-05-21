import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickAnswer } from "@/components/QuickAnswer";
import { FAQ } from "@/components/FAQ";
import { LastUpdated } from "@/components/LastUpdated";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

const ogUrl = `${SITE_URL}/api/og?title=${encodeURIComponent("Cuota autónomo societario 2026")}&subtitle=${encodeURIComponent("Base mínima sube +42,4% → 1.424,40 €/mes")}&tag=Societario`;

export const metadata: Metadata = {
  title: "Cuota autónomo societario 2026 · base mínima sube a 1.424,40 €",
  description:
    "El autónomo societario (administrador SL) ve subir su base mínima de cotización un 42,4% en 2026: de 1.000 € a 1.424,40 €/mes. Cuota mínima estimada ~451 €/mes. Cómo te afecta y qué hacer.",
  alternates: { canonical: "/cuota-autonomo-societario" },
  openGraph: {
    title: "Cuota autónomo societario 2026",
    description: "Base mínima sube +42,4% a 1.424,40 €/mes. Cuota ~451 €.",
    images: [{ url: ogUrl, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [ogUrl] },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Cuota autónomo societario 2026: la subida del 42,4%",
  description: "Análisis del cambio en la base mínima de cotización del autónomo societario y colaborador familiar en 2026.",
  datePublished: "2026-05-20",
  dateModified: "2026-05-20",
  author: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
  publisher: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/cuota-autonomo-societario` },
};

const faqs = [
  {
    q: "¿Quién es autónomo societario?",
    a: "El autónomo societario es la persona física que ejerce funciones de dirección y gerencia en una sociedad mercantil (SL, SA, cooperativa) y posee al menos el 25% del capital social. También se asimilan los administradores con vínculo familiar con socios mayoritarios. Cotizan en el RETA con reglas especiales.",
  },
  {
    q: "¿Cuál es la base mínima del autónomo societario en 2026?",
    a: "En 2026 la base mínima del autónomo societario y colaborador familiar es 1.424,40 €/mes. Esto supone una subida del 42,4% respecto a 2025 (cuando era 1.000 €/mes). Es una de las subidas más importantes del año.",
  },
  {
    q: "¿Cuál es la cuota mínima del autónomo societario 2026?",
    a: "Aproximadamente 451 €/mes (base mínima 1.424,40 × ~31,67% tipo total contingencias + MEI). La cifra exacta depende de las coberturas elegidas (contingencias profesionales, cese de actividad).",
  },
  {
    q: "¿Por qué sube tanto la base mínima societaria?",
    a: "Forma parte del calendario de equiparación progresiva entre autónomos persona física y societarios. La Seguridad Social busca que la base mínima societaria se acerque a la base máxima del grupo 1 del régimen general (donde cotizan los directivos de sociedades por cuenta ajena).",
  },
  {
    q: "¿También aplica al colaborador familiar?",
    a: "Sí. El familiar colaborador (cónyuge, pareja de hecho, descendientes, ascendientes que trabajan con el autónomo) cotiza con la misma base mínima del autónomo societario: 1.424,40 €/mes en 2026.",
  },
  {
    q: "¿Puedo seguir cotizando por menos si soy administrador de SL?",
    a: "No. Si reúnes los requisitos de autónomo societario (>=25% capital + funciones de dirección, o vínculo familiar con socios mayoritarios), estás obligado a cotizar por la base mínima societaria. La TGSS regulariza de oficio si detecta que cotizas por menos.",
  },
  {
    q: "¿Hay tarifa plana para autónomos societarios?",
    a: "Tradicionalmente NO, pero el Tribunal Supremo ha emitido sentencias contradictorias. Algunos administradores han conseguido la tarifa plana tras recurso. Consulta con un gestor antes de pedirla — la TGSS aún la deniega por defecto a societarios.",
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Breadcrumbs items={[{ label: "Cuota autónomo societario" }]} />

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Cuota autónomo societario 2026
        </h1>
        <p className="mt-3 text-neutral-600 max-w-3xl">
          La base mínima de cotización sube un 42,4% en 2026. Análisis del cambio,
          a quién afecta y cómo prepararte.
        </p>
        <LastUpdated date="2026-05-20" source="Fuente: TGSS, BOE (RD-ley 3/2026)" className="mt-3" />
      </header>

      <QuickAnswer
        question="¿Cuál es la cuota del autónomo societario en 2026?"
        answer="La base mínima del autónomo societario en 2026 es 1.424,40 €/mes (sube un 42,4% desde los 1.000 € de 2025). La cuota mínima mensual a pagar es aproximadamente 451 €/mes (~31,67% sobre la base mínima + MEI 0,9%). Aplica a administradores de sociedades mercantiles con ≥25% del capital y a colaboradores familiares."
        updatedAt="2026-05-20"
      />

      <article className="prose prose-neutral max-w-3xl mt-8 space-y-5">
        <h2 className="text-xl font-bold text-neutral-900">El cambio en una tabla</h2>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <caption className="sr-only">Comparativa base mínima autónomo societario 2025 vs 2026</caption>
            <thead>
              <tr className="border-b border-neutral-300">
                <th scope="col" className="text-left py-2 font-semibold text-neutral-900">Concepto</th>
                <th scope="col" className="text-right py-2 font-semibold text-neutral-900">2025</th>
                <th scope="col" className="text-right py-2 font-semibold text-neutral-900">2026</th>
                <th scope="col" className="text-right py-2 font-semibold text-[#B91C1C]">Δ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">Base mínima cotización</th>
                <td className="text-right py-2 text-neutral-700">1.000 €/mes</td>
                <td className="text-right py-2 font-semibold text-neutral-900">1.424,40 €/mes</td>
                <td className="text-right py-2 font-semibold text-[#B91C1C]">+42,4%</td>
              </tr>
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">Cuota mínima estimada</th>
                <td className="text-right py-2 text-neutral-700">~315 €/mes</td>
                <td className="text-right py-2 font-semibold text-neutral-900">~451 €/mes</td>
                <td className="text-right py-2 font-semibold text-[#B91C1C]">+43%</td>
              </tr>
              <tr>
                <th scope="row" className="py-2 font-normal text-neutral-700 text-left">Coste anual extra</th>
                <td className="text-right py-2 text-neutral-700">—</td>
                <td className="text-right py-2 font-semibold text-neutral-900">~1.630 €/año</td>
                <td className="text-right py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold text-neutral-900">A quién afecta</h2>
        <ul>
          <li><strong>Administradores de SL/SA</strong> con al menos el 25% del capital social y funciones de dirección o gerencia efectiva.</li>
          <li><strong>Administradores con vínculo familiar</strong> con socios mayoritarios (aunque ellos no tengan el 25%, si la suma con sus familiares supera el 50%, se asimilan a societarios).</li>
          <li><strong>Colaboradores familiares</strong>: cónyuge, pareja de hecho, descendientes, ascendientes que trabajan habitualmente con el autónomo.</li>
        </ul>

        <h2 className="text-xl font-bold text-neutral-900">Por qué sube</h2>
        <p>
          Es una equiparación progresiva planificada por la Seguridad Social. La base
          mínima del autónomo societario se acerca al <strong>tope mínimo del grupo 1
          del régimen general</strong> (1.928,10 €/mes en 2026), donde cotizan los
          directivos por cuenta ajena. La lógica oficial: <em>quien gestiona una sociedad
          debe cotizar como tal, no como un autónomo individual de bajos ingresos</em>.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">Qué puedes hacer</h2>
        <ol>
          <li>
            <strong>Revisar tu estructura societaria</strong>: si eres administrador con
            menos del 25% y no eres familiar de socios mayoritarios, no eres societario
            a efectos del RETA.
          </li>
          <li>
            <strong>Considerar el cese y la pluriactividad</strong>: en algunos casos
            cotizar por una actividad por cuenta ajena puede compensar parte de la subida.
          </li>
          <li>
            <strong>Aumentar voluntariamente la base</strong>: si planeas jubilarte pronto,
            la subida obligatoria puede acelerar tu base reguladora.
          </li>
          <li>
            <strong>Consultar a tu gestor</strong>: cada caso societario tiene matices
            (porcentajes, vínculos familiares, funciones efectivas).
          </li>
        </ol>

        <h2 className="text-xl font-bold text-neutral-900">Marco legal</h2>
        <ul>
          <li><strong>RD-ley 3/2026</strong> (BOE 4 de febrero de 2026): congelación de tramos generales y nueva base mínima societaria.</li>
          <li><strong>Orden PJC/297/2026</strong> (BOE 31 de marzo de 2026): desarrollo reglamentario.</li>
          <li><strong>RD-ley 13/2022</strong>: sistema original de cotización por ingresos reales.</li>
        </ul>
      </article>

      <section className="mt-10">
        <FAQ items={faqs} />
      </section>

      <section className="mt-10 rounded-lg border border-neutral-200 bg-white p-5">
        <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-3">Relacionado</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <Link href="/cuota-autonomo" className="text-sm text-[#B91C1C] hover:underline">
            → Calculadora cuota autónomo (15 tramos)
          </Link>
          <Link href="/jubilacion-autonomo" className="text-sm text-[#B91C1C] hover:underline">
            → Cómo afecta la base a tu pensión futura
          </Link>
          <Link href="/blog/tramos-cuota-autonomo-2026" className="text-sm text-[#B91C1C] hover:underline">
            → Tramos cuota 2026 (congelación)
          </Link>
          <Link href="/blog/mei-2026-cotizacion-extra" className="text-sm text-[#B91C1C] hover:underline">
            → MEI 2026: la cotización extra
          </Link>
        </div>
      </section>
    </div>
  );
}
