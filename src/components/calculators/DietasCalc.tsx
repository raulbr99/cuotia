"use client";

import { useId, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { calcularDieta, calcularKilometraje, DIETA_LIMITS, KM_RATE } from "@/lib/dietas";
import { eur } from "@/lib/format";

export function DietasCalc() {
  const [km, setKm] = useState<number>(0);
  const [esSin, setEsSin] = useState<number>(0);
  const [esCon, setEsCon] = useState<number>(0);
  const [exSin, setExSin] = useState<number>(0);
  const [exCon, setExCon] = useState<number>(0);

  const kmTotal = useMemo(() => calcularKilometraje(km), [km]);
  const dieta = useMemo(() => calcularDieta(esSin, esCon, exSin, exCon), [esSin, esCon, exSin, exCon]);
  const total = kmTotal + dieta.total;

  function reset() {
    setKm(0); setEsSin(0); setEsCon(0); setExSin(0); setExCon(0);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-neutral-900">Kilometraje</h3>
            <button
              onClick={reset}
              type="button"
              aria-label="Restablecer todos los valores"
              className="rounded-md border border-neutral-300 p-1.5 text-neutral-500 transition-colors hover:border-[#B91C1C] hover:text-[#B91C1C]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
          <Field label={`Kilómetros recorridos (${KM_RATE} €/km)`} value={km} setValue={setKm} step={10} suffix="km" />
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-3">
          <h3 className="font-bold text-lg text-neutral-900">Dietas (manutención)</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label={`España sin pernocta (${eur(DIETA_LIMITS.espanaSinPernocta)}/día)`} value={esSin} setValue={setEsSin} suffix="días" />
            <Field label={`España con pernocta (${eur(DIETA_LIMITS.espanaConPernocta)}/día)`} value={esCon} setValue={setEsCon} suffix="días" />
            <Field label={`Extranjero sin pernocta (${eur(DIETA_LIMITS.extranjeroSinPernocta)}/día)`} value={exSin} setValue={setExSin} suffix="días" />
            <Field label={`Extranjero con pernocta (${eur(DIETA_LIMITS.extranjeroConPernocta)}/día)`} value={exCon} setValue={setExCon} suffix="días" />
          </div>
          <p className="text-xs text-neutral-500">
            Límites exentos de IRPF. Si los superas, el exceso tributa como rendimiento.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border-2 border-[#FECACA] bg-[#FEF2F2] p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">TOTAL DEDUCIBLE</p>
          <p className="mt-1 font-bold text-3xl text-[#B91C1C]">{eur(total)}</p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5 text-sm space-y-2">
          <div className="flex justify-between"><span className="text-neutral-500">Kilometraje</span><span className="font-semibold text-neutral-900">{eur(kmTotal)}</span></div>
          {dieta.desglose.filter((d) => d.dias > 0).map((d) => (
            <div key={d.concepto} className="flex justify-between text-xs">
              <span className="text-neutral-500">{d.concepto} ({d.dias}d)</span>
              <span className="font-medium text-neutral-900">{eur(d.subtotal)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, setValue, step = 1, suffix }: { label: string; value: number; setValue: (n: number) => void; step?: number; suffix?: string }) {
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
          step={step}
          min={0}
          className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 pr-12 text-base text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
        />
        {suffix && <span aria-hidden="true" className="absolute right-3 top-2 text-xs text-neutral-400">{suffix}</span>}
      </div>
    </div>
  );
}
