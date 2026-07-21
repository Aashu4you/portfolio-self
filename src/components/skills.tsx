"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillTabs, skills, type SkillTab } from "@/data/portfolio";
import { Reveal } from "@/components/reveal";

function SkillOrb({ name, pct, color }: { name: string; pct: number; color: string }) {
  const circumference = 2 * Math.PI * 32;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <motion.div
      className="skill-orb-card"
      style={{ ["--skill-color" as string]: color }}
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <svg className="skill-ring" viewBox="0 0 80 80">
        <circle className="ring-bg" cx="40" cy="40" r="32" />
        <motion.circle
          className="ring-fill"
          cx="40"
          cy="40"
          r="32"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="skill-orb-label">{name}</div>
      <div className="skill-orb-pct">{pct}%</div>
    </motion.div>
  );
}

export function Skills() {
  const [activeTab, setActiveTab] = useState<SkillTab>("frontend");

  return (
    <section id="skills" className="section skills-section">
      <div className="skills-glow" />
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">What I work with</span>
            <h2 className="section-title">
              My <span className="accent">Skills</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="skill-tabs">
            {skillTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={activeTab === tab.id ? "skill-tab active" : "skill-tab"}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          key={activeTab}
          className="skill-bento"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          {skills[activeTab].map((skill) => (
            <SkillOrb key={skill.name} {...skill} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
