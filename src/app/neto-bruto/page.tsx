import type { Metadata } from "next";
import Link from "next/link";
import { NetoBrutoCalc } from "@/components/calculators/NetoBrutoCalc";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedCalcs } from "@/components/RelatedCalcs";
import { CalculatorSchema, SpeakableSchema } from "@/components/Schemas";
import { QuickAnswer } from "@/components/QuickAnswer";
import { NETO_BRUTO_TARGETS, netoBrutoSlug } from "@/lib/seo-targets";

export const metadata: Metadata = {
  title: "Calculadora neto/bruto autónomo · cuánto te queda al mes 2026",
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
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          ¿Cuánto me queda como autónomo?
        </h1>
        <p className="mt-3 text-neutral-700 max-w-3xl">
          Pasa de bruto a neto: ingresos − gastos − cuota − IRPF.
        </p>
      </header>

      <QuickAnswer
        question="¿Cuánto le queda neto a un autónomo?"
        answer="Un autónomo en España conserva aproximadamente el 55-65% de sus ingresos brutos como neto tras descontar cuota de Seguridad Social (entre 200 € y 590 €/mes según tramo (cuota mínima)), IRPF estatal + autonómico (19-47% progresivo) y gastos deducibles. Por cada 40.000 € brutos con 5.000 € de gastos deducibles, el neto orientativo es 24.000-26.000 € anuales (~2.000 €/mes), variando según Comunidad Autónoma."
        updatedAt="2026-05-20"
      />

      <NetoBrutoCalc />


      <article className="prose prose-gray max-w-3xl text-sm text-neutral-700 space-y-5">
        <h2 className="text-xl font-bold text-neutral-900">Cómo se calcula tu neto</h2>
        <p>El cálculo es:</p>
        <pre className="bg-white  p-4 text-xs">
{`Ingresos brutos
− Gastos deducibles
− Cuota autónomo anual (12 × mensual)
− IRPF estimado
= NETO anual`}
        </pre>

        <h2 className="text-xl font-bold text-neutral-900">Qué cuenta como gasto deducible</h2>
        <ul>
          <li>Material y suministros relacionados con la actividad</li>
          <li>Gestoría y servicios profesionales</li>
          <li>Oficina (si trabajas en casa, parte proporcional de los suministros)</li>
          <li>Vehículo (solo si es de uso exclusivo profesional)</li>
          <li>Dietas: hasta 26,67 €/día en España, 48,08 €/día extranjero</li>
          <li>Cuota de autónomos</li>
          <li>Seguros relacionados con la actividad</li>
        </ul>

        <h2 className="text-xl font-bold text-neutral-900">Por qué tu neto puede ser menor</h2>
        <p>
          Esta calculadora no incluye <strong>la cuota autonómica del IRPF</strong>
          (varía por CCAA). En la mayoría de regiones añade entre un 3 y un 10% al
          tipo efectivo. Tampoco incluye deducciones personales (mínimos por
          descendientes, vivienda habitual, planes de pensiones), que pueden reducir
          significativamente tu factura final.
        </p>
      </article>

      <section className="mt-10 rounded-lg border border-neutral-200 bg-white p-5">
        <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-3">
          Neto según tus ingresos brutos
        </p>
        <div className="flex flex-wrap gap-2">
          {NETO_BRUTO_TARGETS.map((n) => (
            <Link
              key={n}
              href={`/neto-bruto/${netoBrutoSlug(n)}`}
              className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 hover:border-[#B91C1C] hover:text-[#B91C1C]"
            >
              {n.toLocaleString("es-ES")} € brutos
            </Link>
          ))}
        </div>
      </section>

      <RelatedCalcs current="neto" related={["cuota", "irpf", "slvsauto", "facturas"]} />
    </div>
  );
}
