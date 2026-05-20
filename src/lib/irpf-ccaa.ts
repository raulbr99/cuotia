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

export const TRAMOS_CCAA_2025: Record<CCAA, IRPFTramo[]> = {
  "andalucia": [
    { desde: 0, hasta: 13000, tipo: 0.095 },
    { desde: 13000, hasta: 21000, tipo: 0.12 },
    { desde: 21000, hasta: 35200, tipo: 0.15 },
    { desde: 35200, hasta: 60000, tipo: 0.185 },
    { desde: 60000, hasta: null, tipo: 0.225 },
  ],
  "aragon": [
    { desde: 0, hasta: 12450, tipo: 0.095 },
    { desde: 12450, hasta: 20200, tipo: 0.12 },
    { desde: 20200, hasta: 34000, tipo: 0.15 },
    { desde: 34000, hasta: 50000, tipo: 0.185 },
    { desde: 50000, hasta: 60000, tipo: 0.21 },
    { desde: 60000, hasta: 80000, tipo: 0.22 },
    { desde: 80000, hasta: null, tipo: 0.25 },
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
  "baleares": [
    { desde: 0, hasta: 10000, tipo: 0.09 },
    { desde: 10000, hasta: 18000, tipo: 0.1125 },
    { desde: 18000, hasta: 30000, tipo: 0.1425 },
    { desde: 30000, hasta: 48000, tipo: 0.175 },
    { desde: 48000, hasta: 70000, tipo: 0.19 },
    { desde: 70000, hasta: 90000, tipo: 0.2175 },
    { desde: 90000, hasta: 120000, tipo: 0.23 },
    { desde: 120000, hasta: 175000, tipo: 0.245 },
    { desde: 175000, hasta: null, tipo: 0.25 },
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
  "cataluna": [
    { desde: 0, hasta: 12450, tipo: 0.105 },
    { desde: 12450, hasta: 17707, tipo: 0.12 },
    { desde: 17707, hasta: 21000, tipo: 0.14 },
    { desde: 21000, hasta: 33007, tipo: 0.185 },
    { desde: 33007, hasta: 53407, tipo: 0.215 },
    { desde: 53407, hasta: 90000, tipo: 0.235 },
    { desde: 90000, hasta: 120000, tipo: 0.245 },
    { desde: 120000, hasta: 175000, tipo: 0.255 },
    { desde: 175000, hasta: null, tipo: 0.255 },
  ],
  "extremadura": [
    { desde: 0, hasta: 12450, tipo: 0.08 },
    { desde: 12450, hasta: 20200, tipo: 0.10 },
    { desde: 20200, hasta: 24200, tipo: 0.16 },
    { desde: 24200, hasta: 35200, tipo: 0.175 },
    { desde: 35200, hasta: 60000, tipo: 0.215 },
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
  "rioja": [
    { desde: 0, hasta: 12450, tipo: 0.09 },
    { desde: 12450, hasta: 20200, tipo: 0.116 },
    { desde: 20200, hasta: 35200, tipo: 0.146 },
    { desde: 35200, hasta: 50000, tipo: 0.188 },
    { desde: 50000, hasta: 60000, tipo: 0.195 },
    { desde: 60000, hasta: 120000, tipo: 0.25 },
    { desde: 120000, hasta: null, tipo: 0.27 },
  ],
  "madrid": [
    { desde: 0, hasta: 13362, tipo: 0.085 },
    { desde: 13362, hasta: 19004, tipo: 0.107 },
    { desde: 19004, hasta: 35425, tipo: 0.128 },
    { desde: 35425, hasta: 57320, tipo: 0.174 },
    { desde: 57320, hasta: null, tipo: 0.205 },
  ],
  "murcia": [
    { desde: 0, hasta: 12450, tipo: 0.095 },
    { desde: 12450, hasta: 20200, tipo: 0.1132 },
    { desde: 20200, hasta: 34000, tipo: 0.1406 },
    { desde: 34000, hasta: 60000, tipo: 0.1762 },
    { desde: 60000, hasta: null, tipo: 0.225 },
  ],
  "valencia": [
    { desde: 0, hasta: 12000, tipo: 0.09 },
    { desde: 12000, hasta: 22000, tipo: 0.12 },
    { desde: 22000, hasta: 32000, tipo: 0.15 },
    { desde: 32000, hasta: 42000, tipo: 0.175 },
    { desde: 42000, hasta: 52000, tipo: 0.20 },
    { desde: 52000, hasta: 65000, tipo: 0.225 },
    { desde: 65000, hasta: 72000, tipo: 0.24 },
    { desde: 72000, hasta: 150000, tipo: 0.25 },
    { desde: 150000, hasta: null, tipo: 0.295 },
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
