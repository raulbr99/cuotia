import { Sparkles } from "lucide-react";

interface QuickAnswerProps {
  question: string;
  answer: string;
  updatedAt?: string;
}

export function QuickAnswer({ question, answer, updatedAt }: QuickAnswerProps) {
  return (
    <aside
      className="speakable mb-10 border-l-2 border-[#D1FF26] bg-[#0F0F0F] p-6"
      aria-label="Respuesta rápida"
    >
      <div className="flex items-start gap-3">
        <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#D1FF26]" strokeWidth={1.5} />
        <div className="flex-1">
          <p className="tech-label mb-3 text-[#D1FF26]">
            QUICK_ANSWER // {question}
          </p>
          <p className="text-[15px] leading-relaxed text-white">{answer}</p>
          {updatedAt && (
            <p className="mt-4 font-mono text-[10px] tracking-wider text-[#505050]">
              UPDATED <time dateTime={updatedAt}>{formatDate(updatedAt)}</time> ·
              SOURCES: BOE · AEAT · SEG. SOCIAL
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
