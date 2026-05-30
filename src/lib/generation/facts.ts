// Hechos fiscales verificados de Cuotia (vigentes 2026). Se inyectan en el prompt
// del redactor para que NO invente cifras: si una noticia choca con esto, debe
// señalarlo, no fabricar números. Mantener en sync con public/llms.txt y las libs.
export const CUOTIA_FACTS = `DATOS FISCALES VERIFICADOS (España, vigentes 2026 — RD-ley 3/2026, Orden PJC/297/2026):
- Cuota RETA: 15 tramos por ingresos reales. Cuota mínima 200 €/mes (tramo 1, ≤670 €/mes) a 590 €/mes (tramo 15, >6.000 €/mes).
- Tipo total cotización RETA 2026: 31,50% (28,30% contingencias comunes + 1,30% profesionales + 0,90% cese de actividad + 0,10% formación + 0,90% MEI).
- Tarifa plana: 88,64 €/mes (80 € + MEI) los primeros 12 meses, prorrogables 12 más si el rendimiento neto anual < SMI.
- MEI 2026: 0,9% (sube hasta 1,2% en 2029).
- Autónomo societario 2026: base mínima 1.424,40 €/mes (+42,4%); cuota mínima ~449-451 €/mes.
- Verifactu: obligatorio para autónomos persona física desde el 1 de julio de 2027 (sociedades desde enero 2026).
- IRPF estatal (mitad): 9,5% / 12% / 15% / 18,5% / 22,5% / 24,5% por tramo. Escala autonómica varía por CCAA.
- IVA: 21% general, 10% reducido, 4% superreducido, 0% exento.
- Retención IRPF facturas: 15% general, 7% nuevos autónomos (primeros 3 años).
- Dietas exentas: 26,67 €/día España sin pernocta, 53,34 € con pernocta. Kilometraje: 0,26 €/km.
- Plazos trimestrales: T1 1-20 abril, T2 1-20 julio, T3 1-20 octubre, T4 1-30 enero. Modelo 100 (renta): 6 abril-30 junio. Modelo 347: 1-28 febrero.`;

// Páginas internas de Cuotia para enlazar desde los posts (clave para SEO/AEO).
export const CUOTIA_PAGES = `PÁGINAS INTERNAS para enlazar con markdown [texto](/ruta) cuando sea relevante:
- /cuota-autonomo (calculadora cuota + 15 tramos)
- /calculadora-irpf (IRPF + 17 CCAA + modelo 130)
- /calculadora-iva (IVA + modelo 303)
- /neto-bruto (qué te queda al mes)
- /calculadora-despido (indemnización + finiquito)
- /baja-medica · /jubilacion-autonomo · /dietas-kilometraje
- /generador-facturas (factura PDF) · /calendario-fiscal (plazos)
- /verifactu · /tarifa-hora-vs-proyecto · /cuota-autonomo-societario
- /pluriactividad · /sl-vs-autonomo · /retencion-irpf-facturas
- /iva-plataformas-internacionales · /glosario · /preguntas-frecuentes-autonomos
- /guias/alta-autonomo · /guias/gastos-deducibles · /guias/tarifa-plana`;
