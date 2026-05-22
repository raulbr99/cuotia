import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LastUpdated } from "@/components/LastUpdated";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

export const metadata: Metadata = {
  title: "Preguntas frecuentes del autónomo en España 2026 (FAQ completa)",
  description:
    "45+ preguntas y respuestas sobre cuota, IRPF, IVA, tarifa plana, MEI, Verifactu, baja médica, jubilación, despido y más. Datos oficiales 2026 RD-ley 3/2026.",
  alternates: { canonical: "/preguntas-frecuentes-autonomos" },
  openGraph: {
    title: "FAQ Autónomo 2026 · 45+ respuestas",
    description: "Todo lo que un autónomo necesita saber: cuota, IRPF, IVA, MEI, Verifactu, baja, jubilación.",
  },
};

interface QAGroup {
  category: string;
  description: string;
  items: { q: string; a: string }[];
}

const GROUPS: QAGroup[] = [
  {
    category: "Cuota de autónomo (RETA)",
    description: "Cuánto pagas a la Seguridad Social cada mes según tus ingresos.",
    items: [
      {
        q: "¿Cuánto paga un autónomo al mes en 2026?",
        a: "Entre 200 € y 590 € de cuota mínima al mes según rendimiento neto. El sistema vigente desde 2023 (RD-ley 3/2026 mantiene los tramos de 2025) tiene 15 tramos: tramo 1 (≤670 €/mes ingresos) paga 200 €, tramo 15 (>6.000 €/mes) paga 590 € mínimo. Puedes elegir cotizar por más para mejor pensión, hasta la máxima del tramo.",
      },
      {
        q: "¿Qué es la tarifa plana del autónomo 2026?",
        a: "88,64 €/mes durante los primeros 12 meses para nuevos autónomos (alta inicial o sin cotizar 2 años). Es 80 € de base + 0,9% MEI. Prorrogable 12 meses más si tu rendimiento neto anual queda por debajo del SMI (~16.576 €/año estimado 2026).",
      },
      {
        q: "¿Qué es el MEI y por qué lo pago?",
        a: "El Mecanismo de Equidad Intergeneracional es una cotización adicional (0,9% en 2026) sobre tu base de cotización para reforzar el Fondo de Reserva de la Seguridad Social. Sube cada año hasta el 1,2% en 2029. Lo pagan tanto autónomos como empleados.",
      },
      {
        q: "¿Cuánto paga un autónomo societario en 2026?",
        a: "Su base mínima sube a 1.424,40 €/mes en 2026 (+42,4% respecto a 2025). La cuota mínima es ~451 €/mes. Aplica a administradores de SL con ≥25% del capital o vínculo familiar con socios mayoritarios, y a colaboradores familiares.",
      },
      {
        q: "¿Cuándo regulariza la TGSS mi cuota?",
        a: "Tras la declaración de la Renta. La TGSS compara tus ingresos reales declarados con el tramo por el que cotizaste. Si cotizaste por menos, pagas la diferencia. Si cotizaste por más, te devuelven.",
      },
      {
        q: "¿Puedo cambiar de tramo?",
        a: "Sí, hasta 6 veces al año (cada 2 meses) desde la sede electrónica de la TGSS. Útil si prevés un cambio significativo en ingresos.",
      },
    ],
  },
  {
    category: "IRPF y modelo 130",
    description: "Impuesto sobre la Renta: anual y pago fraccionado trimestral.",
    items: [
      {
        q: "¿Cuánto paga de IRPF un autónomo con 30.000 €?",
        a: "Aproximadamente 5.200-5.900 €/año según CCAA. En Madrid (la más baja) tipo efectivo ~17,3%; en Cataluña/Valencia ~19,5%. El IRPF combina escala estatal + autonómica.",
      },
      {
        q: "¿Tengo que presentar el modelo 130?",
        a: "Solo si menos del 70% de tus ingresos llevan retención IRPF. Si facturas siempre a empresas (que retienen 15%), normalmente no estás obligado. Si vendes a particulares, sí.",
      },
      {
        q: "¿Cuánto es el modelo 130?",
        a: "El 20% sobre tu rendimiento neto trimestral (ingresos - gastos), menos las retenciones soportadas en facturas. Plazos: 1-20 abril/julio/octubre/enero.",
      },
      {
        q: "¿Cuándo es la campaña de la Renta?",
        a: "Del 2 de abril al 30 de junio (online y telefónica desde 6 mayo, presencial desde 2 junio). El modelo 100 es obligatorio para todo autónomo, independientemente de ingresos.",
      },
      {
        q: "¿Qué CCAA tiene el IRPF más bajo?",
        a: "Madrid tiene la escala autonómica más baja. En el tramo alto cobra 20,5% vs Cataluña 25,5% o Valencia 29,5%. La diferencia puede llegar a 2.000-3.000 €/año para ingresos altos.",
      },
      {
        q: "¿Las retenciones de mis facturas son lo que pago de IRPF?",
        a: "No, son un anticipo. Al hacer la Renta se calcula tu IRPF total. Si las retenciones fueron menores, pagas diferencia. Si fueron mayores, te devuelven.",
      },
    ],
  },
  {
    category: "IVA y modelo 303",
    description: "Cómo se gestiona el IVA trimestral y los tipos vigentes.",
    items: [
      {
        q: "¿Qué tipos de IVA aplico?",
        a: "21% general (mayoría de servicios y productos), 10% reducido (alimentos no básicos, transporte, hostelería), 4% superreducido (pan, leche, libros, medicamentos). Algunos servicios están exentos (sanidad, educación, alquiler vivienda).",
      },
      {
        q: "¿Cuándo presento el modelo 303?",
        a: "Cada trimestre: 1-20 abril/julio/octubre/enero. En enero también el modelo 390 (resumen anual). Domiciliación: hasta el 15.",
      },
      {
        q: "¿Cuándo facturo sin IVA?",
        a: "A clientes UE con NIF intracomunitario (operación intracomunitaria), exportaciones fuera UE, servicios exentos legalmente (sanidad, educación, formación), o si estás en recargo de equivalencia (minorista persona física).",
      },
      {
        q: "¿Es obligatorio el SII de IVA?",
        a: "El Suministro Inmediato de Información (SII) es obligatorio solo para grandes empresas (>6 M€ facturación), exportadores y otros. La mayoría de autónomos no lo necesita.",
      },
    ],
  },
  {
    category: "Verifactu y facturación",
    description: "El nuevo sistema de software de facturación obligatorio.",
    items: [
      {
        q: "¿Cuándo es obligatorio Verifactu?",
        a: "Sociedades mercantiles desde el 1 enero 2026. Autónomos persona física: desde el 1 julio 2027 (aplazado desde julio 2026). Hasta entonces, puedes facturar con cualquier software o incluso Word/Excel.",
      },
      {
        q: "¿Qué software cumple Verifactu?",
        a: "Software certificado que firma cada factura digitalmente, incluye código QR, encadena criptográficamente registros y permite envío automático a AEAT. La AEAT publicará una lista oficial.",
      },
      {
        q: "¿Qué sanciones tiene usar software no certificado?",
        a: "Hasta 50.000 €/año por uso de software no homologado o que permita alterar registros (Ley Antifraude 11/2021, art. 201 bis).",
      },
      {
        q: "¿Y la factura electrónica B2B?",
        a: "Es un sistema diferente (Ley Crea y Crece). Aún no es obligatorio para autónomos: tiene su propio calendario pendiente de desarrollo reglamentario.",
      },
      {
        q: "¿Qué datos obligatorios lleva una factura?",
        a: "Número correlativo, fecha emisión, datos completos emisor y receptor (incluido NIF), descripción del servicio, base imponible, tipo y cuota IVA, retención IRPF si aplica, importe total.",
      },
    ],
  },
  {
    category: "Tarifa plana y nuevos autónomos",
    description: "Ventajas para quien se da de alta por primera vez.",
    items: [
      {
        q: "¿Quién tiene derecho a tarifa plana?",
        a: "Autónomos persona física que se den de alta por primera vez o no hayan cotizado en RETA los 2 años anteriores. Hasta 36 meses con bonificación (12 base + 12 prórroga + 12 adicional si discapacidad).",
      },
      {
        q: "¿Cómo prorrogo la tarifa plana?",
        a: "Automático si tu rendimiento neto anual del primer año queda por debajo del SMI (~16.576 €/año estimado 2026). La TGSS lo verifica tras tu Renta y aplica los 12 meses adicionales.",
      },
      {
        q: "¿Pierdo la tarifa plana si supero el SMI?",
        a: "Tras los 12 meses iniciales pierdes la prórroga (pasas a cuota normal de tu tramo). Los 12 primeros meses son fijos siempre que cumplas requisitos iniciales.",
      },
    ],
  },
  {
    category: "Pluriactividad y societario",
    description: "Cotizar como autónomo y empleado, o como administrador SL.",
    items: [
      {
        q: "¿Qué bonificación tengo en pluriactividad?",
        a: "Si cotizas como autónomo + cuenta ajena, puedes elegir: (1) bonificación 50% en RETA primeros 18 meses + 75% siguientes 18 (máx 36), o (2) devolución del 50% del exceso de cotización si superas el límite anual combinado. Incompatible con tarifa plana.",
      },
      {
        q: "¿Quién es autónomo societario?",
        a: "Administrador de SL/SA con ≥25% del capital y funciones de dirección, o con vínculo familiar a socios mayoritarios. También colaboradores familiares (cónyuge, descendientes).",
      },
      {
        q: "¿Conviene crear SL vs ser autónomo?",
        a: "Como regla, a partir de ~70.000 €/año de beneficio sostenido si puedes capitalizar reservas. Por debajo de 40.000 €, autónomo persona física suele compensar (costes de gestoría SL ~200 €/mes + autónomo societario 451 €/mes).",
      },
    ],
  },
  {
    category: "Baja médica, jubilación, despido",
    description: "Prestaciones de la Seguridad Social.",
    items: [
      {
        q: "¿Cuánto cobro de baja médica?",
        a: "Enfermedad común: 0% días 1-3, 60% días 4-20, 75% día 21+. Accidente laboral o profesional: 75% desde día 1. Lo paga la mutua (no la SS), siempre que tengas contratada la cobertura por cese de actividad (obligatoria desde 2019).",
      },
      {
        q: "¿Cuánto cobraré de jubilación como autónomo?",
        a: "Depende de tu base media de cotización (25 últimos años en 2027) y años cotizados. Mínimo 15 años para tener derecho. 36 años 6 meses para cobrar el 100%. Los autónomos que cotizan por la mínima toda la vida tienen pensiones bajas.",
      },
      {
        q: "¿Cuál es la indemnización por despido improcedente?",
        a: "33 días de salario por año trabajado, tope 24 mensualidades. Está exenta de IRPF hasta 180.000 €. El finiquito (vacaciones, paga extra, salario pendiente) sí tributa.",
      },
      {
        q: "¿Tiene derecho a paro un autónomo?",
        a: "Si tienes contratada la prestación por cese de actividad (CATA) en tu RETA, sí. Importe similar al paro general, según base de cotización y meses cotizados. Mínimo 12 meses de cotización por cese para acceder.",
      },
    ],
  },
  {
    category: "Gastos deducibles y dietas",
    description: "Qué puedes descontar en IRPF y dietas exentas.",
    items: [
      {
        q: "¿Qué gastos puedo deducir como autónomo?",
        a: "Suministros (si tienes % de vivienda afectado al alta), material, oficina, gestoría, formación profesional, dietas y kilometraje (límites legales), seguros profesionales, cuotas colegios profesionales, cuota autónomo. Necesitas factura y relación con la actividad.",
      },
      {
        q: "¿Cuánto puedo deducir por kilometraje?",
        a: "0,26 €/km. Requiere justificante del desplazamiento (destino, motivo profesional, fecha). En estimación directa simplificada.",
      },
      {
        q: "¿Cuánto puedo deducir por dietas?",
        a: "Límites diarios exentos: España sin pernocta 26,67 €, con pernocta 53,34 €. Extranjero sin pernocta 48,08 €, con pernocta 91,35 €. Lo que excede tributa.",
      },
      {
        q: "¿Es deducible mi vivienda si trabajo desde casa?",
        a: "Sí, parcialmente. Necesitas haberlo declarado en el alta (modelo 036/037) con el % de superficie afectada. Deducible: 30% del % afectado de suministros (luz, agua, internet, gas).",
      },
    ],
  },
  {
    category: "Modelos y calendario fiscal",
    description: "Plazos clave del año fiscal.",
    items: [
      {
        q: "¿Cuándo se presentan los modelos trimestrales?",
        a: "Modelos 303 (IVA), 130 (IRPF), 111 (retenciones), 115 (alquileres): del 1 al 20 del mes siguiente al cierre del trimestre (abril/julio/octubre/enero). El T4 tiene plazo hasta el 30 de enero por incluir resúmenes anuales (390, 190, 180).",
      },
      {
        q: "¿Qué es el modelo 347?",
        a: "Declaración informativa anual de operaciones con un mismo tercero >3.005,06 € (IVA incluido). Plazo: 1-28 febrero del año siguiente al ejercicio. No genera pago.",
      },
      {
        q: "¿Cuándo presento el modelo 100 de Renta?",
        a: "Del 2 de abril al 30 de junio (online y cita previa telefónica). Como autónomo persona física estás siempre obligado, independientemente de ingresos.",
      },
    ],
  },
];

export default function Page() {
  const allFaqs = GROUPS.flatMap((g) => g.items);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Preguntas frecuentes del autónomo 2026: 45+ respuestas",
    datePublished: "2026-05-22",
    dateModified: "2026-05-22",
    author: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Cuotia", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/preguntas-frecuentes-autonomos` },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Breadcrumbs items={[{ label: "Preguntas frecuentes" }]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Preguntas frecuentes del autónomo en España (2026)
        </h1>
        <p className="mt-3 text-neutral-600 max-w-3xl">
          {allFaqs.length} respuestas claras a las dudas más comunes: cuota RETA, IRPF, IVA, tarifa plana,
          MEI, Verifactu, baja médica, jubilación, despido, modelos trimestrales.
        </p>
        <LastUpdated date="2026-05-22" source="Fuente: BOE, AEAT, Seguridad Social" className="mt-3" />
      </header>

      <nav className="mb-10 rounded-xl border border-neutral-200 bg-white p-5">
        <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-3">
          Navegación rápida
        </p>
        <div className="grid sm:grid-cols-2 gap-2">
          {GROUPS.map((g) => (
            <a
              key={g.category}
              href={`#${slug(g.category)}`}
              className="text-sm text-[#B91C1C] hover:underline"
            >
              → {g.category}
            </a>
          ))}
        </div>
      </nav>

      {GROUPS.map((group) => (
        <section key={group.category} id={slug(group.category)} className="mb-12 scroll-mt-20">
          <h2 className="font-serif text-2xl text-neutral-900 mb-2">{group.category}</h2>
          <p className="text-sm text-neutral-600 mb-5">{group.description}</p>
          <div className="space-y-3">
            {group.items.map((qa) => (
              <details
                key={qa.q}
                className="group rounded-xl border border-neutral-200 bg-white p-4 open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-neutral-900">
                  <span>{qa.q}</span>
                  <span className="text-xl text-[#B91C1C] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700">{qa.a}</p>
              </details>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-12 rounded-xl border border-neutral-200 bg-white p-6">
        <p className="text-[11px] uppercase tracking-wider text-[#B91C1C] font-semibold mb-3">
          ¿No encuentras tu pregunta?
        </p>
        <p className="text-sm text-neutral-700 leading-relaxed">
          Escríbenos a{" "}
          <a href="mailto:hola@cuotia.es" className="text-[#B91C1C] underline">hola@cuotia.es</a>{" "}
          y la añadiremos a la próxima actualización. También puedes consultar el{" "}
          <Link href="/glosario" className="text-[#B91C1C] underline">glosario fiscal</Link>{" "}
          con 27 términos explicados o usar las{" "}
          <Link href="/cuota-autonomo" className="text-[#B91C1C] underline">calculadoras</Link>{" "}
          directamente.
        </p>
      </section>
    </div>
  );
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
