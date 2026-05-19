export const KM_RATE = 0.26;

export const DIETA_LIMITS = {
  espanaSinPernocta: 26.67,
  espanaConPernocta: 53.34,
  extranjeroSinPernocta: 48.08,
  extranjeroConPernocta: 91.35,
} as const;

export function calcularKilometraje(km: number): number {
  return km * KM_RATE;
}

export function calcularDieta(
  diasEspanaSin: number,
  diasEspanaCon: number,
  diasExtSin: number,
  diasExtCon: number,
): { total: number; desglose: { concepto: string; dias: number; rate: number; subtotal: number }[] } {
  const desglose = [
    { concepto: "España sin pernocta", dias: diasEspanaSin, rate: DIETA_LIMITS.espanaSinPernocta, subtotal: diasEspanaSin * DIETA_LIMITS.espanaSinPernocta },
    { concepto: "España con pernocta", dias: diasEspanaCon, rate: DIETA_LIMITS.espanaConPernocta, subtotal: diasEspanaCon * DIETA_LIMITS.espanaConPernocta },
    { concepto: "Extranjero sin pernocta", dias: diasExtSin, rate: DIETA_LIMITS.extranjeroSinPernocta, subtotal: diasExtSin * DIETA_LIMITS.extranjeroSinPernocta },
    { concepto: "Extranjero con pernocta", dias: diasExtCon, rate: DIETA_LIMITS.extranjeroConPernocta, subtotal: diasExtCon * DIETA_LIMITS.extranjeroConPernocta },
  ];
  const total = desglose.reduce((s, d) => s + d.subtotal, 0);
  return { total, desglose };
}
