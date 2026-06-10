import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import { ChatWidget } from "@/components/ChatWidget";
import { ADSENSE_CLIENT } from "@/lib/adsense";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  colorScheme: "light",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

// Entidad de sitio única (Organization + WebSite) con @id, emitida en todas las
// páginas. El resto de schemas (Article, WebApplication, Breadcrumb...) referencian
// `${SITE_URL}/#org` por @id, de modo que Google y los LLMs consolidan "Cuotia"
// como una sola entidad en lugar de varias Organization sueltas.
const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Cuotia",
      url: SITE_URL,
      foundingDate: "2026-05-20",
      description:
        "Calculadoras fiscales gratuitas para autónomos en España. Sin registros, sin emails, sin venta de servicios.",
      knowsAbout: [
        "IRPF", "IVA", "Cuota de autónomo", "RETA", "Tarifa plana", "Modelo 130",
        "Modelo 303", "Despido y finiquito", "Baja médica autónomo", "Jubilación autónomo", "Verifactu",
      ],
      areaServed: { "@type": "Country", name: "España" },
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/icon-512.png`,
        width: 512,
        height: 512,
      },
      email: "hola@cuotia.es",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Cuotia",
      description: "Calculadoras fiscales gratuitas para autónomos en España",
      inLanguage: "es-ES",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cuotia · Calculadoras fiscales para autónomos sin BS",
    template: "%s · Cuotia",
  },
  description:
    "Calculadoras fiscales gratis para autónomos en España. Cuota, IRPF, IVA, despido. Sin registros. Datos oficiales 2026.",
  keywords: [
    "calculadora autonomo",
    "cuota autonomo 2026",
    "calculadora IRPF autonomo",
    "modelo 130 autonomo",
    "neto bruto autonomo",
    "calendario fiscal autonomo",
    "tarifa plana autonomo",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "Cuotia",
    title: "Calculadoras fiscales para autónomos sin BS",
    description: "Cuota, IRPF, modelo 130 y más en segundos. Sin registros, sin emails.",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Calculadoras fiscales para autónomos")}&subtitle=${encodeURIComponent("Cuota, IRPF, modelo 130, neto/bruto y más. Sin registros, sin emails. Tramos 2026.")}`,
        width: 1200,
        height: 630,
        alt: "Cuotia — Calculadoras fiscales para autónomos en España",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cuotia · Calculadoras fiscales para autónomos sin BS",
    description: "Cuota, IRPF, modelo 130 y más en segundos.",
    images: [`${SITE_URL}/api/og?title=${encodeURIComponent("Calculadoras fiscales para autónomos")}`],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  // Verificación de propiedad de Google AdSense (método meta-etiqueta).
  // Renderiza <meta name="google-adsense-account" content="ca-pub-..."> en el <head>.
  other: { "google-adsense-account": ADSENSE_CLIENT },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAFAF7] text-neutral-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <section className="border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-3xl px-5 py-12">
            <Newsletter source="footer" />
          </div>
        </section>
        <Footer />
        <ChatWidget />
        {/* Snippet de AdSense como <script> literal: React 19 lo iza al <head>,
            que es donde el rastreador de verificación de AdSense lo busca. */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
