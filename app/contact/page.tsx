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
      "We offer a comprehensive range of media services including business strategy, graphic design, photography & video, and social media management. Our integrated approach ensures all services work together seamlessly to capture and share your story.",
  },
  {
    question: "How long does a typical shoot take?",
    answer:
      "Shoot lengths vary by package and scope. Standard studio shoots run 1 hour, while events and full-day coverage can run 4–8 hours. We always confirm timelines and delivery windows before your shoot date.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes! With studios in Beijing and Dubai, we work with clients globally. Our team is experienced in cross-cultural communication and can adapt to different time zones and business practices. We've served clients across Asia, the Middle East, Europe, and North America.",
  },
  {
    question: "What's your pricing structure?",
    answer:
      "We offer transparent, fixed-price packages for photography, events and social content. Custom work is quoted per brief. A 50% deposit secures your date, and the balance is due on or before the shoot day.",
  },
  {
    question: "How do we book?",
    answer:
      "Message us on WhatsApp with the package you're interested in and a preferred date. We'll confirm availability, send a quote and deposit details, and lock in your booking once the deposit is received.",
  },
  {
    question: "What's not included?",
    answer:
      "Unless listed in your package: make-up, props, venue hire, music licences, permits and ad spend. We're happy to help coordinate these on request.",
  },
];

const HERO_IMAGES = [
  { src: "/hero2.jpeg", alt: "Heavenly Panda — strategy" },
  { src: "/hero3.jpeg", alt: "Heavenly Panda — creative" },
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
    <div className="group relative overflow-hidden border-b border-[#14110F]/10 last:border-0">
      <button
        onClick={onToggle}
        className="relative z-10 flex w-full items-center justify-between py-5 text-left transition-colors"
      >
        <span className="flex items-center gap-3 pr-4 font-sans text-base font-bold text-[#14110F] transition-colors group-hover:text-[#D4A84B] sm:text-lg">
          <span className="font-serif text-sm italic text-[#D4A84B]">
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
              <p className="pl-9 text-sm leading-relaxed text-[#4A4A4A] sm:pl-14 sm:text-base">
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
    const particleCount = 30;

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
        <section className="relative overflow-hidden bg-[#14110F] py-24 sm:py-28 md:py-32">
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

          {/* Overlays for text visibility */}
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

          {/* Image dots */}
          <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {HERO_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeImage === index
                    ? "w-8 bg-[#D4A84B]"
                    : "w-1.5 bg-[#F3ECDD]/30 hover:bg-[#F3ECDD]/60"
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
                <h1 className="mt-6 font-sans text-4xl font-bold leading-[1.05] tracking-tight text-[#F3ECDD] sm:text-5xl md:text-6xl">
                  Let&apos;s create
                  <br />
                  <span className="text-[#D4A84B]">something remarkable.</span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#F3ECDD]/80 sm:text-lg">
                  Have a project in mind? We&apos;d love to hear about it.
                  Let&apos;s start a conversation and bring your vision to life.
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
        <section className="relative py-20 sm:py-28">
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
            <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
              {/* Form */}
              <Reveal delay={100}>
                <div
                  id="contact-form"
                  className="rounded-2xl border border-[#14110F]/10 bg-white p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] sm:p-10"
                >
                  {status === "sent" ? (
                    <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                      <span className="font-sans text-3xl font-bold text-[#14110F]">
                        Thank you.
                      </span>
                      <p className="mt-3 max-w-xs text-sm text-[#4A4A4A]">
                        We&apos;ve received your message and will reply within
                        one business day.
                      </p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="mt-6 text-sm font-medium text-[#D4A84B] transition-colors hover:text-[#14110F]"
                      >
                        Send another message →
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <h2 className="font-sans text-2xl font-bold text-[#14110F]">
                          Start a project
                        </h2>
                        <p className="mt-1 text-sm text-[#4A4A4A]">
                          Fill in the form and we&apos;ll get back to you
                          within 24 hours.
                        </p>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4A84B]">
                            Name *
                          </label>
                          <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="mt-2 w-full rounded-lg border border-[#14110F]/10 bg-white px-4 py-3 text-[#14110F] outline-none transition-colors placeholder:text-[#6B6B6B]/60 focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4A84B]">
                            Email *
                          </label>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="mt-2 w-full rounded-lg border border-[#14110F]/10 bg-white px-4 py-3 text-[#14110F] outline-none transition-colors placeholder:text-[#6B6B6B]/60 focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20"
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4A84B]">
                          Company
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          className="mt-2 w-full rounded-lg border border-[#14110F]/10 bg-white px-4 py-3 text-[#14110F] outline-none transition-colors placeholder:text-[#6B6B6B]/60 focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20"
                          placeholder="Optional"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4A84B]">
                          Message *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="mt-2 w-full resize-none rounded-lg border border-[#14110F]/10 bg-white px-4 py-3 text-[#14110F] outline-none transition-colors placeholder:text-[#6B6B6B]/60 focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20"
                          placeholder="Tell us about your shoot, event or goals"
                        />
                      </div>

                      <button
                        type="submit"
                        className="group inline-flex items-center gap-2.5 rounded-full bg-[#14110F] px-8 py-3.5 text-sm font-semibold text-[#F3ECDD] transition-colors duration-300 hover:bg-[#D4A84B] hover:text-[#14110F]"
                      >
                        Send message
                        <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                      </button>
                    </form>
                  )}
                </div>
              </Reveal>

              {/* Info sidebar */}
              <div className="space-y-6">
                {/* Offices */}
                <Reveal delay={150}>
                  <div className="rounded-2xl border border-[#14110F]/10 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] sm:p-8">
                    <h3 className="font-sans text-lg font-bold text-[#14110F]">
                      Office locations
                    </h3>
                    <div className="mt-6 space-y-3">
                      {OFFICES.map((office) => (
                        <div
                          key={office.city}
                          className="group flex gap-4 rounded-xl border border-[#14110F]/10 bg-white p-4 transition-all duration-300 hover:border-[#D4A84B]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
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
                            <p className="font-sans text-base font-bold text-[#14110F]">
                              {office.city}
                            </p>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4A84B]">
                              {office.country}
                            </p>
                            <div className="mt-1 flex items-start gap-2 text-xs text-[#4A4A4A]">
                              <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[10px] text-[#D4A84B]" />
                              <span>{office.lines.join(", ")}</span>
                            </div>
                            <Link
                              href={office.phoneHref}
                              className="mt-1 flex items-center gap-2 text-xs text-[#4A4A4A] transition-colors hover:text-[#D4A84B]"
                            >
                              <FaPhone className="shrink-0 text-[10px] text-[#D4A84B]" />
                              {office.phone}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Contact */}
                <Reveal delay={250}>
                  <div className="rounded-2xl border border-[#14110F]/10 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] sm:p-8">
                    <h3 className="font-sans text-lg font-bold text-[#14110F]">
                      Get in touch
                    </h3>
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-[#D4A84B]/5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A84B]/10">
                          <FaEnvelope className="text-sm text-[#D4A84B]" />
                        </div>
                        <div>
                          <p className="text-xs text-[#4A4A4A]">Email</p>
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
                            <p className="text-xs text-[#4A4A4A]">
                              {office.city} office
                            </p>
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

                {/* Socials */}
                <Reveal delay={350}>
                  <div className="rounded-2xl border border-[#14110F]/10 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] sm:p-8">
                    <h3 className="font-sans text-lg font-bold text-[#14110F]">
                      Connect with us
                    </h3>
                    <p className="mt-2 text-sm text-[#4A4A4A]">
                      Follow along for recent work, behind-the-scenes and updates.
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      {SOCIALS.map(({ Icon, href, label }) => (
                        <Link
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4A84B]/30 text-[#D4A84B] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A84B] hover:bg-[#D4A84B] hover:text-white hover:shadow-lg"
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
        <section className="relative overflow-hidden bg-[#FCFBF8] py-20 sm:py-28">
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

          <div ref={particlesRef} className="pointer-events-none absolute inset-0" />

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
                <h2 className="mt-6 font-sans text-4xl font-bold leading-[1.05] tracking-tight text-[#14110F] sm:text-5xl md:text-6xl">
                  Frequently asked questions.
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#4A4A4A] sm:text-lg">
                  Find answers to common questions about our services, process,
                  and how we can help your brand grow.
                </p>
              </Reveal>
            </div>

            <Reveal delay={300}>
              <div className="relative mt-14 rounded-2xl border border-[#14110F]/10 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] sm:p-8">
                <div className="relative z-10 divide-y divide-[#14110F]/10">
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
                  <p className="text-sm text-[#4A4A4A]">
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