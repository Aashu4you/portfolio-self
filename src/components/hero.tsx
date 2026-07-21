"use client";

import Image from "next/image";
import Link from "next/link";
import { Download, Globe, Mail, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { ParticleCanvas } from "@/components/particle-canvas";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
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
  }, [text, deleting, roleIndex]);

  return (
    <section id="hero" className="hero-section">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <ParticleCanvas />

      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <div className="status-pill">
            <span className="status-dot" />
            Available for work
          </div>

          <h1 className="hero-title">
            Hi, I&apos;m <span className="gradient-text">Aashutosh</span>
            <br />
            <span className="gradient-text">Sharma</span>
          </h1>

          <p className="hero-role">
            I&apos;m a <span className="typed">{text}</span>
            <span className="cursor-blink">|</span>
          </p>

          <p className="hero-bio">{portfolioData.intro}</p>

          <div className="hero-actions">
            <a href="#projects" className="button-primary">
              <Rocket className="h-4 w-4" />
              View Projects
            </a>
            <Link href={portfolioData.resumeHref} className="button-ghost" download>
              <Download className="h-4 w-4" />
              Contact Me
            </Link>
          </div>

          <div className="hero-socials">
            <a href={portfolioData.socialLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Globe className="h-5 w-5" />
            </a>
            <a href={portfolioData.socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Globe className="h-5 w-5" />
            </a>
            <a href={`mailto:${portfolioData.email}`} aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <div className="avatar-frame">
            <div className="avatar-ring ring-1" />
            <div className="avatar-ring ring-2" />
            <div className="avatar-ring ring-3" />
            <div className="avatar-inner">
              <Image src={portfolioData.heroImage} alt={portfolioData.name} width={420} height={420} className="avatar-img" priority />
            </div>
            <div className="tech-badge badge-1">React</div>
            <div className="tech-badge badge-2">JS</div>
            <div className="tech-badge badge-3">Node</div>
            <div className="tech-badge badge-4">Python</div>
          </div>
        </motion.div>
      </div>

      <a href="#about" className="scroll-indicator">
        <div className="scroll-mouse">
          <span />
        </div>
        <p>Scroll down</p>
      </a>

      <div className="wave-divider">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}
