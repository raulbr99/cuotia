"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { calcularJubilacion } from "@/lib/jubilacion";
import { eur, pct } from "@/lib/format";

const DEFAULTS = { base: 1500, anos: 35 };

export function JubilacionCalc() {
  const [base, setBase] = useState<number>(DEFAULTS.base);
  const [anos, setAnos] = useState<number>(DEFAULTS.anos);
  const [touched, setTouched] = useState<boolean>(false);

  const result = useMemo(() => calcularJubilacion(base, anos), [base, anos]);

  function reset() {
    setBase(DEFAULTS.base);
    setAnos(DEFAULTS.anos);
    setTouched(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-5">
        <div className="flex items-center justify-between">
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

        <div>
          <label htmlFor="jub-base" className="mb-1 block text-sm font-medium text-neutral-700">
            Base de cotización media (últimos 25 años)
          </label>
          <div className="relative">
            <input
              id="jub-base"
              type="number"
              inputMode="decimal"
              value={base}
              onChange={(e) => { setBase(parseFloat(e.target.value) || 0); setTouched(true); }}
              min={0}
              step={50}
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 pr-10 text-base text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
            />
            <span aria-hidden="true" className="absolute right-3 top-2 text-neutral-400">€</span>
          </div>
          <p className="mt-1 text-xs text-neutral-500">
            Para 2027, se calcula la media de los últimos 25 años cotizados.
            Si has variado, usa la media aproximada.
          </p>
        </div>

        <div>
          <label htmlFor="jub-anos" className="mb-1 block text-sm font-medium text-neutral-700">
            Años cotizados al jubilarte
          </label>
          <input
            id="jub-anos"
            type="number"
            inputMode="decimal"
            value={anos}
            onChange={(e) => { setAnos(parseFloat(e.target.value) || 0); setTouched(true); }}
            step={0.5}
            min={0}
            max={45}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
          />
          <p className="mt-1 text-xs text-neutral-500">
            Mínimo 15 años para tener derecho. 36 años 6 meses para cobrar el 100%.
          </p>
        </div>

        <div className="rounded-lg border border-neutral-300 bg-white p-4 text-xs">
          <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-neutral-700">Coeficientes 2027</p>
          <ul className="list-disc list-inside text-neutral-700 space-y-1">
            <li>15 años: 50%</li>
            <li>+0,21% por mes del año 16 al 35,67 (248 meses)</li>
            <li>+0,19% por mes del año 35,67 al 36,5</li>
            <li>Máximo: 100% con 36 años y 6 meses cotizados</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-xl border-2 border-[#FECACA] bg-[#FEF2F2] p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">PENSIÓN MENSUAL ESTIMADA</p>
          <p className="mt-1 font-bold text-3xl text-[#B91C1C]">{eur(result.pension)}</p>
          <p className="mt-2 text-sm text-neutral-700">
            <strong className="text-neutral-900">{eur(result.pensionAnual)}</strong> al año (14 pagas)
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5 text-sm space-y-2">
          <div className="flex justify-between"><span className="text-neutral-500">Base reguladora</span><span className="font-medium text-neutral-900">{eur(result.baseReguladora)}</span></div>
          <div className="flex justify-between"><span className="text-neutral-500">% aplicado</span><span className="font-medium text-neutral-900">{pct(result.porcentaje)}</span></div>
          <div className="flex justify-between"><span className="text-neutral-500">Edad jubilación</span><span className="font-medium text-neutral-900">{result.edadJubilacion} años</span></div>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs text-neutral-700">
          <p className="text-sm font-semibold text-amber-900 mb-2">IMPORTANTE</p>
          Los autónomos que cotizaron por la base mínima durante toda su carrera tienen
          pensiones bajas. Aumentar tu base de cotización ahora mejora tu pensión futura.
        </div>
      </div>
    </div>
  );
}
