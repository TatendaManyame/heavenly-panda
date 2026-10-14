// components/About.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Reveal } from "../components/Reveal";
import { VALUES } from "@/components/data";
import { motion, AnimatePresence } from "framer-motion";

// Updated to use PNG files in the events folder
const EVENT_IMAGES = [
  "/events/e1.png",
  "/events/e2.png",
  "/events/e3.png",
  "/events/e4.png",
  "/events/e5.png",
  "/events/e6.png",
  "/events/e7.png",
  "/events/e8.png",
  "/events/e9.png",
  "/events/e10.png",
  "/events/e11.png",
  "/events/e12.png",
  "/events/e13.png",
  "/events/e14.png",
  "/events/e15.png",
  "/events/e16.png",
  "/events/e17.png",
  "/events/e18.png",
  "/events/e19.png",
  "/events/e20.png",
];

// Fallback image if none of the event images load
const FALLBACK_IMAGE = "/heavenly-logo2.jpeg";

const MISSION_VISION = [
  {
    n: "01",
    title: "Our Mission",
    text: "To capture moments that can't be re-lived — through photography, film and content that help brands, events and people tell their story with clarity and craft.",
  },
  {
    n: "02",
    title: "Our Vision",
    text: "To become the go-to media studio for growing brands and milestone moments across the Middle East and Asia — known for work clients are proud to share.",
  },
];

export function WhoWeAre() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [validImages, setValidImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Validate images on mount
  useEffect(() => {
    const checkImages = async () => {
      const valid: string[] = [];

      for (const img of EVENT_IMAGES) {
        try {
          const response = await fetch(img, { method: "HEAD" });
          if (response.ok) {
            valid.push(img);
          } else {
            console.warn(`Image not found: ${img}`);
          }
        } catch (error) {
          console.warn(`Error checking image: ${img}`, error);
        }
      }

      // If no valid images found, use fallback
      if (valid.length === 0) {
        valid.push(FALLBACK_IMAGE);
      }

      setValidImages(valid);
      setIsLoading(false);
    };

    checkImages();
  }, []);

  // Auto-slide
  useEffect(() => {
    if (validImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === validImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [validImages]);

  const nextImage = () => {
    if (validImages.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === validImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    if (validImages.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? validImages.length - 1 : prevIndex - 1
    );
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  /* ---------------- Left column: shared across all states ---------------- */
  const LeftContent = () => (
    <div>
      <Reveal>
        <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[#D4A84B]/80">
          <span className="h-px w-8 bg-[#D4A84B]/60" />
          Who We Are
        </span>
      </Reveal>

      <Reveal delay={100}>
        <h2 className="mt-6 font-sans text-4xl font-bold leading-[1.05] tracking-tight text-[#14110F] sm:text-5xl">
          Heavenly Panda{" "}
          <span className="text-[#D4A84B]">Media</span>
        </h2>
      </Reveal>

      <Reveal delay={200}>
        <p className="mt-6 text-base leading-relaxed text-[#4A4A4A] sm:text-lg">
          A Beijing &amp; UAE-based media studio capturing business, events and
          travel through photography, film and content. One team that plans it,
          shoots it and makes it work for you.
        </p>
      </Reveal>

      <Reveal delay={300}>
        <div className="mt-5 space-y-4">
          <p className="text-base leading-relaxed text-[#4A4A4A] sm:text-lg">
            We work with brands at every stage — from founders building their
            visual identity, to established businesses refreshing their media
            presence and scaling their footprint. Events, campaigns and
            milestones, captured with intention.
          </p>
          <p className="text-base leading-relaxed text-[#4A4A4A] sm:text-lg">
            What sets us apart is our integrated approach: photography,
            videography, graphic design and social content handled in-house by a
            single team. No fragmented briefings. No creative-strategy
            disconnect. Just focused, cohesive media that performs.
          </p>
        </div>
      </Reveal>

      {/* Mission & Vision — matched to the new WhoWeAre style */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {MISSION_VISION.map((item, i) => (
          <Reveal key={item.title} delay={400 + i * 100} direction="up">
            <div className="group relative flex h-full flex-col rounded-2xl border border-[#14110F]/10 bg-white p-6 transition-all duration-300 hover:border-[#D4A84B]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
              <span className="font-serif text-sm italic text-[#D4A84B]">
                {item.n}
              </span>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A84B]">
                {item.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#4A4A4A]">
                {item.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );

  /* ---------------- Right column: loading placeholder ---------------- */
  if (isLoading) {
    return (
      <section
        id="about"
        className="relative overflow-hidden bg-[#FCFBF8] px-6 py-20 sm:py-28"
      >
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
            <LeftContent />

            <div className="relative lg:sticky lg:top-28">
              <div className="relative h-[380px] w-full overflow-hidden rounded-sm border border-[#D4A84B]/20 bg-[#F8F5F0] sm:h-[480px] lg:h-[560px]">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#D4A84B]/20 border-t-[#D4A84B]" />
                    <p className="text-sm text-[#6B6B6B]">Loading images…</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- Right column: no images found ---------------- */
  if (validImages.length === 0) {
    return (
      <section
        id="about"
        className="relative overflow-hidden bg-[#FCFBF8] px-6 py-20 sm:py-28"
      >
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
            <LeftContent />

            <div className="relative lg:sticky lg:top-28">
              <div className="relative h-[380px] w-full overflow-hidden rounded-sm border border-[#D4A84B]/20 bg-[#F8F5F0] sm:h-[480px] lg:h-[560px]">
                <div className="flex h-full items-center justify-center p-8">
                  <div className="text-center">
                    <p className="mb-4 text-6xl text-[#D4A84B]">📸</p>
                    <p className="text-sm text-[#6B6B6B]">No images found</p>
                    <p className="mt-2 text-xs text-[#6B6B6B]">
                      Please add images to /public/events/
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- Full view with carousel ---------------- */
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#FCFBF8] px-6 py-20 sm:py-28"
    >
      {/* Restrained background — matches sibling sections */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-0 h-[480px] w-[480px] rounded-full bg-[#D4A84B]/[0.06] blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#D4A84B 1px, transparent 1px), linear-gradient(90deg, #D4A84B 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
          <LeftContent />

          {/* Right — image carousel */}
          <div className="relative lg:sticky lg:top-28">
            <Reveal direction="right" delay={300}>
              <div className="relative">
                {/* Corner brackets — same framing motif as the new WhoWeAre */}
                <span className="pointer-events-none absolute -left-3 -top-3 h-8 w-8 border-l-2 border-t-2 border-[#D4A84B]/50" />
                <span className="pointer-events-none absolute -right-3 -top-3 h-8 w-8 border-r-2 border-t-2 border-[#D4A84B]/50" />
                <span className="pointer-events-none absolute -bottom-3 -left-3 h-8 w-8 border-b-2 border-l-2 border-[#D4A84B]/50" />
                <span className="pointer-events-none absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-[#D4A84B]/50" />

                <div className="relative h-[380px] w-full overflow-hidden rounded-sm border border-[#D4A84B]/20 sm:h-[480px] lg:h-[560px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={
                          imageErrors[currentIndex]
                            ? FALLBACK_IMAGE
                            : validImages[currentIndex]
                        }
                        alt={`Heavenly Panda Media — event ${currentIndex + 1}`}
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        onError={() => handleImageError(currentIndex)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14110F]/60 via-transparent to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Counter */}
                  <div className="absolute left-5 top-5 font-serif text-xs italic text-[#F3ECDD]">
                    {String(currentIndex + 1).padStart(2, "0")} /{" "}
                    {String(validImages.length).padStart(2, "0")}
                  </div>

                  {/* Prev / Next */}
                  <button
                    onClick={prevImage}
                    aria-label="Previous image"
                    className="group absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#F3ECDD]/30 bg-[#14110F]/30 text-[#F3ECDD] backdrop-blur-sm transition-colors hover:border-[#D4A84B] hover:bg-[#14110F]/60"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="transition-transform group-hover:-translate-x-0.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    aria-label="Next image"
                    className="group absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#F3ECDD]/30 bg-[#14110F]/30 text-[#F3ECDD] backdrop-blur-sm transition-colors hover:border-[#D4A84B] hover:bg-[#14110F]/60"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
                    {validImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to image ${index + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === currentIndex
                            ? "w-6 bg-[#D4A84B]"
                            : "w-1.5 bg-[#F3ECDD]/50 hover:bg-[#F3ECDD]/80"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Values — connected strip matching the new WhoWeAre */}
        <div className="mt-24 border-t border-[#14110F]/10 pt-10">
          <div className="grid divide-y divide-[#14110F]/10 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={500 + i * 100} direction="up">
                <div className="group py-6 sm:px-6 sm:py-0">
                  <span className="font-serif text-sm italic text-[#D4A84B]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-sans text-base font-bold text-[#14110F] transition-colors group-hover:text-[#D4A84B]">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B]">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}