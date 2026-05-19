import type { Metadata } from "next";
import { CuotaAutonomoCalc } from "@/components/calculators/CuotaAutonomoCalc";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Calculadora cuota autónomo 2025 · tramos por ingresos reales",
  description:
    "Calcula tu cuota mensual de autónomo según los 15 tramos vigentes 2025 (RD-ley 13/2022). Mínima, máxima o personalizada. Tarifa plana 87 €/mes incluida.",
  alternates: { canonical: "/cuota-autonomo" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Calculadora cuota de autónomo 2025
        </h1>
        <p className="mt-3 text-gray-600 max-w-3xl">
          Sistema de cotización por ingresos reales (RD-ley 13/2022). 15 tramos según
          tu rendimiento neto mensual. Elige cuota mínima para pagar menos, máxima
          para cotizar más para la jubilación, o personalizada.
        </p>
      </header>

      <CuotaAutonomoCalc />

      <AdSlot format="leaderboard" className="my-10" />

      <article className="prose prose-gray max-w-3xl text-sm text-gray-700 space-y-5">
        <h2 className="text-xl font-bold text-gray-900">Cómo se calcula tu cuota</h2>
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

        <h2 className="text-xl font-bold text-gray-900">Tarifa plana 2025</h2>
        <p>
          <strong>87 €/mes</strong> los primeros 12 meses si te das de alta por
          primera vez (o no has cotizado en los últimos 2 años). Prorrogable otros 12
          meses si tu rendimiento neto anual queda por debajo del SMI.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Cuota mínima vs máxima</h2>
        <p>
          La cuota <strong>mínima</strong> es el suelo del tramo: pagas lo justo y
          tienes derecho a las prestaciones básicas. La <strong>máxima</strong> implica
          mayor base de cotización, lo que se traduce en una jubilación más alta y
          mejores prestaciones por baja, pero pagas más al mes.
        </p>

        <h2 className="text-xl font-bold text-gray-900">¿Cuándo se regulariza?</h2>
        <p>
          La Seguridad Social regulariza tu cuota tras la declaración de la renta. Si
          cotizaste por un tramo más bajo que el real → pagas la diferencia. Si
          cotizaste por uno más alto → te devuelven.
        </p>
      </article>
    </div>
  );
}
