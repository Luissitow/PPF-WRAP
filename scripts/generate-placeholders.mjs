/**
 * Genera los SVG de marcador de posición usados por la plantilla en demo.
 *
 *   node scripts/generate-placeholders.mjs
 *
 * Son livianos (~1 KB), se ven bien en el tema oscuro y dejan claro que hay
 * que reemplazarlos. Cuando el cliente entregue sus fotos, sustituye los
 * archivos en /public/placeholder y actualiza las rutas en src/content/*.ts.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "placeholder");
const BRAND = join(ROOT, "public", "brand");

const SURFACE = "#232323";
const SURFACE_DEEP = "#1a1a1a";
// Debe coincidir con --color-accent de globals.css.
const ACCENT = "#FFFFFF";
const HAIRLINE = "#343444";
const MUTED = "#8a8aa0";

/**
 * Silueta lateral de auto genérica, sin marca identificable.
 *
 * El dibujo vive en un espacio local de 670x300 y se coloca con un transform,
 * así el mismo trazo sirve para el formato cuadrado de las tarjetas de
 * servicio (1:1) y el apaisado del portafolio (4:3).
 */
function carSilhouette(id, hue, w = 800, h = 600) {
  // Escala y centra el auto dentro del lienzo pedido.
  const scale = Math.min((w * 0.86) / 670, (h * 0.62) / 300);
  const tx = (w - 670 * scale) / 2;
  const ty = (h - 300 * scale) / 2 - h * 0.04;

  const cols = Math.ceil(w / 100) + 1;
  const rows = Math.ceil(h / 100) + 1;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Imagen de ejemplo">
  <defs>
    <linearGradient id="bg${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${SURFACE}"/>
      <stop offset="100%" stop-color="${SURFACE_DEEP}"/>
    </linearGradient>
    <linearGradient id="body${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="hsl(${hue} 45% 32%)"/>
      <stop offset="100%" stop-color="hsl(${hue} 50% 16%)"/>
    </linearGradient>
    <radialGradient id="glow${id}" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.13"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#bg${id})"/>
  <rect width="${w}" height="${h}" fill="url(#glow${id})"/>

  <g stroke="${HAIRLINE}" stroke-width="1" opacity="0.35">
    ${Array.from({ length: cols }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="${h}"/>`).join("\n    ")}
    ${Array.from({ length: rows }, (_, i) => `<line x1="0" y1="${i * 100}" x2="${w}" y2="${i * 100}"/>`).join("\n    ")}
  </g>

  <!-- Carrocería -->
  <g transform="translate(${tx.toFixed(1)},${ty.toFixed(1)}) scale(${scale.toFixed(4)})">
    <path d="M18 210 C10 150 60 138 108 130 L188 62 C206 46 234 38 268 38 L400 38
             C440 38 470 48 492 68 L556 128 C606 136 646 152 650 208
             C652 238 640 250 612 250 L56 250 C26 250 20 236 18 210 Z"
          fill="url(#body${id})" stroke="${ACCENT}" stroke-opacity="0.5" stroke-width="2"/>
    <!-- Cristales -->
    <path d="M206 72 C222 58 244 54 268 54 L330 54 L330 126 L160 126 Z" fill="${SURFACE_DEEP}" opacity="0.85"/>
    <path d="M356 54 L398 54 C430 54 456 62 474 78 L520 126 L356 126 Z" fill="${SURFACE_DEEP}" opacity="0.85"/>
    <!-- Reflejo de carrocería -->
    <path d="M30 186 L636 186" stroke="${ACCENT}" stroke-opacity="0.35" stroke-width="2"/>
    <!-- Ruedas -->
    <g fill="${SURFACE_DEEP}" stroke="${ACCENT}" stroke-opacity="0.65" stroke-width="3">
      <circle cx="164" cy="250" r="52"/>
      <circle cx="510" cy="250" r="52"/>
    </g>
    <g fill="none" stroke="${MUTED}" stroke-opacity="0.55" stroke-width="2">
      <circle cx="164" cy="250" r="24"/>
      <circle cx="510" cy="250" r="24"/>
    </g>
  </g>

  <text x="${w / 2}" y="${h - 84}" text-anchor="middle" fill="${MUTED}" font-family="ui-monospace, monospace"
        font-size="19" letter-spacing="3">IMAGEN DE EJEMPLO</text>
  <text x="${w / 2}" y="${h - 54}" text-anchor="middle" fill="${MUTED}" font-family="ui-monospace, monospace"
        font-size="13" opacity="0.6" letter-spacing="1">Reemplazar por foto del cliente</text>
</svg>`;
}

/** Retrato anónimo: silueta, sin rostro. */
function portrait(id, hue) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" role="img" aria-label="Retrato de ejemplo">
  <defs>
    <linearGradient id="pb${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${hue} 22% 24%)"/>
      <stop offset="100%" stop-color="${SURFACE_DEEP}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#pb${id})"/>
  <circle cx="200" cy="152" r="62" fill="${SURFACE_DEEP}" stroke="${ACCENT}" stroke-opacity="0.45" stroke-width="2"/>
  <path d="M78 400 C78 302 130 254 200 254 C270 254 322 302 322 400 Z"
        fill="${SURFACE_DEEP}" stroke="${ACCENT}" stroke-opacity="0.45" stroke-width="2"/>
  <text x="200" y="376" text-anchor="middle" fill="${MUTED}" font-family="ui-monospace, monospace"
        font-size="13" letter-spacing="2">EJEMPLO</text>
</svg>`;
}

/**
 * Isotipo circular con anillo de acento, como el del sitio original.
 * El escudo interior es una forma abstracta: no representa ninguna marca.
 */
const markBody = `
  <circle cx="40" cy="40" r="37" fill="#111111" stroke="${ACCENT}" stroke-width="3"/>
  <circle cx="40" cy="40" r="31" fill="none" stroke="${ACCENT}" stroke-opacity="0.25" stroke-width="1"/>
  <path d="M40 19 L57 26 L57 43 C57 52 49 58 40 62 C31 58 23 52 23 43 L23 26 Z"
        fill="none" stroke="${ACCENT}" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M32 33 L40 48 L48 33" fill="none" stroke="${ACCENT}" stroke-width="4"
        stroke-linecap="round" stroke-linejoin="round"/>`;

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80" role="img" aria-label="Isotipo">${markBody}
</svg>`;

/** Logotipo horizontal: isotipo + texto, para el footer. */
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80" width="300" height="80" role="img" aria-label="Logotipo">${markBody}
  <text x="92" y="41" fill="#ffffff" font-family="ui-sans-serif, system-ui, sans-serif"
        font-size="24" font-weight="800" letter-spacing="1.5">TU NEGOCIO</text>
  <text x="93" y="59" fill="${ACCENT}" font-family="ui-monospace, monospace"
        font-size="10.5" letter-spacing="3.2">WRAP · PPF · DETALLADO</text>
</svg>`;

const og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <radialGradient id="og" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#232323"/>
      <stop offset="100%" stop-color="#161616"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#og)"/>
  <g stroke="${HAIRLINE}" stroke-width="1" opacity="0.4">
    ${Array.from({ length: 14 }, (_, i) => `<line x1="${i * 90}" y1="0" x2="${i * 90}" y2="630"/>`).join("\n    ")}
    ${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${i * 90}" x2="1200" y2="${i * 90}"/>`).join("\n    ")}
  </g>
  <g transform="translate(80, 236) scale(1.6)">
    <circle cx="40" cy="40" r="37" fill="#111111" stroke="${ACCENT}" stroke-width="3"/>
    <path d="M40 19 L57 26 L57 43 C57 52 49 58 40 62 C31 58 23 52 23 43 L23 26 Z"
          fill="none" stroke="${ACCENT}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M32 33 L40 48 L48 33" fill="none" stroke="${ACCENT}" stroke-width="4"
          stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="240" y="296" fill="#ffffff" font-family="ui-sans-serif, system-ui, sans-serif"
        font-size="64" font-weight="800" letter-spacing="2">TU NEGOCIO</text>
  <text x="242" y="340" fill="${ACCENT}" font-family="ui-monospace, monospace"
        font-size="22" letter-spacing="6.5">WRAP · PPF · DETALLADO</text>
</svg>`;

/* -------------------------------------------------------------------------- */

await mkdir(OUT, { recursive: true });
await mkdir(BRAND, { recursive: true });

const written = [];
const pad = (n) => String(n).padStart(2, "0");

// Servicios en cuadrado (1:1, como la tarjeta) y proyectos en 4:3.
for (let i = 1; i <= 12; i++) {
  const file = join(OUT, `service-${pad(i)}.svg`);
  await writeFile(file, carSilhouette(`s${i}`, (i * 29) % 360, 600, 600));
  written.push(file);
}

for (let i = 1; i <= 8; i++) {
  const file = join(OUT, `project-${pad(i)}.svg`);
  await writeFile(file, carSilhouette(`p${i}`, (i * 43 + 200) % 360));
  written.push(file);
}

for (let i = 1; i <= 6; i++) {
  const file = join(OUT, `team-${pad(i)}.svg`);
  await writeFile(file, portrait(`t${i}`, (i * 47) % 360));
  written.push(file);
}

await writeFile(join(BRAND, "logo.svg"), logo);
await writeFile(join(BRAND, "mark.svg"), mark);
await writeFile(join(BRAND, "favicon.svg"), mark);
await writeFile(join(BRAND, "og.svg"), og);
written.push("public/brand/{logo,mark,favicon,og}.svg");

console.log(`Generados ${written.length} archivos de marcador de posición.`);
