"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/ui";
import { chefImage, menu, restaurantHeroImage, signatureDishes } from "@/lib/data";

export function VegDot({ veg }: { veg: boolean }) {
  return (
    <span
      className={`inline-flex h-4 w-4 shrink-0 items-center justify-center border ${
        veg ? "border-emerald-500" : "border-red-700"
      }`}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${veg ? "bg-emerald-500" : "bg-red-700"}`} />
    </span>
  );
}

export default function RestaurantSection() {
  const [active, setActive] = useState(menu[0].id);
  const category = menu.find((c) => c.id === active) ?? menu[0];

  return (
    <section id="restaurant" className="bg-charcoal-900 py-24 text-ivory-50 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Le Jardin Doré · Fine Dining"
          title="A Table Worth Travelling For"
          description="Our restaurant moves between Indian spice heritage, European technique and Asian precision — plated with intent, served by candlelight."
        />

        {/* Editorial hero + chef */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
          <Reveal className="group relative aspect-[16/10] overflow-hidden lg:aspect-auto">
            <Image
              src={restaurantHeroImage}
              alt="Candlelit table at Le Jardin Doré"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-[1.6s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 to-transparent" />
            <p className="absolute bottom-6 left-6 max-w-sm font-serif text-2xl italic text-ivory-50">
              “Luxury is not the gold on the plate — it is the memory of the first bite.”
            </p>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col justify-between border border-gold-500/20 bg-charcoal-800 p-8 sm:p-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold-400">The Kitchen</p>
              <h3 className="mt-3 font-serif text-3xl">Chef Aurélien Varma</h3>
              <p className="mt-4 text-sm leading-relaxed text-ivory-100/60">
                Trained in Lyon, raised between Delhi and Paris, Chef Varma leads a brigade of
                twenty-two with a single philosophy: respect the ingredient, honour the season,
                and let fire and patience do the rest. His tasting menus read like travel
                journals — Kerala coastlines, Burgundy cellars, Kyoto markets.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-5 border-t border-ivory-50/10 pt-6">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden">
                <Image src={chefImage} alt="Inside the dining room of Le Jardin Doré" fill sizes="80px" className="object-cover" />
              </div>
              <div className="text-xs leading-relaxed text-ivory-100/50">
                <p className="text-gold-300">Two tasting menus · à la carte · chef&apos;s table</p>
                <p className="mt-1">Dinner service Tue — Sun · 18:30 — 23:00</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Signature dishes */}
        <div className="mt-20">
          <Reveal>
            <h3 className="gold-rule justify-center text-center text-[11px] uppercase tracking-[0.35em] text-gold-400">
              Signature Dishes
            </h3>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {signatureDishes.map((dish, i) => (
              <Reveal key={dish.name} delay={i * 0.12} className="group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.4s] group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-serif text-xl text-ivory-50">{dish.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold-300">{dish.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Menu preview */}
        <Reveal className="mt-20 border border-ivory-50/10 bg-charcoal-800/60 p-6 sm:p-12">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3" role="tablist" aria-label="Menu categories">
            {menu.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={active === c.id}
                onClick={() => setActive(c.id)}
                className={`px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] transition ${
                  active === c.id
                    ? "bg-gold-500 text-forest-950"
                    : "border border-ivory-50/15 text-ivory-50/60 hover:border-gold-500/50 hover:text-gold-300"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="mx-auto mt-10 max-w-3xl"
            >
              <p className="text-center font-serif text-lg italic text-gold-300/80">{category.cuisine}</p>
              <ul className="mt-8 space-y-7">
                {category.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-baseline gap-3">
                      <VegDot veg={item.veg} />
                      <h4 className="font-serif text-xl text-ivory-50">
                        {item.name}
                        {item.signature ? (
                          <span className="ml-2 align-middle text-[9px] uppercase tracking-[0.25em] text-gold-400">
                            ★ Signature
                          </span>
                        ) : null}
                      </h4>
                      <span className="mx-2 flex-1 border-b border-dotted border-ivory-50/20" />
                      <span className="font-serif text-lg text-gold-300">${item.price}</span>
                    </div>
                    <p className="mt-1.5 pl-7 text-sm leading-relaxed text-ivory-100/50">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/menu"
              className="w-full border border-ivory-50/25 px-8 py-4 text-center text-[11px] uppercase tracking-[0.25em] text-ivory-50 transition hover:border-gold-400 hover:text-gold-300 sm:w-auto"
            >
              View Full Menu
            </Link>
            <Link
              href="/#reserve"
              className="w-full bg-gold-500 px-8 py-4 text-center text-[11px] font-medium uppercase tracking-[0.25em] text-forest-950 transition hover:bg-gold-400 sm:w-auto"
            >
              Reserve Your Table
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
