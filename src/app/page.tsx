import Link from "next/link";
import { Calculator, Receipt, Wallet, Calendar, ArrowRight, Briefcase, HeartPulse, Coins, Car, BookOpen, Percent, FileText, ShieldCheck, Zap, Lock } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { Newsletter } from "@/components/Newsletter";

const CALCS = [
  {
    href: "/cuota-autonomo",
    icon: Calculator,
    title: "Cuota autónomo",
    description: "Tu cuota mensual por los 15 tramos vigentes 2025. Tarifa plana incluida.",
  },
  {
    href: "/calculadora-irpf",
    icon: Receipt,
    title: "IRPF + modelo 130",
    description: "IRPF anual con tramos estatales y pago fraccionado trimestral.",
  },
  {
    href: "/calculadora-iva",
    icon: Percent,
    title: "IVA + modelo 303",
    description: "Añade, quita IVA o calcula el modelo 303 trimestral.",
  },
  {
    href: "/neto-bruto",
    icon: Wallet,
    title: "Neto / Bruto",
    description: "Cuánto te queda después de gastos, cuota e IRPF.",
  },
  {
    href: "/calculadora-despido",
    icon: Briefcase,
    title: "Despido + finiquito",
    description: "Indemnización improcedente, objetivo, colectivo + finiquito.",
  },
  {
    href: "/baja-medica",
    icon: HeartPulse,
    title: "Baja médica",
    description: "Prestación por enfermedad común o accidente laboral.",
  },
  {
    href: "/jubilacion-autonomo",
    icon: Coins,
    title: "Jubilación",
    description: "Pensión según base media y años cotizados.",
  },
  {
    href: "/dietas-kilometraje",
    icon: Car,
    title: "Dietas + km",
    description: "Dietas exentas y deducción de km vigentes 2025.",
  },
  {
    href: "/generador-facturas",
    icon: FileText,
    title: "Generador facturas",
    description: "Crea facturas en PDF con todos los campos legales en 1 minuto.",
  },
];

const FEATURES = [
  { icon: Zap, title: "Sin registro", description: "Calcula al instante. No pedimos email." },
  { icon: ShieldCheck, title: "Datos oficiales", description: "Tramos BOE, AEAT, Seguridad Social." },
  { icon: Lock, title: "Privacidad", description: "Todo se calcula en tu navegador." },
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
    <div className="mx-auto max-w-6xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      <section className="text-center mb-12 sm:mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
          Calculadoras fiscales <br className="hidden sm:block" />
          <span className="text-blue-600">para autónomos</span>
        </h1>
        <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Cuota, IRPF, IVA, despido, jubilación y más. Sin registros, sin emails.
          Datos actualizados a tramos vigentes 2025.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/cuota-autonomo"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Calcular mi cuota
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/guias"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Ver guías
          </Link>
        </div>
      </section>

      <section className="mb-16 grid gap-4 sm:grid-cols-3">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.title} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <Icon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <div>
                <p className="font-semibold text-slate-900 text-sm">{f.title}</p>
                <p className="text-xs text-slate-600 mt-0.5">{f.description}</p>
              </div>
            </div>
          );
        })}
      </section>

      <AdSlot format="leaderboard" className="mb-12" />

      <section className="mb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Todas las calculadoras</h2>
          <p className="mt-1 text-slate-600">Elige la que necesites, todas son gratis y sin registro.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CALCS.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.href}
                href={c.href}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900 flex items-center gap-2">
                  {c.title}
                  <ArrowRight className="h-4 w-4 text-slate-400 transition-all group-hover:text-blue-600 group-hover:translate-x-0.5" />
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mb-16 grid gap-4 md:grid-cols-2">
        <Link
          href="/calendario-fiscal"
          className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md"
        >
          <Calendar className="h-6 w-6 text-blue-600" strokeWidth={2} />
          <h3 className="mt-4 text-lg font-semibold text-slate-900">Calendario fiscal</h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Todas las fechas clave del año: modelos 303, 130, 390, 100, 111, 115, 347.
            No te pases ninguna.
          </p>
        </Link>
        <Link
          href="/guias"
          className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md"
        >
          <BookOpen className="h-6 w-6 text-blue-600" strokeWidth={2} />
          <h3 className="mt-4 text-lg font-semibold text-slate-900">Guías</h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Cómo darse de alta, gastos deducibles, tarifa plana. Sin jerga, paso a paso.
          </p>
        </Link>
      </section>

      <AdSlot format="rectangle" className="mb-16" />

      <section className="mb-16">
        <Newsletter source="homepage" />
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
        <p className="text-xs text-slate-500 max-w-3xl mx-auto leading-relaxed">
          <strong className="text-slate-700">Aviso.</strong> Los cálculos son orientativos.
          Se basan en los tramos generales 2025 (RD-ley 13/2022) y la escala estatal del
          IRPF. No incluyen escalas autonómicas, deducciones personales ni circunstancias
          particulares. Para presentar tus modelos, consulta a un gestor.
        </p>
      </section>
    </div>
  );
}
