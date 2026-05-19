export type TipoDespido = "procedente" | "improcedente" | "colectivo" | "objetivo";

export interface DespidoResult {
  diasIndemnizacion: number;
  mensualidades: number;
  indemnizacion: number;
  topeAnos: number;
  topeMensualidades: number;
}

const DIAS_POR_TIPO: Record<TipoDespido, number> = {
  procedente: 0,
  improcedente: 33,
  colectivo: 20,
  objetivo: 20,
};

const TOPE_MENSUALIDADES: Record<TipoDespido, number> = {
  procedente: 0,
  improcedente: 24,
  colectivo: 12,
  objetivo: 12,
};

export function calcularDespido(
  salarioBrutoAnual: number,
  anosTrabajados: number,
  tipo: TipoDespido,
): DespidoResult {
  const dias = DIAS_POR_TIPO[tipo];
  const topeMensualidades = TOPE_MENSUALIDADES[tipo];
  const salarioMensual = salarioBrutoAnual / 14;
  const salarioDiario = salarioBrutoAnual / 365;

  const diasIndemnizacion = dias * anosTrabajados;
  const indemnizacionSinTope = diasIndemnizacion * salarioDiario;
  const tope = topeMensualidades * salarioMensual;
  const indemnizacion = topeMensualidades > 0
    ? Math.min(indemnizacionSinTope, tope)
    : 0;
  const mensualidades = salarioMensual > 0 ? indemnizacion / salarioMensual : 0;

  return {
    diasIndemnizacion,
    mensualidades,
    indemnizacion,
    topeAnos: topeMensualidades,
    topeMensualidades,
  };
}

export function calcularFiniquito(
  salarioBrutoAnual: number,
  diasVacacionesNoDisfrutadas: number,
  diasPagaExtraProporcional: number,
  salarioPendiente: number = 0,
): { vacaciones: number; extra: number; salarioPendiente: number; total: number } {
  const salarioDiario = salarioBrutoAnual / 365;
  const vacaciones = diasVacacionesNoDisfrutadas * salarioDiario;
  const extra = diasPagaExtraProporcional * salarioDiario;
  return {
    vacaciones,
    extra,
    salarioPendiente,
    total: vacaciones + extra + salarioPendiente,
  };
}
