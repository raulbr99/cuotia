export interface Tramo {
  numero: number;
  label: string;
  minIngresos: number;
  maxIngresos: number | null;
  cuotaMin: number;
  cuotaMax: number;
}

// Tramos vigentes 2026. Cuotas congeladas respecto a 2025 por
// RD-ley 3/2026 (BOE 4 feb 2026) + Orden PJC/297/2026 (BOE 31 marzo 2026).
// MEI 2026 = 0,9% sobre base de cotización (sumado a la cuota mínima).
export const TRAMOS_2026: Tramo[] = [
  { numero: 1, label: "Tramo 1 (reducida)", minIngresos: 0, maxIngresos: 670, cuotaMin: 200, cuotaMax: 590 },
  { numero: 2, label: "Tramo 2", minIngresos: 670, maxIngresos: 900, cuotaMin: 220, cuotaMax: 590 },
  { numero: 3, label: "Tramo 3", minIngresos: 900, maxIngresos: 1166.7, cuotaMin: 260, cuotaMax: 590 },
  { numero: 4, label: "Tramo 4 (general)", minIngresos: 1166.7, maxIngresos: 1300, cuotaMin: 291, cuotaMax: 590 },
  { numero: 5, label: "Tramo 5", minIngresos: 1300, maxIngresos: 1500, cuotaMin: 294, cuotaMax: 590 },
  { numero: 6, label: "Tramo 6", minIngresos: 1500, maxIngresos: 1700, cuotaMin: 302, cuotaMax: 590 },
  { numero: 7, label: "Tramo 7", minIngresos: 1700, maxIngresos: 1850, cuotaMin: 350, cuotaMax: 770 },
  { numero: 8, label: "Tramo 8", minIngresos: 1850, maxIngresos: 2030, cuotaMin: 370, cuotaMax: 770 },
  { numero: 9, label: "Tramo 9", minIngresos: 2030, maxIngresos: 2330, cuotaMin: 390, cuotaMax: 815 },
  { numero: 10, label: "Tramo 10", minIngresos: 2330, maxIngresos: 2760, cuotaMin: 423, cuotaMax: 860 },
  { numero: 11, label: "Tramo 11", minIngresos: 2760, maxIngresos: 3190, cuotaMin: 451, cuotaMax: 905 },
  { numero: 12, label: "Tramo 12", minIngresos: 3190, maxIngresos: 3620, cuotaMin: 468, cuotaMax: 950 },
  { numero: 13, label: "Tramo 13", minIngresos: 3620, maxIngresos: 4050, cuotaMin: 504, cuotaMax: 995 },
  { numero: 14, label: "Tramo 14", minIngresos: 4050, maxIngresos: 6000, cuotaMin: 530, cuotaMax: 1040 },
  { numero: 15, label: "Tramo 15", minIngresos: 6000, maxIngresos: null, cuotaMin: 590, cuotaMax: 1085 },
];

// Backwards-compat alias for components still importing the old name.
export const TRAMOS_2025 = TRAMOS_2026;

export function findTramo(ingresosMensuales: number): Tramo {
  return (
    TRAMOS_2026.find(
      (t) =>
        ingresosMensuales >= t.minIngresos &&
        (t.maxIngresos === null || ingresosMensuales < t.maxIngresos),
    ) ?? TRAMOS_2026[TRAMOS_2026.length - 1]
  );
}

// Tarifa plana 2026: 80 €/mes base + MEI 0,9% = ~88,64 €/mes
export const TARIFA_PLANA_MENSUAL = 88.64;
export const TARIFA_PLANA_BASE_SIN_MEI = 80;
export const TARIFA_PLANA_MESES_BASE = 12;
export const TARIFA_PLANA_PRORROGABLE = 12;
export const MEI_PORCENTAJE_2026 = 0.009;

// Autónomos societarios y colaboradores familiares 2026:
// base mínima sube de 1.000 € a 1.424,40 €/mes (+42,4%).
export const BASE_MINIMA_SOCIETARIO_2026 = 1424.4;
