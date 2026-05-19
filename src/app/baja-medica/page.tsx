import type { Metadata } from "next";
import { BajaMedicaCalc } from "@/components/calculators/BajaMedicaCalc";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Calculadora baja médica autónomo · prestación por incapacidad",
  description: "Calcula cuánto cobrarás de baja médica como autónomo: enfermedad común (60% del día 4-20, 75% desde el 21) o accidente laboral (75% desde día 1).",
  alternates: { canonical: "/baja-medica" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Baja médica autónomo" }]} />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Baja médica autónomo</h1>
        <p className="mt-3 text-gray-600 max-w-3xl">
          Cuánto cobra un autónomo de baja por enfermedad o accidente. Sin trabajar
          pero seguir pagando la cuota.
        </p>
      </header>

      <BajaMedicaCalc />

      <AdSlot format="leaderboard" className="my-10" />

      <FAQ
        items={[
          { q: "¿Quién me paga la baja como autónomo?", a: "La mutua colaboradora con la que tengas la cobertura. Si te diste de alta antes de 2019 sin elegir mutua, te la asigna la TGSS automáticamente." },
          { q: "¿Tengo que seguir pagando la cuota durante la baja?", a: "Sí, la cuota se paga igual. La prestación que recibes es independiente. A partir del día 61 de baja, puedes solicitar el aplazamiento de la cuota." },
          { q: "¿Cuándo empiezo a cobrar?", a: "Por enfermedad común: a partir del día 4 al 60%. Por accidente laboral: desde el día 1 al 75%. Los primeros 3 días de baja por enfermedad común no se cobran." },
          { q: "¿Y si la baja dura mucho?", a: "Hasta 365 días con posible prórroga de 180 más. Tras 545 días, se valora incapacidad permanente. Pasados 18 meses sin recuperación, te dan el alta forzosa o pasas a IT por revisión." },
          { q: "¿Cobro 100% en algún caso?", a: "Sí: maternidad/paternidad, embarazo de riesgo, lactancia y riesgo durante el embarazo. Estas prestaciones pagan el 100% de la base de cotización." },
        ]}
      />
    </div>
  );
}
