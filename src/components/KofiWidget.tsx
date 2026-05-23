"use client";

import Script from "next/script";

/**
 * Ko-fi floating widget. Configurado con:
 * - Username `cuotia`
 * - Color rojo brand (#B91C1C, no azul default)
 * - Texto en español
 * - Posición bottom-left (para no colisionar con ChatWidget en bottom-right)
 *
 * Los `script` tags vanilla no funcionan bien en App Router → usamos next/script
 * con strategy "lazyOnload" para que no impacte LCP.
 */
export function KofiWidget() {
  return (
    <>
      <Script
        src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
        strategy="lazyOnload"
        onLoad={() => {
          // El widget se monta cuando el script termina de cargar
          // @ts-expect-error global injected by Ko-fi script
          if (typeof kofiWidgetOverlay !== "undefined") {
            // @ts-expect-error idem
            kofiWidgetOverlay.draw("cuotia", {
              type: "floating-chat",
              "floating-chat.donateButton.text": "Invítame a un café",
              "floating-chat.donateButton.background-color": "#B91C1C",
              "floating-chat.donateButton.text-color": "#ffffff",
            });
          }
        }}
      />
      {/* CSS override para mover Ko-fi a bottom-left y evitar colisión con ChatWidget.
          Selectores amplios para cubrir varias versiones del widget que Ko-fi pueda inyectar. */}
      <style jsx global>{`
        div[id*="kofi"],
        iframe[id*="kofi"],
        iframe[src*="ko-fi.com"] {
          right: auto !important;
          left: 16px !important;
        }
        @media (max-width: 640px) {
          /* En móvil bajamos un poco para no tapar contenido vital */
          div[id*="kofi"],
          iframe[id*="kofi"],
          iframe[src*="ko-fi.com"] {
            bottom: 12px !important;
          }
        }
      `}</style>
    </>
  );
}
