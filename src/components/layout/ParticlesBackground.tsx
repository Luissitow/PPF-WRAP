"use client";

import { useEffect, useRef } from "react";

/**
 * Fondo de constelación: puntos que flotan y se unen con una línea cuando
 * están cerca.
 *
 * Sustituye a tsParticles del sitio original (~1.2 MB en `js/`) con ~90 líneas
 * de canvas. Porta `#particles-js`: fijo, viewport completo, detrás del
 * contenido y sin capturar clics.
 *
 * Se apaga solo si el usuario pidió menos movimiento o si la pestaña no está
 * visible, para no gastar batería animando algo que nadie ve.
 */

// Gris neutro, como el original: la retícula no debe competir con el acento.
const DOT_COLOR = "rgba(255, 255, 255, 0.32)";
const LINE_COLOR = "255, 255, 255"; // la opacidad va por distancia
const LINK_DISTANCE = 150;
const SPEED = 0.14;

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let dots: Dot[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;

    const setup = () => {
      // Se dibuja a la resolución real de la pantalla para que no se vea borroso.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Densidad proporcional al área, con tope para no ahogar equipos lentos.
      const count = Math.min(Math.round((width * height) / 16000), 90);

      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: Math.random() * 1.6 + 0.7,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const dot of dots) {
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Rebote suave en los bordes.
        if (dot.x < 0 || dot.x > width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > height) dot.vy *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = DOT_COLOR;
        ctx.fill();
      }

      // Une los pares cercanos. La línea se desvanece con la distancia.
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK_DISTANCE) continue;

          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(${LINE_COLOR}, ${0.1 * (1 - dist / LINK_DISTANCE)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      frame = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else start();
    };

    setup();
    start();

    window.addEventListener("resize", setup);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", setup);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 size-full"
    />
  );
}
