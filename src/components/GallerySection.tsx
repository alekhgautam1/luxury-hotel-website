"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/ui";
import { galleryImages } from "@/lib/data";

export default function GallerySection() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) => (i === null ? null : (i + dir + galleryImages.length) % galleryImages.length)),
    [],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  return (
    <section id="gallery" className="bg-forest-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Gallery"
          title="The Maison in Pictures"
          description="Rooms at dusk, plates mid-service, celebrations in full swing — a glimpse of life inside Maison Royale."
        />

        <div className="mt-16 columns-2 gap-4 [column-fill:_balance] lg:columns-3">
          {galleryImages.map((img, i) => (
            <Reveal key={img.src} delay={(i % 3) * 0.08} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                aria-label={`View ${img.alt} full screen`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.tall ? 900 : 1200}
                  height={img.tall ? 1200 : 800}
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="w-full object-cover transition-transform duration-[1.3s] group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-forest-950/0 transition-colors duration-500 group-hover:bg-forest-950/40">
                  <span className="border border-gold-400/0 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-ivory-50 opacity-0 transition-all duration-500 group-hover:border-gold-400/60 group-hover:opacity-100">
                    View
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close viewer"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center border border-ivory-50/30 text-ivory-50 transition hover:border-gold-400 hover:text-gold-300"
            >
              ✕
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-ivory-50/30 text-ivory-50 transition hover:border-gold-400 hover:text-gold-300 sm:left-6"
            >
              ←
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-ivory-50/30 text-ivory-50 transition hover:border-gold-400 hover:text-gold-300 sm:right-6"
            >
              →
            </button>
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative max-h-[85vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[index].src}
                alt={galleryImages[index].alt}
                width={1600}
                height={1100}
                sizes="100vw"
                className="mx-auto max-h-[80vh] w-auto object-contain"
              />
              <p className="mt-4 text-center text-xs uppercase tracking-[0.3em] text-ivory-50/60">
                {galleryImages[index].alt} · {index + 1} / {galleryImages.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
