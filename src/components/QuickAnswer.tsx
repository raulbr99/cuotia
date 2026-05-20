import { Sparkles } from "lucide-react";

interface QuickAnswerProps {
  question: string;
  answer: string;
  updatedAt?: string;
}

export function QuickAnswer({ question, answer, updatedAt }: QuickAnswerProps) {
  return (
    <aside
      className="speakable rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 mb-8"
      aria-label="Respuesta rápida"
    >
      <div className="flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
            Respuesta rápida · {question}
          </p>
          <p className="text-base text-gray-900 leading-relaxed">{answer}</p>
          {updatedAt && (
            <p className="text-[11px] text-gray-500 mt-3">
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
