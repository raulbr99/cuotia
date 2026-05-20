import { TIPOS_IVA, type TipoIVA } from "./iva";

export interface InvoiceParty {
  nombre: string;
  nif: string;
  direccion: string;
  cp: string;
  ciudad: string;
  email?: string;
  telefono?: string;
}

export interface InvoiceItem {
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  tipoIVA: TipoIVA;
}

export interface InvoiceData {
  numero: string;
  fechaEmision: string;
  fechaVencimiento?: string;
  emisor: InvoiceParty;
  cliente: InvoiceParty;
  items: InvoiceItem[];
  retencionIRPF: number;
  notas?: string;
}

export function calcularInvoice(data: InvoiceData) {
  let base = 0;
  let totalIva = 0;
  const desgloseIva: Record<string, { base: number; iva: number }> = {};

  for (const it of data.items) {
    const subtotal = it.cantidad * it.precioUnitario;
    const rate = TIPOS_IVA[it.tipoIVA];
    const iva = subtotal * rate;
    base += subtotal;
    totalIva += iva;
    const key = `${(rate * 100).toFixed(0)}%`;
    if (!desgloseIva[key]) desgloseIva[key] = { base: 0, iva: 0 };
    desgloseIva[key].base += subtotal;
    desgloseIva[key].iva += iva;
  }

  const retencion = base * (data.retencionIRPF / 100);
  const total = base + totalIva - retencion;

  return { base, totalIva, desgloseIva, retencion, total };
}

export function emptyInvoice(): InvoiceData {
  return {
    numero: `${new Date().getFullYear()}-001`,
    fechaEmision: new Date().toISOString().slice(0, 10),
    emisor: { nombre: "", nif: "", direccion: "", cp: "", ciudad: "" },
    cliente: { nombre: "", nif: "", direccion: "", cp: "", ciudad: "" },
    items: [{ descripcion: "", cantidad: 1, precioUnitario: 0, tipoIVA: "general" }],
    retencionIRPF: 15,
    notas: "",
  };
}
