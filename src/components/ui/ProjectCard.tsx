import Image from "next/image";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Tarjeta de proyecto: imagen a sangre con la información sobre un degradado
 * que aparece en hover. En táctil el degradado se muestra siempre, porque
 * ahí no existe el estado hover.
 */
export function ProjectCard({
  project,
  className,
  priority,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-surface-raised",
        className,
      )}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.vehicle}`}
          fill
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 45vw, 32vw"
          priority={priority}
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-108"
        />

        {/* Velo: siempre visible en táctil, se intensifica en hover con mouse */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-surface via-surface/45 to-transparent",
            "opacity-90 transition-opacity duration-500",
            "md:opacity-70 md:group-hover:opacity-95",
          )}
        />

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            <span>{project.vehicle}</span>
            <span className="text-ink-muted">·</span>
            <span className="text-ink-muted">{project.year}</span>
          </div>

          <h3 className="mt-2 font-sans text-xl font-extrabold text-ink">
            {project.title}
          </h3>

          {/* Los servicios se despliegan al pasar el cursor en pantallas grandes */}
          <ul
            className={cn(
              "flex flex-wrap gap-2 overflow-hidden",
              "mt-3 max-h-24 opacity-100",
              "md:mt-0 md:max-h-0 md:opacity-0",
              "md:transition-all md:duration-500 md:ease-out",
              "md:group-hover:mt-3 md:group-hover:max-h-24 md:group-hover:opacity-100",
            )}
          >
            {project.work.map((item) => (
              <li
                key={item}
                className="rounded-full border border-hairline bg-surface/70 px-2.5 py-1 font-mono text-[10px] text-ink-soft backdrop-blur-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
