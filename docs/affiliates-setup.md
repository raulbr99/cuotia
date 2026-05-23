# Cuotia — Setup affiliates + donaciones

Plan de monetización pasiva sin requerir aprobación de AdSense.
Última actualización: 23 mayo 2026.

---

## 📋 Programas a aplicar (orden de prioridad)

### Alta prioridad — apply esta semana

| Programa | URL signup | Comisión típica | Nicho |
|---|---|---|---|
| **Declarando** | https://declarando.es/embajadores | 20-40 € por contrato | Gestoría online generalista |
| **Quipu** | https://getquipu.com/afiliados (preguntar en hola@quipu.com si no encuentras form público) | 15-30 % primer pago | Software facturación |
| **Holded** | https://www.holded.com/partners | Comisión por contrato | Software completo |

### Media prioridad

| Programa | URL | Comisión | Nicho |
|---|---|---|---|
| **TaxScouts** | https://taxscouts.es/embajadores | Variable | Renta one-time |
| **Anfix** | https://www.anfix.com/partners | Por contrato | Software clásico |
| **Crear Empresa Hoy** | https://crearempresahoy.com (contactar comercial) | 30-100 € por alta SL | Constitución sociedades |
| **Infoautónomos** | https://www.infoautonomos.com (form Pro) | Variable | Alta + asesoría |

### Networks de affiliate por si dan acceso

- **Awin** (https://www.awin.com) — varias gestorías españolas
- **TradeDoubler** (https://www.tradedoubler.com) — algunas financieras

---

## 🔧 Cómo integrar tus links cuando los tengas

### 1. Edita `src/lib/affiliates.ts`

Reemplaza el `href` placeholder con tu link de afiliado real:

```ts
declarando: {
  name: "Declarando",
  href: "https://declarando.es?ref=cuotia&utm_source=...", // ← tu link aquí
  // ...
}
```

### 2. Los componentes ya están integrados en:

- `/sl-vs-autonomo` → muestra Declarando + Holded
- `/cuota-autonomo-societario` → Quipu + Holded
- `/generador-facturas` → Quipu + Anfix
- `/verifactu` → Quipu + Holded
- `/guias/alta-autonomo` → Infoautónomos + Declarando
- `/calculadora-irpf` → TaxScouts + Declarando

### 3. Cambiar partners por página

Edita `AFFILIATES_BY_PAGE` en `src/lib/affiliates.ts`. Cada página tiene
su propia receta de partners. Cámbialos según qué programa te apruebe.

### 4. Añadir nuevos partners

```ts
// En affiliates.ts
const PARTNERS = {
  // ... existing ...
  miNuevoPartner: {
    name: "Partner X",
    href: "https://...",
    description: "Qué hace y para quién",
    features: ["Feature 1", "Feature 2"],
    badge: "Software", // o "Gestoría", "Alta", etc.
  },
};

// Y meterlo en alguna receta:
sl: {
  partners: [PARTNERS.declarando, PARTNERS.miNuevoPartner],
},
```

---

## 💰 Botón donación

### Setup Ko-fi (recomendado)

1. Crea cuenta gratis en https://ko-fi.com
2. Username sugerido: `cuotia`
3. Si está cogido: `cuotia-es`, `cuotiapp`
4. Sustituye URL en `src/components/Footer.tsx` línea ~21:
   ```tsx
   href="https://ko-fi.com/cuotia"
   ```

### Alternativas

- **BuyMeACoffee** (https://buymeacoffee.com) — más popular EEUU, mismo concepto
- **Patreon** (https://www.patreon.com) — para crear recurring si más adelante haces contenido extra
- **PayPal.me** — más directo pero menos UX bonita

---

## 📊 Tracking conversiones

### Vercel Analytics (ya integrado)

Ya tracking page views. Para custom events:

```ts
import { track } from '@vercel/analytics';

// En AffiliateCard cuando el user hace click:
<a onClick={() => track('affiliate_click', { partner: p.name })}>
```

### Google Search Console

- En URL Parameters, configura `ref` como parámetro tracking (no ignorar)

---

## 🎯 Expectativas realistas

### Mes 1-2 (sin tráfico significativo)
- Visitas: ~50-200/día
- Clicks afiliados: 1-5/día
- Conversiones: 0-1/semana
- Revenue: **0-50 €/mes**

### Mes 3-6 (con SEO trayendo tráfico)
- Visitas: 200-1000/día
- Clicks afiliados: 5-30/día
- Conversiones: 1-3/semana
- Revenue: **100-500 €/mes**

### Mes 6-12 (con autoridad establecida)
- Visitas: 1000-5000/día
- Clicks afiliados: 30-150/día
- Conversiones: 3-10/semana
- Revenue: **500-2000 €/mes**

### Donaciones
- Realista: 0-5 €/mes los primeros 6 meses
- Después: 10-50 €/mes con base establecida
- No es el driver principal, es señal de comunidad

---

## ⚠️ Cumplimiento legal

- ✅ El `AffiliateCard` ya incluye **disclosure visible** ("los enlaces de esta sección pueden generar comisión")
- ✅ Atributo `rel="sponsored"` en cada link (requirement Google + cumplimiento FTC equivalente UE)
- ✅ Disclosure en footer del `<aside>` no oculto ni con tipografía minúscula
- Cumple Ley de Servicios Digitales UE (DSA) y guidelines EU consumer protection

---

## ❌ Lo que NO hacer

- ❌ Recomendar producto solo por la comisión (matas confianza)
- ❌ Ocultar el disclosure de afiliado
- ❌ Vender contactos (lead generation B2B) — daña reputación
- ❌ Sponsored content sin marcarlo claramente
- ❌ Comprar reviews falsas para partners

---

## Siguientes pasos

1. **HOY**: signup en Declarando + Quipu + Ko-fi
2. **Esta semana**: aprobaciones llegando + edita `affiliates.ts` con tus links
3. **2 semanas**: añadir Holded + Anfix + analítica eventos
4. **1 mes**: revisar cuáles convierten mejor + duplicar inversión en esos
