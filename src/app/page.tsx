import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Newsletter } from "@/components/Newsletter";

const PRIMARY = [
  {
    href: "/cuota-autonomo",
    eyebrow: "Lo que más buscan",
    title: "Cuota de autónomo 2025",
    teaser: "Los 15 tramos por ingresos reales. Tarifa plana incluida.",
    stat: "230 €",
    statLabel: "cuota mínima/mes",
  },
  {
    href: "/calculadora-irpf",
    eyebrow: "Para la renta",
    title: "IRPF + modelo 130",
    teaser: "Escala estatal + 17 escalas autonómicas. Pago fraccionado trimestral.",
    stat: "17",
    statLabel: "CCAA cubiertas",
  },
];

const SECONDARY = [
  { href: "/calculadora-iva", title: "IVA + modelo 303", desc: "Añade, quita o calcula el 303 trimestral." },
  { href: "/neto-bruto", title: "Neto / Bruto", desc: "Lo que te queda después de gastos, cuota e IRPF." },
  { href: "/calculadora-despido", title: "Despido + finiquito", desc: "Improcedente, objetivo, colectivo. Finiquito completo." },
  { href: "/baja-medica", title: "Baja médica", desc: "Por enfermedad común o accidente laboral." },
  { href: "/jubilacion-autonomo", title: "Jubilación", desc: "Pensión según base media y años cotizados." },
  { href: "/dietas-kilometraje", title: "Dietas + km", desc: "Exentas vigentes 2025. Sin sorpresas." },
];

const TOOLS = [
  { href: "/generador-facturas", title: "Generador de facturas", desc: "PDF con todos los campos legales en 1 min." },
  { href: "/calendario-fiscal", title: "Calendario fiscal", desc: "303, 130, 390, 100, 111, 115, 347. Sin perderte ninguna." },
  { href: "/guias", title: "Guías", desc: "Alta de autónomo, gastos deducibles, tarifa plana." },
];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Cuotia",
  url: SITE_URL,
  description: "Calculadoras fiscales gratuitas para autónomos en España",
  inLanguage: "es-ES",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cuotia",
  url: SITE_URL,
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      {/* HERO */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-5xl px-5 py-12 md:py-20">
          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 mb-5">
                Calculadoras fiscales · 2026
              </p>
              <h1 className="font-serif text-[2.5rem] leading-[1.05] tracking-tight text-neutral-900 sm:text-6xl md:text-[5rem]">
                Hacienda no te lo<br />
                cuenta claro.<br />
                <span className="italic text-[#B91C1C]">Aquí&nbsp;sí.</span>
              </h1>
              <p className="mt-7 text-[15px] leading-relaxed text-neutral-700 max-w-md">
                Cuota, IRPF, IVA, despido, jubilación. Calculadoras gratis,
                sin registro, con los datos oficiales del BOE.
              </p>
              <p className="mt-3 text-[13px] italic text-neutral-500 max-w-md">
                Hechas por autónomos hartos de no saber cuánto deben.
              </p>
            </div>
            <div className="md:col-span-5">
              <Image
                src="/hero-stamp.jpg"
                alt="Ilustración editorial de un sello de tinta junto a su impresión en rojo"
                width={1024}
                height={576}
                priority
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <Stat value="230 €" label="Cuota mínima mensual 2026" />
            <Stat value="1.085 €" label="Cuota máxima mensual 2026" />
            <Stat value="87 €" label="Tarifa plana primer año" />
            <Stat value="15" label="Tramos por ingresos reales" />
          </div>
        </div>
      </section>

      {/* PRIMARY CALCS */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <div className="grid gap-10 md:grid-cols-2">
            {PRIMARY.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group block border-l-2 border-neutral-900 pl-6 transition-colors hover:border-[#B91C1C]"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#B91C1C] mb-2">
                  {c.eyebrow}
                </p>
                <h2 className="font-serif text-3xl leading-tight tracking-tight text-neutral-900 sm:text-4xl">
                  {c.title}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">{c.teaser}</p>
                <div className="mt-6 flex items-end gap-5">
                  <div>
                    <p className="font-serif text-4xl text-neutral-900">{c.stat}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-neutral-500">
                      {c.statLabel}
                    </p>
                  </div>
                  <span className="ml-auto mb-1 inline-flex items-center gap-1 text-[13px] text-neutral-700 transition-colors group-hover:text-[#B91C1C]">
                    Calcular
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECONDARY CALCS */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-5xl px-5 py-14">
          <h3 className="font-serif text-2xl tracking-tight text-neutral-900 mb-8">
            Y el resto del papeleo.
          </h3>
          <div className="grid gap-px bg-neutral-200 border border-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
            {SECONDARY.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group block bg-[#FAFAF7] p-6 transition-colors hover:bg-white"
              >
                <p className="font-serif text-xl leading-tight text-neutral-900 group-hover:text-[#B91C1C]">
                  {c.title}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-14">
          <div className="grid gap-10 md:grid-cols-3">
            {TOOLS.map((t) => (
              <Link key={t.href} href={t.href} className="group block">
                <p className="text-[11px] uppercase tracking-wider text-neutral-400 mb-2">Herramienta</p>
                <p className="font-serif text-2xl leading-tight text-neutral-900 group-hover:text-[#B91C1C] transition-colors">
                  {t.title}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">{t.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-[12px] text-neutral-500 group-hover:text-[#B91C1C]">
                  Abrir
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO with desk image */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <div className="grid gap-10 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <Image
                src="/manifesto-desk.png"
                alt="Ilustración editorial cenital de un escritorio con calculadora, formularios fiscales y café"
                width={1024}
                height={576}
                className="w-full h-auto"
              />
              <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[#B91C1C]">
                Por qué Cuotia
              </p>
              <h3 className="mt-2 font-serif text-3xl leading-tight tracking-tight text-neutral-900">
                Sin registro,<br /> sin pop-ups,<br /> sin trampa.
              </h3>
            </div>
            <div className="md:col-span-7 space-y-5 text-[15px] leading-relaxed text-neutral-700">
              <p>
                Todo se calcula en tu navegador. No subimos tus números a ningún servidor.
                No pedimos email para enseñarte el resultado.
              </p>
              <p>
                Las cifras vienen del BOE, AEAT y Seguridad Social. Actualizamos cuando
                cambia la ley, no cuando nos acordamos.
              </p>
              <p className="text-neutral-500 italic text-[13px]">
                ¿Quieres avisos cuando cambien tramos o haya nuevos modelos?
                Apúntate abajo. Es lo único que pedimos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section>
        <div className="mx-auto max-w-3xl px-5 py-16">
          <Newsletter source="homepage" />
        </div>
      </section>

      {/* AVISO */}
      <section className="border-t border-neutral-200 bg-[#F5F5F0]">
        <div className="mx-auto max-w-3xl px-5 py-8 text-center">
          <p className="text-[12px] leading-relaxed text-neutral-500">
            <strong className="text-neutral-700">Aviso.</strong> Los cálculos son orientativos.
            Se basan en los tramos generales 2025 (RD-ley 13/2022) y la escala estatal del
            IRPF. No incluyen escalas autonómicas, deducciones personales ni circunstancias
            particulares. Para presentar tus modelos, consulta a un gestor.
          </p>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-serif text-3xl text-neutral-900">{value}</p>
      <p className="mt-1 text-[11px] uppercase tracking-wider text-neutral-500 leading-tight">
        {label}
      </p>
    </div>
  );
}
