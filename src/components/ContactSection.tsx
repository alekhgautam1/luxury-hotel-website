"use client";

import { useState } from "react";
import { FormNotice, Reveal, SectionHeading, Spinner, fieldCls, labelCls } from "@/components/ui";
import { site } from "@/lib/data";
import { contactSchema } from "@/lib/validation";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      const next = { ...e };
      delete next[key];
      return next;
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setNotice(null);
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]?.toString() ?? "form";
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Message failed to send.");
      setNotice({ kind: "success", text: data.message });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setNotice({
        kind: "error",
        text: err instanceof Error ? err.message : "Message failed to send. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const err = (key: string) =>
    errors[key] ? <p className="mt-1.5 text-xs text-red-600" role="alert">{errors[key]}</p> : null;

  return (
    <section id="contact" className="bg-ivory-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Contact & Location"
          title="We Are at Your Service"
          description="Whether it is a question, a celebration, or a last-minute arrival — the Maison answers around the clock."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          {/* Info + map */}
          <Reveal className="flex flex-col gap-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="border border-forest-900/10 bg-white p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold-600">Address</p>
                <p className="mt-3 text-sm leading-relaxed text-forest-900/75">{site.address}</p>
              </div>
              <div className="border border-forest-900/10 bg-white p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold-600">Reach Us</p>
                <p className="mt-3 text-sm text-forest-900/75">
                  <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="transition hover:text-gold-600">
                    {site.phone}
                  </a>
                </p>
                <p className="mt-1 text-sm break-all text-forest-900/75">
                  <a href={`mailto:${site.email}`} className="transition hover:text-gold-600">
                    {site.email}
                  </a>
                </p>
              </div>
              <div className="border border-forest-900/10 bg-white p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold-600">Hotel Hours</p>
                <p className="mt-3 text-sm leading-relaxed text-forest-900/75">{site.receptionHours}</p>
              </div>
              <div className="border border-forest-900/10 bg-white p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold-600">Restaurant Hours</p>
                <ul className="mt-3 space-y-1 text-sm text-forest-900/75">
                  {site.restaurantHours.map((h) => (
                    <li key={h.label}>
                      <span className="text-forest-900">{h.label}:</span> {h.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border border-forest-900/10 bg-white p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold-600">
                Directions & Parking
              </p>
              <p className="mt-3 text-sm leading-relaxed text-forest-900/75">{site.parking}</p>
            </div>

            <div className="overflow-hidden border border-forest-900/10">
              <iframe
                title="Map to Maison Royale Hotel & Restaurant"
                src="https://www.google.com/maps?q=Upper+East+Side,+New+York,+NY&output=embed"
                className="h-72 w-full border-0 grayscale-[0.4] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.12}>
            <form onSubmit={submit} noValidate className="border border-forest-900/10 bg-white p-7 sm:p-10">
              <h3 className="font-serif text-2xl text-forest-900">Send a Message</h3>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="ct-name" className={`${labelCls} text-forest-900/60`}>Name *</label>
                  <input
                    id="ct-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={fieldCls}
                    required
                  />
                  {err("name")}
                </div>
                <div>
                  <label htmlFor="ct-email" className={`${labelCls} text-forest-900/60`}>Email *</label>
                  <input
                    id="ct-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={fieldCls}
                    required
                  />
                  {err("email")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="ct-subject" className={`${labelCls} text-forest-900/60`}>Subject *</label>
                  <input
                    id="ct-subject"
                    type="text"
                    placeholder="How may we help?"
                    value={form.subject}
                    onChange={(e) => set("subject", e.target.value)}
                    className={fieldCls}
                    required
                  />
                  {err("subject")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="ct-message" className={`${labelCls} text-forest-900/60`}>Message *</label>
                  <textarea
                    id="ct-message"
                    rows={6}
                    placeholder="Tell us about your stay, your event, or your question…"
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    className={`${fieldCls} resize-none`}
                    required
                  />
                  {err("message")}
                </div>
              </div>

              {notice && (
                <div className="mt-5">
                  <FormNotice kind={notice.kind}>
                    <span className={notice.kind === "success" ? "text-gold-600" : "text-red-600"}>
                      {notice.text}
                    </span>
                  </FormNotice>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-7 flex w-full items-center justify-center gap-3 bg-forest-900 px-8 py-4 text-xs font-medium uppercase tracking-[0.28em] text-ivory-50 transition hover:bg-gold-500 hover:text-forest-950 disabled:opacity-60"
              >
                {submitting ? <Spinner /> : null}
                {submitting ? "Sending…" : "Send Message"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
