// components/About.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Reveal } from "../components/Reveal";
import { VALUES } from "@/components/data";
import { motion, AnimatePresence } from "framer-motion";

// Updated to use PNG files in the events folder
const EVENT_IMAGES = [
  "/events/e1.png",
  "/events/e2.png",
  "/events/e3.png",
  "/events/e4.png",
  "/events/e5.png",
  "/events/e6.png",
  "/events/e7.png",
  "/events/e8.png",
  "/events/e9.png",
  "/events/e10.png",
  "/events/e11.png",
  "/events/e12.png",
  "/events/e13.png",
  "/events/e14.png",
  "/events/e15.png",
  "/events/e16.png",
  "/events/e17.png",
  "/events/e18.png",
  "/events/e19.png",
  "/events/e20.png",
];

// Fallback image if none of the event images load
const FALLBACK_IMAGE = "/heavenly-logo2.jpeg";

export function WhoWeAre() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [validImages, setValidImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Validate images on mount
  useEffect(() => {
    const checkImages = async () => {
      const valid: string[] = [];
      
      for (const img of EVENT_IMAGES) {
        try {
          const response = await fetch(img, { method: 'HEAD' });
          if (response.ok) {
            valid.push(img);
          } else {
            console.warn(`Image not found: ${img}`);
          }
        } catch (error) {
          console.warn(`Error checking image: ${img}`, error);
        }
      }
      
      // If no valid images found, use fallback
      if (valid.length === 0) {
        valid.push(FALLBACK_IMAGE);
      }
      
      setValidImages(valid);
      setIsLoading(false);
    };

    checkImages();
  }, []);

  // Auto-slide
  useEffect(() => {
    if (validImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === validImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [validImages]);

  const nextImage = () => {
    if (validImages.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === validImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    if (validImages.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? validImages.length - 1 : prevIndex - 1
    );
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  // If still loading or no images, show placeholder
  if (isLoading) {
    return (
      <section id="about" className="py-28 px-6 bg-gradient-to-b from-white via-[#F8F5F0]/30 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Content - same as below */}
            <div>
              <Reveal>
                <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D4A84B]">
                  Who We Are
                </span>
                <h2 className="font-clash font-bold text-3xl sm:text-4xl mt-4">
                  Heavenly Panda Consulting
                </h2>
                <p className="text-[#4A4A4A] text-lg leading-relaxed mt-6">
                  A Beijing &amp; UAE-based business consultancy and creative agency
                  that bridges strategic thinking with creative execution. We work
                  with brands at every stage — from startups mapping their market
                  entry to established businesses refreshing their digital presence
                  and scaling their footprint.
                </p>
                <p className="text-[#4A4A4A] text-lg leading-relaxed mt-4">
                  What sets us apart is our integrated model: strategy, content
                  creation, and social media management handled in-house by a
                  single team, aligned on your goals. No fragmented briefings. No
                  creative-strategy disconnect. Just focused, cohesive work that
                  performs.
                </p>
              </Reveal>

              <div className="grid sm:grid-cols-2 gap-6 mt-10">
                <Reveal delay={100} className="border border-[#D4A84B]/25 rounded-[10px] p-6 bg-white/60 backdrop-blur-sm">
                  <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D4A84B] mb-2">
                    Our Mission
                  </p>
                  <p className="text-[#1A1A1A] text-sm leading-relaxed">
                    To create impactful business and creative solutions that
                    resonate with target audiences, elevating brands through
                    strategic thinking and creative excellence.
                  </p>
                </Reveal>
                <Reveal delay={200} className="border border-[#D4A84B]/25 rounded-[10px] p-6 bg-white/60 backdrop-blur-sm">
                  <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D4A84B] mb-2">
                    Our Vision
                  </p>
                  <p className="text-[#1A1A1A] text-sm leading-relaxed">
                    To become the leading integrated consultancy for growing brands
                    across the Middle East and Asia — known for delivering
                    measurable results through strategy and creativity.
                  </p>
                </Reveal>
              </div>
            </div>

            {/* Right - Loading Placeholder */}
            <div className="relative lg:sticky lg:top-28">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#D4A84B]/10 bg-[#F8F5F0]">
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-[550px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#D4A84B]/20 border-t-[#D4A84B] rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[#6B6B6B]">Loading images...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If no valid images at all
  if (validImages.length === 0) {
    return (
      <section id="about" className="py-28 px-6 bg-gradient-to-b from-white via-[#F8F5F0]/30 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Content - same as above */}
            <div>
              <Reveal>
                <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D4A84B]">
                  Who We Are
                </span>
                <h2 className="font-clash font-bold text-3xl sm:text-4xl mt-4">
                  Heavenly Panda Consulting
                </h2>
                <p className="text-[#4A4A4A] text-lg leading-relaxed mt-6">
                  A Beijing &amp; UAE-based business consultancy and creative agency
                  that bridges strategic thinking with creative execution. We work
                  with brands at every stage — from startups mapping their market
                  entry to established businesses refreshing their digital presence
                  and scaling their footprint.
                </p>
                <p className="text-[#4A4A4A] text-lg leading-relaxed mt-4">
                  What sets us apart is our integrated model: strategy, content
                  creation, and social media management handled in-house by a
                  single team, aligned on your goals. No fragmented briefings. No
                  creative-strategy disconnect. Just focused, cohesive work that
                  performs.
                </p>
              </Reveal>

              <div className="grid sm:grid-cols-2 gap-6 mt-10">
                <Reveal delay={100} className="border border-[#D4A84B]/25 rounded-[10px] p-6 bg-white/60 backdrop-blur-sm">
                  <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D4A84B] mb-2">
                    Our Mission
                  </p>
                  <p className="text-[#1A1A1A] text-sm leading-relaxed">
                    To create impactful business and creative solutions that
                    resonate with target audiences, elevating brands through
                    strategic thinking and creative excellence.
                  </p>
                </Reveal>
                <Reveal delay={200} className="border border-[#D4A84B]/25 rounded-[10px] p-6 bg-white/60 backdrop-blur-sm">
                  <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D4A84B] mb-2">
                    Our Vision
                  </p>
                  <p className="text-[#1A1A1A] text-sm leading-relaxed">
                    To become the leading integrated consultancy for growing brands
                    across the Middle East and Asia — known for delivering
                    measurable results through strategy and creativity.
                  </p>
                </Reveal>
              </div>
            </div>

            {/* Right - No Images Found */}
            <div className="relative lg:sticky lg:top-28">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#D4A84B]/10 bg-[#F8F5F0]">
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-[550px] flex items-center justify-center p-8">
                  <div className="text-center">
                    <p className="text-[#D4A84B] text-6xl mb-4">📸</p>
                    <p className="text-[#6B6B6B]">No images found</p>
                    <p className="text-[#6B6B6B] text-sm mt-2">Please add images to /public/events/</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-28 px-6 bg-gradient-to-b from-white via-[#F8F5F0]/30 to-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div>
            <Reveal>
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D4A84B]">
                Who We Are
              </span>
              <h2 className="font-clash font-bold text-3xl sm:text-4xl mt-4">
                Heavenly Panda Consulting
              </h2>
              <p className="text-[#4A4A4A] text-lg leading-relaxed mt-6">
                A Beijing &amp; UAE-based business consultancy and creative agency
                that bridges strategic thinking with creative execution. We work
                with brands at every stage — from startups mapping their market
                entry to established businesses refreshing their digital presence
                and scaling their footprint.
              </p>
              <p className="text-[#4A4A4A] text-lg leading-relaxed mt-4">
                What sets us apart is our integrated model: strategy, content
                creation, and social media management handled in-house by a
                single team, aligned on your goals. No fragmented briefings. No
                creative-strategy disconnect. Just focused, cohesive work that
                performs.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-6 mt-10">
              <Reveal delay={100} className="border border-[#D4A84B]/25 rounded-[10px] p-6 bg-white/60 backdrop-blur-sm">
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D4A84B] mb-2">
                  Our Mission
                </p>
                <p className="text-[#1A1A1A] text-sm leading-relaxed">
                  To create impactful business and creative solutions that
                  resonate with target audiences, elevating brands through
                  strategic thinking and creative excellence.
                </p>
              </Reveal>
              <Reveal delay={200} className="border border-[#D4A84B]/25 rounded-[10px] p-6 bg-white/60 backdrop-blur-sm">
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D4A84B] mb-2">
                  Our Vision
                </p>
                <p className="text-[#1A1A1A] text-sm leading-relaxed">
                  To become the leading integrated consultancy for growing brands
                  across the Middle East and Asia — known for delivering
                  measurable results through strategy and creativity.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right - Image Carousel */}
          <div className="relative lg:sticky lg:top-28">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#D4A84B]/10 bg-[#F8F5F0]">
              {/* Main Image */}
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[550px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={imageErrors[currentIndex] ? FALLBACK_IMAGE : validImages[currentIndex]}
                      alt={`Event ${currentIndex + 1}`}
                      fill
                      className="object-cover"
                      priority
                      onError={() => handleImageError(currentIndex)}
                    />
                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full font-medium">
                {currentIndex + 1} / {validImages.length}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Next image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5">
                {validImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex
                        ? "w-8 h-1.5 bg-[#D4A84B]"
                        : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-[#D4A84B]/10 rounded-full pointer-events-none" />
            <div className="absolute -top-6 -left-6 w-16 h-16 border-2 border-[#D4A84B]/10 rounded-full pointer-events-none" />
          </div>
        </div>

        {/* Values Section - Full Width Below */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 90}>
              <div className="p-6 rounded-xl border border-[#D4A84B]/10 bg-white/50 hover:border-[#D4A84B]/30 hover:shadow-lg transition-all duration-300 group">
                <span className="text-[#D4A84B] text-2xl group-hover:scale-110 transition-transform duration-300 inline-block">
                  ◆
                </span>
                <h3 className="font-clash font-semibold text-lg mt-2 text-[#1A1A1A]">{v.title}</h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed mt-2">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}