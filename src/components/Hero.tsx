"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { heroImage } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Maison Royale at night — the illuminated pool terrace"
          fill
          priority
          sizes="100vw"
          className="animate-hero-zoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-forest-950/40 to-forest-950" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 pb-40 text-center sm:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="gold-rule mx-auto justify-center text-[11px] font-medium uppercase tracking-[0.45em] text-gold-300"
        >
          Maison Royale · Est. 1962
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 font-serif text-5xl font-medium leading-[1.05] text-ivory-50 sm:text-6xl lg:text-7xl"
        >
          An Extraordinary Stay.
          <br />
          <span className="italic text-gold-300">An Unforgettable Taste.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-ivory-100/75 sm:text-base"
        >
          Discover exceptional hospitality, exquisite dining, and timeless luxury in the
          heart of the city.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="#booking"
            className="w-full bg-gold-500 px-9 py-4 text-xs font-medium uppercase tracking-[0.28em] text-forest-950 shadow-[0_10px_40px_rgba(197,163,91,0.35)] transition hover:bg-gold-400 hover:shadow-[0_10px_50px_rgba(197,163,91,0.5)] sm:w-auto"
          >
            Book Your Stay
          </Link>
          <Link
            href="#reserve"
            className="w-full border border-ivory-50/40 px-9 py-4 text-xs uppercase tracking-[0.28em] text-ivory-50 backdrop-blur-sm transition hover:border-gold-400 hover:text-gold-300 sm:w-auto"
          >
            Reserve a Table
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-28 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory-50/50 md:flex"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="block h-8 w-px bg-gradient-to-b from-gold-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}
