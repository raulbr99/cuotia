import { ImageResponse } from "next/og";

export const runtime = "edge";

// Paleta del branding actual (off-white + neutral + rojo editorial)
const COLORS = {
  bg: "#FAFAF7",
  bgPaper: "#FFFFFF",
  accent: "#B91C1C",
  accentSoft: "#FEF2F2",
  accentBorder: "#FECACA",
  text: "#0A0A0A",
  textMuted: "#525252",
  textDim: "#737373",
  border: "#E5E5E5",
};

async function loadFont(url: string) {
  const res = await fetch(url);
  if (!res.ok) return null;
  return await res.arrayBuffer();
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title")?.slice(0, 80) ?? "Calculadoras fiscales";
  const subtitle =
    searchParams.get("subtitle")?.slice(0, 140) ??
    "Calculadoras fiscales gratuitas para autónomos en España";
  const tag = searchParams.get("tag")?.slice(0, 30);

  // Cargar Fraunces (serif del brand) desde Google Fonts
  // Si falla, fallback a serif system
  const [fraunces, frauncesItalic] = await Promise.all([
    loadFont(
      "https://fonts.gstatic.com/s/fraunces/v37/6NUu8FOIKj45GTaXyAcAYIA9d_0R8jbi_RM7sZNlcGukfWQfWXFY1pUNQF6KbZDe1WNRyZE.woff",
    ),
    loadFont(
      "https://fonts.gstatic.com/s/fraunces/v37/6NUu8FOIKj45GTaXyAcAYIA9d_0R8jbiArQ7sZNlcGukfWQfWXFY1pUNQF6KbZDe1WMszWNB.woff",
    ),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: COLORS.bg,
          padding: "70px 80px",
          fontFamily: "Fraunces, Georgia, serif",
          position: "relative",
        }}
      >
        {/* Header: brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: 38,
              fontWeight: 500,
              color: COLORS.text,
              letterSpacing: "-0.02em",
            }}
          >
            <span>Cuotia</span>
            <span style={{ color: COLORS.accent, marginLeft: 1 }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              color: COLORS.textDim,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 500,
            }}
          >
            calculadoras fiscales · 2026
          </div>
        </div>

        {/* Centro: tag opcional + título + subtítulo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {tag && (
            <div
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                padding: "6px 16px",
                background: COLORS.accentSoft,
                color: COLORS.accent,
                border: `1px solid ${COLORS.accentBorder}`,
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 28,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontFamily: "system-ui, sans-serif",
                borderRadius: 4,
              }}
            >
              {tag}
            </div>
          )}
          <div
            style={{
              fontSize: title.length > 60 ? 64 : title.length > 40 ? 80 : 96,
              fontWeight: 500,
              color: COLORS.text,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginBottom: 28,
              display: "flex",
              fontFamily: "Fraunces, Georgia, serif",
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: COLORS.textMuted,
              lineHeight: 1.4,
              maxWidth: 980,
              display: "flex",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Footer: URL + features */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: `1px solid ${COLORS.border}`,
            color: COLORS.textDim,
            fontSize: 22,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ display: "flex", fontWeight: 500, color: COLORS.text }}>
            cuotia.es
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 18 }}>
            <span style={{ color: COLORS.textMuted }}>Sin registro</span>
            <span style={{ color: COLORS.border }}>·</span>
            <span style={{ color: COLORS.textMuted }}>Datos BOE</span>
            <span style={{ color: COLORS.border }}>·</span>
            <span
              style={{
                color: COLORS.accent,
                fontWeight: 600,
                fontStyle: "italic",
                fontFamily: "Fraunces, Georgia, serif",
              }}
            >
              Gratis
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        ...(fraunces
          ? [
              {
                name: "Fraunces",
                data: fraunces,
                style: "normal" as const,
                weight: 500 as const,
              },
            ]
          : []),
        ...(frauncesItalic
          ? [
              {
                name: "Fraunces",
                data: frauncesItalic,
                style: "italic" as const,
                weight: 500 as const,
              },
            ]
          : []),
      ],
    },
  );
}
