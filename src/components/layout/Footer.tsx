import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/components/ui/SocialIcons";
import { formattedAddress, siteConfig } from "@/config/site";
import { footerNav } from "@/content/site-content";

/** Sólo se renderizan las redes con URL en site.config. */
const socialLinks = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "tiktok", label: "TikTok", Icon: TikTokIcon },
  { key: "youtube", label: "YouTube", Icon: YouTubeIcon },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const active = socialLinks.filter(({ key }) => siteConfig.social[key]);

  return (
    <footer className="relative border-t border-hairline bg-surface-deep">
      <Container width="wide" className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Marca y contacto */}
          <div>
            <Image
              src={siteConfig.brand.logo}
              alt={siteConfig.name}
              width={260}
              height={56}
              className="h-10 w-auto"
            />

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              {siteConfig.description}
            </p>

            <ul className="mt-7 flex flex-col gap-3.5 text-sm">
              <li>
                <a
                  href={siteConfig.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-ink-muted transition-colors hover:text-accent"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2} />
                  <span>{formattedAddress()}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-3 text-ink-muted transition-colors hover:text-accent"
                >
                  <Phone className="size-4 shrink-0 text-accent" strokeWidth={2} />
                  <span className="font-mono">{siteConfig.contact.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 text-ink-muted transition-colors hover:text-accent"
                >
                  <Mail className="size-4 shrink-0 text-accent" strokeWidth={2} />
                  <span>{siteConfig.contact.email}</span>
                </a>
              </li>
            </ul>

            {active.length > 0 && (
              <ul className="mt-7 flex gap-3">
                {active.map(({ key, label, Icon }) => (
                  <li key={key}>
                    <a
                      href={siteConfig.social[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex size-10 items-center justify-center rounded-full border border-hairline text-ink-muted transition-all hover:border-accent hover:bg-accent hover:text-surface"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Columnas de navegación */}
          {footerNav.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {column.title}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {column.items.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith("#") ? (
                      <a
                        href={item.href}
                        className="text-sm text-ink-muted transition-colors hover:text-accent"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm text-ink-muted transition-colors hover:text-accent"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Horario */}
        <div className="mt-14 grid gap-4 border-t border-hairline pt-8 sm:grid-cols-3">
          {siteConfig.hours.map((slot) => (
            <div key={slot.days}>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                {slot.days}
              </p>
              <p className="mt-1 font-sans text-sm font-bold text-ink">{slot.time}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-hairline pt-8 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}. Todos los derechos reservados.
          </p>
          <p className="font-mono">{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
