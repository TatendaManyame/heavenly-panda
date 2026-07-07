// components/stats/StatsBand.tsx
"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { STATS } from "@/components/data";

export function StatsBand() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <section
      ref={ref}
      className="bg-[#1A1A1A] text-[#F3ECDD] py-10 border-y border-[#D4A84B]/25"
    >
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl">
        {STATS.map((s, i) => (
          <div key={s.label} className="text-center md:border-l first:border-l-0 border-[#D4A84B]/20">
            <h3 className="font-clash text-3xl sm:text-4xl text-[#D4A84B]">
              {inView ? <CountUp end={s.num} duration={1.8} delay={i * 0.1} suffix={s.suffix} /> : 0}
            </h3>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#F3ECDD]/55 mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}