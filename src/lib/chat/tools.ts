import { tool } from "ai";
import { z } from "zod";
import { findTramo, TARIFA_PLANA_MENSUAL } from "@/lib/cuota-autonomo";
import { calcularIRPFConCCAA, CCAA_NAMES, type CCAA } from "@/lib/irpf-ccaa";
import { calcularComparativa } from "@/lib/tarifa";
import { calcularReglaIVA, type ClientePais, type ClienteTipo } from "@/lib/iva-plataformas";
import { calcularDespido, calcularFiniquito, type TipoDespido } from "@/lib/despido";

export const fiscalTools = {
  cuotaAutonomo: tool({
    description: "Calcula la cuota mensual de un autónomo en España según su rendimiento neto mensual. Usa esto SIEMPRE que el usuario pregunte por cuota, RETA o pago a Seguridad Social.",
    inputSchema: z.object({
      rendimientoNetoMensual: z.number().describe("Rendimiento neto mensual del autónomo en € (ingresos - gastos / 12)"),
      tarifaPlana: z.boolean().optional().describe("True si el usuario es nuevo autónomo y aplica tarifa plana"),
    }),
    execute: async ({ rendimientoNetoMensual, tarifaPlana }) => {
      if (tarifaPlana) {
        return {
          cuotaMensual: TARIFA_PLANA_MENSUAL,
          cuotaAnual: TARIFA_PLANA_MENSUAL * 12,
          modo: "tarifa-plana",
          tramo: 0,
          tramoLabel: "Tarifa plana (12 meses)",
          notas: "Tarifa plana 88,64 €/mes (80 € + MEI 8,64 €) durante los primeros 12 meses. Prorrogable 12 más si rendimiento anual < SMI (~16.576 €).",
        };
      }
      const tramo = findTramo(rendimientoNetoMensual);
      return {
        cuotaMensual: tramo.cuotaMin,
        cuotaMaxima: tramo.cuotaMax,
        cuotaAnual: tramo.cuotaMin * 12,
        modo: "normal",
        tramo: tramo.numero,
        tramoLabel: tramo.label,
        notas: `Tramo ${tramo.numero}. Rango: ${tramo.minIngresos}-${tramo.maxIngresos ?? "+"} €/mes. Incluye MEI 0,9%. Puedes elegir cotizar entre la mínima ${tramo.cuotaMin}€ y la máxima ${tramo.cuotaMax}€ para mejor pensión.`,
      };
    },
  }),

  irpfAnual: tool({
    description: "Calcula el IRPF anual de un autónomo en España con la escala combinada estatal + autonómica de su Comunidad Autónoma. Usa esto cuando pregunten por IRPF, renta, modelo 100, o cuánto pagan de impuesto sobre la renta.",
    inputSchema: z.object({
      baseImponibleAnual: z.number().describe("Base imponible anual en € (rendimiento neto - cuota autónomo)"),
      ccaa: z.enum([
        "andalucia", "aragon", "asturias", "baleares", "canarias", "cantabria",
        "castilla-leon", "castilla-mancha", "cataluna", "extremadura", "galicia",
        "madrid", "murcia", "rioja", "valencia", "navarra", "pais-vasco",
      ]).describe("Comunidad Autónoma del autónomo. 'navarra' y 'pais-vasco' tienen régimen foral propio."),
    }),
    execute: async ({ baseImponibleAnual, ccaa }) => {
      const r = calcularIRPFConCCAA(baseImponibleAnual, ccaa as CCAA);
      if (r.esRegimenForal) {
        return {
          esRegimenForal: true,
          nombre: CCAA_NAMES[ccaa as CCAA],
          mensaje: `${CCAA_NAMES[ccaa as CCAA]} tiene régimen fiscal foral. Consulta la Hacienda Foral correspondiente — Cuotia no calcula IRPF foral.`,
        };
      }
      return {
        esRegimenForal: false,
        ccaa: CCAA_NAMES[ccaa as CCAA],
        baseImponible: baseImponibleAnual,
        irpfEstatal: r.estatal,
        irpfAutonomico: r.autonomico,
        irpfTotal: r.total,
        tipoEfectivo: r.tipoEfectivo,
        netoTrasIRPF: baseImponibleAnual - r.total,
        notas: "No incluye mínimo personal (~5.550 €), descendientes, planes de pensiones ni deducciones autonómicas específicas. El IRPF real será inferior.",
      };
    },
  }),

  tarifaHoraVsProyecto: tool({
    description: "Compara cobrar por hora vs cobrar por proyecto cerrado como freelance. Calcula facturación anual de cada modelo, rate efectivo y breakeven point.",
    inputSchema: z.object({
      tarifaHora: z.number().describe("Tarifa hora actual en €/h"),
      horasMes: z.number().describe("Horas facturables al mes"),
      precioProyecto: z.number().describe("Precio cerrado por proyecto en €"),
      horasProyecto: z.number().describe("Horas reales dedicadas por proyecto"),
      proyectosMes: z.number().describe("Proyectos cerrados al mes"),
    }),
    execute: async (input) => {
      const r = calcularComparativa(input);
      return {
        facturacionAnualHora: r.hora.facturacionAnual,
        facturacionAnualProyecto: r.proyecto.facturacionAnual,
        diferenciaAnual: r.diferenciaAnual,
        ganador: r.ganadorFacturacion,
        rateEfectivoProyecto: r.proyecto.rateEfectivo,
        breakevenHoras: r.breakevenHoras,
        diferenciaHorasMes: r.diferenciaHorasMes,
        recomendacion: r.ganadorFacturacion === "proyecto"
          ? `Modelo proyecto te genera ${Math.round(r.diferenciaAnual)} €/año más. Rate efectivo proyecto: ${r.proyecto.rateEfectivo.toFixed(2)} €/h vs tarifa hora ${input.tarifaHora} €/h.`
          : `Modelo hora te genera más facturación. El proyecto te lleva más horas de las que justifican su precio.`,
      };
    },
  }),

  ivaPlataforma: tool({
    description: "Determina las reglas IVA cuando un autónomo factura a través de Stripe, PayPal, Upwork, Fiverr, Airbnb, Booking, Viator, Amazon, AdSense, App Store, Google Play, Patreon o Twitch. Indica si aplica reverse charge, si necesita ROI/VIES, modelo 349, etc.",
    inputSchema: z.object({
      plataformaId: z.enum([
        "stripe", "paypal", "upwork", "fiverr", "airbnb", "booking", "viator",
        "amazon-seller", "adsense", "app-store", "google-play", "patreon", "twitch",
      ]).describe("La plataforma usada"),
      clientePais: z.enum(["espana", "ue", "extra-ue"]).optional().describe("País del cliente final (solo aplica para procesadores como Stripe/PayPal/Upwork; ignorado para marketplaces fiscales)"),
      clienteTipo: z.enum(["empresa", "particular"]).optional().describe("Tipo de cliente final (solo aplica para procesadores)"),
    }),
    execute: async ({ plataformaId, clientePais, clienteTipo }) => {
      const r = calcularReglaIVA(
        plataformaId,
        (clientePais ?? "ue") as ClientePais,
        (clienteTipo ?? "empresa") as ClienteTipo,
      );
      return {
        facturasA: r.facturaA,
        paisFactura: r.facturaA_pais,
        aplicaIVA: r.aplicaIVA,
        tipoIVA: r.tipoIVA,
        reverseCharge: r.reverseCharge,
        requiereROIVIES: r.requiereROIVIES,
        requiereModelo349: r.modelo349,
        instruccionesFactura: r.textoFactura,
        notasImportantes: r.notas,
      };
    },
  }),

  indemnizacionDespido: tool({
    description: "Calcula la indemnización por despido + finiquito de un trabajador por cuenta ajena en España. Aplica al régimen vigente desde 12 febrero 2012.",
    inputSchema: z.object({
      tipoDespido: z.enum(["improcedente", "objetivo", "colectivo", "procedente"]).describe("Tipo de despido"),
      salarioBrutoAnual: z.number().describe("Salario bruto anual en €"),
      anosTrabajados: z.number().describe("Años trabajados en la empresa (puede ser decimal)"),
      diasVacacionesNoDisfrutadas: z.number().optional().describe("Días de vacaciones no disfrutadas (default 0)"),
      diasPagaExtraPendiente: z.number().optional().describe("Días pendientes de paga extra prorrateada (default 0)"),
      salarioPendiente: z.number().optional().describe("Salario pendiente de cobrar en € (default 0)"),
    }),
    execute: async ({
      tipoDespido,
      salarioBrutoAnual,
      anosTrabajados,
      diasVacacionesNoDisfrutadas = 0,
      diasPagaExtraPendiente = 0,
      salarioPendiente = 0,
    }) => {
      const despido = calcularDespido(salarioBrutoAnual, anosTrabajados, tipoDespido as TipoDespido);
      const finiquito = calcularFiniquito(salarioBrutoAnual, diasVacacionesNoDisfrutadas, diasPagaExtraPendiente, salarioPendiente);
      const aviso = anosTrabajados > 13
        ? "AVISO: si tu contrato es anterior al 12 feb 2012, el cálculo es dual (45 días/año hasta 2012 + 33 días/año después, tope 720 días). Esta cifra usa solo régimen post-2012. Consulta un abogado laboralista."
        : null;
      return {
        indemnizacion: despido.indemnizacion,
        diasIndemnizacion: despido.diasIndemnizacion,
        mensualidades: despido.mensualidades,
        topeMensualidades: despido.topeMensualidades,
        finiquitoTotal: finiquito.total,
        finiquitoDesglose: {
          vacaciones: finiquito.vacaciones,
          extra: finiquito.extra,
          salarioPendiente: finiquito.salarioPendiente,
        },
        totalBruto: despido.indemnizacion + finiquito.total,
        notas: [
          "Indemnización por despido improcedente/objetivo está EXENTA de IRPF hasta 180.000 €.",
          "El finiquito SÍ tributa por IRPF.",
          ...(aviso ? [aviso] : []),
        ],
      };
    },
  }),
};
