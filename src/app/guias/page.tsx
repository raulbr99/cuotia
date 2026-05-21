import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookOpen, FileText, Receipt, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Guías para autónomos en España",
  description: "Guías prácticas sobre alta como autónomo, gastos deducibles, tarifa plana y obligaciones fiscales.",
  alternates: { canonical: "/guias" },
};

const GUIAS = [
  {
    href: "/guias/alta-autonomo",
    title: "Cómo darse de alta como autónomo",
    description: "Paso a paso: modelo 036/037, alta en RETA, tarifa plana, plazos.",
    icon: FileText,
  },
  {
    href: "/guias/gastos-deducibles",
    title: "Gastos deducibles para autónomos",
    description: "Qué gastos puedes desgravar en IRPF y deducir en IVA. Lista actualizada 2025.",
    icon: Receipt,
  },
  {
    href: "/guias/tarifa-plana",
    title: "Tarifa plana del autónomo",
    description: "87 €/mes durante 12 meses prorrogables. Requisitos, cuándo se puede pedir y cuánto ahorras.",
    icon: Sparkles,
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Guías" }]} />
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl flex items-center gap-3">
          <BookOpen className="h-7 w-7 text-[#B91C1C]" />
          Guías para autónomos
        </h1>
        <p className="mt-3 text-neutral-700 max-w-3xl">
          Explicaciones prácticas para no perderte con los modelos, plazos y normativa.
        </p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GUIAS.map((g) => {
          const Icon = g.icon;
          return (
            <Link
              key={g.href}
              href={g.href}
              className="group  rounded-xl border border-neutral-200 bg-white p-6 hover:bg-white hover:border-neutral-300 transition-all"
            >
              <Icon className="h-6 w-6 text-[#B91C1C]" />
              <h2 className="mt-4 text-base font-semibold">{g.title}</h2>
              <p className="text-sm text-neutral-700 mt-2">{g.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
