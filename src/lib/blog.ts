export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  category: string;
  tag: string;
  content: string;
}

export const POSTS: BlogPost[] = [
  {
    slug: "verifactu-pospuesto-julio-2027",
    title: "Verifactu para autónomos: pospuesto a julio 2027",
    description: "La obligación del sistema Verifactu y el envío de facturas a Hacienda en tiempo real se aplaza para autónomos hasta el 1 de julio de 2027.",
    datePublished: "2026-05-20",
    category: "Normativa",
    tag: "Verifactu",
    content: `## Qué ha pasado

El Gobierno ha aplazado **al 1 de julio de 2027** la obligatoriedad del sistema Verifactu para autónomos persona física. Originalmente la fecha era el 1 de enero de 2026.

## Qué es Verifactu

Verifactu obliga a que **todo el software de facturación** cumpla con requisitos específicos: cada factura emitida se firma digitalmente, incluye un código QR y se puede enviar automáticamente a Hacienda en tiempo real.

El objetivo es luchar contra el fraude del software de doble uso (un mismo programa con dos contabilidades).

## A quién afecta y desde cuándo

- **Sociedades mercantiles** (SL, SA): obligadas desde 1 enero 2026
- **Autónomos persona física**: obligados desde **1 julio 2027** (antes era enero 2026)
- **Quien use solo Excel/Word**: no aplica directamente, pero conviene migrar a software adaptado

## Qué debes hacer si eres autónomo

1. **Si facturas con software**: comprueba que tu programa esté homologado para Verifactu antes de julio 2027.
2. **Si facturas con Excel/Word**: empieza a buscar un software adaptado. La AEAT publicará un listado oficial.
3. **El generador de facturas de Cuotia**: genera PDFs estándar válidos hasta junio 2027. Para Verifactu necesitarás migrar a un software certificado.

## Por qué se pospuso

El sector denunció que muchos desarrolladores no llegaban a tiempo con la homologación, y los autónomos sin gestoría no estaban preparados. El aplazamiento da 18 meses adicionales.

## Próximos pasos

Vigila los comunicados de la AEAT en los próximos meses para conocer:
- Software homologado oficialmente
- Procedimiento de envío automático a Hacienda
- Sanciones por incumplimiento desde julio 2027
`,
  },
  {
    slug: "subida-smi-2025-prorroga-tarifa-plana",
    title: "Subida del SMI 2025: cómo afecta a la prórroga de la tarifa plana",
    description: "El SMI 2025 sube a 16.576 €/año estimados. Esto eleva el umbral para prorrogar la tarifa plana del autónomo 12 meses adicionales.",
    datePublished: "2026-05-19",
    category: "Tarifa plana",
    tag: "SMI",
    content: `## La regla de la prórroga

La **tarifa plana de 88,64 €/mes** se puede prorrogar 12 meses adicionales (meses 13-24) si tu **rendimiento neto anual del primer año** queda por debajo del Salario Mínimo Interprofesional.

## Cifras 2024 vs 2025

- SMI 2024: **15.876 €/año** (1.134 €/mes en 14 pagas)
- SMI 2025: **~16.576 €/año** estimado (pendiente publicación BOE definitiva)

El aumento de ~700 € en el SMI **te da más margen para mantener la tarifa plana** durante el segundo año.

## Ejemplo práctico

Imagina un autónomo que se dio de alta en septiembre 2024. Para conseguir prórroga necesita que su rendimiento neto entre septiembre 2024 y agosto 2025 (12 meses) quede:

- **Con SMI 2024 vigente**: por debajo de 15.876 €
- **Con SMI 2025 vigente**: por debajo de 16.576 €

Si gana exactamente 16.200 €/año:
- Bajo regla SMI 2024: **NO** tendría prórroga
- Bajo regla SMI 2025: **SÍ** tendría prórroga

## Cómo se aplica en la práctica

La TGSS aplica el SMI vigente en el momento en que evalúa la prórroga. Si tu primer año termina en 2025, te aplican el SMI 2025.

## Qué pasa si pierdes la prórroga

Pasas automáticamente a la cuota de tu tramo según ingresos reales. Por ejemplo, si ganas 25.000 € netos al año (~2.083 €/mes), pasas del tramo 1 al tramo 9: **390 €/mes mínimo**, 303 € más que con la tarifa plana.

## Calcula tu situación

Usa nuestra [calculadora de cuota autónomo](/cuota-autonomo) marcando la opción "tarifa plana" para ver el ahorro.
`,
  },
  {
    slug: "mei-2026-cotizacion-extra",
    title: "MEI 2026: la cotización extra que pagas sin saberlo",
    description: "El Mecanismo de Equidad Intergeneracional (MEI) sube al 0,9% en 2026. Te explicamos qué es, por qué lo pagas y cómo afecta a tu cuota mensual.",
    datePublished: "2026-05-18",
    category: "Cuota",
    tag: "MEI",
    content: `## Qué es el MEI

El **Mecanismo de Equidad Intergeneracional** es una cotización adicional que se introdujo en 2023 para reforzar el Fondo de Reserva de la Seguridad Social y garantizar las pensiones a largo plazo.

Aplica a **todos los cotizantes** (autónomos y trabajadores por cuenta ajena), no solo a quienes están cerca de la jubilación.

## Cuánto pagas en 2026

El MEI sube progresivamente:

- 2023: 0,6%
- 2024: 0,7%
- 2025: 0,8%
- **2026: 0,9%**
- 2027: 1,0%
- ...hasta llegar al 1,2% en 2029

Se aplica sobre tu **base de cotización**.

## Ejemplo en cuota mensual

Si cotizas por la base mínima 2026 (1.166,70 €/mes):

- MEI 2025 (0,8%): **9,33 €/mes** → 112 €/año
- MEI 2026 (0,9%): **10,50 €/mes** → 126 €/año

Si cotizas por la base máxima (4.909,50 €):

- MEI 2026: **44,19 €/mes** → 530 €/año

## Quién lo paga

- **Trabajadores por cuenta ajena**: lo paga la empresa íntegramente (0,67% empresa + 0,23% trabajador en 2026).
- **Autónomos**: lo pagas tú al 100%. Va incluido en la cuota mensual de la TGSS.

## Por qué no es opcional

Como su nombre indica ("equidad intergeneracional"), es obligatorio. Forma parte de la cuota total mensual junto a las contingencias comunes, profesionales y cese de actividad.

## El cuadro completo de tu cuota 2026

Tu cuota mensual del RETA incluye:
1. Contingencias comunes (~28,30% de la base)
2. Contingencias profesionales
3. Cese de actividad
4. Formación profesional
5. **MEI** (0,9% en 2026)

[Calcula tu cuota completa](/cuota-autonomo) según tu rendimiento neto.
`,
  },
  {
    slug: "campana-renta-2024",
    title: "Resumen de la campaña Renta 2024 (presentada en 2025)",
    description: "Fechas clave, novedades y errores más comunes en la declaración de la Renta 2024 para autónomos persona física.",
    datePublished: "2026-05-15",
    category: "IRPF",
    tag: "Renta",
    content: `## Fechas clave

- **Inicio campaña online**: 2 de abril de 2025
- **Inicio cita previa telefónica**: 6 de mayo
- **Inicio cita presencial**: 2 de junio
- **Fin campaña**: 30 de junio de 2025
- **Fin con domiciliación**: 25 de junio (si te sale a ingresar)

## Quién está obligado a declarar

Como autónomo persona física, **siempre estás obligado** a presentar la declaración independientemente de tus ingresos. No aplica el umbral de 22.000 € de los asalariados.

## Novedades 2024

- **Tramos IRPF estatal sin cambios** respecto a 2023
- **Cataluña, Valencia y Baleares reformaron sus escalas autonómicas** (más tramos, tipos máximos más altos)
- **Madrid mantiene su escala** (la más baja de España)
- **Reducción 5% gastos de difícil justificación** sigue vigente para estimación directa simplificada

## Documentación que necesitas

Antes de empezar tu declaración:

1. **Borrador de Hacienda** (datos fiscales precargados)
2. **Modelos 130 presentados** (4 trimestres de pago fraccionado)
3. **Libro de ingresos y gastos** del año
4. **Facturas emitidas y recibidas**
5. **Certificados de retenciones** (clientes que te retuvieron el 15% o 7%)
6. **DNI/NIE** y certificado digital o cl@ve
7. **Datos bancarios** para domiciliación o devolución
8. **Información de bienes inmuebles**, donativos, planes de pensiones

## Errores más comunes

1. **No incluir todas las facturas emitidas**: cruzan con los datos del IVA, te las van a detectar.
2. **Deducir gastos no relacionados con la actividad**: ropa personal, comidas familiares.
3. **Olvidar reducciones**: planes de pensiones (hasta 1.500 €), donativos, aportaciones a partidos políticos.
4. **No revisar la casilla de la vivienda habitual**: si compraste antes de 2013, sigues teniendo derecho a deducción.
5. **No declarar criptomonedas si compraste/vendiste**: aunque sea pequeña ganancia.

## Si te sale a devolver

Hacienda devuelve en un plazo medio de 6 meses, pero suele tardar 4-8 semanas si no hay revisión. Si tarda más de 6 meses, te pagan intereses de demora.

## Si te sale a pagar

Puedes:
- **Pagar todo de golpe** (con domiciliación hasta el 25 de junio)
- **Fraccionar en dos pagos**: 60% en junio, 40% en noviembre, sin intereses

## Calcula tu IRPF antes de presentar

Usa nuestra [calculadora IRPF por CCAA](/calculadora-irpf) para hacer la cuenta antes del Renta Web.
`,
  },
  {
    slug: "tramos-cuota-autonomo-2026",
    title: "Cuota de autónomo 2026: tramos congelados, MEI al 0,9%",
    description: "El RD-ley 3/2026 congela los tramos de cotización del autónomo a niveles de 2025. La única subida real viene por el MEI.",
    datePublished: "2026-05-10",
    category: "Cuota",
    tag: "Tramos 2026",
    content: `## La noticia

El Real Decreto-Ley 3/2026 (BOE 4 feb 2026) **congela los tramos de cotización del autónomo en 2026** a los mismos niveles que regían en 2025. No habrá actualización general como sí ocurrió de 2023 a 2024 y de 2024 a 2025.

## Por qué se congelan

Las patronales y asociaciones de autónomos (ATA, UPTA, UATAE) presionaron al Gobierno alegando que:

- La inflación ya está erosionando los márgenes
- Una subida adicional de cuota expulsaría a autónomos con bajos ingresos
- El sistema por tramos lleva solo 2 años funcionando y necesita estabilidad

El Gobierno cedió y aplazó la subida prevista.

## Qué cambia entonces en 2026

Aunque los **tramos están congelados**, hay dos cambios:

1. **MEI sube de 0,8% a 0,9%** sobre tu base de cotización (~1-4 € más al mes según base)
2. **Pendiente actualización SMI 2026**: si sube, afecta a la prórroga de tarifa plana

## Cuota mensual 2026 según ingresos

| Rendimiento neto | Tramo | Cuota mín. | Cuota máx. |
|---|---|---|---|
| ≤670 €/mes | 1 | 200 € | 590 € |
| 670-1.166 €/mes | 2-3 | 220-260 € | 590 € |
| 1.166-1.500 €/mes | 4-5 | 291-294 € | 590 € |
| 1.500-1.850 €/mes | 6-7 | 302-350 € | 590-770 € |
| 1.850-2.330 €/mes | 8-9 | 370-390 € | 770-815 € |
| 2.330-3.190 €/mes | 10-11 | 423-451 € | 860-905 € |
| 3.190-4.050 €/mes | 12-13 | 468-504 € | 950-995 € |
| 4.050-6.000 €/mes | 14 | 530 € | 1.040 € |
| >6.000 €/mes | 15 | 590 € | 1.085 € |

## Qué hacer ahora

1. **Si eres nuevo autónomo**: aprovecha la **tarifa plana 88,64 €/mes**
2. **Si llevas tiempo**: revisa que tu tramo actual coincide con tus ingresos. La SS regulariza tras tu declaración de la Renta.
3. **Si cotizas por la mínima**: piensa en subir la base si quieres mejor pensión futura (cada 100 € de base adicional = ~30 €/mes más de cotización pero mayor jubilación).

[Calcula tu cuota exacta](/cuota-autonomo)
`,
  },
];

export function getPostBySlug(slug: string): BlogPost | null {
  return POSTS.find((p) => p.slug === slug) || null;
}

export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}
