"use client";

import Image from "next/image";
import { Mail, Rocket, Send } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { ParticleCanvas } from "@/components/particle-canvas";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const word = portfolioData.typedRoles[roleIndex];
    const timeout = window.setTimeout(
      () => {
        if (!deleting && text.length < word.length) {
          setText(word.slice(0, text.length + 1));
        } else if (!deleting && text.length === word.length) {
          setDeleting(true);
        } else if (deleting && text.length > 0) {
          setText(word.slice(0, text.length - 1));
        } else {
          setDeleting(false);
          setRoleIndex((prev) => (prev + 1) % portfolioData.typedRoles.length);
        }
      },
      !deleting && text.length < word.length ? 100 : deleting ? 60 : text.length === word.length ? 1800 : 400,
    );
    return () => window.clearTimeout(timeout);
  }, [text, deleting, roleIndex, reduceMotion]);

  return (
    <section id="hero" className="hero-section">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <ParticleCanvas />

      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.15, duration: 0.6 }}
        >
          <p className="hero-kicker">{portfolioData.title}</p>

          <h1 className="hero-title">
            <span className="gradient-text">{portfolioData.shortName}</span>
            <br />
            Sharma
          </h1>

          <p className="hero-role">
            I&apos;m a <span className="typed">{reduceMotion ? portfolioData.typedRoles[0] : text}</span>
            {!reduceMotion ? <span className="cursor-blink">|</span> : null}
          </p>

          <p className="hero-bio">{portfolioData.intro}</p>

          <div className="hero-actions">
            <a href="#projects" className="button-primary">
              <Rocket className="h-4 w-4" />
              View Projects
            </a>
            <a href="#contact" className="button-ghost">
              <Send className="h-4 w-4" />
              Contact Me
            </a>
          </div>

          <div className="hero-socials">
            <a href={portfolioData.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a href={portfolioData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a href={`mailto:${portfolioData.email}`} aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={reduceMotion ? false : { opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.25, duration: 0.6 }}
        >
          <div className="avatar-frame">
            <div className="avatar-ring ring-1" />
            <div className="avatar-ring ring-2" />
            <div className="avatar-inner">
              <Image
                src={portfolioData.heroImage}
                alt={portfolioData.name}
                width={420}
                height={420}
                className="avatar-img"
                priority
                sizes="(max-width: 768px) 280px, 420px"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <a href="#about" className="scroll-indicator">
        <div className="scroll-mouse">
          <span />
        </div>
        <p>Scroll down</p>
      </a>
    </section>
  );
}
