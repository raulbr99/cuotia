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
      <div className="border border-[#1A1A1A] bg-[#0F0F0F] p-6 space-y-5">
        <div className="flex items-center justify-between">
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

        <div>
          <label htmlFor="jub-base" className="mb-1 block text-sm font-medium text-[#D0D0D0]">
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
              className="w-full border border-[#252525] bg-[#0A0A0A] px-3 py-2 pr-10 text-base text-white focus:border-[#D1FF26] focus:outline-none"
            />
            <span aria-hidden="true" className="absolute right-3 top-2 text-[#505050]">€</span>
          </div>
          <p className="mt-1 text-xs text-[#606060]">
            Para 2027, se calcula la media de los últimos 25 años cotizados.
            Si has variado, usa la media aproximada.
          </p>
        </div>

        <div>
          <label htmlFor="jub-anos" className="mb-1 block text-sm font-medium text-[#D0D0D0]">
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
            className="w-full border border-[#252525] bg-[#0A0A0A] px-3 py-2 text-base text-white focus:border-[#D1FF26] focus:outline-none"
          />
          <p className="mt-1 text-xs text-[#606060]">
            Mínimo 15 años para tener derecho. 36 años 6 meses para cobrar el 100%.
          </p>
        </div>

        <div className="border border-[#252525] bg-[#0A0A0A] p-4 text-xs">
          <p className="tech-label mb-2 text-[#D0D0D0]">COEFFICIENTS // 2027</p>
          <ul className="list-disc list-inside text-[#D0D0D0] space-y-1">
            <li>15 años: 50%</li>
            <li>+0,21% por mes del año 16 al 35,67 (248 meses)</li>
            <li>+0,19% por mes del año 35,67 al 36,5</li>
            <li>Máximo: 100% con 36 años y 6 meses cotizados</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border-2 border-[#D1FF26] bg-[#0F0F0F] p-5">
          <p className="tech-label text-[#D1FF26]">PENSIÓN MENSUAL ESTIMADA</p>
          <p className="mt-1 font-display text-3xl text-[#D1FF26]">{eur(result.pension)}</p>
          <p className="mt-2 text-sm text-[#D0D0D0]">
            <strong className="text-white">{eur(result.pensionAnual)}</strong> al año (14 pagas)
          </p>
        </div>

        <div className="border border-[#1A1A1A] bg-[#0F0F0F] p-5 text-sm space-y-2">
          <div className="flex justify-between"><span className="text-[#606060]">Base reguladora</span><span className="font-medium text-white">{eur(result.baseReguladora)}</span></div>
          <div className="flex justify-between"><span className="text-[#606060]">% aplicado</span><span className="font-medium text-white">{pct(result.porcentaje)}</span></div>
          <div className="flex justify-between"><span className="text-[#606060]">Edad jubilación</span><span className="font-medium text-white">{result.edadJubilacion} años</span></div>
        </div>

        <div className="border-l-2 border-[#D1FF26] bg-[#0F0F0F] p-4 text-xs text-[#D0D0D0]">
          <p className="tech-label mb-2 text-[#D1FF26]">IMPORTANTE</p>
          Los autónomos que cotizaron por la base mínima durante toda su carrera tienen
          pensiones bajas. Aumentar tu base de cotización ahora mejora tu pensión futura.
        </div>
      </div>
    </div>
  );
}
