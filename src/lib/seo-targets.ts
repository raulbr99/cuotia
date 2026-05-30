// Fuente ÚNICA de las URLs programáticas long-tail. La usan:
// - sitemap.ts            → qué URLs listar
// - las rutas [ingresos]  → qué prerenderizar en generateStaticParams
//                           (con dynamicParams=false SOLO existen estas)
// - las páginas hub       → a qué hijos enlazar
// Mantenerlas aquí garantiza que los enlaces de los hubs apuntan siempre a
// páginas que existen (nunca a un 404) y que sitemap y rutas no se desincronizan.

export const CUOTA_INGRESOS_TARGETS = [
  500, 800, 1000, 1200, 1300, 1500, 1700, 1800, 2000, 2200, 2500,
  2800, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 7000, 8000, 9000,
  10000, 12000, 15000,
];

export const NETO_BRUTO_TARGETS = [
  15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 100000,
];

export const IRPF_INGRESOS_TARGETS = [
  15000, 20000, 25000, 30000, 40000, 50000, 60000, 80000, 100000,
];

export const cuotaSlug = (n: number): string => `${n}-euros-mes`;
export const netoBrutoSlug = (n: number): string => `${n}-euros-brutos`;
export const irpfSlug = (n: number): string => `${n}-euros`;
