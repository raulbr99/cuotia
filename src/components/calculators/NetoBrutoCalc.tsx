"use client";

import { useMemo, useState } from "react";
import { findTramo } from "@/lib/cuota-autonomo";
import { calcularIRPFAnual } from "@/lib/irpf";
import { eur, pct } from "@/lib/format";

export function NetoBrutoCalc() {
  const [ingresosBrutosAnuales, setIngresosBrutosAnuales] = useState<number>(40000);
  const [gastosAnuales, setGastosAnuales] = useState<number>(5000);
  const [usaTarifaPlana, setUsaTarifaPlana] = useState<boolean>(false);

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

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="rounded-xl border border-[#1A1A1A] bg-[#0F0F0F] p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#A0A0A0] mb-1">
              Ingresos brutos anuales
            </label>
            <div className="relative">
              <input
                type="number"
                value={ingresosBrutosAnuales}
                onChange={(e) => setIngresosBrutosAnuales(parseFloat(e.target.value) || 0)}
                min={0}
                step={1000}
                className="w-full rounded-lg border border-[#252525] px-3 py-2 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-[#D1FF26]"
              />
              <span className="absolute right-3 top-2 text-[#505050]">€</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#A0A0A0] mb-1">
              Gastos deducibles anuales
            </label>
            <div className="relative">
              <input
                type="number"
                value={gastosAnuales}
                onChange={(e) => setGastosAnuales(parseFloat(e.target.value) || 0)}
                min={0}
                step={500}
                className="w-full rounded-lg border border-[#252525] px-3 py-2 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-[#D1FF26]"
              />
              <span className="absolute right-3 top-2 text-[#505050]">€</span>
            </div>
            <p className="text-xs text-[#606060] mt-1">
              Material, oficina, dietas deducibles, gestoría, etc.
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm text-[#A0A0A0]">
            <input
              type="checkbox"
              checked={usaTarifaPlana}
              onChange={(e) => setUsaTarifaPlana(e.target.checked)}
              className="h-4 w-4 rounded border-[#252525] text-[#D1FF26] focus:ring-[#D1FF26]"
            />
            Aplicar tarifa plana (87 €/mes el primer año)
          </label>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-[#0A0A0A] p-3">
            <p className="text-xs text-[#606060]">Ingresos brutos</p>
            <p className="font-semibold text-white">{eur(ingresosBrutosAnuales)}</p>
          </div>
          <div className="rounded-lg bg-[#0A0A0A] p-3">
            <p className="text-xs text-[#606060]">– Gastos deducibles</p>
            <p className="font-semibold text-white">– {eur(gastosAnuales)}</p>
          </div>
          <div className="rounded-lg bg-[#0A0A0A] p-3">
            <p className="text-xs text-[#606060]">– Cuota autónomo</p>
            <p className="font-semibold text-white">– {eur(result.cuotaAnual)}</p>
          </div>
          <div className="rounded-lg bg-[#0A0A0A] p-3">
            <p className="text-xs text-[#606060]">– IRPF estimado</p>
            <p className="font-semibold text-white">– {eur(result.irpf)}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border-2 border-[#D1FF26] bg-[#0F0F0F] p-5">
          <p className="text-xs uppercase tracking-wider text-[#D1FF26] font-medium">
            Tu neto anual
          </p>
          <p className="text-3xl font-bold text-[#D1FF26] mt-1">{eur(result.neto)}</p>
          <p className="text-sm text-[#D1FF26] mt-2">
            <strong>{eur(result.netoMensual)}</strong> / mes
          </p>
        </div>

        <div className="rounded-xl border border-[#1A1A1A] bg-[#0F0F0F] p-5 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-[#606060]">Tu tramo</span>
            <span className="font-medium">{result.tramo.label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#606060]">Base imponible IRPF</span>
            <span className="font-medium">{eur(result.baseImponible)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#606060]">Tipo efectivo IRPF</span>
            <span className="font-medium">{pct(result.tipoEfectivo)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
