import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui";
import { aboutImage } from "@/lib/data";

const highlights = [
  { k: "62", label: "Years of hospitality" },
  { k: "17", label: "Rooms & suites" },
  { k: "22", label: "Chefs in the brigade" },
  { k: "1:3", label: "Staff to guest ratio" },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-ivory-50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/6]">
            <Image
              src={aboutImage}
              alt="The architecture of Maison Royale at golden hour"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-3 hidden border border-gold-500/40 bg-forest-950 px-8 py-6 sm:block">
            <p className="font-serif text-4xl text-gold-300">1962</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-ivory-50/60">
              Established
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="gold-rule text-[11px] font-medium uppercase tracking-[0.35em] text-gold-600">
              About the Maison
            </span>
            <h2 className="mt-5 font-serif text-4xl font-medium leading-[1.1] text-forest-900 sm:text-5xl">
              Where Every Detail
              <br />
              <span className="italic">Becomes an Experience.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-[15px] leading-relaxed text-forest-900/65">
              Maison Royale began in 1962 as a private residence that opened its doors to
              travellers who valued conversation as much as comfort. Six decades later, the
              house has grown into a seventeen-suite hotel and a restaurant spoken of in the
              same breath as the city&apos;s finest — yet the philosophy has never changed.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-forest-900/65">
              We believe luxury is personal: a room that remembers how you take your coffee,
              a kitchen that writes menus around your table, and a team that treats your
              arrival as the event of the evening.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <dl className="mt-10 grid grid-cols-2 gap-px border border-forest-900/10 bg-forest-900/10 sm:grid-cols-4">
              {highlights.map((h) => (
                <div key={h.label} className="bg-ivory-50 p-5 text-center">
                  <dt className="sr-only">{h.label}</dt>
                  <dd className="font-serif text-3xl text-forest-900">{h.k}</dd>
                  <dd className="mt-1 text-[10px] uppercase tracking-[0.18em] text-forest-900/50">
                    {h.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.25}>
            <Link
              href="#gallery"
              className="mt-10 inline-block bg-forest-900 px-9 py-4 text-[11px] uppercase tracking-[0.28em] text-ivory-50 transition hover:bg-gold-500 hover:text-forest-950"
            >
              Discover Our Story
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
