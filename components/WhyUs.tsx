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
    <section className="relative overflow-hidden bg-[#14110F] py-20 text-[#F3ECDD] sm:py-28">
      {/* Ledger grid — quiet, structural */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#D4A84B 1px, transparent 1px), linear-gradient(90deg, #D4A84B 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <Reveal>
          <h2 className="font-sans text-4xl font-bold leading-[1.05] text-[#F3ECDD] sm:text-5xl md:text-6xl">
            How it works
          </h2>
        </Reveal>

        {/* Steps — 4 columns with top rule and gold numbers */}
        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {WHY.slice(0, 4).map((item, index) => (
            <Reveal key={item.title} delay={index * 100}>
              <div ref={index === 0 ? listRef : undefined} className="flex flex-col">
                {/* Top rule */}
                <span className="h-px w-full bg-[#F3ECDD]/15" />

                {/* Number */}
                <span className="mt-6 font-sans text-2xl font-bold text-[#D4A84B] sm:text-3xl">
                  {index + 1}
                </span>

                {/* Title */}
                <h3 className="mt-4 font-sans text-lg font-bold text-[#F3ECDD] sm:text-xl">
                  {item.title}
                </h3>

                {/* Body */}
                <p className="mt-3 text-sm leading-relaxed text-[#F3ECDD]/60 sm:text-base">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}