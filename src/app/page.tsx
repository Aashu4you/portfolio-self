import { Mail, MapPin } from "lucide-react";
import { About } from "@/components/about";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Preloader } from "@/components/preloader";
import { Projects } from "@/components/projects";
import { Services } from "@/components/services";
import { Skills } from "@/components/skills";
import { Reveal } from "@/components/reveal";
import { portfolioData } from "@/data/portfolio";

export default function HomePage() {
  return (
    <main className="page-shell">
      <Preloader />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />

      <section id="contact" className="section">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="section-tag">Let&apos;s work together</span>
              <h2 className="section-title">
                Get In <span className="accent">Touch</span>
              </h2>
            </div>
          </Reveal>

          <div className="contact-grid">
            <Reveal className="contact-info panel">
              <h3>Let&apos;s build something great together</h3>
              <p>
                Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you. I typically
                respond within 24 hours.
              </p>
              <div className="contact-items">
                <a href={`mailto:${portfolioData.email}`} className="contact-item">
                  <div className="ci-icon">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="ci-text">
                    <span>Email</span>
                    <strong>{portfolioData.email}</strong>
                  </div>
                </a>
                <div className="contact-item">
                  <div className="ci-icon">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="ci-text">
                    <span>Location</span>
                    <strong>{portfolioData.location}</strong>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
