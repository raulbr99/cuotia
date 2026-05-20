"use client";

import Link from "next/link";
import { Calculator, ChevronDown } from "lucide-react";
import { useState } from "react";

const CALC_LINKS = [
  { href: "/cuota-autonomo", label: "Cuota autónomo" },
  { href: "/calculadora-irpf", label: "IRPF (17 CCAA) + modelo 130" },
  { href: "/calculadora-iva", label: "IVA y modelo 303" },
  { href: "/neto-bruto", label: "Neto / Bruto" },
  { href: "/calculadora-despido", label: "Despido y finiquito" },
  { href: "/baja-medica", label: "Baja médica" },
  { href: "/jubilacion-autonomo", label: "Jubilación autónomo" },
  { href: "/dietas-kilometraje", label: "Dietas y km" },
  { href: "/generador-facturas", label: "Generador de facturas" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-base font-bold text-gray-900">
          <Calculator className="h-5 w-5 text-emerald-600" />
          CalcAutónomo
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <div className="relative" onMouseLeave={() => setOpen(false)}>
            <button
              onClick={() => setOpen((s) => !s)}
              onMouseEnter={() => setOpen(true)}
              className="flex items-center gap-1 rounded-md px-3 py-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              Calculadoras
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {open && (
              <div className="absolute right-0 top-full mt-1 w-64 rounded-lg border border-gray-200 bg-white shadow-lg p-2">
                {CALC_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-700"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/calendario-fiscal" className="rounded-md px-3 py-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 hidden sm:inline-block">
            Calendario
          </Link>
          <Link href="/guias" className="rounded-md px-3 py-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 hidden sm:inline-block">
            Guías
          </Link>
        </nav>
      </div>
    </header>
  );
}
