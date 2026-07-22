"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Anima la entrada de un elemento al hacerse visible.
 *
 * Sustituye a WOW.js + animate.css del sitio original con IntersectionObserver
 * nativo: mismo efecto, sin jQuery ni las dos librerías (~90 KB menos).
 *
 * El estado vive en un atributo del DOM y no en useState a propósito. Con
 * decenas de elementos animándose durante el scroll, un re-render de React por
 * cada uno es trabajo desperdiciado: la transición la resuelve CSS sola.
 * Los estilos están en globals.css bajo `[data-reveal]`.
 *
 * Respeta `prefers-reduced-motion` y trae respaldo en <noscript>, así que el
 * contenido nunca queda invisible si el JavaScript falla.
 */

interface RevealProps {
  as?: ElementType;
  children: ReactNode;
  /** Retraso en segundos, para escalonar elementos de una lista. */
  delay?: number;
  className?: string;
}

export function Reveal({ as: Tag = "div", children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reveal = () => {
      node.dataset.revealed = "true";
    };

    // Sin animación si el sistema lo pide o si el navegador no trae el observer.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect(); // Una sola vez: no re-anima al volver a scrollear.
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

/**
 * Respaldo sin JavaScript. Se monta una vez en el layout raíz.
 */
export function RevealNoScriptFallback() {
  return (
    <noscript>
      <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
    </noscript>
  );
}
