"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal, SectionHeading } from "@/components/ui";
import { prefillBooking } from "@/components/BookingBar";
import { rooms } from "@/lib/data";

const amenityIcon = (
  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 shrink-0 text-gold-500" fill="currentColor" aria-hidden="true">
    <path d="M6 0l1.6 4.4L12 6 7.6 7.6 6 12 4.4 7.6 0 6l4.4-1.6L6 0z" />
  </svg>
);

export default function RoomsSection() {
  return (
    <section id="rooms" className="bg-ivory-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Rooms & Suites"
          title="Stay in Quiet Splendour"
          description="Three expressions of comfort — each one layered in natural materials, soft light and the kind of silence only a grand hotel can offer."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {rooms.map((room, i) => (
            <Reveal key={room.slug} delay={i * 0.12} className="group flex flex-col">
              <Link
                href={`/rooms/${room.slug}`}
                className="relative block aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={room.image}
                  alt={`${room.name} at Maison Royale`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent opacity-80" />
                <span className="absolute left-5 top-5 bg-forest-950/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-gold-300 backdrop-blur-sm">
                  {room.size.split(" / ")[0]} · up to {room.maxGuests} guests
                </span>
                <span className="absolute bottom-5 right-5 text-right">
                  <span className="block font-serif text-3xl text-ivory-50">
                    ${room.pricePerNight.toLocaleString()}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-ivory-50/70">
                    USD / night
                  </span>
                </span>
              </Link>

              <div className="flex flex-1 flex-col border border-t-0 border-forest-900/10 bg-white p-7">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold-600">{room.tagline}</p>
                <h3 className="mt-2 font-serif text-2xl text-forest-900">{room.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-forest-900/60">{room.description}</p>

                <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
                  {room.amenities.slice(0, 4).map((a) => (
                    <li key={a} className="flex items-center gap-2 text-xs text-forest-900/70">
                      {amenityIcon}
                      {a}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex gap-3 border-t border-forest-900/10 pt-6">
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="flex-1 border border-forest-900/20 px-4 py-3 text-center text-[10px] uppercase tracking-[0.22em] text-forest-900 transition hover:border-forest-900 hover:bg-forest-900 hover:text-ivory-50"
                  >
                    Explore Room
                  </Link>
                  <button
                    type="button"
                    onClick={() => prefillBooking({ roomSlug: room.slug })}
                    className="flex-1 bg-forest-900 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-ivory-50 transition hover:bg-gold-500 hover:text-forest-950"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
