"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { PROCESS } from "@/components/data";

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-[#FCFBF8] py-28 sm:py-36">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[420px] w-[600px] -translate-x-1/2 rounded-full bg-[#D4A84B]/[0.07] blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#D4A84B 1px, transparent 1px), linear-gradient(90deg, #D4A84B 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[#D4A84B]/80">
                <span className="h-px w-8 bg-[#D4A84B]/50" />
                Process
              </span>

              <h2 className="mt-6 font-clash text-4xl font-bold leading-[1.1] text-[#14110F] sm:text-5xl">
                A process built
                <br />
                <span className="font-serif italic font-normal text-[#D4A84B]">
                  for results.
                </span>
              </h2>
            </div>

            <span className="font-serif text-sm italic text-[#5E5A54]/50">
              {PROCESS[0]?.n}–{PROCESS[PROCESS.length - 1]?.n}
            </span>
          </div>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#5E5A54]">
            Every project follows a refined framework designed to keep strategy,
            creativity and execution perfectly aligned from day one.
          </p>
        </Reveal>

        {/* Route */}
        <div className="mt-20 sm:mt-24">
          {PROCESS.map((step, index) => (
            <Reveal key={step.n} delay={index * 120}>
              <div className="group relative flex gap-6 pb-14 last:pb-0 sm:gap-10">
                {/* Marker + connecting line */}
                <div className="relative flex w-4 flex-none flex-col items-center">
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="relative z-10 flex h-4 w-4 flex-none items-center justify-center rounded-full border-[1.5px] border-[#D4A84B] bg-[#FCFBF8] transition-colors duration-300 group-hover:bg-[#D4A84B]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4A84B] transition-colors duration-300 group-hover:bg-[#FCFBF8]" />
                  </motion.span>

                  {index !== PROCESS.length - 1 && (
                    <motion.span
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.7, delay: index * 0.08 + 0.1 }}
                      style={{ transformOrigin: "top" }}
                      className="mt-1 w-px flex-1 bg-[#D4A84B]/25"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-1">
                  <span className="font-serif text-sm italic text-[#D4A84B]">
                    {step.n}
                  </span>
                  <h3 className="mt-2 font-clash text-xl font-semibold text-[#14110F] transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xl leading-7 text-[#5E5A54] transition-transform duration-300 group-hover:translate-x-1">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}