import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { quoteLink } from "@/config/site";
import { featuredServices, services } from "@/content/services";

/**
 * Servicios destacados en carrusel + el resto en rejilla.
 * Porta la sección `.featured-item` del original.
 */
export function Services() {
  const rest = services.filter((s) => !s.featured);

  return (
    <Section id="servicios" spacing="tight">
      <Container width="wide">
        <SectionHeading
          title="Servicios"
          link={{
            label: "Descubre todo lo que podemos hacer por tu auto",
            href: quoteLink(),
            external: true,
          }}
        />

        <Carousel
          label="Servicios destacados"
          itemClassName="w-[260px] sm:w-[280px]"
          className="pt-2.5"
        >
          {featuredServices.map((service, i) => (
            <ServiceCard key={service.slug} service={service} priority={i < 4} />
          ))}
        </Carousel>

        {rest.length > 0 && (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.06}>
                <ServiceCard service={service} className="h-full" />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
