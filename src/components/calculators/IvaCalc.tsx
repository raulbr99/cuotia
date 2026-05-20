"use client";

import { useMemo, useState } from "react";
import { aplicarIVA, calcularIVA303, quitarIVA, TIPOS_IVA, type TipoIVA } from "@/lib/iva";
import { eur } from "@/lib/format";

type Modo = "agregar" | "quitar" | "303";

export function IvaCalc() {
  const [modo, setModo] = useState<Modo>("agregar");
  const [importe, setImporte] = useState<number>(100);
  const [tipo, setTipo] = useState<TipoIVA>("general");
  const [ivaRep, setIvaRep] = useState<number>(2100);
  const [ivaSop, setIvaSop] = useState<number>(800);
  const [compAnt, setCompAnt] = useState<number>(0);

  const agregar = useMemo(() => aplicarIVA(importe, tipo), [importe, tipo]);
  const quitar = useMemo(() => quitarIVA(importe, tipo), [importe, tipo]);
  const m303 = useMemo(() => calcularIVA303(ivaRep, ivaSop, compAnt), [ivaRep, ivaSop, compAnt]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(["agregar", "quitar", "303"] as Modo[]).map((m) => (
          <button
            key={m}
            onClick={() => setModo(m)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              modo === m ? "bg-[#D1FF26] text-[#0A0A0A]" : "bg-[#1A1A1A] hover:bg-[#252525]"
            }`}
          >
            {m === "agregar" ? "Añadir IVA" : m === "quitar" ? "Quitar IVA" : "Modelo 303 trimestral"}
          </button>
        ))}
      </div>

      {modo !== "303" ? (
        <div className="grid gap-6 md:grid-cols-[1fr_320px]">
          <div className="rounded-xl border border-[#1A1A1A] bg-[#0F0F0F] p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                {modo === "agregar" ? "Importe SIN IVA" : "Importe CON IVA"}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={importe}
                  onChange={(e) => setImporte(parseFloat(e.target.value) || 0)}
                  step={1}
                  className="w-full rounded-lg border border-[#252525] px-3 py-2 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-[#D1FF26]"
                />
                <span className="absolute right-3 top-2 text-[#505050]">€</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de IVA</label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {(Object.keys(TIPOS_IVA) as TipoIVA[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTipo(t)}
                    className={`rounded-lg border px-3 py-2 text-sm ${
                      tipo === t ? "border-[#D1FF26] bg-[#0F0F0F]" : "border-[#1A1A1A]"
                    }`}
                  >
                    <p className="font-medium capitalize">{t}</p>
                    <p className="text-xs text-[#606060]">{(TIPOS_IVA[t] * 100).toFixed(0)}%</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-xl border-2 border-[#D1FF26] bg-[#0F0F0F] p-5 space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#D1FF26] font-medium">Total</p>
              <p className="text-3xl font-bold text-[#D1FF26]">
                {eur(modo === "agregar" ? agregar.total : quitar.total)}
              </p>
            </div>
            <div className="text-sm space-y-1 pt-3 border-t border-[#D1FF26]">
              <div className="flex justify-between"><span>Base imponible</span><span className="font-semibold">{eur(modo === "agregar" ? agregar.base : quitar.base)}</span></div>
              <div className="flex justify-between"><span>IVA</span><span className="font-semibold">{eur(modo === "agregar" ? agregar.iva : quitar.iva)}</span></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-[1fr_320px]">
          <div className="rounded-xl border border-[#1A1A1A] bg-[#0F0F0F] p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="IVA repercutido (cobrado)" value={ivaRep} setValue={setIvaRep} suffix="€" />
              <Field label="IVA soportado (pagado)" value={ivaSop} setValue={setIvaSop} suffix="€" />
              <Field label="Compensación trimestres anteriores" value={compAnt} setValue={setCompAnt} suffix="€" />
            </div>
            <p className="text-xs text-[#606060]">
              IVA repercutido: el que has cobrado a tus clientes en facturas emitidas.<br />
              IVA soportado: el que has pagado en facturas recibidas y es deducible.
            </p>
          </div>
          <div className="rounded-xl border-2 border-[#D1FF26] bg-[#0F0F0F] p-5">
            <p className="text-xs uppercase tracking-wider text-[#D1FF26] font-medium">
              {m303.tipo === "ingresar" ? "A ingresar" : "A compensar/devolver"}
            </p>
            <p className="text-3xl font-bold text-[#D1FF26] mt-1">{eur(m303.resultado)}</p>
            <p className="text-sm text-[#D1FF26] mt-2">
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
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
          step={10}
          className="w-full rounded-lg border border-[#252525] px-3 py-2 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-[#D1FF26]"
        />
        {suffix && <span className="absolute right-3 top-2 text-[#505050]">{suffix}</span>}
      </div>
    </div>
  );
}
