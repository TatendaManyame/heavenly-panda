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

const HEADLINE = ["Strategy", "Meets", "Creative"];

const STATS = [
  { end: 50, suffix: "+", decimals: 0, label: "Clients" },
  { end: 3, suffix: "", decimals: 0, label: "Countries" },
  { end: 4, suffix: "×", decimals: 0, label: "Growth" },
  { end: 6, suffix: "+", decimals: 0, label: "Years" },
];

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

  const { ref: statsRef, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [startCount, setStartCount] = useState(false);
  useEffect(() => {
    if (inView) setStartCount(true);
  }, [inView]);

  // Auto-rotate background photography
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % BG_IMAGES.length);
    }, ROTATE_MS);
    return () => clearInterval(interval);
  }, []);

  // Gentle Ken-Burns drift tied to scroll — the section's one signature motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden px-6 pb-0 pt-28">
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

        {/* One wash, one glow, one hairline grid — same recipe as every other section */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCFBF8]/95 via-[#FCFBF8]/78 to-[#FCFBF8]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FCFBF8]/40 via-transparent to-[#FCFBF8]/70" />
        <div className="absolute -left-20 top-20 h-[460px] w-[460px] rounded-full bg-[#D4A84B]/[0.07] blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(20,17,15,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(20,17,15,0.15) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Roman-numeral rail — same numbering motif as Why Us / Portfolio, doubling as the image switcher */}
        <div className="absolute bottom-10 right-6 z-10 flex flex-col items-end gap-3 sm:right-10">
          {BG_IMAGES.map((img, index) => (
            <button
              key={img.src}
              onClick={() => setActiveImage(index)}
              className="group flex items-center gap-3"
              aria-label={`Show ${img.alt}`}
            >
              <span
                className={`font-serif text-lg italic transition-colors duration-300 ${
                  activeImage === index ? "text-[#D4A84B]" : "text-[#14110F]/25 group-hover:text-[#14110F]/50"
                }`}
              >
                {ROMAN[index]}
              </span>
              <span
                className={`h-px transition-all duration-500 ${
                  activeImage === index ? "w-8 bg-[#D4A84B]" : "w-4 bg-[#14110F]/20 group-hover:w-6"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-20 mx-auto w-full max-w-7xl">
        <div className="grid items-start gap-16 lg:grid-cols-[1.3fr_1fr]">
          {/* LEFT */}
          <div>
            <Reveal delay={100}>
              <div className="mb-6 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#5E5A55]">
                <span className="h-px w-8 bg-[#D4A84B]/60" />
                Digital Creative &amp; Marketing Business
              </div>
            </Reveal>

            <h1 className="relative font-clash text-[16vw] uppercase leading-[0.85] sm:text-[11vw] lg:text-[6.8vw]">
              {HEADLINE.map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    initial={{ clipPath: "inset(0 0 100% 0)", y: 40 }}
                    animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className={`inline-block font-bold ${
                      i === 2 ? "font-serif italic font-normal text-[#D4A84B]" : "text-[#14110F]"
                    }`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
              <span className="absolute -bottom-4 left-0 h-1 w-20 rounded-full bg-[#D4A84B]" />
            </h1>

            <Reveal delay={400}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-[#5E5A55]">
                We offer media solutions for product, event, and business branding, graphic design, photography, and videography.
              </p>
            </Reveal>

            <RevealGroup stagger={150} delay={500}>
              <div className="mt-10 flex flex-wrap gap-4 font-mono text-sm uppercase tracking-wide">
                <Link
                  href="/contact"
                  className="group relative overflow-hidden bg-[#14110F] px-7 py-4 text-[#F3ECDD] shadow-lg transition-colors hover:text-[#14110F]"
                >
                  <span className="relative z-10">Book a consultation →</span>
                  <span className="absolute inset-0 translate-x-full bg-[#D4A84B] transition-transform duration-300 group-hover:translate-x-0" />
                </Link>

                <Link
                  href="/portfolio"
                  className="border-2 border-[#14110F] px-7 py-4 backdrop-blur-sm transition-colors hover:border-[#D4A84B] hover:bg-white/50 hover:text-[#D4A84B]"
                >
                  See what we do
                </Link>
              </div>
            </RevealGroup>

            <Reveal delay={700}>
              <div ref={statsRef} className="mt-16 flex flex-wrap gap-8 border-t border-[#14110F]/12 pt-7 sm:gap-12">
                {STATS.map((stat) => (
                  <div key={stat.label} className="min-w-[80px] flex-1">
                    <div className="font-clash text-2xl font-bold text-[#14110F] sm:text-3xl">
                      {startCount && (
                        <CountUp end={stat.end} duration={2.5} decimals={stat.decimals} suffix={stat.suffix} preserveValue />
                      )}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#5E5A55] sm:text-xs">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* RIGHT — removed contact form */}
        </div>
      </div>

      {/* Marquee strip — pure CSS loop, no rAF */}
      <Reveal delay={800} className="relative z-20 mt-24">
        <div className="overflow-hidden border-t-2 border-[#14110F] bg-[#14110F] text-[#F3ECDD] shadow-2xl">
          <div className={styles.marqueeTrack}>
            {[0, 1].map((dup) => (
              <div key={dup} className={`flex whitespace-nowrap py-4 ${styles.marqueeContent}`} aria-hidden={dup === 1}>
                {MARQUEE_WORDS.map((w) => (
                  <span key={w} className="mx-6 flex select-none items-center gap-6 font-clash text-2xl uppercase">
                    {w}
                    <span className="font-serif text-base italic text-[#D4A84B]">◆</span>
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