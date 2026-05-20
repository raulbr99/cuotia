import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-2xl tracking-tight text-white">CUOTIA</p>
            <p className="mt-3 text-[13px] leading-relaxed text-[#606060]">
              Calculadoras fiscales gratuitas para autónomos en España. Información
              orientativa, no constituye asesoramiento fiscal.
            </p>
          </div>
          <div>
            <p className="tech-label mb-4 text-[#D0D0D0]">CATEGORY // CALCULATORS</p>
            <ul className="space-y-2 text-[13px]">
              <li><Link href="/cuota-autonomo" className="text-[#606060] transition-colors hover:text-[#D1FF26]">Cuota autónomo</Link></li>
              <li><Link href="/calculadora-irpf" className="text-[#606060] transition-colors hover:text-[#D1FF26]">IRPF + modelo 130</Link></li>
              <li><Link href="/calculadora-iva" className="text-[#606060] transition-colors hover:text-[#D1FF26]">IVA + modelo 303</Link></li>
              <li><Link href="/neto-bruto" className="text-[#606060] transition-colors hover:text-[#D1FF26]">Neto / Bruto</Link></li>
              <li><Link href="/calculadora-despido" className="text-[#606060] transition-colors hover:text-[#D1FF26]">Despido + finiquito</Link></li>
              <li><Link href="/baja-medica" className="text-[#606060] transition-colors hover:text-[#D1FF26]">Baja médica</Link></li>
              <li><Link href="/jubilacion-autonomo" className="text-[#606060] transition-colors hover:text-[#D1FF26]">Jubilación</Link></li>
              <li><Link href="/dietas-kilometraje" className="text-[#606060] transition-colors hover:text-[#D1FF26]">Dietas + km</Link></li>
              <li><Link href="/generador-facturas" className="text-[#606060] transition-colors hover:text-[#D1FF26]">Generador facturas</Link></li>
            </ul>
          </div>
          <div>
            <p className="tech-label mb-4 text-[#D0D0D0]">CATEGORY // RESOURCES</p>
            <ul className="space-y-2 text-[13px]">
              <li><Link href="/calendario-fiscal" className="text-[#606060] transition-colors hover:text-[#D1FF26]">Calendario fiscal</Link></li>
              <li><Link href="/guias" className="text-[#606060] transition-colors hover:text-[#D1FF26]">Guías</Link></li>
              <li><Link href="/guias/alta-autonomo" className="text-[#606060] transition-colors hover:text-[#D1FF26]">Cómo darse de alta</Link></li>
              <li><Link href="/guias/gastos-deducibles" className="text-[#606060] transition-colors hover:text-[#D1FF26]">Gastos deducibles</Link></li>
              <li><Link href="/guias/tarifa-plana" className="text-[#606060] transition-colors hover:text-[#D1FF26]">Tarifa plana</Link></li>
              <li><Link href="/blog" className="text-[#606060] transition-colors hover:text-[#D1FF26]">Blog</Link></li>
              <li><Link href="/sobre-nosotros" className="text-[#606060] transition-colors hover:text-[#D1FF26]">Sobre nosotros</Link></li>
            </ul>
          </div>
          <div>
            <p className="tech-label mb-4 text-[#D0D0D0]">CATEGORY // LEGAL</p>
            <ul className="space-y-2 text-[13px]">
              <li><Link href="/aviso-legal" className="text-[#606060] transition-colors hover:text-[#D1FF26]">Aviso legal</Link></li>
              <li><Link href="/privacidad" className="text-[#606060] transition-colors hover:text-[#D1FF26]">Privacidad</Link></li>
            </ul>
            <p className="mt-6 text-[10px] leading-relaxed text-[#404040]">
              Tramos vigentes 2025 (RD-ley 13/2022). Verifica con tu gestor antes de
              presentar modelos.
            </p>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-between border-t border-[#1A1A1A] pt-6">
          <p className="tech-label text-[#404040]">MEME-TECH v2.6 // CUOTIA_OS</p>
          <p className="tech-label text-[#404040]">© 2026 CUOTIA</p>
        </div>
      </div>
    </footer>
  );
}
