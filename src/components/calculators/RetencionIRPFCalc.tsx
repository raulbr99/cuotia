"use client";

import { useId, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { eur } from "@/lib/format";

const TIPOS: { id: string; label: string; tipo: number; desc: string }[] = [
  { id: "general", label: "15% — Actividad profesional general", tipo: 0.15, desc: "Profesionales (consultores, abogados, médicos, programadores...) facturando a empresas españolas." },
  { id: "nuevo", label: "7% — Nuevos autónomos", tipo: 0.07, desc: "Año de alta + 2 siguientes. Solo profesionales (epígrafe sección 2ª)." },
  { id: "arrendamiento", label: "19% — Arrendamiento de inmuebles", tipo: 0.19, desc: "Alquiler de locales y oficinas a empresas." },
  { id: "agricultura", label: "2% — Actividades agrícolas/ganaderas", tipo: 0.02, desc: "Régimen general; 1% para ganadería intensiva." },
  { id: "ninguna", label: "0% — Sin retención", tipo: 0, desc: "Facturas a particulares, intracomunitarias, o entre autónomos en algunos casos." },
];

const DEFAULTS = { importe: 1000, tipoId: "general", iva: 0.21 };

export function RetencionIRPFCalc() {
  const importeId = useId();
  const ivaId = useId();
  const [importe, setImporte] = useState<number>(DEFAULTS.importe);
  const [tipoId, setTipoId] = useState<string>(DEFAULTS.tipoId);
  const [iva, setIva] = useState<number>(DEFAULTS.iva);
  const [touched, setTouched] = useState<boolean>(false);

  const tipo = TIPOS.find((t) => t.id === tipoId) ?? TIPOS[0];

  const result = useMemo(() => {
    const base = importe;
    const ivaImporte = base * iva;
    const retencion = base * tipo.tipo;
    const total = base + ivaImporte - retencion;
    return { base, iva: ivaImporte, retencion, total };
  }, [importe, iva, tipo]);

  function reset() {
    setImporte(DEFAULTS.importe);
    setTipoId(DEFAULTS.tipoId);
    setIva(DEFAULTS.iva);
    setTouched(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-neutral-900">Datos de la factura</h3>
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

        <div>
          <label htmlFor={importeId} className="mb-1 block text-sm font-medium text-neutral-700">
            Base imponible de la factura
          </label>
          <div className="relative">
            <input
              id={importeId}
              type="number"
              inputMode="decimal"
              value={importe}
              onChange={(e) => { setImporte(parseFloat(e.target.value) || 0); setTouched(true); }}
              min={0}
              step={100}
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 pr-10 text-base text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
            />
            <span aria-hidden="true" className="absolute right-3 top-2 text-neutral-400">€</span>
          </div>
        </div>

        <div role="radiogroup" aria-label="Tipo de retención IRPF">
          <p className="mb-2 block text-sm font-medium text-neutral-700">Tipo de retención</p>
          <div className="grid gap-2">
            {TIPOS.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTipoId(t.id); setTouched(true); }}
                type="button"
                role="radio"
                aria-checked={tipoId === t.id}
                className={`text-left rounded-lg border p-3 transition-colors ${
                  tipoId === t.id
                    ? "border-[#B91C1C] bg-[#FEF2F2]"
                    : "border-neutral-300 hover:border-neutral-500"
                }`}
              >
                <p className="font-medium text-sm text-neutral-900">{t.label}</p>
                <p className="mt-1 text-xs text-neutral-600">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor={ivaId} className="mb-1 block text-sm font-medium text-neutral-700">
            IVA aplicado
          </label>
          <select
            id={ivaId}
            value={iva}
            onChange={(e) => { setIva(parseFloat(e.target.value)); setTouched(true); }}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
          >
            <option value={0.21}>21% — general</option>
            <option value={0.1}>10% — reducido</option>
            <option value={0.04}>4% — superreducido</option>
            <option value={0}>0% — exento / intracomunitario</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border-2 border-[#FECACA] bg-[#FEF2F2] p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">RECIBES (NETO)</p>
          <p className="mt-1 font-bold text-3xl text-[#B91C1C]">{eur(result.total)}</p>
          <p className="mt-2 text-sm text-neutral-700">
            tras IVA y retención IRPF
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-neutral-500">Base imponible</span>
            <span className="font-medium text-neutral-900">{eur(result.base)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">+ IVA ({(iva * 100).toFixed(0)}%)</span>
            <span className="font-medium text-neutral-900">+ {eur(result.iva)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">– Retención IRPF ({(tipo.tipo * 100).toFixed(0)}%)</span>
            <span className="font-medium text-[#B91C1C]">– {eur(result.retencion)}</span>
          </div>
          <div className="border-t border-neutral-200 pt-2 flex justify-between">
            <span className="font-semibold text-neutral-900">Total a recibir</span>
            <span className="font-bold text-neutral-900">{eur(result.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
