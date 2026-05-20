import type { MetadataRoute } from "next";
import { CCAA_NAMES, type CCAA } from "@/lib/irpf-ccaa";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://calc-autonomo.vercel.app";

const ROUTES: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1.0, freq: "weekly" },
  { path: "/cuota-autonomo", priority: 0.95, freq: "monthly" },
  { path: "/calculadora-irpf", priority: 0.95, freq: "monthly" },
  { path: "/calculadora-iva", priority: 0.9, freq: "monthly" },
  { path: "/neto-bruto", priority: 0.9, freq: "monthly" },
  { path: "/calculadora-despido", priority: 0.9, freq: "monthly" },
  { path: "/baja-medica", priority: 0.8, freq: "monthly" },
  { path: "/jubilacion-autonomo", priority: 0.8, freq: "monthly" },
  { path: "/dietas-kilometraje", priority: 0.8, freq: "monthly" },
  { path: "/calendario-fiscal", priority: 0.85, freq: "monthly" },
  { path: "/guias", priority: 0.7, freq: "monthly" },
  { path: "/guias/alta-autonomo", priority: 0.8, freq: "monthly" },
  { path: "/guias/gastos-deducibles", priority: 0.85, freq: "monthly" },
  { path: "/guias/tarifa-plana", priority: 0.85, freq: "monthly" },
  { path: "/generador-facturas", priority: 0.95, freq: "monthly" },
];

const CCAA_ROUTES: { path: string; priority: number }[] = (Object.keys(CCAA_NAMES) as CCAA[])
  .filter((c) => c !== "navarra" && c !== "pais-vasco")
  .map((c) => ({ path: `/irpf/${c}`, priority: 0.9 }));

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...ROUTES.map((r) => ({
      url: `${BASE}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...CCAA_ROUTES.map((r) => ({
      url: `${BASE}${r.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r.priority,
    })),
  ];
}
