"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { Plus, Trash2, Printer, Save, RotateCcw } from "lucide-react";
import { calcularInvoice, emptyInvoice, type InvoiceData, type InvoiceItem, type InvoiceParty } from "@/lib/invoice";
import { TIPOS_IVA, type TipoIVA } from "@/lib/iva";
import { eur } from "@/lib/format";

const STORAGE_KEY = "cuotia:invoice";
const EMISOR_KEY = "cuotia:emisor";

export function InvoiceGenerator() {
  const [data, setData] = useState<InvoiceData>(emptyInvoice());

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setData(JSON.parse(saved));
      else {
        const emisor = localStorage.getItem(EMISOR_KEY);
        if (emisor) setData((d) => ({ ...d, emisor: JSON.parse(emisor) }));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }, [data]);

  const totals = useMemo(() => calcularInvoice(data), [data]);

  function updateParty(key: "emisor" | "cliente", field: keyof InvoiceParty, value: string) {
    setData((d) => ({ ...d, [key]: { ...d[key], [field]: value } }));
  }

  function updateItem(idx: number, field: keyof InvoiceItem, value: string | number) {
    setData((d) => ({
      ...d,
      items: d.items.map((it, i) => (i === idx ? { ...it, [field]: value } : it)),
    }));
  }

  function addItem() {
    setData((d) => ({
      ...d,
      items: [...d.items, { descripcion: "", cantidad: 1, precioUnitario: 0, tipoIVA: "general" }],
    }));
  }

  function removeItem(idx: number) {
    setData((d) => ({ ...d, items: d.items.filter((_, i) => i !== idx) }));
  }

  function saveEmisor() {
    try {
      localStorage.setItem(EMISOR_KEY, JSON.stringify(data.emisor));
      alert("Datos de emisor guardados. Se cargarán automáticamente la próxima vez.");
    } catch {}
  }

  function reset() {
    if (confirm("¿Borrar y empezar nueva factura? Los datos de emisor se mantienen.")) {
      try {
        const emisor = localStorage.getItem(EMISOR_KEY);
        const fresh = emptyInvoice();
        if (emisor) fresh.emisor = JSON.parse(emisor);
        setData(fresh);
      } catch {
        setData(emptyInvoice());
      }
    }
  }

  function printInvoice() {
    window.print();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2 print:grid-cols-1">
      {/* FORM SIDE — hidden on print */}
      <div className="space-y-5 print:hidden">
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg text-neutral-900">Datos de la factura</h2>
            <button
              onClick={reset}
              type="button"
              aria-label="Nueva factura"
              title="Nueva factura"
              className="rounded-md border border-neutral-300 p-1.5 text-neutral-500 transition-colors hover:border-[#B91C1C] hover:text-[#B91C1C]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Número" value={data.numero} onChange={(v) => setData((d) => ({ ...d, numero: v }))} />
            <Field label="Fecha emisión" type="date" value={data.fechaEmision} onChange={(v) => setData((d) => ({ ...d, fechaEmision: v }))} />
            <Field label="Fecha vencimiento (opcional)" type="date" value={data.fechaVencimiento || ""} onChange={(v) => setData((d) => ({ ...d, fechaVencimiento: v }))} />
            <Field label="Retención IRPF (%)" type="number" value={String(data.retencionIRPF)} onChange={(v) => setData((d) => ({ ...d, retencionIRPF: parseFloat(v) || 0 }))} />
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg text-neutral-900">Emisor (tú)</h2>
            <button
              onClick={saveEmisor}
              type="button"
              className="inline-flex items-center gap-1 text-xs text-[#B91C1C] transition-colors hover:opacity-80"
            >
              <Save className="h-3 w-3" /> Recordar
            </button>
          </div>
          <PartyForm party={data.emisor} onChange={(f, v) => updateParty("emisor", f, v)} />
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <h2 className="mb-3 font-bold text-lg text-neutral-900">Cliente</h2>
          <PartyForm party={data.cliente} onChange={(f, v) => updateParty("cliente", f, v)} />
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg text-neutral-900">Líneas de factura</h2>
            <button
              onClick={addItem}
              type="button"
              className="inline-flex items-center gap-1 rounded-md bg-[#B91C1C] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
            >
              <Plus className="h-3 w-3" /> Añadir línea
            </button>
          </div>
          <div className="space-y-3">
            {data.items.map((it, i) => (
              <InvoiceItemRow
                key={i}
                item={it}
                index={i}
                canRemove={data.items.length > 1}
                onUpdate={(field, value) => updateItem(i, field, value)}
                onRemove={() => removeItem(i)}
              />
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <NotasField value={data.notas || ""} onChange={(v) => setData((d) => ({ ...d, notas: v }))} />
        </div>

        <button
          onClick={printInvoice}
          type="button"
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#B91C1C] py-3 font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
        >
          <Printer className="h-5 w-5" />
          Imprimir o guardar como PDF
        </button>
      </div>

      {/* PREVIEW — always shown on print */}
      <div className="print:col-span-2">
        <div id="invoice-preview" className="rounded-xl border border-neutral-200 bg-white p-6 print:p-0 print:border-0">
          <header className="flex items-start justify-between mb-8 pb-6 border-b border-neutral-200">
            <div>
              <h1 className="font-bold text-2xl text-neutral-900">FACTURA</h1>
              <p className="text-sm text-neutral-500 mt-1">Nº {data.numero || "—"}</p>
            </div>
            <div className="text-right text-sm">
              <p className="text-neutral-500">Fecha emisión</p>
              <p className="font-semibold text-neutral-900">{formatDate(data.fechaEmision)}</p>
              {data.fechaVencimiento && (
                <>
                  <p className="text-neutral-500 mt-2">Vencimiento</p>
                  <p className="font-semibold text-neutral-900">{formatDate(data.fechaVencimiento)}</p>
                </>
              )}
            </div>
          </header>

          <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">DE</p>
              <PartyView p={data.emisor} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">PARA</p>
              <PartyView p={data.cliente} />
            </div>
          </div>

          <table className="w-full text-sm mb-6">
            <caption className="sr-only">Detalle de líneas de factura</caption>
            <thead>
              <tr className="border-b border-neutral-200">
                <th scope="col" className="text-left py-2 font-semibold text-neutral-900">Descripción</th>
                <th scope="col" className="text-right py-2 font-semibold text-neutral-900 w-20">Cant.</th>
                <th scope="col" className="text-right py-2 font-semibold text-neutral-900 w-24">Precio</th>
                <th scope="col" className="text-right py-2 font-semibold text-neutral-900 w-16">IVA</th>
                <th scope="col" className="text-right py-2 font-semibold text-neutral-900 w-28">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((it, i) => {
                const subtotal = it.cantidad * it.precioUnitario;
                return (
                  <tr key={i} className="border-b border-neutral-200">
                    <td className="py-2 text-neutral-700">{it.descripcion || "—"}</td>
                    <td className="text-right py-2 text-neutral-700">{it.cantidad}</td>
                    <td className="text-right py-2 text-neutral-700">{eur(it.precioUnitario)}</td>
                    <td className="text-right py-2 text-neutral-700">{(TIPOS_IVA[it.tipoIVA] * 100).toFixed(0)}%</td>
                    <td className="text-right py-2 font-medium text-neutral-900">{eur(subtotal)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="text-xs text-neutral-700">
              {data.notas && (
                <>
                  <p className="font-semibold text-neutral-900 mb-1">Notas</p>
                  <p className="whitespace-pre-wrap">{data.notas}</p>
                </>
              )}
            </div>
            <div className="text-sm space-y-1">
              <div className="flex justify-between"><span className="text-neutral-500">Base imponible</span><span className="font-medium text-neutral-900">{eur(totals.base)}</span></div>
              {Object.entries(totals.desgloseIva).map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs text-neutral-500">
                  <span>IVA {k} sobre {eur(v.base)}</span>
                  <span>{eur(v.iva)}</span>
                </div>
              ))}
              <div className="flex justify-between"><span className="text-neutral-500">Total IVA</span><span className="font-medium text-neutral-900">{eur(totals.totalIva)}</span></div>
              {data.retencionIRPF > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Retención IRPF ({data.retencionIRPF}%)</span>
                  <span className="font-medium">– {eur(totals.retencion)}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t border-neutral-200 text-base font-bold">
                <span className="text-neutral-900">TOTAL</span>
                <span className="text-[#B91C1C]">{eur(totals.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvoiceItemRow({
  item, index, canRemove, onUpdate, onRemove,
}: {
  item: InvoiceItem;
  index: number;
  canRemove: boolean;
  onUpdate: (field: keyof InvoiceItem, value: string | number) => void;
  onRemove: () => void;
}) {
  const descId = useId();
  const qtyId = useId();
  const priceId = useId();
  const ivaId = useId();
  const lineLabel = `línea ${index + 1}`;

  return (
    <div className="grid grid-cols-12 gap-2 items-end">
      <div className="col-span-12">
        <label htmlFor={descId} className="sr-only">Descripción {lineLabel}</label>
        <input
          id={descId}
          type="text"
          value={item.descripcion}
          onChange={(e) => onUpdate("descripcion", e.target.value)}
          placeholder="Concepto"
          className="w-full rounded-md border border-neutral-300 bg-white px-2 py-1.5 text-sm text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
        />
      </div>
      <div className="col-span-3">
        <label htmlFor={qtyId} className="sr-only">Cantidad {lineLabel}</label>
        <input
          id={qtyId}
          type="number"
          inputMode="decimal"
          value={item.cantidad}
          onChange={(e) => onUpdate("cantidad", parseFloat(e.target.value) || 0)}
          step={0.01}
          min={0}
          placeholder="Cant."
          className="w-full rounded-md border border-neutral-300 bg-white px-2 py-1.5 text-sm text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
        />
      </div>
      <div className="col-span-4">
        <label htmlFor={priceId} className="sr-only">Precio unitario {lineLabel}</label>
        <input
          id={priceId}
          type="number"
          inputMode="decimal"
          value={item.precioUnitario}
          onChange={(e) => onUpdate("precioUnitario", parseFloat(e.target.value) || 0)}
          step={0.01}
          min={0}
          placeholder="€ / unidad"
          className="w-full rounded-md border border-neutral-300 bg-white px-2 py-1.5 text-sm text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
        />
      </div>
      <div className="col-span-4">
        <label htmlFor={ivaId} className="sr-only">Tipo de IVA {lineLabel}</label>
        <select
          id={ivaId}
          value={item.tipoIVA}
          onChange={(e) => onUpdate("tipoIVA", e.target.value as TipoIVA)}
          className="w-full rounded-md border border-neutral-300 bg-white px-2 py-1.5 text-sm text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
        >
          {(Object.keys(TIPOS_IVA) as TipoIVA[]).map((t) => (
            <option key={t} value={t}>{t} ({(TIPOS_IVA[t] * 100).toFixed(0)}%)</option>
          ))}
        </select>
      </div>
      <div className="col-span-1">
        {canRemove && (
          <button
            onClick={onRemove}
            type="button"
            aria-label={`Eliminar ${lineLabel}`}
            title="Eliminar línea"
            className="rounded-md border border-neutral-300 p-1.5 text-red-600 transition-colors hover:border-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function NotasField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-neutral-700">Notas (opcional)</label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        placeholder="Condiciones de pago, IBAN, etc."
        className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
      />
    </>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs text-neutral-700">{label}</label>
      <input
        id={id}
        type={type}
        inputMode={type === "number" ? "decimal" : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-neutral-300 bg-white px-2 py-1.5 text-sm text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
      />
    </div>
  );
}

function PartyForm({ party, onChange }: { party: InvoiceParty; onChange: (field: keyof InvoiceParty, value: string) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Field label="Nombre o razón social" value={party.nombre} onChange={(v) => onChange("nombre", v)} />
      <Field label="NIF / CIF" value={party.nif} onChange={(v) => onChange("nif", v)} />
      <div className="sm:col-span-2">
        <Field label="Dirección" value={party.direccion} onChange={(v) => onChange("direccion", v)} />
      </div>
      <Field label="Código postal" value={party.cp} onChange={(v) => onChange("cp", v)} />
      <Field label="Ciudad" value={party.ciudad} onChange={(v) => onChange("ciudad", v)} />
      <Field label="Email (opcional)" type="email" value={party.email || ""} onChange={(v) => onChange("email", v)} />
      <Field label="Teléfono (opcional)" value={party.telefono || ""} onChange={(v) => onChange("telefono", v)} />
    </div>
  );
}

function PartyView({ p }: { p: InvoiceParty }) {
  return (
    <div className="text-sm">
      <p className="font-semibold text-neutral-900">{p.nombre || "—"}</p>
      <p className="text-neutral-700">NIF: {p.nif || "—"}</p>
      <p className="text-neutral-700">{p.direccion || "—"}</p>
      <p className="text-neutral-700">{[p.cp, p.ciudad].filter(Boolean).join(" ") || "—"}</p>
      {p.email && <p className="text-neutral-500 text-xs mt-1">{p.email}</p>}
      {p.telefono && <p className="text-neutral-500 text-xs">{p.telefono}</p>}
    </div>
  );
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
}
