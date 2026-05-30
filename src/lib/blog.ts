export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  category: string;
  tag: string;
  content: string;
  imageUrl?: string;
}

export const POSTS: BlogPost[] = [
  {
    slug: "comparativa-software-autonomos-2026",
    title: "Comparativa de software y calculadoras para autónomos 2026",
    description: "Panorama honesto del software fiscal para autónomos en España: gestorías online (Declarando, TaxDown, Infoautónomos), software facturación (Quipu, Holded, Anfix), y calculadoras gratuitas (Cuotia). Qué elegir y cuándo.",
    datePublished: "2026-05-22",
    category: "Comparativas",
    tag: "Software",
    content: `## Tres tipos de herramientas

El mercado fiscal para autónomos tiene tres tipos de productos. Saber cuál
necesitas evita pagar de más o quedarte corto.

### 1. Gestorías online

Te llevan la fiscalidad a cambio de cuota mensual. Presentan tus modelos,
asesoran y resuelven dudas. Típicamente 30-80 €/mes.

- **Declarando** — gestoría online popular, incluye 100 facturas/mes y modelo 130/303
- **TaxDown** — más enfocada a renta (modelo 100) y particulares
- **Infoautónomos** (Infojobs) — pack incluye alta + asesoría
- **Crear Empresa Hoy / Anfix** — combinan gestoría + software

**Cuándo conviene**: si facturas >20.000 €/año o tu actividad es compleja
(IVA intracomunitario, varios países, empleados).

### 2. Software de facturación

Emites facturas, llevas tus libros y exportas datos para tu gestor.
Típicamente 10-30 €/mes. Algunos serán Verifactu-ready en 2027.

- **Quipu** — popular entre profesionales digitales, factura recurrente buena
- **Holded** — más enterprise, también CRM y proyectos
- **Anfix** — clásico español, integra bien con gestorías
- **Billin** — sencillo, gratis hasta 5 facturas/mes
- **Contasimple** — gratuito básico, integra contabilidad

**Cuándo conviene**: si emites >10 facturas/mes o necesitas
factura recurrente, ofertas, etc.

### 3. Calculadoras y herramientas puntuales

Para preguntas específicas o estimaciones rápidas. Gratuitas, sin registro.

- **[Cuotia](/)** (nosotros) — 9 calculadoras + 12 blog posts + 27 términos del glosario
- **Calculadora-sueldo.es** — sueldo neto/bruto principal
- **Bcc.es / Bizneo** — soporte fiscal en sus tools
- Apps oficiales de gestorías (la mayoría requieren cuenta)

**Cuándo conviene**: para estimaciones rápidas antes de decidir, dudas
puntuales, o si llevas tu gestión solo con Excel + un gestor anual.

## Tabla resumen por necesidad

| Necesitas... | Mejor opción |
|---|---|
| Calcular cuota antes de decidirme | [Cuotia](/cuota-autonomo) (gratis) |
| Emitir facturas profesionales | Quipu, Holded, Anfix |
| Tener gestoría completa | Declarando, TaxDown |
| Solo darte de alta | Infoautónomos (pack alta) |
| Comparar IRPF entre CCAA | [Cuotia](/calculadora-irpf) |
| Preparar Verifactu 2027 | Quipu, Holded (los que actualizan más rápido) |
| Software gratis básico | Billin, Contasimple |

## Lo que diferencia a Cuotia

- **Sin registro**. Calculas y te vas. No vendemos servicios.
- **Sin pop-ups ni emails forzados**. Newsletter es 100% opt-in.
- **Open source en filosofía**: las fórmulas son verificables, los datos son
  del BOE y AEAT, los enlaces a fuentes están visibles.
- **Hecho por autónomos** que se cansaron de calculadoras que metían 5 pop-ups
  antes de enseñar el resultado.

No competimos con gestorías. Si necesitas asesoramiento personalizado,
contrátalas. Cuotia es para que llegues a esas conversaciones sabiendo
**qué preguntar y cuánto deberías pagar**.

## Cuándo NO uses Cuotia

- Si necesitas presentar modelos en tu nombre → contrata gestoría
- Si tu situación tiene matices (sociedades, internacional, herencia) →
  consulta gestor cualificado
- Si te van a sancionar por no presentar → consulta abogado fiscal, no una calc

## Herramientas oficiales que también funcionan

- **Sede Electrónica AEAT** — para presentar modelos tú mismo (gratis pero técnica)
- **Sede Electrónica Seguridad Social** — cambiar tramo, gestionar prestaciones
- **Cl@ve PIN** — acceso simplificado a ambos (no requiere certificado digital)

## Resumen práctico

1. **Calcular**: usa [Cuotia](/) y otras calcs gratis
2. **Emitir facturas**: software (Quipu, Holded, Anfix, Billin)
3. **Presentar modelos**: gestoría (si no quieres líos) o sede electrónica (si te sientes cómodo)
4. **Asesoramiento**: gestor humano cuando haya dudas serias

No hay una herramienta única. La combinación más común para un autónomo
medio: software de facturación + Cuotia para calcular + presentación trimestral
con gestor o solo.
`,
  },
  {
    slug: "preparar-verifactu-2027",
    title: "Cómo prepararte para Verifactu antes de julio 2027",
    description: "Tienes 14 meses para migrar a software certificado. Plan paso a paso: revisar tu software actual, elegir proveedor homologado, transición sin perder facturas.",
    datePublished: "2026-05-22",
    category: "Verifactu",
    tag: "Preparación",
    content: `## El reloj corre

Desde el **1 de julio de 2027** todos los autónomos persona física tienen que emitir
facturas con software certificado Verifactu. Aún no es obligatorio, pero el plazo es
firme y conviene no dejarlo para junio 2027.

## Paso 1: Diagnóstico de tu situación actual

Identifica cómo facturas hoy:

- **Excel, Word, PDF manual** → necesitas cambiar. Verifactu no admite documentos
  sin firma digital y QR.
- **Software de facturación (Quipu, Holded, Anfix, Billin, Contasimple, etc.)** →
  comprueba con tu proveedor si ya están homologados o lo estarán antes de julio 2027.
- **Generador de facturas de Cuotia** → válido hasta junio 2027. Migra a software
  certificado antes.
- **Tu gestor te emite las facturas** → habla con él para confirmar que su sistema
  cumple. Si no, busca alternativa.

## Paso 2: Elegir software certificado

La AEAT publicará un listado oficial de SIFs (Sistemas Informáticos de Facturación)
homologados. Mientras tanto, asegúrate de que tu proveedor:

- Emite facturas con firma digital
- Genera código QR verificable
- Encadena facturas criptográficamente
- Permite envío automático a AEAT
- Tiene plan de actualización confirmado para Verifactu

## Paso 3: Migración sin sustos

- **Mantén numeración**: el sistema nuevo debe continuar la serie de facturas del
  antiguo. No reinicies en 1.
- **Exporta datos antiguos**: descarga todas tus facturas previas en PDF antes de
  cambiar. Conservación obligatoria 4 años.
- **Periodo de prueba**: empieza a usar el nuevo software 1-2 meses antes del 1 julio
  2027 para detectar problemas.

## Paso 4: Después de julio 2027

- Todas tus facturas nuevas llevan QR y firma
- Conservas registros encadenados
- Posibilidad de enviar automáticamente a AEAT (recomendado)

## Sanciones por no cumplir

Hasta **50.000 €/año** por usar software no certificado o que permita alterar
registros (Ley Antifraude 11/2021, art. 201 bis).

## Más información

- [Página completa Verifactu](/verifactu) con FAQs detalladas
- [Generador de facturas Cuotia](/generador-facturas) — válido hasta junio 2027
- [Calendario fiscal](/calendario-fiscal) con todos los plazos
`,
  },
  {
    slug: "modelos-octubre-2026-q3",
    title: "Modelos del 3er trimestre 2026: plazos del 1 al 20 de octubre",
    description: "Modelos 303, 130, 111 y 115 del Q3 2026 (julio-septiembre): plazo del 1 al 20 de octubre, domiciliación hasta el 15. Lo que cambia desde el Q2.",
    datePublished: "2026-09-15",
    category: "Calendario",
    tag: "Modelos trimestrales",
    content: `## Del 1 al 20 de octubre de 2026

Los autónomos en estimación directa presentan los modelos del 3er trimestre
(julio-septiembre 2026) en este plazo.

### Modelos obligatorios para casi todos

- **Modelo 303 (IVA)** — del 1 al 20 de octubre (domiciliación hasta el 15)
- **Modelo 130 (pago fraccionado IRPF)** — del 1 al 20 de octubre
  - Solo si menos del 70% de tus ingresos llevan retención

### Modelos condicionales

- **Modelo 111** — si has retenido IRPF a trabajadores o profesionales que facturaron contigo
- **Modelo 115** — si pagas alquiler de inmueble urbano a empresa

## ¿Qué ha cambiado respecto al Q2?

Para 2026 no hay cambios estructurales respecto al Q2: mismos modelos, mismo plazo
(1-20 del mes siguiente al cierre del trimestre).

## Errores comunes en Q3

1. **No imputar facturas de agosto**: el periodo vacacional hace que muchos olviden
   facturas emitidas/recibidas en agosto.
2. **Doble cómputo de gastos**: revisa que no estés contando facturas duplicadas.
3. **Olvidar el MEI**: tu cuota de Seguridad Social incluye el 0,9% MEI 2026 — no es
   gasto deducible adicional.

## Calculadoras útiles

- [Calculadora modelo 303 (IVA)](/calculadora-iva)
- [Calculadora modelo 130 (IRPF fraccionado)](/calculadora-irpf)
- [Retención IRPF en facturas](/retencion-irpf-facturas)

## Siguiente plazo

**Modelo del Q4 2026**: del 1 al 30 de enero de 2027 (plazo más largo por incluir el
modelo 390 anual del IVA).
`,
  },
  {
    slug: "novedades-fiscales-autonomos-2027",
    title: "Lo que cambia para autónomos en 2027: Verifactu, MEI 1%, jubilación",
    description: "Avance de los cambios que afectan al autónomo en 2027: Verifactu obligatorio julio 1, MEI sube al 1%, ajustes en base reguladora de jubilación, y posibles novedades pendientes BOE.",
    datePublished: "2026-11-01",
    category: "Normativa",
    tag: "2027",
    content: `## Lo que ya está confirmado para 2027

### Verifactu obligatorio (1 julio 2027)

A partir del 1 de julio de 2027 todos los autónomos persona física deben usar
software de facturación certificado. Más en nuestra [página dedicada a Verifactu](/verifactu).

**Sanciones**: hasta 50.000 €/año por software no homologado.

### MEI sube al 1,0%

El Mecanismo de Equidad Intergeneracional sube del 0,9% (2026) al 1,0% en 2027.
Es 0,1 punto adicional sobre tu base de cotización. Sigue siendo coste íntegro
para el autónomo.

### Base reguladora de jubilación: media 25 años

En 2027 entra en vigor el periodo de cálculo de 25 años para la base reguladora
de la jubilación (antes 24). Cotizar por base baja durante muchos años seguirá
penalizando la pensión.

## Lo que está pendiente / por confirmar

- **Cuota autónomos persona física 2027**: a priori se mantiene el sistema de 15
  tramos por ingresos reales. Pendiente publicación BOE de actualización.
- **Cuota societarios 2027**: tras la subida de 42,4% en 2026, ¿habrá nuevo
  ajuste? Pendiente confirmación.
- **SMI 2027**: la negociación del SMI suele cerrarse a finales de año o
  principios del siguiente. Afecta a la prórroga de tarifa plana.
- **Factura electrónica B2B**: el desarrollo reglamentario de la Ley Crea y Crece
  podría activarse en 2027.

## Cómo prepararte

1. **Antes de junio 2027**: migra a software certificado Verifactu.
2. **Revisa tu base**: si has venido cotizando por la mínima, valora subir para
   mejorar tu jubilación.
3. **Actualiza presupuestos**: el MEI al 1% son +1-4 €/mes según base.
4. **Mantente al día**: novedades publicadas en el BOE durante diciembre 2026 -
   enero 2027.

## Recursos

- [Página Verifactu actualizada](/verifactu)
- [Calculadora cuota autónomo 2026](/cuota-autonomo)
- [Glosario fiscal](/glosario)
`,
  },
  {
    slug: "modelo-347-enero-febrero-2027",
    title: "Modelo 347: la declaración de operaciones con terceros (plazo febrero 2027)",
    description: "Cómo y cuándo presentar el modelo 347 sobre operaciones superiores a 3.005,06 € con un mismo proveedor o cliente. Plazo 1-28 febrero 2027 para el ejercicio 2026.",
    datePublished: "2027-01-15",
    category: "Modelos",
    tag: "Modelo 347",
    content: `## Qué es el modelo 347

El modelo 347 es una **declaración informativa anual** en la que comunicas a la
AEAT las operaciones con terceros que han superado los **3.005,06 €** en el
ejercicio (IVA incluido).

No genera pago ni devolución. Su función es que Hacienda **cruce datos** entre
quien declara una factura y quien la recibe.

## Plazo de presentación

Del **1 al 28 de febrero de 2027** para operaciones del año 2026.

## Quién debe presentarlo

- Autónomos persona física con operaciones >3.005,06 € con un mismo tercero
- Sociedades mercantiles en el mismo supuesto
- Comunidades de bienes que superen el límite

**Excepciones**: si solo facturas a particulares, o si todas tus operaciones
ya están declaradas en otros modelos (303, 390), no necesitas presentar el 347.

## Cómo se calcula

Suma todas las operaciones (facturas emitidas + facturas recibidas) con un mismo
tercero (NIF) durante el año natural. Si supera 3.005,06 € (IVA incluido), lo
declaras en el modelo.

Para cada cliente o proveedor incluido:

- Su NIF y nombre/razón social
- Importe total facturado en el año (IVA incluido)
- Desglose trimestral

## Errores típicos

1. **Olvidar arrendamientos** con empresas: el alquiler de oficina/local con
   factura suma para el cómputo.
2. **No cruzar con tus 303s**: las cifras del 347 deben cuadrar con las del IVA
   trimestral.
3. **Confundir 3.005 € por operación vs 3.005 € total con tercero**: es el total
   anual con un mismo NIF, no por factura.

## Sanciones

Por no presentar a tiempo o presentar con errores: multa proporcional al importe
no declarado (hasta el 2% del importe). Mínimo 300 €.

## Recursos

- [Calendario fiscal completo](/calendario-fiscal)
- [Generador de facturas](/generador-facturas) — incluye campos requeridos
`,
  },
  {
    slug: "cierre-fiscal-2026-autonomo",
    title: "Cierre fiscal 2026: checklist del autónomo antes del 31 de diciembre",
    description: "Lo que debes revisar y hacer antes de cerrar el ejercicio fiscal 2026: facturas pendientes, gastos deducibles olvidados, planes de pensiones, base cotización.",
    datePublished: "2026-12-01",
    category: "Cierre fiscal",
    tag: "Fin de año",
    content: `## Por qué importa diciembre

Cerrar bien el año fiscal ahorra dinero en la Renta y evita sustos. Aquí va el
checklist para el autónomo.

## 1. Repasa facturas emitidas

- ¿Hay facturas pendientes de cobro que deberían estar emitidas ya?
- ¿Algún cliente que aún no te ha confirmado importe? Pídeselo antes del 31.
- **Truco**: una factura emitida el 31 de diciembre cuenta en el ejercicio 2026;
  emitida el 1 de enero cuenta en 2027.

## 2. Repasa facturas recibidas

- ¿Has guardado todas las facturas de tus gastos profesionales del año?
- Suministros, gestoría, software, formación, dietas, kilometraje (con justificante)
- Revisa el banco: ¿cargos que no tengas factura? Pídela ahora.

## 3. Gastos olvidados típicos

- **Suministros home office**: 30% deducible si tienes un % de vivienda afectado al alta
- **Material de oficina** comprado online sin pensar
- **Formación profesional** (cursos online, conferencias)
- **Cuotas profesionales** (colegios, asociaciones)
- **Seguros relacionados con la actividad**
- **Comisiones bancarias** de la cuenta profesional

Más en [gastos deducibles autónomo](/guias/gastos-deducibles).

## 4. Aportaciones a planes de pensiones

Las aportaciones reducen base imponible IRPF. Límite 2026: **1.500 €/año** en
planes individuales (8.000 € en planes de empleo del autónomo si tienes uno).

Si vas a hacerlo, debe ser antes del **31 de diciembre**.

## 5. Revisa tu base de cotización

¿Te toca regularización tras la próxima Renta? Si tu rendimiento neto real ha
sido superior al estimado, la TGSS te cobrará la diferencia. Conviene revisar
ahora para no llevarte sorpresas.

[Calcula tu cuota actualizada](/cuota-autonomo).

## 6. Modelo 130 del Q4 (1-30 enero 2027)

Plazo extendido por incluir resumen anual IVA. No es modelo de cierre técnico
pero suele coincidir con el cierre.

## 7. Preparativos Verifactu

Si aún no has migrado a software certificado, **diciembre 2026 es buen momento
para investigar opciones**. Tienes hasta junio 2027.

## Tarifa plana: ojo con la prórroga

Si terminaste tu primer año con tarifa plana entre julio y diciembre 2026, en
los primeros meses de 2027 sabrás si te conceden la prórroga (depende de que
tu rendimiento neto haya quedado por debajo del SMI 2026, ~16.576 €).

## Cheklist final

- [ ] Todas las facturas emitidas
- [ ] Todas las facturas recibidas archivadas
- [ ] Gastos deducibles revisados
- [ ] Aportación a planes de pensiones (si aplica)
- [ ] Revisión de base de cotización
- [ ] Software preparado para 130 + 303 del Q4
- [ ] Plan de migración Verifactu en marcha
`,
  },
  {
    slug: "irpf-comparativa-ccaa-2026",
    title: "IRPF 2026 por Comunidad Autónoma: Madrid vs Cataluña vs Valencia (comparativa)",
    description: "Cuánto IRPF paga un autónomo con 30.000 € en Madrid, Cataluña, Valencia, Andalucía. Tablas comparativas, diferencia anual y por qué tu CCAA importa.",
    datePublished: "2026-10-10",
    category: "IRPF",
    tag: "Comparativa CCAA",
    content: `## Por qué tu CCAA cambia tu IRPF

El IRPF tiene dos mitades: **estatal** (igual para todos) + **autonómica** (cada
Comunidad fija la suya). La diferencia entre la más barata (Madrid) y las más
caras (Cataluña, Valencia, Asturias) puede ser de **2.000-3.000 €/año** para
ingresos medios-altos.

## Comparativa: autónomo con 30.000 € de rendimiento neto

| CCAA | Tipo efectivo aprox. | IRPF anual aprox. |
|---|---|---|
| Madrid | ~17,3% | ~5.200 € |
| Andalucía | ~18,1% | ~5.430 € |
| Valencia | ~19,5% | ~5.850 € |
| Cataluña | ~19,2% | ~5.760 € |
| Asturias | ~19,8% | ~5.940 € |

**Diferencia Madrid vs Asturias**: ~740 €/año.

## Comparativa: autónomo con 60.000 € de rendimiento neto

| CCAA | Tipo efectivo aprox. | IRPF anual aprox. |
|---|---|---|
| Madrid | ~25,1% | ~15.060 € |
| Andalucía | ~25,9% | ~15.540 € |
| Valencia | ~27,8% | ~16.680 € |
| Cataluña | ~28,2% | ~16.920 € |
| Asturias | ~28,5% | ~17.100 € |

**Diferencia Madrid vs Cataluña**: ~1.860 €/año.

## Por qué Madrid es más barata

Madrid lleva años bajando sus tipos autonómicos. En el tramo más alto
autonómico (>120k) cobra ~20,5%, vs Cataluña 25,5%, Valencia 29,5%.

## ¿Compensa cambiar de CCAA?

Solo si tu cambio es **real** (residencia habitual >183 días/año, padrón,
sanidad). La AEAT vigila los "cambios de papel" para evadir IRPF, sobre todo
cuando vienen de CCAA con IRPF alto a Madrid.

**Riesgo**: si Hacienda detecta que sigues viviendo en tu CCAA original, te
imputa el IRPF de tu CCAA real + sanción + intereses.

## Régimen foral: Navarra y País Vasco

Tienen su propia Hacienda y escala. **No** se rigen por el IRPF estatal +
autonómico. Si vives allí, consulta tu Hacienda Foral.

## Calcula tu caso

- [Calculadora IRPF por CCAA](/calculadora-irpf)
- Páginas dedicadas por CCAA: [/irpf/madrid](/irpf/madrid), [/irpf/cataluna](/irpf/cataluna), etc.
`,
  },
  {
    slug: "calendario-fiscal-q3-2026",
    title: "Calendario fiscal Q3 2026: modelos del trimestre julio-septiembre",
    description: "Todas las fechas clave del 2º y 3er trimestre 2026: modelo 303 (IVA), 130 (IRPF), 111 (retenciones), 115 (alquileres). Antes del 21 de julio.",
    datePublished: "2026-05-21",
    category: "Calendario",
    tag: "Modelos trimestrales",
    content: `## Antes del 21 de julio de 2026

Los autónomos en estimación directa tienen que presentar **4 modelos** (algunos según situación) en el plazo del segundo trimestre:

### Obligatorios para casi todos

- **Modelo 303 (IVA)** — del 1 al 20 de julio (21 si es festivo)
  - IVA repercutido del Q2 menos IVA soportado deducible
  - Domiciliación bancaria: hasta el 15 de julio
- **Modelo 130 (pago fraccionado IRPF)** — del 1 al 20 de julio
  - Solo si menos del 70% de tus ingresos llevan retención IRPF
  - 20% sobre rendimiento neto trimestral – retenciones soportadas

### Según situación

- **Modelo 111 (retenciones IRPF a trabajadores y profesionales)** — del 1 al 20 de julio
  - Si has tenido empleados o pagado facturas a otros profesionales con retención
- **Modelo 115 (retenciones por alquiler de inmuebles)** — del 1 al 20 de julio
  - Si pagas alquiler de oficina/local a empresa propietaria

## Recursos para presentar

1. **Vía telemática AEAT**: con certificado digital o Cl@ve
2. **A través de tu gestor**: si tienes contratada gestoría
3. **App AEAT** (limitada para algunos modelos)

## Calculadoras útiles

- [Calcula tu cuota IVA modelo 303](/calculadora-iva)
- [Calcula tu pago fraccionado modelo 130](/calculadora-irpf)
- [Calcula retención IRPF en facturas](/retencion-irpf-facturas)

## Atención a Q3 (octubre)

El siguiente plazo es **del 1 al 20 de octubre** (mismos modelos). Si vas a estar de
vacaciones en agosto, deja preparado el material desde julio.

## Y a final de año

Recuerda los modelos anuales:
- **Modelo 390** (resumen anual IVA): enero
- **Modelo 190** (resumen anual 111): enero
- **Modelo 180** (resumen anual 115): enero
- **Modelo 347** (operaciones >3.005,06 €): febrero
- **Modelo 100** (Renta): abril-junio

Más en el [calendario fiscal completo](/calendario-fiscal).
`,
  },
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

// Posts ya publicados: excluye los del calendario editorial con fecha futura
// (no afirmar publicación en el futuro → mala señal E-E-A-T y schema con fecha imposible).
// Nota: la visibilidad se evalúa en build/render, así que un post futuro aparece
// en el primer despliegue posterior a su datePublished.
export function getPublishedPosts(): BlogPost[] {
  const today = new Date().toISOString().slice(0, 10);
  return POSTS.filter((p) => p.datePublished <= today);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const today = new Date().toISOString().slice(0, 10);
  return POSTS.find((p) => p.slug === slug && p.datePublished <= today) || null;
}

export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}

// --- Enlazado interno por relación temática (clusters) ---

const STOPWORDS = new Set([
  "para", "como", "cuando", "donde", "desde", "hasta", "sobre", "entre", "tras", "según", "porque",
  "autonomo", "autonomos", "autónomo", "autónomos", "2025", "2026", "2027", "paso",
]);

function tokenize(text: string): Set<string> {
  const norm = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
  const words = norm.match(/[a-z0-9]{4,}/g) || [];
  return new Set(words.filter((w) => !STOPWORDS.has(w)));
}

function overlap(a: Set<string>, b: Set<string>): number {
  let n = 0;
  for (const w of a) if (b.has(w)) n++;
  return n;
}

// Posts relacionados con `target` por tag (peso alto), categoría y solape de
// títulos. Devuelve siempre `n` (si no hay afinidad, completa con los recientes).
export function getRelatedPosts(target: BlogPost, all: BlogPost[], n = 3): BlogPost[] {
  const tTok = tokenize(`${target.title} ${target.tag} ${target.category}`);
  const scored = all
    .filter((p) => p.slug !== target.slug)
    .map((p) => {
      let s = overlap(tTok, tokenize(`${p.title} ${p.tag} ${p.category}`));
      if (p.tag && target.tag && p.tag.toLowerCase() === target.tag.toLowerCase()) s += 3;
      if (p.category && target.category && p.category.toLowerCase() === target.category.toLowerCase()) s += 2;
      return { p, s };
    })
    .sort((a, b) => b.s - a.s || b.p.datePublished.localeCompare(a.p.datePublished));
  return scored.slice(0, n).map((x) => x.p);
}

// Posts afines a un texto libre (p.ej. el tema que se va a redactar). Solo
// devuelve los que tienen algún solape real (puede ser lista vacía).
export function relatedToText(text: string, all: BlogPost[], n: number): BlogPost[] {
  const tok = tokenize(text);
  return all
    .map((p) => ({ p, s: overlap(tok, tokenize(`${p.title} ${p.tag} ${p.category}`)) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, n)
    .map((x) => x.p);
}

// --- Archivo por tag (/blog/tema/[tag]) ---

export function tagSlug(tag: string): string {
  return tag
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface TagInfo {
  tag: string;
  slug: string;
  count: number;
}

export function getAllTags(posts: BlogPost[]): TagInfo[] {
  const map = new Map<string, { tag: string; count: number }>();
  for (const p of posts) {
    if (!p.tag) continue;
    const slug = tagSlug(p.tag);
    if (!slug) continue;
    const e = map.get(slug) ?? { tag: p.tag, count: 0 };
    e.count++;
    map.set(slug, e);
  }
  return [...map.entries()]
    .map(([slug, v]) => ({ slug, tag: v.tag, count: v.count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTagSlug(slug: string, posts: BlogPost[]): BlogPost[] {
  return posts.filter((p) => p.tag && tagSlug(p.tag) === slug);
}

// Imagen de previsualización para las tarjetas: la portada generada si existe,
// o la imagen OG dinámica (/api/og, siempre disponible) como respaldo uniforme.
export function postPreviewImage(post: BlogPost): string {
  if (post.imageUrl) return post.imageUrl;
  return `/api/og?title=${encodeURIComponent(post.title)}&tag=${encodeURIComponent(post.tag || "Blog")}`;
}
