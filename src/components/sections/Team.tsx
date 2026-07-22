import Image from "next/image";
import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team } from "@/content/site-content";

/**
 * Equipo. Porta la sección `.seller` del original.
 *
 * Nota para quien personalice: estas fotos son de personas reales e
 * identificables. Usa únicamente retratos del personal del cliente y con su
 * autorización — nunca los de otro taller.
 */
export function Team() {
  return (
    <Section id="equipo" raised>
      <Container width="wide">
        <SectionHeading
          title="Conoce al equipo"
          description="Instaladores certificados con años de taller encima. La misma persona que te cotiza es la que revisa la entrega."
        />

        <Carousel label="Integrantes del equipo" itemClassName="w-[220px] sm:w-[240px]">
          {team.map((member, i) => (
            <figure key={`${member.name}-${i}`} className="group text-center">
              <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-surface">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="240px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {member.experience && (
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-surface/90 px-3 py-1.5 font-mono text-[10px] font-bold text-accent backdrop-blur-sm">
                    {member.experience} años
                  </span>
                )}
              </div>

              <figcaption className="mt-4">
                <p className="font-sans text-sm font-extrabold text-ink">{member.name}</p>
                <p className="mt-1 font-mono text-[11px] leading-snug text-ink-muted">
                  {member.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </Carousel>
      </Container>
    </Section>
  );
}
