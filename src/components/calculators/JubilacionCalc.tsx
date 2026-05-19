"use client";

import { useMemo, useState } from "react";
import { calcularJubilacion } from "@/lib/jubilacion";
import { eur, pct } from "@/lib/format";

export function JubilacionCalc() {
  const [base, setBase] = useState<number>(1500);
  const [anos, setAnos] = useState<number>(35);

  const result = useMemo(() => calcularJubilacion(base, anos), [base, anos]);

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">
            Base de cotización media (últimos 25 años)
          </label>
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
            Para 2027, se calcula la media de los últimos 25 años cotizados.
            Si has variado, usa la media aproximada.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Años cotizados al jubilarte</label>
          <input
            type="number"
            value={anos}
            onChange={(e) => setAnos(parseFloat(e.target.value) || 0)}
            step={0.5}
            min={0}
            max={40}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Mínimo 15 años para tener derecho. 36 años 6 meses para cobrar el 100%.
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-4 text-xs space-y-1">
          <p className="font-semibold">Coeficientes 2027:</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>15 años: 50%</li>
            <li>+0,21% por mes del año 16 al 35,67 (248 meses)</li>
            <li>+0,19% por mes del año 35,67 al 36,5</li>
            <li>Máximo: 100% con 36 años y 6 meses cotizados</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5">
          <p className="text-xs uppercase tracking-wider text-emerald-700 font-medium">Pensión mensual estimada</p>
          <p className="text-3xl font-bold text-emerald-900 mt-1">{eur(result.pension)}</p>
          <p className="text-sm text-emerald-700 mt-2">
            <strong>{eur(result.pensionAnual)}</strong> al año (14 pagas)
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 text-sm space-y-2">
          <div className="flex justify-between"><span className="text-gray-500">Base reguladora</span><span className="font-medium">{eur(result.baseReguladora)}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">% aplicado</span><span className="font-medium">{pct(result.porcentaje)}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Edad jubilación</span><span className="font-medium">{result.edadJubilacion} años</span></div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
          <strong>Cuidado:</strong> los autónomos que cotizaron por la base mínima
          durante toda su carrera tienen pensiones bajas. Aumentar tu base de
          cotización ahora mejora tu pensión futura.
        </div>
      </div>
    </div>
  );
}
