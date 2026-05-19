export interface IRPFTramo {
  desde: number;
  hasta: number | null;
  tipo: number;
}

export const TRAMOS_IRPF_ESTATAL_2025: IRPFTramo[] = [
  { desde: 0, hasta: 12450, tipo: 0.19 },
  { desde: 12450, hasta: 20200, tipo: 0.24 },
  { desde: 20200, hasta: 35200, tipo: 0.3 },
  { desde: 35200, hasta: 60000, tipo: 0.37 },
  { desde: 60000, hasta: 300000, tipo: 0.45 },
  { desde: 300000, hasta: null, tipo: 0.47 },
];

export function calcularIRPFAnual(baseImponible: number): {
  cuota: number;
  tipoEfectivo: number;
  desglose: { tramo: IRPFTramo; baseEnTramo: number; cuotaTramo: number }[];
} {
  if (baseImponible <= 0) {
    return { cuota: 0, tipoEfectivo: 0, desglose: [] };
  }
  const desglose: { tramo: IRPFTramo; baseEnTramo: number; cuotaTramo: number }[] = [];
  let cuota = 0;
  for (const tramo of TRAMOS_IRPF_ESTATAL_2025) {
    const techo = tramo.hasta ?? Number.POSITIVE_INFINITY;
    if (baseImponible <= tramo.desde) break;
    const baseEnTramo = Math.min(baseImponible, techo) - tramo.desde;
    if (baseEnTramo <= 0) continue;
    const cuotaTramo = baseEnTramo * tramo.tipo;
    cuota += cuotaTramo;
    desglose.push({ tramo, baseEnTramo, cuotaTramo });
  }
  const tipoEfectivo = baseImponible > 0 ? cuota / baseImponible : 0;
  return { cuota, tipoEfectivo, desglose };
}

export function calcularPagoFraccionado130(
  ingresosTrimestreNetos: number,
  gastosTrimestre: number,
  retencionesTrimestre: number = 0,
  pagosAnteriores: number = 0,
): number {
  const rendimientoNeto = Math.max(0, ingresosTrimestreNetos - gastosTrimestre);
  const cuota = rendimientoNeto * 0.2 - retencionesTrimestre - pagosAnteriores;
  return Math.max(0, cuota);
}
