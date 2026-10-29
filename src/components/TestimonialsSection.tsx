"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading, Stars } from "@/components/ui";
import { testimonials } from "@/lib/data";

export default function TestimonialsSection() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6500);
    return () => clearInterval(t);
  }, [paused]);

  const t = testimonials[i];

  return (
    <section className="bg-ivory-50 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Guest Reviews"
          title="In Their Own Words"
          description="Sample reviews shown for demonstration — connect your review platform (Google, TripAdvisor) for live guest feedback."
        />

        <div
          className="relative mt-14 min-h-[280px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <span className="font-serif text-7xl leading-none text-gold-500/40" aria-hidden="true">
                “
              </span>
              <blockquote className="mt-2 max-w-2xl font-serif text-2xl italic leading-relaxed text-forest-900 sm:text-[27px]">
                {t.text}
              </blockquote>
              <figcaption className="mt-8 flex flex-col items-center gap-2">
                <Stars rating={t.rating} />
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/50 bg-forest-900 font-serif text-lg text-gold-300">
                  {t.name.charAt(0)}
                </div>
                <p className="text-sm font-medium tracking-wide text-forest-900">{t.name}</p>
                <p className="text-xs text-forest-900/50">{t.location}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-forest-900/35">{t.source}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3" role="tablist" aria-label="Reviews">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={idx === i}
              aria-label={`Show review ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-[3px] transition-all duration-500 ${
                idx === i ? "w-10 bg-gold-500" : "w-5 bg-forest-900/20 hover:bg-forest-900/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
