import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/**
 * Encabezado de sección.
 *
 * Porta `.heading-section` del original: título a la izquierda y enlace a la
 * derecha en la misma línea, con la flecha dentro de un círculo.
 *   .tf-title  32px / peso 800 / line-height 44px / capitalize
 *   a          14px / peso 800 / capitalize
 */

interface SectionHeadingProps {
  title: ReactNode;
  /** Enlace de la derecha, al estilo "Descubre todo lo que podemos hacer…". */
  link?: { label: string; href: string; external?: boolean };
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Nivel semántico. La home usa h2. */
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  title,
  link,
  description,
  align = "left",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-6 gap-y-4 pb-5",
        centered && "flex-col justify-center text-center",
        className,
      )}
    >
      <Tag className="font-sans text-[28px] font-extrabold capitalize leading-tight text-ink sm:text-[32px] sm:leading-[44px]">
        {title}
      </Tag>

      {link && (
        <a
          href={link.href}
          {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
          className="group inline-flex items-center gap-1.5 font-sans text-sm font-extrabold capitalize text-ink transition-colors hover:text-accent"
        >
          {link.label}
          <span className="flex size-5 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-surface">
            <ArrowRight className="size-2.5" strokeWidth={3} />
          </span>
        </a>
      )}

      {description && (
        <p
          className={cn(
            "w-full text-sm leading-relaxed text-ink-muted",
            centered ? "mx-auto max-w-2xl" : "max-w-2xl",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
