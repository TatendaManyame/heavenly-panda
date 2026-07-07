// components/ClientLogosMarquee.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const CLIENTS = [
  { id: 1, src: "/client1.png", alt: "Client 1" },
  { id: 2, src: "/client2.png", alt: "Client 2" },
  { id: 3, src: "/client3.png", alt: "Client 3" },
  { id: 4, src: "/client4.png", alt: "Client 4" },
  { id: 5, src: "/client5.png", alt: "Client 5" },
  { id: 6, src: "/client6.png", alt: "Client 6" },
  { id: 7, src: "/client7.png", alt: "Client 7" },
  { id: 8, src: "/client8.png", alt: "Client 8" },
  { id: 9, src: "/client9.png", alt: "Client 9" },
  { id: 10, src: "/client10.png", alt: "Client 10" },
  { id: 11, src: "/client11.png", alt: "Client 11" },
  { id: 12, src: "/client12.png", alt: "Client 12" },
  { id: 13, src: "/client13.png", alt: "Client 13" },
];

export default function ClientLogosMarquee() {
  return (
    <section className="relative py-16 bg-gradient-to-b from-white via-[#F8F5F0] to-white border-t border-[#D4A84B]/10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D4A84B]/[0.03] blur-[100px]" />
      </div>

      <div className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#D4A84B]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4A84B] font-medium">
              Trusted Partners
            </span>
            <span className="w-8 h-px bg-[#D4A84B]" />
          </div>
          <h2 className="font-clash text-2xl md:text-3xl font-medium text-[#1A1A1A]">
            Brands that <span className="text-[#D4A84B]">trust us</span>
          </h2>
        </motion.div>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          <div className="flex gap-12 md:gap-16 animate-marquee">
            {[...CLIENTS, ...CLIENTS].map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="relative w-32 h-16 md:w-40 md:h-20 flex-shrink-0"
              >
                <Image
                  src={client.src}
                  alt={client.alt}
                  fill
                  className="object-contain opacity-80 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}