// app/contact/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaArrowRight,
  FaChevronDown,
} from "react-icons/fa";
import { Reveal } from "@/components/Reveal";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const OFFICES = [
  {
    city: "Beijing",
    country: "China",
    lines: ["Beijing, China"],
    phone: "+86 151 1011 9513",
    phoneHref: "tel:+8615110119513",
    image: "/hero2.jpeg",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    lines: ["Dubai South, UAE"],
    phone: "+971 58 518 2101",
    phoneHref: "tel:+971585182101",
    image: "/hero3.jpeg",
  },
];

const SOCIALS = [
  {
    Icon: FaInstagram,
    href: "https://www.instagram.com/heavenlypanda_444?igsh=N2w4Y20zaTJ5d3g1&utm_source=qr",
    label: "Instagram",
  },
  {
    Icon: FaFacebookF,
    href: "https://www.facebook.com/share/17h7gwWtMe/?mibextid=wwXIfr",
    label: "Facebook",
  },
  {
    Icon: FaLinkedinIn,
    href: "https://linkedin.com/company/heavenlypanda-inv?trk=profile-position",
    label: "LinkedIn",
  },
  {
    Icon: FaYoutube,
    href: "https://youtu.be/62KAJlywmgU",
    label: "YouTube",
  },
];

const FAQS = [
  {
    question: "What services does Heavenly Panda offer?",
    answer:
      "We offer a comprehensive range of services including strategy consulting, brand identity design, content creation, social media management, and digital marketing. Our integrated approach ensures all services work together seamlessly to drive growth for your brand.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on scope and complexity. A typical branding project takes 4-8 weeks, while strategy consulting can range from 2-12 weeks. We always provide clear timelines during our initial consultation and keep you updated throughout the process.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes! With studios in Beijing and Dubai, we work with clients globally. Our team is experienced in cross-cultural communication and can adapt to different time zones and business practices. We've successfully served clients across Asia, the Middle East, Europe, and North America.",
  },
  {
    question: "What's your pricing structure?",
    answer:
      "We offer flexible pricing models tailored to each client's needs. This includes project-based fees, retainer agreements, and performance-based structures. We provide detailed proposals with transparent pricing after understanding your specific requirements.",
  },
  {
    question: "Do you offer social media management?",
    answer:
      "Absolutely! Our social media management includes content strategy, content creation, posting, community management, and analytics reporting. We manage platforms including Instagram, LinkedIn, YouTube, Facebook, and more, with strategies tailored to each platform.",
  },
  {
    question: "How do you measure success?",
    answer:
      "We use a combination of metrics depending on your goals. This includes brand awareness metrics (reach, impressions, engagement), conversion metrics (leads, sales), and brand sentiment analysis. We provide regular reports and adjust strategies based on data-driven insights.",
  },
];

const HERO_IMAGES = [
  { src: "/hero2.jpeg", alt: "Heavenly Panda - Strategy" },
  { src: "/hero3.jpeg", alt: "Heavenly Panda - Creative" },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div className="group relative overflow-hidden border-b border-[#D4A84B]/10 last:border-0">
      <button
        onClick={onToggle}
        className="relative z-10 flex w-full items-center justify-between py-5 text-left transition-colors hover:text-[#D4A84B]"
      >
        <span className="flex items-center gap-3 pr-4 font-clash text-base font-medium text-[#14110F] transition-colors group-hover:text-[#D4A84B] sm:text-lg">
          <span className="font-mono text-sm text-[#D4A84B] opacity-50">
            {(index + 1).toString().padStart(2, "0")}
          </span>
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D4A84B]/10 text-[#D4A84B] transition-all duration-300 group-hover:bg-[#D4A84B] group-hover:text-white"
        >
          <FaChevronDown className="h-3 w-3" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5">
              <p className="pl-9 text-sm leading-relaxed text-[#5E5A54] sm:pl-14 sm:text-base">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [activeImage, setActiveImage] = useState(0);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!particlesRef.current) return;
    const container = particlesRef.current;
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      const size = Math.random() * 4 + 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 10;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${["#D4A84B", "#14110F"][Math.floor(Math.random() * 2)]};
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        opacity: ${Math.random() * 0.06 + 0.02};
        animation: float-particle ${duration}s ease-in-out ${delay}s infinite;
        pointer-events: none;
        filter: blur(1px);
      `;

      container.appendChild(particle);
    }

    return () => {
      container.innerHTML = "";
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sent");
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      <main className="relative overflow-hidden bg-[#FCFBF8]">
        {/* Hero with rotating background */}
        <section className="relative overflow-hidden bg-[#14110F] py-20 sm:py-24 md:py-28">
          {/* Rotating Background Images */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="sync">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={HERO_IMAGES[activeImage].src}
                  alt={HERO_IMAGES[activeImage].alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Strong overlays for text visibility */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#14110F]/90 via-[#14110F]/80 to-[#14110F]/92" />
          <div className="absolute inset-0 z-0 bg-[#14110F]/60" />
          
          {/* Decorative glow */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute left-1/2 top-0 h-[420px] w-[600px] -translate-x-1/2 rounded-full bg-[#D4A84B]/[0.10] blur-[160px]" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(212,168,75,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,75,0.15) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />
          </div>

          {/* Image counter/dots */}
          <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {HERO_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeImage === index ? "w-8 bg-[#D4A84B]" : "w-1.5 bg-[#F3ECDD]/30 hover:bg-[#F3ECDD]/60"
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-6">
            <div className="flex flex-col items-center text-center">
              <Reveal>
                <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[#D4A84B]/80">
                  <span className="h-px w-8 bg-[#D4A84B]/50" />
                  Get in Touch
                  <span className="h-px w-8 bg-[#D4A84B]/50" />
                </span>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="mt-6 font-clash text-4xl font-bold leading-[1.1] text-[#F3ECDD] sm:text-5xl md:text-6xl">
                  Let&apos;s create
                  <br />
                  <span className="font-serif italic font-normal text-[#D4A84B]">
                    something remarkable.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#F3ECDD]/80 sm:text-lg">
                  Have a project in mind? We&apos;d love to hear about it.
                  Let&apos;s start a conversation and bring your vision to
                  life.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <div className="flex -space-x-3">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#14110F] shadow-md"
                      >
                        <Image
                          src={`/hero${(i % 2) + 2}.jpeg`}
                          alt=""
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="font-serif text-sm italic text-[#F3ECDD]/70">
                    Trusted by <span className="text-[#D4A84B]">50+</span> happy clients
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Contact content */}
        <section className="relative py-16 sm:py-20">
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
            <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
              {/* Form */}
              <Reveal delay={100}>
                <div
                  id="contact-form"
                  className="rounded-3xl bg-[#14110F] p-8 text-[#F3ECDD] shadow-2xl sm:p-10"
                >
                  {status === "sent" ? (
                    <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                      <span className="font-serif text-4xl italic text-[#D4A84B]">
                        Thank you.
                      </span>
                      <p className="mt-3 max-w-xs text-sm text-[#F3ECDD]/60">
                        We&apos;ve received your message and will reply within
                        one business day.
                      </p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="mt-6 text-sm text-[#D4A84B] transition-colors hover:text-[#F3ECDD]"
                      >
                        Send another message →
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <h2 className="font-clash text-2xl font-semibold">
                          Start a Project
                        </h2>
                        <p className="mt-1 text-sm text-[#F3ECDD]/50">
                          Fill in the form and we&apos;ll get back to you
                          within 24 hours.
                        </p>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label className="text-xs uppercase tracking-[0.2em] text-[#D4A84B]/80">
                            Name *
                          </label>
                          <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="mt-2 w-full border-b border-[#F3ECDD]/20 bg-transparent pb-2 text-[#F3ECDD] outline-none transition-colors placeholder:text-[#F3ECDD]/30 focus:border-[#D4A84B]"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-[0.2em] text-[#D4A84B]/80">
                            Email *
                          </label>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="mt-2 w-full border-b border-[#F3ECDD]/20 bg-transparent pb-2 text-[#F3ECDD] outline-none transition-colors placeholder:text-[#F3ECDD]/30 focus:border-[#D4A84B]"
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-[0.2em] text-[#D4A84B]/80">
                          Company
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          className="mt-2 w-full border-b border-[#F3ECDD]/20 bg-transparent pb-2 text-[#F3ECDD] outline-none transition-colors placeholder:text-[#F3ECDD]/30 focus:border-[#D4A84B]"
                          placeholder="Optional"
                        />
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-[0.2em] text-[#D4A84B]/80">
                          Message *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="mt-2 w-full resize-none border-b border-[#F3ECDD]/20 bg-transparent pb-2 text-[#F3ECDD] outline-none transition-colors placeholder:text-[#F3ECDD]/30 focus:border-[#D4A84B]"
                          placeholder="Tell us about your brand and goals"
                        />
                      </div>

                      <button
                        type="submit"
                        className="group inline-flex items-center gap-2.5 rounded-full bg-[#D4A84B] px-8 py-3.5 text-sm font-semibold text-[#14110F] transition-all duration-300 hover:scale-[1.02] hover:bg-[#F3ECDD]"
                      >
                        Send message
                        <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                      </button>
                    </form>
                  )}
                </div>
              </Reveal>

              {/* Info sidebar */}
              <div className="space-y-10">
                <Reveal delay={150}>
                  <div className="rounded-3xl border border-[#D4A84B]/15 bg-white/60 p-6 shadow-lg backdrop-blur-sm sm:p-8">
                    <h3 className="font-clash text-xl font-semibold text-[#14110F]">
                      Office Locations
                    </h3>
                    <div className="mt-6 space-y-4">
                      {OFFICES.map((office) => (
                        <div
                          key={office.city}
                          className="group flex gap-4 rounded-xl border border-[#D4A84B]/10 bg-white/50 p-4 transition-all duration-300 hover:border-[#D4A84B]/30 hover:shadow-md"
                        >
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src={office.image}
                              alt={office.city}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="64px"
                            />
                          </div>
                          <div>
                            <p className="font-clash text-base font-semibold text-[#14110F]">
                              {office.city}
                            </p>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4A84B]">
                              {office.country}
                            </p>
                            <div className="mt-1 flex items-start gap-2 text-xs text-[#5E5A54]">
                              <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[10px] text-[#D4A84B]/70" />
                              <span>{office.lines.join(", ")}</span>
                            </div>
                            <Link
                              href={office.phoneHref}
                              className="mt-1 flex items-center gap-2 text-xs text-[#5E5A54] transition-colors hover:text-[#D4A84B]"
                            >
                              <FaPhone className="shrink-0 text-[10px] text-[#D4A84B]/70" />
                              {office.phone}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={250}>
                  <div className="rounded-3xl border border-[#D4A84B]/15 bg-white/60 p-6 shadow-lg backdrop-blur-sm sm:p-8">
                    <h3 className="font-clash text-xl font-semibold text-[#14110F]">
                      Get in Touch
                    </h3>
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-[#D4A84B]/5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A84B]/10">
                          <FaEnvelope className="text-sm text-[#D4A84B]" />
                        </div>
                        <div>
                          <p className="text-xs text-[#5E5A54]">Email</p>
                          <Link
                            href="mailto:heavenlypanda44@gmail.com"
                            className="text-sm text-[#14110F] transition-colors hover:text-[#D4A84B]"
                          >
                            heavenlypanda44@gmail.com
                          </Link>
                        </div>
                      </div>

                      {OFFICES.map((office) => (
                        <div
                          key={office.phone}
                          className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-[#D4A84B]/5"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A84B]/10">
                            <FaPhone className="text-sm text-[#D4A84B]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#5E5A54]">{office.city} office</p>
                            <Link
                              href={office.phoneHref}
                              className="text-sm text-[#14110F] transition-colors hover:text-[#D4A84B]"
                            >
                              {office.phone}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={350}>
                  <div className="rounded-3xl border border-[#D4A84B]/15 bg-white/60 p-6 shadow-lg backdrop-blur-sm sm:p-8">
                    <h3 className="font-clash text-xl font-semibold text-[#14110F]">
                      Connect With Us
                    </h3>
                    <p className="mt-2 text-sm text-[#5E5A54]">
                      Follow us on social media for updates and inspiration.
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      {SOCIALS.map(({ Icon, href, label }) => (
                        <Link
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4A84B]/25 text-[#D4A84B] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A84B] hover:bg-[#D4A84B] hover:text-white hover:shadow-lg"
                        >
                          <Icon className="h-4 w-4" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative overflow-hidden bg-[#F8F5F0] py-16 sm:py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-0 h-[500px] w-[500px] rounded-full opacity-[0.03] blur-2xl">
              <Image src="/hero2.jpeg" alt="" fill className="rounded-full object-cover" />
            </div>
            <div className="absolute -right-20 bottom-0 h-[600px] w-[600px] rounded-full opacity-[0.03] blur-2xl">
              <Image src="/hero3.jpeg" alt="" fill className="rounded-full object-cover" />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0">
            <motion.div
              animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-20 top-20 h-[300px] w-[300px] rounded-full bg-[#D4A84B]/5 blur-[100px]"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A84B]/3 blur-[120px]"
            />
          </div>

          <div ref={particlesRef} className="pointer-events-none absolute inset-0" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(20,17,15,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(20,17,15,0.1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-4xl px-6">
            <div className="text-center">
              <Reveal>
                <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[#D4A84B]/80">
                  <span className="h-px w-8 bg-[#D4A84B]/50" />
                  FAQ
                  <span className="h-px w-8 bg-[#D4A84B]/50" />
                </span>
              </Reveal>

              <Reveal delay={100}>
                <h2 className="mt-6 font-clash text-3xl font-bold text-[#14110F] sm:text-4xl md:text-5xl">
                  Frequently asked
                  <br />
                  <span className="font-serif italic font-normal text-[#D4A84B]">
                    questions.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5E5A54] sm:text-lg">
                  Find answers to common questions about our services,
                  process, and how we can help your brand grow.
                </p>
              </Reveal>
            </div>

            <Reveal delay={300}>
              <div className="relative mt-12 overflow-hidden rounded-3xl border border-[#D4A84B]/10 bg-white/80 p-6 shadow-2xl backdrop-blur-md sm:p-8">
                <div className="relative z-10 divide-y divide-[#D4A84B]/10">
                  {FAQS.map((faq, index) => (
                    <FAQItem
                      key={index}
                      index={index}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openFAQ === index}
                      onToggle={() => toggleFAQ(index)}
                    />
                  ))}
                </div>

                <div className="relative z-10 mt-8 text-center">
                  <p className="text-sm text-[#5E5A54]">
                    Still have questions?{" "}
                    <Link
                      href="#contact-form"
                      className="group inline-flex items-center gap-1 font-medium text-[#D4A84B] transition-colors hover:text-[#14110F]"
                    >
                      Contact us directly
                      <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>{" "}
                    and we&apos;ll be happy to help.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes float-particle {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(15px, -20px) scale(1.2);
          }
          50% {
            transform: translate(-10px, -40px) scale(0.8);
          }
          75% {
            transform: translate(10px, -25px) scale(1.1);
          }
        }
      `}</style>
    </>
  );
}