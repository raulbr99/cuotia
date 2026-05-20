"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const CALC_LINKS = [
  { code: "SIF-0001", href: "/cuota-autonomo", label: "Cuota autónomo" },
  { code: "SIF-0002", href: "/calculadora-irpf", label: "IRPF + modelo 130" },
  { code: "SIF-0003", href: "/calculadora-iva", label: "IVA + modelo 303" },
  { code: "SIF-0004", href: "/neto-bruto", label: "Neto / Bruto" },
  { code: "SIF-0005", href: "/calculadora-despido", label: "Despido + finiquito" },
  { code: "SIF-0006", href: "/baja-medica", label: "Baja médica" },
  { code: "SIF-0007", href: "/jubilacion-autonomo", label: "Jubilación" },
  { code: "SIF-0008", href: "/dietas-kilometraje", label: "Dietas + km" },
  { code: "SIF-0009", href: "/generador-facturas", label: "Generador facturas" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 h-[70px] border-b border-[#1A1A1A] bg-[#0A0A0A]/95 backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-display text-2xl tracking-tight text-white">
          CUOTIA
        </Link>
        <nav className="flex items-center gap-1 text-[12px] uppercase tracking-[0.15em]">
          <div className="relative" onMouseLeave={() => setOpen(false)}>
            <button
              onClick={() => setOpen((s) => !s)}
              onMouseEnter={() => setOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-[#A0A0A0] transition-colors hover:text-[#D1FF26]"
            >
              Calculadoras
              <ChevronDown className="h-3 w-3" />
            </button>
            {open && (
              <div className="absolute right-0 top-full w-72 border border-[#252525] bg-[#0F0F0F] p-1">
                {CALC_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="group flex items-center justify-between px-3 py-2 text-[12px] tracking-[0.1em] text-[#A0A0A0] transition-colors hover:bg-[#1A1A1A] hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    <span>{l.label}</span>
                    <span className="font-mono text-[9px] text-[#505050] group-hover:text-[#D1FF26]">
                      {l.code}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/calendario-fiscal"
            className="hidden px-3 py-2 text-[#A0A0A0] transition-colors hover:text-[#D1FF26] sm:inline-block"
          >
            Calendario
          </Link>
          <Link
            href="/guias"
            className="hidden px-3 py-2 text-[#A0A0A0] transition-colors hover:text-[#D1FF26] sm:inline-block"
          >
            Guías
          </Link>
          <Link
            href="/blog"
            className="hidden px-3 py-2 text-[#A0A0A0] transition-colors hover:text-[#D1FF26] sm:inline-block"
          >
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
