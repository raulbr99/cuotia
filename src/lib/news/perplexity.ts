// Obtiene las últimas novedades fiscales para autónomos en España con Perplexity
// sonar, pero ENRUTADO POR OPENROUTER: reusa OPENROUTER_API_KEY (sin cuenta ni
// depósito aparte en Perplexity). Cambia el motor con NEWS_MODEL
// (p.ej. "perplexity/sonar-pro" o un modelo normal con sufijo ":online").
export interface NewsResult {
  summary: string;
  citations: string[];
}

const NEWS_MODEL = process.env.NEWS_MODEL || "perplexity/sonar";

export async function fetchLatestFiscalNews(): Promise<NewsResult | null> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return null;

  // Los modelos de búsqueda no conocen la fecha actual (asumen su fecha de
  // entrenamiento). Hay que anclarla o devuelven "sin novedades".
  const hoy = new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
  const anno = new Date().getFullYear();

  const userPrompt = `Hoy es ${hoy}. Resume en 5-8 puntos los temas fiscales y de Seguridad Social MÁS RELEVANTES AHORA MISMO para los autónomos en España, priorizando lo más reciente y accionable:

(a) cualquier cambio normativo reciente (BOE, AEAT, Seguridad Social) de las últimas semanas;
(b) los cambios ya vigentes en ${anno} que siguen afectando al autónomo: cuota RETA por tramos de ingresos reales, MEI, tarifa plana, Verifactu / facturación electrónica, IRPF, IVA;
(c) los próximos plazos o fechas clave de los siguientes 1-2 meses (modelos trimestrales 130/303, campaña de la renta, resúmenes anuales, etc.).

Para cada punto: qué es o qué ha cambiado, su fecha o plazo, por qué le importa al autónomo, y la fuente. Solo hechos verificables; si una cifra no la puedes confirmar, dilo en vez de inventarla.`;

  let res: Response;
  try {
    res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "X-Title": "Cuotia blog news",
      },
      body: JSON.stringify({
        model: NEWS_MODEL,
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "Eres un analista fiscal español especializado en autónomos. Respondes en español, conciso y solo con hechos verificables y recientes, citando fuentes oficiales (BOE, AEAT, Seguridad Social) cuando sea posible.",
          },
          { role: "user", content: userPrompt },
        ],
      }),
    });
  } catch {
    return null;
  }
  if (!res.ok) return null;

  const data = await res.json();
  const msg = data.choices?.[0]?.message;
  const summary: string = msg?.content ?? "";

  // Citas: OpenRouter las expone en message.annotations (url_citation) y/o en
  // data.citations (formato Perplexity).
  const fromAnnotations: unknown[] = Array.isArray(msg?.annotations)
    ? msg.annotations.map((a: { url_citation?: { url?: string } }) => a?.url_citation?.url)
    : [];
  const fromRoot: unknown[] = Array.isArray(data.citations) ? data.citations : [];
  const citations = [...new Set([...fromAnnotations, ...fromRoot])].filter(
    (c): c is string => typeof c === "string",
  );

  if (!summary.trim()) return null;
  return { summary, citations };
}
