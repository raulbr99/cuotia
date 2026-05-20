import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-gray-600">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="font-semibold text-gray-900 mb-2">CalcAutónomo</p>
            <p className="text-xs leading-relaxed">
              Calculadoras fiscales gratuitas para autónomos en España. Información
              orientativa, no constituye asesoramiento fiscal.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">Calculadoras</p>
            <ul className="space-y-1 text-xs">
              <li><Link href="/cuota-autonomo" className="hover:text-emerald-600">Cuota autónomo</Link></li>
              <li><Link href="/calculadora-irpf" className="hover:text-emerald-600">IRPF y modelo 130</Link></li>
              <li><Link href="/calculadora-iva" className="hover:text-emerald-600">IVA y modelo 303</Link></li>
              <li><Link href="/neto-bruto" className="hover:text-emerald-600">Neto / Bruto</Link></li>
              <li><Link href="/calculadora-despido" className="hover:text-emerald-600">Despido y finiquito</Link></li>
              <li><Link href="/baja-medica" className="hover:text-emerald-600">Baja médica</Link></li>
              <li><Link href="/jubilacion-autonomo" className="hover:text-emerald-600">Jubilación autónomo</Link></li>
              <li><Link href="/dietas-kilometraje" className="hover:text-emerald-600">Dietas y kilometraje</Link></li>
              <li><Link href="/generador-facturas" className="hover:text-emerald-600">Generador de facturas</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">Recursos</p>
            <ul className="space-y-1 text-xs">
              <li><Link href="/calendario-fiscal" className="hover:text-emerald-600">Calendario fiscal</Link></li>
              <li><Link href="/guias" className="hover:text-emerald-600">Guías</Link></li>
              <li><Link href="/guias/alta-autonomo" className="hover:text-emerald-600">Cómo darse de alta</Link></li>
              <li><Link href="/guias/gastos-deducibles" className="hover:text-emerald-600">Gastos deducibles</Link></li>
              <li><Link href="/guias/tarifa-plana" className="hover:text-emerald-600">Tarifa plana</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">Legal</p>
            <ul className="space-y-1 text-xs">
              <li><Link href="/aviso-legal" className="hover:text-emerald-600">Aviso legal</Link></li>
              <li><Link href="/privacidad" className="hover:text-emerald-600">Privacidad</Link></li>
            </ul>
            <p className="text-[10px] text-gray-400 mt-4">
              Tramos vigentes 2025 (RD-ley 13/2022). Verifica con tu gestor antes de
              presentar modelos.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
