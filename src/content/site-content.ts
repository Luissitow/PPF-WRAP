import type { FaqItem, NavItem, ProcessStep, Stat, TeamMember } from "./types";

/**
 * Contenido de secciones: navegación, proceso, equipo, cifras y FAQ.
 * Texto genérico de plantilla, listo para reescribir por cliente.
 */

/* --- Navegación ----------------------------------------------------------- */

export const mainNav: NavItem[] = [
  {
    label: "Servicios",
    href: "#servicios",
    children: [
      { label: "PPF", href: "#servicios" },
      { label: "PPF fibra de carbono", href: "#servicios" },
      { label: "PPF mate", href: "#servicios" },
      { label: "PPF faros", href: "#servicios" },
      { label: "Wrap completo", href: "#servicios" },
      { label: "Wrap parcial", href: "#servicios" },
      { label: "Tratamiento cerámico", href: "#servicios" },
      { label: "Corrección de pintura", href: "#servicios" },
      { label: "Polarizado", href: "#servicios" },
      { label: "Pintura de calipers", href: "#servicios" },
      { label: "Blackout", href: "#servicios" },
      { label: "Detallado integral", href: "#servicios" },
    ],
  },
  { label: "Proyectos", href: "#proyectos" },
  {
    label: "Paquetes",
    href: "#servicios",
    children: [
      { label: "Paquete wrap completo", href: "#servicios" },
      { label: "Paquete PPF premium", href: "#servicios" },
      { label: "Paquete detallado", href: "#servicios" },
      { label: "Paquete blackout", href: "#servicios" },
    ],
  },
  {
    label: "Cursos",
    href: "#contacto",
    children: [
      { label: "Curso de wrap", href: "#contacto" },
      { label: "Curso de PPF", href: "#contacto" },
      { label: "Curso de detallado", href: "#contacto" },
      { label: "Curso de pintura de calipers", href: "#contacto" },
    ],
  },
  {
    label: "Nosotros",
    href: "#proceso",
    children: [
      { label: "Proceso", href: "#proceso" },
      { label: "Equipo", href: "#equipo" },
      { label: "Preguntas frecuentes", href: "#faq" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Servicios",
    items: [
      { label: "Wrap completo", href: "#servicios" },
      { label: "Protección PPF", href: "#servicios" },
      { label: "Detallado", href: "#servicios" },
      { label: "Accesorios", href: "#servicios" },
    ],
  },
  {
    title: "Estudio",
    items: [
      { label: "Proyectos", href: "#proyectos" },
      { label: "Proceso", href: "#proceso" },
      { label: "Equipo", href: "#equipo" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Términos y condiciones", href: "/terminos" },
      { label: "Aviso de privacidad", href: "/privacidad" },
      { label: "Garantía", href: "/garantia" },
    ],
  },
];

/* --- Proceso -------------------------------------------------------------- */

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Diagnóstico",
    description:
      "Revisamos el estado de la pintura, medimos espesor de capa y detectamos zonas que necesitan corrección antes de instalar.",
  },
  {
    step: 2,
    title: "Propuesta",
    description:
      "Te enviamos render, material sugerido, tiempo de taller y precio cerrado. Sin sorpresas a mitad del trabajo.",
  },
  {
    step: 3,
    title: "Preparación",
    description:
      "Lavado técnico, descontaminación y desmontaje de piezas. El 70% del resultado se define en esta etapa.",
  },
  {
    step: 4,
    title: "Instalación",
    description:
      "Aplicación en cabina con control de temperatura y polvo, a cargo de un instalador certificado.",
  },
  {
    step: 5,
    title: "Entrega",
    description:
      "Inspección con luz de detalle, guía de cuidados por escrito y garantía activada.",
  },
];

/* --- Equipo --------------------------------------------------------------- */

/**
 * Placeholders anónimos a propósito.
 *
 * Al personalizar: usa fotos de las personas que realmente trabajan en el
 * negocio del cliente, con su permiso. Nunca reutilices retratos de otro
 * taller — son personas reales identificables.
 */
export const team: TeamMember[] = [
  { name: "Nombre Apellido", role: "Director de taller", image: "/placeholder/team-01.svg", experience: 12 },
  { name: "Nombre Apellido", role: "Instalador certificado PPF", image: "/placeholder/team-02.svg", experience: 8 },
  { name: "Nombre Apellido", role: "Especialista en wrap", image: "/placeholder/team-03.svg", experience: 6 },
  { name: "Nombre Apellido", role: "Detailer senior", image: "/placeholder/team-04.svg", experience: 9 },
  { name: "Nombre Apellido", role: "Corrección de pintura", image: "/placeholder/team-05.svg", experience: 5 },
  { name: "Nombre Apellido", role: "Atención a clientes", image: "/placeholder/team-06.svg", experience: 4 },
];

/* --- Cifras --------------------------------------------------------------- */

export const stats: Stat[] = [
  { value: 1200, suffix: "+", label: "Vehículos intervenidos" },
  { value: 12, suffix: " años", label: "De experiencia" },
  { value: 98, suffix: "%", label: "Clientes que recomiendan" },
  { value: 5, suffix: " años", label: "De garantía en PPF" },
];

/* --- FAQ ------------------------------------------------------------------ */

export const faqs: FaqItem[] = [
  {
    question: "¿El wrap daña la pintura original?",
    answer:
      "No. Instalado y retirado correctamente sobre pintura de fábrica en buen estado, el vinil la protege de rayos UV y micro rayones. El riesgo aparece en pintura de repinte mal curada, y eso lo detectamos en el diagnóstico.",
  },
  {
    question: "¿Cuánto dura la película de PPF?",
    answer:
      "Entre 5 y 10 años según el material y el cuidado. Las películas autorreparables recuperan micro rayones con el calor del sol o agua caliente.",
  },
  {
    question: "¿Cuánto tiempo se queda mi auto en el taller?",
    answer:
      "Un wrap parcial sale el mismo día. Un wrap completo toma de 4 a 6 días y un PPF de carrocería completa entre 5 y 7. Te confirmamos la fecha de entrega antes de empezar.",
  },
  {
    question: "¿Puedo lavar el auto normalmente?",
    answer:
      "Sí, después de 7 días de curado. Recomendamos lavado a mano con shampoo de pH neutro y evitar hidrolavadora a corta distancia sobre los bordes.",
  },
  {
    question: "¿Manejan garantía?",
    answer:
      "Sí. El material trae garantía de fábrica contra decoloración y desprendimiento, y la mano de obra la respaldamos nosotros. Te entregamos la póliza por escrito.",
  },
];
