export type ContingenciaBaja = "comun" | "profesional";

export interface BajaResult {
  base: number;
  prestacionDiaria: number;
  prestacionMes1: number;
  prestacionMes2enAdelante: number;
  porcentajeTramo1: number;
  porcentajeTramo2: number;
  porcentajeTramo3: number;
}

export function calcularBajaMedica(
  baseCotizacionMensual: number,
  contingencia: ContingenciaBaja,
): BajaResult {
  const baseDiaria = baseCotizacionMensual / 30;

  let porc1 = 0, porc2 = 0, porc3 = 0;

  if (contingencia === "comun") {
    porc1 = 0;
    porc2 = 0.6;
    porc3 = 0.75;
  } else {
    porc1 = 0.75;
    porc2 = 0.75;
    porc3 = 0.75;
  }

  const dailyMes1 = baseDiaria * (porc1 * 3 + porc2 * (20 - 3) + porc3 * (30 - 20)) / 30;
  const dailyMes2 = baseDiaria * porc3;

  return {
    base: baseCotizacionMensual,
    prestacionDiaria: baseDiaria * porc2,
    prestacionMes1: dailyMes1 * 30,
    prestacionMes2enAdelante: dailyMes2 * 30,
    porcentajeTramo1: porc1,
    porcentajeTramo2: porc2,
    porcentajeTramo3: porc3,
  };
}
