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
  title: "Gastos deducibles autónomo 2025 · qué puedes desgravar",
  description: "Lista completa de gastos deducibles para autónomos: oficina, vehículo, dietas, suministros, gestoría, formación. Cómo justificarlos en IRPF e IVA.",
  alternates: { canonical: "/guias/gastos-deducibles" },
};

const CATEGORIAS = [
  {
    titulo: "Suministros (parcial si trabajas en casa)",
    items: [
      "Luz, agua, gas: 30% de la parte proporcional al espacio de la vivienda dedicada a la actividad",
      "Internet y teléfono: 30% si es uso mixto, 100% si tienes línea exclusiva profesional",
      "Hay que comunicar el porcentaje a Hacienda en el alta del 036",
    ],
  },
  {
    titulo: "Oficina propia",
    items: [
      "Alquiler del local",
      "Suministros del local al 100%",
      "Mobiliario y equipamiento: por amortización (tablas oficiales)",
      "Mantenimiento y limpieza",
    ],
  },
  {
    titulo: "Vehículo",
    items: [
      "Solo si es de uso exclusivo profesional (transporte de mercancías, viajantes, taxis)",
      "Comerciales con vehículo mixto pueden deducir el 50% del IVA, IRPF requiere afectación 100%",
      "Combustible, peajes, parking, ITV, seguro, reparaciones",
      "Amortización del vehículo (16% anual lineal)",
    ],
  },
  {
    titulo: "Material y consumibles",
    items: [
      "Papel, bolígrafos, material de oficina",
      "Software, suscripciones SaaS, licencias",
      "Hosting, dominios, herramientas online",
      "Material específico de tu actividad",
    ],
  },
  {
    titulo: "Servicios profesionales",
    items: [
      "Gestoría y asesoría (la que llevas)",
      "Abogados, notarios",
      "Profesionales subcontratados (con factura)",
      "Comisiones de plataformas (Stripe, PayPal, Amazon, etc.)",
    ],
  },
  {
    titulo: "Seguros",
    items: [
      "Responsabilidad civil profesional",
      "Seguro del local",
      "Seguro de salud (con límites)",
      "NO el de hogar/vida personal",
    ],
  },
  {
    titulo: "Dietas y desplazamientos",
    items: [
      "Manutención: 26,67 €/día España, 48,08 €/día extranjero",
      "Con pernocta: 53,34 €/día España, 91,35 €/día extranjero",
      "Kilometraje: 0,26 €/km en vehículo propio",
      "Transporte público, AVE, avión 100%",
      "Hoteles 100% con factura",
    ],
  },
  {
    titulo: "Formación y desarrollo",
    items: [
      "Cursos relacionados con tu actividad",
      "Másters, certificaciones profesionales",
      "Libros y suscripciones profesionales",
      "Asistencia a congresos y eventos",
    ],
  },
  {
    titulo: "Cuota de autónomos y seguros sociales",
    items: [
      "Cuota mensual del RETA",
      "Aportaciones a planes de pensiones (hasta 1.500 €/año)",
      "Mutuas profesionales",
    ],
  },
  {
    titulo: "Otros",
    items: [
      "Cuotas a colegios profesionales",
      "Suscripciones a asociaciones empresariales",
      "Material publicitario, web, marketing",
      "Comisiones bancarias de cuentas profesionales",
    ],
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <ArticleSchema
        headline="Gastos deducibles autónomo 2025"
        description="Lista completa de gastos que puedes deducir como autónomo en IRPF e IVA, con condiciones y ejemplos."
        path="/guias/gastos-deducibles"
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <Breadcrumbs items={[{ label: "Guías", href: "/guias" }, { label: "Gastos deducibles" }]} />
      <article className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold sm:text-4xl">Gastos deducibles autónomo 2025</h1>
        <p className="text-xs text-[#606060] flex items-center gap-1.5 my-3 not-prose">
          <Calendar className="h-3 w-3" />
          Publicado <time dateTime={PUBLISHED}>20 de mayo de 2026</time>
          {PUBLISHED !== MODIFIED && <> · Actualizado <time dateTime={MODIFIED}>20 de mayo de 2026</time></>}
        </p>
        <p className="text-lg text-[#D0D0D0]">
          Lista completa de gastos que puedes deducir como autónomo en IRPF
          (rendimiento neto) y en IVA. Si está relacionado con tu actividad, justificado
          con factura y registrado en tu contabilidad, suele ser deducible.
        </p>

        <h2 className="text-2xl font-bold mt-10">Regla general</h2>
        <p>
          Para que un gasto sea deducible necesita cumplir 4 requisitos:
        </p>
        <ol>
          <li><strong>Vinculación</strong>: directamente relacionado con tu actividad</li>
          <li><strong>Factura</strong>: con todos los datos legales (NIF, fecha, concepto, IVA desglosado)</li>
          <li><strong>Registro contable</strong>: anotado en tu libro de gastos</li>
          <li><strong>Pago justificable</strong>: tarjeta, transferencia, no efectivo &gt;1000€</li>
        </ol>

        <h2 className="text-2xl font-bold mt-10">Lista por categorías</h2>

        <div className="not-prose space-y-6 my-8">
          {CATEGORIAS.map((cat) => (
            <section key={cat.titulo} className=" border border-[#1A1A1A] bg-[#0F0F0F] p-5">
              <h3 className="font-bold text-white mb-3">{cat.titulo}</h3>
              <ul className="text-sm space-y-1 text-[#D0D0D0]">
                {cat.items.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[#D1FF26]">•</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <AdSlot format="rectangle" className="my-8" />

        <h2 className="text-2xl font-bold mt-10">Reducción del 5% en estimación directa simplificada</h2>
        <p>
          Si estás en <strong>estimación directa simplificada</strong> (la mayoría
          de autónomos) puedes aplicar una reducción del <strong>5% de los
          rendimientos netos previos</strong> (máx 2.000 €/año) como "gastos de
          difícil justificación". No requiere factura: es automático.
        </p>
        <p>
          Sociedades civiles y profesionales en estimación directa normal pueden
          deducir el <strong>7%</strong>.
        </p>

        <h2 className="text-2xl font-bold mt-10">Qué NO es deducible</h2>
        <ul>
          <li>Multas y sanciones administrativas</li>
          <li>Donativos a entidades no acreditadas</li>
          <li>Gastos personales (ropa, alimentación particular)</li>
          <li>Recargos por presentación fuera de plazo</li>
          <li>El IRPF e IS pagados</li>
          <li>Gastos sin factura, solo ticket simple, &gt; 400 €</li>
        </ul>

        <div className="mt-12  bg-[#0F0F0F] border border-[#D1FF26] p-6">
          <h3 className="text-lg font-semibold m-0">Calcula tu neto con gastos deducibles</h3>
          <p className="mt-2 mb-3">
            Ahora que sabes qué deducir, calcula cuánto te queda realmente al año:
          </p>
          <Link href="/neto-bruto" className="inline-flex items-center gap-2 bg-[#D1FF26] text-[#0A0A0A] px-4 py-2  font-medium text-sm hover:opacity-90">
            Calculadora neto/bruto
          </Link>
        </div>
      </article>

      <FAQ
        items={[
          { q: "¿Tengo que enviar las facturas a Hacienda?", a: "No, pero debes conservarlas 4 años. Si te hacen una inspección, las pides. Sin factura, gasto no deducible. Usa un sistema de archivo digital (Dropbox, Google Drive)." },
          { q: "¿El IVA de las comidas es deducible?", a: "Solo si es una comida de trabajo (con cliente, viaje profesional con pernocta) y tienes factura nominal completa. Tickets de bares no sirven aunque sean para trabajo." },
          { q: "¿Puedo deducir el ordenador que compré para trabajar?", a: "Sí, pero por amortización: el ordenador se amortiza a 4 años (25% anual). Bajo 300 € puedes deducirlo de golpe el año de compra." },
          { q: "¿Y el coche?", a: "Como autónomo persona física, la afectación al 100% es muy difícil de probar salvo en actividades específicas (taxis, transportistas, comerciales en visita). Hacienda suele rechazar deducciones del coche para profesionales de oficina." },
          { q: "¿Qué pasa si me pasé deduciendo y me hacen inspección?", a: "Te recalcuan el IRPF y/o IVA, exigen el ingreso indebido más intereses de demora. Si consideran intencionalidad, multa del 50-150% adicional. Por eso conviene no apurar." },
        ]}
      />
    </div>
  );
}
