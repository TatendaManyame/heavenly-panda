"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, RevealGroup } from "./Reveal";

const VALUES = [
  {
    title: "Strategic Excellence",
    body: "We combine deep business strategy with creative execution to deliver measurable results.",
  },
  {
    title: "Innovation First",
    body: "Embracing cutting-edge approaches and technologies to keep our clients ahead of the curve.",
  },
  {
    title: "Global Perspective",
    body: "Bridging markets across Beijing, UAE, and beyond with culturally intelligent solutions.",
  },
  {
    title: "Results Driven",
    body: "Focused on delivering tangible outcomes that grow your brand and bottom line.",
  },
];

const MISSION_VISION = [
  {
    n: "01",
    title: "Our Mission",
    text: "To create impactful business and creative solutions that resonate with target audiences, elevating brands through strategic thinking and creative excellence.",
  },
  {
    n: "02",
    title: "Our Vision",
    text: "To become the leading integrated consultancy for growing brands across the Middle East and Asia — known for delivering measurable results through strategy and creativity.",
  },
];

export function WhoWeAre() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ["/hero2.jpeg", "/hero3.jpeg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative overflow-hidden bg-[#FCFBF8] py-28 sm:py-36">
      {/* Background — one restrained glow + fine ledger grid, matching sibling sections */}
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

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left column */}
          <div>
            <Reveal delay={100}>
              <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[#D4A84B]/80">
                <span className="h-px w-8 bg-[#D4A84B]/60" />
                Who We Are
              </span>
            </Reveal>

            <Reveal delay={200}>
              <h2 className="mt-6 font-clash text-4xl font-bold leading-[1.1] text-[#14110F] sm:text-5xl">
                Heavenly Panda
                <br />
                <span className="font-serif italic font-normal text-[#D4A84B]">
                  Consulting
                </span>
              </h2>
            </Reveal>

            <RevealGroup stagger={150} delay={300}>
              <div className="mt-6 space-y-4">
                <p className="text-lg leading-relaxed text-[#5E5A54]">
                  A Beijing &amp; UAE-based business consultancy and creative agency
                  that bridges strategic thinking with creative execution. We work
                  with brands at every stage — from startups mapping their market
                  entry to established businesses refreshing their digital presence
                  and scaling their footprint.
                </p>
                <p className="text-lg leading-relaxed text-[#5E5A54]">
                  What sets us apart is our integrated model: strategy, content
                  creation, and social media management handled in-house by a
                  single team, aligned on your goals. No fragmented briefings. No
                  creative-strategy disconnect. Just focused, cohesive work that
                  performs.
                </p>
              </div>
            </RevealGroup>

            {/* Mission & Vision */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {MISSION_VISION.map((item, i) => (
                <Reveal key={item.title} delay={400 + i * 100} direction="up">
                  <div className="group relative rounded-2xl border border-[#D4A84B]/15 bg-white/60 p-6 transition-colors duration-300 hover:border-[#D4A84B]/35">
                    <span className="font-serif text-sm italic text-[#D4A84B]/60">
                      {item.n}
                    </span>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A84B]">
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#4A4A4A]">
                      {item.text}
                    </p>
                    <div className="mt-5 h-px w-8 bg-[#D4A84B]/40 transition-all duration-300 group-hover:w-full" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right — image carousel */}
          <div className="relative lg:sticky lg:top-28">
            <Reveal direction="right" delay={300}>
              <div className="relative">
                {/* Corner brackets — frame, not a card */}
                <span className="pointer-events-none absolute -left-3 -top-3 h-8 w-8 border-l-2 border-t-2 border-[#D4A84B]/50" />
                <span className="pointer-events-none absolute -right-3 -top-3 h-8 w-8 border-r-2 border-t-2 border-[#D4A84B]/50" />
                <span className="pointer-events-none absolute -bottom-3 -left-3 h-8 w-8 border-b-2 border-l-2 border-[#D4A84B]/50" />
                <span className="pointer-events-none absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-[#D4A84B]/50" />

                <div className="relative h-[380px] w-full overflow-hidden rounded-sm border border-[#D4A84B]/20 sm:h-[480px] lg:h-[560px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImage}
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={images[currentImage]}
                        alt={`Heavenly Panda Consulting ${currentImage + 1}`}
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14110F]/60 via-transparent to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Counter */}
                  <div className="absolute left-5 top-5 font-serif text-xs italic text-[#F3ECDD]">
                    {String(currentImage + 1).padStart(2, "0")} /{" "}
                    {String(images.length).padStart(2, "0")}
                  </div>

                  {/* Prev / next */}
                  <button
                    onClick={() =>
                      setCurrentImage((p) => (p - 1 + images.length) % images.length)
                    }
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
                    onClick={() => setCurrentImage((p) => (p + 1) % images.length)}
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
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        aria-label={`Go to image ${index + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === currentImage
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

        {/* Values — a connected strip, not a fourth card grid */}
        <div className="mt-24 border-t border-[#D4A84B]/15 pt-10">
          <div className="grid divide-y divide-[#D4A84B]/10 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={500 + i * 100} direction="up">
                <div className="group py-6 sm:px-6 sm:py-0">
                  <span className="font-serif text-sm italic text-[#D4A84B]/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-clash text-base font-semibold text-[#14110F] transition-colors group-hover:text-[#D4A84B]">
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