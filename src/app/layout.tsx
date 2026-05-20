import type { Metadata } from "next";
import { Inter, Archivo_Black, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: ["400"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cuotia · Calculadoras fiscales gratuitas para autónomos",
    template: "%s · Cuotia",
  },
  description:
    "Calculadoras gratuitas para autónomos en España: cuota mensual, IRPF, modelo 130, neto/bruto y calendario fiscal. Tramos 2025 actualizados.",
  keywords: [
    "calculadora autonomo",
    "cuota autonomo 2025",
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
    title: "Calculadoras fiscales para autónomos en España",
    description:
      "Calcula tu cuota, IRPF, modelo 130 y neto en segundos. Tramos 2025 vigentes.",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Calculadoras fiscales para autónomos")}&subtitle=${encodeURIComponent("Cuota, IRPF, modelo 130, neto/bruto y más. Sin registros, sin emails. Tramos 2025.")}`,
        width: 1200,
        height: 630,
        alt: "Cuotia — Calculadoras fiscales para autónomos en España",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cuotia · Calculadoras fiscales gratuitas",
    description: "Cuota, IRPF, modelo 130 y más en segundos.",
    images: [`${SITE_URL}/api/og?title=${encodeURIComponent("Calculadoras fiscales para autónomos")}`],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${archivoBlack.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
