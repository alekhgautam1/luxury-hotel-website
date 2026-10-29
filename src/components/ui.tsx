"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <Reveal className={`flex flex-col ${alignCls} gap-4`}>
      <span className={`gold-rule text-[11px] font-medium uppercase tracking-[0.35em] text-gold-500`}>
        {eyebrow}
      </span>
      <h2
        className={`font-serif text-4xl font-medium leading-[1.1] sm:text-5xl ${
          dark ? "text-ivory-50" : "text-forest-900"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`max-w-2xl text-[15px] leading-relaxed ${
            dark ? "text-ivory-100/60" : "text-forest-900/60"
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

export function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-gold-500" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth={i < rating ? 0 : 1}>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export const fieldCls =
  "w-full border border-forest-900/15 bg-white/80 px-4 py-3 text-sm text-forest-900 outline-none transition placeholder:text-forest-900/35 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20";

export const fieldDarkCls =
  "w-full border border-ivory-50/15 bg-white/[0.04] px-4 py-3 text-sm text-ivory-50 outline-none transition placeholder:text-ivory-50/30 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/25 [color-scheme:dark]";

export const labelCls =
  "mb-2 block text-[11px] font-medium uppercase tracking-[0.2em]";

export function FormNotice({
  kind,
  children,
}: {
  kind: "success" | "error";
  children: ReactNode;
}) {
  return (
    <div
      role="status"
      className={`border px-4 py-3 text-sm leading-relaxed ${
        kind === "success"
          ? "border-gold-500/40 bg-gold-500/10 text-gold-300"
          : "border-red-400/40 bg-red-500/10 text-red-300"
      }`}
    >
      {children}
    </div>
  );
}
