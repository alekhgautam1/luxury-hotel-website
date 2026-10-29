"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { FormNotice, Reveal, SectionHeading, Spinner, fieldDarkCls, labelCls } from "@/components/ui";
import { reservationImage, site } from "@/lib/data";
import { reservationSchema, todayISO } from "@/lib/validation";

const times = ["12:30", "13:00", "13:30", "14:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
const occasions = ["", "Birthday", "Anniversary", "Business dinner", "Proposal", "Family gathering", "Other"];

export default function ReservationSection() {
  const today = todayISO();
  const [form, setForm] = useState({
    date: "",
    time: "19:30",
    guests: 2,
    guestName: "",
    email: "",
    phone: "",
    occasion: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ confirmationCode: string; message: string } | null>(null);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    const parsed = reservationSchema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]?.toString() ?? "form";
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      return;
    }
    if (form.date < today) {
      setErrors({ date: "Please choose a date from today onwards" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Reservation failed.");
      setConfirmation(data);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Reservation failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const err = (key: string) =>
    errors[key] ? <p className="mt-1.5 text-xs text-red-300" role="alert">{errors[key]}</p> : null;

  return (
    <section id="reserve" className="relative overflow-hidden bg-forest-900 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-stretch gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal className="relative hidden min-h-[560px] overflow-hidden lg:block">
          <Image
            src={reservationImage}
            alt="A candlelit table awaiting guests at Le Jardin Doré"
            fill
            sizes="(max-width: 1024px) 0px, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="font-serif text-2xl italic text-ivory-50">
              Evenings at the Maison begin at a table.
            </p>
            <div className="mt-4 space-y-1 text-xs uppercase tracking-[0.2em] text-ivory-50/60">
              {site.restaurantHours.map((h) => (
                <p key={h.label}>
                  <span className="text-gold-300">{h.label}</span> — {h.value}
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            dark
            align="left"
            eyebrow="Le Jardin Doré"
            title="Reserve Your Table"
            description="Tell us when, and our maître d' will hold the evening for you. Requests are confirmed personally by email or phone."
          />

          <Reveal delay={0.1} className="mt-10">
            {confirmation ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-gold-500/40 bg-white/[0.03] p-10 text-center"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/60 text-2xl text-gold-400">✓</span>
                <h3 className="mt-6 font-serif text-3xl text-ivory-50">Table Requested</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.3em] text-gold-400">
                  Reference · {confirmation.confirmationCode}
                </p>
                <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ivory-100/70">
                  {confirmation.message}
                </p>
                <button
                  type="button"
                  onClick={() => setConfirmation(null)}
                  className="mt-7 border border-ivory-50/25 px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-ivory-50 transition hover:border-gold-400 hover:text-gold-300"
                >
                  Request Another Table
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="rs-date" className={`${labelCls} text-ivory-50/60`}>Date *</label>
                  <input
                    id="rs-date"
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={(e) => set("date", e.target.value)}
                    className={fieldDarkCls}
                    required
                  />
                  {err("date")}
                </div>
                <div>
                  <label htmlFor="rs-time" className={`${labelCls} text-ivory-50/60`}>Time *</label>
                  <select
                    id="rs-time"
                    value={form.time}
                    onChange={(e) => set("time", e.target.value)}
                    className={fieldDarkCls}
                  >
                    {times.map((t) => (
                      <option key={t} value={t} className="bg-forest-900">{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="rs-guests" className={`${labelCls} text-ivory-50/60`}>Guests *</label>
                  <select
                    id="rs-guests"
                    value={form.guests}
                    onChange={(e) => set("guests", Number(e.target.value))}
                    className={fieldDarkCls}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                      <option key={n} value={n} className="bg-forest-900">
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="rs-occasion" className={`${labelCls} text-ivory-50/60`}>Occasion</label>
                  <select
                    id="rs-occasion"
                    value={form.occasion}
                    onChange={(e) => set("occasion", e.target.value)}
                    className={fieldDarkCls}
                  >
                    {occasions.map((o) => (
                      <option key={o || "none"} value={o} className="bg-forest-900">
                        {o || "— Optional —"}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="rs-name" className={`${labelCls} text-ivory-50/60`}>Full name *</label>
                  <input
                    id="rs-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={form.guestName}
                    onChange={(e) => set("guestName", e.target.value)}
                    className={fieldDarkCls}
                    required
                  />
                  {err("guestName")}
                </div>
                <div>
                  <label htmlFor="rs-phone" className={`${labelCls} text-ivory-50/60`}>Phone *</label>
                  <input
                    id="rs-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+1 555 000 0000"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className={fieldDarkCls}
                    required
                  />
                  {err("phone")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="rs-email" className={`${labelCls} text-ivory-50/60`}>Email *</label>
                  <input
                    id="rs-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={fieldDarkCls}
                    required
                  />
                  {err("email")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="rs-notes" className={`${labelCls} text-ivory-50/60`}>Notes</label>
                  <textarea
                    id="rs-notes"
                    rows={3}
                    placeholder="Allergies, seating preferences, surprises we should know about…"
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    className={`${fieldDarkCls} resize-none`}
                  />
                </div>

                {serverError && (
                  <div className="sm:col-span-2">
                    <FormNotice kind="error">{serverError}</FormNotice>
                  </div>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-3 bg-gold-500 px-8 py-4 text-xs font-medium uppercase tracking-[0.28em] text-forest-950 transition hover:bg-gold-400 disabled:opacity-60"
                  >
                    {submitting ? <Spinner /> : null}
                    {submitting ? "Sending Request…" : "Request Reservation"}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
