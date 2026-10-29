"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "Home", href: "/" },
  { label: "Rooms & Suites", href: "/#rooms" },
  { label: "Restaurant", href: "/#restaurant" },
  { label: "Experiences", href: "/#experiences" },
  { label: "About Us", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold-500/15 bg-forest-950/95 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-black/50 to-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center border border-gold-500/60 font-serif text-xl text-gold-400 transition group-hover:bg-gold-500/10">
            M
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg tracking-wide text-ivory-50">
              Maison Royale
            </span>
            <span className="block text-[9px] uppercase tracking-[0.4em] text-gold-400">
              Hotel · Restaurant
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Main navigation">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="group relative text-[12px] uppercase tracking-[0.18em] text-ivory-50/80 transition hover:text-gold-300"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/#reserve"
            className="border border-ivory-50/30 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-ivory-50 transition hover:border-gold-400 hover:text-gold-300"
          >
            Reserve a Table
          </Link>
          <Link
            href="/#booking"
            className="bg-gold-500 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-forest-950 transition hover:bg-gold-400"
          >
            Book Your Stay
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] border border-ivory-50/20 lg:hidden"
        >
          <span className={`h-px w-5 bg-ivory-50 transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-px w-5 bg-gold-400 transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-5 bg-ivory-50 transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-[-1] flex h-screen flex-col bg-forest-950/98 px-6 pt-28 pb-10 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-ivory-50/10 py-4 font-serif text-2xl text-ivory-50 transition hover:text-gold-300"
                  >
                    {l.label}
                    <span className="text-gold-500">→</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-col gap-3"
            >
              <Link
                href="/#booking"
                onClick={() => setOpen(false)}
                className="bg-gold-500 px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.25em] text-forest-950"
              >
                Book Your Stay
              </Link>
              <Link
                href="/#reserve"
                onClick={() => setOpen(false)}
                className="border border-ivory-50/25 px-6 py-4 text-center text-xs uppercase tracking-[0.25em] text-ivory-50"
              >
                Reserve a Table
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
