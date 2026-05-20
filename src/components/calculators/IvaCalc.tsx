"use client";

import { useId, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { aplicarIVA, calcularIVA303, quitarIVA, TIPOS_IVA, type TipoIVA } from "@/lib/iva";
import { eur } from "@/lib/format";

type Modo = "agregar" | "quitar" | "303";

const DEFAULTS = { importe: 100, tipo: "general" as TipoIVA, ivaRep: 2100, ivaSop: 800, compAnt: 0 };

export function IvaCalc() {
  const [modo, setModo] = useState<Modo>("agregar");
  const [importe, setImporte] = useState<number>(DEFAULTS.importe);
  const [tipo, setTipo] = useState<TipoIVA>(DEFAULTS.tipo);
  const [ivaRep, setIvaRep] = useState<number>(DEFAULTS.ivaRep);
  const [ivaSop, setIvaSop] = useState<number>(DEFAULTS.ivaSop);
  const [compAnt, setCompAnt] = useState<number>(DEFAULTS.compAnt);
  const [touched, setTouched] = useState<boolean>(false);

  const importeId = useId();

  const agregar = useMemo(() => aplicarIVA(importe, tipo), [importe, tipo]);
  const quitar = useMemo(() => quitarIVA(importe, tipo), [importe, tipo]);
  const m303 = useMemo(() => calcularIVA303(ivaRep, ivaSop, compAnt), [ivaRep, ivaSop, compAnt]);

  function reset() {
    setImporte(DEFAULTS.importe);
    setTipo(DEFAULTS.tipo);
    setIvaRep(DEFAULTS.ivaRep);
    setIvaSop(DEFAULTS.ivaSop);
    setCompAnt(DEFAULTS.compAnt);
    setTouched(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div role="tablist" aria-label="Modo de cálculo" className="flex flex-wrap gap-2">
          {(["agregar", "quitar", "303"] as Modo[]).map((m) => (
            <button
              key={m}
              onClick={() => setModo(m)}
              type="button"
              role="tab"
              aria-selected={modo === m}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                modo === m ? "bg-[#D1FF26] text-[#0A0A0A]" : "bg-[#1A1A1A] text-[#D0D0D0] hover:bg-[#252525]"
              }`}
            >
              {m === "agregar" ? "Añadir IVA" : m === "quitar" ? "Quitar IVA" : "Modelo 303 trimestral"}
            </button>
          ))}
        </div>
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

      {modo !== "303" ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="border border-[#1A1A1A] bg-[#0F0F0F] p-6 space-y-4">
            <div>
              <label htmlFor={importeId} className="mb-1 block text-sm font-medium text-[#D0D0D0]">
                {modo === "agregar" ? "Importe SIN IVA" : "Importe CON IVA"}
              </label>
              <div className="relative">
                <input
                  id={importeId}
                  type="number"
                  inputMode="decimal"
                  value={importe}
                  onChange={(e) => { setImporte(parseFloat(e.target.value) || 0); setTouched(true); }}
                  min={0}
                  step={1}
                  className="w-full border border-[#252525] bg-[#0A0A0A] px-3 py-2 pr-10 text-base text-white focus:border-[#D1FF26] focus:outline-none"
                />
                <span aria-hidden="true" className="absolute right-3 top-2 text-[#505050]">€</span>
              </div>
            </div>
            <div role="radiogroup" aria-label="Tipo de IVA">
              <p className="mb-2 block text-sm font-medium text-[#D0D0D0]">Tipo de IVA</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {(Object.keys(TIPOS_IVA) as TipoIVA[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTipo(t); setTouched(true); }}
                    type="button"
                    role="radio"
                    aria-checked={tipo === t}
                    className={`border px-3 py-2 text-sm transition-colors ${
                      tipo === t ? "border-[#D1FF26] bg-[#0A0A0A]" : "border-[#252525] hover:border-[#606060]"
                    }`}
                  >
                    <p className="font-medium capitalize text-white">{t}</p>
                    <p className="text-xs text-[#606060]">{(TIPOS_IVA[t] * 100).toFixed(0)}%</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-2 border-[#D1FF26] bg-[#0F0F0F] p-5 space-y-3">
            <div>
              <p className="tech-label text-[#D1FF26]">TOTAL</p>
              <p className="font-display text-3xl text-[#D1FF26]">
                {eur(modo === "agregar" ? agregar.total : quitar.total)}
              </p>
            </div>
            <div className="text-sm space-y-1 pt-3 border-t border-[#D1FF26]">
              <div className="flex justify-between"><span className="text-[#D0D0D0]">Base imponible</span><span className="font-semibold text-white">{eur(modo === "agregar" ? agregar.base : quitar.base)}</span></div>
              <div className="flex justify-between"><span className="text-[#D0D0D0]">IVA</span><span className="font-semibold text-white">{eur(modo === "agregar" ? agregar.iva : quitar.iva)}</span></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="border border-[#1A1A1A] bg-[#0F0F0F] p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="IVA repercutido (cobrado)" value={ivaRep} setValue={(v) => { setIvaRep(v); setTouched(true); }} suffix="€" />
              <Field label="IVA soportado (pagado)" value={ivaSop} setValue={(v) => { setIvaSop(v); setTouched(true); }} suffix="€" />
              <Field label="Compensación trimestres anteriores" value={compAnt} setValue={(v) => { setCompAnt(v); setTouched(true); }} suffix="€" />
            </div>
            <p className="text-xs text-[#606060]">
              IVA repercutido: el que has cobrado a tus clientes en facturas emitidas.<br />
              IVA soportado: el que has pagado en facturas recibidas y es deducible.
            </p>
          </div>
          <div className="border-2 border-[#D1FF26] bg-[#0F0F0F] p-5">
            <p className="tech-label text-[#D1FF26]">
              {m303.tipo === "ingresar" ? "A INGRESAR" : "A COMPENSAR / DEVOLVER"}
            </p>
            <p className="mt-1 font-display text-3xl text-[#D1FF26]">{eur(m303.resultado)}</p>
            <p className="mt-2 text-sm text-[#D0D0D0]">
              {m303.tipo === "ingresar"
                ? "Pago al Estado este trimestre"
                : "Saldo a favor para el siguiente trimestre"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, setValue, suffix }: { label: string; value: number; setValue: (n: number) => void; suffix?: string }) {
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
          step={10}
          className="w-full border border-[#252525] bg-[#0A0A0A] px-3 py-2 pr-10 text-base text-white focus:border-[#D1FF26] focus:outline-none"
        />
        {suffix && <span aria-hidden="true" className="absolute right-3 top-2 text-[#505050]">{suffix}</span>}
      </div>
    </div>
  );
}
