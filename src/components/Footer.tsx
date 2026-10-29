"use client";

import Link from "next/link";
import { useState } from "react";
import { Spinner } from "@/components/ui";
import { site } from "@/lib/data";
import { newsletterSchema } from "@/lib/validation";

const socialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7V11H8.3v3h2.4v7h2.8z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M17.5 3h3l-6.6 7.6L21.6 21h-6.1l-4.8-6.3L5.2 21h-3l7.1-8.1L2.6 3h6.3l4.3 5.7L17.5 3zm-1 16.2h1.7L7.9 4.7H6.1l10.4 14.5z" />
    </svg>
  ),
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      setState("error");
      setMessage(parsed.error.issues[0]?.message ?? "Please enter a valid email.");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Subscription failed.");
      setState("done");
      setMessage(data.message);
      setEmail("");
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Subscription failed.");
    }
  }

  return (
    <footer className="border-t border-gold-500/15 bg-forest-950 text-ivory-50">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center border border-gold-500/60 font-serif text-xl text-gold-400">
                M
              </span>
              <span>
                <span className="block font-serif text-xl">Maison Royale</span>
                <span className="block text-[9px] uppercase tracking-[0.4em] text-gold-400">
                  Hotel · Restaurant
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory-100/50">
              Six decades of quiet luxury, exceptional cuisine and hospitality that remembers
              your name. An extraordinary stay. An unforgettable taste.
            </p>
            <div className="mt-6 flex gap-3">
              {site.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-10 w-10 items-center justify-center border border-ivory-50/15 text-ivory-50/70 transition hover:border-gold-400 hover:text-gold-300"
                >
                  {socialIcons[s.icon]}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer navigation">
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-gold-400">Navigate</h3>
            <ul className="mt-5 space-y-3 text-sm text-ivory-100/60">
              {[
                { label: "Rooms & Suites", href: "/#rooms" },
                { label: "Restaurant", href: "/#restaurant" },
                { label: "Full Menu", href: "/menu" },
                { label: "Experiences", href: "/#experiences" },
                { label: "Special Offers", href: "/#offers" },
                { label: "Gallery", href: "/#gallery" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition hover:text-gold-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Reservations */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-gold-400">Reservations</h3>
            <ul className="mt-5 space-y-3 text-sm text-ivory-100/60">
              <li>
                <Link href="/#booking" className="transition hover:text-gold-300">
                  Book a Room
                </Link>
              </li>
              <li>
                <Link href="/#reserve" className="transition hover:text-gold-300">
                  Reserve a Table
                </Link>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="transition hover:text-gold-300">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="break-all transition hover:text-gold-300">
                  {site.email}
                </a>
              </li>
              <li className="pt-1 text-xs leading-relaxed text-ivory-100/40">{site.address}</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-gold-400">The Maison Letter</h3>
            <p className="mt-5 text-sm leading-relaxed text-ivory-100/50">
              Seasonal menus, private events and quiet openings — once a month, never more.
            </p>
            <form onSubmit={subscribe} className="mt-5" noValidate>
              <div className="flex">
                <label htmlFor="nl-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="nl-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setState("idle");
                  }}
                  placeholder="Your email address"
                  className="w-full border border-ivory-50/15 bg-white/[0.04] px-4 py-3 text-sm text-ivory-50 outline-none transition placeholder:text-ivory-50/30 focus:border-gold-500"
                  required
                />
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="flex items-center gap-2 border border-l-0 border-gold-500 bg-gold-500 px-5 text-[10px] font-medium uppercase tracking-[0.2em] text-forest-950 transition hover:bg-gold-400 disabled:opacity-60"
                >
                  {state === "loading" ? <Spinner /> : "Join"}
                </button>
              </div>
              {state === "done" && (
                <p className="mt-3 text-xs text-gold-300" role="status">{message}</p>
              )}
              {state === "error" && (
                <p className="mt-3 text-xs text-red-300" role="alert">{message}</p>
              )}
              <p className="mt-3 text-[10px] leading-relaxed text-ivory-50/30">
                Subscribers are stored securely. Connect an email service provider for campaign
                delivery (see src/app/api/newsletter/route.ts).
              </p>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory-50/10 pt-7 text-xs text-ivory-50/35 sm:flex-row">
          <p>© {new Date().getFullYear()} Maison Royale Hotel & Restaurant. All rights reserved. Fictional brand for demonstration.</p>
          <div className="flex gap-6">
            <Link href="/#contact" className="transition hover:text-gold-300">
              Privacy Policy
            </Link>
            <Link href="/#contact" className="transition hover:text-gold-300">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
