import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { runGenerationPipeline } from "@/lib/generation/pipeline";

// Cron semanal de Vercel. Invocado con `Authorization: Bearer ${CRON_SECRET}`.
// Si no hay CRON_SECRET, queda abierto (útil para pruebas manuales).
function isAuthorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const result = await runGenerationPipeline();
  if (result.ok && result.slug && result.status === "published") {
    revalidatePath("/blog");
    revalidatePath(`/blog/${result.slug}`);
    revalidatePath("/sitemap.xml");
  }
  return NextResponse.json(result);
}

export const dynamic = "force-dynamic";
export const maxDuration = 300;
