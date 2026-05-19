import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { email, source } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }
    const supabase = getSupabase();
    if (!supabase) {
      console.warn("[newsletter] Supabase not configured, accepting silently");
      return NextResponse.json({ ok: true });
    }
    const { error } = await supabase
      .from("newsletter_subscribers")
      .upsert({ email: email.toLowerCase().trim(), source: source || "unknown" }, { onConflict: "email" });
    if (error) {
      console.error("[newsletter] supabase error:", error.message);
      return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[newsletter] error:", e);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
