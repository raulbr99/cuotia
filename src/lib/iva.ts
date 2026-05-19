export const TIPOS_IVA = {
  general: 0.21,
  reducido: 0.10,
  superreducido: 0.04,
  exento: 0,
} as const;

export type TipoIVA = keyof typeof TIPOS_IVA;

export function calcularIVA303(
  ivaRepercutido: number,
  ivaSoportado: number,
  compensacionAnterior: number = 0,
): { resultado: number; tipo: "ingresar" | "compensar" | "devolver" } {
  const resultado = ivaRepercutido - ivaSoportado - compensacionAnterior;
  let tipo: "ingresar" | "compensar" | "devolver" = "ingresar";
  if (resultado < 0) tipo = "compensar";
  return { resultado: Math.abs(resultado), tipo };
}

export function aplicarIVA(baseImponible: number, tipo: TipoIVA): {
  base: number;
  iva: number;
  total: number;
} {
  const rate = TIPOS_IVA[tipo];
  const iva = baseImponible * rate;
  return { base: baseImponible, iva, total: baseImponible + iva };
}

export function quitarIVA(precioConIVA: number, tipo: TipoIVA): {
  base: number;
  iva: number;
  total: number;
} {
  const rate = TIPOS_IVA[tipo];
  const base = precioConIVA / (1 + rate);
  return { base, iva: precioConIVA - base, total: precioConIVA };
}
