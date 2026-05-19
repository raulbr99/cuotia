"use client";

import { useMemo, useState } from "react";
import { calcularIRPFAnual, calcularPagoFraccionado130, TRAMOS_IRPF_ESTATAL_2025 } from "@/lib/irpf";
import { eur, pct } from "@/lib/format";

type Modo = "anual" | "trimestral";

export function IRPFCalc() {
  const [modo, setModo] = useState<Modo>("anual");
  const [base, setBase] = useState<number>(30000);
  const [ingresosTrim, setIngresosTrim] = useState<number>(15000);
  const [gastosTrim, setGastosTrim] = useState<number>(3000);
  const [retenciones, setRetenciones] = useState<number>(0);

  const resultadoAnual = useMemo(() => calcularIRPFAnual(base), [base]);
  const pago130 = useMemo(
    () => calcularPagoFraccionado130(ingresosTrim, gastosTrim, retenciones),
    [ingresosTrim, gastosTrim, retenciones],
  );

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex gap-2">
          {(["anual", "trimestral"] as Modo[]).map((m) => (
            <button
              key={m}
              onClick={() => setModo(m)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                modo === m ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {m === "anual" ? "IRPF anual" : "Pago fraccionado (modelo 130)"}
            </button>
          ))}
        </div>

        {modo === "anual" ? (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Base imponible anual (rendimiento neto)
            </label>
            <div className="relative">
              <input
                type="number"
                value={base}
                onChange={(e) => setBase(parseFloat(e.target.value) || 0)}
                min={0}
                step={500}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="absolute right-3 top-2 text-gray-400">€</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Ingresos brutos del año menos gastos deducibles y cuota autónomo.
            </p>

            <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-600">
                  <tr>
                    <th className="px-3 py-2 text-left">Tramo</th>
                    <th className="px-3 py-2 text-right">Tipo</th>
                    <th className="px-3 py-2 text-right">Base en tramo</th>
                    <th className="px-3 py-2 text-right">Cuota</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {TRAMOS_IRPF_ESTATAL_2025.map((t) => {
                    const item = resultadoAnual.desglose.find((d) => d.tramo === t);
                    return (
                      <tr key={t.desde} className={item ? "bg-emerald-50" : ""}>
                        <td className="px-3 py-2 text-gray-700">
                          {eur(t.desde)} – {t.hasta ? eur(t.hasta) : "+"}
                        </td>
                        <td className="px-3 py-2 text-right">{pct(t.tipo)}</td>
                        <td className="px-3 py-2 text-right text-gray-600">
                          {item ? eur(item.baseEnTramo) : "—"}
                        </td>
                        <td className="px-3 py-2 text-right font-medium">
                          {item ? eur(item.cuotaTramo) : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ingresos del trimestre</label>
                <input
                  type="number"
                  value={ingresosTrim}
                  onChange={(e) => setIngresosTrim(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gastos del trimestre</label>
                <input
                  type="number"
                  value={gastosTrim}
                  onChange={(e) => setGastosTrim(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Retenciones soportadas</label>
                <input
                  type="number"
                  value={retenciones}
                  onChange={(e) => setRetenciones(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Si facturas a empresas, te retienen el 15% (7% nuevos autónomos).
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="space-y-4">
        {modo === "anual" ? (
          <>
            <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5">
              <p className="text-xs uppercase tracking-wider text-emerald-700 font-medium">Cuota IRPF anual</p>
              <p className="text-3xl font-bold text-emerald-900 mt-1">{eur(resultadoAnual.cuota)}</p>
              <p className="text-sm text-emerald-700 mt-2">
                Tipo efectivo: <strong>{pct(resultadoAnual.tipoEfectivo)}</strong>
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-600">
              <p>
                Cálculo orientativo con la escala <strong>estatal</strong>. El IRPF real
                añade la escala autonómica (varía por CCAA), mínimos personales y
                deducciones.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5">
              <p className="text-xs uppercase tracking-wider text-emerald-700 font-medium">
                A pagar (modelo 130)
              </p>
              <p className="text-3xl font-bold text-emerald-900 mt-1">{eur(pago130)}</p>
              <p className="text-sm text-emerald-700 mt-2">
                20% sobre rendimiento neto – retenciones
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-600">
              Solo presentas modelo 130 si <strong>menos del 70%</strong> de tus
              ingresos llevan retención.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
