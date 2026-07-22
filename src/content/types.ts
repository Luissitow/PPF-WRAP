/**
 * Contratos de contenido.
 *
 * Todo el contenido editable del sitio se tipa aquí, de modo que un error al
 * personalizar la plantilla (un campo faltante, un slug repetido) salga en el
 * build y no en producción.
 */

export type ServiceCategory = "wrap" | "ppf" | "detallado" | "accesorios";

export interface Service {
  /** Identificador en URL. Debe ser único. */
  slug: string;
  name: string;
  /** Frase corta para tarjetas. Máx. ~90 caracteres. */
  summary: string;
  category: ServiceCategory;
  /** Ruta relativa a /public. */
  image: string;
  /**
   * Precio como texto, porque el negocio cobra en unidades distintas:
   * "$1,999 mxn m2", "$1,115 mxn el par", "$8,500 mxn".
   * Omítelo para que la tarjeta muestre "Cotización".
   */
  price?: string;
  /** Duración estimada, en texto libre: "2 a 3 días". */
  duration?: string;
  /** Lo que incluye el servicio. Se muestra como lista. */
  includes?: string[];
  /** Destácalo en la sección principal de servicios. */
  featured?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  /** Vehículo intervenido: "Deportivo biplaza", "SUV compacta". */
  vehicle: string;
  /** Servicios aplicados. Texto libre para no atarlo a los slugs. */
  work: string[];
  image: string;
  year: number;
  featured?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  /** Años de experiencia. Se muestra como badge si viene. */
  experience?: number;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Stat {
  /** Valor numérico para el contador animado. */
  value: number;
  /** Sufijo: "+", "%", "k". */
  suffix?: string;
  label: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
