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
      <div className="border border-[#D1FF26] bg-[#0F0F0F] p-8 text-center">
        <Check className="mx-auto mb-3 h-8 w-8 text-[#D1FF26]" strokeWidth={1.5} />
        <p className="text-[13px] text-white">{msg}</p>
      </div>
    );
  }

  return (
    <div className="border border-[#1A1A1A] bg-[#0F0F0F] p-8">
      <p className="tech-label mb-4">SIGNAL // NEWSLETTER</p>
      <div className="mb-6 flex items-start gap-3">
        <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#D1FF26]" strokeWidth={1.5} />
        <div>
          <h3 className="font-display text-2xl uppercase tracking-tight text-white">
            Avisos fiscales por email
          </h3>
          <p className="mt-1 text-[13px] text-[#A0A0A0]">
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
          className="flex-1 border border-[#252525] bg-[#0A0A0A] px-4 py-3 text-[13px] text-white placeholder:text-[#505050] focus:border-[#D1FF26] focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-[#D1FF26] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.1em] text-[#0A0A0A] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "loading" ? "..." : "Suscribirme"}
        </button>
      </form>
      {status === "err" && <p className="mt-3 text-[12px] text-[#FF6B6B]">{msg}</p>}
    </div>
  );
}
