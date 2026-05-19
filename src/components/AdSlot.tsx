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
        className={`${size.h} w-full rounded-md border border-dashed border-gray-300 bg-gray-50/60 flex items-center justify-center text-[10px] uppercase tracking-wider text-gray-400`}
      >
        Anuncios · {format}
      </div>
    </div>
  );
}
