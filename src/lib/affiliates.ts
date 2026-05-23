import type { AffiliatePartner } from "@/components/AffiliateCard";

// Lista centralizada de partners. Sustituye los `href` con tus links
// reales de afiliado cuando te apruebe cada programa.
// Mientras tanto apuntan a la home del partner — no rompen UX y muestran
// el componente funcional para demo.

const PARTNERS: Record<string, AffiliatePartner> = {
  declarando: {
    name: "Declarando",
    href: "https://declarando.es", // TODO: reemplazar con link afiliado
    description:
      "Gestoría online popular en España. Modelos trimestrales presentados por su equipo, contacto directo con tu gestor asignado.",
    features: ["Modelos 130, 303, 111 incluidos", "Asesoría ilimitada", "100 facturas/mes"],
  },
  taxscouts: {
    name: "TaxScouts",
    href: "https://taxscouts.es",
    description:
      "Renta y declaraciones desde 39 € one-time. Bueno si solo necesitas modelo 100 sin paquete recurrente.",
    features: ["Pago por declaración", "Sin cuota mensual", "Gestor humano"],
  },
  quipu: {
    name: "Quipu",
    href: "https://getquipu.com",
    description:
      "Software facturación + contabilidad. Más para autónomos que llevan ellos los modelos pero quieren orden.",
    features: ["Facturas + cobros + gastos", "Sincroniza con bancos", "Verifactu en roadmap"],
    badge: "Software",
  },
  holded: {
    name: "Holded",
    href: "https://www.holded.com",
    description:
      "Plataforma todo-en-uno: facturas, contabilidad, CRM, RR.HH. Para autónomos con cierta complejidad o equipos pequeños.",
    features: ["Facturación + CRM", "Multi-usuario", "Integraciones con +50 apps"],
    badge: "Software",
  },
  anfix: {
    name: "Anfix",
    href: "https://www.anfix.com",
    description:
      "Software español clásico para autónomos y pymes. Sincroniza bien con asesorías que trabajen con la plataforma.",
    features: ["Conciliación bancaria", "Compatible con asesorías"],
    badge: "Software",
  },
  infoautonomos: {
    name: "Infoautónomos (InfoJobs)",
    href: "https://www.infoautonomos.com",
    description:
      "Servicio de alta de autónomos + gestoría desde 0 €. Buen punto de entrada si recién te das de alta.",
    features: ["Alta gestionada", "Asesoría primer año"],
    badge: "Alta",
  },
};

// Recetas pre-configuradas por página
export const AFFILIATES_BY_PAGE = {
  sl: {
    title: "¿Lo siguiente? Buscar gestoría que monte tu SL",
    intro:
      "Constituir una SL implica notaría + registro mercantil + IS trimestral. No es trivial llevarlo solo. Comparativa orientativa:",
    partners: [PARTNERS.declarando, PARTNERS.holded],
  },
  societario: {
    title: "Si gestionas una SL como administrador",
    intro:
      "Necesitas software de facturación + presentación de modelos. Opciones recomendadas:",
    partners: [PARTNERS.quipu, PARTNERS.holded],
  },
  generadorFacturas: {
    title: "Cuando crezcas: software facturación",
    intro:
      "El generador de Cuotia vale para empezar. Si emites más de 20 facturas/mes o necesitas Verifactu (jul 2027), considera migrar:",
    partners: [PARTNERS.quipu, PARTNERS.anfix],
  },
  verifactu: {
    title: "Software preparado para Verifactu",
    intro:
      "Quien está actualizando antes para cumplir Verifactu 2027:",
    partners: [PARTNERS.quipu, PARTNERS.holded],
  },
  alta: {
    title: "Si te acabas de dar de alta",
    intro:
      "Servicios que gestionan el alta + primer año de asesoría a buen precio:",
    partners: [PARTNERS.infoautonomos, PARTNERS.declarando],
  },
  irpf: {
    title: "Si quieres ayuda con la Renta",
    intro:
      "Para presentar el modelo 100 con asesoramiento:",
    partners: [PARTNERS.taxscouts, PARTNERS.declarando],
  },
};
