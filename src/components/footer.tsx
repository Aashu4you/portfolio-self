import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <p className="footer-name">
            {portfolioData.name}
            <span className="accent">.</span>
          </p>
          <p>{portfolioData.intro}</p>
          <div className="footer-socials">
            <a href={portfolioData.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a href={portfolioData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a href={`mailto:${portfolioData.email}`} aria-label="Email">
              @
            </a>
          </div>
        </div>

        <div>
          <h4>Navigate</h4>
          <ul>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        <div>
          <h4>Resources</h4>
          <ul>
            <li>
              <Link href={portfolioData.resumeHref}>Resume</Link>
            </li>
            <li>
              <a href={portfolioData.socialLinks.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={portfolioData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {year} {portfolioData.name}. Built with Next.js.
        </p>
        <a href="#hero">Back to top</a>
      </div>
    </footer>
  );
}
