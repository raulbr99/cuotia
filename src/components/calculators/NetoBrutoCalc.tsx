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
      <div className="border border-[#1A1A1A] bg-[#0F0F0F] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg uppercase tracking-tight text-white">Tus datos</h3>
          <div className="flex items-center gap-2">
            {!touched && <span className="font-mono text-[9px] tracking-[0.15em] text-[#D1FF26]">EJEMPLO</span>}
            <button
              onClick={reset}
              type="button"
              aria-label="Restablecer valores"
              className="border border-[#252525] p-1.5 text-[#606060] transition-colors hover:border-[#D1FF26] hover:text-[#D1FF26]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor={ingId} className="mb-1 block text-sm font-medium text-[#D0D0D0]">
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
                className="w-full border border-[#252525] bg-[#0A0A0A] px-3 py-2 pr-10 text-base text-white focus:border-[#D1FF26] focus:outline-none"
              />
              <span aria-hidden="true" className="absolute right-3 top-2 text-[#505050]">€</span>
            </div>
          </div>

          <div>
            <label htmlFor={gastosId} className="mb-1 block text-sm font-medium text-[#D0D0D0]">
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
                className="w-full border border-[#252525] bg-[#0A0A0A] px-3 py-2 pr-10 text-base text-white focus:border-[#D1FF26] focus:outline-none"
              />
              <span aria-hidden="true" className="absolute right-3 top-2 text-[#505050]">€</span>
            </div>
            <p className="mt-1 text-xs text-[#606060]">
              Material, oficina, dietas deducibles, gestoría, etc.
            </p>
          </div>

          <label htmlFor={tarifaId} className="flex items-center gap-2 text-sm text-[#D0D0D0]">
            <input
              id={tarifaId}
              type="checkbox"
              checked={usaTarifaPlana}
              onChange={(e) => { setUsaTarifaPlana(e.target.checked); setTouched(true); }}
              className="h-4 w-4 border-[#252525] text-[#D1FF26] focus:ring-[#D1FF26]"
            />
            Aplicar tarifa plana (87 €/mes el primer año)
          </label>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="bg-[#0A0A0A] p-3 border border-[#1A1A1A]">
            <p className="text-xs text-[#606060]">Ingresos brutos</p>
            <p className="font-semibold text-white">{eur(ingresosBrutosAnuales)}</p>
          </div>
          <div className="bg-[#0A0A0A] p-3 border border-[#1A1A1A]">
            <p className="text-xs text-[#606060]">– Gastos deducibles</p>
            <p className="font-semibold text-white">– {eur(gastosAnuales)}</p>
          </div>
          <div className="bg-[#0A0A0A] p-3 border border-[#1A1A1A]">
            <p className="text-xs text-[#606060]">– Cuota autónomo</p>
            <p className="font-semibold text-white">– {eur(result.cuotaAnual)}</p>
          </div>
          <div className="bg-[#0A0A0A] p-3 border border-[#1A1A1A]">
            <p className="text-xs text-[#606060]">– IRPF estimado</p>
            <p className="font-semibold text-white">– {eur(result.irpf)}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border-2 border-[#D1FF26] bg-[#0F0F0F] p-5">
          <p className="tech-label text-[#D1FF26]">TU NETO ANUAL</p>
          <p className="mt-1 font-display text-3xl text-[#D1FF26]">{eur(result.neto)}</p>
          <p className="mt-2 text-sm text-[#D0D0D0]">
            <strong className="text-white">{eur(result.netoMensual)}</strong> / mes
          </p>
        </div>

        <div className="border border-[#1A1A1A] bg-[#0F0F0F] p-5 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-[#606060]">Tu tramo</span>
            <span className="font-medium text-white">{result.tramo.label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#606060]">Base imponible IRPF</span>
            <span className="font-medium text-white">{eur(result.baseImponible)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#606060]">Tipo efectivo IRPF</span>
            <span className="font-medium text-white">{pct(result.tipoEfectivo)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
