import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LastUpdated } from "@/components/LastUpdated";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

export const metadata: Metadata = {
  title: "Glosario fiscal autónomo 2026 · 30+ términos explicados",
  description: "Diccionario fiscal del autónomo: RETA, IRPF, IVA, MEI, modelo 303, base de cotización, tarifa plana, finiquito, recargos, IS, SL y más, explicados en lenguaje claro.",
  alternates: { canonical: "/glosario" },
  openGraph: {
    title: "Glosario fiscal autónomo 2026",
    description: "30+ términos del IRPF, IVA y Seguridad Social explicados.",
  },
};

interface Term {
  term: string;
  short: string;
  long: string;
  related?: { href: string; label: string }[];
}

const TERMS: Term[] = [
  {
    term: "Autónomo (RETA)",
    short: "Régimen Especial de Trabajadores Autónomos. El régimen de la Seguridad Social donde cotizan los trabajadores por cuenta propia.",
    long: "Sistema independiente del Régimen General. Cubre prestaciones sanitarias, jubilación, baja médica y cese de actividad. La cuota se calcula por tramos según rendimiento neto desde 2023 (sistema de ingresos reales, RD-ley 13/2022).",
    related: [{ href: "/cuota-autonomo", label: "Calcular cuota" }],
  },
  {
    term: "Autónomo societario",
    short: "Administrador de una sociedad mercantil que cotiza en el RETA con base mínima especial.",
    long: "Persona que ejerce funciones de dirección en una SL o SA con al menos el 25% del capital, o con vínculo familiar a socios mayoritarios. En 2026 su base mínima sube a 1.424,40 €/mes (+42,4%).",
    related: [{ href: "/cuota-autonomo-societario", label: "Más info" }],
  },
  {
    term: "Base imponible",
    short: "Cifra sobre la que se calcula un impuesto. En IRPF, ingresos menos gastos deducibles menos reducciones.",
    long: "En IRPF del autónomo: ingresos - gastos deducibles - cuota de autónomo - reducción 5% gastos difícil justificación (estimación directa simplificada).",
  },
  {
    term: "Base de cotización",
    short: "Importe sobre el que cotizas a la Seguridad Social. En el RETA puedes elegir entre la mínima y la máxima de tu tramo.",
    long: "Determina el importe de tu cuota mensual y de tus prestaciones futuras (jubilación, baja, paro). Cotizar por la mínima ahorra cuota pero reduce pensión. Por la máxima paga mucho más pero aumenta prestaciones.",
  },
  {
    term: "Cuota mensual",
    short: "Lo que pagas cada mes a la Seguridad Social como autónomo.",
    long: "Calculada como base de cotización × tipo (~31,67% en 2026 + MEI 0,9%). Por defecto se aplica la cuota mínima del tramo que te corresponde según rendimiento neto.",
    related: [{ href: "/cuota-autonomo", label: "Calcular" }],
  },
  {
    term: "Estimación directa simplificada",
    short: "Régimen IRPF para autónomos con cifra de negocio < 600.000 €/año. La mayoría.",
    long: "Tributas por ingresos reales - gastos deducibles. Incluye reducción del 5% por gastos de difícil justificación (tope 2.000 €). Alternativa: estimación directa normal o módulos.",
  },
  {
    term: "Finiquito",
    short: "Liquidación final que paga el empleador al trabajador al terminar la relación laboral.",
    long: "Incluye vacaciones no disfrutadas + paga extra prorrateada + salario pendiente. Es independiente de la indemnización por despido. Sí tributa por IRPF (la indemnización por despido improcedente está exenta hasta 180.000 €).",
    related: [{ href: "/calculadora-despido", label: "Calcular" }],
  },
  {
    term: "Gastos deducibles",
    short: "Gastos que puedes restar de tus ingresos para reducir base imponible IRPF.",
    long: "Material, suministros, gestoría, formación profesional, dietas dentro de límites, vehículo (solo si afectado 100% a actividad), seguros, alquiler oficina, etc. Deben estar relacionados con la actividad y justificados con factura.",
    related: [{ href: "/guias/gastos-deducibles", label: "Lista completa" }],
  },
  {
    term: "Impuesto sobre Sociedades (IS)",
    short: "Impuesto del 25% (15% nuevas empresas primer y segundo año) sobre el beneficio de sociedades mercantiles.",
    long: "Lo paga la SL, no el socio. Es el equivalente al IRPF para personas físicas. Si la sociedad reparte dividendos, el socio paga IRPF del ahorro adicional.",
  },
  {
    term: "IRPF estatal + autonómico",
    short: "Impuesto sobre la Renta. Tiene escala estatal común + escala autonómica que varía por CCAA.",
    long: "Se aplica el 50% estatal + 50% autonómico sobre tu base imponible. Madrid es la CCAA con menor presión fiscal autonómica; Cataluña, Asturias y Valencia las que más cobran.",
    related: [{ href: "/calculadora-irpf", label: "Calcular" }],
  },
  {
    term: "IVA (modelo 303)",
    short: "Impuesto sobre el Valor Añadido. Se declara trimestralmente con el modelo 303.",
    long: "Tipos: 21% general, 10% reducido, 4% superreducido. El autónomo es 'colector' del IVA: cobra a sus clientes y resta el que ha pagado en compras. La diferencia se ingresa a Hacienda cada trimestre.",
    related: [{ href: "/calculadora-iva", label: "Calcular" }],
  },
  {
    term: "MEI (Mecanismo Equidad Intergeneracional)",
    short: "Cotización adicional para reforzar el Fondo de Reserva. En 2026 es del 0,9% sobre la base.",
    long: "Aplicable a todos los cotizantes (autónomos y por cuenta ajena). Sube progresivamente cada año hasta el 1,2% en 2029. Lo pagan íntegramente los autónomos.",
    related: [{ href: "/blog/mei-2026-cotizacion-extra", label: "Análisis" }],
  },
  {
    term: "Modelo 036 / 037",
    short: "Declaración censal. El 036 es completo (sociedades, autónomos complejos); el 037 es simplificado (autónomo persona física básico).",
    long: "Se presenta al darse de alta como autónomo, modificar datos o darse de baja. Incluye epígrafe IAE, domicilio fiscal, régimen IVA, etc.",
  },
  {
    term: "Modelo 130 (pago fraccionado IRPF)",
    short: "Pago trimestral a cuenta del IRPF anual. 20% sobre rendimiento neto - retenciones.",
    long: "Solo aplica si menos del 70% de tus ingresos llevan retención IRPF. Plazos: 1-20 abril/julio/octubre/enero. Es un pago a cuenta: se regulariza en la declaración de la Renta anual.",
    related: [{ href: "/calculadora-irpf", label: "Calcular" }],
  },
  {
    term: "Modelo 347",
    short: "Declaración informativa anual de operaciones con terceros por importe superior a 3.005,06 €.",
    long: "Se presenta en febrero del año siguiente. Hacienda cruza los datos para detectar discrepancias entre lo declarado por emisor y receptor de facturas.",
  },
  {
    term: "Pluriactividad",
    short: "Cotizar simultáneamente en dos regímenes (autónomo + cuenta ajena).",
    long: "Tienes derecho a bonificación del 50% en cuota RETA primeros 18 meses + 75% siguientes 18, o a devolución del exceso si superas el límite máximo anual combinado.",
    related: [{ href: "/pluriactividad", label: "Más info" }],
  },
  {
    term: "Recargo de equivalencia",
    short: "Régimen especial de IVA aplicable al comercio minorista persona física.",
    long: "Pagas un % adicional al IVA general (5,2% / 1,4% / 0,5% según tipo) a tus proveedores y a cambio no presentas modelo 303. Obligatorio para minoristas que vendan a particulares.",
  },
  {
    term: "Rendimiento neto",
    short: "Ingresos brutos menos gastos deducibles. La base para calcular tu cuota e IRPF.",
    long: "En estimación directa simplificada: ingresos - gastos - 5% gastos difícil justificación. Es la cifra que determina tu tramo de cuota mensual del RETA (RD-ley 13/2022).",
  },
  {
    term: "Retención IRPF en facturas",
    short: "Porcentaje que retiene un cliente en tu factura y entrega a Hacienda como anticipo de tu IRPF.",
    long: "15% por defecto profesionales sección 2ª IAE, 7% nuevos autónomos (3 primeros años), 19% alquileres, 2% agrícolas, 0% facturando a particulares o intracomunitario.",
    related: [{ href: "/retencion-irpf-facturas", label: "Calcular" }],
  },
  {
    term: "Retención por baja médica",
    short: "Prestación económica durante la baja por enfermedad común o accidente.",
    long: "Enfermedad común: 0% días 1-3, 60% días 4-20, 75% día 21+. Accidente laboral: 75% desde día 1. La paga la mutua (no SS directamente), siempre que tengas contratada la cobertura por cese de actividad.",
    related: [{ href: "/baja-medica", label: "Calcular" }],
  },
  {
    term: "Sistema de cotización por ingresos reales",
    short: "Sistema vigente desde 2023 que ajusta la cuota a tu rendimiento neto.",
    long: "Establecido por RD-ley 13/2022. 15 tramos según ingresos. Antes podías elegir libremente tu base; ahora Hacienda y SS cruzan datos y regularizan tras la Renta.",
  },
  {
    term: "Sociedad Limitada (SL)",
    short: "Forma jurídica de empresa con responsabilidad limitada al capital aportado (mínimo 3.000 €).",
    long: "Paga Impuesto sobre Sociedades (25%) sobre beneficios. El administrador-socio cotiza autónomo societario. Conviene a partir de cierto nivel de beneficio sostenido si se capitalizan reservas.",
    related: [{ href: "/sl-vs-autonomo", label: "Comparativa" }],
  },
  {
    term: "Tarifa plana",
    short: "Cuota reducida de 88,64 €/mes durante el primer año como nuevo autónomo.",
    long: "Disponible para quienes se den de alta por primera vez o no hayan cotizado en los 2 años anteriores. Prorrogable 12 meses adicionales si rendimiento neto anual < SMI.",
    related: [{ href: "/guias/tarifa-plana", label: "Guía" }],
  },
  {
    term: "TGSS",
    short: "Tesorería General de la Seguridad Social. Organismo que gestiona las cotizaciones.",
    long: "Inscribe en regímenes, recauda cuotas, gestiona prestaciones, regulariza la cuota anual de autónomos tras la Renta.",
  },
  {
    term: "Tipo efectivo",
    short: "Porcentaje real que pagas de IRPF sobre tu base imponible, ya promediados los tramos.",
    long: "Diferente del tipo marginal (el del último tramo). Por ejemplo, con 30.000 € base, tu tipo efectivo en Madrid es ~17%, no el 18,5% del tramo marginal.",
  },
  {
    term: "TPC (Tipo de Cotización)",
    short: "Porcentaje aplicado a la base de cotización para calcular la cuota mensual.",
    long: "En 2026: ~28,30% contingencias comunes + 1,3% profesionales + 0,9% MEI + 0,7% formación + cese actividad (~0,8%) = ~31,67% total aplicado sobre la base.",
  },
  {
    term: "Verifactu (Sistema VeriFactu)",
    short: "Software de facturación certificado obligatorio (autónomos desde julio 2027).",
    long: "Facturas con firma digital, QR, encadenamiento criptográfico y envío opcional a AEAT en tiempo real. Sanciones por software no certificado hasta 50.000 €/año.",
    related: [{ href: "/verifactu", label: "Más info" }],
  },
];

const definedTermSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Glosario fiscal autónomo",
  inDefinedTermSet: `${SITE_URL}/glosario`,
  hasDefinedTerm: TERMS.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.short,
    inDefinedTermSet: `${SITE_URL}/glosario`,
  })),
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <Breadcrumbs items={[{ label: "Glosario" }]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Glosario fiscal del autónomo
        </h1>
        <p className="mt-3 text-neutral-600 max-w-3xl">
          {TERMS.length} términos del IRPF, IVA, Seguridad Social y normativa fiscal,
          explicados en lenguaje claro y con enlaces a calculadoras y guías.
        </p>
        <LastUpdated date="2026-05-20" className="mt-3" />
      </header>

      <div className="space-y-6">
        {TERMS.map((t) => (
          <article
            key={t.term}
            id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            className="rounded-xl border border-neutral-200 bg-white p-5"
          >
            <h2 className="font-bold text-lg text-neutral-900">{t.term}</h2>
            <p className="mt-1 text-[15px] text-neutral-700">{t.short}</p>
            <p className="mt-2 text-[13px] text-neutral-600 leading-relaxed">{t.long}</p>
            {t.related && t.related.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {t.related.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="inline-flex items-center gap-1 text-xs text-[#B91C1C] hover:underline"
                  >
                    → {r.label}
                  </Link>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      <section className="mt-12 rounded-lg border border-neutral-200 bg-white p-5">
        <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-3">¿Falta algún término?</p>
        <p className="text-sm text-neutral-700">
          Escríbenos a{" "}
          <a href="mailto:hola@cuotia.es" className="text-[#B91C1C] underline">hola@cuotia.es</a>{" "}
          con la palabra y lo añadimos a la siguiente actualización.
        </p>
      </section>
    </div>
  );
}
