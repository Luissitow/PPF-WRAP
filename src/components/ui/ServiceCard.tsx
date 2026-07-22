import Image from "next/image";
import { BrandMark } from "@/components/ui/BrandMark";
import { quoteLink } from "@/config/site";
import type { Service } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Tarjeta de servicio.
 *
 * Porta `.tf-card-box.style-1` del CSS original con sus medidas exactas:
 *   fondo   #1E1E1E, radio 20px, padding 10px 10px 14px
 *   hover   translateY(-10px)
 *   media   radio 15px, botón "Cotiza" que sube de bottom 30% a 50%
 *   avatar  38px circular
 *   divisor 1px rgba(255,255,255,.1), margen 16px
 *   precio  16px peso 800
 */
export function ServiceCard({
  service,
  className,
  priority,
}: {
  service: Service;
  className?: string;
  /** Marca la imagen como prioritaria: sólo en las visibles al cargar. */
  priority?: boolean;
}) {
  const href = quoteLink(service.name);

  return (
    <article
      className={cn(
        "group rounded-[20px] bg-[#1E1E1E] p-2.5 pb-3.5",
        "transition-transform duration-200 ease-out hover:-translate-y-2.5",
        className,
      )}
    >
      {/* Media */}
      <div className="relative mb-3 overflow-hidden rounded-[15px]">
        <div className="relative aspect-square">
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 280px"
            priority={priority}
            className="object-cover"
          />
        </div>

        {/* Botón que emerge en hover — en táctil se muestra siempre */}
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 transition-all duration-200 ease-out",
            "bottom-4 opacity-100",
            "md:bottom-[30%] md:opacity-0",
            "md:group-hover:bottom-1/2 md:group-hover:opacity-100",
          )}
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Cotizar ${service.name} por WhatsApp`}
            className={cn(
              "flex h-11 items-center justify-center whitespace-nowrap rounded-[var(--radius-control)] px-6",
              "bg-accent-muted font-sans text-sm font-extrabold text-surface",
              "transition-colors duration-300 hover:bg-accent",
            )}
          >
            Cotiza
          </a>
        </div>
      </div>

      {/* Nombre */}
      <h3 className="mb-2.5 px-0.5 font-sans text-lg font-extrabold leading-[25px] text-ink">
        {service.name}
      </h3>

      {/* Autor: marca + descripción */}
      <div className="flex items-center px-0.5">
        <div className="mr-2.5 size-[38px] shrink-0 overflow-hidden rounded-full bg-surface">
          {/* Decorativo: el nombre del servicio ya va a la derecha. */}
          <BrandMark alt="" size={38} className="size-full object-contain" />
        </div>

        <div className="min-w-0">
          <span className="block font-mono text-xs leading-[19px] text-white/30">
            {service.name}
          </span>
          <p className="font-mono text-xs leading-[19px] text-ink">{service.summary}</p>
        </div>
      </div>

      {/* Divisor */}
      <div className="my-4 h-px w-full bg-white/10" />

      {/* Precio */}
      <div className="flex items-center justify-between gap-2 px-0.5">
        <span className="font-mono text-xs leading-[19px] text-white/30">Desde</span>
        <p className="font-sans text-base font-extrabold leading-[22px] text-ink">
          {service.price ?? "Cotización"}
        </p>
      </div>
    </article>
  );
}
