"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Carrusel con scroll-snap nativo.
 *
 * Sustituye a Swiper del sitio original. El desplazamiento lo hace el
 * navegador, así que arrastrar con el dedo, la rueda del mouse y la
 * navegación por teclado funcionan sin JavaScript: sólo las flechas y el
 * estado de "hay más contenido" necesitan React.
 *
 * Ventaja frente a Swiper: ~140 KB menos de bundle y cero dependencias.
 */

interface CarouselProps {
  children: React.ReactNode;
  /** Ancho de cada tarjeta por breakpoint. */
  itemClassName?: string;
  className?: string;
  label: string;
}

export function Carousel({ children, itemClassName, className, label }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // 2px de tolerancia: el scroll fraccionario nunca llega al valor exacto.
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    syncArrows();
    el.addEventListener("scroll", syncArrows, { passive: true });

    // Si cambia el tamaño del contenedor, cambia si hay o no overflow.
    const observer = new ResizeObserver(syncArrows);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", syncArrows);
      observer.disconnect();
    };
  }, [syncArrows]);

  const scrollBy = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // Avanza ~una tarjeta y media para que siempre quede una a la vista.
    el.scrollBy({ left: direction * el.clientWidth * 0.75, behavior: "smooth" });
  };

  const hasOverflow = !(atStart && atEnd);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={trackRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        className={cn(
          "flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          // Sangría lateral para que las tarjetas no se corten en el borde
          "-mx-4 scroll-px-4 px-4 sm:-mx-6 sm:scroll-px-6 sm:px-6",
        )}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <div key={i} className={cn("shrink-0 snap-start", itemClassName)}>
                {child}
              </div>
            ))
          : children}
      </div>

      {hasOverflow && (
        <div className="mt-6 flex items-center justify-end gap-3">
          <CarouselButton
            direction="prev"
            onClick={() => scrollBy(-1)}
            disabled={atStart}
          />
          <CarouselButton direction="next" onClick={() => scrollBy(1)} disabled={atEnd} />
        </div>
      )}
    </div>
  );
}

function CarouselButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Anterior" : "Siguiente"}
      className={cn(
        "flex size-11 items-center justify-center rounded-full border transition-all duration-300",
        disabled
          ? "cursor-not-allowed border-hairline/50 text-ink-muted/40"
          : "border-hairline text-ink hover:border-accent hover:bg-accent hover:text-surface",
      )}
    >
      <Icon className="size-5" strokeWidth={2.5} />
    </button>
  );
}
