export interface JubilacionResult {
  edadJubilacion: number;
  baseReguladora: number;
  porcentaje: number;
  pension: number;
  pensionAnual: number;
}

export function edadJubilacionLegal(anosCotizados: number): number {
  if (anosCotizados >= 38.5) return 65;
  return 67;
}

export function calcularPorcentajeJubilacion(anosCotizados: number): number {
  if (anosCotizados < 15) return 0;
  if (anosCotizados >= 36.5) return 1;
  const meses = anosCotizados * 12;
  let porcentaje = 0.5;
  let mesesRestantes = meses - 15 * 12;
  const tramo1 = Math.min(mesesRestantes, 248);
  porcentaje += tramo1 * 0.0021;
  mesesRestantes -= tramo1;
  if (mesesRestantes > 0) {
    const tramo2 = Math.min(mesesRestantes, 16);
    porcentaje += tramo2 * 0.0019;
  }
  return Math.min(porcentaje, 1);
}

export function calcularJubilacion(
  baseCotizacionMediaMensual: number,
  anosCotizados: number,
): JubilacionResult {
  const baseReguladora = baseCotizacionMediaMensual;
  const porcentaje = calcularPorcentajeJubilacion(anosCotizados);
  const pension = baseReguladora * porcentaje;
  return {
    edadJubilacion: edadJubilacionLegal(anosCotizados),
    baseReguladora,
    porcentaje,
    pension,
    pensionAnual: pension * 14,
  };
}
