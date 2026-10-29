import Image from "next/image";
import BookingForm from "@/components/BookingForm";
import { Reveal, SectionHeading } from "@/components/ui";
import { rooms } from "@/lib/data";

export default function BookingSection() {
  return (
    <section id="booking" className="relative overflow-hidden bg-forest-950 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-gold-500/5 blur-3xl"
      />
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-8">
        <div>
          <SectionHeading
            dark
            align="left"
            eyebrow="Reservations"
            title="Book Your Stay"
            description="Select your dates and preferred suite. Our reservations team personally confirms every request within two hours, around the clock."
          />
          <Reveal delay={0.15} className="mt-10 hidden lg:block">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={rooms[1].gallery[0]}
                alt="Executive Suite bedroom at Maison Royale"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 border border-gold-500/20 m-4 pointer-events-none" />
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-ivory-50/40">
              The Executive Suite · a residence above the city
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="border border-ivory-50/10 bg-forest-900/60 p-7 backdrop-blur-sm sm:p-10">
            <BookingForm listenForPrefill />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
