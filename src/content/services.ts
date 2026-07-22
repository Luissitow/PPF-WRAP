import type { Service, ServiceCategory } from "./types";

/**
 * Catálogo de servicios.
 *
 * Los precios son texto porque el taller cobra en unidades distintas
 * (por m², por par, por pieza). Ver `Service.price` en types.ts.
 *
 * Las imágenes son de demostración y viven en /public/img/servicios.
 * Reemplázalas por fotos del cliente conservando la proporción 1:1.
 */

export const serviceCategories: Record<ServiceCategory, string> = {
  wrap: "Wrap",
  ppf: "Protección PPF",
  detallado: "Detallado",
  accesorios: "Accesorios",
};

export const services: Service[] = [
  {
    slug: "ppf",
    name: "PPF",
    summary: "Protección transparente para tu pintura",
    category: "ppf",
    image: "/img/servicios/ppfinstalacion.jpg",
    price: "$1,999 mxn m2",
    duration: "2 días",
    featured: true,
  },
  {
    slug: "ppf-fibra-carbono",
    name: "PPF Fibra de Carbono",
    summary: "Acabado en fibra de carbono para tu vehículo",
    category: "ppf",
    image: "/img/servicios/ppffibra.jpg",
    price: "$2,500 mxn m2",
    duration: "2 días",
    featured: true,
  },
  {
    slug: "ppf-mate",
    name: "PPF Mate",
    summary: "Protección con acabado mate para tu vehículo",
    category: "ppf",
    image: "/img/servicios/ppfmate.jpg",
    price: "$2,500 mxn m2",
    duration: "2 días",
    featured: true,
  },
  {
    slug: "ppf-faros",
    name: "PPF Faros",
    summary: "Protección para faros con diferentes tonalidades",
    category: "ppf",
    image: "/img/servicios/farosppf.jpg",
    price: "$1,115 mxn el par",
    duration: "Mismo día",
    featured: true,
  },
  {
    slug: "wrap-completo",
    name: "Wrap Completo",
    summary: "Cambio de color total en vinil de alto desempeño",
    category: "wrap",
    image: "/img/servicios/wrap.jpg",
    price: "$28,000 mxn",
    duration: "4 a 6 días",
    featured: true,
  },
  {
    slug: "wrap-parcial",
    name: "Wrap Parcial",
    summary: "Techo, cofre o detalles puntuales para un contraste limpio",
    category: "wrap",
    image: "/img/servicios/wrapparcial.jpg",
    price: "$4,500 mxn",
    duration: "1 día",
    featured: true,
  },
  {
    slug: "tratamiento-ceramico",
    name: "Tratamiento Cerámico",
    summary: "Recubrimiento hidrofóbico que realza el brillo",
    category: "detallado",
    image: "/img/servicios/tratamientoceramico.jpg",
    price: "$8,500 mxn",
    duration: "2 días",
    featured: true,
  },
  {
    slug: "correccion-pintura",
    name: "Corrección de Pintura",
    summary: "Pulido multipaso que elimina micro rayones",
    category: "detallado",
    image: "/img/servicios/correcciondepintura.jpg",
    price: "$6,000 mxn",
    duration: "2 a 3 días",
    featured: true,
  },
  {
    slug: "polarizado",
    name: "Polarizado",
    summary: "Control solar con rechazo de calor y protección UV",
    category: "accesorios",
    image: "/img/servicios/polarizado.jpg",
    price: "$3,500 mxn",
    duration: "1 día",
  },
  {
    slug: "pintura-calipers",
    name: "Pintura de Calipers",
    summary: "Acabado en alta temperatura con desmontaje completo",
    category: "accesorios",
    image: "/img/servicios/caliperspintura.jpg",
    price: "$4,800 mxn el juego",
    duration: "2 días",
  },
  {
    slug: "blackout",
    name: "Blackout",
    summary: "Ennegrecido de cromos, emblemas y molduras",
    category: "wrap",
    image: "/img/servicios/cromados.jpg",
    price: "$5,500 mxn",
    duration: "1 a 2 días",
  },
  {
    slug: "detallado-integral",
    name: "Detallado Integral",
    summary: "Limpieza profunda de interiores y exteriores",
    category: "detallado",
    image: "/img/servicios/wrapbrillante.jpg",
    price: "$2,800 mxn",
    duration: "1 día",
  },
];

/* -------------------------------------------------------------------------- */

export const featuredServices = services.filter((s) => s.featured);

export function servicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((s) => s.category === category);
}

export function findService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
