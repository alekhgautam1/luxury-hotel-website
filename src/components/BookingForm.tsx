"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FormNotice, Spinner, fieldDarkCls, labelCls } from "@/components/ui";
import type { BookingPrefill } from "@/components/BookingBar";
import { rooms } from "@/lib/data";
import { bookingSchema, todayISO } from "@/lib/validation";

type Confirmation = {
  confirmationCode: string;
  nights: number;
  estimatedTotal: number;
  message: string;
};

export default function BookingForm({
  defaultRoomSlug,
  listenForPrefill = false,
}: {
  defaultRoomSlug?: string;
  listenForPrefill?: boolean;
}) {
  const today = todayISO();
  const [form, setForm] = useState({
    roomSlug: defaultRoomSlug ?? rooms[0].slug,
    checkIn: "",
    checkOut: "",
    guests: 2,
    rooms: 1,
    guestName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  useEffect(() => {
    if (!listenForPrefill) return;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<BookingPrefill>).detail;
      setForm((f) => ({
        ...f,
        roomSlug: detail.roomSlug ?? f.roomSlug,
        checkIn: detail.checkIn ?? f.checkIn,
        checkOut: detail.checkOut ?? f.checkOut,
        guests: detail.guests ?? f.guests,
        rooms: detail.rooms ?? f.rooms,
      }));
      setConfirmation(null);
    };
    window.addEventListener("mr-prefill-booking", handler);
    return () => window.removeEventListener("mr-prefill-booking", handler);
  }, [listenForPrefill]);

  const selectedRoom = rooms.find((r) => r.slug === form.roomSlug) ?? rooms[0];
  const nights =
    form.checkIn && form.checkOut && form.checkOut > form.checkIn
      ? Math.round((new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / 86400000)
      : 0;
  const estimate = nights * selectedRoom.pricePerNight * form.rooms;

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setFieldErrors((e) => {
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    const parsed = bookingSchema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]?.toString() ?? "form";
        if (!errs[key]) errs[key] = issue.message;
      }
      setFieldErrors(errs);
      return;
    }
    if (form.checkIn < today) {
      setFieldErrors({ checkIn: "Check-in date cannot be in the past" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Booking failed.");
      setConfirmation(data as Confirmation);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const errText = (key: string) =>
    fieldErrors[key] ? (
      <p className="mt-1.5 text-xs text-red-300" role="alert">
        {fieldErrors[key]}
      </p>
    ) : null;

  if (confirmation) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-gold-500/40 bg-white/[0.03] p-8 text-center sm:p-12"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/60 text-2xl text-gold-400">
          ✓
        </span>
        <h3 className="mt-6 font-serif text-3xl text-ivory-50">Request Received</h3>
        <p className="mt-2 text-sm uppercase tracking-[0.3em] text-gold-400">
          Reference · {confirmation.confirmationCode}
        </p>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ivory-100/70">
          {confirmation.message}
        </p>
        <div className="mx-auto mt-7 grid max-w-sm grid-cols-2 gap-px border border-ivory-50/10 bg-ivory-50/10 text-left text-sm">
          <div className="bg-forest-900 p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-ivory-50/50">Nights</p>
            <p className="mt-1 text-ivory-50">{confirmation.nights}</p>
          </div>
          <div className="bg-forest-900 p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-ivory-50/50">Estimated total</p>
            <p className="mt-1 text-gold-300">${confirmation.estimatedTotal.toLocaleString()}</p>
          </div>
        </div>
        <p className="mt-5 text-xs text-ivory-50/40">
          This is a booking request — no payment has been taken and no stay is confirmed until
          our reservations team contacts you.
        </p>
        <button
          type="button"
          onClick={() => setConfirmation(null)}
          className="mt-7 border border-ivory-50/25 px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-ivory-50 transition hover:border-gold-400 hover:text-gold-300"
        >
          Make Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="bk-room" className={`${labelCls} text-ivory-50/60`}>
          Room / Suite
        </label>
        <select
          id="bk-room"
          value={form.roomSlug}
          onChange={(e) => set("roomSlug", e.target.value)}
          className={fieldDarkCls}
        >
          {rooms.map((r) => (
            <option key={r.slug} value={r.slug} className="bg-forest-900">
              {r.name} — from ${r.pricePerNight.toLocaleString()} / night
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="bk-in" className={`${labelCls} text-ivory-50/60`}>
          Check-in *
        </label>
        <input
          id="bk-in"
          type="date"
          min={today}
          value={form.checkIn}
          onChange={(e) => set("checkIn", e.target.value)}
          className={fieldDarkCls}
          required
        />
        {errText("checkIn")}
      </div>
      <div>
        <label htmlFor="bk-out" className={`${labelCls} text-ivory-50/60`}>
          Check-out *
        </label>
        <input
          id="bk-out"
          type="date"
          min={form.checkIn || today}
          value={form.checkOut}
          onChange={(e) => set("checkOut", e.target.value)}
          className={fieldDarkCls}
          required
        />
        {errText("checkOut")}
      </div>

      <div>
        <label htmlFor="bk-guests" className={`${labelCls} text-ivory-50/60`}>
          Guests *
        </label>
        <select
          id="bk-guests"
          value={form.guests}
          onChange={(e) => set("guests", Number(e.target.value))}
          className={fieldDarkCls}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n} className="bg-forest-900">
              {n} {n === 1 ? "Guest" : "Guests"}
            </option>
          ))}
        </select>
        {errText("guests")}
      </div>
      <div>
        <label htmlFor="bk-rooms" className={`${labelCls} text-ivory-50/60`}>
          Rooms *
        </label>
        <select
          id="bk-rooms"
          value={form.rooms}
          onChange={(e) => set("rooms", Number(e.target.value))}
          className={fieldDarkCls}
        >
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n} className="bg-forest-900">
              {n} {n === 1 ? "Room" : "Rooms"}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="bk-name" className={`${labelCls} text-ivory-50/60`}>
          Full name *
        </label>
        <input
          id="bk-name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          value={form.guestName}
          onChange={(e) => set("guestName", e.target.value)}
          className={fieldDarkCls}
          required
        />
        {errText("guestName")}
      </div>
      <div>
        <label htmlFor="bk-email" className={`${labelCls} text-ivory-50/60`}>
          Email *
        </label>
        <input
          id="bk-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          className={fieldDarkCls}
          required
        />
        {errText("email")}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="bk-phone" className={`${labelCls} text-ivory-50/60`}>
          Phone *
        </label>
        <input
          id="bk-phone"
          type="tel"
          autoComplete="tel"
          placeholder="+1 555 000 0000"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          className={fieldDarkCls}
          required
        />
        {errText("phone")}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="bk-requests" className={`${labelCls} text-ivory-50/60`}>
          Special requests
        </label>
        <textarea
          id="bk-requests"
          rows={3}
          placeholder="Occasions, dietary notes, arrival time…"
          value={form.specialRequests}
          onChange={(e) => set("specialRequests", e.target.value)}
          className={`${fieldDarkCls} resize-none`}
        />
      </div>

      <AnimatePresence>
        {nights > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-between border border-gold-500/25 bg-gold-500/5 px-5 py-4 sm:col-span-2"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-ivory-50/60">
              {nights} {nights === 1 ? "night" : "nights"} · {selectedRoom.name} × {form.rooms}
            </span>
            <span className="font-serif text-2xl text-gold-300">
              ${estimate.toLocaleString()}
              <span className="ml-1 text-xs text-ivory-50/40">est.</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

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
          {submitting ? "Sending Request…" : "Request Booking"}
        </button>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-ivory-50/40">
          Availability is checked live against our booking records. Your stay is confirmed
          personally by our reservations team — no payment is taken online.
        </p>
      </div>
    </form>
  );
}
