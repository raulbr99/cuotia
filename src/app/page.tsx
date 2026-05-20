import Link from "next/link";
import { Calculator, Receipt, Wallet, Calendar, ArrowRight, Briefcase, HeartPulse, Coins, Car, BookOpen, Percent, FileText } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { Newsletter } from "@/components/Newsletter";

const CALCS = [
  {
    href: "/cuota-autonomo",
    icon: Calculator,
    title: "Cuota de autónomo",
    description: "Tu cuota mensual por los 15 tramos vigentes 2025. Tarifa plana incluida.",
    color: "emerald",
  },
  {
    href: "/calculadora-irpf",
    icon: Receipt,
    title: "IRPF y modelo 130",
    description: "IRPF anual con tramos estatales y pago fraccionado trimestral.",
    color: "blue",
  },
  {
    href: "/calculadora-iva",
    icon: Percent,
    title: "IVA y modelo 303",
    description: "Añade, quita IVA o calcula el modelo 303 trimestral.",
    color: "rose",
  },
  {
    href: "/neto-bruto",
    icon: Wallet,
    title: "Neto / Bruto",
    description: "Cuánto te queda después de gastos, cuota e IRPF.",
    color: "amber",
  },
  {
    href: "/calculadora-despido",
    icon: Briefcase,
    title: "Despido y finiquito",
    description: "Indemnización improcedente, objetivo, colectivo + finiquito.",
    color: "indigo",
  },
  {
    href: "/baja-medica",
    icon: HeartPulse,
    title: "Baja médica",
    description: "Prestación por enfermedad común o accidente laboral.",
    color: "pink",
  },
  {
    href: "/jubilacion-autonomo",
    icon: Coins,
    title: "Jubilación autónomo",
    description: "Pensión según base media y años cotizados.",
    color: "teal",
  },
  {
    href: "/dietas-kilometraje",
    icon: Car,
    title: "Dietas y kilometraje",
    description: "Dietas exentas y deducción de km vigentes 2025.",
    color: "lime",
  },
  {
    href: "/generador-facturas",
    icon: FileText,
    title: "Generador de facturas",
    description: "Crea facturas en PDF con todos los campos legales en 1 minuto.",
    color: "violet",
  },
];

const COLOR_MAP: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100 group-hover:border-emerald-300",
  blue: "bg-blue-50 text-blue-700 border-blue-100 group-hover:border-blue-300",
  rose: "bg-rose-50 text-rose-700 border-rose-100 group-hover:border-rose-300",
  amber: "bg-amber-50 text-amber-700 border-amber-100 group-hover:border-amber-300",
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-100 group-hover:border-indigo-300",
  pink: "bg-pink-50 text-pink-700 border-pink-100 group-hover:border-pink-300",
  teal: "bg-teal-50 text-teal-700 border-teal-100 group-hover:border-teal-300",
  lime: "bg-lime-50 text-lime-700 border-lime-100 group-hover:border-lime-300",
  violet: "bg-violet-50 text-violet-700 border-violet-100 group-hover:border-violet-300",
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://calc-autonomo.vercel.app";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CalcAutónomo",
  url: SITE_URL,
  description: "Calculadoras fiscales gratuitas para autónomos en España",
  inLanguage: "es-ES",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CalcAutónomo",
  url: SITE_URL,
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Calculadoras fiscales para autónomos
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Cuota, IRPF, IVA, despido, jubilación y más. Sin registros, sin emails.
          Datos actualizados a tramos vigentes 2025.
        </p>
      </section>

      <AdSlot format="leaderboard" className="mb-10" />

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {CALCS.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-md hover:border-gray-300"
            >
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border ${COLOR_MAP[c.color]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-gray-900 flex items-center gap-2">
                {c.title}
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-1 transition-all" />
              </h2>
              <p className="mt-2 text-sm text-gray-600">{c.description}</p>
            </Link>
          );
        })}
      </section>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <Link
          href="/calendario-fiscal"
          className="group rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md hover:border-gray-300 transition-all"
        >
          <Calendar className="h-6 w-6 text-violet-600" />
          <h2 className="mt-4 text-lg font-semibold text-gray-900">Calendario fiscal</h2>
          <p className="mt-2 text-sm text-gray-600">
            Todas las fechas clave del año: modelos 303, 130, 390, 100, 111, 115, 347.
            No te pases ninguna.
          </p>
        </Link>
        <Link
          href="/guias"
          className="group rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md hover:border-gray-300 transition-all"
        >
          <BookOpen className="h-6 w-6 text-emerald-600" />
          <h2 className="mt-4 text-lg font-semibold text-gray-900">Guías</h2>
          <p className="mt-2 text-sm text-gray-600">
            Cómo darse de alta, gastos deducibles, tarifa plana. Sin jerga, paso a paso.
          </p>
        </Link>
      </div>

      <AdSlot format="rectangle" className="mb-12" />

      <section className="mb-12">
        <Newsletter source="homepage" />
      </section>

      <section className="text-center text-sm text-gray-500 max-w-3xl mx-auto">
        <p>
          <strong>Aviso.</strong> Los cálculos son orientativos. Se basan en los
          tramos generales 2025 (RD-ley 13/2022) y la escala estatal del IRPF. No
          incluyen escalas autonómicas, deducciones personales ni circunstancias
          particulares. Para presentar tus modelos, consulta a un gestor.
        </p>
      </section>
    </div>
  );
}
