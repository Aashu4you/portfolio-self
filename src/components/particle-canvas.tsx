"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  reset: (w: number, h: number) => void;
  update: (w: number, h: number) => void;
  draw: (ctx: CanvasRenderingContext2D, color: string) => void;
};

const PARTICLE_COLOR = "13,148,136";

function createParticle(w: number, h: number): Particle {
  const particle: Particle = {
    x: 0,
    y: 0,
    r: 0,
    vx: 0,
    vy: 0,
    a: 0,
    reset(width, height) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.r = Math.random() * 1.6 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.a = Math.random() * 0.4 + 0.08;
    },
    update(width, height) {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset(width, height);
      }
    },
    draw(ctx, color) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color},${this.a})`;
      ctx.fill();
    },
  };
  particle.reset(w, h);
  return particle;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = true;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const count = isMobile ? 28 : 48;
    const drawConnections = !isMobile;
    const particles = Array.from({ length: count }, () => createParticle(1, 1));

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${PARTICLE_COLOR},${0.08 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.update(width, height);
        particle.draw(ctx, PARTICLE_COLOR);
      });
      if (drawConnections) drawLines();
      frame = window.requestAnimationFrame(animate);
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) animate();
      else window.cancelAnimationFrame(frame);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden />;
}
