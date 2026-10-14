"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { name: "Services", href: "/#services", note: "What we offer" },
  { name: "Packages", href: "/#process", note: "Our pricing" },
  { name: "Work", href: "/portfolio", note: "Our work" },
  { name: "How it works", href: "/#how-it-works", note: "Our process" },
  { name: "Contact", href: "/contact", note: "Get in touch" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  const textColor = scrolled ? "text-[#14110F]" : "text-[#F3ECDD]";

  return (
    <>
      {/* Main navigation */}
      <nav
        aria-label="Main navigation"
        className={`fixed inset-x-0 top-0 z-[100] border-b transition-all duration-500 ${
          scrolled
            ? "border-[#D4A84B]/20 bg-[#FCFBF8]/95 shadow-[0_4px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl"
            : "border-white/10 bg-[#14110F]/90 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Logo + Brand Name */}
            <Link
              href="/"
              onClick={closeMenu}
              aria-label="Heavenly Panda home"
              className="group relative z-10 flex shrink-0 items-center"
            >
              {/* Logo mark — smaller, more proportionate */}
              <div className="relative h-10 w-20 sm:h-11 sm:w-24 md:h-12 md:w-28 lg:h-14 lg:w-32">
                <Image
                  src="/logo.png"
                  alt="Heavenly Panda"
                  fill
                  priority
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 128px"
                  className={`object-contain object-left transition-all duration-300 group-hover:scale-[1.04] ${
                    scrolled
                      ? "drop-shadow-[0_6px_20px_rgba(20,17,15,0.12)]"
                      : "drop-shadow-[0_6px_20px_rgba(212,168,75,0.15)]"
                  }`}
                />
              </div>

              {/* Brand name */}
              <span
                className={`relative z-10 ml-1 whitespace-nowrap text-sm font-semibold tracking-tight transition-colors duration-500 sm:text-base md:text-lg ${
                  scrolled ? "text-[#14110F]" : "text-[#F3ECDD]"
                }`}
              >
                Heavenly Panda{" "}
                <span className="text-[#D4A84B]">Media</span>
              </span>
            </Link>

            {/* Desktop navigation links */}
            <div className="hidden flex-1 items-center justify-center gap-6 md:flex lg:gap-8">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`group/link relative py-3 text-sm font-medium transition-colors duration-300 ${
                      scrolled
                        ? "text-[#4A4A4A] hover:text-[#14110F]"
                        : "text-[#F3ECDD]/70 hover:text-[#F3ECDD]"
                    }`}
                  >
                    <span
                      className={`absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 rounded-full bg-[#D4A84B] transition-opacity duration-300 ${
                        active
                          ? "opacity-100"
                          : "opacity-0 group-hover/link:opacity-70"
                      }`}
                    />

                    <span
                      className={
                        active
                          ? scrolled
                            ? "text-[#14110F]"
                            : "text-[#F3ECDD]"
                          : ""
                      }
                    >
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA - WhatsApp pill */}
            <div className="hidden shrink-0 items-center md:flex">
              <Link
                href="/contact"
                className={`group relative inline-flex overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  scrolled
                    ? "bg-[#14110F] text-[#F3ECDD] hover:bg-[#D4A84B] hover:text-[#14110F]"
                    : "bg-[#F3ECDD] text-[#14110F] hover:bg-[#D4A84B]"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  WhatsApp us
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className={`relative z-[110] flex h-11 w-11 items-center justify-center rounded-xl transition-colors md:hidden ${
                scrolled ? "hover:bg-[#D4A84B]/10" : "hover:bg-white/10"
              } ${isMobileMenuOpen ? "pointer-events-none" : ""}`}
              aria-label={
                isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <div className="relative h-5 w-6">
                <span
                  className={`absolute left-0 h-[2px] w-full rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "top-2 rotate-45" : "top-0"
                  } ${textColor}`}
                  style={{ backgroundColor: "currentColor" }}
                />

                <span
                  className={`absolute left-0 top-2 h-[2px] w-full rounded-full transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "scale-x-0 opacity-0"
                      : "scale-x-100 opacity-100"
                  }`}
                  style={{
                    backgroundColor: scrolled ? "#14110F" : "#F3ECDD",
                  }}
                />

                <span
                  className={`absolute left-0 h-[2px] w-3/4 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "top-2 w-full -rotate-45"
                      : "top-4"
                  }`}
                  style={{
                    backgroundColor: scrolled ? "#14110F" : "#F3ECDD",
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile navigation overlay */}
      <div
        id="mobile-navigation"
        aria-hidden={!isMobileMenuOpen}
        className={`fixed inset-x-0 bottom-0 top-16 z-[105] overflow-y-auto backdrop-blur-xl transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        } ${
          scrolled
            ? "bg-[#FCFBF8]/[0.98]"
            : "bg-[#14110F]/[0.98]"
        }`}
      >
        <div className="relative flex min-h-full flex-col justify-center px-6 py-12 sm:px-10">
          {/* Subtle gold atmosphere */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#D4A84B]/[0.06] blur-3xl"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#D4A84B]/[0.06] blur-3xl"
            aria-hidden="true"
          />

          {/* Animated links */}
          <div className="relative z-10 space-y-7">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                onClick={closeMenu}
                className={`mobile-nav-link block text-4xl font-medium tracking-tight transition-colors duration-300 hover:text-[#D4A84B] sm:text-5xl ${
                  scrolled ? "text-[#14110F]" : "text-[#F3ECDD]"
                }`}
                style={
                  {
                    "--link-index": index,
                    animationPlayState: isMobileMenuOpen
                      ? "running"
                      : "paused",
                  } as React.CSSProperties
                }
              >
                {link.name}

                <span
                  className={`mt-1 block text-sm font-light tracking-normal ${
                    scrolled
                      ? "text-[#6B6B6B]"
                      : "text-[#F3ECDD]/50"
                  }`}
                >
                  {link.note}
                </span>
              </Link>
            ))}

            {/* Mobile CTA */}
            <Link
              href="/contact"
              tabIndex={isMobileMenuOpen ? 0 : -1}
              onClick={closeMenu}
              className={`mobile-nav-link inline-flex items-center gap-3 rounded-full px-8 py-4 font-semibold transition-colors duration-300 ${
                scrolled
                  ? "bg-[#14110F] text-[#F3ECDD] hover:bg-[#D4A84B] hover:text-[#14110F]"
                  : "bg-[#D4A84B] text-[#14110F] hover:bg-[#F3ECDD]"
              }`}
              style={
                {
                  "--link-index": NAV_LINKS.length,
                  animationPlayState: isMobileMenuOpen
                    ? "running"
                    : "paused",
                } as React.CSSProperties
              }
            >
              WhatsApp us

              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Mobile contact details */}
          <div className="relative z-10 mt-12 border-t border-[#D4A84B]/20 pt-8">
            <div
              className={`flex flex-wrap items-center gap-4 text-sm ${
                scrolled
                  ? "text-[#6B6B6B]"
                  : "text-[#F3ECDD]/50"
              }`}
            >
              <span>Beijing · UAE</span>

              <span
                className="h-4 w-px bg-[#D4A84B]/30"
                aria-hidden="true"
              />

              <a
                href="mailto:contact@heavenlypanda.com"
                tabIndex={isMobileMenuOpen ? 0 : -1}
                className="transition-colors hover:text-[#D4A84B]"
              >
                contact@heavenlypanda.com
              </a>
            </div>
          </div>
        </div>
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

        .mobile-nav-link {
          opacity: 0;
          transform: translateX(20px);
        }

        #mobile-navigation[aria-hidden="false"] .mobile-nav-link {
          animation: fadeSlideIn 0.5s ease forwards;
          animation-delay: calc(var(--link-index) * 100ms + 100ms);
        }

        @media (prefers-reduced-motion: reduce) {
          .mobile-nav-link {
            animation: none !important;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </>
  );
}