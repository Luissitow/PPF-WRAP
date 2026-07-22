# Plantilla — Estudio de Personalización Automotriz

Sitio de una página para talleres de wrap, PPF y detallado. Construido para
reutilizarse: todo el contenido del negocio sale de archivos de configuración,
así que adaptarlo a un cliente nuevo no requiere tocar componentes.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4

---

## Arranque

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run lint     # ESLint
npm run typecheck
```

---

## Personalizar para un cliente nuevo

### 1. Datos del negocio → `src/config/site.ts`

Un solo archivo controla nombre, teléfono, WhatsApp, dirección, horario,
redes sociales y SEO. Cambia esos valores y el sitio entero se actualiza:
header, footer, botones de cotización, `schema.org` y metadatos de Open Graph.

```ts
export const siteConfig = {
  name: "NOMBRE DEL TALLER",
  contact: { whatsapp: "5215512345678", ... },
  location: { street: "...", latitude: "...", ... },
};
```

El objeto `features` al final apaga secciones completas sin borrar código:

```ts
features: { team: false, process: true, portfolio: true, ... }
```

### 2. Colores y tipografía → `src/app/globals.css`

El bloque `@theme` de arriba define el sistema completo. El color de acento
aparece en un solo lugar:

```css
--color-accent: #ddf247;   /* cámbialo y cambia todo el sitio */
```

Las fuentes se declaran en `src/app/layout.tsx` con `next/font`, que las
autoaloja: cero peticiones a Google Fonts y sin salto de texto al cargar.

### 3. Contenido → `src/content/`

| Archivo            | Qué contiene                              |
| ------------------ | ----------------------------------------- |
| `services.ts`      | Catálogo de servicios, precios, duración  |
| `projects.ts`      | Portafolio                                |
| `site-content.ts`  | Navegación, proceso, equipo, cifras, FAQ  |
| `types.ts`         | Contratos — no se edita por cliente       |

Todo está tipado: si olvidas un campo al personalizar, el error sale en
`npm run build` y no en producción.

### 4. Imágenes

Las de demo son SVG generados, en `public/placeholder/`. Para regenerarlos:

```bash
node scripts/generate-placeholders.mjs
```

Al entregar a un cliente, sustitúyelas por sus fotos (proporción 4:3 para
servicios y proyectos, 1:1 para retratos) y actualiza las rutas en
`src/content/*.ts`.

> **Sobre los derechos de las imágenes.** Usa únicamente fotos del propio
> cliente o material con licencia. Que una foto esté publicada en internet no
> la hace libre de usar. Dos casos que meten en problemas de verdad:
>
> - **Retratos del equipo.** Son personas reales identificables. Van sólo con
>   autorización, y nunca los de otro taller.
> - **Portafolio.** Mostrar trabajos ajenos como propios engaña a los clientes
>   del negocio y es lo más fácil de detectar y reclamar.
>
> Los placeholders están para que el sitio se vea completo mientras llegan las
> fotos reales, no para publicarse en producción.

### 5. Marca

Reemplaza `public/brand/logo.svg`, `mark.svg`, `favicon.svg` y `og.svg`
conservando los nombres. Si prefieres otras rutas, actualiza `brand` en
`site.config`.

---

## Arquitectura

```
src/
├── app/
│   ├── layout.tsx        # Fuentes, SEO, schema.org, header/footer
│   ├── page.tsx          # Composición de la home
│   └── globals.css       # Sistema de diseño (@theme) + estilos base
├── components/
│   ├── layout/           # Header, Footer, botón flotante
│   ├── sections/         # Una sección de la home por archivo
│   └── ui/               # Piezas reutilizables
├── config/site.ts        # ← configuración por cliente
├── content/              # ← contenido por cliente
└── lib/                  # cn(), helpers de SEO
```

**Regla de oro:** ningún componente contiene datos del negocio. Si al
personalizar necesitas editar algo dentro de `components/`, probablemente ese
dato debería vivir en `config/` o `content/`.

### Decisiones que vale la pena conocer

- **Sin librerías de carrusel.** `Carousel` usa scroll-snap nativo. Arrastrar,
  rueda del mouse y teclado funcionan sin JavaScript; sólo las flechas
  necesitan React. Ahorra ~140 KB frente a Swiper.
- **Sin librerías de animación.** `Reveal` usa `IntersectionObserver` y deja la
  transición a CSS, en vez de WOW.js + animate.css (~90 KB menos). El estado
  vive en un atributo del DOM, no en `useState`, para no re-renderizar decenas
  de componentes durante el scroll.
- **FAQ con `<details>` nativo.** Acordeón accesible por teclado que funciona
  sin JavaScript.
- **Íconos de marca inline** en `ui/SocialIcons.tsx`: `lucide-react` v1 eliminó
  todos los íconos de redes sociales.
- **Accesibilidad:** salto al contenido, foco visible, menú móvil cerrable con
  Escape, `prefers-reduced-motion` respetado en todo el sitio.

---

## El sitio anterior

La versión original en HTML estático está en [`legacy/`](legacy/), intacta y
sin usarse en el build. Sirve como referencia visual. Conserva su propio
`.git` con el historial.

**Antes de revender esta plantilla**, verifica la licencia del tema base del
sitio original (`legacy/` deriva de una plantilla de ThemeForest — las clases
`themesflat-container` y `tf-*` son su firma). Las licencias de ese mercado
suelen exigir una licencia por cada proyecto de cliente final. El código de
`src/` es nuevo y no arrastra esa dependencia, pero conviene tenerlo claro.
