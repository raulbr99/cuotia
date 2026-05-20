import Link from "next/link";
import { Calculator, Receipt, Wallet, Calendar, ArrowRight, Briefcase, HeartPulse, Coins, Car, BookOpen, Percent, FileText } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { Newsletter } from "@/components/Newsletter";

const CALCS = [
  {
    code: "SIF-0001",
    href: "/cuota-autonomo",
    icon: Calculator,
    title: "Cuota autónomo",
    description: "Tu cuota mensual por los 15 tramos vigentes 2025. Tarifa plana incluida.",
  },
  {
    code: "SIF-0002",
    href: "/calculadora-irpf",
    icon: Receipt,
    title: "IRPF + modelo 130",
    description: "IRPF anual con tramos estatales y pago fraccionado trimestral.",
  },
  {
    code: "SIF-0003",
    href: "/calculadora-iva",
    icon: Percent,
    title: "IVA + modelo 303",
    description: "Añade, quita IVA o calcula el modelo 303 trimestral.",
  },
  {
    code: "SIF-0004",
    href: "/neto-bruto",
    icon: Wallet,
    title: "Neto / Bruto",
    description: "Cuánto te queda después de gastos, cuota e IRPF.",
  },
  {
    code: "SIF-0005",
    href: "/calculadora-despido",
    icon: Briefcase,
    title: "Despido + finiquito",
    description: "Indemnización improcedente, objetivo, colectivo + finiquito.",
  },
  {
    code: "SIF-0006",
    href: "/baja-medica",
    icon: HeartPulse,
    title: "Baja médica",
    description: "Prestación por enfermedad común o accidente laboral.",
  },
  {
    code: "SIF-0007",
    href: "/jubilacion-autonomo",
    icon: Coins,
    title: "Jubilación",
    description: "Pensión según base media y años cotizados.",
  },
  {
    code: "SIF-0008",
    href: "/dietas-kilometraje",
    icon: Car,
    title: "Dietas + km",
    description: "Dietas exentas y deducción de km vigentes 2025.",
  },
  {
    code: "SIF-0009",
    href: "/generador-facturas",
    icon: FileText,
    title: "Generador facturas",
    description: "Crea facturas en PDF con todos los campos legales en 1 minuto.",
  },
];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Cuotia",
  url: SITE_URL,
  description: "Calculadoras fiscales gratuitas para autónomos en España",
  inLanguage: "es-ES",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cuotia",
  url: SITE_URL,
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      <section className="mb-20">
        <p className="tech-label mb-6">CATALOG // ALL_PRODUCTS · v2026</p>
        <h1 className="font-display text-5xl leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
          CALCULADORAS<br />
          <span className="text-[#D1FF26]">FISCALES</span><br />
          PARA AUTÓNOMOS.
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-[#A0A0A0]">
          Cuota, IRPF, IVA, despido, jubilación y más. Sin registros, sin emails.
          Datos actualizados a tramos vigentes 2025.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/cuota-autonomo"
            className="inline-flex items-center gap-2 bg-[#D1FF26] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-[#0A0A0A] transition-opacity hover:opacity-90"
          >
            Calcular cuota
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/guias"
            className="inline-flex items-center gap-2 border border-[#252525] px-8 py-4 text-[13px] font-medium uppercase tracking-[0.1em] text-[#A0A0A0] transition-colors hover:border-[#D1FF26] hover:text-white"
          >
            Ver guías
          </Link>
        </div>
      </section>

      <AdSlot format="leaderboard" className="mb-16" />

      <section className="mb-20">
        <div className="mb-8 flex items-end justify-between border-b border-[#1A1A1A] pb-4">
          <div>
            <p className="tech-label mb-2">SECTION // CALCULATORS</p>
            <h2 className="font-display text-3xl tracking-tight text-white">Todas las herramientas</h2>
          </div>
          <p className="tech-label hidden sm:block">{CALCS.length} ITEMS</p>
        </div>
        <div className="grid grid-cols-1 gap-px bg-[#1A1A1A] sm:grid-cols-2 lg:grid-cols-3">
          {CALCS.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.href}
                href={c.href}
                className="scanline group relative bg-[#0F0F0F] p-6 transition-colors hover:bg-[#0A0A0A]"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[9px] tracking-[0.15em] text-[#505050]">{c.code}</span>
                  <ArrowRight className="h-4 w-4 text-[#404040] transition-all group-hover:translate-x-1 group-hover:text-[#D1FF26]" />
                </div>
                <Icon className="mt-6 h-6 w-6 text-[#D1FF26]" strokeWidth={1.5} />
                <h3 className="mt-6 font-display text-xl uppercase tracking-tight text-white">
                  {c.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#A0A0A0]">{c.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mb-20 grid gap-px bg-[#1A1A1A] md:grid-cols-2">
        <Link
          href="/calendario-fiscal"
          className="scanline group bg-[#0F0F0F] p-8 transition-colors hover:bg-[#0A0A0A]"
        >
          <Calendar className="h-7 w-7 text-[#D1FF26]" strokeWidth={1.5} />
          <h3 className="mt-6 font-display text-2xl uppercase tracking-tight text-white">
            Calendario fiscal
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-[#A0A0A0]">
            Todas las fechas clave del año: modelos 303, 130, 390, 100, 111, 115, 347.
            No te pases ninguna.
          </p>
          <span className="tech-label mt-6 inline-block text-[#D1FF26]">VIEW_CALENDAR →</span>
        </Link>
        <Link
          href="/guias"
          className="scanline group bg-[#0F0F0F] p-8 transition-colors hover:bg-[#0A0A0A]"
        >
          <BookOpen className="h-7 w-7 text-[#D1FF26]" strokeWidth={1.5} />
          <h3 className="mt-6 font-display text-2xl uppercase tracking-tight text-white">
            Guías
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-[#A0A0A0]">
            Cómo darse de alta, gastos deducibles, tarifa plana. Sin jerga, paso a paso.
          </p>
          <span className="tech-label mt-6 inline-block text-[#D1FF26]">VIEW_GUIDES →</span>
        </Link>
      </section>

      <AdSlot format="rectangle" className="mb-20" />

      <section className="mb-20">
        <Newsletter source="homepage" />
      </section>

      <section className="border border-[#1A1A1A] bg-[#0F0F0F] p-8">
        <p className="tech-label mb-3">DISCLAIMER // ORIENTATIVO</p>
        <p className="text-[13px] leading-relaxed text-[#606060]">
          Los cálculos son orientativos. Se basan en los tramos generales 2025 (RD-ley
          13/2022) y la escala estatal del IRPF. No incluyen escalas autonómicas,
          deducciones personales ni circunstancias particulares. Para presentar tus
          modelos, consulta a un gestor.
        </p>
      </section>
    </div>
  );
}
