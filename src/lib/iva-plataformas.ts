// Reglas IVA para autónomos españoles facturando a/vía plataformas internacionales.
// Fuente: AEAT, Directiva 2006/112/CE, Real Decreto 1619/2012.
// AVISO: orientativo, las reglas pueden variar según naturaleza exacta del servicio.

export type PlataformaTipo = "marketplace" | "procesador" | "publicidad" | "comisionista";
export type ClientePais = "espana" | "ue" | "extra-ue";
export type ClienteTipo = "empresa" | "particular";

export interface Plataforma {
  id: string;
  nombre: string;
  pais: string;
  tipo: PlataformaTipo;
  descripcion: string;
  /**
   * Si es true, la plataforma actúa COMO TU CLIENTE (le facturas a ella directamente).
   * Si es false, la plataforma es solo procesador y facturas al cliente final.
   */
  esClienteDirecto: boolean;
  /** Texto sobre cómo te paga */
  modeloPago: string;
}

export const PLATAFORMAS: Plataforma[] = [
  {
    id: "stripe",
    nombre: "Stripe",
    pais: "Irlanda (UE)",
    tipo: "procesador",
    esClienteDirecto: false,
    descripcion: "Stripe es solo procesador de pagos. Tu cliente real es quien paga, no Stripe.",
    modeloPago: "Te ingresa lo que pagaron tus clientes menos comisión Stripe. La comisión llega como factura B2B desde Irlanda.",
  },
  {
    id: "paypal",
    nombre: "PayPal",
    pais: "Luxemburgo (UE)",
    tipo: "procesador",
    esClienteDirecto: false,
    descripcion: "Procesador de pagos. Tu cliente es quien te paga, no PayPal.",
    modeloPago: "Comisión PayPal facturada B2B desde Luxemburgo.",
  },
  {
    id: "upwork",
    nombre: "Upwork",
    pais: "USA",
    tipo: "comisionista",
    esClienteDirecto: false,
    descripcion: "Upwork es intermediario: tu cliente es la empresa que te contrata vía la plataforma.",
    modeloPago: "Cobras del cliente menos comisión Upwork (B2B USA, sin IVA reverse charge).",
  },
  {
    id: "fiverr",
    nombre: "Fiverr",
    pais: "Israel",
    tipo: "comisionista",
    esClienteDirecto: false,
    descripcion: "Marketplace donde tú facturas al cliente final. Fiverr cobra comisión.",
    modeloPago: "Comisión Fiverr separada (B2B fuera UE).",
  },
  {
    id: "airbnb",
    nombre: "Airbnb (anfitrión)",
    pais: "Irlanda (UE)",
    tipo: "comisionista",
    esClienteDirecto: false,
    descripcion: "Airbnb es intermediario, no es tu cliente. El host factura al HUÉSPED (si hay obligación) o no factura nada en alquiler turístico exento sin servicios. Airbnb te envía aparte la factura de su COMISIÓN con reverse charge si estás en ROI/VIES.",
    modeloPago: "Si solo alquilas vivienda sin servicios hoteleros: EXENTO de IVA (no facturas). Si añades servicios (limpieza durante estancia, desayuno, recepción): facturas al huésped con IVA 10%. La comisión Airbnb es gasto deducible aparte.",
  },
  {
    id: "booking",
    nombre: "Booking.com (anfitrión)",
    pais: "Países Bajos (UE)",
    tipo: "comisionista",
    esClienteDirecto: false,
    descripcion: "Booking es intermediario, no es tu cliente. El host factura al HUÉSPED (si hay obligación) según las reglas de alquiler turístico. Booking te factura SU COMISIÓN aparte con reverse charge si tienes NIF-IVA válido.",
    modeloPago: "Mismas reglas que Airbnb sobre IVA al huésped. La comisión Booking se declara en modelo 303 como reverse charge (NO en modelo 349 según interpretación habitual, aunque algunos gestores lo incluyen). Desde junio 2024 Booking aplica IVA 21% a la comisión si no le has dado NIF intracomunitario válido.",
  },
  {
    id: "viator",
    nombre: "Viator / GetYourGuide (guía turístico)",
    pais: "Irlanda / Alemania (UE)",
    tipo: "comisionista",
    esClienteDirecto: false,
    descripcion: "Plataformas intermediarias de actividades turísticas. El guía factura al CLIENTE FINAL (no a la plataforma). Para servicios de guía turístico en territorio español, el IVA se devenga donde se presta el servicio (España), no donde reside el cliente.",
    modeloPago: "Cobras vía la plataforma. Si cliente es particular: IVA 21% español (incluso turistas extranjeros). Si cliente es empresa UE con NIF: reverse charge. Si cliente es empresa fuera UE: no sujeto. La comisión de la plataforma se gestiona como gasto deducible con reverse charge.",
  },
  {
    id: "amazon-seller",
    nombre: "Amazon Seller / FBA",
    pais: "Luxemburgo (UE)",
    tipo: "marketplace",
    esClienteDirecto: false,
    descripcion: "Tú vendes al cliente final. Amazon cobra comisión y servicios (FBA, publicidad) facturados por Amazon EU.",
    modeloPago: "Cobras del cliente vía Amazon. Amazon te factura comisión B2B desde Luxemburgo (reverse charge).",
  },
  {
    id: "adsense",
    nombre: "Google AdSense / YouTube",
    pais: "Irlanda (UE) — antes USA",
    tipo: "publicidad",
    esClienteDirecto: true,
    descripcion: "Google AdSense paga desde Google Ireland Ltd. Le facturas a Google.",
    modeloPago: "Google te paga ingresos publicidad. Le facturas tú (B2B intracomunitario).",
  },
  {
    id: "app-store",
    nombre: "App Store (Apple)",
    pais: "Irlanda/Luxemburgo (UE)",
    tipo: "marketplace",
    esClienteDirecto: true,
    descripcion: "Apple actúa como vendedor al cliente final. Tú facturas a Apple (B2B UE).",
    modeloPago: "Apple retiene IVA al cliente y te paga net. Le facturas a Apple con reverse charge.",
  },
  {
    id: "google-play",
    nombre: "Google Play",
    pais: "Irlanda (UE)",
    tipo: "marketplace",
    esClienteDirecto: true,
    descripcion: "Google actúa como vendedor (igual que App Store). Le facturas a Google.",
    modeloPago: "Google retiene IVA al cliente y te paga net. Le facturas a Google con reverse charge.",
  },
  {
    id: "patreon",
    nombre: "Patreon",
    pais: "USA",
    tipo: "marketplace",
    esClienteDirecto: true,
    descripcion: "Patreon actúa como vendedor a los patrons. Le facturas a Patreon (B2B fuera UE).",
    modeloPago: "Patreon cobra a los patrons, retiene IVA y te paga. Le facturas a Patreon Inc. (USA).",
  },
  {
    id: "twitch",
    nombre: "Twitch",
    pais: "USA (Amazon)",
    tipo: "publicidad",
    esClienteDirecto: true,
    descripcion: "Amazon/Twitch te paga ingresos por suscripciones, bits, ads. Le facturas a Amazon/Twitch.",
    modeloPago: "Le facturas a Twitch Interactive (B2B USA).",
  },
];

export interface ReglaIVAOutput {
  facturaA: string;
  facturaA_pais: string;
  facturaA_tipo: ClienteTipo;
  aplicaIVA: boolean;
  tipoIVA?: number;
  reverseCharge: boolean;
  requiereROIVIES: boolean;
  modelo349: boolean;
  textoFactura: string[];
  notas: string[];
}

/**
 * Determina las reglas de IVA según plataforma + cliente.
 * Para plataformas marketplace (Airbnb, Booking, Apple, etc.), el cliente final
 * es IRRELEVANTE — la plataforma es tu cliente. Solo aplicamos clientePais/Tipo
 * a las plataformas tipo "procesador" o "comisionista" donde el cliente final
 * es quien te paga.
 */
export function calcularReglaIVA(
  plataformaId: string,
  clientePais: ClientePais,
  clienteTipo: ClienteTipo
): ReglaIVAOutput {
  const p = PLATAFORMAS.find((x) => x.id === plataformaId) ?? PLATAFORMAS[0];

  // Si la plataforma es tu cliente directo, ignoramos clientePais/Tipo del usuario.
  if (p.esClienteDirecto) {
    const facturaA = p.nombre;
    const facturaA_pais = p.pais;
    const facturaA_tipo: ClienteTipo = "empresa";
    const esUE = !p.pais.toLowerCase().includes("usa") && !p.pais.toLowerCase().includes("israel");

    if (esUE) {
      return {
        facturaA,
        facturaA_pais,
        facturaA_tipo,
        aplicaIVA: false,
        reverseCharge: true,
        requiereROIVIES: true,
        modelo349: true,
        textoFactura: [
          `Factura emitida a ${facturaA} (${facturaA_pais}) con NIF intracomunitario.`,
          `"Operación intracomunitaria. Inversión del sujeto pasivo (art. 84 LIVA)."`,
          "Importe base sin IVA.",
        ],
        notas: [
          `Te das de alta en el ROI/VIES (modelo 036, casilla 582) ANTES de emitir la primera factura.`,
          `Declaras en modelo 303 (casillas 59-60 y/o 61-62) y en modelo 349 trimestral.`,
          `${p.descripcion}`,
        ],
      };
    }

    // Plataforma fuera UE (USA, Israel, etc.)
    return {
      facturaA,
      facturaA_pais,
      facturaA_tipo,
      aplicaIVA: false,
      reverseCharge: false,
      requiereROIVIES: false,
      modelo349: false,
      textoFactura: [
        `Factura emitida a ${facturaA} (${facturaA_pais}).`,
        `"Operación no sujeta a IVA español (art. 69-70 LIVA, exportación de servicios fuera UE)."`,
        "Importe base sin IVA.",
      ],
      notas: [
        `No necesitas ROI/VIES (es fuera UE).`,
        `Declaras los ingresos en modelo 303 como "operaciones no sujetas" (casilla 60).`,
        `${p.descripcion}`,
      ],
    };
  }

  // Plataforma es procesador/intermediario: el cliente real es quien define las reglas.
  if (clientePais === "espana") {
    return {
      facturaA: "Cliente final en España",
      facturaA_pais: "España",
      facturaA_tipo: clienteTipo,
      aplicaIVA: true,
      tipoIVA: 0.21,
      reverseCharge: false,
      requiereROIVIES: false,
      modelo349: false,
      textoFactura: [
        `Factura emitida a tu cliente en España.`,
        `Aplica IVA 21% (o tipo reducido si corresponde a la actividad).`,
        `Si el cliente es empresa, retención IRPF 15% (7% nuevos autónomos).`,
      ],
      notas: [
        `${p.nombre} es solo procesador. Tu cliente real es el receptor del servicio.`,
        `Declaras IVA en modelo 303 normal.`,
        `${p.descripcion}`,
      ],
    };
  }

  if (clientePais === "ue") {
    if (clienteTipo === "empresa") {
      return {
        facturaA: "Cliente empresa UE",
        facturaA_pais: "UE (intracomunitario)",
        facturaA_tipo: clienteTipo,
        aplicaIVA: false,
        reverseCharge: true,
        requiereROIVIES: true,
        modelo349: true,
        textoFactura: [
          `Factura emitida a cliente empresa UE con NIF intracomunitario (verificable en VIES).`,
          `"Operación intracomunitaria. Inversión del sujeto pasivo (art. 84 LIVA)."`,
          "Importe base sin IVA.",
        ],
        notas: [
          `Alta en ROI/VIES (modelo 036, casilla 582).`,
          `Verifica el NIF del cliente en VIES antes de facturar: https://ec.europa.eu/taxation_customs/vies/`,
          `Declaras en modelo 349 trimestral.`,
          `${p.descripcion}`,
        ],
      };
    }
    // Cliente particular UE
    return {
      facturaA: "Cliente particular UE",
      facturaA_pais: "UE (B2C)",
      facturaA_tipo: clienteTipo,
      aplicaIVA: true,
      tipoIVA: 0.21,
      reverseCharge: false,
      requiereROIVIES: false,
      modelo349: false,
      textoFactura: [
        `Factura emitida a particular UE.`,
        `Aplica IVA español 21% (regla general; servicios digitales pueden usar OSS).`,
        `Si vendes servicios digitales a particulares UE y superas 10.000 €/año, debes inscribirte en One-Stop-Shop (OSS).`,
      ],
      notas: [
        `Para servicios digitales (apps, contenido streaming, ebooks): considerar OSS si superas 10.000 €/año a particulares UE.`,
        `Para servicios profesionales no digitales a particulares UE: IVA español 21%.`,
        `${p.descripcion}`,
      ],
    };
  }

  // clientePais === "extra-ue"
  return {
    facturaA: clienteTipo === "empresa" ? "Cliente empresa fuera UE" : "Cliente particular fuera UE",
    facturaA_pais: "Fuera UE",
    facturaA_tipo: clienteTipo,
    aplicaIVA: false,
    reverseCharge: false,
    requiereROIVIES: false,
    modelo349: false,
    textoFactura: [
      `Factura emitida a cliente fuera de la UE.`,
      `"Operación no sujeta a IVA español (art. 69-70 LIVA, exportación de servicios fuera UE)."`,
      "Importe base sin IVA.",
    ],
    notas: [
      `No necesitas ROI/VIES (es fuera UE).`,
      `Declaras en modelo 303 como "operaciones no sujetas" (casilla 60).`,
      `${p.descripcion}`,
    ],
  };
}
