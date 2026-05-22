import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

// POST /api/newsletter/broadcast
// Body: { subject: string, html: string, text?: string, dryRun?: boolean }
// Auth: Authorization: Bearer ${ADMIN_TOKEN}
//
// Si RESEND_API_KEY no está configurada, devolvemos la lista de destinatarios
// sin enviar (dryRun forzado).
export async function POST(req: Request) {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json(
      { error: "ADMIN_TOKEN no configurado en el servidor" },
      { status: 500 }
    );
  }

  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${adminToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { subject?: string; html?: string; text?: string; dryRun?: boolean } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body JSON inválido" }, { status: 400 });
  }

  const { subject, html, text, dryRun } = body;
  if (!subject || !html) {
    return NextResponse.json(
      { error: "subject y html son requeridos" },
      { status: 400 }
    );
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase no configurado" },
      { status: 500 }
    );
  }

  const { data: subs, error } = await supabase
    .from("newsletter_subscribers")
    .select("email");
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const emails = (subs ?? []).map((r) => r.email).filter(Boolean);

  if (dryRun || !process.env.RESEND_API_KEY) {
    return NextResponse.json({
      ok: true,
      mode: "dryRun",
      reason: !process.env.RESEND_API_KEY ? "RESEND_API_KEY no configurada" : "dryRun=true",
      subjectPreview: subject,
      recipientsCount: emails.length,
      recipientsSample: emails.slice(0, 5),
    });
  }

  // Envío real vía Resend (batch en grupos de 100, max por request)
  const fromAddress = process.env.NEWSLETTER_FROM || "Cuotia <newsletter@cuotia.es>";
  const replyTo = process.env.NEWSLETTER_REPLY_TO || "hola@cuotia.es";

  const batches: string[][] = [];
  for (let i = 0; i < emails.length; i += 100) {
    batches.push(emails.slice(i, i + 100));
  }

  let totalSent = 0;
  const errors: { batch: number; error: string }[] = [];

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: fromAddress,
          to: fromAddress,
          bcc: batch,
          reply_to: replyTo,
          subject,
          html,
          text: text ?? undefined,
        }),
      });
      if (res.ok) {
        totalSent += batch.length;
      } else {
        const errText = await res.text();
        errors.push({ batch: i, error: errText.slice(0, 200) });
      }
    } catch (e) {
      errors.push({ batch: i, error: e instanceof Error ? e.message : String(e) });
    }
  }

  return NextResponse.json({
    ok: errors.length === 0,
    mode: "live",
    recipientsCount: emails.length,
    totalSent,
    failedBatches: errors.length,
    errors,
  });
}

export const dynamic = "force-dynamic";
