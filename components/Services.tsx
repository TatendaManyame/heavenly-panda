"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../components/Reveal";
import { SERVICES } from "@/components/data";
import { motion, AnimatePresence } from "framer-motion";

const SERVICE_BG_IMAGES = ["/business-strategy.jpeg", "/hero3.jpeg", "/hero4.jpeg", "/social-media.jpeg"];

export function Services() {
  const [open, setOpen] = useState("01");

  // Map service numbers to their respective pages
  const getServiceLink = (serviceNumber: string) => {
    const links: { [key: string]: string } = {
      "01": "/services/strategy-consulting",
      "02": "/services/brand-identity",
      "03": "/services/content-creation",
      "04": "/services/social-media",
    };
    return links[serviceNumber] || "/services";
  };

  return (
    <section id="services" className="relative overflow-hidden bg-[#14110F] py-20 text-[#F3ECDD] md:py-32">
      {/* Background — one glow, one grid, nothing animated in a loop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#D4A84B]/[0.05] blur-[170px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,168,75,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,75,0.15) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <Reveal>
          <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[#D4A84B]/80">
            <span className="h-px w-8 bg-[#D4A84B]/50" />
            What We Do
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-6 max-w-2xl font-clash text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl">
            Four pillars.
            <br />
            <span className="font-serif italic font-normal text-[#D4A84B]">One vision.</span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#F3ECDD]/60 sm:text-lg">
            From boardroom strategy to digital execution, we unite consulting,
            branding, content production and social media into one seamless
            growth system.
          </p>
        </Reveal>

        {/* Services accordion */}
        <div className="mt-14 border-t border-white/10 sm:mt-20">
          {SERVICES.map((s, i) => {
            const isOpen = open === s.n;
            const serviceLink = getServiceLink(s.n);

            return (
              <Reveal key={s.n} delay={i * 60}>
                <div className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? "" : s.n)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-4 py-6 text-left sm:gap-8 sm:py-8"
                  >
                    <span className="font-serif text-xl italic text-[#D4A84B]/50 sm:text-2xl">
                      {s.n}
                    </span>

                    <span className="flex-1 min-w-0">
                      <span
                        className={`block font-clash text-lg font-semibold transition-colors duration-300 sm:text-2xl ${
                          isOpen ? "text-[#D4A84B]" : "text-[#F3ECDD] group-hover:text-[#D4A84B]"
                        }`}
                      >
                        {s.title}
                      </span>
                      <span className="mt-1 block text-[10px] uppercase tracking-[0.3em] text-[#D4A84B]/60 sm:text-[11px]">
                        {s.tag}
                      </span>
                    </span>

                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xl font-light transition-colors duration-300 sm:h-11 sm:w-11 ${
                        isOpen
                          ? "border-[#D4A84B] bg-[#D4A84B] text-[#14110F]"
                          : "border-[#D4A84B]/25 text-[#D4A84B] group-hover:border-[#D4A84B]/60"
                      }`}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-8 pb-8 sm:pb-10 md:grid-cols-[1.2fr_1fr]">
                          <div>
                            <p className="max-w-xl text-sm leading-7 text-[#F3ECDD]/65 sm:text-base sm:leading-8">
                              {s.body}
                            </p>

                            <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3">
                              {s.items.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5 text-xs text-[#F3ECDD]/70 sm:text-sm"
                                >
                                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A84B]" />
                                  {item}
                                </li>
                              ))}
                            </ul>

                            {/* Learn More Button - Navigates to service page */}
                            <Link
                              href={serviceLink}
                              className="group/cta mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#D4A84B] transition-colors hover:text-[#F3ECDD] sm:mt-8"
                            >
                              Learn more
                              <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                            </Link>
                          </div>

                          <div className="relative hidden h-full min-h-[220px] overflow-hidden rounded-2xl md:block">
                            <Image
                              src={SERVICE_BG_IMAGES[i % SERVICE_BG_IMAGES.length]}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 40vw, 300px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#14110F]/70 via-[#14110F]/10 to-transparent" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom CTA - Navigates to contact page */}
        <Reveal delay={300}>
          <div className="mt-16 flex flex-col items-center gap-6 rounded-2xl border border-[#D4A84B]/15 bg-white/[0.02] p-8 text-center sm:mt-20 sm:flex-row sm:justify-between sm:p-10 sm:text-left">
            <p className="font-clash text-lg text-[#F3ECDD] sm:text-xl">
              Ready to transform your brand?
            </p>
            <Link
              href="/contact"
              className="whitespace-nowrap rounded-full bg-[#D4A84B] px-7 py-3.5 text-sm font-semibold text-[#14110F] transition-colors duration-300 hover:bg-[#F3ECDD] sm:px-8 sm:py-4 hover:scale-[1.02] transform transition-all"
            >
              Start your journey
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}