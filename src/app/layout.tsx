import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://calc-autonomo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CalcAutónomo · Calculadoras fiscales gratuitas para autónomos",
    template: "%s · CalcAutónomo",
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
    siteName: "CalcAutónomo",
    title: "Calculadoras fiscales para autónomos en España",
    description:
      "Calcula tu cuota, IRPF, modelo 130 y neto en segundos. Tramos 2025 vigentes.",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Calculadoras fiscales para autónomos")}&subtitle=${encodeURIComponent("Cuota, IRPF, modelo 130, neto/bruto y más. Sin registros, sin emails. Tramos 2025.")}`,
        width: 1200,
        height: 630,
        alt: "CalcAutónomo — Calculadoras fiscales para autónomos en España",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CalcAutónomo · Calculadoras fiscales gratuitas",
    description: "Cuota, IRPF, modelo 130 y más en segundos.",
    images: [`${SITE_URL}/api/og?title=${encodeURIComponent("Calculadoras fiscales para autónomos")}`],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
