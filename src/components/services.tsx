"use client";

import { motion } from "framer-motion";
import { Cog, Laptop, Paintbrush, Smartphone } from "lucide-react";
import { services } from "@/data/portfolio";
import { Reveal } from "@/components/reveal";

const icons = [Laptop, Paintbrush, Smartphone, Cog];

export function Services() {
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
            const Icon = icons[index];
            return (
              <motion.div
                key={service.title}
                className="service-card"
                style={{ ["--service-color" as string]: service.color }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                whileHover={{ y: -10, rotateX: 4, rotateY: -4 }}
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
