"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Brain, ExternalLink, Globe, Hand, Leaf } from "lucide-react";
import { projectFilters, projects, type ProjectCategory } from "@/data/portfolio";
import { Reveal } from "@/components/reveal";

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
          <div className="project-filters">
            {projectFilters.map((item) => (
              <button
                key={item.id}
                type="button"
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

        <div className="projects-carousel">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.article
                key={active.title}
                className="project-showcase"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45 }}
              >
                <div className={`project-visual bg-gradient-to-br ${active.gradient}`}>
                  <Icon className="h-16 w-16 text-white/90" />
                  <div className="project-overlay">
                    <p>{active.description}</p>
                    <div className="overlay-stack">
                      {active.stack.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
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
                    <a href={active.href} target={active.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      <Globe className="h-4 w-4" />
                      Code
                    </a>
                    {active.href.startsWith("http") ? (
                      <a href={active.href} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        GitHub
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
