"use client";

import Image from "next/image";
import Link from "next/link";
import { Coffee, Download, GraduationCap, Heart, MapPin } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { aboutDetails, portfolioData, stats } from "@/data/portfolio";
import { Reveal } from "@/components/reveal";

const detailIcons = [MapPin, GraduationCap, Heart, Coffee];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = Math.ceil(value / 40);
    const timer = window.setInterval(() => {
      current = Math.min(current + step, value);
      setCount(current);
      if (current >= value) window.clearInterval(timer);
    }, 40);
    return () => window.clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">Get to know me</span>
            <h2 className="section-title">
              About <span className="accent">Me</span>
            </h2>
          </div>
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-image-col">
            <div className="about-img-wrapper">
              <Image src={portfolioData.aboutImage} alt={portfolioData.name} width={560} height={680} className="about-img" />
              <div className="about-decoration" />
              <div className="experience-badge">
                <span className="exp-number">2+</span>
                <span className="exp-label">Years Exp.</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="about-text-col">
            <h3 className="about-subtitle">A Passionate Full-Stack Developer</h3>
            {portfolioData.about.map((paragraph) => (
              <p key={paragraph} className="about-para">
                {paragraph}
              </p>
            ))}
            <div className="about-details">
              {aboutDetails.map((detail, index) => {
                const Icon = detailIcons[index];
                return (
                  <div key={detail} className="detail-item">
                    <Icon className="h-4 w-4 text-accent-alt" />
                    {detail}
                  </div>
                );
              })}
            </div>
            <Link href={portfolioData.resumeHref} className="button-primary inline-flex" download>
              <Download className="h-4 w-4" />
              Download Resume
            </Link>
          </Reveal>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
            >
              <div className="stat-number">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
