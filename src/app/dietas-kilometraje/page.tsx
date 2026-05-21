import type { Metadata } from "next";
import { DietasCalc } from "@/components/calculators/DietasCalc";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorSchema, SpeakableSchema } from "@/components/Schemas";
import { QuickAnswer } from "@/components/QuickAnswer";
import { FAQ } from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Calculadora dietas y kilometraje deducibles 2025",
  description: "Calcula tus dietas exentas de IRPF (26,67 €/día España, 48,08 €/día extranjero) y kilometraje (0,26 €/km). Para autónomos y trabajadores.",
  alternates: { canonical: "/dietas-kilometraje" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <CalculatorSchema
        name="Calculadora dietas y kilometraje deducibles"
        description="Calcula las dietas exentas de IRPF y la deducción por kilometraje (0,26 €/km) en 2025."
        path="/dietas-kilometraje"
      />
      <SpeakableSchema />
      <Breadcrumbs items={[{ label: "Dietas y kilometraje" }]} />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Dietas y kilometraje deducibles</h1>
        <p className="mt-3 text-slate-700 max-w-3xl">
          Cuánto puedes deducir por desplazamientos y manutención. Límites exentos 2025.
        </p>
      </header>

      <QuickAnswer
        question="¿Cuánto puedo deducir por dietas y km en 2025?"
        answer="Kilometraje: 0,26 €/km en vehículo propio. Dietas exentas de IRPF: España sin pernocta 26,67 €/día, con pernocta 53,34 €/día. Extranjero sin pernocta 48,08 €/día, con pernocta 91,35 €/día. El exceso tributa como rendimiento. Necesitas justificantes (tickets, facturas) y los pagos deben ser por medios telemáticos (no efectivo) en horario laboral, en establecimientos de hostelería."
        updatedAt="2026-05-20"
      />

      <DietasCalc />

      <AdSlot format="leaderboard" className="my-10" />

      <FAQ
        items={[
          { q: "¿Cuánto puedo deducir por kilómetro?", a: "0,26 €/km desde julio 2023 (antes era 0,19). Aplica si usas tu vehículo personal para desplazamientos profesionales. Necesitas justificar el motivo y el destino (factura, reunión, visita comercial)." },
          { q: "¿Qué dietas están exentas?", a: "España sin pernocta: 26,67 €/día. Con pernocta: 53,34 €/día. Extranjero sin pernocta: 48,08 €/día. Con pernocta: 91,35 €/día. Por encima de estos límites, tributa como rendimiento del trabajo." },
          { q: "¿Necesito justificantes?", a: "Sí siempre: tickets de comida, facturas de hotel, peajes, parking. Sin justificantes, Hacienda no acepta la deducción. Conserva los originales 4 años." },
          { q: "¿Los autónomos pueden deducir dietas?", a: "Sí desde 2018, pero con condiciones: pagar con tarjeta/medios telemáticos (no efectivo), en horario laboral, y solo en restaurantes / hostelería. Límite igual al de trabajadores por cuenta ajena." },
          { q: "¿Y si el cliente me reembolsa?", a: "Si te reembolsan los gastos, no son deducibles para ti (no son tu gasto). Factura los desplazamientos como suplido o aparte. Los suplidos no llevan IVA y no son ingreso." },
        ]}
      />
    </div>
  );
}
