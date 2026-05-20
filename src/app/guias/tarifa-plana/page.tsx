import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { FAQ } from "@/components/FAQ";
import { ArticleSchema } from "@/components/Schemas";
import Link from "next/link";
import { Calendar } from "lucide-react";

const PUBLISHED = "2026-05-20";
const MODIFIED = "2026-05-20";

export const metadata: Metadata = {
  title: "Tarifa plana autónomo 2025 · 87 €/mes, requisitos y prórroga",
  description: "Todo sobre la tarifa plana del autónomo en 2025: 87 €/mes durante 12 meses, prorrogable. Quién tiene derecho, cómo solicitarla y cuánto ahorras.",
  alternates: { canonical: "/guias/tarifa-plana" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <ArticleSchema
        headline="Tarifa plana del autónomo 2025"
        description="87 €/mes durante 12 meses prorrogables. Requisitos, prórroga, errores comunes y tabla de ahorros."
        path="/guias/tarifa-plana"
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <Breadcrumbs items={[{ label: "Guías", href: "/guias" }, { label: "Tarifa plana" }]} />
      <article className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold sm:text-4xl">Tarifa plana del autónomo 2025</h1>
        <p className="text-xs text-[#606060] flex items-center gap-1.5 my-3 not-prose">
          <Calendar className="h-3 w-3" />
          Publicado <time dateTime={PUBLISHED}>20 de mayo de 2026</time>
          {PUBLISHED !== MODIFIED && <> · Actualizado <time dateTime={MODIFIED}>20 de mayo de 2026</time></>}
        </p>
        <p className="text-lg text-[#D0D0D0]">
          La <strong>tarifa plana de 87 €/mes</strong> es la bonificación más
          interesante para nuevos autónomos. Pagas la cuota simbólica durante 12 meses
          (prorrogables otros 12) en lugar de los 230-590 €/mes que te tocarían según
          tu tramo.
        </p>

        <h2 className="text-2xl font-bold mt-10">Quién tiene derecho</h2>
        <p>Eres elegible si cumples una de estas condiciones:</p>
        <ul>
          <li>Es tu <strong>primer alta en RETA</strong> (nunca antes has sido autónomo)</li>
          <li>No has cotizado en RETA durante los <strong>últimos 2 años</strong></li>
          <li>Si ya disfrutaste la tarifa plana anteriormente, debes esperar <strong>3 años</strong> sin estar dado de alta para volver a tenerla</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10">Importes 2025</h2>
        <div className="not-prose  border border-[#1A1A1A] bg-[#0F0F0F] overflow-hidden my-6">
          <table className="w-full text-sm">
            <thead className="bg-[#0A0A0A] text-xs uppercase text-[#D0D0D0]">
              <tr>
                <th className="px-4 py-2 text-left">Período</th>
                <th className="px-4 py-2 text-right">Cuota mensual</th>
                <th className="px-4 py-2 text-right">Total año</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]">
              <tr>
                <td className="px-4 py-3">Meses 1-12 (todos)</td>
                <td className="px-4 py-3 text-right font-semibold">87 €</td>
                <td className="px-4 py-3 text-right">1.044 €</td>
              </tr>
              <tr className="bg-[#0F0F0F]">
                <td className="px-4 py-3">Meses 13-24 (si rendimiento &lt; SMI)</td>
                <td className="px-4 py-3 text-right font-semibold">87 €</td>
                <td className="px-4 py-3 text-right">1.044 €</td>
              </tr>
              <tr>
                <td className="px-4 py-3">A partir del mes 25</td>
                <td className="px-4 py-3 text-right text-[#606060]">Tu tramo normal</td>
                <td className="px-4 py-3 text-right text-[#606060]">—</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mt-10">Cómo solicitarla</h2>
        <p>
          Se pide en el momento del alta en RETA, marcando la casilla específica en
          el <strong>modelo TA.0521</strong>. Es automática: si cumples los requisitos
          y la marcas, te aplican los 87 €/mes desde el primer día.
        </p>

        <AdSlot format="rectangle" className="my-8" />

        <h2 className="text-2xl font-bold mt-10">Prórroga al 2º año</h2>
        <p>
          Cuando cumples los 12 meses iniciales, la TGSS valora automáticamente si
          puedes prorrogar. El criterio: tu <strong>rendimiento neto anual</strong> el
          año natural anterior debe quedar por debajo del <strong>SMI</strong>:
        </p>
        <ul>
          <li>SMI 2024: 15.876 €/año (1.134 €/mes en 14 pagas)</li>
          <li>SMI 2025: ~16.576 €/año (estimado, pendiente publicación BOE)</li>
        </ul>
        <p>
          Si tu rendimiento neto supera ese límite, automáticamente pasas a la cuota
          de tu tramo desde el mes 13.
        </p>

        <h2 className="text-2xl font-bold mt-10">Cuánto ahorras</h2>
        <p>Ejemplos comparando con la cuota normal:</p>
        <div className="not-prose  border border-[#1A1A1A] bg-[#0F0F0F] overflow-hidden my-6">
          <table className="w-full text-sm">
            <thead className="bg-[#0A0A0A] text-xs uppercase text-[#D0D0D0]">
              <tr>
                <th className="px-4 py-2 text-left">Si ganaras...</th>
                <th className="px-4 py-2 text-right">Cuota normal</th>
                <th className="px-4 py-2 text-right">Tarifa plana</th>
                <th className="px-4 py-2 text-right">Ahorro/año</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A] text-sm">
              <tr><td className="px-4 py-2">1.200 €/mes</td><td className="px-4 py-2 text-right">290 €/mes</td><td className="px-4 py-2 text-right text-[#D1FF26]">87 €/mes</td><td className="px-4 py-2 text-right font-semibold">2.436 €</td></tr>
              <tr><td className="px-4 py-2">2.000 €/mes</td><td className="px-4 py-2 text-right">370 €/mes</td><td className="px-4 py-2 text-right text-[#D1FF26]">87 €/mes</td><td className="px-4 py-2 text-right font-semibold">3.396 €</td></tr>
              <tr><td className="px-4 py-2">3.000 €/mes</td><td className="px-4 py-2 text-right">440 €/mes</td><td className="px-4 py-2 text-right text-[#D1FF26]">87 €/mes</td><td className="px-4 py-2 text-right font-semibold">4.236 €</td></tr>
              <tr><td className="px-4 py-2">5.000 €/mes</td><td className="px-4 py-2 text-right">515 €/mes</td><td className="px-4 py-2 text-right text-[#D1FF26]">87 €/mes</td><td className="px-4 py-2 text-right font-semibold">5.136 €</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mt-10">¿Qué pierdes con la tarifa plana?</h2>
        <p>Hay un trade-off importante:</p>
        <ul>
          <li><strong>Pensión menor</strong>: cotizas por la base mínima, así que tu pensión futura es más baja</li>
          <li><strong>Prestación por baja menor</strong>: te calculan sobre la base mínima</li>
          <li><strong>Cese de actividad menor</strong>: igual</li>
        </ul>
        <p>
          En general compensa: lo que ahorras en 2 años (~6.000 €) supera lo que pierdes
          de pensión a futuro. Pero si vas con caja saneada y un horizonte largo, considera
          cotizar por una base mayor.
        </p>

        <div className="mt-12  bg-[#0F0F0F] border border-[#D1FF26] p-6">
          <h3 className="text-lg font-semibold m-0">Calcula tu ahorro real</h3>
          <p className="mt-2 mb-3">
            Aplica la tarifa plana en nuestra calculadora y compara con tu tramo normal:
          </p>
          <Link href="/cuota-autonomo" className="inline-flex items-center gap-2 bg-[#D1FF26] text-[#0A0A0A] px-4 py-2  font-medium text-sm hover:opacity-90">
            Calcular cuota con tarifa plana
          </Link>
        </div>
      </article>

      <FAQ
        items={[
          { q: "¿Si genero más del SMI el primer año, pierdo la prórroga?", a: "Solo pierdes la prórroga (meses 13-24), no la tarifa plana inicial. Los primeros 12 meses son fijos sin importar lo que ingreses." },
          { q: "¿Puedo elegir cuota máxima con tarifa plana?", a: "No. La tarifa plana fija una cuota de 87 € que corresponde a la base mínima. Para cotizar más, debes renunciar a la tarifa plana y pasar a tu tramo." },
          { q: "¿Aplica si soy autónomo societario?", a: "Sí, desde 2023 los socios trabajadores también tienen derecho a tarifa plana si cumplen requisitos." },
          { q: "¿Cobro paga extra con tarifa plana?", a: "Igual que cualquier autónomo: no hay pagas extra en RETA. La cuota es mensual y constante." },
          { q: "¿La tarifa plana incluye contingencias?", a: "Sí, da derecho a las mismas prestaciones que la cuota mínima: baja médica, maternidad/paternidad, cese de actividad, jubilación." },
        ]}
      />
    </div>
  );
}
