"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner, fieldDarkCls, labelCls } from "@/components/ui";
import { todayISO } from "@/lib/validation";

type AvailabilityResult = {
  slug: string;
  name: string;
  pricePerNight: number;
  remaining: number;
  available: boolean;
  fitsGuests: boolean;
};

export type BookingPrefill = {
  roomSlug?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
};

export function prefillBooking(detail: BookingPrefill) {
  window.dispatchEvent(new CustomEvent<BookingPrefill>("mr-prefill-booking", { detail }));
  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
}

export default function BookingBar() {
  const today = todayISO();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [roomsN, setRoomsN] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<AvailabilityResult[] | null>(null);

  async function check(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResults(null);
    if (!checkIn || !checkOut) {
      setError("Please select your check-in and check-out dates.");
      return;
    }
    if (checkOut <= checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkIn, checkOut, guests, rooms: roomsN }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Unable to check availability.");
      setResults(data.results as AvailabilityResult[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to check availability.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative z-20 mx-auto -mt-24 max-w-6xl px-5 sm:-mt-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="border border-gold-500/25 bg-forest-900/95 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8"
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="font-serif text-xl text-ivory-50">Plan Your Stay</h2>
          <span className="hidden text-[10px] uppercase tracking-[0.3em] text-gold-400 sm:block">
            Live availability
          </span>
        </div>

        <form onSubmit={check} className="grid grid-cols-2 gap-4 lg:grid-cols-5" noValidate>
          <div>
            <label htmlFor="bb-in" className={`${labelCls} text-ivory-50/60`}>
              Check-in
            </label>
            <input
              id="bb-in"
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
              className={fieldDarkCls}
            />
          </div>
          <div>
            <label htmlFor="bb-out" className={`${labelCls} text-ivory-50/60`}>
              Check-out
            </label>
            <input
              id="bb-out"
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              className={fieldDarkCls}
            />
          </div>
          <div>
            <label htmlFor="bb-guests" className={`${labelCls} text-ivory-50/60`}>
              Guests
            </label>
            <select
              id="bb-guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className={fieldDarkCls}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n} className="bg-forest-900">
                  {n} {n === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="bb-rooms" className={`${labelCls} text-ivory-50/60`}>
              Rooms
            </label>
            <select
              id="bb-rooms"
              value={roomsN}
              onChange={(e) => setRoomsN(Number(e.target.value))}
              className={fieldDarkCls}
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n} className="bg-forest-900">
                  {n} {n === 1 ? "Room" : "Rooms"}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2 flex items-end lg:col-span-1">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 bg-gold-500 px-6 py-3 text-xs font-medium uppercase tracking-[0.22em] text-forest-950 transition hover:bg-gold-400 disabled:opacity-60"
            >
              {loading ? <Spinner /> : null}
              {loading ? "Checking…" : "Check Availability"}
            </button>
          </div>
        </form>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 text-sm text-red-300"
              role="alert"
            >
              {error}
            </motion.p>
          )}
          {results && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-6 grid gap-3 border-t border-ivory-50/10 pt-6 sm:grid-cols-3">
                {results.map((r) => (
                  <div
                    key={r.slug}
                    className={`flex flex-col gap-2 border p-4 ${
                      r.available ? "border-gold-500/30 bg-white/[0.03]" : "border-ivory-50/10 bg-white/[0.01] opacity-60"
                    }`}
                  >
                    <p className="font-serif text-lg text-ivory-50">{r.name}</p>
                    <p className="text-xs text-ivory-100/60">
                      {r.available
                        ? `${r.remaining} available · from $${r.pricePerNight.toLocaleString()} / night`
                        : !r.fitsGuests
                          ? "Party size exceeds capacity"
                          : "Fully booked for these dates"}
                    </p>
                    {r.available ? (
                      <button
                        type="button"
                        onClick={() =>
                          prefillBooking({ roomSlug: r.slug, checkIn, checkOut, guests, rooms: roomsN })
                        }
                        className="mt-1 self-start border border-gold-500/50 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-gold-300 transition hover:bg-gold-500 hover:text-forest-950"
                      >
                        Select & Book
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
