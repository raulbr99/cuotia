"use client";

import { useEffect, useMemo, useState } from "react";
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
        <div className="rounded-xl border border-[#1A1A1A] bg-[#0F0F0F] p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-base">Datos de la factura</h2>
            <div className="flex gap-1">
              <button onClick={reset} title="Nueva factura" className="rounded-md p-1.5 text-[#606060] hover:bg-[#1A1A1A] hover:text-[#A0A0A0]">
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Número" value={data.numero} onChange={(v) => setData((d) => ({ ...d, numero: v }))} />
            <Field label="Fecha emisión" type="date" value={data.fechaEmision} onChange={(v) => setData((d) => ({ ...d, fechaEmision: v }))} />
            <Field label="Fecha vencimiento (opcional)" type="date" value={data.fechaVencimiento || ""} onChange={(v) => setData((d) => ({ ...d, fechaVencimiento: v }))} />
            <Field label="Retención IRPF (%)" type="number" value={String(data.retencionIRPF)} onChange={(v) => setData((d) => ({ ...d, retencionIRPF: parseFloat(v) || 0 }))} />
          </div>
        </div>

        <div className="rounded-xl border border-[#1A1A1A] bg-[#0F0F0F] p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-base">Emisor (tú)</h2>
            <button onClick={saveEmisor} className="text-xs text-[#D1FF26] hover:text-[#D1FF26] inline-flex items-center gap-1">
              <Save className="h-3 w-3" /> Recordar
            </button>
          </div>
          <PartyForm party={data.emisor} onChange={(f, v) => updateParty("emisor", f, v)} />
        </div>

        <div className="rounded-xl border border-[#1A1A1A] bg-[#0F0F0F] p-5">
          <h2 className="font-bold text-base mb-3">Cliente</h2>
          <PartyForm party={data.cliente} onChange={(f, v) => updateParty("cliente", f, v)} />
        </div>

        <div className="rounded-xl border border-[#1A1A1A] bg-[#0F0F0F] p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-base">Líneas de factura</h2>
            <button onClick={addItem} className="text-xs bg-[#D1FF26] text-[#0A0A0A] rounded-md px-3 py-1.5 hover:opacity-90 inline-flex items-center gap-1">
              <Plus className="h-3 w-3" /> Añadir línea
            </button>
          </div>
          <div className="space-y-3">
            {data.items.map((it, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-12">
                  <input
                    type="text"
                    value={it.descripcion}
                    onChange={(e) => updateItem(i, "descripcion", e.target.value)}
                    placeholder="Concepto"
                    className="w-full rounded-md border border-[#252525] px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D1FF26]"
                  />
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    value={it.cantidad}
                    onChange={(e) => updateItem(i, "cantidad", parseFloat(e.target.value) || 0)}
                    step={0.01}
                    min={0}
                    placeholder="Cant."
                    className="w-full rounded-md border border-[#252525] px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D1FF26]"
                  />
                </div>
                <div className="col-span-4">
                  <input
                    type="number"
                    value={it.precioUnitario}
                    onChange={(e) => updateItem(i, "precioUnitario", parseFloat(e.target.value) || 0)}
                    step={0.01}
                    min={0}
                    placeholder="€ / unidad"
                    className="w-full rounded-md border border-[#252525] px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D1FF26]"
                  />
                </div>
                <div className="col-span-4">
                  <select
                    value={it.tipoIVA}
                    onChange={(e) => updateItem(i, "tipoIVA", e.target.value as TipoIVA)}
                    className="w-full rounded-md border border-[#252525] px-2 py-1.5 text-sm bg-[#0F0F0F] focus:outline-none focus:ring-1 focus:ring-[#D1FF26]"
                  >
                    {(Object.keys(TIPOS_IVA) as TipoIVA[]).map((t) => (
                      <option key={t} value={t}>{t} ({(TIPOS_IVA[t] * 100).toFixed(0)}%)</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-1">
                  {data.items.length > 1 && (
                    <button
                      onClick={() => removeItem(i)}
                      className="rounded-md p-1.5 text-[#FF6B6B] hover:bg-[#1A1A1A]"
                      title="Eliminar línea"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#1A1A1A] bg-[#0F0F0F] p-5">
          <label className="block text-sm font-medium mb-1">Notas (opcional)</label>
          <textarea
            value={data.notas || ""}
            onChange={(e) => setData((d) => ({ ...d, notas: e.target.value }))}
            rows={2}
            placeholder="Condiciones de pago, IBAN, etc."
            className="w-full rounded-md border border-[#252525] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D1FF26]"
          />
        </div>

        <button
          onClick={printInvoice}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#D1FF26] text-[#0A0A0A] font-semibold py-3 hover:opacity-90"
        >
          <Printer className="h-5 w-5" />
          Imprimir o guardar como PDF
        </button>
      </div>

      {/* PREVIEW — always shown on print */}
      <div className="print:col-span-2">
        <div id="invoice-preview" className="rounded-xl border border-[#1A1A1A] bg-[#0F0F0F] p-6 print:p-0 print:border-0 print:shadow-none">
          <header className="flex items-start justify-between mb-8 pb-6 border-b">
            <div>
              <h1 className="text-2xl font-bold text-white">FACTURA</h1>
              <p className="text-sm text-[#606060] mt-1">Nº {data.numero || "—"}</p>
            </div>
            <div className="text-right text-sm">
              <p className="text-[#606060]">Fecha emisión</p>
              <p className="font-semibold">{formatDate(data.fechaEmision)}</p>
              {data.fechaVencimiento && (
                <>
                  <p className="text-[#606060] mt-2">Vencimiento</p>
                  <p className="font-semibold">{formatDate(data.fechaVencimiento)}</p>
                </>
              )}
            </div>
          </header>

          <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#606060] mb-1">De</p>
              <PartyView p={data.emisor} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#606060] mb-1">Para</p>
              <PartyView p={data.cliente} />
            </div>
          </div>

          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-semibold">Descripción</th>
                <th className="text-right py-2 font-semibold w-20">Cant.</th>
                <th className="text-right py-2 font-semibold w-24">Precio</th>
                <th className="text-right py-2 font-semibold w-16">IVA</th>
                <th className="text-right py-2 font-semibold w-28">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((it, i) => {
                const subtotal = it.cantidad * it.precioUnitario;
                return (
                  <tr key={i} className="border-b border-[#1A1A1A]">
                    <td className="py-2">{it.descripcion || "—"}</td>
                    <td className="text-right py-2">{it.cantidad}</td>
                    <td className="text-right py-2">{eur(it.precioUnitario)}</td>
                    <td className="text-right py-2">{(TIPOS_IVA[it.tipoIVA] * 100).toFixed(0)}%</td>
                    <td className="text-right py-2 font-medium">{eur(subtotal)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="grid grid-cols-2 gap-6">
            <div className="text-xs text-[#A0A0A0]">
              {data.notas && (
                <>
                  <p className="font-semibold text-white mb-1">Notas</p>
                  <p className="whitespace-pre-wrap">{data.notas}</p>
                </>
              )}
            </div>
            <div className="text-sm space-y-1">
              <div className="flex justify-between"><span className="text-[#606060]">Base imponible</span><span className="font-medium">{eur(totals.base)}</span></div>
              {Object.entries(totals.desgloseIva).map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs text-[#606060]">
                  <span>IVA {k} sobre {eur(v.base)}</span>
                  <span>{eur(v.iva)}</span>
                </div>
              ))}
              <div className="flex justify-between"><span className="text-[#606060]">Total IVA</span><span className="font-medium">{eur(totals.totalIva)}</span></div>
              {data.retencionIRPF > 0 && (
                <div className="flex justify-between text-[#FF6B6B]">
                  <span>Retención IRPF ({data.retencionIRPF}%)</span>
                  <span className="font-medium">– {eur(totals.retencion)}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t border-[#1A1A1A] text-base font-bold">
                <span>TOTAL</span>
                <span>{eur(totals.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-xs text-[#A0A0A0] mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-[#252525] px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#D1FF26]"
      />
    </div>
  );
}

function PartyForm({ party, onChange }: { party: InvoiceParty; onChange: (field: keyof InvoiceParty, value: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Field label="Nombre o razón social" value={party.nombre} onChange={(v) => onChange("nombre", v)} />
      <Field label="NIF / CIF" value={party.nif} onChange={(v) => onChange("nif", v)} />
      <div className="col-span-2">
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
      <p className="font-semibold text-white">{p.nombre || "—"}</p>
      <p className="text-[#A0A0A0]">NIF: {p.nif || "—"}</p>
      <p className="text-[#A0A0A0]">{p.direccion || "—"}</p>
      <p className="text-[#A0A0A0]">{[p.cp, p.ciudad].filter(Boolean).join(" ") || "—"}</p>
      {p.email && <p className="text-[#606060] text-xs mt-1">{p.email}</p>}
      {p.telefono && <p className="text-[#606060] text-xs">{p.telefono}</p>}
    </div>
  );
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
}
