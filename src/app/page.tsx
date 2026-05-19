import Link from "next/link";
import { Calculator, Receipt, Wallet, Calendar, ArrowRight } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";

const CALCS = [
  {
    href: "/cuota-autonomo",
    icon: Calculator,
    title: "Cuota de autónomo",
    description: "Tu cuota mensual según los tramos 2025 por ingresos reales. Con tarifa plana opcional.",
    color: "emerald",
  },
  {
    href: "/calculadora-irpf",
    icon: Receipt,
    title: "IRPF y modelo 130",
    description: "IRPF anual con tramos estatales y pago fraccionado trimestral del modelo 130.",
    color: "blue",
  },
  {
    href: "/neto-bruto",
    icon: Wallet,
    title: "Neto / Bruto",
    description: "Cuánto te queda después de gastos, cuota y IRPF. Anual y mensual.",
    color: "amber",
  },
  {
    href: "/calendario-fiscal",
    icon: Calendar,
    title: "Calendario fiscal",
    description: "Fechas clave del año: modelos 303, 130, 390, 100, 111, 115. No te pases ninguna.",
    color: "violet",
  },
];

const COLOR_MAP: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100 group-hover:border-emerald-300",
  blue: "bg-blue-50 text-blue-700 border-blue-100 group-hover:border-blue-300",
  amber: "bg-amber-50 text-amber-700 border-amber-100 group-hover:border-amber-300",
  violet: "bg-violet-50 text-violet-700 border-violet-100 group-hover:border-violet-300",
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Calculadoras fiscales para autónomos
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Cuota, IRPF, modelo 130 y neto en segundos. Sin registros, sin emails. Datos
          actualizados a tramos vigentes 2025.
        </p>
      </section>

      <AdSlot format="leaderboard" className="mb-10" />

      <section className="grid gap-5 sm:grid-cols-2 mb-12">
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

      <section className="rounded-2xl bg-white border border-gray-200 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">¿Eres nuevo autónomo?</h2>
        <p className="text-gray-700 leading-relaxed">
          Si te das de alta en RETA por primera vez (o no has cotizado en los últimos
          2 años), puedes acogerte a la <strong>tarifa plana de 87 €/mes durante 12 meses</strong>.
          Prorrogable otros 12 meses si tu rendimiento neto anual queda por debajo del
          SMI. Calcula tu cuota teórica para saber lo que ahorras.
        </p>
        <Link
          href="/cuota-autonomo"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-800"
        >
          Calcular mi cuota <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <AdSlot format="rectangle" className="mb-12" />

      <section className="text-center text-sm text-gray-500 max-w-3xl mx-auto">
        <p>
          <strong>Aviso.</strong> Los cálculos son orientativos y se basan en los
          tramos generales 2025 de la Seguridad Social y la escala estatal del IRPF.
          No incluyen escalas autonómicas, deducciones personales ni circunstancias
          particulares. Para presentar tus modelos consulta a un gestor.
        </p>
      </section>
    </div>
  );
}
