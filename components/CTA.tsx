"use client";

import { useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { FaTimes, FaArrowRight, FaArrowLeft } from "react-icons/fa";

// ---------------------------------------------------------------------------
// Consultation Modal
// ---------------------------------------------------------------------------
function ConsultationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showBackConfirm, setShowBackConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ name: "", email: "", company: "", message: "" });
    }, 2200);
  };

  const handleBack = () => {
    const hasContent =
      formData.name || formData.email || formData.company || formData.message;
    if (hasContent) setShowBackConfirm(true);
    else onClose();
  };

  const confirmBack = () => {
    setShowBackConfirm(false);
    setFormData({ name: "", email: "", company: "", message: "" });
    onClose();
  };

  const cancelBack = () => setShowBackConfirm(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[999] bg-[#14110F]/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-title"
          >
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-[#FCFBF8] shadow-2xl ring-1 ring-[#14110F]/5">
              {/* Close */}
              <button
                onClick={handleBack}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#14110F]/5 transition-colors hover:bg-[#14110F]/10 group"
                aria-label="Close modal"
              >
                <FaTimes className="h-4 w-4 text-[#14110F] transition-transform duration-300 group-hover:rotate-90" />
              </button>

              {/* Go back */}
              <button
                onClick={handleBack}
                className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-xs text-[#6B6B6B] transition-colors hover:text-[#14110F] group"
              >
                <FaArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                Go back
              </button>

              {/* Header */}
              <div className="relative overflow-hidden bg-[#14110F] px-8 py-7 pr-16">
                {/* Subtle gold glow */}
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#D4A84B]/20 blur-3xl"
                  aria-hidden="true"
                />
                <h3
                  id="consultation-title"
                  className="relative font-sans text-2xl font-bold text-[#F3ECDD]"
                >
                  Book your consultation
                </h3>
                <p className="relative mt-1 text-sm text-[#F3ECDD]/60">
                  Fill in the details and we&apos;ll get back to you within 24 hours.
                </p>
              </div>

              {/* Body */}
              <div className="px-8 pb-16 pt-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex min-h-[200px] flex-col items-center justify-center text-center"
                  >
                    <div className="mb-4 text-5xl">🎉</div>
                    <h4 className="font-sans text-xl font-bold text-[#14110F]">
                      Thank you
                    </h4>
                    <p className="mt-2 max-w-xs text-sm text-[#4A4A4A]">
                      We&apos;ve received your request. We&apos;ll be in touch within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4A84B]">
                        Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="mt-1 w-full rounded-lg border border-[#14110F]/10 bg-white px-4 py-3 text-[#14110F] outline-none transition-colors placeholder:text-[#6B6B6B]/60 focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4A84B]">
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="mt-1 w-full rounded-lg border border-[#14110F]/10 bg-white px-4 py-3 text-[#14110F] outline-none transition-colors placeholder:text-[#6B6B6B]/60 focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4A84B]">
                        Company
                      </label>
                      <input
                        type="text"
                        placeholder="Optional"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="mt-1 w-full rounded-lg border border-[#14110F]/10 bg-white px-4 py-3 text-[#14110F] outline-none transition-colors placeholder:text-[#6B6B6B]/60 focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4A84B]">
                        Message
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your project or goals…"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="mt-1 w-full resize-none rounded-lg border border-[#14110F]/10 bg-white px-4 py-3 text-[#14110F] outline-none transition-colors placeholder:text-[#6B6B6B]/60 focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20"
                      />
                    </div>

                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#14110F] px-8 py-3.5 text-sm font-semibold text-[#F3ECDD] transition-all duration-300 hover:bg-[#D4A84B] hover:text-[#14110F]"
                    >
                      Request consultation
                      <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </button>

                    <p className="text-center text-xs text-[#6B6B6B]">
                      Free 30-min consultation · No commitment required
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Back confirmation */}
      <AnimatePresence>
        {showBackConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[1001] bg-[#14110F]/60 backdrop-blur-sm"
              onClick={cancelBack}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: "spring", damping: 24, stiffness: 300 }}
              className="fixed inset-0 z-[1002] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full max-w-sm rounded-2xl bg-[#FCFBF8] p-6 text-center shadow-2xl ring-1 ring-[#14110F]/5">
                <div className="mb-4 text-4xl">⚠️</div>
                <h4 className="font-sans text-lg font-bold text-[#14110F]">
                  Leave without saving?
                </h4>
                <p className="mt-2 text-sm text-[#4A4A4A]">
                  You have entered information that will be lost if you leave.
                </p>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={cancelBack}
                    className="flex-1 rounded-full border border-[#14110F]/15 px-4 py-2.5 text-sm font-medium text-[#14110F] transition-colors hover:bg-[#14110F]/5"
                  >
                    Continue filling
                  </button>
                  <button
                    onClick={confirmBack}
                    className="flex-1 rounded-full bg-[#14110F] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#D4A84B] hover:text-[#14110F]"
                  >
                    Leave anyway
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// CTA section
// ---------------------------------------------------------------------------
export function CTA() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <>
      <section
        id="contact"
        className="relative overflow-hidden bg-[#D4A84B] px-6 py-24 sm:py-32"
      >
        {/* Subtle grain/grid for depth */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(20,17,15,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(20,17,15,0.4) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
          aria-hidden="true"
        />
        {/* Soft radial vignette */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(20,17,15,0.12)_100%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
            {/* Left: heading + copy */}
            <Reveal>
              <span className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#14110F]/70">
                <span className="h-px w-8 bg-[#14110F]/40" />
                Let&apos;s talk
              </span>

              <h2 className="mt-6 font-sans text-5xl font-bold leading-[0.95] tracking-[-0.02em] text-[#14110F] sm:text-6xl md:text-7xl">
                Ready to book?
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#14110F]/80 sm:text-xl">
                Message us on WhatsApp to book a package, check a date or ask a
                question. We usually reply within a few hours.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex -space-x-2">
                  {["/hero2.jpeg", "/hero3.jpeg", "/hero5.jpeg"].map((src) => (
                    <div
                      key={src}
                      className="h-9 w-9 overflow-hidden rounded-full border-2 border-[#D4A84B] shadow-sm"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium text-[#14110F]/70">
                  Trusted by <span className="font-bold text-[#14110F]">50+</span> clients
                </span>
              </div>
            </Reveal>

            {/* Right: WhatsApp CTA */}
            <Reveal delay={150}>
              <div className="flex flex-col items-start gap-5 md:items-end">
                {/* Magnetic WhatsApp button */}
                <div
                  ref={buttonRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="inline-block"
                >
                  <motion.a
                    href="https://wa.me/8615110119513"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ x: springX, y: springY }}
                    className="group inline-flex items-center gap-3 rounded-full bg-[#14110F] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#14110F]/20 transition-colors duration-300 hover:bg-[#0a0908]"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Chat on WhatsApp
                  </motion.a>
                </div>

                {/* Phone link */}
                <a
                  href="tel:+8615110119513"
                  className="text-sm font-medium text-[#14110F] underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  +86 151 1011 9513
                </a>

                {/* Secondary — open consultation modal */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-[#14110F]/80 transition-colors hover:text-[#14110F]"
                >
                  Or request a consultation
                  <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}