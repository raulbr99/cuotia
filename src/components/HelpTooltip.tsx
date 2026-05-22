"use client";

import { HelpCircle } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

interface HelpTooltipProps {
  label: string;
  children: React.ReactNode;
}

/**
 * Icono de ayuda (?) que muestra un popover con explicación.
 * - Desktop: hover + focus
 * - Mobile: tap (click) abre/cierra
 * - Cierra con Escape o clic fuera
 */
export function HelpTooltip({ label, children }: HelpTooltipProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const id = useId();

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
    <span
      ref={wrapperRef}
      className="relative inline-flex align-middle"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={`Ayuda: ${label}`}
        aria-describedby={open ? id : undefined}
        onClick={() => setOpen((s) => !s)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="ml-1 inline-flex h-4 w-4 items-center justify-center text-neutral-400 transition-colors hover:text-[#B91C1C] focus:text-[#B91C1C] focus:outline-none"
      >
        <HelpCircle className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
      {open && (
        <span
          id={id}
          role="tooltip"
          className="absolute left-1/2 top-full z-40 mt-1 w-64 -translate-x-1/2 rounded-md border border-neutral-200 bg-white p-3 text-xs leading-relaxed text-neutral-700 shadow-md"
        >
          <span className="block font-semibold text-neutral-900 mb-1">{label}</span>
          {children}
        </span>
      )}
    </span>
  );
}
