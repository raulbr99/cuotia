import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import { ChatWidget } from "@/components/ChatWidget";

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
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAFAF7] text-neutral-900">
        <Header />
        <main className="flex-1">{children}</main>
        <section className="border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-3xl px-5 py-12">
            <Newsletter source="footer" />
          </div>
        </section>
        <Footer />
        <ChatWidget />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
