import type { Project } from "./types";

/**
 * Portafolio.
 *
 * IMPORTANTE: sustituye estas imágenes de demostración únicamente por
 * trabajos que el cliente haya hecho. Un portafolio con fotos ajenas engaña a
 * sus compradores y es el reclamo más fácil de probar en su contra.
 */
export const projects: Project[] = [
  {
    slug: "revuelto-wrap-calipers",
    title: "Wrap Personalizado",
    vehicle: "Lamborghini Revuelto",
    work: ["Wrap completo", "Calipers rojos"],
    image: "/img/proyectos/revuelto.jpeg",
    year: 2026,
    featured: true,
  },
  {
    slug: "urus-full-ppf",
    title: "Full PPF",
    vehicle: "Lamborghini Urus",
    work: ["PPF carrocería completa", "Cerámico"],
    image: "/img/proyectos/urus.jpeg",
    year: 2026,
    featured: true,
  },
  {
    slug: "lambo-negro-xpel",
    title: "Full PPF XPEL",
    vehicle: "Lamborghini",
    work: ["PPF carrocería completa", "Blackout"],
    image: "/img/proyectos/lamborguininegro.jpg",
    year: 2026,
    featured: true,
  },
  {
    slug: "mustang-amarillo",
    title: "Amarillo Racing",
    vehicle: "Mustang",
    work: ["Wrap completo", "Polarizado"],
    image: "/img/proyectos/mustangamarillo.jpg",
    year: 2025,
    featured: true,
  },
  {
    slug: "mclaren-franjas",
    title: "Wrap con Franjas",
    vehicle: "McLaren 540C",
    work: ["Wrap personalizado", "Gráficos y franjas"],
    image: "/img/proyectos/mclaren.jpg",
    year: 2025,
    featured: true,
  },
  {
    slug: "gt3rs-fibra",
    title: "PPF Fibra de Carbono",
    vehicle: "Porsche GT3 RS",
    work: ["PPF fibra de carbono", "Full PPF"],
    image: "/img/proyectos/porschegt3rs.jpg",
    year: 2025,
    featured: true,
  },
  {
    slug: "lambo-rojo-ppf",
    title: "Full PPF",
    vehicle: "Lamborghini",
    work: ["PPF carrocería completa"],
    image: "/img/proyectos/lamborguinirojo.jpg",
    year: 2025,
  },
  {
    slug: "bmw-x4m-detalle",
    title: "Detallado Integral",
    vehicle: "BMW X4 M",
    work: ["Detallado integral", "Polarizado"],
    image: "/img/proyectos/bmwx4m.jpg",
    year: 2024,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
