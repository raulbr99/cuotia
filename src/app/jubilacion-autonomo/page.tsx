import type { Metadata } from "next";
import { JubilacionCalc } from "@/components/calculators/JubilacionCalc";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Calculadora pensión jubilación autónomo 2027",
  description: "Calcula tu pensión de jubilación como autónomo según base de cotización y años cotizados. Coeficientes vigentes para 2027.",
  alternates: { canonical: "/jubilacion-autonomo" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Jubilación autónomo" }]} />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Jubilación autónomo</h1>
        <p className="mt-3 text-gray-600 max-w-3xl">
          Estima la pensión que cobrarás al jubilarte como autónomo. Depende de tu
          base de cotización media y los años cotizados.
        </p>
      </header>

      <JubilacionCalc />

      <AdSlot format="leaderboard" className="my-10" />

      <FAQ
        items={[
          { q: "¿A qué edad me jubilo si soy autónomo?", a: "Mismas reglas que el régimen general: 67 años en 2027 si tienes menos de 38,5 años cotizados, 65 si tienes 38,5 o más. Puedes jubilarte anticipadamente a los 63-65 con coeficientes reductores." },
          { q: "¿Cuántos años necesito cotizar para tener pensión?", a: "Mínimo 15 años cotizados, de los cuales 2 dentro de los 15 años anteriores a la jubilación. Con 15 años cobras el 50% de la base reguladora. Para el 100% necesitas 36 años y 6 meses en 2027." },
          { q: "¿Cómo se calcula la base reguladora?", a: "En 2027 se toma la media de las bases de cotización de los últimos 25 años cotizados. Por eso muchos autónomos suben su base en los últimos 25 años antes de jubilarse, no solo el último." },
          { q: "¿Si he cotizado por la mínima toda mi vida?", a: "Tendrás pensión mínima. En 2025 la pensión mínima de jubilación con cónyuge a cargo es ~966 €/mes (14 pagas). Sin cónyuge: ~783 €/mes. Es ridícula comparada con la del régimen general." },
          { q: "¿Puedo seguir trabajando cobrando pensión?", a: "Sí: la jubilación activa permite compatibilizar pensión y actividad si has llegado a la edad legal con el 100% de la base. Cobras el 50% de la pensión (100% si tienes contratado al menos un trabajador)." },
        ]}
      />
    </div>
  );
}
