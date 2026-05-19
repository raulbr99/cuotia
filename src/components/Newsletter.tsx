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
      <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-6 text-center">
        <Check className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
        <p className="text-sm text-emerald-900">{msg}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-start gap-3 mb-4">
        <Mail className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-base font-semibold">Avisos fiscales por email</h3>
          <p className="text-sm text-gray-600">
            Cambios de tramos, nuevos modelos, fechas clave. Sin spam, te puedes dar de baja con un click.
          </p>
        </div>
      </div>
      <form onSubmit={submit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {status === "loading" ? "..." : "Suscribirme"}
        </button>
      </form>
      {status === "err" && <p className="text-xs text-red-600 mt-2">{msg}</p>}
    </div>
  );
}
