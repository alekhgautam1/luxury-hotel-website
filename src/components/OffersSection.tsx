import Image from "next/image";
import Link from "next/link";
import { Reveal, SectionHeading } from "@/components/ui";
import { offers } from "@/lib/data";

export default function OffersSection() {
  return (
    <section id="offers" className="bg-charcoal-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Special Offers"
          title="Occasions, Curated"
          description="Thoughtfully composed packages for romance, celebration and escape. Prices marked with * are sample rates for demonstration and are confirmed by our reservations team."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, i) => (
            <Reveal
              key={offer.title}
              delay={(i % 3) * 0.1}
              className={`group flex flex-col border border-ivory-50/10 bg-charcoal-800/70 transition-colors duration-500 hover:border-gold-500/40 ${
                i === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent" />
                <span className="absolute left-5 bottom-4 text-[10px] uppercase tracking-[0.3em] text-gold-300">
                  {offer.detail}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-serif text-2xl text-ivory-50">{offer.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory-100/55">
                  {offer.description}
                </p>
                <p className="mt-4 text-[11px] leading-relaxed text-ivory-50/35">{offer.terms}</p>
                <Link
                  href="/#contact"
                  className="mt-6 inline-flex items-center gap-2 self-start text-[11px] uppercase tracking-[0.25em] text-gold-400 transition hover:text-gold-300"
                >
                  Discover Offer
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
