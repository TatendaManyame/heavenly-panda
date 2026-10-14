"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const CATEGORIES = ["Photography", "Weddings", "Content creation", "Marketing & branding"];

const PACKAGES = {
  Photography: [
    {
      title: "Standard",
      subtitle: "Home studio, Dubai South",
      features: [
        "1 hour shoot, one location",
        "10 fully edited images plus the rest unedited",
        "Choice of backdrops, up to 3 outfits",
        "1 round of revisions",
        "Delivery within 5 days",
        "Digital mini-magazine",
      ],
      notIncluded: "Props, location scouting, RAW files, make-up",
    },
    {
      title: "Silver",
      subtitle: "On location",
      features: [
        "2 hour shoot, one location in Dubai",
        "20 fully edited images",
        "Behind-the-scenes snippets",
        "Digital album (video)",
        "2 rounds of revisions",
        "Delivery within 3 days",
      ],
      notIncluded: "Make-up, props and styling, music licences",
    },
    {
      title: "Party / Event",
      subtitle: "Minimum 3 hours",
      features: [
        "100–300 edited images, by duration",
        "60–90 sec highlight video for Instagram & TikTok",
        "RAW files included",
        "2 rounds of revisions",
        "Delivery in 2–5 days",
      ],
      notIncluded: "Make-up, props, studio space",
    },
    {
      title: "Event · 4 hours",
      subtitle: "Half day",
      features: [
        "4 hours of coverage",
        "100–200 fully edited images",
        "1–3 min highlight video",
        "2 rounds of revisions",
        "Delivery in 3–5 days",
      ],
      notIncluded: "Make-up, props, studio space",
    },
    {
      title: "Event · 6 hours",
      subtitle: "Extended",
      features: [
        "6 hours of coverage",
        "200–300 fully edited images",
        "1–3 min highlight video",
        "2 rounds of revisions",
        "Delivery in 3–5 days",
      ],
      notIncluded: "Make-up, props, studio space",
    },
    {
      title: "Event · 8 hours",
      subtitle: "Full day",
      features: [
        "Full-day coverage",
        "300–400 fully edited images",
        "1–3 min highlight video",
        "Same-day social teaser",
        "Delivery in 3–5 days",
      ],
      notIncluded: "Make-up, props, studio space",
    },
  ],
  Weddings: [],
  "Content creation": [],
  "Marketing & branding": [],
};

const FOOTER_NOTES = [
  {
    title: "50% deposit",
    body: "Confirms your booking. Balance due on or before the shoot day.",
  },
  {
    title: "Ways to pay",
    body: "Bank transfer, Alipay, Ecocash, Remitly, or cash with a written receipt.",
  },
  {
    title: "Rescheduling",
    body: "Move once for free with 30+ days notice. Deposits are non-refundable.",
  },
  {
    title: "Not included",
    body: "Make-up, props, venue hire, music licences, permits and ad spend, unless listed.",
  },
];

export function Process() {
  const [activeCategory, setActiveCategory] = useState("Photography");

  const packages = PACKAGES[activeCategory as keyof typeof PACKAGES] || [];

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[#FCFBF8] py-20 text-[#14110F] md:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
          <h2 className="font-sans text-5xl font-bold tracking-tight text-[#14110F] sm:text-6xl md:text-7xl">
            Packages
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4A4A4A] sm:text-lg">
            Choose a package, then message us on WhatsApp for a quote and
            availability. A 50% deposit secures your date.
          </p>
        </Reveal>

        {/* Category tabs */}
        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[#14110F] text-[#FCFBF8]"
                      : "border border-[#14110F]/15 bg-transparent text-[#14110F] hover:border-[#14110F]/40"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Package grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.title} delay={i * 80}>
              <div className="flex h-full flex-col rounded-3xl border border-[#14110F]/10 bg-white p-8 shadow-[0_2px_20px_rgba(0,0,0,0.03)] transition-shadow duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.07)]">
                {/* Title + subtitle */}
                <h3 className="font-sans text-2xl font-bold text-[#14110F]">
                  {pkg.title}
                </h3>
                <p className="mt-1 text-sm text-[#6B6B6B]">{pkg.subtitle}</p>

                {/* Features */}
                <ul className="mt-6 flex-1 space-y-3">
                  {pkg.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[#14110F]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A84B]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Not included note */}
                {pkg.notIncluded && (
                  <p className="mt-6 text-xs leading-relaxed text-[#6B6B6B]">
                    Not included: {pkg.notIncluded}
                  </p>
                )}

                {/* Inquire button */}
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-[#14110F] px-6 py-4 text-sm font-semibold text-[#FCFBF8] transition-colors duration-300 hover:bg-[#D4A84B] hover:text-[#14110F]"
                >
                  Inquire
                </Link>
              </div>
            </Reveal>
          ))}

          {/* Empty state for categories without packages yet */}
          {packages.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-[#14110F]/15 bg-white/50 p-12 text-center">
              <p className="text-base text-[#6B6B6B]">
                Packages for <strong>{activeCategory}</strong> coming soon.
                Message us on WhatsApp for a custom quote.
              </p>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <Reveal delay={300}>
          <div className="mt-20 grid grid-cols-1 gap-8 border-t border-[#14110F]/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_NOTES.map((note) => (
              <div key={note.title}>
                <h4 className="text-base font-bold text-[#14110F]">
                  {note.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#4A4A4A]">
                  {note.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}