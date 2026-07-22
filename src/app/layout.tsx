import type { Metadata, Viewport } from "next";
import { Azeret_Mono, Bebas_Neue, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ParticlesBackground } from "@/components/layout/ParticlesBackground";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { RevealNoScriptFallback } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { buildLocalBusinessSchema, buildMetadata } from "@/lib/seo";
import "./globals.css";

/**
 * Fuentes del sitio original, ahora autoalojadas por next/font: se eliminan
 * las peticiones a fonts.googleapis.com y el salto de texto al cargar.
 */
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const azeret = Azeret_Mono({
  subsets: ["latin"],
  variable: "--font-azeret",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: "#161616",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-MX"
      className={`${manrope.variable} ${azeret.variable} ${bebas.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href={siteConfig.brand.favicon} type="image/svg+xml" />
        {/* Datos estructurados de negocio local para resultados enriquecidos */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildLocalBusinessSchema()),
          }}
        />
        <RevealNoScriptFallback />
      </head>

      <body className="min-h-dvh">
        {/* Salto de navegación para usuarios de teclado y lector de pantalla */}
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100
                     focus:rounded-[var(--radius-control)] focus:bg-accent focus:px-5 focus:py-3
                     focus:font-sans focus:text-sm focus:font-extrabold focus:text-surface"
        >
          Saltar al contenido
        </a>

        <ParticlesBackground />
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
