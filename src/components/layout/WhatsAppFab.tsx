"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { quoteLink } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Botón flotante de WhatsApp. Aparece al pasar el hero para no competir con
 * el llamado a la acción principal.
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={quoteLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cotizar por WhatsApp"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full",
        "bg-[#25D366] text-white shadow-lg shadow-black/40",
        "transition-all duration-400 hover:scale-110 hover:shadow-xl",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
