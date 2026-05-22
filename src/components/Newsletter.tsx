"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";

export function Newsletter({ source = "homepage" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (res.ok) {
        setStatus("ok");
        setMsg("¡Suscrito! Recibirás avisos cuando cambien tramos o haya nuevos modelos.");
      } else {
        const j = await res.json().catch(() => ({}));
        setStatus("err");
        setMsg(j.error || "No pudimos guardar tu email. Inténtalo de nuevo.");
      }
    } catch {
      setStatus("err");
      setMsg("Error de red. Inténtalo de nuevo.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-6 text-center">
        <Check className="mx-auto mb-2 h-8 w-8 text-[#B91C1C]" strokeWidth={2} />
        <p className="text-sm text-neutral-900">{msg}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6">
      <div className="mb-4 flex items-start gap-3">
        <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#B91C1C]" strokeWidth={2} />
        <div>
          <h3 className="text-base font-semibold text-neutral-900">Avisos fiscales por email</h3>
          <p className="mt-0.5 text-sm text-neutral-600">
            Cambios de tramos, nuevos modelos, fechas clave. Sin spam, te puedes dar de
            baja con un click.
          </p>
        </div>
      </div>
      <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#B91C1C] focus:outline-none focus:outline-1 focus:outline-[#B91C1C]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-[#B91C1C] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#991B1B] disabled:opacity-50"
        >
          {status === "loading" ? "Enviando…" : "Suscribirme"}
        </button>
      </form>
      {status === "err" && <p className="mt-2 text-xs text-red-600">{msg}</p>}
    </div>
  );
}
