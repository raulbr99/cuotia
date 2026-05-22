"use client";

import { useId, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { findTramo, TARIFA_PLANA_MENSUAL, TRAMOS_2025 } from "@/lib/cuota-autonomo";
import { eur } from "@/lib/format";
import { HelpTooltip } from "@/components/HelpTooltip";

type ModoCuota = "minima" | "maxima" | "personalizada";

const DEFAULTS = { ingresos: 2000, modo: "minima" as ModoCuota, tarifaPlana: false, baseCustom: 1000 };

export function CuotaAutonomoCalc() {
  const ingresosId = useId();
  const tarifaId = useId();
  const baseCustomId = useId();

  const [ingresosMensuales, setIngresosMensuales] = useState<number>(DEFAULTS.ingresos);
  const [tarifaPlana, setTarifaPlana] = useState<boolean>(DEFAULTS.tarifaPlana);
  const [modo, setModo] = useState<ModoCuota>(DEFAULTS.modo);
  const [baseCustom, setBaseCustom] = useState<number>(DEFAULTS.baseCustom);
  const [touched, setTouched] = useState<boolean>(false);

  const tramo = useMemo(() => findTramo(ingresosMensuales), [ingresosMensuales]);

  const cuotaCalculada = useMemo(() => {
    if (tarifaPlana) return TARIFA_PLANA_MENSUAL;
    if (modo === "minima") return tramo.cuotaMin;
    if (modo === "maxima") return tramo.cuotaMax;
    return Math.min(Math.max(baseCustom * 0.314, tramo.cuotaMin), tramo.cuotaMax);
  }, [tramo, modo, baseCustom, tarifaPlana]);

  const anual = cuotaCalculada * 12;

  function reset() {
    setIngresosMensuales(DEFAULTS.ingresos);
    setTarifaPlana(DEFAULTS.tarifaPlana);
    setModo(DEFAULTS.modo);
    setBaseCustom(DEFAULTS.baseCustom);
    setTouched(false);
  }

  const onTouch = () => setTouched(true);

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

        <label htmlFor={ingresosId} className="mb-1 block text-sm font-medium text-neutral-700">
          Rendimiento neto mensual previsto
          <HelpTooltip label="¿Qué es rendimiento neto?">
            Ingresos brutos − gastos deducibles − 7% genérico (5% societarios). Es la
            cifra que determina tu tramo. Ejemplo: 30.000 € − 5.000 € gastos = 25.000 € / 12 = 2.083 €/mes.
          </HelpTooltip>
        </label>
        <div className="relative">
          <input
            id={ingresosId}
            type="number"
            inputMode="decimal"
            value={ingresosMensuales}
            onChange={(e) => { setIngresosMensuales(parseFloat(e.target.value) || 0); onTouch(); }}
            min={0}
            step={50}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 pr-10 text-base text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
          />
          <span aria-hidden="true" className="absolute right-3 top-2 text-neutral-400">€</span>
        </div>
        <p className="mt-1 text-xs text-neutral-500">
          Ingresos menos gastos deducibles, en bruto mensual.
        </p>

        <div className="mt-5 space-y-2">
          <label htmlFor={tarifaId} className="flex items-center gap-2 text-sm text-neutral-700">
            <input
              id={tarifaId}
              type="checkbox"
              checked={tarifaPlana}
              onChange={(e) => { setTarifaPlana(e.target.checked); onTouch(); }}
              className="h-4 w-4 border-neutral-300 text-[#B91C1C] focus:ring-[#B91C1C]"
            />
            Soy nuevo autónomo (aplicar tarifa plana 88,64 €/mes)
          </label>
        </div>

        {!tarifaPlana && (
          <div className="mt-5">
            <p className="mb-2 block text-sm font-medium text-neutral-700">
              ¿Qué base de cotización quieres?
              <HelpTooltip label="Base de cotización">
                Mínima = pagas lo justo de tu tramo (cuota más baja). Máxima = subes tu base, pagas más cada mes pero aumentas tu pensión futura y prestaciones por baja.
              </HelpTooltip>
            </p>
            <div role="radiogroup" aria-label="Base de cotización" className="flex flex-wrap gap-2">
              {(["minima", "maxima", "personalizada"] as ModoCuota[]).map((m) => (
                <button
                  key={m}
                  onClick={() => { setModo(m); onTouch(); }}
                  type="button"
                  role="radio"
                  aria-checked={modo === m}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    modo === m
                      ? "rounded-md bg-[#B91C1C] text-white"
                      : "rounded-md bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {m === "minima" ? "Mínima" : m === "maxima" ? "Máxima" : "Personalizada"}
                </button>
              ))}
            </div>
            {modo === "personalizada" && (
              <div className="mt-3">
                <label htmlFor={baseCustomId} className="mb-1 block text-xs text-neutral-700">
                  Base de cotización (entre {eur(tramo.cuotaMin / 0.314)} y {eur(tramo.cuotaMax / 0.314)})
                </label>
                <input
                  id={baseCustomId}
                  type="number"
                  inputMode="decimal"
                  value={baseCustom}
                  onChange={(e) => { setBaseCustom(parseFloat(e.target.value) || 0); onTouch(); }}
                  min={tramo.cuotaMin / 0.314}
                  max={tramo.cuotaMax / 0.314}
                  step={10}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-xl border-2 border-[#FECACA] bg-[#FEF2F2] p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">CUOTA MENSUAL</p>
          <p className="mt-1 font-bold text-3xl text-[#B91C1C]">{eur(cuotaCalculada)}</p>
          <p className="mt-2 text-sm text-neutral-700">
            <strong className="text-neutral-900">{eur(anual)}</strong> al año
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5 text-sm">
          <p className="font-semibold text-neutral-900 mb-2">Tu tramo</p>
          {tarifaPlana ? (
            <p className="text-neutral-700">
              Tarifa plana — 12 meses iniciales. Prorrogable 12 meses más si tu
              rendimiento neto anual queda por debajo del SMI.
            </p>
          ) : (
            <>
              <p className="text-neutral-700">{tramo.label}</p>
              <p className="text-neutral-500 text-xs mt-1">
                {tramo.minIngresos > 0 && `Desde ${eur(tramo.minIngresos)} `}
                {tramo.maxIngresos
                  ? `hasta ${eur(tramo.maxIngresos)} /mes`
                  : "sin tope superior"}
              </p>
              <div className="mt-3 border-t border-neutral-200 pt-3 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Cuota mínima</span>
                  <span className="font-medium text-neutral-900">{eur(tramo.cuotaMin)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Cuota máxima</span>
                  <span className="font-medium text-neutral-900">{eur(tramo.cuotaMax)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="lg:col-span-2 mt-2 overflow-x-auto border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <caption className="sr-only">Tabla de los 15 tramos de cotización de autónomo 2026</caption>
          <thead className="bg-white text-xs uppercase text-neutral-700">
            <tr>
              <th scope="col" className="px-3 py-2 text-left">Tramo</th>
              <th scope="col" className="px-3 py-2 text-right">Rendimiento neto</th>
              <th scope="col" className="px-3 py-2 text-right">Cuota mín.</th>
              <th scope="col" className="px-3 py-2 text-right">Cuota máx.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {TRAMOS_2025.map((t) => {
              const active = t.numero === tramo.numero && !tarifaPlana;
              return (
                <tr key={t.numero} className={active ? "bg-white" : ""}>
                  <th scope="row" className="px-3 py-2 font-medium text-left text-neutral-900">{t.label}</th>
                  <td className="px-3 py-2 text-right text-neutral-700">
                    {t.minIngresos === 0 ? "≤" : "≥"} {eur(t.minIngresos)}
                    {t.maxIngresos ? ` – ${eur(t.maxIngresos)}` : "+"}
                  </td>
                  <td className="px-3 py-2 text-right text-neutral-900">{eur(t.cuotaMin)}</td>
                  <td className="px-3 py-2 text-right text-neutral-900">{eur(t.cuotaMax)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
