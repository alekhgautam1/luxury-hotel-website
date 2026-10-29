import Image from "next/image";
import { Reveal, SectionHeading } from "@/components/ui";
import { experiences } from "@/lib/data";

export default function ExperiencesSection() {
  return (
    <section id="experiences" className="bg-ivory-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Signature Experiences"
          title="Moments Designed to be Remembered"
          description="Beyond the room and the table, the Maison curates experiences that linger — in photographs, in stories, in the way you describe your trip years later."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp, i) => (
            <Reveal key={exp.title} delay={(i % 3) * 0.1} className="group relative aspect-[4/5] overflow-hidden">
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-107"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/25 to-transparent transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <span className="mb-3 block h-px w-10 bg-gold-500 transition-all duration-500 group-hover:w-16" />
                <h3 className="font-serif text-2xl text-ivory-50">{exp.title}</h3>
                <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-ivory-100/75 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                  {exp.description}
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-gold-300">
                  Enquire via concierge
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
