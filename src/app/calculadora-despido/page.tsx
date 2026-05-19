import type { Metadata } from "next";
import { DespidoCalc } from "@/components/calculators/DespidoCalc";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Calculadora indemnización despido y finiquito 2025",
  description: "Calcula tu indemnización por despido improcedente, objetivo o colectivo + finiquito (vacaciones, paga extra, salario pendiente). Tipos vigentes 2025.",
  alternates: { canonical: "/calculadora-despido" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Calculadora despido y finiquito" }]} />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Calculadora despido y finiquito</h1>
        <p className="mt-3 text-gray-600 max-w-3xl">
          Calcula tu indemnización por despido (33 días/año improcedente, 20 días objetivo)
          y el finiquito (vacaciones no disfrutadas, pagas extras prorrateadas, salario pendiente).
        </p>
      </header>

      <DespidoCalc />

      <AdSlot format="leaderboard" className="my-10" />

      <FAQ
        items={[
          { q: "¿Cuál es la diferencia entre despido procedente, improcedente y objetivo?", a: "Procedente: el empresario tiene causa justa (disciplinario) y no paga indemnización. Improcedente: no hay causa válida o no se cumple el procedimiento, paga 33 días/año (máx 24 mensualidades). Objetivo: causas económicas, técnicas u organizativas, paga 20 días/año (máx 12 mensualidades). Si te despiden objetivamente y demandas y ganas, se reclasifica como improcedente." },
          { q: "¿Cuánto es el finiquito?", a: "El finiquito incluye lo que la empresa te debe en el momento del cese: salario pendiente del mes, vacaciones devengadas no disfrutadas y la parte proporcional de las pagas extras si las cobras semestralmente. Si cobras prorrateadas, la paga extra ya está incluida en el sueldo mensual." },
          { q: "¿La indemnización por despido paga IRPF?", a: "No, está exenta hasta el límite de 180.000 €. El finiquito sí tributa como rendimiento del trabajo y lleva retención. Por eso siempre conviene desglosarlos." },
          { q: "¿Qué pasa con los autónomos?", a: "Los autónomos no tienen indemnización por despido (no son empleados). Si tienes contrato mercantil, no aplican estas reglas. La prestación más cercana es el cese de actividad, calculada sobre la base de cotización." },
          { q: "¿Cuánto tiempo tengo para reclamar?", a: "20 días hábiles desde el despido para presentar papeleta de conciliación y demanda. Pasado ese plazo, pierdes el derecho a reclamar." },
        ]}
      />
    </div>
  );
}
