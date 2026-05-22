interface HowToStep {
  name: string;
  text: string;
  url?: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 e.g. "PT2M"
  steps: HowToStep[];
  estimatedCost?: { currency: string; value: string };
}

/**
 * Schema.org HowTo markup. Google AI Overviews y ChatGPT prefieren
 * contenido estructurado: este schema permite extraer los pasos del
 * cálculo como un tutorial paso a paso.
 */
export function HowToSchema({ name, description, totalTime, steps, estimatedCost }: HowToSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(totalTime ? { totalTime } : {}),
    ...(estimatedCost
      ? {
          estimatedCost: {
            "@type": "MonetaryAmount",
            currency: estimatedCost.currency,
            value: estimatedCost.value,
          },
        }
      : {}),
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url ? { url: s.url } : {}),
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
