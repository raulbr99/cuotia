import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendario fiscal autónomos 2026 · modelos 303, 130, 390, 100",
  description:
    "Todas las fechas clave del año fiscal para autónomos en España: modelos 303 (IVA), 130 (IRPF trimestral), 390 (resumen IVA), 100 (renta), 111, 115. Sin perderte ninguna.",
  alternates: { canonical: "/calendario-fiscal" },
};

interface Evento {
  fecha: string;
  modelos: string[];
  titulo: string;
  descripcion: string;
}

const EVENTOS: { mes: string; eventos: Evento[] }[] = [
  {
    mes: "Enero",
    eventos: [
      {
        fecha: "1 – 30 enero",
        modelos: ["303", "130", "390", "111", "115", "180", "190"],
        titulo: "Cierre del 4º trimestre + resúmenes anuales",
        descripcion:
          "T4 IVA (303), T4 IRPF (130), resumen anual IVA (390), retenciones de trabajadores (111/190), alquileres (115/180).",
      },
    ],
  },
  {
    mes: "Febrero",
    eventos: [
      { fecha: "1 – 28 febrero", modelos: ["347"], titulo: "Declaración anual de operaciones con terceros", descripcion: "Modelo 347: operaciones con un mismo cliente/proveedor > 3.005,06 € en el año." },
    ],
  },
  {
    mes: "Abril",
    eventos: [
      {
        fecha: "1 – 20 abril",
        modelos: ["303", "130", "111", "115"],
        titulo: "T1 — Primer trimestre",
        descripcion:
          "IVA trimestral (303), pago fraccionado IRPF (130), retenciones a trabajadores (111) y alquileres (115). Si domicilias, hasta el 15.",
      },
    ],
  },
  {
    mes: "Mayo",
    eventos: [
      { fecha: "6 abril – 30 junio", modelos: ["100"], titulo: "Campaña Renta", descripcion: "Declaración del IRPF anual (modelo 100). Empieza online a primeros de abril." },
    ],
  },
  {
    mes: "Julio",
    eventos: [
      {
        fecha: "1 – 20 julio",
        modelos: ["303", "130", "111", "115"],
        titulo: "T2 — Segundo trimestre",
        descripcion: "Igual que abril, pero del segundo trimestre.",
      },
      { fecha: "1 – 25 julio", modelos: ["200"], titulo: "Impuesto sobre Sociedades", descripcion: "Solo si tributas por IS (sociedades, no autónomos persona física)." },
    ],
  },
  {
    mes: "Octubre",
    eventos: [
      {
        fecha: "1 – 20 octubre",
        modelos: ["303", "130", "111", "115"],
        titulo: "T3 — Tercer trimestre",
        descripcion: "Igual que abril y julio, pero del tercer trimestre.",
      },
    ],
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Calendario fiscal autónomos
        </h1>
        <p className="mt-3 text-neutral-700 max-w-3xl">
          Las fechas clave del año fiscal para autónomos en España. Tip: si domicilias
          el pago, la fecha tope baja 5 días (al 15 en lugar del 20).
        </p>
      </header>


      <div className="space-y-6">
        {EVENTOS.map((m) => (
          <section key={m.mes} className=" rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">{m.mes}</h2>
            <div className="space-y-4">
              {m.eventos.map((e, i) => (
                <div key={i} className="border-l-4 border-[#B91C1C] pl-4">
                  <div className="flex flex-wrap items-baseline gap-3 mb-1">
                    <p className="text-sm font-semibold text-[#B91C1C]">{e.fecha}</p>
                    <div className="flex flex-wrap gap-1">
                      {e.modelos.map((mod) => (
                        <span
                          key={mod}
                          className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-mono text-neutral-700"
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-neutral-900">{e.titulo}</p>
                  <p className="text-xs text-neutral-700 mt-0.5">{e.descripcion}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>


      <article className="max-w-3xl text-sm text-neutral-700 space-y-4">
        <h2 className="text-xl font-bold text-neutral-900">Guía rápida de modelos</h2>
        <ul className="space-y-2">
          <li><strong>Modelo 303</strong> — IVA trimestral. Diferencia entre el IVA que has cobrado y el que has pagado.</li>
          <li><strong>Modelo 130</strong> — Pago fraccionado del IRPF. Solo si menos del 70% de tus ingresos llevan retención.</li>
          <li><strong>Modelo 390</strong> — Resumen anual del IVA (suma los 4 trimestres). Solo en enero.</li>
          <li><strong>Modelo 100</strong> — Declaración anual del IRPF (renta). De abril a junio.</li>
          <li><strong>Modelo 111</strong> — Retenciones que aplicas a trabajadores y profesionales. Trimestral.</li>
          <li><strong>Modelo 115</strong> — Retenciones por alquiler de local. Trimestral.</li>
          <li><strong>Modelo 190</strong> — Resumen anual del 111 (enero).</li>
          <li><strong>Modelo 180</strong> — Resumen anual del 115 (enero).</li>
          <li><strong>Modelo 347</strong> — Operaciones con terceros &gt; 3.005,06 € en el año. Solo en febrero.</li>
        </ul>
      </article>
    </div>
  );
}
