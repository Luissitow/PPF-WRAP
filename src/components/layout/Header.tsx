"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/ui/BrandMark";
import { Container } from "@/components/ui/Container";
import { quoteLink, siteConfig } from "@/config/site";
import { mainNav } from "@/content/site-content";
import type { NavItem } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Header fijo.
 *
 * Porta la estructura del original: logo circular de 80px a la izquierda,
 * menú centrado con caret en los ítems que tienen submenú, y el botón de
 * contacto en acento a la derecha.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled
            ? "border-b border-white/8 bg-surface/90 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <Container width="xwide">
          <div
            className={cn(
              "flex items-center justify-between gap-6 transition-all duration-300",
              scrolled ? "h-[88px]" : "h-[112px]",
            )}
          >
            {/* Logo circular */}
            <Link href="/" aria-label={`${siteConfig.name} — inicio`} className="shrink-0">
              <BrandMark
                priority
                className={cn(
                  "w-auto transition-all duration-300",
                  scrolled ? "h-14" : "h-[70px]",
                )}
              />
            </Link>

            {/* Navegación centrada */}
            <nav aria-label="Principal" className="hidden lg:block">
              <ul className="flex items-center">
                {mainNav.map((item) => (
                  <DesktopNavItem key={item.label} item={item} />
                ))}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-3">
              <a
                href={quoteLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "hidden h-[52px] items-center justify-center rounded-[10px] px-9 sm:inline-flex",
                  "bg-accent font-sans text-[15px] font-extrabold text-surface",
                  "transition-colors duration-300 hover:bg-accent-hover",
                )}
              >
                Contacto
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Abrir menú"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="flex size-11 items-center justify-center rounded-[10px] border border-white/15 text-ink transition-colors hover:border-accent hover:text-accent lg:hidden"
              >
                <Menu className="size-5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Menú móvil */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={cn(
          "fixed inset-0 z-60 lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          className={cn(
            "absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-white/10 bg-surface",
            "transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex h-[100px] shrink-0 items-center justify-between border-b border-white/10 px-6">
            <BrandMark className="h-14 w-auto" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
              className="flex size-11 items-center justify-center rounded-[10px] border border-white/15 text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <X className="size-5" strokeWidth={2.5} />
            </button>
          </div>

          <nav aria-label="Móvil" className="scrollbar-slim flex-1 overflow-y-auto px-5 py-6">
            <ul className="flex flex-col gap-0.5">
              {mainNav.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenSub(openSub === item.label ? null : item.label)
                        }
                        aria-expanded={openSub === item.label}
                        className="flex w-full items-center justify-between rounded-[10px] px-4 py-3 text-left font-sans text-base font-bold text-ink transition-colors hover:bg-white/5 hover:text-accent"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform duration-300",
                            openSub === item.label && "rotate-180",
                          )}
                          strokeWidth={2.5}
                        />
                      </button>

                      <ul
                        className={cn(
                          "grid overflow-hidden transition-all duration-300",
                          openSub === item.label
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <li className="min-h-0">
                          <ul className="ml-4 flex flex-col gap-0.5 border-l border-white/10 py-1 pl-3">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <a
                                  href={child.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="block rounded-lg px-3 py-2 font-mono text-[13px] text-ink-muted transition-colors hover:text-accent"
                                >
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-[10px] px-4 py-3 font-sans text-base font-bold text-ink transition-colors hover:bg-white/5 hover:text-accent"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="shrink-0 border-t border-white/10 p-5">
            <a
              href={quoteLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[52px] w-full items-center justify-center rounded-[10px] bg-accent font-sans text-[15px] font-extrabold text-surface transition-colors hover:bg-accent-hover"
            >
              Contacto
            </a>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="mt-4 block text-center font-mono text-sm text-ink-muted transition-colors hover:text-accent"
            >
              {siteConfig.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Ítem de escritorio. El submenú se abre en hover y también con foco de
 * teclado, para que sea alcanzable sin mouse.
 */
function DesktopNavItem({ item }: { item: NavItem }) {
  if (!item.children) {
    return (
      <li className="px-4 py-4">
        <a
          href={item.href}
          className="font-sans text-base font-medium text-ink transition-colors hover:text-accent"
        >
          {item.label}
        </a>
      </li>
    );
  }

  return (
    <li className="group relative px-4 py-4">
      <a
        href={item.href}
        className="flex items-center gap-1.5 font-sans text-base font-medium text-ink transition-colors group-hover:text-accent group-focus-within:text-accent"
      >
        {item.label}
        <ChevronDown className="size-3.5 text-white/30 transition-transform duration-300 group-hover:rotate-180" strokeWidth={2.5} />
      </a>

      <ul
        className={cn(
          "absolute left-0 top-full min-w-[230px] rounded-2xl border border-white/10 bg-[#1E1E1E] p-2 shadow-2xl shadow-black/50",
          "scrollbar-slim max-h-[70vh] overflow-y-auto",
          "invisible translate-y-2 opacity-0 transition-all duration-200",
          "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
          "group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
        )}
      >
        {item.children.map((child) => (
          <li key={child.label}>
            <a
              href={child.href}
              className="block rounded-lg px-4 py-2.5 font-mono text-[13px] text-ink-muted transition-colors hover:bg-white/5 hover:text-accent"
            >
              {child.label}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}
