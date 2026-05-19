const eurFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const pctFormatter = new Intl.NumberFormat("es-ES", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numFormatter = new Intl.NumberFormat("es-ES", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function eur(value: number): string {
  return eurFormatter.format(isFinite(value) ? value : 0);
}

export function pct(value: number): string {
  return pctFormatter.format(isFinite(value) ? value : 0);
}

export function num(value: number): string {
  return numFormatter.format(isFinite(value) ? value : 0);
}
