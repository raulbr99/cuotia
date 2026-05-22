"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

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

const CLOSE_DELAY_MS = 180;

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }
  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }
  function openNow() {
    cancelClose();
    setOpen(true);
  }

  // Cleanup timer en desmonte
  useEffect(() => () => cancelClose(), []);

  // Escape para cerrar + clic fuera
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-[#FAFAF7]/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <Link href="/" className="font-serif text-xl font-medium tracking-tight text-neutral-900">
          Cuotia<span className="text-[#B91C1C]">.</span>
        </Link>

        <nav className="hidden items-center gap-5 text-[13px] sm:flex">
          <div
            ref={wrapperRef}
            className="relative"
            onMouseEnter={openNow}
            onMouseLeave={scheduleClose}
            onFocus={openNow}
            onBlur={(e) => {
              // Si el foco salta a un elemento dentro del menú no cerramos
              if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
                scheduleClose();
              }
            }}
          >
            <button
              type="button"
              onClick={() => setOpen((s) => !s)}
              className="flex items-center gap-1 py-2 text-neutral-700 transition-colors hover:text-neutral-900"
              aria-haspopup="menu"
              aria-expanded={open}
              aria-controls={menuId}
            >
              Calculadoras
              <ChevronDown
                className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open && (
              // Wrapper que cubre todo el área desde justo debajo del trigger.
              // `pt-2` actúa como puente invisible para evitar el gap del mouse.
              <div
                id={menuId}
                role="menu"
                aria-label="Calculadoras"
                className="absolute right-0 top-full z-50 w-60 pt-2"
                onMouseEnter={openNow}
                onMouseLeave={scheduleClose}
              >
                <div className="border border-neutral-200 bg-white p-1 shadow-md">
                  {CALC_LINKS.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      role="menuitem"
                      className="block px-3 py-1.5 text-[13px] text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-[#B91C1C]"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
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
          aria-expanded={mobileOpen}
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
