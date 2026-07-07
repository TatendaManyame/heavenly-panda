// app/portfolio/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import Footer from "@/components/Footer";
import {
  FaArrowRight,
  FaTimes,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

// Types
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  images: string[];
  description: string;
  tags: string[];
  year: string;
  client: string;
  link: string;
}

interface SocialIcon {
  Icon: React.ElementType;
  label: string;
  href: string;
}

const CATEGORIES = [
  "All",
  "Branding",
  "Strategy Consulting",
  "Digital Marketing",
  "Photography",
  "Graphic Design",
];

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Hotel Brand Identity",
    category: "Branding",
    image: "/b1.jpeg",
    images: ["/b1.jpeg"],
    description: "Complete brand identity and visual language for a 5-star hotel chain.",
    tags: ["Branding", "Logo Design", "Visual Identity"],
    year: "2024",
    client: "Royal Hospitality Group",
    link: "#",
  },
  {
    id: 2,
    title: "Restaurant Brand Experience",
    category: "Branding",
    image: "/b2.jpeg",
    images: ["/b2.jpeg"],
    description: "Complete brand experience design for a Michelin-starred restaurant.",
    tags: ["Branding", "Interior Design", "Visual Identity"],
    year: "2023",
    client: "Fine Dining Group",
    link: "#",
  },
  {
    id: 3,
    title: "Fashion Brand Identity System",
    category: "Branding",
    image: "/b3.jpeg",
    images: ["/b3.jpeg"],
    description: "Comprehensive brand identity system for a fashion label.",
    tags: ["Branding", "Visual Identity", "Packaging"],
    year: "2024",
    client: "Fashion House",
    link: "#",
  },
  {
    id: 4,
    title: "Tech Brand Identity",
    category: "Branding",
    image: "/b4.jpeg",
    images: ["/b4.jpeg"],
    description: "Modern brand identity for a technology company.",
    tags: ["Branding", "Logo Design", "Digital Identity"],
    year: "2023",
    client: "Tech Innovators Inc.",
    link: "#",
  },
  {
    id: 5,
    title: "Tech Startup Market Strategy",
    category: "Strategy Consulting",
    image: "/strategy-consulting1.jpeg",
    images: ["/strategy-consulting1.jpeg"],
    description: "Market entry strategy and positioning for a fintech startup.",
    tags: ["Strategy", "Market Research", "Positioning"],
    year: "2024",
    client: "FinTech Innovators",
    link: "#",
  },
  {
    id: 6,
    title: "Sustainability Strategy Report",
    category: "Strategy Consulting",
    image: "/strategy-consulting2.jpeg",
    images: ["/strategy-consulting2.jpeg"],
    description: "Sustainability strategy and reporting framework for a corporation.",
    tags: ["Strategy", "Sustainability", "Reporting"],
    year: "2024",
    client: "Global Corp Inc.",
    link: "#",
  },
  {
    id: 7,
    title: "E-Commerce Digital Campaign",
    category: "Digital Marketing",
    image: "/digital-marketing1.jpeg",
    images: ["/digital-marketing1.jpeg"],
    description: "Multi-channel digital marketing campaign driving 300% ROI.",
    tags: ["Digital Marketing", "PPC", "Email Marketing"],
    year: "2024",
    client: "E-Commerce Retailer",
    link: "#",
  },
  {
    id: 8,
    title: "Social Media Marketing Strategy",
    category: "Digital Marketing",
    image: "/digital-marketing2.jpeg",
    images: ["/digital-marketing2.jpeg"],
    description: "Comprehensive social media marketing strategy for brand growth.",
    tags: ["Social Media", "Content Strategy", "Analytics"],
    year: "2024",
    client: "Digital Brand Co.",
    link: "#",
  },
  {
    id: 9,
    title: "Influencer Marketing Campaign",
    category: "Digital Marketing",
    image: "/digital-marketing3.jpeg",
    images: ["/digital-marketing3.jpeg"],
    description: "Successful influencer marketing campaign reaching millions.",
    tags: ["Influencer", "Campaign", "ROI"],
    year: "2023",
    client: "Beauty Brand",
    link: "#",
  },
  {
    id: 10,
    title: "Performance Marketing",
    category: "Digital Marketing",
    image: "/digital-marketing4.jpeg",
    images: ["/digital-marketing4.jpeg"],
    description: "Data-driven performance marketing strategy with measurable results.",
    tags: ["Performance", "Analytics", "Optimization"],
    year: "2024",
    client: "Tech Company",
    link: "#",
  },
  {
    id: 11,
    title: "Fashion Content Campaign",
    category: "Photography",
    image: "/photography1.jpeg",
    images: ["/photography1.jpeg"],
    description: "High-end content production for a fashion brand's collection launch.",
    tags: ["Content", "Photography", "Video"],
    year: "2023",
    client: "Fashion House",
    link: "#",
  },
  {
    id: 12,
    title: "Lifestyle Content Series",
    category: "Photography",
    image: "/photography2.jpeg",
    images: ["/photography2.jpeg"],
    description: "Ongoing content series for a premium lifestyle magazine.",
    tags: ["Content", "Editorial", "Photography"],
    year: "2023",
    client: "Lifestyle Media Group",
    link: "#",
  },
  {
    id: 13,
    title: "Product Photography Collection",
    category: "Photography",
    image: "/photography3.jpeg",
    images: ["/photography3.jpeg"],
    description: "Premium product photography for e-commerce and editorial use.",
    tags: ["Photography", "Product", "Commercial"],
    year: "2024",
    client: "Various Brands",
    link: "#",
  },
  {
    id: 14,
    title: "Architectural Photography",
    category: "Photography",
    image: "/photography4.jpeg",
    images: ["/photography4.jpeg"],
    description: "Architectural photography for real estate and design firms.",
    tags: ["Photography", "Architecture", "Interior"],
    year: "2023",
    client: "Architecture Firm",
    link: "#",
  },
  {
    id: 15,
    title: "Portrait Photography Series",
    category: "Photography",
    image: "/photography5.jpeg",
    images: ["/photography5.jpeg"],
    description: "Artistic portrait photography series for editorial publications.",
    tags: ["Photography", "Portrait", "Editorial"],
    year: "2024",
    client: "Editorial Magazine",
    link: "#",
  },
  {
    id: 16,
    title: "Commercial Photography",
    category: "Photography",
    image: "/photography6.jpeg",
    images: ["/photography6.jpeg"],
    description: "Commercial photography for brands and advertising campaigns.",
    tags: ["Photography", "Commercial", "Advertising"],
    year: "2023",
    client: "Advertising Agency",
    link: "#",
  },
  {
    id: 17,
    title: "Beauty Brand Content",
    category: "Photography",
    image: "/photography7.jpeg",
    images: ["/photography7.jpeg"],
    description: "Content photography and imagery for a beauty brand's campaigns.",
    tags: ["Photography", "Content Strategy", "Beauty"],
    year: "2023",
    client: "Premium Beauty Co.",
    link: "#",
  },
  {
    id: 18,
    title: "Fitness Brand Content",
    category: "Photography",
    image: "/photography8.jpeg",
    images: ["/photography8.jpeg"],
    description: "Content photography for a fitness brand's growth campaign.",
    tags: ["Photography", "Growth", "Fitness"],
    year: "2024",
    client: "Fitness Brand",
    link: "#",
  },
  {
    id: 19,
    title: "Print & Packaging Design",
    category: "Graphic Design",
    image: "/graphic-design1.jpeg",
    images: ["/graphic-design1.jpeg"],
    description: "Print and packaging design system for a retail product line.",
    tags: ["Graphic Design", "Packaging", "Print"],
    year: "2024",
    client: "Retail Brand Co.",
    link: "#",
  },
  {
    id: 20,
    title: "Digital Graphic Design System",
    category: "Graphic Design",
    image: "/graphic-design2.jpeg",
    images: ["/graphic-design2.jpeg"],
    description: "Digital graphic design system for web and social touchpoints.",
    tags: ["Graphic Design", "Digital", "Templates"],
    year: "2024",
    client: "Digital Brand Co.",
    link: "#",
  },
];

const SOCIAL_ICONS: SocialIcon[] = [
  { 
    Icon: FaInstagram, 
    label: "Instagram", 
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/heavenlypanda_444" 
  },
  { 
    Icon: FaTiktok, 
    label: "TikTok", 
    href: process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@heavenlypanda" 
  },
  { 
    Icon: FaYoutube, 
    label: "YouTube", 
    href: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com/@heavenlypanda" 
  },
];

// Hero Carousel Component
function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const carouselProjects = PROJECTS.slice(0, 6);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselProjects.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, carouselProjects.length]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const next = () => goTo((currentIndex + 1) % carouselProjects.length);
  const prev = () => goTo((currentIndex - 1 + carouselProjects.length) % carouselProjects.length);

  // Native touch support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      next();
    }
    if (isRightSwipe) {
      prev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div 
      className="relative w-full overflow-hidden rounded-2xl shadow-2xl"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative h-[320px] w-full overflow-hidden sm:h-[380px] lg:h-[440px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="relative h-full w-full"
          >
            {isLoading && (
              <div className="absolute inset-0 animate-pulse bg-[#14110F]/10" />
            )}
            <Image
              src={carouselProjects[currentIndex].image}
              alt={`${carouselProjects[currentIndex].title} - ${carouselProjects[currentIndex].category} project showcase`}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              onLoadingComplete={() => setIsLoading(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14110F]/90 via-[#14110F]/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6">
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                <span className="inline-block rounded-full bg-[#D4A84B]/20 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#D4A84B] backdrop-blur-sm">
                  {carouselProjects[currentIndex].category}
                </span>
                <h3 className="mt-2 font-clash text-xl font-semibold text-[#F3ECDD] sm:text-2xl">
                  {carouselProjects[currentIndex].title}
                </h3>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/60"
          aria-label="Previous project"
        >
          <FaChevronLeft className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/60"
          aria-label="Next project"
        >
          <FaChevronRight className="h-3.5 w-3.5" />
        </button>

        <div className="absolute bottom-3 right-4 z-10 flex gap-1.5">
          {carouselProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-6 bg-[#D4A84B]" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Project Modal Component
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLightBackground, setIsLightBackground] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextImage();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Check if the current image has a light background
  const checkBackgroundBrightness = (imageElement: HTMLImageElement) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Use smaller canvas size for performance
      const size = 50;
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(imageElement, 0, 0, size, size);

      const imageData = ctx.getImageData(0, 0, size, size);
      const data = imageData.data;
      let brightness = 0;
      const pixelCount = data.length / 4;

      for (let i = 0; i < data.length; i += 4) {
        // Use luminance formula for better brightness perception
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        brightness += (0.299 * r + 0.587 * g + 0.114 * b);
      }

      brightness /= pixelCount;
      setIsLightBackground(brightness > 128);
    } catch (error) {
      // If brightness check fails, default to dark background
      setIsLightBackground(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#14110F]/95 p-4 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-[#FCFBF8]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close button - top right */}
        <button
          onClick={onClose}
          className={`absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
            isLightBackground
              ? 'bg-white/80 text-[#14110F] hover:bg-white/90 shadow-md backdrop-blur-sm'
              : 'bg-[#14110F]/10 text-[#14110F] hover:bg-[#14110F]/20'
          }`}
          aria-label="Close modal"
        >
          <FaTimes className="h-5 w-5" />
        </button>

        {/* Back button - top left */}
        <button
          onClick={onClose}
          className={`absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            isLightBackground
              ? 'bg-white/80 text-[#14110F] hover:bg-white/90 shadow-md backdrop-blur-sm'
              : 'bg-[#14110F]/10 text-[#14110F] hover:bg-[#14110F]/20'
          }`}
          aria-label="Go back"
        >
          <FaChevronLeft className="h-4 w-4" />
          Back
        </button>

        <div className="relative h-[300px] overflow-hidden rounded-t-3xl bg-[#14110F] sm:h-[400px] md:h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative h-full w-full"
            >
              {isLoading && (
                <div className="absolute inset-0 animate-pulse bg-[#14110F]/20" />
              )}
              <Image
                src={project.images[currentImageIndex]}
                alt={`${project.title} - ${project.category} project image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority
                onLoadingComplete={(img) => {
                  setIsLoading(false);
                  // Only check brightness for the first image or when index changes
                  if (img) {
                    checkBackgroundBrightness(img);
                  }
                }}
              />
            </motion.div>
          </AnimatePresence>

          {project.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className={`absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-colors ${
                  isLightBackground
                    ? 'bg-white/80 text-[#14110F] hover:bg-white/90 shadow-lg backdrop-blur-sm'
                    : 'bg-black/30 text-white hover:bg-black/50'
                }`}
                aria-label="Previous image"
              >
                <FaChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className={`absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-colors ${
                  isLightBackground
                    ? 'bg-white/80 text-[#14110F] hover:bg-white/90 shadow-lg backdrop-blur-sm'
                    : 'bg-black/30 text-white hover:bg-black/50'
                }`}
                aria-label="Next image"
              >
                <FaChevronRight className="h-5 w-5" />
              </button>
              <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs ${
                isLightBackground
                  ? 'bg-white/80 text-[#14110F] backdrop-blur-sm shadow-md'
                  : 'bg-black/50 text-white'
              }`}>
                {currentImageIndex + 1} / {project.images.length}
              </div>
            </>
          )}
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4A84B]">
                {project.category}
              </span>
              <h2 id="modal-title" className="mt-2 font-clash text-2xl font-bold text-[#14110F] sm:text-3xl md:text-4xl">
                {project.title}
              </h2>
              <p className="mt-2 text-sm text-[#5E5A54]">{project.client}</p>
            </div>
            <span className="font-mono text-sm text-[#D4A84B]">{project.year}</span>
          </div>

          <p className="mt-4 leading-relaxed text-[#5E5A54]">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-[#D4A84B]/10 px-3 py-1 text-xs font-medium text-[#D4A84B]">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#14110F] px-6 py-3 text-[#F3ECDD] transition-colors hover:bg-[#D4A84B] hover:text-[#14110F]"
            >
              View live project
              <FaExternalLinkAlt className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#5E5A54]">Follow us</span>
              <div className="flex items-center gap-2">
                {SOCIAL_ICONS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4A84B]/20 text-[#D4A84B] transition-all duration-300 hover:border-[#D4A84B] hover:bg-[#D4A84B] hover:text-white"
                    aria-label={`Follow on ${label}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main Page Component
export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects =
    selectedCategory === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <>
      <main className="relative overflow-hidden bg-[#FCFBF8]">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#14110F] pb-14 pt-40 sm:pt-44 lg:pt-48">
          {/* Background photo */}
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/hero2.jpeg"
              alt="Background pattern"
              fill
              priority
              className="object-cover opacity-25"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#14110F]/95 via-[#14110F]/85 to-[#14110F]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#14110F]/60 via-transparent to-[#14110F]/80" />
          </div>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-0 h-[400px] w-[400px] rounded-full bg-[#D4A84B]/10 blur-[120px]" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
              {/* Text column */}
              <div>
                <Reveal>
                  <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[#D4A84B]/80">
                    <span className="h-px w-8 bg-[#D4A84B]/50" />
                    Our Portfolio
                  </span>
                </Reveal>

                <Reveal delay={100}>
                  <h1 className="mt-5 font-clash text-4xl font-bold leading-[1.1] text-[#F3ECDD] sm:text-5xl lg:text-6xl">
                    Crafting
                    <br />
                    <span className="font-serif italic font-normal text-[#D4A84B]">
                      digital excellence.
                    </span>
                  </h1>
                </Reveal>

                <Reveal delay={200}>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-[#F3ECDD]/65 sm:text-lg">
                    Explore our work across branding, strategy consulting,
                    digital marketing, photography, and graphic design.
                  </p>
                </Reveal>

                <Reveal delay={300}>
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <div>
                      <span className="font-clash text-2xl font-bold text-[#D4A84B]">
                        {PROJECTS.length}
                      </span>
                      <span className="ml-2 text-sm text-[#F3ECDD]/50">projects delivered</span>
                    </div>
                    <span className="h-8 w-px bg-[#F3ECDD]/15" />
                    <div>
                      <span className="font-clash text-2xl font-bold text-[#D4A84B]">50+</span>
                      <span className="ml-2 text-sm text-[#F3ECDD]/50">happy clients</span>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={400}>
                  <div className="mt-8 flex items-center gap-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#F3ECDD]/40">
                      Follow us
                    </span>
                    <div className="flex items-center gap-2">
                      {SOCIAL_ICONS.map(({ Icon, label, href }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4A84B]/20 bg-white/5 text-[#D4A84B] transition-all duration-300 hover:scale-110 hover:bg-[#D4A84B] hover:text-[#14110F]"
                          aria-label={`Follow on ${label}`}
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Carousel column */}
              <Reveal delay={250} direction="up">
                <HeroCarousel />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Grid Section */}
        <section ref={sectionRef} className="py-16 sm:py-20">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-[#D4A84B] text-[#14110F] shadow-lg shadow-[#D4A84B]/20"
                        : "bg-[#14110F]/5 text-[#5E5A54] hover:bg-[#D4A84B]/10 hover:text-[#14110F]"
                    }`}
                    aria-pressed={selectedCategory === category}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <span className="font-mono text-sm text-[#5E5A54]">
                {filteredProjects.length} projects
              </span>
            </div>

            <motion.div layout className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedProject(project)}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#14110F] shadow-lg transition-shadow hover:shadow-2xl"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedProject(project);
                      }
                    }}
                    aria-label={`View ${project.title} project details`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#14110F]">
                      <Image
                        src={project.image}
                        alt={`${project.title} - ${project.category} project thumbnail`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTQxMTBGIi8+PC9zdmc+"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14110F]/80 via-[#14110F]/20 to-transparent" />
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                        <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4A84B]">
                          {project.category}
                        </span>
                        <h3 className="mt-2 font-clash text-xl font-semibold text-[#F3ECDD] transition-colors group-hover:text-[#D4A84B]">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-sm text-[#F3ECDD]/60">{project.client}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-medium text-[#F3ECDD]/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: hoveredId === project.id ? 1 : 0,
                          y: hoveredId === project.id ? 0 : 10,
                        }}
                        transition={{ duration: 0.3 }}
                        className="group/btn mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#D4A84B]"
                      >
                        View project
                        <FaArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                      </motion.div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-[#5E5A54]">No projects found in this category.</p>
              </div>
            )}

            <Reveal delay={400}>
              <div className="mt-16 flex flex-col gap-6 rounded-3xl border border-[#D4A84B]/15 bg-gradient-to-r from-[#D4A84B]/5 to-transparent p-8 text-center sm:mt-20 sm:p-10">
                <div>
                  <p className="font-clash text-xl font-semibold text-[#14110F] sm:text-2xl">
                    Ready to create something amazing?
                  </p>
                  <p className="mt-1 text-sm text-[#5E5A54]">
                    Let&apos;s bring your vision to life with thoughtful execution.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-[#14110F] px-8 py-3.5 text-sm font-semibold text-[#F3ECDD] shadow-xl shadow-[#14110F]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#D4A84B] hover:text-[#14110F]"
                  >
                    Start your project
                    <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Link>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#5E5A54]">Follow us</span>
                    <div className="flex items-center gap-2">
                      {SOCIAL_ICONS.map(({ Icon, label, href }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4A84B]/20 text-[#D4A84B] transition-all duration-300 hover:border-[#D4A84B] hover:bg-[#D4A84B] hover:text-white"
                          aria-label={`Follow on ${label}`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}