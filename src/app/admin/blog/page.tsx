import type { Metadata } from "next";
import { GenerateBlogPanel } from "./GenerateBlogPanel";

export const metadata: Metadata = {
  title: "Admin · generar post",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Generador de posts</h1>
      <p className="text-sm text-neutral-600 mb-6">
        Genera un borrador a partir de las últimas novedades fiscales (Perplexity), lo redacta y
        revisa con IA, crea la portada y lo guarda en Supabase. Se publica solo si pasa el control
        de calidad; si no, queda como borrador.
      </p>
      <GenerateBlogPanel />
    </div>
  );
}
