"use client";

import { Reveal, RevealGroup } from "./Reveal";

const MISSION_VISION = [
  {
    n: "01",
    title: "Our Mission",
    text: "To capture moments that can't be re-lived through photography, film and content that help brands, events and people tell their story with clarity and craft.",
  },
  {
    n: "02",
    title: "Our Vision",
    text: "To become the go-to media studio for growing brands and milestone moments across the Middle East and Asia known for work clients are proud to share.",
  },
];

export function WhoWeAre() {
  return (
    <section className="relative overflow-hidden bg-[#FCFBF8] py-20 sm:py-28">
      {/* Background — one restrained glow + fine ledger grid */}
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
        {/* Heading block */}
        <Reveal>
          <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[#D4A84B]/80">
            <span className="h-px w-8 bg-[#D4A84B]/60" />
            Who We Are
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-6 max-w-3xl font-sans text-4xl font-bold leading-[1.05] tracking-tight text-[#14110F] sm:text-5xl md:text-6xl">
            Heavenly Panda{" "}
            <span className="text-[#D4A84B]">Media</span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#4A4A4A] sm:text-lg">
            A Beijing &amp; UAE-based media studio capturing business, events and
            travel through photography, film and content. One team that plans it,
            shoots it and makes it work for you.
          </p>
        </Reveal>

        {/* Two-column editorial block */}
        <div className="mt-16 grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left column — copy */}
          <div>
            <RevealGroup stagger={150} delay={300}>
              <div className="space-y-5">
                <p className="text-base leading-relaxed text-[#4A4A4A] sm:text-lg">
                  We work with brands at every stage from founders building
                  their visual identity, to established businesses refreshing
                  their media presence and scaling their footprint. Events,
                  campaigns and milestones, captured with intention.
                </p>
                <p className="text-base leading-relaxed text-[#4A4A4A] sm:text-lg">
                  What sets us apart is our integrated approach: photography,
                  videography, graphic design and social content handled in-house
                  by a single team. No fragmented briefings. No creative-strategy
                  disconnect. Just focused, cohesive media that performs.
                </p>
              </div>
            </RevealGroup>
          </div>

          {/* Right column — Mission & Vision stacked */}
          <div className="space-y-5">
            {MISSION_VISION.map((item, i) => (
              <Reveal key={item.title} delay={350 + i * 120} direction="up">
                <div className="group relative overflow-hidden rounded-2xl border border-[#14110F]/10 bg-white p-7 transition-all duration-300 hover:border-[#D4A84B]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] sm:p-8">
                  {/* Gold accent bar */}
                  <span className="absolute left-0 top-0 h-full w-1 bg-[#D4A84B] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex items-start justify-between gap-6">
                    <span className="font-serif text-lg italic text-[#D4A84B]">
                      {item.n}
                    </span>
                    <span className="h-px flex-1 self-center bg-[#14110F]/10" />
                  </div>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A84B]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#4A4A4A] sm:text-base">
                    {item.text}
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