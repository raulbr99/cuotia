"use client";

import { useId, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { calcularDespido, calcularFiniquito, type TipoDespido } from "@/lib/despido";
import { eur } from "@/lib/format";

const TIPOS: { id: TipoDespido; label: string; help: string }[] = [
  { id: "improcedente", label: "Improcedente", help: "33 días/año, máx 24 mensualidades. El más común si demandas y ganas." },
  { id: "objetivo", label: "Objetivo / Causas", help: "20 días/año, máx 12 mensualidades. Económicas, técnicas u organizativas." },
  { id: "colectivo", label: "Colectivo (ERE)", help: "20 días/año, máx 12 mensualidades. Negociación con representantes." },
  { id: "procedente", label: "Procedente disciplinario", help: "Sin indemnización (solo finiquito)." },
];

const DEFAULTS = {
  tipo: "improcedente" as TipoDespido,
  salarioAnual: 30000,
  anos: 5,
  diasVac: 15,
  diasExtra: 45,
  salarioPendiente: 0,
};

export function DespidoCalc() {
  const [tipo, setTipo] = useState<TipoDespido>(DEFAULTS.tipo);
  const [salarioAnual, setSalarioAnual] = useState<number>(DEFAULTS.salarioAnual);
  const [anos, setAnos] = useState<number>(DEFAULTS.anos);
  const [diasVac, setDiasVac] = useState<number>(DEFAULTS.diasVac);
  const [diasExtra, setDiasExtra] = useState<number>(DEFAULTS.diasExtra);
  const [salarioPendiente, setSalarioPendiente] = useState<number>(DEFAULTS.salarioPendiente);
  const [touched, setTouched] = useState<boolean>(false);

  const despido = useMemo(() => calcularDespido(salarioAnual, anos, tipo), [salarioAnual, anos, tipo]);
  const finiquito = useMemo(() => calcularFiniquito(salarioAnual, diasVac, diasExtra, salarioPendiente), [salarioAnual, diasVac, diasExtra, salarioPendiente]);
  const total = despido.indemnizacion + finiquito.total;

  function reset() {
    setTipo(DEFAULTS.tipo);
    setSalarioAnual(DEFAULTS.salarioAnual);
    setAnos(DEFAULTS.anos);
    setDiasVac(DEFAULTS.diasVac);
    setDiasExtra(DEFAULTS.diasExtra);
    setSalarioPendiente(DEFAULTS.salarioPendiente);
    setTouched(false);
  }

  const onTouch = () => setTouched(true);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-neutral-900">Tipo de despido</h3>
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
          <div role="radiogroup" aria-label="Tipo de despido" className="grid gap-2 sm:grid-cols-2">
            {TIPOS.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTipo(t.id); onTouch(); }}
                type="button"
                role="radio"
                aria-checked={tipo === t.id}
                className={`text-left border p-3 transition-colors ${
                  tipo === t.id
                    ? "border-[#B91C1C] bg-white"
                    : "border-neutral-300 hover:border-[#606060]"
                }`}
              >
                <p className="font-medium text-sm text-neutral-900">{t.label}</p>
                <p className="mt-1 text-xs text-neutral-500">{t.help}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-4">
          <h3 className="font-bold text-lg text-neutral-900">Indemnización por despido</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Salario bruto anual" value={salarioAnual} setValue={(v) => { setSalarioAnual(v); onTouch(); }} step={500} suffix="€" />
            <Field label="Años trabajados" value={anos} setValue={(v) => { setAnos(v); onTouch(); }} step={0.5} max={45} />
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-4">
          <h3 className="font-bold text-lg text-neutral-900">Finiquito (independiente del despido)</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Días de vacaciones no disfrutadas" value={diasVac} setValue={(v) => { setDiasVac(v); onTouch(); }} step={1} max={365} />
            <Field label="Días pendientes paga extra prorrateada" value={diasExtra} setValue={(v) => { setDiasExtra(v); onTouch(); }} step={1} max={365} help="Si cobras prorrateado, 0" />
            <Field label="Salario pendiente de cobrar" value={salarioPendiente} setValue={(v) => { setSalarioPendiente(v); onTouch(); }} step={50} suffix="€" />
          </div>
        </div>
      </div>

      <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-xl border-2 border-[#FECACA] bg-[#FEF2F2] p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">TOTAL A COBRAR (BRUTO)</p>
          <p className="mt-1 font-bold text-3xl text-[#B91C1C]">{eur(total)}</p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-neutral-500">Indemnización</span>
            <span className="font-semibold text-neutral-900">{eur(despido.indemnizacion)}</span>
          </div>
          <div className="text-xs text-neutral-500">
            {despido.diasIndemnizacion.toFixed(0)} días · ≈ {despido.mensualidades.toFixed(1)} mensualidades
            {despido.topeMensualidades > 0 && ` · tope ${despido.topeMensualidades}`}
          </div>
          <div className="border-t border-neutral-200 pt-2 flex justify-between">
            <span className="text-neutral-500">Vacaciones no disfrutadas</span>
            <span className="font-semibold text-neutral-900">{eur(finiquito.vacaciones)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Paga extra prorrateada</span>
            <span className="font-semibold text-neutral-900">{eur(finiquito.extra)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Salario pendiente</span>
            <span className="font-semibold text-neutral-900">{eur(finiquito.salarioPendiente)}</span>
          </div>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs text-neutral-700">
          <p className="text-sm font-semibold text-amber-900 mb-2">IMPORTANTE</p>
          La indemnización por despido improcedente o causas objetivas está
          <strong className="text-neutral-900"> exenta de IRPF</strong> hasta el límite de 180.000 €.
          El finiquito sí tributa.
        </div>
      </div>
    </div>
  );
}

function Field({
  label, value, setValue, step = 1, suffix, help, max,
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  step?: number;
  suffix?: string;
  help?: string;
  max?: number;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-neutral-700">{label}</label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
          min={0}
          max={max}
          step={step}
          className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 pr-10 text-base text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
        />
        {suffix && <span aria-hidden="true" className="absolute right-3 top-2 text-neutral-400">{suffix}</span>}
      </div>
      {help && <p className="mt-1 text-xs text-neutral-500">{help}</p>}
    </div>
  );
}
