import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 text-sm text-slate-600">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="text-base font-bold text-slate-900 mb-2">Cuotia</p>
            <p className="text-xs leading-relaxed text-slate-500">
              Calculadoras fiscales gratuitas para autónomos en España. Información
              orientativa, no constituye asesoramiento fiscal.
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-900 mb-2">Calculadoras</p>
            <ul className="space-y-1 text-xs">
              <li><Link href="/cuota-autonomo" className="hover:text-blue-700">Cuota autónomo</Link></li>
              <li><Link href="/calculadora-irpf" className="hover:text-blue-700">IRPF y modelo 130</Link></li>
              <li><Link href="/calculadora-iva" className="hover:text-blue-700">IVA y modelo 303</Link></li>
              <li><Link href="/neto-bruto" className="hover:text-blue-700">Neto / Bruto</Link></li>
              <li><Link href="/calculadora-despido" className="hover:text-blue-700">Despido y finiquito</Link></li>
              <li><Link href="/baja-medica" className="hover:text-blue-700">Baja médica</Link></li>
              <li><Link href="/jubilacion-autonomo" className="hover:text-blue-700">Jubilación autónomo</Link></li>
              <li><Link href="/dietas-kilometraje" className="hover:text-blue-700">Dietas y kilometraje</Link></li>
              <li><Link href="/generador-facturas" className="hover:text-blue-700">Generador de facturas</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-900 mb-2">Recursos</p>
            <ul className="space-y-1 text-xs">
              <li><Link href="/calendario-fiscal" className="hover:text-blue-700">Calendario fiscal</Link></li>
              <li><Link href="/guias" className="hover:text-blue-700">Guías</Link></li>
              <li><Link href="/guias/alta-autonomo" className="hover:text-blue-700">Cómo darse de alta</Link></li>
              <li><Link href="/guias/gastos-deducibles" className="hover:text-blue-700">Gastos deducibles</Link></li>
              <li><Link href="/guias/tarifa-plana" className="hover:text-blue-700">Tarifa plana</Link></li>
              <li><Link href="/blog" className="hover:text-blue-700">Blog</Link></li>
              <li><Link href="/sobre-nosotros" className="hover:text-blue-700">Sobre nosotros</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-900 mb-2">Legal</p>
            <ul className="space-y-1 text-xs">
              <li><Link href="/aviso-legal" className="hover:text-blue-700">Aviso legal</Link></li>
              <li><Link href="/privacidad" className="hover:text-blue-700">Privacidad</Link></li>
            </ul>
            <p className="text-[10px] text-slate-400 mt-4">
              Tramos vigentes 2025 (RD-ley 13/2022). Verifica con tu gestor antes de
              presentar modelos.
            </p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p>© 2026 Cuotia · Hecho en España</p>
          <p>Información orientativa · No sustituye asesoría fiscal</p>
        </div>
      </div>
    </footer>
  );
}
