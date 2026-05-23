"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SUGERENCIAS = [
  "¿Cuánto pago de autónomo si gano 2.500€/mes?",
  "¿Tengo que aplicar IVA al facturar a Stripe?",
  "¿Me sale más SL o autónomo con 80K?",
  "¿Qué retención IRPF a cliente de USA?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ESC cierra
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isLoading = status === "submitted" || status === "streaming";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  }

  function handleSugerencia(texto: string) {
    if (isLoading) return;
    sendMessage({ text: texto });
  }

  return (
    <>
      {/* Botón flotante */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#B91C1C] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#991B1B] hover:scale-105"
          aria-label="Abrir asistente fiscal"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline">Pregúntale a Cuotia</span>
          <span className="sm:hidden">Cuotia</span>
        </button>
      )}

      {/* Panel chat */}
      {open && (
        <div
          className="fixed inset-x-4 bottom-4 z-50 flex h-[85vh] max-h-[640px] flex-col rounded-xl border border-neutral-200 bg-white shadow-2xl sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px]"
          role="dialog"
          aria-label="Asistente fiscal Cuotia"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FEF2F2]">
                <Sparkles className="h-4 w-4 text-[#B91C1C]" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  Cuotia<span className="text-[#B91C1C]">.</span> Asistente
                </p>
                <p className="text-[10px] text-neutral-500">Datos fiscales 2026 · orientativo</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar chat"
              className="rounded-md p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="rounded-lg bg-[#FAFAF7] p-4 text-sm text-neutral-700">
                  Hola. Pregúntame cualquier cosa sobre fiscalidad de autónomos
                  en España. Calculo con datos oficiales 2026 (BOE, AEAT, TGSS).
                </div>
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-wider text-neutral-500">
                    Sugerencias
                  </p>
                  {SUGERENCIAS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleSugerencia(s)}
                      className="block w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-left text-sm text-neutral-700 transition-colors hover:border-[#B91C1C] hover:text-[#B91C1C]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-[#B91C1C] text-white"
                      : "bg-[#FAFAF7] text-neutral-900"
                  }`}
                >
                  {m.parts.map((p, i) => {
                    if (p.type === "text") {
                      return (
                        <span key={i} className="prose-chat">
                          {renderMarkdownInline(p.text)}
                        </span>
                      );
                    }
                    // Tool calls / results — mostrar simple
                    if (p.type.startsWith("tool-")) {
                      const toolName = p.type.replace("tool-", "");
                      return (
                        <div
                          key={i}
                          className="my-1 text-[11px] text-neutral-500 italic"
                        >
                          🔧 calculando {toolName}…
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-[#FAFAF7] px-3 py-2 text-sm">
                  <Loader2 className="inline h-3 w-3 animate-spin" />{" "}
                  <span className="text-neutral-500">pensando…</span>
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-900">
                Error: {error.message ?? "no he podido responder"}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-neutral-200 p-3"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tu pregunta fiscal…"
                disabled={isLoading}
                className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#B91C1C] focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Enviar"
                className="rounded-lg bg-[#B91C1C] p-2 text-white transition-colors hover:bg-[#991B1B] disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-[10px] text-neutral-400">
              Respuestas orientativas. No sustituye asesoría profesional.
            </p>
          </form>
        </div>
      )}
    </>
  );
}

/**
 * Render markdown inline minimalista: bold (**...**), links ([texto](url)).
 * Sin parser pesado, suficiente para el output del asistente.
 */
function renderMarkdownInline(text: string): React.ReactNode {
  // Split por links primero
  const parts: React.ReactNode[] = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(renderBold(text.slice(lastIndex, match.index), key++));
    }
    parts.push(
      <a
        key={`link-${key++}`}
        href={match[2]}
        className="underline hover:text-[#B91C1C]"
        target={match[2].startsWith("http") ? "_blank" : undefined}
        rel={match[2].startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {match[1]}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(renderBold(text.slice(lastIndex), key++));
  }
  return <>{parts}</>;
}

function renderBold(text: string, key: number): React.ReactNode {
  const boldRegex = /\*\*([^*]+)\*\*/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(<strong key={`b-${key}-${i++}`}>{match[1]}</strong>);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return <span key={`s-${key}`}>{parts}</span>;
}
