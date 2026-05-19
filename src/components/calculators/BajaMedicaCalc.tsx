"use client";

import { useMemo, useState } from "react";
import { calcularBajaMedica, type ContingenciaBaja } from "@/lib/baja-medica";
import { eur, pct } from "@/lib/format";

export function BajaMedicaCalc() {
  const [base, setBase] = useState<number>(1166.7);
  const [contingencia, setContingencia] = useState<ContingenciaBaja>("comun");
  const [diasBaja, setDiasBaja] = useState<number>(30);

  const result = useMemo(() => calcularBajaMedica(base, contingencia), [base, contingencia]);

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

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Base de cotización mensual</label>
          <div className="relative">
            <input
              type="number"
              value={base}
              onChange={(e) => setBase(parseFloat(e.target.value) || 0)}
              step={50}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute right-3 top-2 text-gray-400">€</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            La que figura en tu RETA. Mínima 2025: 1.166,70 €. Máxima: 4.909,50 €.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tipo de baja</label>
          <div className="grid grid-cols-2 gap-2">
            {(["comun", "profesional"] as ContingenciaBaja[]).map((c) => (
              <button
                key={c}
                onClick={() => setContingencia(c)}
                className={`text-left rounded-lg border p-3 ${
                  contingencia === c
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <p className="font-medium text-sm">
                  {c === "comun" ? "Enfermedad común" : "Accidente laboral / profesional"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {c === "comun"
                    ? "Días 1-3: 0% · 4-20: 60% · 21+: 75%"
                    : "Desde día 1: 75%"}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Duración estimada de la baja (días)</label>
          <input
            type="number"
            value={diasBaja}
            onChange={(e) => setDiasBaja(parseInt(e.target.value) || 0)}
            step={1}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5">
          <p className="text-xs uppercase tracking-wider text-emerald-700 font-medium">Prestación estimada total</p>
          <p className="text-3xl font-bold text-emerald-900 mt-1">{eur(totalEstimado)}</p>
          <p className="text-sm text-emerald-700 mt-2">para {diasBaja} días</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 text-sm space-y-2">
          <p className="font-semibold mb-2">Por tramo (diario)</p>
          {contingencia === "comun" ? (
            <>
              <div className="flex justify-between"><span>Días 1-3</span><span className="font-medium">{eur(0)}</span></div>
              <div className="flex justify-between"><span>Días 4-20 (60%)</span><span className="font-medium">{eur((base / 30) * 0.6)}</span></div>
              <div className="flex justify-between"><span>Días 21+ (75%)</span><span className="font-medium">{eur((base / 30) * 0.75)}</span></div>
            </>
          ) : (
            <div className="flex justify-between"><span>Diario (75%)</span><span className="font-medium">{eur((base / 30) * 0.75)}</span></div>
          )}
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
          La cobertura por cese de actividad debe estar contratada (es obligatoria desde 2019).
          Te paga la mutua, no la SS directamente.
        </div>
      </div>
    </div>
  );
}
