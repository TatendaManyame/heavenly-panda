"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { WHY } from "@/components/data";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const RADIUS = 36;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function WhyUs() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.7", "end 0.3"],
  });

  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const dashOffset = useTransform(scrollYProgress, [0, 1], [CIRCUMFERENCE, 0]);

  return (
    <section className="relative overflow-hidden bg-[#1A1A1A] py-32 text-[#F3ECDD]">
      {/* Ledger grid — quiet, structural, not decorative glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#D4A84B 1px, transparent 1px), linear-gradient(90deg, #D4A84B 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Single restrained glow, anchored to the emblem, not roaming */}
      <div className="pointer-events-none absolute left-[4%] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#D4A84B]/[0.06] blur-[160px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[#D4A84B]/80">
            <span className="h-px w-8 bg-[#D4A84B]/50" />
            Why Heavenly Panda
          </span>

          <h2 className="mt-6 max-w-2xl font-clash text-5xl font-bold leading-[1.1]">
            Creative &amp; strategic.
            <br />
            <span className="font-serif text-[#D4A84B] font-normal italic">
              Never one without the other.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#F3ECDD]/60">
            We combine business thinking with exceptional creative execution,
            helping ambitious brands stand out and scale confidently.
          </p>
        </Reveal>

        <div className="mt-24 grid gap-16 md:grid-cols-[220px_1fr]">
          {/* Sticky emblem — fills as you move through the list */}
          <div className="relative hidden md:block">
            <div className="sticky top-32 flex flex-col items-start gap-8">
              <svg width="96" height="96" viewBox="0 0 96 96" className="overflow-visible">
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  fill="none"
                  stroke="#D4A84B"
                  strokeOpacity="0.15"
                  strokeWidth="1"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r={RADIUS}
                  fill="none"
                  stroke="#D4A84B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  style={{
                    strokeDashoffset: dashOffset,
                    rotate: -90,
                    transformOrigin: "48px 48px",
                  }}
                />
                <motion.g style={{ rotate: ringRotate, transformOrigin: "48px 48px" }}>
                  <rect x="46" y="6" width="4" height="4" fill="#D4A84B" transform="rotate(45 48 8)" />
                </motion.g>
                <text
                  x="48"
                  y="53"
                  textAnchor="middle"
                  fill="#D4A84B"
                  fontFamily="serif"
                  fontStyle="italic"
                  style={{ fontSize: 13, letterSpacing: 1 }}
                >
                  HP
                </text>
              </svg>
              <p className="max-w-[180px] text-xs leading-6 text-[#F3ECDD]/40">
                Four principles, one practice — read top to bottom.
              </p>
            </div>
          </div>

          {/* Manifesto list */}
          <div
            ref={listRef}
            className="divide-y divide-[#F3ECDD]/10 border-t border-[#F3ECDD]/10"
          >
            {WHY.map((item, index) => (
              <Reveal key={item.title} delay={index * 100}>
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="group relative grid grid-cols-[auto_1fr] gap-6 py-10 sm:gap-10"
                >
                  <motion.span
                    variants={{
                      rest: { color: "rgba(243,236,221,0.25)" },
                      hover: { color: "#D4A84B" },
                    }}
                    transition={{ duration: 0.4 }}
                    className="font-serif text-3xl italic"
                  >
                    {ROMAN[index] ?? index + 1}
                  </motion.span>

                  <div>
                    <motion.div
                      variants={{ rest: { width: 0 }, hover: { width: "3rem" } }}
                      transition={{ duration: 0.4 }}
                      className="mb-4 h-px bg-[#D4A84B]"
                    />
                    <motion.h3
                      variants={{ rest: { x: 0 }, hover: { x: 8 } }}
                      transition={{ duration: 0.35 }}
                      className="font-clash text-2xl font-semibold"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      variants={{ rest: { x: 0 }, hover: { x: 8 } }}
                      transition={{ duration: 0.35, delay: 0.02 }}
                      className="mt-3 max-w-xl leading-7 text-[#F3ECDD]/60"
                    >
                      {item.body}
                    </motion.p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}