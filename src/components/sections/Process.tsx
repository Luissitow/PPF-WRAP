import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/content/site-content";

/**
 * Proceso paso a paso. Porta la sección `.create-sell` del original,
 * reemplazando su copy de marketplace NFT por el flujo real del taller.
 */
export function Process() {
  return (
    <Section id="proceso">
      <Container width="site">
        <SectionHeading
          title="Del diagnóstico a la entrega"
          description="Un proceso fijo, sin improvisar. Sabes qué pasa con tu auto en cada etapa y cuándo lo recibes de vuelta."
          align="center"
        />

        <ol className="relative grid gap-8 md:grid-cols-3 lg:grid-cols-5">
          {/* Línea que conecta los pasos en escritorio */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-hairline to-transparent lg:block"
          />

          {processSteps.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.1} as="li" className="relative">
              <div className="flex size-14 items-center justify-center rounded-full border border-hairline bg-surface font-sans text-lg font-extrabold text-accent">
                {String(step.step).padStart(2, "0")}
              </div>

              <h3 className="mt-5 font-sans text-base font-extrabold text-ink">
                {step.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
