import type { Metadata } from "next";
import { IRPFCalc } from "@/components/calculators/IRPFCalc";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickAnswer } from "@/components/QuickAnswer";
import { CalculatorSchema, SpeakableSchema } from "@/components/Schemas";

const ogUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es"}/api/og?title=${encodeURIComponent("Calculadora IRPF 2026")}&subtitle=${encodeURIComponent("Escala estatal + 17 CCAA + modelo 130 trimestral")}&tag=IRPF`;

export const metadata: Metadata = {
  title: "Calculadora IRPF autónomo 2026 · por Comunidad Autónoma + modelo 130",
  description:
    "Calcula tu IRPF anual con la escala estatal + autonómica de tu CCAA (Madrid, Cataluña, Andalucía, Valencia, las 17 CCAA). Pago fraccionado modelo 130 trimestral incluido.",
  alternates: { canonical: "/calculadora-irpf" },
  openGraph: { title: "IRPF 2026 por Comunidad Autónoma", description: "17 escalas + modelo 130", images: [{ url: ogUrl, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: [ogUrl] },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <CalculatorSchema
        name="Calculadora IRPF autónomo 2026"
        description="Calcula tu IRPF anual con la escala estatal + autonómica de tu Comunidad Autónoma. Incluye pago fraccionado modelo 130 trimestral."
        path="/calculadora-irpf"
      />
      <SpeakableSchema />
      <Breadcrumbs items={[{ label: "Calculadora IRPF" }]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Calculadora IRPF para autónomos
        </h1>
        <p className="mt-3 text-neutral-700 max-w-3xl">
          Cuota anual de IRPF con escala estatal + tu Comunidad Autónoma, o pago
          trimestral del modelo 130.
        </p>
      </header>

      <QuickAnswer
        question="¿Cuánto paga un autónomo de IRPF en 2026?"
        answer="Un autónomo paga IRPF de forma progresiva entre el 19% y el 47% según su rendimiento neto anual y Comunidad Autónoma. La mitad la fija el Estado (9,5% a 24,5% según tramo) y la otra mitad la CCAA — Madrid es la más baja (8,5% inicial), Cataluña una de las más altas (10,5%). Si menos del 70% de tus ingresos llevan retención, presentas trimestralmente el modelo 130 (20% sobre rendimiento neto)."
        updatedAt="2026-05-20"
      />

      <IRPFCalc />

      <AdSlot className="my-10" />

      <article className="prose prose-gray max-w-3xl text-sm text-neutral-700 space-y-5">
        <h2 className="text-xl font-bold text-neutral-900">IRPF anual: tramos 2026</h2>
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

        <h2 className="text-xl font-bold text-neutral-900">Modelo 130 (pago fraccionado)</h2>
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

        <h2 className="text-xl font-bold text-neutral-900">Fechas modelo 130</h2>
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
