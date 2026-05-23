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
      {/* CSS override:
          - Mover Ko-fi de bottom-right (default) a bottom-left para no chocar con ChatWidget.
          - Escalar el botón al 75% (default es enorme, comparado con nuestro chat button).
          - Selectores amplios para cubrir cualquier estructura que Ko-fi inyecte. */}
      <style jsx global>{`
        /* Posicionar bottom-left + escala compacta */
        div[id*="kofi-widget-overlay"],
        div[id*="kofi"][style*="position: fixed"],
        iframe[id*="kofi"],
        iframe[src*="ko-fi.com"] {
          right: auto !important;
          left: 16px !important;
          bottom: 16px !important;
          transform: scale(0.75) !important;
          transform-origin: bottom left !important;
        }
        /* El widget también tiene un wrapper interno que controla width */
        .floatingchat-container-wrap,
        .floatingchat-donatebutton-wrap {
          right: auto !important;
          left: 16px !important;
          bottom: 16px !important;
          transform: scale(0.75) !important;
          transform-origin: bottom left !important;
        }
        @media (max-width: 640px) {
          /* En móvil aún más pequeño para no tapar contenido */
          div[id*="kofi-widget-overlay"],
          .floatingchat-container-wrap,
          .floatingchat-donatebutton-wrap {
            transform: scale(0.65) !important;
            bottom: 12px !important;
            left: 8px !important;
          }
        }
      `}</style>
    </>
  );
}
