"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Brain, ExternalLink, Hand, Leaf } from "lucide-react";
import { projectFilters, projects, type ProjectCategory } from "@/data/portfolio";
import { Reveal } from "@/components/reveal";
import { GitHubIcon } from "@/components/icons";

const icons = {
  brain: Brain,
  hands: Hand,
  leaf: Leaf,
  book: BookOpen,
};

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const [index, setIndex] = useState(0);

  const filtered = useMemo(
    () => projects.filter((project) => filter === "all" || project.category === filter),
    [filter],
  );

  const active = filtered[index] ?? filtered[0];
  const Icon = active ? icons[active.icon as keyof typeof icons] : Brain;
  const previewHref = active?.demo ?? active?.github;

  const go = (direction: -1 | 1) => {
    if (!filtered.length) return;
    setIndex((prev) => (prev + direction + filtered.length) % filtered.length);
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">What I&apos;ve built</span>
            <h2 className="section-title">
              Featured <span className="accent">Projects</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="project-filters" role="tablist" aria-label="Project filters">
            {projectFilters.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                className={filter === item.id ? "filter-btn active" : "filter-btn"}
                onClick={() => {
                  setFilter(item.id);
                  setIndex(0);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="projects-carousel" aria-live="polite">
          <AnimatePresence mode="wait">
            {active && previewHref ? (
              <motion.article
                key={active.title}
                className="project-showcase"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
              >
                <a
                  href={previewHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-visual"
                  style={{ ["--project-accent" as string]: active.accent }}
                  aria-label={`${active.title} — open ${active.demo ? "live demo" : "GitHub repository"}`}
                >
                  <Image
                    src={active.image}
                    alt={`${active.title} preview`}
                    fill
                    className="project-image"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized={active.image.endsWith(".gif")}
                  />
                  <div className="project-visual-icon" aria-hidden>
                    <Icon className="h-10 w-10" />
                  </div>
                  <span className="project-visual-hint">
                    {active.demo ? "Open live demo" : "View on GitHub"}
                  </span>
                </a>
                <div className="project-body">
                  <div className="project-meta">
                    <span>{active.type}</span>
                    <span>{active.year}</span>
                  </div>
                  <h3>{active.title}</h3>
                  <p>{active.description}</p>
                  <div className="project-stack">
                    {active.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={active.github} target="_blank" rel="noopener noreferrer">
                      <GitHubIcon className="h-4 w-4" />
                      View on GitHub
                    </a>
                    {active.demo ? (
                      <a href={active.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            ) : null}
          </AnimatePresence>

          <div className="carousel-controls">
            <button type="button" className="carousel-btn" onClick={() => go(-1)} aria-label="Previous project">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="carousel-dots">
              {filtered.map((project, dotIndex) => (
                <button
                  key={project.title}
                  type="button"
                  className={dotIndex === index ? "carousel-dot active" : "carousel-dot"}
                  onClick={() => setIndex(dotIndex)}
                  aria-label={`Go to ${project.title}`}
                  aria-current={dotIndex === index ? "true" : undefined}
                />
              ))}
            </div>
            <button type="button" className="carousel-btn" onClick={() => go(1)} aria-label="Next project">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
