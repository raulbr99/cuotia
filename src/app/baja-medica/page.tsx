import type { Metadata } from "next";
import { BajaMedicaCalc } from "@/components/calculators/BajaMedicaCalc";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedCalcs } from "@/components/RelatedCalcs";
import { CalculatorSchema, SpeakableSchema } from "@/components/Schemas";
import { QuickAnswer } from "@/components/QuickAnswer";
import { FAQ } from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Calculadora baja médica autónomo · prestación por incapacidad",
  description: "Calcula cuánto cobrarás de baja médica como autónomo: enfermedad común (60% del día 4-20, 75% desde el 21) o accidente laboral (75% desde día 1).",
  alternates: { canonical: "/baja-medica" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <CalculatorSchema
        name="Calculadora baja médica autónomo"
        description="Calcula tu prestación por incapacidad temporal según enfermedad común o accidente laboral."
        path="/baja-medica"
      />
      <SpeakableSchema />
      <Breadcrumbs items={[{ label: "Baja médica autónomo" }]} />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Baja médica autónomo</h1>
        <p className="mt-3 text-neutral-700 max-w-3xl">
          Cuánto cobra un autónomo de baja por enfermedad o accidente.
        </p>
      </header>

      <QuickAnswer
        question="¿Cuánto cobra un autónomo de baja médica en España?"
        answer="Por enfermedad común: 0% los días 1-3 (no se cobra), 60% de la base de cotización entre los días 4 y 20, y 75% desde el día 21. Por accidente laboral o enfermedad profesional: 75% desde el día 1. Maternidad, paternidad y embarazo de riesgo cubren el 100% de la base. Durante toda la baja debes seguir pagando la cuota mensual (aplazable desde el día 61). Te paga la mutua, no la Seguridad Social directamente."
        updatedAt="2026-05-20"
      />

      <BajaMedicaCalc />

      <AdSlot className="my-10" />

      <FAQ
        items={[
          { q: "¿Quién me paga la baja como autónomo?", a: "La mutua colaboradora con la que tengas la cobertura. Si te diste de alta antes de 2019 sin elegir mutua, te la asigna la TGSS automáticamente." },
          { q: "¿Tengo que seguir pagando la cuota durante la baja?", a: "Sí, la cuota se paga igual. La prestación que recibes es independiente. A partir del día 61 de baja, puedes solicitar el aplazamiento de la cuota." },
          { q: "¿Cuándo empiezo a cobrar?", a: "Por enfermedad común: a partir del día 4 al 60%. Por accidente laboral: desde el día 1 al 75%. Los primeros 3 días de baja por enfermedad común no se cobran." },
          { q: "¿Y si la baja dura mucho?", a: "Hasta 365 días con posible prórroga de 180 más. Tras 545 días, se valora incapacidad permanente. Pasados 18 meses sin recuperación, te dan el alta forzosa o pasas a IT por revisión." },
          { q: "¿Cobro 100% en algún caso?", a: "Sí: maternidad/paternidad, embarazo de riesgo, lactancia y riesgo durante el embarazo. Estas prestaciones pagan el 100% de la base de cotización." },
        ]}
      />
      <RelatedCalcs current="baja" related={["cuota", "despido", "jubilacion", "facturas"]} />
    </div>
  );
}
