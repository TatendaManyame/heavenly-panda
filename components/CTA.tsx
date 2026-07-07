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
    // Check if any form field has content
    const hasContent = formData.name || formData.email || formData.company || formData.message;
    
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[999] bg-[#14110F]/80 backdrop-blur-md"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-lg rounded-2xl bg-[#FCFBF8] shadow-2xl overflow-hidden">
              {/* Close Button - Top Right */}
              <button
                onClick={handleBack}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#14110F]/5 hover:bg-[#14110F]/10 transition-colors group"
                aria-label="Close modal"
              >
                <FaTimes className="h-4 w-4 text-[#14110F] group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Go Back Button - Bottom Left */}
              <button
                onClick={handleBack}
                className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-xs text-[#6B6B6B] hover:text-[#14110F] transition-colors group"
              >
                <FaArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </button>

              {/* Modal Header */}
              <div className="bg-[#14110F] px-8 py-6 pr-16">
                <h3 className="font-clash text-2xl font-semibold text-[#F3ECDD]">
                  Book Your Consultation
                </h3>
                <p className="mt-1 text-sm text-[#F3ECDD]/60">
                  Fill in the details and we'll get back to you within 24 hours.
                </p>
              </div>

              {/* Modal Body */}
              <div className="px-8 py-6 pb-16">
                {submitted ? (
                  <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
                    <div className="text-5xl mb-4">🎉</div>
                    <h4 className="font-clash text-xl font-semibold text-[#14110F]">Thank You!</h4>
                    <p className="mt-2 text-sm text-[#5E5A54]">
                      We've received your consultation request. We'll be in touch within 24 hours.
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

      {/* Back Confirmation Modal */}
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
        className="relative overflow-hidden bg-gradient-to-b from-white via-[#FDF9F2] to-white px-6 py-20 sm:py-24"
      >
        {/* Background — one glow, one hairline grid */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-10%] top-[-20%] h-[380px] w-[380px] rounded-full bg-[#D4A84B]/[0.09] blur-[140px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20px 20px, #D4A84B 1.5px, transparent 1.5px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[#D4A84B]/80">
              <span className="h-px w-6 bg-[#D4A84B]/50" />
              Let&apos;s Talk
              <span className="h-px w-6 bg-[#D4A84B]/50" />
            </span>

            <h2 className="mt-5 font-clash text-4xl font-bold leading-[1.1] text-[#14110F] sm:text-5xl">
              Ready to{" "}
              <span className="font-serif italic font-normal text-[#D4A84B]">
                grow?
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[#4A4A4A] sm:text-lg">
              Book a free 30-minute consultation. We&apos;ll listen first, then
              tell you exactly how we&apos;d approach your situation.
            </p>

            <p className="mt-2 text-sm font-light text-[#6B6B6B]">
              No commitment — just a conversation about your brand.
            </p>

            {/* Magnetic button */}
            <div
              ref={buttonRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="mt-8 inline-block"
            >
              <motion.div style={{ x: springX, y: springY }}>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative inline-flex items-center gap-2.5 rounded-full bg-[#14110F] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#D4A84B]/10 transition-colors duration-400 hover:bg-[#D4A84B] hover:text-[#14110F] hover:shadow-[#D4A84B]/30"
                >
                  Book your consultation
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            </div>

            {/* Trust line */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[#D4A84B]/10 pt-6 text-xs text-[#6B6B6B]">
              {TRUST.map((item, i) => (
                <span key={item} className="flex items-center gap-x-5">
                  {item}
                  {i < TRUST.length - 1 && (
                    <span className="hidden text-[#D4A84B]/40 sm:inline">·</span>
                  )}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}