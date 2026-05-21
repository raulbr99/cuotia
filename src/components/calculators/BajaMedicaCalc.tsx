"use client";

import { useId, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { type ContingenciaBaja } from "@/lib/baja-medica";
import { eur } from "@/lib/format";

const DEFAULTS: { base: number; contingencia: ContingenciaBaja; diasBaja: number } = {
  base: 1166.7,
  contingencia: "comun",
  diasBaja: 30,
};

export function BajaMedicaCalc() {
  const baseId = useId();
  const diasId = useId();

  const [base, setBase] = useState<number>(DEFAULTS.base);
  const [contingencia, setContingencia] = useState<ContingenciaBaja>(DEFAULTS.contingencia);
  const [diasBaja, setDiasBaja] = useState<number>(DEFAULTS.diasBaja);
  const [touched, setTouched] = useState<boolean>(false);

  const totalEstimado = useMemo(() => {
    const baseDiaria = base / 30;
    if (contingencia === "comun") {
      const dias1a3 = Math.min(diasBaja, 3);
      const dias4a20 = Math.max(0, Math.min(diasBaja, 20) - 3);
      const dias21mas = Math.max(0, diasBaja - 20);
      return dias1a3 * 0 + dias4a20 * baseDiaria * 0.6 + dias21mas * baseDiaria * 0.75;
    }
    return diasBaja * baseDiaria * 0.75;
  }, [diasBaja, base, contingencia]);

  function reset() {
    setBase(DEFAULTS.base);
    setContingencia(DEFAULTS.contingencia);
    setDiasBaja(DEFAULTS.diasBaja);
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
          <label htmlFor={baseId} className="mb-1 block text-sm font-medium text-neutral-700">
            Base de cotización mensual
          </label>
          <div className="relative">
            <input
              id={baseId}
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
            La que figura en tu RETA. Mínima 2025: 1.166,70 €. Máxima: 4.909,50 €.
          </p>
        </div>

        <div role="radiogroup" aria-label="Tipo de baja">
          <p className="mb-2 block text-sm font-medium text-neutral-700">Tipo de baja</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {(["comun", "profesional"] as ContingenciaBaja[]).map((c) => (
              <button
                key={c}
                onClick={() => { setContingencia(c); setTouched(true); }}
                type="button"
                role="radio"
                aria-checked={contingencia === c}
                className={`text-left border p-3 transition-colors ${
                  contingencia === c
                    ? "border-[#B91C1C] bg-white"
                    : "border-neutral-300 hover:border-[#606060]"
                }`}
              >
                <p className="font-medium text-sm text-neutral-900">
                  {c === "comun" ? "Enfermedad común" : "Accidente laboral / profesional"}
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  {c === "comun"
                    ? "Días 1-3: 0% · 4-20: 60% · 21+: 75%"
                    : "Desde día 1: 75%"}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor={diasId} className="mb-1 block text-sm font-medium text-neutral-700">
            Duración estimada de la baja (días)
          </label>
          <input
            id={diasId}
            type="number"
            inputMode="numeric"
            value={diasBaja}
            onChange={(e) => {
              const parsed = parseInt(e.target.value, 10);
              setDiasBaja(isNaN(parsed) ? 0 : parsed);
              setTouched(true);
            }}
            step={1}
            min={0}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border-2 border-[#FECACA] bg-[#FEF2F2] p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">PRESTACIÓN ESTIMADA TOTAL</p>
          <p className="mt-1 font-bold text-3xl text-[#B91C1C]">{eur(totalEstimado)}</p>
          <p className="mt-2 text-sm text-neutral-700">para {diasBaja} días</p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5 text-sm space-y-2">
          <p className="font-semibold text-neutral-900 mb-2">Por tramo (diario)</p>
          {contingencia === "comun" ? (
            <>
              <div className="flex justify-between"><span className="text-neutral-700">Días 1-3</span><span className="font-medium text-neutral-900">{eur(0)}</span></div>
              <div className="flex justify-between"><span className="text-neutral-700">Días 4-20 (60%)</span><span className="font-medium text-neutral-900">{eur((base / 30) * 0.6)}</span></div>
              <div className="flex justify-between"><span className="text-neutral-700">Días 21+ (75%)</span><span className="font-medium text-neutral-900">{eur((base / 30) * 0.75)}</span></div>
            </>
          ) : (
            <div className="flex justify-between"><span className="text-neutral-700">Diario (75%)</span><span className="font-medium text-neutral-900">{eur((base / 30) * 0.75)}</span></div>
          )}
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs text-neutral-700">
          <p className="text-sm font-semibold text-amber-900 mb-2">IMPORTANTE</p>
          La cobertura por cese de actividad debe estar contratada (es obligatoria desde 2019).
          Te paga la mutua, no la SS directamente.
        </div>
      </div>
    </div>
  );
}
