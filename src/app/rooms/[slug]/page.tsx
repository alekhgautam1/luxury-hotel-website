import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import { Reveal } from "@/components/ui";
import { rooms } from "@/lib/data";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);
  if (!room) return { title: "Room not found" };
  return {
    title: `${room.name} — Rooms & Suites`,
    description: `${room.tagline}. ${room.description}`,
  };
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);
  if (!room) notFound();

  const others = rooms.filter((r) => r.slug !== room.slug);

  return (
    <div className="bg-forest-950 text-ivory-50">
      {/* Hero */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden pb-16 pt-40">
        <Image
          src={room.imageWide}
          alt={`${room.name} at Maison Royale`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/50 via-forest-950/30 to-forest-950" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 lg:px-8">
          <nav className="text-[11px] uppercase tracking-[0.25em] text-ivory-50/50" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-gold-300">Home</Link>
            <span className="mx-2 text-gold-500">/</span>
            <Link href="/#rooms" className="transition hover:text-gold-300">Rooms & Suites</Link>
            <span className="mx-2 text-gold-500">/</span>
            <span className="text-gold-300">{room.name}</span>
          </nav>
          <h1 className="mt-5 font-serif text-5xl font-medium leading-tight sm:text-6xl">
            {room.name}
          </h1>
          <p className="mt-3 text-sm uppercase tracking-[0.3em] text-gold-300">{room.tagline}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 pb-28 pt-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20 lg:px-8">
        {/* Details */}
        <div>
          <Reveal>
            <div className="grid grid-cols-3 gap-px border border-ivory-50/10 bg-ivory-50/10 text-center">
              {[
                { label: "Size", value: room.size.split(" / ")[0] },
                { label: "Occupancy", value: `Up to ${room.maxGuests} guests` },
                { label: "Bedding", value: room.bed },
              ].map((s) => (
                <div key={s.label} className="bg-forest-900 px-3 py-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-ivory-50/45">{s.label}</p>
                  <p className="mt-2 font-serif text-lg text-ivory-50">{s.value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-10 text-[15px] leading-relaxed text-ivory-100/70">
              {room.longDescription}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <h2 className="mt-12 font-serif text-2xl">Amenities & Services</h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {room.amenities.map((a) => (
                <li key={a} className="flex items-center gap-3 border border-ivory-50/10 bg-white/[0.03] px-4 py-3 text-sm text-ivory-100/75">
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 shrink-0 text-gold-400" fill="currentColor" aria-hidden="true">
                    <path d="M6 0l1.6 4.4L12 6 7.6 7.6 6 12 4.4 7.6 0 6l4.4-1.6L6 0z" />
                  </svg>
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="mt-12 font-serif text-2xl">Inside the Room</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {room.gallery.map((src, i) => (
                <div key={src + i} className="group relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={src}
                    alt={`${room.name} photograph ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1.3s] group-hover:scale-106"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Booking panel */}
        <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-gold-500/25 bg-forest-900/70 p-7 sm:p-9">
            <div className="flex items-baseline justify-between border-b border-ivory-50/10 pb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-ivory-50/50">From</p>
                <p className="font-serif text-4xl text-gold-300">
                  ${room.pricePerNight.toLocaleString()}
                  <span className="ml-2 text-sm text-ivory-50/50">USD / night</span>
                </p>
              </div>
            </div>
            <div className="mt-7">
              <BookingForm defaultRoomSlug={room.slug} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Other rooms */}
      <section className="border-t border-ivory-50/10 bg-forest-900/40 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="font-serif text-3xl">Other Rooms & Suites</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {others.map((r) => (
              <Link key={r.slug} href={`/rooms/${r.slug}`} className="group relative block aspect-[16/9] overflow-hidden">
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.3s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 to-transparent" />
                <div className="absolute bottom-5 left-6">
                  <p className="font-serif text-2xl text-ivory-50">{r.name}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-gold-300">
                    From ${r.pricePerNight.toLocaleString()} / night
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
