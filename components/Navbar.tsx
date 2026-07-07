// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { name: "Home", href: "/", note: "Welcome" },
  { name: "Services", href: "/#services", note: "What we offer" },
  { name: "Portfolio", href: "/portfolio", note: "Our work" },
  { name: "Contact", href: "/contact", note: "Get in touch" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false; // in-page anchor, never "active" as a route
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-[100] border-b transition-all duration-500 ${
          scrolled
            ? "border-[#D4A84B]/20 bg-[#FCFBF8]/95 shadow-[0_4px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl"
            : "border-white/10 bg-[#14110F]/90 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Logo — allowed to overflow the bar itself */}
            <Link href="/" className="group relative z-10 flex-shrink-0">
              <div className="relative -my-6 h-24 w-44 sm:h-28 sm:w-52 md:-my-8 md:h-36 md:w-64 lg:h-40 lg:w-72">
                <Image
                  src={scrolled ? "/heavenly-panda-logo2.png" : "/heavenly-logo2.jpeg"}
                  alt="Heavenly Panda"
                  fill
                  priority
                  className={`object-contain object-left transition-transform duration-300 group-hover:scale-[1.03] ${
                    scrolled 
                      ? "drop-shadow-[0_6px_20px_rgba(20,17,15,0.12)]" 
                      : "drop-shadow-[0_6px_20px_rgba(212,168,75,0.15)]"
                  }`}
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden flex-1 items-center justify-center gap-10 md:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group/link relative text-sm font-medium transition-colors duration-300 ${
                    scrolled
                      ? "text-[#4A4A4A] hover:text-[#14110F]"
                      : "text-[#F3ECDD]/70 hover:text-[#F3ECDD]"
                  }`}
                >
                  <span
                    className={`absolute -top-3 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#D4A84B] transition-opacity duration-300 ${
                      isActive(link.href) ? "opacity-100" : "opacity-0 group-hover/link:opacity-60"
                    }`}
                  />
                  <span className={isActive(link.href) ? (scrolled ? "text-[#14110F]" : "text-[#F3ECDD]") : ""}>
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden items-center gap-6 md:flex">
              <span className={`text-xs font-medium tracking-wide transition-colors duration-300 ${
                scrolled ? "text-[#6B6B6B]" : "text-[#F3ECDD]/50"
              }`}>
                Beijing · UAE
              </span>

              <Link
                href="/contact"
                className={`group relative overflow-hidden rounded-[6px] border px-6 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  scrolled
                    ? "border-[#14110F] text-[#14110F] hover:text-[#F3ECDD]"
                    : "border-[#F3ECDD] text-[#F3ECDD] hover:text-[#14110F]"
                }`}
              >
                <span className={`absolute inset-0 -translate-x-full transition-transform duration-300 group-hover:translate-x-0 ${
                  scrolled ? "bg-[#14110F]" : "bg-[#F3ECDD]"
                }`} />
                <span className="relative z-10 flex items-center gap-2">
                  Let&apos;s talk
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-[#D4A84B]/10 md:hidden"
              aria-label="Toggle menu"
            >
              <div className="relative h-5 w-6">
                <span
                  className={`absolute left-0 h-[2px] w-full rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "top-2 w-full rotate-45" : "top-0"
                  } ${scrolled ? "bg-[#14110F]" : "bg-[#F3ECDD]"}`}
                />
                <span
                  className={`absolute left-0 top-2 h-[2px] rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "w-0 opacity-0" : "w-full"
                  } ${scrolled ? "bg-[#14110F]" : "bg-[#F3ECDD]"}`}
                />
                <span
                  className={`absolute left-0 h-[2px] rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "top-2 w-full -rotate-45" : "top-4 w-3/4"
                  } ${scrolled ? "bg-[#14110F]" : "bg-[#F3ECDD]"}`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[99] backdrop-blur-xl transition-all duration-500 ${
          isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        } ${scrolled ? "bg-[#FCFBF8]/97" : "bg-[#14110F]/97"}`}
        style={{ top: 64 }}
      >
        <div className="relative flex h-full flex-col justify-center px-6 py-12">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#D4A84B]/5 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#D4A84B]/5 blur-3xl" />

          <div className="relative z-10 space-y-7">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block font-clash text-4xl font-medium transition-colors duration-300 hover:text-[#D4A84B] ${
                  scrolled ? "text-[#14110F]" : "text-[#F3ECDD]"
                }`}
                style={{
                  animation: isMobileMenuOpen
                    ? `fadeSlideIn 0.5s ease forwards ${index * 0.1 + 0.2}s`
                    : "none",
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? "translateX(0)" : "translateX(20px)",
                }}
              >
                {link.name}
                <span className={`mt-1 block text-sm font-light ${
                  scrolled ? "text-[#6B6B6B]" : "text-[#F3ECDD]/50"
                }`}>
                  {link.note}
                </span>
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`inline-flex items-center gap-3 rounded-[6px] px-8 py-4 font-semibold transition-colors ${
                scrolled
                  ? "bg-[#14110F] text-[#F3ECDD] hover:bg-[#D4A84B] hover:text-[#14110F]"
                  : "bg-[#D4A84B] text-[#14110F] hover:bg-[#F3ECDD]"
              }`}
              style={{
                animation: isMobileMenuOpen ? "fadeSlideIn 0.5s ease forwards 0.6s" : "none",
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? "translateX(0)" : "translateX(20px)",
              }}
            >
              Start a project
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className={`relative z-10 mt-12 border-t pt-8 ${
            scrolled ? "border-[#D4A84B]/20" : "border-[#D4A84B]/20"
          }`}>
            <div className={`flex items-center gap-6 text-sm ${
              scrolled ? "text-[#6B6B6B]" : "text-[#F3ECDD]/50"
            }`}>
              <span>Beijing · UAE</span>
              <span className={`h-4 w-px ${
                scrolled ? "bg-[#D4A84B]/30" : "bg-[#D4A84B]/30"
              }`} />
              <a href="mailto:contact@heavenlypanda.com" className="transition-colors hover:text-[#D4A84B]">
                contact@heavenlypanda.com
              </a>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#D4A84B]/10 transition-colors hover:bg-[#D4A84B]/20"
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={scrolled ? "#14110F" : "#F3ECDD"} strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}