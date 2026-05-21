"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { calcularPagoFraccionado130 } from "@/lib/irpf";
import { calcularIRPFConCCAA, CCAA_NAMES, TRAMOS_CCAA_2025, type CCAA } from "@/lib/irpf-ccaa";
import { eur, pct } from "@/lib/format";

type Modo = "anual" | "trimestral";
const STORAGE_KEY = "cuotia:ccaa";

const DEFAULTS = { base: 30000, ingresosTrim: 15000, gastosTrim: 3000, retenciones: 0 };

export function IRPFCalc({ defaultCcaa = "madrid" as CCAA, lockCcaa = false }: { defaultCcaa?: CCAA; lockCcaa?: boolean } = {}) {
  const baseId = useId();
  const ccaaId = useId();
  const ingTrimId = useId();
  const gastosTrimId = useId();
  const retId = useId();

  const [modo, setModo] = useState<Modo>("anual");
  const [base, setBase] = useState<number>(DEFAULTS.base);
  const [ccaa, setCcaa] = useState<CCAA>(defaultCcaa);
  const [ingresosTrim, setIngresosTrim] = useState<number>(DEFAULTS.ingresosTrim);
  const [gastosTrim, setGastosTrim] = useState<number>(DEFAULTS.gastosTrim);
  const [retenciones, setRetenciones] = useState<number>(DEFAULTS.retenciones);
  const [touched, setTouched] = useState<boolean>(false);

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

  function reset() {
    setModo("anual");
    setBase(DEFAULTS.base);
    if (!lockCcaa) setCcaa(defaultCcaa);
    setIngresosTrim(DEFAULTS.ingresosTrim);
    setGastosTrim(DEFAULTS.gastosTrim);
    setRetenciones(DEFAULTS.retenciones);
    setTouched(false);
  }

  const onTouch = () => setTouched(true);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <div role="tablist" aria-label="Modo de cálculo" className="flex gap-2 flex-wrap">
            {(["anual", "trimestral"] as Modo[]).map((m) => (
              <button
                key={m}
                onClick={() => setModo(m)}
                type="button"
                role="tab"
                aria-selected={modo === m}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  modo === m ? "rounded-md bg-blue-600 text-white" : "rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {m === "anual" ? "IRPF anual" : "Pago fraccionado (modelo 130)"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {!touched && <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">EJEMPLO</span>}
            <button
              onClick={reset}
              type="button"
              aria-label="Restablecer valores"
              className="rounded-md border border-slate-300 p-1.5 text-slate-500 transition-colors hover:border-blue-500 hover:text-blue-600"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {modo === "anual" ? (
          <>
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label htmlFor={baseId} className="mb-1 block text-sm font-medium text-slate-700">
                  Base imponible anual
                </label>
                <div className="relative">
                  <input
                    id={baseId}
                    type="number"
                    inputMode="decimal"
                    value={base}
                    onChange={(e) => { setBase(parseFloat(e.target.value) || 0); onTouch(); }}
                    min={0}
                    step={500}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-base text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                  <span aria-hidden="true" className="absolute right-3 top-2 text-slate-400">€</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">Rendimiento neto anual (ingresos − gastos − cuota autónomo).</p>
              </div>
              <div>
                <label htmlFor={ccaaId} className="mb-1 block text-sm font-medium text-slate-700">Comunidad Autónoma</label>
                <select
                  id={ccaaId}
                  value={ccaa}
                  onChange={(e) => { setCcaa(e.target.value as CCAA); onTouch(); }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 focus:border-blue-500 focus:outline-none"
                >
                  <optgroup label="Régimen común">
                    {ccaaOptions.filter((c) => c !== "navarra" && c !== "pais-vasco").map((c) => (
                      <option key={c} value={c}>{CCAA_NAMES[c]}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Régimen foral">
                    {ccaaOptions.filter((c) => c === "navarra" || c === "pais-vasco").map((c) => (
                      <option key={c} value={c}>{CCAA_NAMES[c]}</option>
                    ))}
                  </optgroup>
                </select>
                <p className="mt-1 text-xs text-slate-500">Cada CCAA aplica su propia escala autonómica.</p>
              </div>
            </div>

            {resultado.esRegimenForal ? (
              <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
                <p className="font-semibold text-slate-900 mb-2">Régimen Foral</p>
                <p className="text-sm text-slate-700">
                  {ccaa === "navarra" ? "Navarra" : "País Vasco"} tiene régimen fiscal foral con sus propias
                  escalas y modelos. Consulta la Hacienda Foral correspondiente.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-200">
                <table className="w-full text-sm">
                  <caption className="sr-only">Tramos de IRPF estatal y autonómico para {CCAA_NAMES[ccaa]}</caption>
                  <thead className="bg-white text-xs uppercase text-slate-700">
                    <tr>
                      <th scope="col" className="px-3 py-2 text-left">Tramo (€)</th>
                      <th scope="col" className="px-3 py-2 text-right">Estatal</th>
                      <th scope="col" className="px-3 py-2 text-right">{CCAA_NAMES[ccaa]}</th>
                      <th scope="col" className="px-3 py-2 text-right">Combinado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
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
                          <th scope="row" className="px-3 py-2 text-left text-slate-700 font-normal">
                            {eur(t.desde)} – {t.hasta ? eur(t.hasta) : "+"}
                          </th>
                          <td className="px-3 py-2 text-right text-slate-500">{pct(estTipo)}</td>
                          <td className="px-3 py-2 text-right font-medium text-slate-900">{pct(t.tipo)}</td>
                          <td className="px-3 py-2 text-right font-semibold text-blue-600">{pct(estTipo + t.tipo)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor={ingTrimId} className="mb-1 block text-sm font-medium text-slate-700">Ingresos del trimestre</label>
              <input
                id={ingTrimId}
                type="number"
                inputMode="decimal"
                value={ingresosTrim}
                onChange={(e) => { setIngresosTrim(parseFloat(e.target.value) || 0); onTouch(); }}
                min={0}
                step={500}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor={gastosTrimId} className="mb-1 block text-sm font-medium text-slate-700">Gastos del trimestre</label>
              <input
                id={gastosTrimId}
                type="number"
                inputMode="decimal"
                value={gastosTrim}
                onChange={(e) => { setGastosTrim(parseFloat(e.target.value) || 0); onTouch(); }}
                min={0}
                step={500}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={retId} className="mb-1 block text-sm font-medium text-slate-700">Retenciones soportadas</label>
              <input
                id={retId}
                type="number"
                inputMode="decimal"
                value={retenciones}
                onChange={(e) => { setRetenciones(parseFloat(e.target.value) || 0); onTouch(); }}
                min={0}
                step={50}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 focus:border-blue-500 focus:outline-none"
              />
              <p className="mt-1 text-xs text-slate-500">15% en facturas a empresas (7% nuevos autónomos).</p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {modo === "anual" ? (
          resultado.esRegimenForal ? (
            <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
              <p className="text-sm text-slate-900">
                Régimen Foral. Esta calculadora no aplica para Navarra o País Vasco.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">CUOTA IRPF TOTAL</p>
                <p className="mt-1 font-bold text-3xl text-blue-600">{eur(resultado.total)}</p>
                <p className="mt-2 text-sm text-slate-700">
                  Tipo efectivo: <strong className="text-slate-900">{pct(resultado.tipoEfectivo)}</strong>
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Estatal</span>
                  <span className="font-medium text-slate-900">{eur(resultado.estatal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{CCAA_NAMES[ccaa]}</span>
                  <span className="font-medium text-slate-900">{eur(resultado.autonomico)}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="font-bold text-slate-900">{eur(resultado.total)}</span>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5 text-xs text-slate-700">
                Cálculo combinado estatal + autonómico. No incluye mínimos personales,
                deducciones por hijos, planes de pensiones u otras circunstancias.
              </div>
            </>
          )
        ) : (
          <>
            <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">A PAGAR (MODELO 130)</p>
              <p className="mt-1 font-bold text-3xl text-blue-600">{eur(pago130)}</p>
              <p className="mt-2 text-sm text-slate-700">20% sobre rendimiento neto – retenciones</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
              Solo presentas modelo 130 si <strong className="text-slate-900">menos del 70%</strong> de tus ingresos
              llevan retención.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
