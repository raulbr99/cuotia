import type { Metadata } from "next";
import { DespidoCalc } from "@/components/calculators/DespidoCalc";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedCalcs } from "@/components/RelatedCalcs";
import { FAQ } from "@/components/FAQ";
import { QuickAnswer } from "@/components/QuickAnswer";
import { CalculatorSchema, SpeakableSchema } from "@/components/Schemas";

const ogUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es"}/api/og?title=${encodeURIComponent("Indemnización despido y finiquito")}&subtitle=${encodeURIComponent("Improcedente 33 d/año · Objetivo 20 d/año · Finiquito completo")}&tag=Despido`;

export const metadata: Metadata = {
  title: "Calculadora indemnización despido y finiquito 2026",
  description: "Calcula tu indemnización por despido improcedente, objetivo o colectivo + finiquito (vacaciones, paga extra, salario pendiente). Tipos vigentes 2026.",
  alternates: { canonical: "/calculadora-despido" },
  openGraph: { title: "Indemnización despido y finiquito 2026", description: "Improcedente 33 d/año + finiquito", images: [{ url: ogUrl, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: [ogUrl] },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <CalculatorSchema
        name="Calculadora indemnización despido y finiquito"
        description="Calcula tu indemnización por despido improcedente, objetivo o colectivo, más el finiquito (vacaciones, paga extra, salario pendiente)."
        path="/calculadora-despido"
        category="Legal Calculator"
      />
      <SpeakableSchema />
      <Breadcrumbs items={[{ label: "Calculadora despido y finiquito" }]} />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Calculadora despido y finiquito</h1>
        <p className="mt-3 text-neutral-700 max-w-3xl">
          Indemnización + finiquito completo en segundos. Despido improcedente, objetivo, colectivo o procedente.
        </p>
      </header>

      <QuickAnswer
        question="¿Cuánto te corresponde por despido en España?"
        answer="Despido improcedente: 33 días de salario por año trabajado, con un tope de 24 mensualidades. Despido objetivo o colectivo (ERE): 20 días/año, máximo 12 mensualidades. Despido procedente disciplinario: sin indemnización, solo finiquito. La indemnización está exenta de IRPF hasta 180.000 €; el finiquito (vacaciones no disfrutadas + paga extra proporcional + salario pendiente) sí tributa."
        updatedAt="2026-05-20"
      />

      <DespidoCalc />


      <FAQ
        items={[
          { q: "¿Cuál es la diferencia entre despido procedente, improcedente y objetivo?", a: "Procedente: el empresario tiene causa justa (disciplinario) y no paga indemnización. Improcedente: no hay causa válida o no se cumple el procedimiento, paga 33 días/año (máx 24 mensualidades). Objetivo: causas económicas, técnicas u organizativas, paga 20 días/año (máx 12 mensualidades). Si te despiden objetivamente y demandas y ganas, se reclasifica como improcedente." },
          { q: "¿Cuánto es el finiquito?", a: "El finiquito incluye lo que la empresa te debe en el momento del cese: salario pendiente del mes, vacaciones devengadas no disfrutadas y la parte proporcional de las pagas extras si las cobras semestralmente. Si cobras prorrateadas, la paga extra ya está incluida en el sueldo mensual." },
          { q: "¿La indemnización por despido paga IRPF?", a: "No, está exenta hasta el límite de 180.000 €. El finiquito sí tributa como rendimiento del trabajo y lleva retención. Por eso siempre conviene desglosarlos." },
          { q: "¿Qué pasa con los autónomos?", a: "Los autónomos no tienen indemnización por despido (no son empleados). Si tienes contrato mercantil, no aplican estas reglas. La prestación más cercana es el cese de actividad, calculada sobre la base de cotización." },
          { q: "¿Cuánto tiempo tengo para reclamar?", a: "20 días hábiles desde el despido para presentar papeleta de conciliación y demanda. Pasado ese plazo, pierdes el derecho a reclamar." },
        ]}
      />
      <RelatedCalcs current="despido" related={["baja", "jubilacion", "neto", "cuota"]} />
    </div>
  );
}
