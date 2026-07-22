import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/content/projects";

/**
 * Portafolio en mosaico. Los dos primeros ocupan doble ancho para romper
 * la monotonía de la rejilla.
 */
export function Projects() {
  return (
    <Section id="proyectos" raised>
      <Container width="wide">
        <SectionHeading
          title="Proyectos"
          link={{ label: "Ver todo el portafolio", href: "#contacto" }}
          description="Una muestra del trabajo que sale del taller. Cada proyecto incluye diagnóstico, instalación y entrega documentada."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={(i % 3) * 0.08}
              className={i < 2 ? "lg:col-span-1 sm:col-span-2 lg:row-span-1" : undefined}
            >
              <ProjectCard project={project} priority={i < 3} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
