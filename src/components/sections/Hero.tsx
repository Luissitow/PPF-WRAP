import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { quoteLink, siteConfig } from "@/config/site";
import { HeroCarousel } from "./HeroCarousel";

/**
 * Hero.
 *
 * Porta `.flat-pages-title` del original: contenido centrado con el título en
 * Bebas Neue muy espaciado, subtítulo, dos botones y el carrusel 3D debajo.
 *
 * Medidas del CSS original:
 *   h1  72px / letter-spacing 23px / uppercase   (768px: 55px / 9px)
 *   p   14px / Azeret Mono / rgba(255,255,255,.53) / max-width 634px
 *   btn 50px de alto / 190px de ancho
 */
export function Hero() {
  return (
    // El padding superior libra el header fijo (112px sin scroll).
    <section className="relative overflow-hidden pt-[140px] pb-14 md:pt-[180px] md:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 size-[680px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/6 blur-[130px]"
      />

      <Container width="xwide">
        <div className="text-center">
          <Reveal>
            <h1
              className="font-display uppercase text-ink
                         text-[clamp(2.6rem,8vw,4.5rem)]
                         tracking-[0.28em] sm:tracking-[0.4em] md:tracking-[0.62em]
                         leading-[1.08]
                         [text-indent:0.28em] sm:[text-indent:0.4em] md:[text-indent:0.62em]"
            >
              {siteConfig.displayName.replace(/\n/g, " ")}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-7 max-w-[634px] font-mono text-sm leading-[22px] text-white/53">
              {siteConfig.description}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={quoteLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[50px] w-[190px] items-center justify-center gap-2 rounded-[var(--radius-control)] bg-accent font-sans text-sm font-extrabold text-surface transition-colors duration-300 hover:bg-accent-hover"
              >
                Cotiza Ahora
                <ArrowUpRight className="size-4" strokeWidth={2.5} />
              </a>

              {/* Contorno para diferenciarlo del CTA sólido cuando ambos
                  comparten color de acento. */}
              <a
                href="#proyectos"
                className="flex h-[50px] w-[190px] items-center justify-center gap-2 rounded-[var(--radius-control)] border border-white/25 bg-transparent font-sans text-sm font-extrabold text-ink transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-surface"
              >
                Ver Proyectos
                <ArrowUpRight className="size-4" strokeWidth={2.5} />
              </a>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* El carrusel sale del contenedor a propósito: se asoma por los lados. */}
      <HeroCarousel />
    </section>
  );
}
