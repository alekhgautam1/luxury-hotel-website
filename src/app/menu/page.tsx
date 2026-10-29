import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui";
import { VegDot } from "@/components/RestaurantSection";
import { menu, restaurantHeroImage, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Menu — Le Jardin Doré",
  description:
    "The full dinner menu at Le Jardin Doré — Indian, Continental, Asian and Fusion cuisine by Chef Aurélien Varma.",
};

export default function MenuPage() {
  return (
    <div className="bg-charcoal-900 text-ivory-50">
      {/* Header */}
      <section className="relative flex min-h-[55svh] items-end overflow-hidden pb-16 pt-40">
        <Image
          src={restaurantHeroImage}
          alt="Candlelit dining at Le Jardin Doré"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/60 via-charcoal-900/50 to-charcoal-900" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-5 lg:px-8">
          <p className="gold-rule text-[11px] uppercase tracking-[0.4em] text-gold-300">
            Le Jardin Doré
          </p>
          <h1 className="mt-5 font-serif text-5xl font-medium leading-tight sm:text-6xl">
            The Menu
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory-100/70">
            Four cuisines, one philosophy — respect the ingredient, honour the season. Menus
            change with the market; this is tonight&apos;s edition.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-[0.2em] text-ivory-50/50">
            {site.restaurantHours.map((h) => (
              <span key={h.label}>
                <span className="text-gold-300">{h.label}</span> {h.value}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Legend + categories */}
      <section className="mx-auto max-w-5xl px-5 pb-28 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-ivory-50/10 py-5">
          <div className="flex flex-wrap gap-6 text-xs text-ivory-50/60">
            <span className="flex items-center gap-2">
              <VegDot veg={true} /> Vegetarian
            </span>
            <span className="flex items-center gap-2">
              <VegDot veg={false} /> Non-vegetarian
            </span>
            <span className="flex items-center gap-2 text-gold-400">★ Chef&apos;s signature</span>
          </div>
          <nav className="flex flex-wrap gap-2" aria-label="Menu sections">
            {menu.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="border border-ivory-50/15 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-ivory-50/60 transition hover:border-gold-500/60 hover:text-gold-300"
              >
                {c.label}
              </a>
            ))}
          </nav>
        </div>

        {menu.map((category, ci) => (
          <Reveal key={category.id} delay={0.05}>
            <section id={category.id} className="scroll-mt-28 pt-16">
              <div className="flex items-baseline gap-5">
                <span className="font-serif text-5xl text-gold-500/25">
                  {String(ci + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-serif text-3xl text-ivory-50 sm:text-4xl">{category.label}</h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-gold-400">
                    {category.cuisine}
                  </p>
                </div>
              </div>

              <ul className="mt-10 space-y-8">
                {category.items.map((item) => (
                  <li key={item.name} className="group">
                    <div className="flex items-baseline gap-3">
                      <VegDot veg={item.veg} />
                      <h3 className="font-serif text-2xl text-ivory-50 transition group-hover:text-gold-300">
                        {item.name}
                        {item.signature ? (
                          <span className="ml-2 align-middle text-[10px] uppercase tracking-[0.25em] text-gold-400">
                            ★ Signature
                          </span>
                        ) : null}
                      </h3>
                      <span className="mx-2 flex-1 border-b border-dotted border-ivory-50/20" />
                      <span className="font-serif text-xl text-gold-300">${item.price}</span>
                    </div>
                    <p className="mt-2 max-w-2xl pl-7 text-sm leading-relaxed text-ivory-100/50">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}

        <div className="mt-20 border border-gold-500/25 bg-charcoal-800/70 p-10 text-center">
          <h2 className="font-serif text-3xl">A table awaits.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-ivory-100/55">
            Dinner seatings are limited to preserve the quiet of the room. We recommend
            reserving three days ahead.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#reserve"
              className="w-full bg-gold-500 px-9 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-forest-950 transition hover:bg-gold-400 sm:w-auto"
            >
              Reserve Your Table
            </Link>
            <Link
              href="/"
              className="w-full border border-ivory-50/25 px-9 py-4 text-[11px] uppercase tracking-[0.25em] text-ivory-50 transition hover:border-gold-400 hover:text-gold-300 sm:w-auto"
            >
              Back to the Maison
            </Link>
          </div>
          <p className="mt-6 text-[11px] text-ivory-50/35">
            Prices in USD, exclusive of taxes and service. Menu items are sample content for
            this demonstration site.
          </p>
        </div>
      </section>
    </div>
  );
}
