import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { formattedAddress, quoteLink, siteConfig } from "@/config/site";

/**
 * Cierre con llamado a la acción. Porta la sección `.action` del original:
 * bloque de acento a ancho completo sobre la retícula de fondo.
 */
export function Contact() {
  return (
    <Section id="contacto" spacing="loose">
      <Container width="wide">
        <Reveal>
          <div className="relative overflow-hidden rounded-[24px] border border-hairline bg-surface-raised p-8 md:p-14">
            {/* Resplandor de acento */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-accent/10 blur-[100px]"
            />

            <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-accent">
                  Siguiente paso
                </p>

                <h2 className="mt-4 font-sans text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
                  Cuéntanos qué traes
                  <br />
                  <span className="text-accent">y te cotizamos hoy</span>
                </h2>

                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-muted">
                  Mándanos fotos de tu auto por WhatsApp y te respondemos con propuesta,
                  material sugerido, tiempo de taller y precio cerrado.
                </p>

                <div className="mt-9 flex flex-wrap gap-4">
                  <ButtonLink href={quoteLink()} external size="lg">
                    Escribir por WhatsApp
                    <MessageCircle className="size-4" strokeWidth={2.5} />
                  </ButtonLink>
                  <ButtonLink
                    href={`tel:${siteConfig.contact.phone}`}
                    variant="outline"
                    size="lg"
                  >
                    <Phone className="size-4" strokeWidth={2.5} />
                    Llamar
                  </ButtonLink>
                </div>
              </div>

              {/* Datos del taller */}
              <ul className="flex flex-col gap-5 lg:border-l lg:border-hairline lg:pl-12">
                <ContactRow icon={MapPin} title="Dirección">
                  <a
                    href={siteConfig.location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    {formattedAddress()}
                  </a>
                </ContactRow>

                <ContactRow icon={Phone} title="Teléfono">
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="font-mono transition-colors hover:text-accent"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </ContactRow>

                <ContactRow icon={Clock} title="Horario">
                  <span className="flex flex-col gap-1">
                    {siteConfig.hours.map((slot) => (
                      <span key={slot.days}>
                        {slot.days}: {slot.time}
                      </span>
                    ))}
                  </span>
                </ContactRow>
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function ContactRow({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-hairline text-accent">
        <Icon className="size-4" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          {title}
        </p>
        <div className="mt-1.5 text-sm leading-relaxed text-ink-soft">{children}</div>
      </div>
    </li>
  );
}
