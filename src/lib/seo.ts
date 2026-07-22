import type { Metadata } from "next";
import { formattedAddress, siteConfig } from "@/config/site";
import { services } from "@/content/services";

/**
 * Metadata base del sitio, derivada por completo de site.config.
 * Las páginas individuales sólo declaran su `title` y `description`.
 */
export function buildMetadata(): Metadata {
  const { seo, name, description, location } = siteConfig;

  return {
    metadataBase: new URL(seo.url),
    title: {
      default: seo.defaultTitle,
      template: seo.titleTemplate,
    },
    description,
    keywords: [...seo.keywords],
    authors: [{ name }],
    creator: name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: seo.locale,
      url: seo.url,
      siteName: name,
      title: seo.defaultTitle,
      description,
      images: [{ url: seo.ogImage, width: 1200, height: 630, alt: name }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.defaultTitle,
      description,
      images: [seo.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    other: {
      "geo.region": `${location.country}-${location.region}`,
      "geo.placename": location.locality,
      "geo.position": `${location.latitude};${location.longitude}`,
      ICBM: `${location.latitude}, ${location.longitude}`,
    },
  };
}

/**
 * Extrae el monto numérico de un precio escrito para humanos.
 *
 * En la interfaz el precio es texto porque lleva unidad ("$1,999 mxn m2",
 * "$1,115 mxn el par"), pero schema.org exige un número. Devuelve null si el
 * texto no trae cifra, para omitir el campo en vez de mandar basura a Google.
 */
function parsePrice(price?: string): number | null {
  if (!price) return null;
  const match = price.replace(/,/g, "").match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : null;
}

/**
 * JSON-LD de negocio local. Google lo usa para el panel de conocimiento
 * y los resultados enriquecidos de búsqueda local.
 */
export function buildLocalBusinessSchema() {
  const { name, legalName, description, contact, location, seo, hours } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name,
    legalName,
    description,
    url: seo.url,
    telephone: contact.phone,
    email: contact.email,
    image: `${seo.url}${seo.ogImage}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.street,
      addressLocality: location.locality,
      addressRegion: location.region,
      postalCode: location.postalCode,
      addressCountry: location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.latitude,
      longitude: location.longitude,
    },
    openingHours: hours.map((h) => h.schema).filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios",
      itemListElement: services.map((service) => {
        const amount = parsePrice(service.price);
        return {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.summary,
          },
          ...(amount !== null && { price: amount, priceCurrency: "MXN" }),
        };
      }),
    },
  };
}

/** JSON-LD de preguntas frecuentes. */
export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export { formattedAddress };
