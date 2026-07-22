import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Contenedor centrado. Porta `.themesflat-container` y sus variantes de ancho
 * (w1490, w1230, w920, w730) del CSS original.
 */

type Width = "site" | "wide" | "xwide" | "narrow" | "prose";

const widths: Record<Width, string> = {
  prose: "max-w-[var(--container-prose)]", // 760px
  narrow: "max-w-[var(--container-narrow)]", // 950px
  site: "max-w-[var(--container-site)]", // 1140px
  wide: "max-w-[var(--container-wide)]", // 1260px
  xwide: "max-w-[var(--container-xwide)]", // 1520px
};

interface ContainerProps {
  as?: ElementType;
  width?: Width;
  className?: string;
  children: ReactNode;
}

export function Container({
  as: Tag = "div",
  width = "site",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag className={cn("relative mx-auto w-full px-4 sm:px-6", widths[width], className)}>
      {children}
    </Tag>
  );
}
