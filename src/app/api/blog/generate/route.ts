import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { runGenerationPipeline } from "@/lib/generation/pipeline";

// Trigger manual desde el mini-admin (/admin/blog).
// Auth: Authorization: Bearer ${ADMIN_TOKEN}
export async function POST(req: Request) {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json({ error: "ADMIN_TOKEN no configurado en el servidor" }, { status: 500 });
  }
  if (req.headers.get("authorization") !== `Bearer ${adminToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await runGenerationPipeline();
  if (result.ok && result.slug && result.status === "published") {
    revalidatePath("/blog");
    revalidatePath(`/blog/${result.slug}`);
    revalidatePath("/sitemap.xml");
  }
  return NextResponse.json(result, { status: result.ok ? 200 : 422 });
}

export const dynamic = "force-dynamic";
export const maxDuration = 300;
