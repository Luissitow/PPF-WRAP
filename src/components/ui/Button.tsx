import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Botón del sistema de diseño.
 *
 * Porta `.tf-button` del CSS original: radio 12px, peso 800, 14px, y el
 * intercambio de color en hover entre el acento y el gris claro.
 */

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base = cn(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap",
  "rounded-[var(--radius-control)] font-sans font-extrabold",
  "transition-all duration-300 ease-out",
  "disabled:pointer-events-none disabled:opacity-50",
  "active:scale-[0.98]",
);

const variants: Record<Variant, string> = {
  // legacy: .tf-button.style-1 — acento, pasa a blanco en hover
  primary: "bg-accent text-surface hover:bg-accent-hover",
  // legacy: .tf-button — gris claro, pasa a acento en hover
  secondary: "bg-accent-muted text-surface hover:bg-accent",
  outline:
    "border border-hairline text-ink hover:border-accent hover:text-accent bg-transparent",
  ghost: "text-ink-soft hover:text-accent bg-transparent",
};

const sizes: Record<Size, string> = {
  sm: "h-[38px] px-4 text-[13px]",
  md: "h-[44px] px-6 text-sm",
  lg: "h-[50px] px-8 text-sm",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Ocupa todo el ancho disponible. */
  block?: boolean;
}

type ButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

type AnchorProps = CommonProps & {
  href: string;
  /** Abre en pestaña nueva y añade rel de seguridad. */
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "className" | "children" | "href">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  block,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], block && "w-full", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  block,
  children,
  href,
  external,
  ...props
}: AnchorProps) {
  const classes = cn(base, variants[variant], sizes[size], block && "w-full", className);

  // Los links externos y de anclaje no pasan por el router de Next.
  if (external || href.startsWith("http") || href.startsWith("#") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
