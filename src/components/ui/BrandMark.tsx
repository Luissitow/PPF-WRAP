import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Isotipo de la marca.
 *
 * Usa <img> y no next/image a propósito: el logo es un SVG, y next/image no
 * optimiza SVG — lo sirve tal cual, sin `srcset`, y además descarta los hints
 * de prioridad, lo que provoca el aviso de LCP en consola. Con <img> podemos
 * marcar `fetchPriority="high"` en el header y `lazy` en los avatares.
 *
 * Si algún cliente entrega el logo en PNG o JPG, cámbialo por next/image.
 */
export function BrandMark({
  className,
  size = 80,
  /** Marca alto y prioridad de carga: sólo para el logo del header. */
  priority = false,
  /** Vacío cuando el logo es decorativo y ya hay texto que lo acompaña. */
  alt = siteConfig.name,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
  alt?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG: ver nota arriba
    <img
      src={siteConfig.brand.logoMark}
      alt={alt}
      width={size}
      height={size}
      decoding="async"
      {...(priority
        ? { fetchPriority: "high" as const, loading: "eager" as const }
        : { loading: "lazy" as const })}
      className={cn("select-none", className)}
    />
  );
}
