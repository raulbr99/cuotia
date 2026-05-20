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
        <div className="border border-[#1A1A1A] bg-[#0F0F0F] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg uppercase tracking-tight text-white">Tipo de despido</h3>
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
                    ? "border-[#D1FF26] bg-[#0A0A0A]"
                    : "border-[#252525] hover:border-[#606060]"
                }`}
              >
                <p className="font-medium text-sm text-white">{t.label}</p>
                <p className="mt-1 text-xs text-[#606060]">{t.help}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="border border-[#1A1A1A] bg-[#0F0F0F] p-6 space-y-4">
          <h3 className="font-display text-lg uppercase tracking-tight text-white">Indemnización por despido</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Salario bruto anual" value={salarioAnual} setValue={(v) => { setSalarioAnual(v); onTouch(); }} step={500} suffix="€" />
            <Field label="Años trabajados" value={anos} setValue={(v) => { setAnos(v); onTouch(); }} step={0.5} max={45} />
          </div>
        </div>

        <div className="border border-[#1A1A1A] bg-[#0F0F0F] p-6 space-y-4">
          <h3 className="font-display text-lg uppercase tracking-tight text-white">Finiquito (independiente del despido)</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Días de vacaciones no disfrutadas" value={diasVac} setValue={(v) => { setDiasVac(v); onTouch(); }} step={1} max={365} />
            <Field label="Días pendientes paga extra prorrateada" value={diasExtra} setValue={(v) => { setDiasExtra(v); onTouch(); }} step={1} max={365} help="Si cobras prorrateado, 0" />
            <Field label="Salario pendiente de cobrar" value={salarioPendiente} setValue={(v) => { setSalarioPendiente(v); onTouch(); }} step={50} suffix="€" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border-2 border-[#D1FF26] bg-[#0F0F0F] p-5">
          <p className="tech-label text-[#D1FF26]">TOTAL A COBRAR (BRUTO)</p>
          <p className="mt-1 font-display text-3xl text-[#D1FF26]">{eur(total)}</p>
        </div>

        <div className="border border-[#1A1A1A] bg-[#0F0F0F] p-5 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-[#606060]">Indemnización</span>
            <span className="font-semibold text-white">{eur(despido.indemnizacion)}</span>
          </div>
          <div className="text-xs text-[#606060]">
            {despido.diasIndemnizacion.toFixed(0)} días · ≈ {despido.mensualidades.toFixed(1)} mensualidades
            {despido.topeMensualidades > 0 && ` · tope ${despido.topeMensualidades}`}
          </div>
          <div className="border-t border-[#1A1A1A] pt-2 flex justify-between">
            <span className="text-[#606060]">Vacaciones no disfrutadas</span>
            <span className="font-semibold text-white">{eur(finiquito.vacaciones)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#606060]">Paga extra prorrateada</span>
            <span className="font-semibold text-white">{eur(finiquito.extra)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#606060]">Salario pendiente</span>
            <span className="font-semibold text-white">{eur(finiquito.salarioPendiente)}</span>
          </div>
        </div>

        <div className="border-l-2 border-[#D1FF26] bg-[#0F0F0F] p-4 text-xs text-[#D0D0D0]">
          <p className="tech-label mb-2 text-[#D1FF26]">IMPORTANTE</p>
          La indemnización por despido improcedente o causas objetivas está
          <strong className="text-white"> exenta de IRPF</strong> hasta el límite de 180.000 €.
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
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-[#D0D0D0]">{label}</label>
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
          className="w-full border border-[#252525] bg-[#0A0A0A] px-3 py-2 pr-10 text-base text-white focus:border-[#D1FF26] focus:outline-none"
        />
        {suffix && <span aria-hidden="true" className="absolute right-3 top-2 text-[#505050]">{suffix}</span>}
      </div>
      {help && <p className="mt-1 text-xs text-[#606060]">{help}</p>}
    </div>
  );
}
