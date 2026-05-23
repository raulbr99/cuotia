import type { Metadata } from "next";
import { CuotaAutonomoCalc } from "@/components/calculators/CuotaAutonomoCalc";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickAnswer } from "@/components/QuickAnswer";
import { CalculatorSchema, SpeakableSchema } from "@/components/Schemas";
import { RelatedCalcs } from "@/components/RelatedCalcs";
import { HowToSchema } from "@/components/HowToSchema";

const ogUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es"}/api/og?title=${encodeURIComponent("Calculadora cuota autónomo 2026")}&subtitle=${encodeURIComponent("15 tramos por ingresos reales + tarifa plana 88,64 €/mes")}&tag=Cuota+autónomo`;

export const metadata: Metadata = {
  title: "Calculadora cuota autónomo 2026 · tramos por ingresos reales",
  description:
    "Calcula tu cuota mensual de autónomo según los 15 tramos vigentes 2026 (RD-ley 3/2026). Mínima, máxima o personalizada. Tarifa plana 88,64 €/mes incluida.",
  alternates: { canonical: "/cuota-autonomo" },
  openGraph: { title: "Calculadora cuota autónomo 2026", description: "15 tramos + tarifa plana", images: [{ url: ogUrl, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: [ogUrl] },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <CalculatorSchema
        name="Calculadora cuota autónomo 2026"
        description="Calcula tu cuota mensual de autónomo según los 15 tramos por ingresos reales (RD-ley 3/2026). Incluye tarifa plana 88,64 €/mes."
        path="/cuota-autonomo"
      />
      <SpeakableSchema />
      <HowToSchema
        name="Cómo calcular tu cuota de autónomo 2026"
        description="Pasos para calcular tu cuota mensual del RETA en función de tu rendimiento neto"
        totalTime="PT1M"
        estimatedCost={{ currency: "EUR", value: "0" }}
        steps={[
          {
            name: "Estima tu rendimiento neto mensual",
            text: "Calcula tus ingresos brutos menos gastos deducibles, dividido entre 12. Por ejemplo, 30.000 € − 5.000 € = 25.000 € / 12 ≈ 2.083 €/mes.",
          },
          {
            name: "Identifica tu tramo",
            text: "Localiza el tramo correspondiente en la tabla de 15 tramos del RD-ley 3/2026. Por ejemplo, 2.083 €/mes está en el tramo 9 (2.030-2.330 €).",
          },
          {
            name: "Lee la cuota mínima del tramo",
            text: "Cada tramo tiene una cuota mínima (200-590 €/mes) y máxima. La mínima es lo que pagas por defecto.",
          },
          {
            name: "Aplica tarifa plana si eres nuevo",
            text: "Si te das de alta por primera vez, puedes pagar 88,64 €/mes (80 € + MEI 0,9%) durante 12 meses, prorrogables 12 más si tu rendimiento queda bajo SMI.",
          },
          {
            name: "Suma el MEI 2026 (0,9%)",
            text: "Sobre la base de cotización se aplica el Mecanismo de Equidad Intergeneracional. Ya viene incluido en la cuota mínima del tramo.",
          },
        ]}
      />
      <Breadcrumbs items={[{ label: "Cuota autónomo" }]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Calculadora cuota de autónomo 2026
        </h1>
        <p className="mt-3 text-neutral-700 max-w-3xl">
          Sistema de cotización por ingresos reales (RD-ley 3/2026). 15 tramos según
          tu rendimiento neto mensual.
        </p>
      </header>

      <QuickAnswer
        question="¿Cuánto paga un autónomo en 2026?"
        answer="Un autónomo en España paga entre 200 € y 590 € mensuales (cuota mínima por tramo) según su rendimiento neto, distribuido en 15 tramos por ingresos reales (RD-ley 3/2026, BOE 4 feb 2026). La cuota mínima del tramo 1 (ingresos ≤670 €/mes) es 200 €. La cuota incluye el MEI del 0,9% sobre la base. Los nuevos autónomos pueden acogerse a la tarifa plana de 88,64 €/mes (80 € + MEI) durante 12 meses, prorrogables otros 12 si su rendimiento neto anual queda por debajo del SMI."
        updatedAt="2026-05-20"
      />

      <CuotaAutonomoCalc />


      <article className="prose prose-gray max-w-3xl text-sm text-neutral-700 space-y-5">
        <h2 className="text-xl font-bold text-neutral-900">Cómo se calcula tu cuota</h2>
        <p>
          Desde 2023, los autónomos cotizan por <strong>ingresos reales</strong> en
          lugar de elegir libremente su base. Hacienda y la Seguridad Social cruzan
          datos: tu cuota se ajusta a tu rendimiento neto.
        </p>
        <p>
          <strong>Rendimiento neto</strong> = ingresos brutos − gastos deducibles −
          7% de gastos genéricos (5% para societarios). Si vas a generar 30.000 € al
          año con 5.000 € de gastos, tu rendimiento neto mensual estimado es
          (30.000 − 5.000) / 12 ≈ 2.083 € → tramo 9.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">Tarifa plana 2026</h2>
        <p>
          <strong>88,64 €/mes</strong> los primeros 12 meses si te das de alta por
          primera vez (o no has cotizado en los últimos 2 años). Prorrogable otros 12
          meses si tu rendimiento neto anual queda por debajo del SMI.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">Cuota mínima vs máxima</h2>
        <p>
          La cuota <strong>mínima</strong> es el suelo del tramo: pagas lo justo y
          tienes derecho a las prestaciones básicas. La <strong>máxima</strong> implica
          mayor base de cotización, lo que se traduce en una jubilación más alta y
          mejores prestaciones por baja, pero pagas más al mes.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">¿Cuándo se regulariza?</h2>
        <p>
          La Seguridad Social regulariza tu cuota tras la declaración de la renta. Si
          cotizaste por un tramo más bajo que el real → pagas la diferencia. Si
          cotizaste por uno más alto → te devuelven.
        </p>

        <h2 className="text-xl font-bold text-neutral-900">¿Y si eres administrador de SL?</h2>
        <p>
          Los <strong>autónomos societarios</strong> (administradores con ≥25% del capital o
          vínculo familiar con socios mayoritarios) tienen reglas distintas. En 2026 su base
          mínima sube un 42,4% hasta <strong>1.424,40 €/mes</strong>, con una cuota mínima
          aproximada de 451 €/mes. Más en{" "}
          <a href="/cuota-autonomo-societario" className="text-[#B91C1C] underline">
            cuota autónomo societario 2026
          </a>.
        </p>
      </article>

      <RelatedCalcs current="cuota" related={["irpf", "iva", "neto", "societario", "slvsauto"]} />
    </div>
  );
}
