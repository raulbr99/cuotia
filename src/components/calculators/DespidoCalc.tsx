"use client";

import { useMemo, useState } from "react";
import { calcularDespido, calcularFiniquito, type TipoDespido } from "@/lib/despido";
import { eur } from "@/lib/format";

const TIPOS: { id: TipoDespido; label: string; help: string }[] = [
  { id: "improcedente", label: "Improcedente", help: "33 días/año, máx 24 mensualidades. El más común si demandas y ganas." },
  { id: "objetivo", label: "Objetivo / Causas", help: "20 días/año, máx 12 mensualidades. Económicas, técnicas u organizativas." },
  { id: "colectivo", label: "Colectivo (ERE)", help: "20 días/año, máx 12 mensualidades. Negociación con representantes." },
  { id: "procedente", label: "Procedente disciplinario", help: "Sin indemnización (solo finiquito)." },
];

export function DespidoCalc() {
  const [tipo, setTipo] = useState<TipoDespido>("improcedente");
  const [salarioAnual, setSalarioAnual] = useState<number>(30000);
  const [anos, setAnos] = useState<number>(5);
  const [diasVac, setDiasVac] = useState<number>(15);
  const [diasExtra, setDiasExtra] = useState<number>(45);
  const [salarioPendiente, setSalarioPendiente] = useState<number>(0);

  const despido = useMemo(() => calcularDespido(salarioAnual, anos, tipo), [salarioAnual, anos, tipo]);
  const finiquito = useMemo(() => calcularFiniquito(salarioAnual, diasVac, diasExtra, salarioPendiente), [salarioAnual, diasVac, diasExtra, salarioPendiente]);
  const total = despido.indemnizacion + finiquito.total;

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-base font-semibold mb-4">Tipo de despido</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {TIPOS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTipo(t.id)}
                className={`text-left rounded-lg border p-3 transition-all ${
                  tipo === t.id
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <p className="font-medium text-sm">{t.label}</p>
                <p className="text-xs text-gray-500 mt-1">{t.help}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
          <h3 className="text-base font-semibold">Indemnización por despido</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Salario bruto anual" value={salarioAnual} setValue={setSalarioAnual} step={500} suffix="€" />
            <Field label="Años trabajados" value={anos} setValue={setAnos} step={0.5} />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
          <h3 className="text-base font-semibold">Finiquito (independiente del despido)</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Días de vacaciones no disfrutadas" value={diasVac} setValue={setDiasVac} step={1} />
            <Field label="Días pendientes paga extra prorrateada" value={diasExtra} setValue={setDiasExtra} step={1} help="Si cobras prorrateado, 0" />
            <Field label="Salario pendiente de cobrar" value={salarioPendiente} setValue={setSalarioPendiente} step={50} suffix="€" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5">
          <p className="text-xs uppercase tracking-wider text-emerald-700 font-medium">Total a cobrar (bruto)</p>
          <p className="text-3xl font-bold text-emerald-900 mt-1">{eur(total)}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Indemnización</span>
            <span className="font-semibold">{eur(despido.indemnizacion)}</span>
          </div>
          <div className="text-xs text-gray-400">
            {despido.diasIndemnizacion.toFixed(0)} días · ≈ {despido.mensualidades.toFixed(1)} mensualidades
            {despido.topeMensualidades > 0 && ` · tope ${despido.topeMensualidades}`}
          </div>
          <div className="border-t border-gray-100 pt-2 flex justify-between">
            <span className="text-gray-500">Vacaciones no disfrutadas</span>
            <span className="font-semibold">{eur(finiquito.vacaciones)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Paga extra prorrateada</span>
            <span className="font-semibold">{eur(finiquito.extra)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Salario pendiente</span>
            <span className="font-semibold">{eur(finiquito.salarioPendiente)}</span>
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
          <strong>Importante:</strong> la indemnización por despido improcedente o causas
          objetivas está <strong>exenta de IRPF</strong> hasta el límite de 180.000 €.
          El finiquito sí tributa.
        </div>
      </div>
    </div>
  );
}

function Field({
  label, value, setValue, step = 1, suffix, help,
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  step?: number;
  suffix?: string;
  help?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
          min={0}
          step={step}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {suffix && <span className="absolute right-3 top-2 text-gray-400">{suffix}</span>}
      </div>
      {help && <p className="text-xs text-gray-500 mt-1">{help}</p>}
    </div>
  );
}
