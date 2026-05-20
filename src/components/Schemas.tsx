const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cuotia.es";

interface CalculatorSchemaProps {
  name: string;
  description: string;
  path: string;
  category?: string;
}

export function CalculatorSchema({ name, description, path, category = "Tax Calculator" }: CalculatorSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${SITE_URL}${path}`,
    applicationCategory: category,
    applicationSubCategory: "Finance",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    inLanguage: "es-ES",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    publisher: {
      "@type": "Organization",
      name: "CalcAutónomo",
      url: SITE_URL,
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

interface ArticleSchemaProps {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
}

export function ArticleSchema({ headline, description, path, datePublished, dateModified, imageUrl }: ArticleSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${SITE_URL}${path}`,
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: "es-ES",
    image: imageUrl || `${SITE_URL}/og-image.png`,
    author: {
      "@type": "Organization",
      name: "CalcAutónomo",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "CalcAutónomo",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${path}` },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

interface SpeakableSchemaProps {
  cssSelectors?: string[];
}

export function SpeakableSchema({ cssSelectors = [".speakable"] }: SpeakableSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
