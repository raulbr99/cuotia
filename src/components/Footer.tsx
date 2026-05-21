import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-neutral-200 bg-[#FAFAF7]">
      <div className="mx-auto max-w-5xl px-5 py-12">
        <div className="grid gap-10 text-sm md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-serif text-lg text-neutral-900">
              Cuotia<span className="text-[#B91C1C]">.</span>
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-neutral-600 max-w-xs">
              Calculadoras fiscales hechas por y para autónomos. Sin login. Sin upsells.
              Datos oficiales del BOE.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-wider text-neutral-400 mb-3">Calculadoras</p>
            <ul className="space-y-1.5 text-[13px]">
              <li><Link href="/cuota-autonomo" className="text-neutral-700 hover:text-[#B91C1C]">Cuota autónomo</Link></li>
              <li><Link href="/calculadora-irpf" className="text-neutral-700 hover:text-[#B91C1C]">IRPF + modelo 130</Link></li>
              <li><Link href="/calculadora-iva" className="text-neutral-700 hover:text-[#B91C1C]">IVA + modelo 303</Link></li>
              <li><Link href="/neto-bruto" className="text-neutral-700 hover:text-[#B91C1C]">Neto / Bruto</Link></li>
              <li><Link href="/calculadora-despido" className="text-neutral-700 hover:text-[#B91C1C]">Despido</Link></li>
              <li><Link href="/baja-medica" className="text-neutral-700 hover:text-[#B91C1C]">Baja médica</Link></li>
              <li><Link href="/jubilacion-autonomo" className="text-neutral-700 hover:text-[#B91C1C]">Jubilación</Link></li>
              <li><Link href="/dietas-kilometraje" className="text-neutral-700 hover:text-[#B91C1C]">Dietas + km</Link></li>
              <li><Link href="/generador-facturas" className="text-neutral-700 hover:text-[#B91C1C]">Facturas</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-wider text-neutral-400 mb-3">Recursos</p>
            <ul className="space-y-1.5 text-[13px]">
              <li><Link href="/calendario-fiscal" className="text-neutral-700 hover:text-[#B91C1C]">Calendario fiscal</Link></li>
              <li><Link href="/guias" className="text-neutral-700 hover:text-[#B91C1C]">Guías</Link></li>
              <li><Link href="/guias/alta-autonomo" className="text-neutral-700 hover:text-[#B91C1C]">Cómo darse de alta</Link></li>
              <li><Link href="/guias/gastos-deducibles" className="text-neutral-700 hover:text-[#B91C1C]">Gastos deducibles</Link></li>
              <li><Link href="/guias/tarifa-plana" className="text-neutral-700 hover:text-[#B91C1C]">Tarifa plana</Link></li>
              <li><Link href="/blog" className="text-neutral-700 hover:text-[#B91C1C]">Blog</Link></li>
              <li><Link href="/sobre-nosotros" className="text-neutral-700 hover:text-[#B91C1C]">Sobre nosotros</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-[11px] uppercase tracking-wider text-neutral-400 mb-3">Legal</p>
            <ul className="space-y-1.5 text-[13px]">
              <li><Link href="/aviso-legal" className="text-neutral-700 hover:text-[#B91C1C]">Aviso legal</Link></li>
              <li><Link href="/privacidad" className="text-neutral-700 hover:text-[#B91C1C]">Privacidad</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-neutral-500">
          <p>
            © {new Date().getFullYear()} Cuotia · Hecho en Madrid
            <span className="hidden sm:inline"> · </span>
            <br className="sm:hidden" />
            Tramos vigentes 2026 (RD-ley 3/2026)
          </p>
          <p className="italic">No es asesoría fiscal. Para tus modelos, busca un gestor de verdad.</p>
        </div>
      </div>
    </footer>
  );
}
