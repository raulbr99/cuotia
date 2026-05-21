"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
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
    <header className="border-b border-neutral-200 bg-[#FAFAF7]">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <Link href="/" className="font-serif text-xl font-medium tracking-tight text-neutral-900">
          Cuotia<span className="text-[#B91C1C]">.</span>
        </Link>

        <nav className="hidden items-center gap-5 text-[13px] sm:flex">
          <div className="relative" onMouseLeave={() => setOpen(false)}>
            <button
              onClick={() => setOpen((s) => !s)}
              onMouseEnter={() => setOpen(true)}
              className="flex items-center gap-1 text-neutral-700 transition-colors hover:text-neutral-900"
            >
              Calculadoras
              <ChevronDown className="h-3 w-3" />
            </button>
            {open && (
              <div className="absolute right-0 top-full mt-1 w-60 border border-neutral-200 bg-white p-1 shadow-sm">
                {CALC_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block px-3 py-1.5 text-[13px] text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-[#B91C1C]"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/calendario-fiscal" className="text-neutral-700 transition-colors hover:text-neutral-900">
            Calendario
          </Link>
          <Link href="/guias" className="text-neutral-700 transition-colors hover:text-neutral-900">
            Guías
          </Link>
          <Link href="/blog" className="text-neutral-700 transition-colors hover:text-neutral-900">
            Blog
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen((s) => !s)}
          className="sm:hidden inline-flex items-center justify-center p-1.5 text-neutral-700"
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-neutral-200 bg-white px-5 py-4 sm:hidden">
          <div className="space-y-0.5">
            <p className="px-2 pb-1 text-[11px] uppercase tracking-wider text-neutral-400">Calculadoras</p>
            {CALC_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block px-2 py-1.5 text-[13px] text-neutral-700 hover:text-[#B91C1C]"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-neutral-100 space-y-0.5">
              <Link href="/calendario-fiscal" onClick={() => setMobileOpen(false)} className="block px-2 py-1.5 text-[13px] text-neutral-700">Calendario</Link>
              <Link href="/guias" onClick={() => setMobileOpen(false)} className="block px-2 py-1.5 text-[13px] text-neutral-700">Guías</Link>
              <Link href="/blog" onClick={() => setMobileOpen(false)} className="block px-2 py-1.5 text-[13px] text-neutral-700">Blog</Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
