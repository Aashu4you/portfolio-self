"use client";

import Image from "next/image";
import Link from "next/link";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={cn("navbar", scrolled && "navbar-scrolled")}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.6 }}
    >
      <Link href="#hero" className="flex items-center gap-3">
        <Image src={portfolioData.heroImage} alt="Logo" width={40} height={40} className="rounded-full" />
        <span className="hidden font-[family-name:var(--font-display)] text-lg font-bold sm:inline">
          Aashutosh<span className="text-accent">.</span>
        </span>
      </Link>

      <nav className="hidden items-center gap-8 lg:flex">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="nav-link">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Toggle theme"
          className="icon-btn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
        <Link href={portfolioData.resumeHref} className="button-outline hidden sm:inline-flex" download>
          <Download className="h-4 w-4" />
          CV
        </Link>
        <button type="button" className="icon-btn lg:hidden" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="mobile-nav lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
