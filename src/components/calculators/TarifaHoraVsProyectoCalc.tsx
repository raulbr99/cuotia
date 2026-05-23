"use client";

import { useId, useMemo, useState } from "react";
import { RotateCcw, TrendingUp, TrendingDown } from "lucide-react";
import { calcularComparativa } from "@/lib/tarifa";
import { eur } from "@/lib/format";

const DEFAULTS = {
  tarifaHora: 40,
  horasMes: 120,
  precioProyecto: 3000,
  horasProyecto: 50,
  proyectosMes: 2,
};

export function TarifaHoraVsProyectoCalc() {
  const id = {
    tarifa: useId(),
    horasMes: useId(),
    precio: useId(),
    horasProy: useId(),
    proyMes: useId(),
  };

  const [tarifaHora, setTarifaHora] = useState<number>(DEFAULTS.tarifaHora);
  const [horasMes, setHorasMes] = useState<number>(DEFAULTS.horasMes);
  const [precioProyecto, setPrecioProyecto] = useState<number>(DEFAULTS.precioProyecto);
  const [horasProyecto, setHorasProyecto] = useState<number>(DEFAULTS.horasProyecto);
  const [proyectosMes, setProyectosMes] = useState<number>(DEFAULTS.proyectosMes);
  const [touched, setTouched] = useState<boolean>(false);

  const r = useMemo(
    () => calcularComparativa({
      tarifaHora,
      horasMes,
      precioProyecto,
      horasProyecto,
      proyectosMes,
    }),
    [tarifaHora, horasMes, precioProyecto, horasProyecto, proyectosMes],
  );

  function reset() {
    setTarifaHora(DEFAULTS.tarifaHora);
    setHorasMes(DEFAULTS.horasMes);
    setPrecioProyecto(DEFAULTS.precioProyecto);
    setHorasProyecto(DEFAULTS.horasProyecto);
    setProyectosMes(DEFAULTS.proyectosMes);
    setTouched(false);
  }

  const onTouch = () => setTouched(true);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Modo HORA */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-neutral-900">A · Tarifa por hora</h3>
            {!touched && <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B91C1C]">EJEMPLO</span>}
          </div>

          <Field
            id={id.tarifa}
            label="Tu tarifa hora actual"
            value={tarifaHora}
            onChange={(v) => { setTarifaHora(v); onTouch(); }}
            suffix="€/h"
            step={5}
          />
          <Field
            id={id.horasMes}
            label="Horas facturables al mes"
            value={horasMes}
            onChange={(v) => { setHorasMes(v); onTouch(); }}
            suffix="h"
            step={10}
            help="Las horas que cobras realmente, no las trabajadas"
          />
        </div>

        {/* Modo PROYECTO */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-neutral-900">B · Precio cerrado por proyecto</h3>
            <button
              onClick={reset}
              type="button"
              aria-label="Restablecer valores"
              className="rounded-md border border-neutral-300 p-1.5 text-neutral-500 transition-colors hover:border-[#B91C1C] hover:text-[#B91C1C]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          <Field
            id={id.precio}
            label="Precio por proyecto"
            value={precioProyecto}
            onChange={(v) => { setPrecioProyecto(v); onTouch(); }}
            suffix="€"
            step={500}
          />
          <Field
            id={id.horasProy}
            label="Horas reales por proyecto"
            value={horasProyecto}
            onChange={(v) => { setHorasProyecto(v); onTouch(); }}
            suffix="h"
            step={5}
            help="Incluye reuniones, revisiones, retrabajos"
          />
          <Field
            id={id.proyMes}
            label="Proyectos cerrados/mes"
            value={proyectosMes}
            onChange={(v) => { setProyectosMes(v); onTouch(); }}
            suffix="proy"
            step={1}
          />
        </div>
      </div>

      {/* RESULTADO */}
      <div className="grid gap-4 sm:grid-cols-3">
        <ResultCard
          label="Facturación anual A · Hora"
          value={eur(r.hora.facturacionAnual)}
          sub={`${eur(r.hora.facturacionMes)}/mes · ${r.hora.horasAnuales.toFixed(0)} h/año`}
          highlight={r.ganadorFacturacion === "hora"}
        />
        <ResultCard
          label="Facturación anual B · Proyecto"
          value={eur(r.proyecto.facturacionAnual)}
          sub={`${eur(r.proyecto.facturacionMes)}/mes · ${r.proyecto.horasAnuales.toFixed(0)} h/año`}
          highlight={r.ganadorFacturacion === "proyecto"}
        />
        <div className={`rounded-xl border-2 p-5 ${r.diferenciaAnual >= 0 ? "border-[#FECACA] bg-[#FEF2F2]" : "border-amber-200 bg-amber-50"}`}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">
            {r.diferenciaAnual >= 0 ? "Proyecto gana" : "Hora gana"}
          </p>
          <p className="mt-1 font-bold text-2xl flex items-center gap-2 text-[#B91C1C]">
            {r.diferenciaAnual >= 0 ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
            {eur(Math.abs(r.diferenciaAnual))}
          </p>
          <p className="mt-2 text-sm text-neutral-700">
            de diferencia anual
          </p>
        </div>
      </div>

      {/* RATES EFECTIVOS */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h4 className="font-bold text-base text-neutral-900 mb-4">Rate efectivo por hora</h4>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-neutral-500 mb-1">A · Tarifa hora</p>
            <p className="font-serif text-3xl text-neutral-900">{eur(r.hora.rateEfectivo)}/h</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 mb-1">
              B · Proyecto ({eur(r.proyecto.rateEfectivo)} ÷ {horasProyecto}h)
            </p>
            <p className={`font-serif text-3xl ${r.proyecto.rateEfectivo > r.hora.rateEfectivo ? "text-[#B91C1C]" : "text-neutral-900"}`}>
              {eur(r.proyecto.rateEfectivo)}/h
            </p>
          </div>
        </div>
        <div className="mt-5 border-t border-neutral-200 pt-4">
          <p className="text-sm text-neutral-700">
            <strong className="text-neutral-900">Breakeven</strong>: si el proyecto te lleva más de{" "}
            <strong className="text-[#B91C1C]">{r.breakevenHoras.toFixed(1)} horas</strong>{" "}
            (= {eur(precioProyecto)} ÷ {eur(tarifaHora)}/h), tu rate efectivo baja por debajo de tu tarifa hora actual.
          </p>
          {r.diferenciaHorasMes !== 0 && (
            <p className="mt-2 text-sm text-neutral-700">
              Trabajas <strong className={r.diferenciaHorasMes > 0 ? "text-amber-700" : "text-[#B91C1C]"}>
                {r.diferenciaHorasMes > 0 ? "+" : ""}{Math.abs(r.diferenciaHorasMes).toFixed(0)} horas {r.diferenciaHorasMes > 0 ? "más" : "menos"}
              </strong>{" "}
              al mes con el modelo proyecto.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  id, label, value, onChange, suffix, step = 1, help,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (n: number) => void;
  suffix?: string;
  step?: number;
  help?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-neutral-700">{label}</label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          min={0}
          step={step}
          className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 pr-14 text-base text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
        />
        {suffix && <span aria-hidden="true" className="absolute right-3 top-2 text-xs text-neutral-400">{suffix}</span>}
      </div>
      {help && <p className="mt-1 text-xs text-neutral-500">{help}</p>}
    </div>
  );
}

function ResultCard({ label, value, sub, highlight }: { label: string; value: string; sub: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border p-5 ${highlight ? "border-[#B91C1C] bg-[#FEF2F2]" : "border-neutral-200 bg-white"}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{label}</p>
      <p className={`mt-1 font-serif text-2xl ${highlight ? "text-[#B91C1C]" : "text-neutral-900"}`}>{value}</p>
      <p className="mt-2 text-xs text-neutral-500">{sub}</p>
    </div>
  );
}
