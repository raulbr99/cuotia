"use client";

import { useEffect, useMemo, useState } from "react";
import { calcularPagoFraccionado130 } from "@/lib/irpf";
import { calcularIRPFConCCAA, CCAA_NAMES, TRAMOS_CCAA_2025, type CCAA } from "@/lib/irpf-ccaa";
import { eur, pct } from "@/lib/format";

type Modo = "anual" | "trimestral";
const STORAGE_KEY = "calc-autonomo:ccaa";

export function IRPFCalc({ defaultCcaa = "madrid" as CCAA, lockCcaa = false }: { defaultCcaa?: CCAA; lockCcaa?: boolean } = {}) {
  const [modo, setModo] = useState<Modo>("anual");
  const [base, setBase] = useState<number>(30000);
  const [ccaa, setCcaa] = useState<CCAA>(defaultCcaa);
  const [ingresosTrim, setIngresosTrim] = useState<number>(15000);
  const [gastosTrim, setGastosTrim] = useState<number>(3000);
  const [retenciones, setRetenciones] = useState<number>(0);

  useEffect(() => {
    if (lockCcaa) return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved in CCAA_NAMES) setCcaa(saved as CCAA);
    } catch {}
  }, [lockCcaa]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, ccaa); } catch {}
  }, [ccaa]);

  const resultado = useMemo(() => calcularIRPFConCCAA(base, ccaa), [base, ccaa]);
  const pago130 = useMemo(
    () => calcularPagoFraccionado130(ingresosTrim, gastosTrim, retenciones),
    [ingresosTrim, gastosTrim, retenciones],
  );

  const ccaaOptions = (Object.keys(CCAA_NAMES) as CCAA[]).sort((a, b) => CCAA_NAMES[a].localeCompare(CCAA_NAMES[b]));

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex gap-2 flex-wrap">
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
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Base imponible anual
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
                <p className="text-xs text-gray-500 mt-1">Rendimiento neto anual (ingresos − gastos − cuota autónomo).</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comunidad Autónoma</label>
                <select
                  value={ccaa}
                  onChange={(e) => setCcaa(e.target.value as CCAA)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {ccaaOptions.map((c) => (
                    <option key={c} value={c}>{CCAA_NAMES[c]}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Cada CCAA aplica su propia escala autonómica.</p>
              </div>
            </div>

            {resultado.esRegimenForal ? (
              <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-5">
                <p className="font-semibold text-amber-900 mb-2">Régimen Foral</p>
                <p className="text-sm text-amber-800">
                  {ccaa === "navarra" ? "Navarra" : "País Vasco"} tiene régimen fiscal foral con sus propias
                  escalas y modelos. Consulta la Hacienda Foral correspondiente.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-600">
                    <tr>
                      <th className="px-3 py-2 text-left">Tramo (€)</th>
                      <th className="px-3 py-2 text-right">Estatal</th>
                      <th className="px-3 py-2 text-right">{CCAA_NAMES[ccaa]}</th>
                      <th className="px-3 py-2 text-right">Combinado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {TRAMOS_CCAA_2025[ccaa].map((t, i) => {
                      const estatalSameTramo = [
                        { hasta: 12450, tipo: 0.095 },
                        { hasta: 20200, tipo: 0.12 },
                        { hasta: 35200, tipo: 0.15 },
                        { hasta: 60000, tipo: 0.185 },
                        { hasta: 300000, tipo: 0.225 },
                        { hasta: null, tipo: 0.245 },
                      ];
                      const estTipo = estatalSameTramo.find((e) => e.hasta === null || (t.desde < (e.hasta ?? Infinity)))?.tipo || 0;
                      return (
                        <tr key={i}>
                          <td className="px-3 py-2 text-gray-700">
                            {eur(t.desde)} – {t.hasta ? eur(t.hasta) : "+"}
                          </td>
                          <td className="px-3 py-2 text-right text-gray-500">{pct(estTipo)}</td>
                          <td className="px-3 py-2 text-right font-medium">{pct(t.tipo)}</td>
                          <td className="px-3 py-2 text-right font-semibold text-emerald-700">{pct(estTipo + t.tipo)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
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
              <p className="text-xs text-gray-500 mt-1">15% en facturas a empresas (7% nuevos autónomos).</p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {modo === "anual" ? (
          resultado.esRegimenForal ? (
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-5">
              <p className="text-sm text-amber-900">
                Régimen Foral. Esta calculadora no aplica para Navarra o País Vasco.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5">
                <p className="text-xs uppercase tracking-wider text-emerald-700 font-medium">Cuota IRPF total</p>
                <p className="text-3xl font-bold text-emerald-900 mt-1">{eur(resultado.total)}</p>
                <p className="text-sm text-emerald-700 mt-2">
                  Tipo efectivo: <strong>{pct(resultado.tipoEfectivo)}</strong>
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Estatal</span>
                  <span className="font-medium">{eur(resultado.estatal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{CCAA_NAMES[ccaa]}</span>
                  <span className="font-medium">{eur(resultado.autonomico)}</span>
                </div>
                <div className="border-t border-gray-100 pt-2 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">{eur(resultado.total)}</span>
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5 text-xs text-gray-600">
                Cálculo combinado estatal + autonómico. No incluye mínimos personales,
                deducciones por hijos, planes de pensiones u otras circunstancias.
              </div>
            </>
          )
        ) : (
          <>
            <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5">
              <p className="text-xs uppercase tracking-wider text-emerald-700 font-medium">A pagar (modelo 130)</p>
              <p className="text-3xl font-bold text-emerald-900 mt-1">{eur(pago130)}</p>
              <p className="text-sm text-emerald-700 mt-2">20% sobre rendimiento neto – retenciones</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-600">
              Solo presentas modelo 130 si <strong>menos del 70%</strong> de tus ingresos
              llevan retención.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
