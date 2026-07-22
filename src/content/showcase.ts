/**
 * Slides del carrusel 3D del hero.
 *
 * Porta el bloque `.swiper-3d-7` del sitio original: cada tarjeta lleva una
 * etiqueta flotante con el vehículo y un pie con el trabajo realizado.
 *
 * Las imágenes son de demostración. Antes de publicar para un cliente,
 * reemplázalas por trabajos suyos (ver la nota de derechos en el README).
 */

export interface ShowcaseSlide {
  image: string;
  /** Etiqueta flotante sobre la imagen. */
  vehicle: string;
  /** Título del pie. */
  title: string;
  /** Segunda línea del pie, en acento. */
  detail: string;
}

export const showcaseSlides: ShowcaseSlide[] = [
  {
    image: "/img/proyectos/revuelto.jpeg",
    vehicle: "Lamborghini Revuelto",
    title: "Wrap personalizado +",
    detail: "Calipers rojos",
  },
  {
    image: "/img/proyectos/urus.jpeg",
    vehicle: "Lamborghini Urus",
    title: "Full",
    detail: "PPF",
  },
  {
    image: "/img/proyectos/lamborguininegro.jpg",
    vehicle: "Lamborghini",
    title: "Full PPF",
    detail: "XPEL",
  },
  {
    image: "/img/proyectos/ferrari.jpg",
    vehicle: "Ferrari 458 Italia",
    title: "Polarizado de",
    detail: "Parabrisas",
  },
  {
    image: "/img/proyectos/porsche911negro.jpg",
    vehicle: "Porsche 911 Carrera S",
    title: "Wrap personalizado +",
    detail: "Calipers rojos",
  },
  {
    image: "/img/proyectos/mclaren.jpg",
    vehicle: "McLaren 540C",
    title: "Wrap personalizado",
    detail: "Franjas",
  },
  {
    image: "/img/proyectos/audir8blanco.jpg",
    vehicle: "Audi R8",
    title: "Full PPF",
    detail: "Stealth",
  },
  {
    image: "/img/proyectos/porschegt3rs.jpg",
    vehicle: "Porsche GT3 RS",
    title: "PPF Fibra de carbono +",
    detail: "Full PPF",
  },
  {
    image: "/img/proyectos/lamborguinirojo.jpg",
    vehicle: "Lamborghini",
    title: "Full",
    detail: "PPF",
  },
  {
    image: "/img/proyectos/LamborguiniGallardo.jpg",
    vehicle: "Lamborghini Gallardo",
    title: "Full",
    detail: "PPF",
  },
];
