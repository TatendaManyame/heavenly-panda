"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../components/Reveal";
import { SERVICES } from "@/components/data";

const SERVICE_BG_IMAGES = [
  "/business-strategy.jpeg",
  "/hero3.jpeg",
  "/hero4.jpeg",
  "/social-media.jpeg",
];

export function Services() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#F5F4F0] py-20 text-[#14110F] md:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <h2 className="font-sans text-4xl font-bold tracking-tight text-[#14110F] sm:text-5xl md:text-6xl">
                What we do
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="mt-4 text-base text-[#4A4A4A] sm:text-lg">
                Pick one service or combine them.
              </p>
            </Reveal>
          </div>

          {/* Desktop scroll arrows */}
          <Reveal delay={150}>
            <div className="hidden items-center gap-3 sm:flex">
              <button
                type="button"
                onClick={() => scrollByAmount("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll services left"
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  canScrollLeft
                    ? "border-[#14110F] text-[#14110F] hover:bg-[#14110F] hover:text-[#F3ECDD]"
                    : "border-[#14110F]/15 text-[#14110F]/25 cursor-not-allowed"
                }`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => scrollByAmount("right")}
                disabled={!canScrollRight}
                aria-label="Scroll services right"
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  canScrollRight
                    ? "border-[#14110F] text-[#14110F] hover:bg-[#14110F] hover:text-[#F3ECDD]"
                    : "border-[#14110F]/15 text-[#14110F]/25 cursor-not-allowed"
                }`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Horizontal scrolling rail */}
        <Reveal delay={200}>
          <div className="relative mt-14">
            {/* Edge fade gradients for premium feel */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#F5F4F0] to-transparent sm:w-12" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#F5F4F0] to-transparent sm:w-12" />

            <div
              ref={scrollRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {SERVICES.map((s, i) => {
                const serviceLink = getServiceLink(s.n);

                return (
                  <div
                    key={s.n}
                    data-card
                    className="group flex w-[80vw] shrink-0 snap-start flex-col rounded-3xl bg-white p-7 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.09)] sm:w-[340px] lg:w-[360px]"
                  >
                    {/* Number label */}
                    <span className="text-xs font-medium tracking-widest text-[#D4A84B]">
                      {s.n}
                    </span>

                    {/* Title */}
                    <h3 className="mt-4 font-clash text-xl font-bold leading-tight text-[#14110F] sm:text-2xl">
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4A4A4A]">
                      {s.body}
                    </p>

                    {/* Inquire button */}
                    <Link
                      href={serviceLink}
                      className="mt-6 inline-flex items-center justify-center rounded-full border-2 border-[#14110F] px-6 py-3 text-sm font-semibold text-[#14110F] transition-colors duration-300 hover:bg-[#14110F] hover:text-[#F3ECDD]"
                    >
                      Inquire
                    </Link>
                  </div>
                );
              })}

              {/* End spacer for breathing room */}
              <div className="w-2 shrink-0" aria-hidden="true" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}