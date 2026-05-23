// Comparativa "tarifa hora" vs "precio cerrado por proyecto".
// El post de 323↑ en r/AutonomosES dejaba clara la sensación: cobrar por
// proyecto bien estructurado multiplica facturación con menos horas. Esta
// calc objetiva la decisión.

export interface ComparativaInput {
  // Modo "hora"
  tarifaHora: number;          // €/hora
  horasMes: number;             // horas facturables/mes en modelo hora

  // Modo "proyecto"
  precioProyecto: number;      // € cerrados por proyecto
  horasProyecto: number;       // horas reales que dedicas al proyecto
  proyectosMes: number;        // proyectos cerrados/mes

  // Comunes
  semanasVacaciones?: number;  // semanas vacaciones/año (default 4)
}

export interface ComparativaOutput {
  hora: {
    facturacionMes: number;
    facturacionAnual: number;
    horasMes: number;
    horasAnuales: number;
    rateEfectivo: number;       // €/hora real (= tarifaHora)
  };
  proyecto: {
    facturacionMes: number;
    facturacionAnual: number;
    horasMes: number;
    horasAnuales: number;
    rateEfectivo: number;       // €/hora equivalente (precio / horas)
  };
  diferenciaAnual: number;     // proyecto.anual - hora.anual
  diferenciaHorasMes: number;  // proyecto - hora (negativo = trabajas menos)
  ganadorFacturacion: "hora" | "proyecto" | "empate";
  ganadorEficiencia: "hora" | "proyecto" | "empate";
  breakevenHoras: number;      // horas máx por proyecto para que rate proyecto >= rate hora
}

export function calcularComparativa(input: ComparativaInput): ComparativaOutput {
  const semanasVac = input.semanasVacaciones ?? 4;
  const mesesAnio = (52 - semanasVac) / 4.345; // ≈ 11 meses trabajados

  const horaFactMes = input.tarifaHora * input.horasMes;
  const horaFactAnual = horaFactMes * mesesAnio;
  const horaHorasAnuales = input.horasMes * mesesAnio;

  const proyectoFactMes = input.precioProyecto * input.proyectosMes;
  const proyectoFactAnual = proyectoFactMes * mesesAnio;
  const proyectoHorasMes = input.horasProyecto * input.proyectosMes;
  const proyectoHorasAnuales = proyectoHorasMes * mesesAnio;
  const proyectoRateEfectivo = input.horasProyecto > 0
    ? input.precioProyecto / input.horasProyecto
    : 0;

  const diferenciaAnual = proyectoFactAnual - horaFactAnual;
  const diferenciaHorasMes = proyectoHorasMes - input.horasMes;

  const tolerance = 1;
  const ganadorFacturacion: ComparativaOutput["ganadorFacturacion"] =
    Math.abs(diferenciaAnual) < tolerance
      ? "empate"
      : diferenciaAnual > 0
        ? "proyecto"
        : "hora";

  const ganadorEficiencia: ComparativaOutput["ganadorEficiencia"] =
    Math.abs(proyectoRateEfectivo - input.tarifaHora) < 0.01
      ? "empate"
      : proyectoRateEfectivo > input.tarifaHora
        ? "proyecto"
        : "hora";

  // Breakeven: horas máx para que el rate del proyecto iguale tu tarifa hora.
  // precio / horas_max = tarifaHora → horas_max = precio / tarifaHora
  const breakevenHoras = input.tarifaHora > 0
    ? input.precioProyecto / input.tarifaHora
    : 0;

  return {
    hora: {
      facturacionMes: horaFactMes,
      facturacionAnual: horaFactAnual,
      horasMes: input.horasMes,
      horasAnuales: horaHorasAnuales,
      rateEfectivo: input.tarifaHora,
    },
    proyecto: {
      facturacionMes: proyectoFactMes,
      facturacionAnual: proyectoFactAnual,
      horasMes: proyectoHorasMes,
      horasAnuales: proyectoHorasAnuales,
      rateEfectivo: proyectoRateEfectivo,
    },
    diferenciaAnual,
    diferenciaHorasMes,
    ganadorFacturacion,
    ganadorEficiencia,
    breakevenHoras,
  };
}
