import type { Metadata } from "next";
import { NetoBrutoCalc } from "@/components/calculators/NetoBrutoCalc";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorSchema, SpeakableSchema } from "@/components/Schemas";
import { QuickAnswer } from "@/components/QuickAnswer";

export const metadata: Metadata = {
  title: "Calculadora neto/bruto autónomo · cuánto te queda al mes 2025",
  description:
    "Calcula tu neto anual y mensual como autónomo: tras gastos, cuota Seguridad Social e IRPF. Incluye opción de tarifa plana.",
  alternates: { canonical: "/neto-bruto" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <CalculatorSchema
        name="Calculadora neto/bruto autónomo"
        description="Calcula tu neto anual y mensual como autónomo tras gastos, cuota Seguridad Social e IRPF."
        path="/neto-bruto"
      />
      <SpeakableSchema />
      <Breadcrumbs items={[{ label: "Neto / Bruto" }]} />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          ¿Cuánto me queda como autónomo?
        </h1>
        <p className="mt-3 text-[#A0A0A0] max-w-3xl">
          Pasa de bruto a neto: ingresos − gastos − cuota − IRPF.
        </p>
      </header>

      <QuickAnswer
        question="¿Cuánto le queda neto a un autónomo?"
        answer="Un autónomo en España conserva aproximadamente el 55-65% de sus ingresos brutos como neto tras descontar cuota de Seguridad Social (entre 230 € y 1.085 €/mes según tramo), IRPF estatal + autonómico (19-47% progresivo) y gastos deducibles. Por cada 40.000 € brutos con 5.000 € de gastos deducibles, el neto orientativo es 24.000-26.000 € anuales (~2.000 €/mes), variando según Comunidad Autónoma."
        updatedAt="2026-05-20"
      />

      <NetoBrutoCalc />

      <AdSlot format="leaderboard" className="my-10" />

      <article className="prose prose-gray max-w-3xl text-sm text-[#A0A0A0] space-y-5">
        <h2 className="text-xl font-bold text-white">Cómo se calcula tu neto</h2>
        <p>El cálculo es:</p>
        <pre className="bg-[#0A0A0A] rounded-lg p-4 text-xs">
{`Ingresos brutos
− Gastos deducibles
− Cuota autónomo anual (12 × mensual)
− IRPF estimado
= NETO anual`}
        </pre>

        <h2 className="text-xl font-bold text-white">Qué cuenta como gasto deducible</h2>
        <ul>
          <li>Material y suministros relacionados con la actividad</li>
          <li>Gestoría y servicios profesionales</li>
          <li>Oficina (si trabajas en casa, parte proporcional de los suministros)</li>
          <li>Vehículo (solo si es de uso exclusivo profesional)</li>
          <li>Dietas: hasta 26,67 €/día en España, 48,08 €/día extranjero</li>
          <li>Cuota de autónomos</li>
          <li>Seguros relacionados con la actividad</li>
        </ul>

        <h2 className="text-xl font-bold text-white">Por qué tu neto puede ser menor</h2>
        <p>
          Esta calculadora no incluye <strong>la cuota autonómica del IRPF</strong>
          (varía por CCAA). En la mayoría de regiones añade entre un 3 y un 10% al
          tipo efectivo. Tampoco incluye deducciones personales (mínimos por
          descendientes, vivienda habitual, planes de pensiones), que pueden reducir
          significativamente tu factura final.
        </p>
      </article>
    </div>
  );
}
