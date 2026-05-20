"use client";

import { useMemo, useState } from "react";
import { findTramo, TARIFA_PLANA_MENSUAL, TRAMOS_2025 } from "@/lib/cuota-autonomo";
import { eur } from "@/lib/format";

type ModoCuota = "minima" | "maxima" | "personalizada";

export function CuotaAutonomoCalc() {
  const [ingresosMensuales, setIngresosMensuales] = useState<number>(2000);
  const [tarifaPlana, setTarifaPlana] = useState<boolean>(false);
  const [modo, setModo] = useState<ModoCuota>("minima");
  const [baseCustom, setBaseCustom] = useState<number>(1000);

  const tramo = useMemo(() => findTramo(ingresosMensuales), [ingresosMensuales]);

  const cuotaCalculada = useMemo(() => {
    if (tarifaPlana) return TARIFA_PLANA_MENSUAL;
    if (modo === "minima") return tramo.cuotaMin;
    if (modo === "maxima") return tramo.cuotaMax;
    return Math.min(Math.max(baseCustom * 0.314, tramo.cuotaMin), tramo.cuotaMax);
  }, [tramo, modo, baseCustom, tarifaPlana]);

  const anual = cuotaCalculada * 12;

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="rounded-xl border border-[#1A1A1A] bg-[#0F0F0F] p-6 shadow-sm">
        <h3 className="text-base font-semibold text-white mb-4">Tus datos</h3>

        <label className="block text-sm font-medium text-[#A0A0A0] mb-1">
          Rendimiento neto mensual previsto
        </label>
        <div className="relative">
          <input
            type="number"
            value={ingresosMensuales}
            onChange={(e) => setIngresosMensuales(parseFloat(e.target.value) || 0)}
            min={0}
            step={50}
            className="w-full rounded-lg border border-[#252525] px-3 py-2 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-[#D1FF26]"
          />
          <span className="absolute right-3 top-2 text-[#505050]">€</span>
        </div>
        <p className="text-xs text-[#606060] mt-1">
          Ingresos menos gastos deducibles, en bruto mensual.
        </p>

        <div className="mt-5 space-y-2">
          <label className="flex items-center gap-2 text-sm text-[#A0A0A0]">
            <input
              type="checkbox"
              checked={tarifaPlana}
              onChange={(e) => setTarifaPlana(e.target.checked)}
              className="h-4 w-4 rounded border-[#252525] text-[#D1FF26] focus:ring-[#D1FF26]"
            />
            Soy nuevo autónomo (aplicar tarifa plana 87 €/mes)
          </label>
        </div>

        {!tarifaPlana && (
          <div className="mt-5">
            <label className="block text-sm font-medium text-[#A0A0A0] mb-2">
              ¿Qué base de cotización quieres?
            </label>
            <div className="flex flex-wrap gap-2">
              {(["minima", "maxima", "personalizada"] as ModoCuota[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setModo(m)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    modo === m
                      ? "bg-[#D1FF26] text-[#0A0A0A]"
                      : "bg-[#1A1A1A] text-[#A0A0A0] hover:bg-[#252525]"
                  }`}
                >
                  {m === "minima" ? "Mínima" : m === "maxima" ? "Máxima" : "Personalizada"}
                </button>
              ))}
            </div>
            {modo === "personalizada" && (
              <div className="mt-3">
                <label className="block text-xs text-[#A0A0A0] mb-1">
                  Base de cotización (entre {eur(tramo.cuotaMin / 0.314)} y {eur(tramo.cuotaMax / 0.314)})
                </label>
                <input
                  type="number"
                  value={baseCustom}
                  onChange={(e) => setBaseCustom(parseFloat(e.target.value) || 0)}
                  min={tramo.cuotaMin / 0.314}
                  max={tramo.cuotaMax / 0.314}
                  step={10}
                  className="w-full rounded-lg border border-[#252525] px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#D1FF26]"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border-2 border-[#D1FF26] bg-[#0F0F0F] p-5">
          <p className="text-xs uppercase tracking-wider text-[#D1FF26] font-medium">
            Cuota mensual
          </p>
          <p className="text-3xl font-bold text-[#D1FF26] mt-1">{eur(cuotaCalculada)}</p>
          <p className="text-sm text-[#D1FF26] mt-2">
            <strong>{eur(anual)}</strong> al año
          </p>
        </div>

        <div className="rounded-xl border border-[#1A1A1A] bg-[#0F0F0F] p-5 text-sm">
          <p className="font-semibold text-white mb-2">Tu tramo</p>
          {tarifaPlana ? (
            <p className="text-[#A0A0A0]">
              Tarifa plana — 12 meses iniciales. Prorrogable 12 meses más si tu
              rendimiento neto anual queda por debajo del SMI.
            </p>
          ) : (
            <>
              <p className="text-[#A0A0A0]">{tramo.label}</p>
              <p className="text-[#606060] text-xs mt-1">
                {tramo.minIngresos > 0 && `Desde ${eur(tramo.minIngresos)} `}
                {tramo.maxIngresos
                  ? `hasta ${eur(tramo.maxIngresos)} /mes`
                  : "sin tope superior"}
              </p>
              <div className="mt-3 border-t border-[#1A1A1A] pt-3 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#606060]">Cuota mínima</span>
                  <span className="font-medium">{eur(tramo.cuotaMin)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#606060]">Cuota máxima</span>
                  <span className="font-medium">{eur(tramo.cuotaMax)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="md:col-span-2 mt-2 overflow-x-auto rounded-xl border border-[#1A1A1A] bg-[#0F0F0F]">
        <table className="w-full text-sm">
          <thead className="bg-[#0A0A0A] text-xs uppercase text-[#A0A0A0]">
            <tr>
              <th className="px-3 py-2 text-left">Tramo</th>
              <th className="px-3 py-2 text-right">Rendimiento neto</th>
              <th className="px-3 py-2 text-right">Cuota mín.</th>
              <th className="px-3 py-2 text-right">Cuota máx.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]">
            {TRAMOS_2025.map((t) => {
              const active = t.numero === tramo.numero && !tarifaPlana;
              return (
                <tr key={t.numero} className={active ? "bg-[#0F0F0F]" : ""}>
                  <td className="px-3 py-2 font-medium">{t.label}</td>
                  <td className="px-3 py-2 text-right text-[#A0A0A0]">
                    {t.minIngresos === 0 ? "≤" : "≥"} {eur(t.minIngresos)}
                    {t.maxIngresos ? ` – ${eur(t.maxIngresos)}` : "+"}
                  </td>
                  <td className="px-3 py-2 text-right">{eur(t.cuotaMin)}</td>
                  <td className="px-3 py-2 text-right">{eur(t.cuotaMax)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
