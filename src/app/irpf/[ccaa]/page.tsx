import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { IRPFCalc } from "@/components/calculators/IRPFCalc";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickAnswer } from "@/components/QuickAnswer";
import { FAQ } from "@/components/FAQ";
import { CalculatorSchema, SpeakableSchema } from "@/components/Schemas";
import { CCAA_NAMES, TRAMOS_CCAA_2025, type CCAA } from "@/lib/irpf-ccaa";
import { eur, pct } from "@/lib/format";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

const VALID_CCAAS: CCAA[] = (Object.keys(CCAA_NAMES) as CCAA[]).filter(
  (c) => c !== "navarra" && c !== "pais-vasco",
);

export function generateStaticParams() {
  return VALID_CCAAS.map((ccaa) => ({ ccaa }));
}

interface PageProps {
  params: Promise<{ ccaa: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ccaa: slug } = await params;
  const ccaa = slug as CCAA;
  if (!VALID_CCAAS.includes(ccaa)) return {};
  const nombre = CCAA_NAMES[ccaa];

  const title = `IRPF ${nombre} 2026 · calculadora con tramos autonómicos`;
  const description = `Calcula tu IRPF en ${nombre} con la escala estatal + autonómica vigente 2026. Tramos, tipo efectivo y desglose por escalón.`;

  return {
    title,
    description,
    alternates: { canonical: `/irpf/${ccaa}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/irpf/${ccaa}`,
      type: "website",
      images: [{
        url: `${SITE_URL}/api/og?title=${encodeURIComponent(`IRPF ${nombre} 2026`)}&subtitle=${encodeURIComponent("Escala estatal + autonómica con calculadora interactiva")}&tag=${encodeURIComponent(nombre)}`,
        width: 1200,
        height: 630,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/api/og?title=${encodeURIComponent(`IRPF ${nombre} 2026`)}&tag=${encodeURIComponent(nombre)}`],
    },
  };
}

const TIPO_ESPECIAL: Partial<Record<CCAA, string>> = {
  "madrid": "Madrid tiene una de las escalas más bajas de España: tipo inicial 8,5% y máximo 20,5%. Combinada con la estatal arranca en 18% y llega a 45% en tramos altos.",
  "cataluna": "Cataluña tiene una de las escalas más altas tras la reforma de 2023: tipo inicial 10,5% y máximo 25,5%. Para rentas altas el combinado supera el 50%.",
  "andalucia": "Andalucía reformó su escala en 2023 simplificándola a 5 tramos. Tipo inicial 9,5%, máximo 22,5% para rentas superiores a 60.000 €/año.",
  "valencia": "Comunidad Valenciana revisó su escala en 2023 ampliando a 9 tramos. Tipo inicial 9%, máximo 29,5% para rentas superiores a 150.000 €/año.",
  "extremadura": "Extremadura tiene 9 tramos con el tipo inicial más bajo de España (8%). Máximo 25% para rentas > 120.200 €/año.",
  "galicia": "Galicia simplifica con 5 tramos. Tipo inicial 9%, máximo 22,5% para rentas > 60.000 €/año.",
};

const ESTATAL_HALF = [
  { hasta: 12450, tipo: 0.095 },
  { hasta: 20200, tipo: 0.12 },
  { hasta: 35200, tipo: 0.15 },
  { hasta: 60000, tipo: 0.185 },
  { hasta: 300000, tipo: 0.225 },
  { hasta: null, tipo: 0.245 },
];

export default async function Page({ params }: PageProps) {
  const { ccaa: slug } = await params;
  const ccaa = slug as CCAA;
  if (!VALID_CCAAS.includes(ccaa)) notFound();

  const nombre = CCAA_NAMES[ccaa];
  const tramos = TRAMOS_CCAA_2025[ccaa];
  const tipoInicial = tramos[0]?.tipo ?? 0;
  const tipoMaximo = tramos[tramos.length - 1]?.tipo ?? 0;
  const combinadoMin = (tramos[0]?.tipo ?? 0) + (ESTATAL_HALF[0]?.tipo ?? 0);
  const combinadoMax = (tramos[tramos.length - 1]?.tipo ?? 0) + (ESTATAL_HALF[ESTATAL_HALF.length - 1]?.tipo ?? 0);

  const especial = TIPO_ESPECIAL[ccaa];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <CalculatorSchema
        name={`Calculadora IRPF ${nombre} 2026`}
        description={`Calcula tu IRPF en ${nombre} con la escala combinada estatal + autonómica vigente 2026.`}
        path={`/irpf/${ccaa}`}
      />
      <SpeakableSchema />
      <Breadcrumbs items={[
        { label: "IRPF", href: "/calculadora-irpf" },
        { label: nombre },
      ]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          IRPF en {nombre} 2026
        </h1>
        <p className="mt-3 text-neutral-700 max-w-3xl">
          Calcula tu IRPF anual combinando la <strong>escala estatal</strong> con la
          <strong> escala autonómica de {nombre}</strong>. Tramos vigentes 2026.
        </p>
      </header>

      <QuickAnswer
        question={`¿Cuánto se paga de IRPF en ${nombre} 2026?`}
        answer={`En ${nombre}, el IRPF combinado (estatal + autonómico) va del ${pct(combinadoMin)} al ${pct(combinadoMax)} según el rendimiento neto anual. La escala autonómica de ${nombre} aplica tipos del ${pct(tipoInicial)} al ${pct(tipoMaximo)} sobre los mismos tramos. La cuota total se suma a la escala estatal (9,5% – 24,5% por tramo). ${especial || "Es una escala progresiva."}`}
        updatedAt="2026-05-20"
      />

      <IRPFCalc defaultCcaa={ccaa} lockCcaa />

      <AdSlot format="leaderboard" className="my-10" />

      <article className="prose prose-gray max-w-3xl text-sm text-neutral-700 space-y-5">
        <h2 className="text-xl font-bold text-neutral-900">Tramos autonómicos de {nombre} 2026</h2>
        <div className="not-prose  border border-neutral-200 bg-white overflow-hidden my-4">
          <table className="w-full text-sm">
            <thead className="bg-white text-xs uppercase text-neutral-700">
              <tr>
                <th className="px-3 py-2 text-left">Desde</th>
                <th className="px-3 py-2 text-left">Hasta</th>
                <th className="px-3 py-2 text-right">Tipo {nombre}</th>
                <th className="px-3 py-2 text-right">+ Estatal</th>
                <th className="px-3 py-2 text-right">= Combinado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {tramos.map((t, i) => {
                const est = ESTATAL_HALF.find((e) => e.hasta === null || (t.desde < (e.hasta ?? Infinity)))?.tipo || 0;
                return (
                  <tr key={i}>
                    <td className="px-3 py-2 text-neutral-700">{eur(t.desde)}</td>
                    <td className="px-3 py-2 text-neutral-700">{t.hasta ? eur(t.hasta) : "—"}</td>
                    <td className="px-3 py-2 text-right font-medium">{pct(t.tipo)}</td>
                    <td className="px-3 py-2 text-right text-neutral-500">{pct(est)}</td>
                    <td className="px-3 py-2 text-right font-semibold text-[#B91C1C]">{pct(t.tipo + est)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold text-neutral-900">Comparativa con otras CCAAs</h2>
        <p>
          {nombre} es {tipoInicial < 0.09 ? "una de las CCAAs con menor presión fiscal en tramos bajos" : tipoInicial > 0.1 ? "una de las CCAAs con mayor presión fiscal en tramos bajos" : "una CCAA con tributación intermedia"}.
          {especial && ` ${especial}`}
        </p>
        <p>
          Algunas CCAAs con escalas más bajas son <Link href="/irpf/madrid" className="text-[#B91C1C] underline">Madrid</Link> y <Link href="/irpf/galicia" className="text-[#B91C1C] underline">Galicia</Link>.
          Las que más cobran son <Link href="/irpf/cataluna" className="text-[#B91C1C] underline">Cataluña</Link> y <Link href="/irpf/asturias" className="text-[#B91C1C] underline">Asturias</Link>.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">Cómo se calcula tu IRPF</h2>
        <p>
          El IRPF español es <strong>progresivo y dual</strong>: la mitad la fija el Estado
          (escala estatal half) y la otra mitad cada Comunidad Autónoma. Tu tipo efectivo
          se calcula tramo por tramo sumando ambas escalas.
        </p>
        <p>
          La calculadora no incluye <strong>mínimos personales</strong> (descendientes,
          discapacidad, mayores de 65...), <strong>deducciones autonómicas</strong>
          específicas de {nombre} ni reducciones por aportaciones a planes de pensiones.
          Estas pueden reducir significativamente la cuota final.
        </p>
      </article>

      <AdSlot format="rectangle" className="my-10" />

      <FAQ
        items={[
          { q: `¿Por qué es diferente el IRPF en ${nombre} que en otra CCAA?`, a: `Cada Comunidad Autónoma fija libremente su tramo autonómico del IRPF. Es la mitad del impuesto y puede variar mucho. Madrid es la más baja del territorio peninsular; Cataluña, La Rioja y Asturias son las más altas en tramos altos.` },
          { q: `¿Dónde se presenta el IRPF si vivo en ${nombre}?`, a: `Donde tengas la residencia fiscal habitual a 31 de diciembre del año. Si residiste más de 183 días en ${nombre}, presentas allí. Si te mudaste, aplica la regla del centro de intereses económicos.` },
          { q: "¿Puedo elegir CCAA para pagar menos IRPF?", a: "No directamente. La residencia fiscal se determina por días de residencia (>183 al año) o centro de intereses económicos. Empadronarse en una CCAA sin vivir allí es fraude fiscal." },
          { q: "¿Y si trabajo en una CCAA y vivo en otra?", a: "Lo que cuenta es donde resides, no donde trabajas. Un trabajador que vive en Madrid y va a Toledo todos los días paga el IRPF de Madrid." },
        ]}
      />
    </div>
  );
}
