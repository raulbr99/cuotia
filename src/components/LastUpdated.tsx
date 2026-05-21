import { Clock } from "lucide-react";

interface LastUpdatedProps {
  date: string;
  source?: string;
  className?: string;
}

export function LastUpdated({ date, source, className = "" }: LastUpdatedProps) {
  const formatted = new Date(date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className={`flex items-center gap-2 text-[11px] text-neutral-500 ${className}`}>
      <Clock className="h-3 w-3" strokeWidth={2} />
      <span>
        Última actualización: <time dateTime={date}>{formatted}</time>
        {source && (
          <>
            {" · "}
            <span>{source}</span>
          </>
        )}
      </span>
    </div>
  );
}
