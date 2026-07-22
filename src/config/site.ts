/**
 * ============================================================================
 *  CONFIGURACIÓN DEL SITIO — EL ÚNICO ARCHIVO QUE TOCAS POR CLIENTE
 * ============================================================================
 *
 *  Todo lo que identifica al negocio vive aquí: nombre, contacto, ubicación,
 *  redes, SEO y colores. Ningún componente tiene datos del negocio hardcodeados.
 *
 *  Para entregar la plantilla a un cliente nuevo:
 *    1. Cambia los valores de este archivo.
 *    2. Reemplaza los archivos de /public/brand (logo + favicon).
 *    3. Sube las fotos del cliente y actualiza src/content/*.ts.
 *
 *  Los colores de marca se controlan desde src/app/globals.css (@theme).
 * ============================================================================
 */

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  /* --- Identidad -------------------------------------------------------- */
  /** Marcador de posición a propósito: sin nombre de negocio real. */
  name: "TU NEGOCIO",
  /** Se usa en el <h1> del hero. Los saltos de línea se respetan. */
  displayName: "TU\nNEGOCIO",
  legalName: "Tu Negocio S.A. de C.V.",
  tagline: "Wrap · PPF · Detallado",
  description:
    "Estudio de personalización y protección automotriz. Wraps, película de protección de pintura, detallado y accesorios con acabado de taller premium.",

  /* --- Contacto --------------------------------------------------------- */
  contact: {
    /** Formato internacional sin espacios ni signos. Se usa para el link de WhatsApp. */
    whatsapp: "5215500000000",
    /** Formato legible para mostrar en pantalla. */
    phoneDisplay: "55 0000 0000",
    /** Formato E.164 para el link tel: y schema.org. */
    phone: "+525500000000",
    email: "contacto@ejemplo.com",
  },

  /* --- Ubicación (alimenta schema.org y los meta geo) ------------------- */
  location: {
    street: "Av. Principal 000",
    locality: "Ciudad",
    region: "Estado",
    postalCode: "00000",
    country: "MX",
    latitude: "19.432608",
    longitude: "-99.133209",
    /** Link de Google Maps del negocio. */
    mapsUrl: "https://maps.google.com",
  },

  /* --- Horario (schema.org openingHours) -------------------------------- */
  hours: [
    { days: "Lunes a Viernes", time: "9:00 – 19:00", schema: "Mo-Fr 09:00-19:00" },
    { days: "Sábado", time: "10:00 – 15:00", schema: "Sa 10:00-15:00" },
    { days: "Domingo", time: "Cerrado", schema: null },
  ],

  /* --- Redes sociales (deja "" para ocultar el ícono) ------------------- */
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
    whatsapp: "",
  },

  /* --- SEO -------------------------------------------------------------- */
  seo: {
    /** Sin slash final. Necesario para las URLs canónicas y Open Graph. */
    url: "https://ejemplo.com",
    titleTemplate: "%s | TU NEGOCIO",
    defaultTitle: "TU NEGOCIO | Wrap Automotriz, PPF y Detallado",
    keywords: [
      "wrap automotriz",
      "PPF",
      "película de protección de pintura",
      "detallado automotriz",
      "polarizado",
      "tratamiento cerámico",
    ],
    /** Imagen de Open Graph, relativa a /public. 1200x630 recomendado. */
    ogImage: "/brand/og.svg",
    locale: "es_MX",
  },

  /* --- Recursos de marca (archivos en /public) -------------------------- */
  brand: {
    logo: "/brand/logo.svg",
    logoMark: "/brand/mark.svg",
    favicon: "/brand/favicon.svg",
  },

  /* --- Interruptores de secciones --------------------------------------- */
  /** Apaga secciones completas sin borrar código. Útil por cliente. */
  features: {
    team: true,
    process: true,
    portfolio: true,
    stats: true,
    newsletter: true,
    preloader: true,
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Helpers derivados                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Arma un link de WhatsApp con mensaje pre-escrito.
 * El mensaje se codifica, así que puede llevar acentos y emoji sin romperse.
 */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.contact.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Mensaje por defecto para el botón de cotización. */
export function quoteLink(service?: string): string {
  const subject = service ? ` para ${service}` : "";
  return whatsappLink(
    `Hola ${siteConfig.name}, me gustaría cotizar un servicio${subject}.`,
  );
}

/** Dirección en una línea. */
export function formattedAddress(): string {
  const { street, locality, region, postalCode } = siteConfig.location;
  return `${street}, ${locality}, ${region}, ${postalCode}`;
}
