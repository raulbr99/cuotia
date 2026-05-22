// Plantilla HTML para newsletters de Cuotia.
// Compatible con la mayoría de clientes email (inline styles, table-based opcional).
// Uso: renderNewsletter({ subject, intro, sections, ctaUrl, ctaLabel })

export interface NewsletterSection {
  heading: string;
  body: string; // HTML permitido
  link?: { url: string; label: string };
}

export interface NewsletterInput {
  subject: string;
  intro: string;
  sections: NewsletterSection[];
  ctaUrl?: string;
  ctaLabel?: string;
  footerNote?: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

export function renderNewsletter(input: NewsletterInput): { html: string; text: string } {
  const { subject, intro, sections, ctaUrl, ctaLabel, footerNote } = input;

  const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#FAFAF7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0A0A0A;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#FAFAF7;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;background:#ffffff;border:1px solid #E5E5E5;">
        <tr><td style="padding:24px 32px;border-bottom:1px solid #E5E5E5;">
          <a href="${SITE_URL}" style="color:#0A0A0A;text-decoration:none;font-family:Georgia,serif;font-size:22px;font-weight:500;">
            Cuotia<span style="color:#B91C1C;">.</span>
          </a>
        </td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:24px;line-height:1.2;color:#0A0A0A;">${escapeHtml(subject)}</h1>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.55;color:#404040;">${intro}</p>
          ${sections
            .map(
              (s) => `
          <div style="margin-bottom:28px;">
            <h2 style="margin:0 0 8px;font-size:17px;font-weight:600;color:#0A0A0A;">${escapeHtml(s.heading)}</h2>
            <div style="font-size:14px;line-height:1.6;color:#404040;">${s.body}</div>
            ${
              s.link
                ? `<p style="margin:10px 0 0;"><a href="${s.link.url}" style="color:#B91C1C;text-decoration:underline;">${escapeHtml(s.link.label)} →</a></p>`
                : ""
            }
          </div>`
            )
            .join("")}
          ${
            ctaUrl && ctaLabel
              ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;">
                  <tr><td bgcolor="#B91C1C" style="border-radius:6px;">
                    <a href="${ctaUrl}" style="display:inline-block;padding:12px 24px;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;">${escapeHtml(ctaLabel)}</a>
                  </td></tr>
                </table>`
              : ""
          }
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid #E5E5E5;font-size:12px;color:#737373;line-height:1.5;">
          ${footerNote ? `<p style="margin:0 0 12px;">${footerNote}</p>` : ""}
          <p style="margin:0;">Recibes este email porque te suscribiste en <a href="${SITE_URL}" style="color:#737373;">cuotia.es</a>.</p>
          <p style="margin:8px 0 0;">¿Te has cansado? <a href="mailto:hola@cuotia.es?subject=Baja%20newsletter" style="color:#737373;">Date de baja</a>.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    subject,
    "",
    stripHtml(intro),
    "",
    ...sections.map(
      (s) =>
        `${s.heading}\n${stripHtml(s.body)}${s.link ? `\n${s.link.label}: ${s.link.url}` : ""}`
    ),
    "",
    ctaUrl && ctaLabel ? `${ctaLabel}: ${ctaUrl}` : "",
    "",
    footerNote ? stripHtml(footerNote) : "",
    "",
    `Recibes este email porque te suscribiste en ${SITE_URL}.`,
    "Para darte de baja, responde a este correo o escribe a hola@cuotia.es.",
  ]
    .filter(Boolean)
    .join("\n");

  return { html, text };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripHtml(s: string): string {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}
