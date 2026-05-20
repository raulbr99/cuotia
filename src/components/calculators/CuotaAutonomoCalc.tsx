"use client";

import { useId, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { findTramo, TARIFA_PLANA_MENSUAL, TRAMOS_2025 } from "@/lib/cuota-autonomo";
import { eur } from "@/lib/format";

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

        <label htmlFor={ingresosId} className="mb-1 block text-sm font-medium text-[#D0D0D0]">
          Rendimiento neto mensual previsto
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
            className="w-full border border-[#252525] bg-[#0A0A0A] px-3 py-2 pr-10 text-base text-white focus:border-[#D1FF26] focus:outline-none"
          />
          <span aria-hidden="true" className="absolute right-3 top-2 text-[#505050]">€</span>
        </div>
        <p className="mt-1 text-xs text-[#606060]">
          Ingresos menos gastos deducibles, en bruto mensual.
        </p>

        <div className="mt-5 space-y-2">
          <label htmlFor={tarifaId} className="flex items-center gap-2 text-sm text-[#D0D0D0]">
            <input
              id={tarifaId}
              type="checkbox"
              checked={tarifaPlana}
              onChange={(e) => { setTarifaPlana(e.target.checked); onTouch(); }}
              className="h-4 w-4 border-[#252525] text-[#D1FF26] focus:ring-[#D1FF26]"
            />
            Soy nuevo autónomo (aplicar tarifa plana 87 €/mes)
          </label>
        </div>

        {!tarifaPlana && (
          <div className="mt-5">
            <p className="mb-2 block text-sm font-medium text-[#D0D0D0]">¿Qué base de cotización quieres?</p>
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
                      ? "bg-[#D1FF26] text-[#0A0A0A]"
                      : "bg-[#1A1A1A] text-[#D0D0D0] hover:bg-[#252525]"
                  }`}
                >
                  {m === "minima" ? "Mínima" : m === "maxima" ? "Máxima" : "Personalizada"}
                </button>
              ))}
            </div>
            {modo === "personalizada" && (
              <div className="mt-3">
                <label htmlFor={baseCustomId} className="mb-1 block text-xs text-[#D0D0D0]">
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
                  className="w-full border border-[#252525] bg-[#0A0A0A] px-3 py-2 text-base text-white focus:border-[#D1FF26] focus:outline-none"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="border-2 border-[#D1FF26] bg-[#0F0F0F] p-5">
          <p className="tech-label text-[#D1FF26]">CUOTA MENSUAL</p>
          <p className="mt-1 font-display text-3xl text-[#D1FF26]">{eur(cuotaCalculada)}</p>
          <p className="mt-2 text-sm text-[#D0D0D0]">
            <strong className="text-white">{eur(anual)}</strong> al año
          </p>
        </div>

        <div className="border border-[#1A1A1A] bg-[#0F0F0F] p-5 text-sm">
          <p className="font-semibold text-white mb-2">Tu tramo</p>
          {tarifaPlana ? (
            <p className="text-[#D0D0D0]">
              Tarifa plana — 12 meses iniciales. Prorrogable 12 meses más si tu
              rendimiento neto anual queda por debajo del SMI.
            </p>
          ) : (
            <>
              <p className="text-[#D0D0D0]">{tramo.label}</p>
              <p className="text-[#606060] text-xs mt-1">
                {tramo.minIngresos > 0 && `Desde ${eur(tramo.minIngresos)} `}
                {tramo.maxIngresos
                  ? `hasta ${eur(tramo.maxIngresos)} /mes`
                  : "sin tope superior"}
              </p>
              <div className="mt-3 border-t border-[#1A1A1A] pt-3 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#606060]">Cuota mínima</span>
                  <span className="font-medium text-white">{eur(tramo.cuotaMin)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#606060]">Cuota máxima</span>
                  <span className="font-medium text-white">{eur(tramo.cuotaMax)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="lg:col-span-2 mt-2 overflow-x-auto border border-[#1A1A1A] bg-[#0F0F0F]">
        <table className="w-full text-sm">
          <caption className="sr-only">Tabla de los 15 tramos de cotización de autónomo 2025</caption>
          <thead className="bg-[#0A0A0A] text-xs uppercase text-[#D0D0D0]">
            <tr>
              <th scope="col" className="px-3 py-2 text-left">Tramo</th>
              <th scope="col" className="px-3 py-2 text-right">Rendimiento neto</th>
              <th scope="col" className="px-3 py-2 text-right">Cuota mín.</th>
              <th scope="col" className="px-3 py-2 text-right">Cuota máx.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]">
            {TRAMOS_2025.map((t) => {
              const active = t.numero === tramo.numero && !tarifaPlana;
              return (
                <tr key={t.numero} className={active ? "bg-[#0A0A0A]" : ""}>
                  <th scope="row" className="px-3 py-2 font-medium text-left text-white">{t.label}</th>
                  <td className="px-3 py-2 text-right text-[#D0D0D0]">
                    {t.minIngresos === 0 ? "≤" : "≥"} {eur(t.minIngresos)}
                    {t.maxIngresos ? ` – ${eur(t.maxIngresos)}` : "+"}
                  </td>
                  <td className="px-3 py-2 text-right text-white">{eur(t.cuotaMin)}</td>
                  <td className="px-3 py-2 text-right text-white">{eur(t.cuotaMax)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
