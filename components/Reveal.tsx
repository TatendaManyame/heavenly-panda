// components/Reveal.tsx
"use client";

import React from "react";
import { ReactNode, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  threshold?: number;
  className?: string;
  once?: boolean;
  useGSAP?: boolean; // Flag to use GSAP instead of CSS animations
}

export function Reveal({ 
  children, 
  delay = 0, 
  duration = 700,
  direction = "up",
  threshold = 0.15,
  className = "",
  once = true,
  useGSAP = false
}: RevealProps) {
  const { ref, inView } = useInView({ triggerOnce: once, threshold });
  
  const getTransform = () => {
    switch(direction) {
      case "down": return "translate-y-[-8px]";
      case "left": return "translate-x-8";
      case "right": return "translate-x-[-8px]";
      default: return "translate-y-8";
    }
  };
  
  // For GSAP integration, we'll add data attributes
  if (useGSAP) {
    return (
      <div
        ref={ref}
        className={`${className}`}
        data-reveal
        data-delay={delay}
        data-duration={duration}
        data-direction={direction}
      >
        {children}
      </div>
    );
  }
  
  // CSS-based animation
  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${className} ${
        inView ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${getTransform()}`
      }`}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms` 
      }}
    >
      {children}
    </div>
  );
}

// Staggered group component
export function RevealGroup({ 
  children, 
  stagger = 100,
  ...props 
}: RevealProps & { stagger?: number }) {
  return (
    <>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return (
          <Reveal {...props} delay={(props.delay || 0) + stagger * index}>
            {child}
          </Reveal>
        );
      })}
    </>
  );
}

// GSAP-based reveal hook
export function useGSAPReveal() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && elementRef.current) {
      // Import GSAP dynamically
      import('gsap').then((gsap) => {
        gsap.default.fromTo(
          elementRef.current,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            ease: "power3.out",
            delay: parseFloat(elementRef.current?.dataset.delay || '0') / 1000
          }
        );
      });
    }
  }, [inView]);

  return { ref: elementRef, inView };
}