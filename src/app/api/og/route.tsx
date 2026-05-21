import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title")?.slice(0, 80) ?? "Cuotia";
  const subtitle = searchParams.get("subtitle")?.slice(0, 120) ?? "Calculadoras fiscales gratuitas para autónomos en España";
  const tag = searchParams.get("tag")?.slice(0, 30);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #ecfdf5 0%, #ffffff 50%, #f0fdf4 100%)",
          padding: "70px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#059669",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            €
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#065f46", letterSpacing: -0.5 }}>
            Cuotia
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", marginTop: 20 }}>
          {tag && (
            <div
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                padding: "8px 16px",
                background: "#d1fae5",
                color: "#065f46",
                borderRadius: 999,
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 24,
              }}
            >
              {tag}
            </div>
          )}
          <div
            style={{
              fontSize: title.length > 50 ? 56 : 72,
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: -2,
              lineHeight: 1.05,
              marginBottom: 24,
              display: "flex",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#475569",
              lineHeight: 1.35,
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 30,
            borderTop: "2px solid #d1fae5",
            color: "#64748b",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex" }}>cuotia.es</div>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ color: "#059669", fontWeight: 600 }}>Gratis</span>
            <span>·</span>
            <span style={{ color: "#059669", fontWeight: 600 }}>Sin registro</span>
            <span>·</span>
            <span style={{ color: "#059669", fontWeight: 600 }}>2026</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
