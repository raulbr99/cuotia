"use client";

import Link from "next/link";
import { Calculator, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

const CALC_LINKS = [
  { href: "/cuota-autonomo", label: "Cuota autónomo" },
  { href: "/calculadora-irpf", label: "IRPF + modelo 130" },
  { href: "/calculadora-iva", label: "IVA + modelo 303" },
  { href: "/neto-bruto", label: "Neto / Bruto" },
  { href: "/calculadora-despido", label: "Despido + finiquito" },
  { href: "/baja-medica", label: "Baja médica" },
  { href: "/jubilacion-autonomo", label: "Jubilación" },
  { href: "/dietas-kilometraje", label: "Dietas + km" },
  { href: "/generador-facturas", label: "Generador facturas" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <Calculator className="h-5 w-5 text-blue-600" strokeWidth={2} />
          Cuotia
        </Link>

        <nav className="hidden items-center gap-1 text-sm sm:flex">
          <div className="relative" onMouseLeave={() => setOpen(false)}>
            <button
              onClick={() => setOpen((s) => !s)}
              onMouseEnter={() => setOpen(true)}
              className="flex items-center gap-1 rounded-md px-3 py-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              Calculadoras
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {open && (
              <div className="absolute right-0 top-full w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                {CALC_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block rounded-md px-3 py-1.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-700"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/calendario-fiscal"
            className="rounded-md px-3 py-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            Calendario
          </Link>
          <Link
            href="/guias"
            className="rounded-md px-3 py-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            Guías
          </Link>
          <Link
            href="/blog"
            className="rounded-md px-3 py-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            Blog
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen((s) => !s)}
          className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-slate-200 bg-white px-4 py-4 sm:hidden">
          <div className="space-y-1">
            <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Calculadoras</p>
            {CALC_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-700"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-slate-100">
              <Link href="/calendario-fiscal" onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">Calendario</Link>
              <Link href="/guias" onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">Guías</Link>
              <Link href="/blog" onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">Blog</Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
