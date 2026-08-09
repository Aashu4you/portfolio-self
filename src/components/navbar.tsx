"use client";

import Link from "next/link";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      className={cn("navbar", scrolled && "navbar-scrolled")}
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.05, duration: 0.4 }}
    >
      <Link href="#hero" className="navbar-brand">
        <span className="navbar-brand-mark">AS</span>
        <span className="hidden sm:inline">
          Aashutosh<span className="text-accent">.</span>
        </span>
      </Link>

      <nav className="navbar-links" aria-label="Primary">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="nav-link">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="navbar-actions">
        <button
          type="button"
          aria-label="Toggle theme"
          className="icon-btn"
          suppressHydrationWarning
          onClick={() => setTheme(isLight ? "dark" : "light")}
        >
          {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
        <Link href={portfolioData.resumeHref} className="button-outline hidden sm:inline-flex">
          <Download className="h-4 w-4" />
          CV
        </Link>
        <button
          type="button"
          className="icon-btn navbar-menu-btn"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            className="mobile-nav"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href={portfolioData.resumeHref} onClick={() => setOpen(false)}>
              Download CV
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
