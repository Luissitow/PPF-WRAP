"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { quoteLink } from "@/config/site";
import { showcaseSlides } from "@/content/showcase";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

/**
 * Carrusel 3D del hero.
 *
 * Porta `.swiper-3d-7` del original con su configuración exacta
 * (js/swiper.js:30): coverflow rotate 15, stretch 90, depth 0, modifier 1,
 * scale 0.9, sin sombras, centrado y en bucle.
 *
 * Los breakpoints también son los del original:
 *   320 → 1.2 slides · 768 → 2.2 · 1024 → 3 · 1200 → 4 · 1400 → 5
 */
export function HeroCarousel() {
  return (
    <div className="relative mt-14 md:mt-20">
      <Swiper
        modules={[EffectCoverflow, Navigation, A11y, Autoplay]}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        slidesPerView={1.2}
        spaceBetween={20}
        coverflowEffect={{
          rotate: 15,
          stretch: 90,
          depth: 0,
          modifier: 1,
          scale: 0.9,
          slideShadows: false,
        }}
        autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation={{ nextEl: ".hero-next", prevEl: ".hero-prev" }}
        a11y={{
          prevSlideMessage: "Proyecto anterior",
          nextSlideMessage: "Proyecto siguiente",
        }}
        breakpoints={{
          768: { slidesPerView: 2.2, spaceBetween: 25 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
          1200: { slidesPerView: 4 },
          1400: { slidesPerView: 5 },
        }}
        className="!pb-4"
      >
        {showcaseSlides.map((slide, i) => (
          <SwiperSlide key={slide.image} className="h-auto">
            <article className="rounded-[20px] bg-[#1E1E1E] p-3 pb-4">
              <div className="relative overflow-hidden rounded-[25px]">
                {/* Proporción vertical, como las tarjetas del original */}
                <div className="relative aspect-3/4">
                  <Image
                    src={slide.image}
                    alt={`${slide.vehicle} — ${slide.title} ${slide.detail}`}
                    fill
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 33vw, 20vw"
                    priority={i < 5}
                    className="object-cover"
                  />
                </div>

                {/* Etiqueta flotante (.featured-countdown) */}
                <span className="absolute right-3 top-3 flex min-w-[110px] items-center justify-center rounded-full bg-white/20 px-2.5 py-2 text-center font-sans text-xs font-extrabold leading-tight text-white backdrop-blur-[2px]">
                  {slide.vehicle}
                </span>

                {/* Botón que emerge en hover (.button-place-bid) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-200 ease-out md:bottom-[30%] md:opacity-0 md:group-hover:opacity-100 [.swiper-slide-active_&]:md:bottom-6 [.swiper-slide-active_&]:md:opacity-100">
                  <a
                    href={quoteLink(slide.vehicle)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 items-center justify-center rounded-[var(--radius-control)] bg-accent-muted px-6 font-sans text-sm font-extrabold text-surface transition-colors hover:bg-accent"
                  >
                    Cotiza
                  </a>
                </div>
              </div>

              {/* Pie centrado (.meta-info.text-center) */}
              <div className="mt-3 text-center">
                <h3 className="font-sans text-base font-extrabold leading-tight text-ink">
                  {slide.title}
                </h3>
                <p className="mt-1 font-sans text-sm font-extrabold text-accent">
                  {slide.detail}
                </p>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controles */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          className="hero-prev flex size-11 items-center justify-center rounded-full border border-white/15 text-ink transition-all hover:border-accent hover:bg-accent hover:text-surface"
          aria-label="Proyecto anterior"
        >
          <ChevronLeft className="size-5" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          className="hero-next flex size-11 items-center justify-center rounded-full border border-white/15 text-ink transition-all hover:border-accent hover:bg-accent hover:text-surface"
          aria-label="Proyecto siguiente"
        >
          <ChevronRight className="size-5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
