import Link from "next/link";
import { AlertCircle, ArrowUpRight, Calendar } from "lucide-react";

interface VerifactuBannerProps {
  variant?: "compact" | "full";
  /**
   * Si true → usar copy de urgencia migración (para /generador-facturas).
   * Si false → copy informativo (para /verifactu).
   */
  urgent?: boolean;
}

/**
 * Banner para dirigir a usuarios hacia partners SIF Verifactu-certificados.
 * Compliance: rel="sponsored" en links, disclosure de afiliado visible al final.
 */
export function VerifactuBanner({ variant = "full", urgent = false }: VerifactuBannerProps) {
  if (variant === "compact") {
    return (
      <aside className="my-6 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900">
        <p className="flex items-start gap-2">
          <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>
            <strong>Verifactu llega el 1 julio 2027</strong> para autónomos persona física.
            Sociedades mercantiles ya desde 1 enero 2027. Sin software certificado: sanciones
            hasta 50.000 €/año.{" "}
            <Link href="/verifactu" className="underline">Más info</Link>
          </span>
        </p>
      </aside>
    );
  }

  return (
    <aside className="my-10 rounded-xl border-2 border-amber-300 bg-amber-50 p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-amber-700" strokeWidth={2} />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-amber-700 font-semibold mb-1">
            Plazo Verifactu · 1 julio 2027
          </p>
          <h3 className="font-bold text-base text-neutral-900">
            {urgent
              ? "Migra antes de julio 2027 a software certificado"
              : "Software certificado Verifactu para autónomos"}
          </h3>
          <p className="mt-1 text-sm text-neutral-700">
            {urgent
              ? "El generador de facturas de Cuotia produce PDFs válidos hasta junio 2027. Desde el 1 julio 2027 necesitas software SIF certificado con hash chain SHA-256, código QR y envío a AEAT."
              : "Estos partners ya tienen plan de adaptación o solución Verifactu lista. Comparativa orientativa:"}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* Quipu */}
        <a
          href="https://getquipu.com"
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="group block rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:border-amber-500"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-neutral-900 group-hover:text-amber-700">
                Quipu
              </span>
              <span className="text-[10px] uppercase tracking-wider text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                Verifactu roadmap
              </span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-amber-700 flex-shrink-0" />
          </div>
          <p className="text-sm text-neutral-700 leading-relaxed">
            Software facturación español con plan Verifactu confirmado. Desde 9 €/mes.
          </p>
        </a>

        {/* Holded */}
        <a
          href="https://www.holded.com"
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="group block rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:border-amber-500"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-neutral-900 group-hover:text-amber-700">
                Holded
              </span>
              <span className="text-[10px] uppercase tracking-wider text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                Verifactu roadmap
              </span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-amber-700 flex-shrink-0" />
          </div>
          <p className="text-sm text-neutral-700 leading-relaxed">
            Suite completa: facturación + CRM + RR.HH. Con compromiso de adaptación Verifactu. Desde 14 €/mes.
          </p>
        </a>
      </div>

      <p className="mt-4 text-xs text-neutral-600 leading-relaxed">
        Lee la <Link href="/verifactu" className="underline">guía completa de Verifactu</Link>{" "}
        si aún no estás familiarizado con los requisitos del SIF (Sistema Informático de
        Facturación).
      </p>

      <p className="mt-3 text-[10px] text-neutral-400 leading-relaxed">
        <strong>Aviso afiliado:</strong> los enlaces de esta sección pueden generar comisión
        para Cuotia si contratas con el proveedor. El precio para ti es el mismo. Cuotia no
        es responsable del cumplimiento Verifactu de productos de terceros.
      </p>
    </aside>
  );
}
