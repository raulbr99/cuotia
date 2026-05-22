interface AdSlotProps {
  format?: "leaderboard" | "rectangle" | "vertical" | "mobile" | "responsive";
  className?: string;
}

const SIZES: Record<NonNullable<AdSlotProps["format"]>, { w: string; h: string }> = {
  leaderboard: { w: "max-w-[728px]", h: "h-[90px]" },
  rectangle: { w: "max-w-[336px]", h: "h-[280px]" },
  vertical: { w: "max-w-[300px]", h: "h-[600px]" },
  mobile: { w: "max-w-[320px]", h: "h-[100px]" },
  responsive: { w: "max-w-[728px]", h: "" },
};

export function AdSlot({ format = "responsive", className = "" }: AdSlotProps) {
  // Responsive: en mobile 320×100, tablet 336×280, desktop 728×90.
  if (format === "responsive") {
    return (
      <div className={`mx-auto w-full ${SIZES.responsive.w} ${className}`}>
        {/* Mobile (<640px): 320x100 */}
        <div className="mx-auto w-full max-w-[320px] sm:hidden">
          <Placeholder label="mobile" h="h-[100px]" />
        </div>
        {/* Tablet (640-1024px): 336x280 */}
        <div className="hidden sm:block lg:hidden mx-auto max-w-[336px]">
          <Placeholder label="rectangle" h="h-[280px]" />
        </div>
        {/* Desktop (≥1024px): 728x90 */}
        <div className="hidden lg:block mx-auto max-w-[728px]">
          <Placeholder label="leaderboard" h="h-[90px]" />
        </div>
      </div>
    );
  }
  const size = SIZES[format];
  return (
    <div className={`mx-auto w-full ${size.w} ${className}`}>
      <Placeholder label={format} h={size.h} />
    </div>
  );
}

function Placeholder({ label, h }: { label: string; h: string }) {
  return (
    <div
      className={`${h} flex w-full items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50 text-[10px] uppercase tracking-wider text-neutral-400`}
    >
      Anuncios · {label}
    </div>
  );
}
