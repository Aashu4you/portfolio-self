"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Laptop, Paintbrush, Sparkles } from "lucide-react";
import { services } from "@/data/portfolio";
import { Reveal } from "@/components/reveal";

const icons = [Laptop, Paintbrush, Sparkles];

export function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">What I offer</span>
            <h2 className="section-title">
              My <span className="accent">Services</span>
            </h2>
          </div>
        </Reveal>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = icons[index] ?? Laptop;
            return (
              <motion.div
                key={service.title}
                className="service-card"
                style={{ ["--service-color" as string]: service.color }}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={reduceMotion ? undefined : { y: -8 }}
              >
                <div className="service-glow" />
                <div className="service-icon">
                  <Icon className="h-6 w-6" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
