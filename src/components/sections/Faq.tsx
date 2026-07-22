import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/content/site-content";

/**
 * Preguntas frecuentes sobre <details>/<summary> nativos: acordeón accesible
 * por teclado y funcional sin JavaScript.
 */
export function Faq() {
  return (
    <Section id="faq">
      <Container width="narrow">
        <SectionHeading title="Preguntas frecuentes" align="center" />

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 0.06}>
              <details className="group rounded-[var(--radius-card)] border border-hairline bg-surface-raised transition-colors open:border-accent/50">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-sans text-[15px] font-extrabold text-ink transition-colors group-hover:text-accent">
                    {faq.question}
                  </h3>
                  <Plus
                    className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                </summary>

                <p className="border-t border-hairline px-5 py-5 text-sm leading-relaxed text-ink-muted">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
