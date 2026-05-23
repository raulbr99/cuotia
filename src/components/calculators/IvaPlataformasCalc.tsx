"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import {
  PLATAFORMAS,
  calcularReglaIVA,
  type ClientePais,
  type ClienteTipo,
} from "@/lib/iva-plataformas";

export function IvaPlataformasCalc() {
  const [plataformaId, setPlataformaId] = useState<string>("stripe");
  const [clientePais, setClientePais] = useState<ClientePais>("ue");
  const [clienteTipo, setClienteTipo] = useState<ClienteTipo>("empresa");

  const plataforma = PLATAFORMAS.find((p) => p.id === plataformaId) ?? PLATAFORMAS[0];
  const result = useMemo(
    () => calcularReglaIVA(plataformaId, clientePais, clienteTipo),
    [plataformaId, clientePais, clienteTipo]
  );

  const necesitaCliente = !plataforma.esClienteDirecto;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-5">
        <h3 className="font-bold text-lg text-neutral-900">Tu situación</h3>

        <div>
          <label htmlFor="plataforma" className="mb-1 block text-sm font-medium text-neutral-700">
            ¿Qué plataforma usas?
          </label>
          <select
            id="plataforma"
            value={plataformaId}
            onChange={(e) => setPlataformaId(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base text-neutral-900 focus:border-[#B91C1C] focus:outline-none"
          >
            {PLATAFORMAS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} ({p.pais})
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-neutral-500">{plataforma.descripcion}</p>
        </div>

        {necesitaCliente ? (
          <>
            <div role="radiogroup" aria-label="¿Dónde está tu cliente?">
              <p className="mb-2 block text-sm font-medium text-neutral-700">
                ¿Dónde está tu cliente final?
              </p>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { id: "espana", label: "España" },
                  { id: "ue", label: "Resto UE" },
                  { id: "extra-ue", label: "Fuera UE" },
                ] as { id: ClientePais; label: string }[]).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={clientePais === opt.id}
                    onClick={() => setClientePais(opt.id)}
                    className={`rounded-md border p-3 text-sm font-medium transition-colors ${
                      clientePais === opt.id
                        ? "border-[#B91C1C] bg-[#FEF2F2] text-[#B91C1C]"
                        : "border-neutral-300 text-neutral-700 hover:border-neutral-500"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div role="radiogroup" aria-label="Tipo de cliente">
              <p className="mb-2 block text-sm font-medium text-neutral-700">
                ¿Tu cliente es...?
              </p>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { id: "empresa", label: "Empresa (B2B)" },
                  { id: "particular", label: "Particular (B2C)" },
                ] as { id: ClienteTipo; label: string }[]).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={clienteTipo === opt.id}
                    onClick={() => setClienteTipo(opt.id)}
                    className={`rounded-md border p-3 text-sm font-medium transition-colors ${
                      clienteTipo === opt.id
                        ? "border-[#B91C1C] bg-[#FEF2F2] text-[#B91C1C]"
                        : "border-neutral-300 text-neutral-700 hover:border-neutral-500"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm">
            <p className="font-semibold text-amber-900 mb-1">
              {plataforma.nombre} actúa como tu cliente directamente
            </p>
            <p className="text-amber-800">
              No importa quién contrate/use el servicio final. Tú facturas a{" "}
              <strong>{plataforma.nombre}</strong> en{" "}
              <strong>{plataforma.pais}</strong>.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        {/* Resumen visual */}
        <div className="rounded-xl border-2 border-[#FECACA] bg-[#FEF2F2] p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">Le facturas a</p>
          <p className="mt-1 font-bold text-xl text-neutral-900">{result.facturaA}</p>
          <p className="text-sm text-neutral-700">{result.facturaA_pais}</p>
        </div>

        {/* Flags */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5 space-y-3 text-sm">
          <Flag
            ok={result.aplicaIVA}
            yes="Aplica IVA español"
            no="NO aplica IVA español"
            detail={result.aplicaIVA && result.tipoIVA ? `${(result.tipoIVA * 100).toFixed(0)}%` : ""}
          />
          <Flag
            ok={result.reverseCharge}
            yes="Inversión sujeto pasivo (reverse charge)"
            no="Sin inversión sujeto pasivo"
          />
          <Flag
            ok={result.requiereROIVIES}
            yes="Necesitas ROI/VIES"
            no="No necesitas ROI/VIES"
          />
          <Flag
            ok={result.modelo349}
            yes="Modelo 349 trimestral"
            no="No modelo 349"
          />
        </div>
      </div>

      {/* Texto factura + notas — span ambas columnas */}
      <div className="lg:col-span-2 space-y-5">
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h4 className="font-bold text-base text-neutral-900 mb-3">
            ¿Qué pones en la factura?
          </h4>
          <ul className="space-y-2 text-sm text-neutral-700">
            {result.textoFactura.map((t, i) => (
              <li key={i} className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#B91C1C] flex-shrink-0 mt-0.5" strokeWidth={2} />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h4 className="font-bold text-base text-neutral-900 mb-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            Notas importantes
          </h4>
          <ul className="space-y-2 text-sm text-neutral-700">
            {result.notas.map((n, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
          <strong>Aviso:</strong> orientativo. La situación fiscal exacta puede
          variar según la naturaleza específica del servicio, la categoría de
          IVA aplicable, contratos firmados con la plataforma, y cambios en la
          legislación. Para casos complejos consulta a un gestor.
        </div>
      </div>
    </div>
  );
}

function Flag({ ok, yes, no, detail }: { ok: boolean; yes: string; no: string; detail?: string }) {
  return (
    <div className="flex items-start gap-2">
      {ok ? (
        <CheckCircle2 className="h-4 w-4 text-[#B91C1C] flex-shrink-0 mt-0.5" strokeWidth={2} />
      ) : (
        <XCircle className="h-4 w-4 text-neutral-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
      )}
      <div>
        <p className={`font-medium ${ok ? "text-neutral-900" : "text-neutral-500"}`}>
          {ok ? yes : no}
        </p>
        {detail && <p className="text-xs text-neutral-500">{detail}</p>}
      </div>
    </div>
  );
}
