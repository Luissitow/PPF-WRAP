import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { siteConfig } from "@/config/site";
import { faqs } from "@/content/site-content";
import { buildFaqSchema } from "@/lib/seo";

/**
 * Home.
 *
 * Las secciones opcionales se controlan desde `features` en site.config,
 * así se apagan por cliente sin tocar este archivo.
 */
export default function HomePage() {
  const { features } = siteConfig;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema([...faqs])) }}
      />

      <Hero />
      <Services />
      {features.portfolio && <Projects />}
      {features.process && <Process />}
      {features.team && <Team />}
      <Faq />
      <Contact />
    </>
  );
}
