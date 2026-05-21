import type { Metadata } from "next";
import { IvaCalc } from "@/components/calculators/IvaCalc";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorSchema, SpeakableSchema } from "@/components/Schemas";
import { QuickAnswer } from "@/components/QuickAnswer";
import { FAQ } from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Calculadora IVA · añadir, quitar y modelo 303 trimestral",
  description: "Calcula el IVA de tus facturas (21%, 10%, 4%) o el modelo 303 trimestral: IVA repercutido menos IVA soportado. Para autónomos y empresas.",
  alternates: { canonical: "/calculadora-iva" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <CalculatorSchema
        name="Calculadora IVA y modelo 303"
        description="Calcula el IVA de tus facturas (21/10/4%) o el modelo 303 trimestral."
        path="/calculadora-iva"
      />
      <SpeakableSchema />
      <Breadcrumbs items={[{ label: "Calculadora IVA" }]} />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Calculadora IVA y modelo 303</h1>
        <p className="mt-3 text-neutral-700 max-w-3xl">
          Añade IVA, quítalo de un precio final, o calcula tu modelo 303 trimestral.
        </p>
      </header>

      <QuickAnswer
        question="¿Qué IVA aplico en mis facturas?"
        answer="El IVA general en España es del 21% y aplica a la mayoría de bienes y servicios. El reducido (10%) cubre hostelería, transporte, alimentación no básica y vivienda nueva. El superreducido (4%) aplica a alimentos básicos, libros y medicinas. Algunos servicios están exentos (educación, sanidad pública). Como autónomo declaras trimestralmente con el modelo 303: IVA cobrado menos IVA soportado. El resumen anual se hace con el modelo 390 entre el 1 y el 30 de enero."
        updatedAt="2026-05-20"
      />

      <IvaCalc />

      <AdSlot format="leaderboard" className="my-10" />

      <FAQ
        items={[
          { q: "¿Qué tipo de IVA aplico?", a: "General (21%) para la mayoría de bienes y servicios. Reducido (10%) para alimentación no básica, transporte, hostelería, vivienda nueva. Superreducido (4%) para alimentos básicos, libros, medicinas. Hay supuestos de exención (educación, sanidad pública)." },
          { q: "¿Cuándo se presenta el modelo 303?", a: "Trimestralmente: T1 (1-20 abril), T2 (1-20 julio), T3 (1-20 octubre), T4 (1-30 enero). Si domicilias el pago, 5 días antes." },
          { q: "¿Y si no he facturado nada en el trimestre?", a: "Debes presentar el 303 a cero igualmente. Las multas por no presentarlo van de 200 € a 1.500 €. Si compensas, el saldo a favor pasa al siguiente trimestre." },
          { q: "¿Cuándo me devuelven el IVA?", a: "Solo en el modelo del T4 (enero) puedes solicitar la devolución del saldo acumulado. Hasta el T3, el IVA negativo se compensa con futuros trimestres." },
          { q: "¿Qué es el modelo 390?", a: "El resumen anual del IVA: suma de los 4 trimestres del año. Se presenta entre el 1 y el 30 de enero junto con el 303 del T4. Solo es obligatorio si tributas en régimen general." },
        ]}
      />
    </div>
  );
}
