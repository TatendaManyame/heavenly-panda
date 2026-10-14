"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { FaTimes, FaArrowRight, FaArrowLeft } from "react-icons/fa";

const TRUST = [
  "Free 30-min consultation",
  "No commitment required",
  "Strategy-first approach",
];

// Modal Form Component
function ConsultationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [showBackConfirm, setShowBackConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ name: "", email: "", company: "", message: "" });
    }, 2000);
  };

  const handleBack = () => {
    const hasContent =
      formData.name || formData.email || formData.company || formData.message;

    if (hasContent) {
      setShowBackConfirm(true);
    } else {
      onClose();
    }
  };

  const confirmBack = () => {
    setShowBackConfirm(false);
    setFormData({ name: "", email: "", company: "", message: "" });
    onClose();
  };

  const cancelBack = () => {
    setShowBackConfirm(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[999] bg-[#14110F]/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-lg rounded-2xl bg-[#FCFBF8] shadow-2xl overflow-hidden">
              <button
                onClick={handleBack}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#14110F]/5 hover:bg-[#14110F]/10 transition-colors group"
                aria-label="Close modal"
              >
                <FaTimes className="h-4 w-4 text-[#14110F] group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <button
                onClick={handleBack}
                className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-xs text-[#6B6B6B] hover:text-[#14110F] transition-colors group"
              >
                <FaArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </button>

              <div className="bg-[#14110F] px-8 py-6 pr-16">
                <h3 className="font-clash text-2xl font-semibold text-[#F3ECDD]">
                  Book Your Consultation
                </h3>
                <p className="mt-1 text-sm text-[#F3ECDD]/60">
                  Fill in the details and we&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <div className="px-8 py-6 pb-16">
                {submitted ? (
                  <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
                    <div className="text-5xl mb-4">🎉</div>
                    <h4 className="font-clash text-xl font-semibold text-[#14110F]">Thank You!</h4>
                    <p className="mt-2 text-sm text-[#5E5A54]">
                      We&apos;ve received your consultation request. We&apos;ll be in touch within 24 hours.
                    </p>
                  </div>
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
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-[#14110F]/10 bg-white px-4 py-3 text-[#14110F] outline-none transition-colors focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20"
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
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-[#14110F]/10 bg-white px-4 py-3 text-[#14110F] outline-none transition-colors focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4A84B]">
                        Company
                      </label>
                      <input
                        type="text"
                        placeholder="Your company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-[#14110F]/10 bg-white px-4 py-3 text-[#14110F] outline-none transition-colors focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4A84B]">
                        Message
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your project or goals..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="mt-1 w-full resize-none rounded-lg border border-[#14110F]/10 bg-white px-4 py-3 text-[#14110F] outline-none transition-colors focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20"
                      />
                    </div>

                    <button
                      type="submit"
                      className="group w-full rounded-full bg-[#D4A84B] px-8 py-3.5 text-sm font-semibold text-[#14110F] transition-all duration-300 hover:bg-[#14110F] hover:text-[#F3ECDD] hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                      Request Consultation
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
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

      <AnimatePresence>
        {showBackConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1001] bg-[#14110F]/60 backdrop-blur-sm"
              onClick={cancelBack}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-[1002] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full max-w-sm rounded-2xl bg-[#FCFBF8] p-6 shadow-2xl text-center">
                <div className="text-4xl mb-4">⚠️</div>
                <h4 className="font-clash text-xl font-semibold text-[#14110F]">
                  Leave without saving?
                </h4>
                <p className="mt-2 text-sm text-[#5E5A54]">
                  You have entered information that will be lost if you leave.
                </p>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={cancelBack}
                    className="flex-1 rounded-full border border-[#14110F]/20 px-4 py-2.5 text-sm font-medium text-[#14110F] hover:bg-[#14110F]/5 transition-colors"
                  >
                    Continue Filling
                  </button>
                  <button
                    onClick={confirmBack}
                    className="flex-1 rounded-full bg-[#14110F] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#D4A84B] hover:text-[#14110F] transition-colors"
                  >
                    Leave Anyway
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
        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
            {/* Left: heading + copy */}
            <Reveal>
              <h2 className="font-sans text-5xl font-bold leading-[0.95] tracking-tight text-[#14110F] sm:text-6xl md:text-7xl">
                Ready to book?
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#14110F]/85 sm:text-xl">
                Message us on WhatsApp to book a package, check a date or ask a
                question.
              </p>
            </Reveal>

            {/* Right: WhatsApp CTA */}
            <Reveal delay={150}>
              <div className="flex flex-col items-start gap-4 md:items-end">
                <a
                  href="https://wa.me/8615110119513"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#14110F] px-8 py-4 text-base font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-[#0a0908]"
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
                </a>

                <a
                  href="tel:+8615110119513"
                  className="text-sm font-medium text-[#14110F] underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  +86 151 1011 9513
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}