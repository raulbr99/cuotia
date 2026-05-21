interface AdSlotProps {
  format?: "leaderboard" | "rectangle" | "vertical" | "mobile";
  className?: string;
}

const SIZES: Record<NonNullable<AdSlotProps["format"]>, { w: string; h: string }> = {
  leaderboard: { w: "max-w-[728px]", h: "h-[90px]" },
  rectangle: { w: "max-w-[336px]", h: "h-[280px]" },
  vertical: { w: "max-w-[300px]", h: "h-[600px]" },
  mobile: { w: "max-w-[320px]", h: "h-[100px]" },
};

export function AdSlot({ format = "leaderboard", className = "" }: AdSlotProps) {
  const size = SIZES[format];
  return (
    <div className={`mx-auto w-full ${size.w} ${className}`}>
      <div
        className={`${size.h} flex w-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400`}
      >
        Anuncios · {format}
      </div>
    </div>
  );
}
