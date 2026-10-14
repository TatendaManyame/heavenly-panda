"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Reveal, RevealGroup } from "./Reveal";
import styles from "./Hero.module.css";

const CountUp = dynamic(() => import("react-countup"), { ssr: false });

const MARQUEE_WORDS = [
  "Integrated",
  "Strategic",
  "Transparent",
  "Scalable",
  "Creative",
  "Business-First",
];

const HEADLINE = ["Capturing", "Moments", "That Can't Be Re-lived."];

const BG_IMAGES = [
  { src: "/hero2.jpeg", alt: "Heavenly Panda — strategy" },
  { src: "/hero3.jpeg", alt: "Heavenly Panda — creative" },
  { src: "/hero5.jpeg", alt: "Heavenly Panda — vision" },
];

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];
const ROTATE_MS = 6000;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeImage, setActiveImage] = useState(0);

  // Auto-rotate background photography
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % BG_IMAGES.length);
    }, ROTATE_MS);
    return () => clearInterval(interval);
  }, []);

  // Gentle Ken-Burns drift tied to scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#FCFBF8] px-6 pb-0 pt-28 md:pt-32"
    >
      {/* Background photography */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
              <Image
                src={BG_IMAGES[activeImage].src}
                alt={BG_IMAGES[activeImage].alt}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Cream wash so text reads cleanly */}
        <div className="absolute inset-0 bg-[#FCFBF8]/88" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCFBF8]/85 via-[#FCFBF8]/75 to-[#FCFBF8]/95" />

        {/* Roman-numeral rail — image switcher */}
        <div className="pointer-events-auto absolute bottom-10 right-6 z-10 flex flex-col items-end gap-3 sm:right-10">
          {BG_IMAGES.map((img, index) => (
            <button
              key={img.src}
              onClick={() => setActiveImage(index)}
              className="group flex items-center gap-3"
              aria-label={`Show ${img.alt}`}
            >
              <span
                className={`font-serif text-lg italic transition-colors duration-300 ${
                  activeImage === index
                    ? "text-[#D4A84B]"
                    : "text-[#14110F]/25 group-hover:text-[#14110F]/50"
                }`}
              >
                {ROMAN[index]}
              </span>
              <span
                className={`h-px transition-all duration-500 ${
                  activeImage === index
                    ? "w-8 bg-[#D4A84B]"
                    : "w-4 bg-[#14110F]/20 group-hover:w-6"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-20 mx-auto w-full max-w-7xl">
        {/* HEADLINE — clean, modern */}
        <h1 className="font-sans text-4xl font-bold uppercase leading-[1.05] tracking-[-0.02em] text-[#14110F] sm:text-5xl md:text-6xl lg:text-7xl">
          {HEADLINE.map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* SUBTEXT */}
        <Reveal delay={400}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-[#5E5A55] sm:text-lg">
            Multi-disciplinary media solutions for business, events and travel.
            Branding, marketing, design, content and visuals from one team that
            plans it, shoots it and makes it work for you. Returning clients know
            what to expect. New clients get clear packages, honest timelines and
            work they&apos;ll be proud to share.
          </p>
        </Reveal>

        {/* CTA BUTTONS — pill style */}
        <RevealGroup stagger={150} delay={500}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[#D4A84B] px-6 py-3.5 text-sm font-semibold text-[#14110F] transition-colors duration-300 hover:bg-[#c1973f]"
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
                aria-hidden="true"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Message us on WhatsApp
            </Link>

            <Link
              href="/portfolio"
              className="inline-flex items-center rounded-full border-2 border-[#14110F] bg-transparent px-6 py-3.5 text-sm font-semibold text-[#14110F] transition-colors duration-300 hover:bg-[#14110F] hover:text-[#F3ECDD]"
            >
              See packages
            </Link>
          </div>
        </RevealGroup>
      </div>

      {/* Marquee strip */}
      <Reveal delay={800} className="relative z-20 mt-24">
        <div className="overflow-hidden border-t-2 border-[#14110F] bg-[#14110F] text-[#F3ECDD] shadow-2xl">
          <div className={styles.marqueeTrack}>
            {[0, 1].map((dup) => (
              <div
                key={dup}
                className={`flex whitespace-nowrap py-4 ${styles.marqueeContent}`}
                aria-hidden={dup === 1}
              >
                {MARQUEE_WORDS.map((w) => (
                  <span
                    key={w}
                    className="mx-6 flex select-none items-center gap-6 font-clash text-2xl uppercase"
                  >
                    {w}
                    <span className="font-serif text-base italic text-[#D4A84B]">
                      ◆
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}