import { Sparkles } from "lucide-react";

interface QuickAnswerProps {
  question: string;
  answer: string;
  updatedAt?: string;
}

export function QuickAnswer({ question, answer, updatedAt }: QuickAnswerProps) {
  return (
    <aside
      className="speakable mb-8 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6"
      aria-label="Respuesta rápida"
    >
      <div className="flex items-start gap-3">
        <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" strokeWidth={2} />
        <div className="flex-1">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
            Respuesta rápida · {question}
          </p>
          <p className="text-base leading-relaxed text-slate-900">{answer}</p>
          {updatedAt && (
            <p className="mt-3 text-[11px] text-slate-500">
              Datos actualizados el <time dateTime={updatedAt}>{formatDate(updatedAt)}</time> ·
              Fuentes: BOE, AEAT, Seguridad Social
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}
