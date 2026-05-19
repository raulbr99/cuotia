import Link from "next/link";
import { Calculator } from "lucide-react";

const NAV = [
  { href: "/cuota-autonomo", label: "Cuota autónomo" },
  { href: "/calculadora-irpf", label: "IRPF" },
  { href: "/neto-bruto", label: "Neto/Bruto" },
  { href: "/calendario-fiscal", label: "Calendario fiscal" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-base font-bold text-gray-900">
          <Calculator className="h-5 w-5 text-emerald-600" />
          CalcAutónomo
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto text-sm">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-1.5 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 whitespace-nowrap"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
