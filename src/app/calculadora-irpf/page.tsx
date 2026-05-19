import type { Metadata } from "next";
import { IRPFCalc } from "@/components/calculators/IRPFCalc";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Calculadora IRPF autónomo 2025 · anual y modelo 130 trimestral",
  description:
    "Calcula tu IRPF anual con los tramos estatales 2025 y el pago fraccionado trimestral del modelo 130. Tipo efectivo, desglose por tramo.",
  alternates: { canonical: "/calculadora-irpf" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Calculadora IRPF para autónomos
        </h1>
        <p className="mt-3 text-gray-600 max-w-3xl">
          Calcula tu cuota anual de IRPF o el pago trimestral del modelo 130. Escala
          estatal 2025 con desglose por tramos.
        </p>
      </header>

      <IRPFCalc />

      <AdSlot format="leaderboard" className="my-10" />

      <article className="prose prose-gray max-w-3xl text-sm text-gray-700 space-y-5">
        <h2 className="text-xl font-bold text-gray-900">IRPF anual: tramos 2025</h2>
        <p>
          El IRPF español es <strong>progresivo</strong>: pagas distinto porcentaje
          por cada tramo. La escala completa suma la <strong>estatal</strong> (esta
          calculadora) más la <strong>autonómica</strong> (varía por CCAA).
        </p>
        <ul>
          <li>0 – 12.450 € → 19%</li>
          <li>12.450 – 20.200 € → 24%</li>
          <li>20.200 – 35.200 € → 30%</li>
          <li>35.200 – 60.000 € → 37%</li>
          <li>60.000 – 300.000 € → 45%</li>
          <li>+ 300.000 € → 47%</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900">Modelo 130 (pago fraccionado)</h2>
        <p>
          Se presenta trimestralmente y supone un <strong>20% sobre el rendimiento
          neto</strong> (ingresos − gastos del trimestre). Se descuentan las
          retenciones soportadas (15% en factura, 7% para nuevos autónomos).
        </p>
        <p>
          <strong>Quién lo presenta:</strong> solo si menos del 70% de tus ingresos
          tienen retención. Profesionales que solo facturan a empresas suelen
          quedar exentos.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Fechas modelo 130</h2>
        <ul>
          <li>T1: del 1 al 20 de abril</li>
          <li>T2: del 1 al 20 de julio</li>
          <li>T3: del 1 al 20 de octubre</li>
          <li>T4: del 1 al 30 de enero</li>
        </ul>
      </article>
    </div>
  );
}
