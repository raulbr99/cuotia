"use client";

import { useId, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { findTramo } from "@/lib/cuota-autonomo";
import { calcularIRPFAnual } from "@/lib/irpf";
import { eur, pct } from "@/lib/format";

const DEFAULTS = { ingresos: 40000, gastos: 5000, tarifaPlana: false };

export function NetoBrutoCalc() {
  const ingId = useId();
  const gastosId = useId();
  const tarifaId = useId();

  const [ingresosBrutosAnuales, setIngresosBrutosAnuales] = useState<number>(DEFAULTS.ingresos);
  const [gastosAnuales, setGastosAnuales] = useState<number>(DEFAULTS.gastos);
  const [usaTarifaPlana, setUsaTarifaPlana] = useState<boolean>(DEFAULTS.tarifaPlana);
  const [touched, setTouched] = useState<boolean>(false);

  const result = useMemo(() => {
    const ingresoMensual = Math.max(0, (ingresosBrutosAnuales - gastosAnuales) / 12);
    const tramo = findTramo(ingresoMensual);
    const cuotaMensual = usaTarifaPlana ? 87 : tramo.cuotaMin;
    const cuotaAnual = cuotaMensual * 12;
    const baseImponible = Math.max(0, ingresosBrutosAnuales - gastosAnuales - cuotaAnual);
    const { cuota: irpf, tipoEfectivo } = calcularIRPFAnual(baseImponible);
    const neto = ingresosBrutosAnuales - gastosAnuales - cuotaAnual - irpf;
    const netoMensual = neto / 12;
    return { ingresoMensual, tramo, cuotaAnual, baseImponible, irpf, tipoEfectivo, neto, netoMensual };
  }, [ingresosBrutosAnuales, gastosAnuales, usaTarifaPlana]);

  function reset() {
    setIngresosBrutosAnuales(DEFAULTS.ingresos);
    setGastosAnuales(DEFAULTS.gastos);
    setUsaTarifaPlana(DEFAULTS.tarifaPlana);
    setTouched(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-neutral-900">Tus datos</h3>
          <div className="flex items-center gap-2">
            {!touched && <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B91C1C]">EJEMPLO</span>}
            <button
              onClick={reset}
              type="button"
              aria-label="Restablecer valores"
              className="rounded-md border border-neutral-300 p-1.5 text-neutral-500 transition-colors hover:border-[#B91C1C] hover:text-[#B91C1C]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor={ingId} className="mb-1 block text-sm font-medium text-neutral-700">
              Ingresos brutos anuales
            </label>
            <div className="relative">
              <input
                id={ingId}
                type="number"
                inputMode="decimal"
                value={ingresosBrutosAnuales}
                onChange={(e) => { setIngresosBrutosAnuales(parseFloat(e.target.value) || 0); setTouched(true); }}
                min={0}
                step={1000}
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 pr-10 text-base text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
              />
              <span aria-hidden="true" className="absolute right-3 top-2 text-neutral-400">€</span>
            </div>
          </div>

          <div>
            <label htmlFor={gastosId} className="mb-1 block text-sm font-medium text-neutral-700">
              Gastos deducibles anuales
            </label>
            <div className="relative">
              <input
                id={gastosId}
                type="number"
                inputMode="decimal"
                value={gastosAnuales}
                onChange={(e) => { setGastosAnuales(parseFloat(e.target.value) || 0); setTouched(true); }}
                min={0}
                step={500}
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 pr-10 text-base text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
              />
              <span aria-hidden="true" className="absolute right-3 top-2 text-neutral-400">€</span>
            </div>
            <p className="mt-1 text-xs text-neutral-500">
              Material, oficina, dietas deducibles, gestoría, etc.
            </p>
          </div>

          <label htmlFor={tarifaId} className="flex items-center gap-2 text-sm text-neutral-700">
            <input
              id={tarifaId}
              type="checkbox"
              checked={usaTarifaPlana}
              onChange={(e) => { setUsaTarifaPlana(e.target.checked); setTouched(true); }}
              className="h-4 w-4 border-neutral-300 text-[#B91C1C] focus:ring-[#B91C1C]"
            />
            Aplicar tarifa plana (87 €/mes el primer año)
          </label>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white p-3 border border-neutral-200">
            <p className="text-xs text-neutral-500">Ingresos brutos</p>
            <p className="font-semibold text-neutral-900">{eur(ingresosBrutosAnuales)}</p>
          </div>
          <div className="bg-white p-3 border border-neutral-200">
            <p className="text-xs text-neutral-500">– Gastos deducibles</p>
            <p className="font-semibold text-neutral-900">– {eur(gastosAnuales)}</p>
          </div>
          <div className="bg-white p-3 border border-neutral-200">
            <p className="text-xs text-neutral-500">– Cuota autónomo</p>
            <p className="font-semibold text-neutral-900">– {eur(result.cuotaAnual)}</p>
          </div>
          <div className="bg-white p-3 border border-neutral-200">
            <p className="text-xs text-neutral-500">– IRPF estimado</p>
            <p className="font-semibold text-neutral-900">– {eur(result.irpf)}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border-2 border-[#FECACA] bg-[#FEF2F2] p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">TU NETO ANUAL</p>
          <p className="mt-1 font-bold text-3xl text-[#B91C1C]">{eur(result.neto)}</p>
          <p className="mt-2 text-sm text-neutral-700">
            <strong className="text-neutral-900">{eur(result.netoMensual)}</strong> / mes
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-neutral-500">Tu tramo</span>
            <span className="font-medium text-neutral-900">{result.tramo.label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Base imponible IRPF</span>
            <span className="font-medium text-neutral-900">{eur(result.baseImponible)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Tipo efectivo IRPF</span>
            <span className="font-medium text-neutral-900">{pct(result.tipoEfectivo)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
