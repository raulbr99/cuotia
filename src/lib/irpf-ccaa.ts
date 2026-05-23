import { type IRPFTramo, calcularIRPFAnual as calcularEstatal } from "./irpf";

export const TRAMOS_IRPF_ESTATAL_2025_HALF: IRPFTramo[] = [
  { desde: 0, hasta: 12450, tipo: 0.095 },
  { desde: 12450, hasta: 20200, tipo: 0.12 },
  { desde: 20200, hasta: 35200, tipo: 0.15 },
  { desde: 35200, hasta: 60000, tipo: 0.185 },
  { desde: 60000, hasta: 300000, tipo: 0.225 },
  { desde: 300000, hasta: null, tipo: 0.245 },
];

export type CCAA =
  | "andalucia" | "aragon" | "asturias" | "baleares" | "canarias"
  | "cantabria" | "castilla-leon" | "castilla-mancha" | "cataluna"
  | "extremadura" | "galicia" | "rioja" | "madrid" | "murcia"
  | "valencia" | "navarra" | "pais-vasco";

export const CCAA_NAMES: Record<CCAA, string> = {
  "andalucia": "Andalucía",
  "aragon": "Aragón",
  "asturias": "Asturias",
  "baleares": "Islas Baleares",
  "canarias": "Canarias",
  "cantabria": "Cantabria",
  "castilla-leon": "Castilla y León",
  "castilla-mancha": "Castilla-La Mancha",
  "cataluna": "Cataluña",
  "extremadura": "Extremadura",
  "galicia": "Galicia",
  "rioja": "La Rioja",
  "madrid": "Madrid",
  "murcia": "Región de Murcia",
  "valencia": "Comunidad Valenciana",
  "navarra": "Navarra",
  "pais-vasco": "País Vasco",
};

// Escalas autonómicas IRPF vigentes para declaración Renta 2025 (presentada en 2026).
// Última verificación: 23 mayo 2026 contra TaxDown + guiafiscal + DOGC/BORM/BOR + Decretos-Ley.
// LAS 15 CCAA de régimen común están verificadas individualmente.
// Régimen foral (Navarra, País Vasco) NO se incluye — consultar Hacienda Foral.
// Normas de referencia por CCAA:
// - Cataluña: Decret-llei 5/2025 (DOGC 25 marzo 2025)
// - Madrid: Ley 13/2023 (deflactación)
// - La Rioja: Ley 13/2023 (BOR 22 dic 2023)
// - Murcia: Ley 11/2023 (BORM 28 dic 2023) + Ley 9/2025 (deflactación automática IPC >3%)
// - Extremadura: Decreto-Ley 4/2023
// - Valencia: Ley 13/1997 mod. Ley 9/2022 (efectos 1 enero 2023)
// - Galicia: Decreto Legislativo 1/2011
export const TRAMOS_CCAA_2025: Record<CCAA, IRPFTramo[]> = {
  // Andalucía 2026 (TaxDown verified): añade tramo 50k-60k al 22,5%
  // que antes estaba consolidado en 35,2k-60k al 18,5%.
  "andalucia": [
    { desde: 0, hasta: 13000, tipo: 0.095 },
    { desde: 13000, hasta: 21000, tipo: 0.12 },
    { desde: 21000, hasta: 35200, tipo: 0.15 },
    { desde: 35200, hasta: 50000, tipo: 0.185 },
    { desde: 50000, hasta: null, tipo: 0.225 },
  ],
  // Aragón 2026 (TaxDown verified): escala completa nueva con 9 tramos
  // (umbrales superiores 13.972,5 / 21.210 / 36.960 / 52.500 / 80.000 / 90.000 / 130.000),
  // marginal máximo 25,5% por encima de 130.000 €.
  "aragon": [
    { desde: 0, hasta: 13972.5, tipo: 0.095 },
    { desde: 13972.5, hasta: 21210, tipo: 0.12 },
    { desde: 21210, hasta: 36960, tipo: 0.15 },
    { desde: 36960, hasta: 52500, tipo: 0.185 },
    { desde: 52500, hasta: 60000, tipo: 0.205 },
    { desde: 60000, hasta: 80000, tipo: 0.23 },
    { desde: 80000, hasta: 90000, tipo: 0.24 },
    { desde: 90000, hasta: 130000, tipo: 0.25 },
    { desde: 130000, hasta: null, tipo: 0.255 },
  ],
  "asturias": [
    { desde: 0, hasta: 12450, tipo: 0.10 },
    { desde: 12450, hasta: 17707, tipo: 0.12 },
    { desde: 17707, hasta: 33007, tipo: 0.14 },
    { desde: 33007, hasta: 53407, tipo: 0.185 },
    { desde: 53407, hasta: 70000, tipo: 0.215 },
    { desde: 70000, hasta: 90000, tipo: 0.225 },
    { desde: 90000, hasta: 175000, tipo: 0.25 },
    { desde: 175000, hasta: null, tipo: 0.255 },
  ],
  // Baleares 2026 (TaxDown verified): reducción aplicada a partir 90k:
  // 22,75% (era 23%), 23,75% (era 24,5%), 24,75% (era 25%).
  "baleares": [
    { desde: 0, hasta: 10000, tipo: 0.09 },
    { desde: 10000, hasta: 18000, tipo: 0.1125 },
    { desde: 18000, hasta: 30000, tipo: 0.1425 },
    { desde: 30000, hasta: 48000, tipo: 0.175 },
    { desde: 48000, hasta: 70000, tipo: 0.19 },
    { desde: 70000, hasta: 90000, tipo: 0.2175 },
    { desde: 90000, hasta: 120000, tipo: 0.2275 },
    { desde: 120000, hasta: 175000, tipo: 0.2375 },
    { desde: 175000, hasta: null, tipo: 0.2475 },
  ],
  "canarias": [
    { desde: 0, hasta: 12450, tipo: 0.09 },
    { desde: 12450, hasta: 17707, tipo: 0.115 },
    { desde: 17707, hasta: 33007, tipo: 0.14 },
    { desde: 33007, hasta: 53407, tipo: 0.185 },
    { desde: 53407, hasta: 90000, tipo: 0.235 },
    { desde: 90000, hasta: 120000, tipo: 0.25 },
    { desde: 120000, hasta: null, tipo: 0.26 },
  ],
  "cantabria": [
    { desde: 0, hasta: 13000, tipo: 0.085 },
    { desde: 13000, hasta: 21000, tipo: 0.11 },
    { desde: 21000, hasta: 35200, tipo: 0.145 },
    { desde: 35200, hasta: 60000, tipo: 0.18 },
    { desde: 60000, hasta: 90000, tipo: 0.225 },
    { desde: 90000, hasta: null, tipo: 0.245 },
  ],
  "castilla-leon": [
    { desde: 0, hasta: 12450, tipo: 0.09 },
    { desde: 12450, hasta: 20200, tipo: 0.12 },
    { desde: 20200, hasta: 35200, tipo: 0.14 },
    { desde: 35200, hasta: 53407, tipo: 0.185 },
    { desde: 53407, hasta: null, tipo: 0.215 },
  ],
  "castilla-mancha": [
    { desde: 0, hasta: 12450, tipo: 0.095 },
    { desde: 12450, hasta: 20200, tipo: 0.12 },
    { desde: 20200, hasta: 35200, tipo: 0.15 },
    { desde: 35200, hasta: 60000, tipo: 0.185 },
    { desde: 60000, hasta: null, tipo: 0.225 },
  ],
  // Cataluña 2025/2026 — escala completamente nueva tras Decret-llei 5/2025
  // (DOGC 25 marzo 2025, efectos 1 enero 2025).
  // 8 tramos (antes 9). Tipo inicial bajado del 10,5% al 9,5%.
  // Umbrales redondeados (12.500 / 22.000 / 33.000 / 53.000).
  "cataluna": [
    { desde: 0, hasta: 12500, tipo: 0.095 },
    { desde: 12500, hasta: 22000, tipo: 0.125 },
    { desde: 22000, hasta: 33000, tipo: 0.16 },
    { desde: 33000, hasta: 53000, tipo: 0.19 },
    { desde: 53000, hasta: 90000, tipo: 0.215 },
    { desde: 90000, hasta: 120000, tipo: 0.235 },
    { desde: 120000, hasta: 175000, tipo: 0.245 },
    { desde: 175000, hasta: null, tipo: 0.255 },
  ],
  // Extremadura 2026 (Decreto-Ley 4/2023, sin cambios para 2026):
  // fix tramo 35.200-60.000 al 21% (era 21,5%, error histórico).
  "extremadura": [
    { desde: 0, hasta: 12450, tipo: 0.08 },
    { desde: 12450, hasta: 20200, tipo: 0.10 },
    { desde: 20200, hasta: 24200, tipo: 0.16 },
    { desde: 24200, hasta: 35200, tipo: 0.175 },
    { desde: 35200, hasta: 60000, tipo: 0.21 },
    { desde: 60000, hasta: 80200, tipo: 0.235 },
    { desde: 80200, hasta: 99200, tipo: 0.24 },
    { desde: 99200, hasta: 120200, tipo: 0.245 },
    { desde: 120200, hasta: null, tipo: 0.25 },
  ],
  "galicia": [
    { desde: 0, hasta: 12985, tipo: 0.09 },
    { desde: 12985, hasta: 21068, tipo: 0.1165 },
    { desde: 21068, hasta: 35200, tipo: 0.149 },
    { desde: 35200, hasta: 60000, tipo: 0.184 },
    { desde: 60000, hasta: null, tipo: 0.225 },
  ],
  // La Rioja 2026 (Ley 13/2023, BOR 22 dic 2023): rebaja de tipos.
  // Antes: 9 / 11,6 / 14,6 / 18,8 / 19,5 / 25 / 27
  // Ahora: 8 / 10,6 / 13,6 / 17,8 / 18,3 / 19 / 24,5 / 27
  // 8 tramos en lugar de 7 (nuevo tramo 35.200-40.000 al 17,8% y 40.000-50.000 al 18,3%).
  "rioja": [
    { desde: 0, hasta: 12450, tipo: 0.08 },
    { desde: 12450, hasta: 20200, tipo: 0.106 },
    { desde: 20200, hasta: 35200, tipo: 0.136 },
    { desde: 35200, hasta: 40000, tipo: 0.178 },
    { desde: 40000, hasta: 50000, tipo: 0.183 },
    { desde: 50000, hasta: 60000, tipo: 0.19 },
    { desde: 60000, hasta: 120000, tipo: 0.245 },
    { desde: 120000, hasta: null, tipo: 0.27 },
  ],
  "madrid": [
    { desde: 0, hasta: 13362, tipo: 0.085 },
    { desde: 13362, hasta: 19004, tipo: 0.107 },
    { desde: 19004, hasta: 35425, tipo: 0.128 },
    { desde: 35425, hasta: 57320, tipo: 0.174 },
    { desde: 57320, hasta: null, tipo: 0.205 },
  ],
  // Murcia 2026 (Ley 11/2023, BORM 28 dic 2023): ajustes menores en tipos
  // intermedios. La escala se actualizó tras la reforma autonómica.
  // Nueva Ley 9/2025 introduce mecanismo automático de deflactación si IPC >3%.
  "murcia": [
    { desde: 0, hasta: 12450, tipo: 0.095 },
    { desde: 12450, hasta: 20200, tipo: 0.112 },
    { desde: 20200, hasta: 34000, tipo: 0.133 },
    { desde: 34000, hasta: 60000, tipo: 0.179 },
    { desde: 60000, hasta: null, tipo: 0.225 },
  ],
  // Valencia 2026 (Ley 13/1997 mod. Ley 9/2022, vigente desde 1 enero 2023):
  // escala completa de 11 tramos (no 9 como teníamos antes).
  // Cambios en tramos altos: 62k-72k al 25%, 72k-100k al 26,5%, 100k-150k al
  // 27,5%, 150k-200k al 28,5%, >200k al 29,5%.
  "valencia": [
    { desde: 0, hasta: 12000, tipo: 0.09 },
    { desde: 12000, hasta: 22000, tipo: 0.12 },
    { desde: 22000, hasta: 32000, tipo: 0.15 },
    { desde: 32000, hasta: 42000, tipo: 0.175 },
    { desde: 42000, hasta: 52000, tipo: 0.20 },
    { desde: 52000, hasta: 62000, tipo: 0.225 },
    { desde: 62000, hasta: 72000, tipo: 0.25 },
    { desde: 72000, hasta: 100000, tipo: 0.265 },
    { desde: 100000, hasta: 150000, tipo: 0.275 },
    { desde: 150000, hasta: 200000, tipo: 0.285 },
    { desde: 200000, hasta: null, tipo: 0.295 },
  ],
  "navarra": [],
  "pais-vasco": [],
};

export function calcularIRPFConCCAA(baseImponible: number, ccaa: CCAA): {
  estatal: number;
  autonomico: number;
  total: number;
  tipoEfectivo: number;
  esRegimenForal: boolean;
} {
  const estatalRes = calcularEstatal(baseImponible);
  const estatalHalf = estatalRes.cuota / 2;
  const tramosCCAA = TRAMOS_CCAA_2025[ccaa];

  if (ccaa === "navarra" || ccaa === "pais-vasco") {
    return {
      estatal: 0,
      autonomico: 0,
      total: 0,
      tipoEfectivo: 0,
      esRegimenForal: true,
    };
  }

  const estatalSoloAportacion = calculaPorTramos(baseImponible, TRAMOS_IRPF_ESTATAL_2025_HALF);
  const autonomico = calculaPorTramos(baseImponible, tramosCCAA);
  const total = estatalSoloAportacion + autonomico;
  return {
    estatal: estatalSoloAportacion,
    autonomico,
    total,
    tipoEfectivo: baseImponible > 0 ? total / baseImponible : 0,
    esRegimenForal: false,
  };
}

function calculaPorTramos(base: number, tramos: IRPFTramo[]): number {
  if (base <= 0 || tramos.length === 0) return 0;
  let cuota = 0;
  for (const t of tramos) {
    const techo = t.hasta ?? Number.POSITIVE_INFINITY;
    if (base <= t.desde) break;
    const baseEnTramo = Math.min(base, techo) - t.desde;
    if (baseEnTramo <= 0) continue;
    cuota += baseEnTramo * t.tipo;
  }
  return cuota;
}
