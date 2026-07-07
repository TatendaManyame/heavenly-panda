// components/Testimonials.tsx
"use client";

import { useEffect, useRef } from "react";

const testimonials = [
  {
    quote:
      "Heavenly Panda transformed our brand presence. The strategy and creative execution were world-class.",
    name: "Sarah Chen",
    title: "CEO, Lumina Tech",
  },
  {
    quote:
      "Their integrated approach saved us time and delivered results we couldn't have achieved with separate agencies.",
    name: "Michael Torres",
    title: "Head of Marketing, Nova",
  },
  {
    quote:
      "From Beijing to Dubai, they understood our vision and brought it to life with stunning creativity.",
    name: "Aisha Al Maktoum",
    title: "Founder, Atlas Ventures",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = container.querySelectorAll(".testimonial-card");
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;

      cards.forEach((card, i) => {
        const cardEl = card as HTMLElement;
        const speed = 1 + i * 0.2;
        cardEl.style.transform = `perspective(800px) rotateY(${x * speed}deg) rotateX(${-y * speed}deg) translateZ(20px)`;
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="section-padding" id="testimonials">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#2563EB] text-sm tracking-widest uppercase font-medium">
            Testimonials
          </span>
          <h2 className="heading-lg mt-2">What our clients say</h2>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="testimonial-card bg-[rgba(16,24,40,0.4)] backdrop-blur-[8px] border border-[rgba(255,255,255,0.04)] rounded-[2rem] p-8 transition-transform duration-200"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="text-4xl text-[#2563EB] opacity-30 mb-4">&quot;</div>
              <p className="text-[rgba(255,255,255,0.8)] leading-relaxed">
                {testimonial.quote}
              </p>
              <div className="mt-6">
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-[rgba(255,255,255,0.4)]">
                  {testimonial.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}