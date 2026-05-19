"use client";

import { useMemo, useState } from "react";
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

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-3">
          <h3 className="text-base font-semibold">Kilometraje</h3>
          <Field label={`Kilómetros recorridos (${KM_RATE} €/km)`} value={km} setValue={setKm} step={10} suffix="km" />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-3">
          <h3 className="text-base font-semibold">Dietas (manutención)</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label={`España sin pernocta (${eur(DIETA_LIMITS.espanaSinPernocta)}/día)`} value={esSin} setValue={setEsSin} suffix="días" />
            <Field label={`España con pernocta (${eur(DIETA_LIMITS.espanaConPernocta)}/día)`} value={esCon} setValue={setEsCon} suffix="días" />
            <Field label={`Extranjero sin pernocta (${eur(DIETA_LIMITS.extranjeroSinPernocta)}/día)`} value={exSin} setValue={setExSin} suffix="días" />
            <Field label={`Extranjero con pernocta (${eur(DIETA_LIMITS.extranjeroConPernocta)}/día)`} value={exCon} setValue={setExCon} suffix="días" />
          </div>
          <p className="text-xs text-gray-500">
            Límites exentos de IRPF. Si los superas, el exceso tributa como rendimiento.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5">
          <p className="text-xs uppercase tracking-wider text-emerald-700 font-medium">Total deducible</p>
          <p className="text-3xl font-bold text-emerald-900 mt-1">{eur(total)}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 text-sm space-y-2">
          <div className="flex justify-between"><span className="text-gray-500">Kilometraje</span><span className="font-semibold">{eur(kmTotal)}</span></div>
          {dieta.desglose.filter((d) => d.dias > 0).map((d) => (
            <div key={d.concepto} className="flex justify-between text-xs">
              <span className="text-gray-500">{d.concepto} ({d.dias}d)</span>
              <span className="font-medium">{eur(d.subtotal)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, setValue, step = 1, suffix }: { label: string; value: number; setValue: (n: number) => void; step?: number; suffix?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
          step={step}
          min={0}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {suffix && <span className="absolute right-3 top-2 text-gray-400 text-xs">{suffix}</span>}
      </div>
    </div>
  );
}
