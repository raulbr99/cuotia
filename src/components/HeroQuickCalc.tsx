"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { findTramo, TARIFA_PLANA_MENSUAL } from "@/lib/cuota-autonomo";
import { eur } from "@/lib/format";

/**
 * Mini calculadora en hero — quita la fricción de "elegir calc, scrollear,
 * rellenar". Resultado live mientras escribes. CTA al detalle completo.
 */
export function HeroQuickCalc() {
  const [ingresos, setIngresos] = useState<number>(2000);

  const result = useMemo(() => {
    const tramo = findTramo(ingresos);
    return {
      tramo,
      cuota: tramo.cuotaMin,
      ahorroTarifaPlana: Math.max(0, (tramo.cuotaMin - TARIFA_PLANA_MENSUAL) * 12),
    };
  }, [ingresos]);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 mb-4">
        Calcula en 5 segundos
      </p>
      <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <label htmlFor="hero-ingresos" className="mb-1 block text-sm font-medium text-neutral-700">
            ¿Cuánto facturas al mes (neto)?
          </label>
          <div className="relative">
            <input
              id="hero-ingresos"
              type="number"
              inputMode="decimal"
              value={ingresos}
              onChange={(e) => setIngresos(parseFloat(e.target.value) || 0)}
              min={0}
              step={100}
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-3 pr-10 text-lg font-medium text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
            />
            <span aria-hidden="true" className="absolute right-3 top-3 text-neutral-400">€</span>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-[11px] uppercase tracking-wider text-neutral-500">Tu cuota mensual</p>
          <p className="font-serif text-3xl text-[#B91C1C] leading-none">{eur(result.cuota)}</p>
          <p className="mt-1 text-xs text-neutral-500">
            tramo {result.tramo.numero} · {eur(result.cuota * 12)}/año
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-4">
        <p className="text-xs text-neutral-600">
          Con <strong className="text-neutral-900">tarifa plana</strong> (nuevos autónomos): 88,64 €/mes
          {result.ahorroTarifaPlana > 0 && (
            <> → ahorras <strong className="text-[#B91C1C]">{eur(result.ahorroTarifaPlana)}/año</strong></>
          )}
        </p>
        <Link
          href={`/cuota-autonomo/${ingresos}-euros-mes`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#B91C1C] hover:underline"
        >
          Ver detalle
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
