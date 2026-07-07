// components/Loader.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Loader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReduceMotion(prefersReduced);

    // Initial load
    const timer = setTimeout(
      () => setIsLoading(false),
      prefersReduced ? 800 : 2600
    );
    return () => clearTimeout(timer);
  }, []);

  // Handle route changes
  useEffect(() => {
    // Show loader when route starts changing
    setIsRouteChanging(true);
    
    // Hide loader after a delay
    const timer = setTimeout(() => {
      setIsRouteChanging(false);
    }, reduceMotion ? 600 : 2000);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Control body scroll
  useEffect(() => {
    document.body.style.overflow = (isLoading || isRouteChanging) ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading, isRouteChanging]);

  // Don't show loader for initial load if it's already done
  const showLoader = isLoading || isRouteChanging;

  return (
    <AnimatePresence mode="wait">
      {showLoader && (
        <motion.div
          key={isRouteChanging ? pathname : "initial"}
          initial={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ 
            duration: 0.9, 
            ease: [0.4, 0, 0.2, 1],
            delay: isRouteChanging ? 0 : 0.2
          }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#14110F]"
        >
          {/* Enhanced background effects */}
          <div className="pointer-events-none absolute inset-0">
            {/* Main glow */}
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A84B]/[0.06] blur-[150px]" />
            
            {/* Animated floating orbs */}
            <motion.div
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -30, 20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-20 top-20 h-[200px] w-[200px] rounded-full bg-[#D4A84B]/5 blur-[100px]"
            />
            <motion.div
              animate={{
                x: [0, -30, 20, 0],
                y: [0, 30, -20, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-20 bottom-20 h-[200px] w-[200px] rounded-full bg-[#FF4A1F]/5 blur-[100px]"
            />

            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          <div className="relative flex flex-col items-center">
            {/* Logo with enhanced animation */}
            <div className="relative h-24 w-56 overflow-hidden sm:h-28 sm:w-64 md:h-32 md:w-72">
              <motion.div
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: reduceMotion ? 0 : (isRouteChanging ? 0.1 : 0.5) 
                }}
                className="absolute inset-0"
              >
                <Image
                  src="/heavenly-logo2.jpeg"
                  alt="Heavenly Panda Consulting"
                  fill
                  priority
                  className="object-contain"
                />
              </motion.div>

              {/* Gold curtain wipe effect - only on initial load */}
              {!reduceMotion && !isRouteChanging && (
                <motion.div
                  initial={{ x: "0%" }}
                  animate={{ x: "100%" }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.35, 
                    ease: [0.4, 0, 0.2, 1] 
                  }}
                  className="absolute inset-0 bg-[#D4A84B]"
                />
              )}

              {/* Route change flash effect */}
              {isRouteChanging && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-[#D4A84B]/20"
                />
              )}
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: reduceMotion ? 0.1 : (isRouteChanging ? 0.2 : 0.95) 
              }}
              className="mt-5 font-mono text-xs uppercase tracking-[0.35em] text-[#F3ECDD]/55 sm:text-sm"
            >
              {isRouteChanging ? "Loading..." : "Strategy Meets Creative"}
            </motion.p>

            {/* Loading line with enhanced animation */}
            <div className="relative mt-7 h-px w-40 overflow-hidden bg-[#D4A84B]/15">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{
                  duration: reduceMotion ? 0.6 : (isRouteChanging ? 1.2 : 1.6),
                  delay: reduceMotion ? 0 : (isRouteChanging ? 0.1 : 1.1),
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="absolute inset-0 bg-[#D4A84B]"
              />
            </div>

            {/* Route change indicator - pulsing dots */}
            {isRouteChanging && (
              <div className="flex gap-2 mt-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-[#D4A84B]"
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}