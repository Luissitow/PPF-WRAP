import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Envoltura de sección con el ritmo vertical del sistema.
 * El `id` alimenta la navegación por anclas del header.
 */

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Fondo ligeramente elevado, para alternar secciones. */
  raised?: boolean;
  spacing?: "normal" | "tight" | "loose";
}

const spacings = {
  tight: "py-12 md:py-16",
  normal: "py-16 md:py-24",
  loose: "py-24 md:py-32",
};

export function Section({
  id,
  children,
  className,
  raised,
  spacing = "normal",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        spacings[spacing],
        raised && "bg-surface-raised/40",
        className,
      )}
    >
      {children}
    </section>
  );
}
