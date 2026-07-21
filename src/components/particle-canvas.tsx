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
  draw: (ctx: CanvasRenderingContext2D) => void;
};

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
      this.r = Math.random() * 1.8 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.a = Math.random() * 0.5 + 0.1;
    },
    update(width, height) {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset(width, height);
      }
    },
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(162,89,255,${this.a})`;
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

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    const particles = Array.from({ length: 80 }, () => createParticle(1, 1));

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(162,89,255,${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.update(width, height);
        particle.draw(ctx);
      });
      drawLines();
      frame = window.requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden />;
}
