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
  "Branding",
  "Photography",
  "Graphic Design",
  "Clients & Partners",
];

const PROJECTS: Project[] = [
  /* ---------- Branding ---------- */
  {
    id: 1,
    title: "Lyanne's Home & Body Care",
    category: "Branding",
    image: "/b1.jpeg",
    images: ["/b1.jpeg"],
    description:
      "Rebrand: logo, packaging & social — a warm, tactile identity for a home and body care label.",
    tags: ["Rebrand", "Packaging", "Social"],
    year: "2024",
    client: "Lyanne's",
    link: "#",
  },
  {
    id: 2,
    title: "DEBS Holdings",
    category: "Branding",
    image: "/b2.jpeg",
    images: ["/b2.jpeg"],
    description:
      "Brand identity & digital campaign — positioning a multi-sector holding group for its next chapter.",
    tags: ["Brand Identity", "Digital", "Campaign"],
    year: "2024",
    client: "DEBS Holdings",
    link: "#",
  },
  {
    id: 3,
    title: "Income Property",
    category: "Branding",
    image: "/b3.jpeg",
    images: ["/b3.jpeg"],
    description:
      "Brand identity, print & vehicle wrap — a bold, trade-first identity for a property management firm.",
    tags: ["Brand Identity", "Print", "Vehicle Wrap"],
    year: "2024",
    client: "Income Property",
    link: "#",
  },
  {
    id: 4,
    title: "Company profiles & letterheads",
    category: "Graphic Design",
    image: "/b4.jpeg",
    images: ["/b4.jpeg"],
    description:
      "Corporate stationery design — a cohesive suite of profiles, letterheads and branded documents.",
    tags: ["Stationery", "Print", "Corporate"],
    year: "2024",
    client: "Various Clients",
    link: "#",
  },

  /* ---------- Clients & Partners ---------- */
  {
    id: 5,
    title: "Client-02",
    category: "Clients & Partners",
    image: "/client-02.png",
    images: ["/client-02.png"],
    description: "Selected work for a partner client.",
    tags: ["Client Work"],
    year: "2024",
    client: "Client-02",
    link: "#",
  },
  {
    id: 6,
    title: "Client-04",
    category: "Clients & Partners",
    image: "/client-04.png",
    images: ["/client-04.png"],
    description: "Selected work for a partner client.",
    tags: ["Client Work"],
    year: "2024",
    client: "Client-04",
    link: "#",
  },
  {
    id: 7,
    title: "Client-05",
    category: "Clients & Partners",
    image: "/client-05.png",
    images: ["/client-05.png"],
    description: "Selected work for a partner client.",
    tags: ["Client Work"],
    year: "2024",
    client: "Client-05",
    link: "#",
  },
  {
    id: 8,
    title: "Client-06",
    category: "Clients & Partners",
    image: "/client-06.png",
    images: ["/client-06.png"],
    description: "Selected work for a partner client.",
    tags: ["Client Work"],
    year: "2024",
    client: "Client-06",
    link: "#",
  },
  {
    id: 9,
    title: "Client-07",
    category: "Clients & Partners",
    image: "/client-07.png",
    images: ["/client-07.png"],
    description: "Selected work for a partner client.",
    tags: ["Client Work"],
    year: "2024",
    client: "Client-07",
    link: "#",
  },
  {
    id: 10,
    title: "Client-09",
    category: "Clients & Partners",
    image: "/client-09.png",
    images: ["/client-09.png"],
    description: "Selected work for a partner client.",
    tags: ["Client Work"],
    year: "2024",
    client: "Client-09",
    link: "#",
  },
  {
    id: 11,
    title: "Client-10",
    category: "Clients & Partners",
    image: "/client-10.png",
    images: ["/client-10.png"],
    description: "Selected work for a partner client.",
    tags: ["Client Work"],
    year: "2024",
    client: "Client-10",
    link: "#",
  },
  {
    id: 12,
    title: "Client-11",
    category: "Clients & Partners",
    image: "/client-11.png",
    images: ["/client-11.png"],
    description: "Selected work for a partner client.",
    tags: ["Client Work"],
    year: "2024",
    client: "Client-11",
    link: "#",
  },
  {
    id: 13,
    title: "Client-13",
    category: "Clients & Partners",
    image: "/client-13.png",
    images: ["/client-13.png"],
    description: "Selected work for a partner client.",
    tags: ["Client Work"],
    year: "2024",
    client: "Client-13",
    link: "#",
  },
  {
    id: 14,
    title: "Client-14",
    category: "Clients & Partners",
    image: "/client-14.png",
    images: ["/client-14.png"],
    description: "Selected work for a partner client.",
    tags: ["Client Work"],
    year: "2024",
    client: "Client-14",
    link: "#",
  },
  {
    id: 15,
    title: "Client-15",
    category: "Clients & Partners",
    image: "/client-15.png",
    images: ["/client-15.png"],
    description: "Selected work for a partner client.",
    tags: ["Client Work"],
    year: "2024",
    client: "Client-15",
    link: "#",
  },
  {
    id: 16,
    title: "Client-16",
    category: "Clients & Partners",
    image: "/client-16.png",
    images: ["/client-16.png"],
    description: "Selected work for a partner client.",
    tags: ["Client Work"],
    year: "2024",
    client: "Client-16",
    link: "#",
  },

  /* ---------- Photography ---------- */
  {
    id: 17,
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
    id: 18,
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
    id: 19,
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
    id: 20,
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
    id: 21,
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
    id: 22,
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
    id: 23,
    title: "Beauty Brand Content",
    category: "Photography",
    image: "/photography7.jpeg",
    images: ["/photography7.jpeg"],
    description: "Content photography and imagery for a beauty brand's campaigns.",
    tags: ["Photography", "Content", "Beauty"],
    year: "2023",
    client: "Premium Beauty Co.",
    link: "#",
  },
  {
    id: 24,
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

  /* ---------- Graphic Design ---------- */
  {
    id: 25,
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
    id: 26,
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
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/heavenlypanda_444",
  },
  {
    Icon: FaTiktok,
    label: "TikTok",
    href: process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@heavenlypanda",
  },
  {
    Icon: FaYoutube,
    label: "YouTube",
    href: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com/@heavenlypanda",
  },
];

// Project Modal
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

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);

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

  const checkBackgroundBrightness = (imageElement: HTMLImageElement) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const size = 50;
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(imageElement, 0, 0, size, size);

      const imageData = ctx.getImageData(0, 0, size, size);
      const data = imageData.data;
      let brightness = 0;
      const pixelCount = data.length / 4;

      for (let i = 0; i < data.length; i += 4) {
        brightness += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      }

      brightness /= pixelCount;
      setIsLightBackground(brightness > 128);
    } catch {
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
        <button
          onClick={onClose}
          className={`absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
            isLightBackground
              ? "bg-white/80 text-[#14110F] shadow-md backdrop-blur-sm hover:bg-white/90"
              : "bg-[#14110F]/10 text-[#14110F] hover:bg-[#14110F]/20"
          }`}
          aria-label="Close modal"
        >
          <FaTimes className="h-5 w-5" />
        </button>

        <button
          onClick={onClose}
          className={`absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            isLightBackground
              ? "bg-white/80 text-[#14110F] shadow-md backdrop-blur-sm hover:bg-white/90"
              : "bg-[#14110F]/10 text-[#14110F] hover:bg-[#14110F]/20"
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
                alt={`${project.title} - image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority
                onLoadingComplete={(img) => {
                  setIsLoading(false);
                  if (img) checkBackgroundBrightness(img);
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
                    ? "bg-white/80 text-[#14110F] shadow-lg backdrop-blur-sm hover:bg-white/90"
                    : "bg-black/30 text-white hover:bg-black/50"
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
                    ? "bg-white/80 text-[#14110F] shadow-lg backdrop-blur-sm hover:bg-white/90"
                    : "bg-black/30 text-white hover:bg-black/50"
                }`}
                aria-label="Next image"
              >
                <FaChevronRight className="h-5 w-5" />
              </button>
              <div
                className={`absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs ${
                  isLightBackground
                    ? "bg-white/80 text-[#14110F] shadow-md backdrop-blur-sm"
                    : "bg-black/50 text-white"
                }`}
              >
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
              <h2
                id="modal-title"
                className="mt-2 font-sans text-2xl font-bold text-[#14110F] sm:text-3xl md:text-4xl"
              >
                {project.title}
              </h2>
              <p className="mt-2 text-sm text-[#4A4A4A]">{project.client}</p>
            </div>
            <span className="font-serif text-sm italic text-[#D4A84B]">{project.year}</span>
          </div>

          <p className="mt-4 leading-relaxed text-[#4A4A4A]">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#D4A84B]/10 px-3 py-1 text-xs font-medium text-[#D4A84B]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#14110F] px-6 py-3 text-sm font-semibold text-[#F3ECDD] transition-colors hover:bg-[#D4A84B] hover:text-[#14110F]"
            >
              View live project
              <FaExternalLinkAlt className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#4A4A4A]">Follow us</span>
              <div className="flex items-center gap-2">
                {SOCIAL_ICONS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4A84B]/30 text-[#D4A84B] transition-all duration-300 hover:border-[#D4A84B] hover:bg-[#D4A84B] hover:text-white"
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

// Main Page
export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("Branding");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects =
    selectedCategory === "Branding"
      ? PROJECTS.filter(
          (p) =>
            p.category === "Branding" ||
            p.category === "Graphic Design" ||
            p.category === "Photography"
        )
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <>
      <main className="relative overflow-hidden bg-[#FCFBF8]">
        {/* Selected work section */}
        <section className="relative pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pt-40">
          <div className="container mx-auto max-w-7xl px-6">
            {/* Header row */}
            <Reveal>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <h1 className="font-sans text-4xl font-bold leading-[1.05] tracking-tight text-[#14110F] sm:text-5xl md:text-6xl">
                  Selected work
                </h1>

                <a
                  href={
                    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
                    "https://www.instagram.com/heavenlypanda_444"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-[#D4A84B] transition-colors hover:text-[#14110F]"
                >
                  More on Instagram
                  <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>

            {/* Category chips */}
            <Reveal delay={150}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-[#14110F] text-[#FCFBF8]"
                        : "border border-[#14110F]/15 bg-transparent text-[#14110F] hover:border-[#14110F]/40"
                    }`}
                    aria-pressed={selectedCategory === category}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Project grid — 4 columns */}
            <motion.div
              layout
              className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.45, delay: index * 0.04 }}
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedProject(project)}
                    className="group cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedProject(project);
                      }
                    }}
                    aria-label={`View ${project.title}`}
                  >
                    {/* Image tile */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#EFEDE8]">
                      <Image
                        src={project.image}
                        alt={`${project.title} — ${project.category}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRUZFREU4Ii8+PC9zdmc+"
                      />

                      {/* "View slideshow" pill */}
                      <div className="pointer-events-none absolute inset-x-4 bottom-4 flex justify-center">
                        <span className="rounded-full bg-[#14110F] px-4 py-2 text-xs font-medium text-[#FCFBF8] shadow-lg transition-transform duration-300 group-hover:scale-105">
                          View slideshow
                        </span>
                      </div>
                    </div>

                    {/* Meta below image */}
                    <div className="mt-4">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4A84B]">
                        {project.category}
                      </span>
                      <h3 className="mt-1 font-sans text-lg font-bold leading-snug text-[#14110F] transition-colors group-hover:text-[#D4A84B]">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#4A4A4A]">
                        {project.description}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-[#4A4A4A]">No projects found in this category.</p>
              </div>
            )}

            {/* Bottom CTA */}
            <Reveal delay={400}>
              <div className="mt-20 flex flex-col gap-6 rounded-2xl border border-[#14110F]/10 bg-white p-8 text-center shadow-[0_2px_20px_rgba(0,0,0,0.04)] sm:flex-row sm:justify-between sm:p-10 sm:text-left">
                <div>
                  <p className="font-sans text-xl font-bold text-[#14110F]">
                    Ready to create something amazing?
                  </p>
                  <p className="mt-1 text-sm text-[#4A4A4A]">
                    Let&apos;s bring your vision to life with thoughtful execution.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#14110F] px-7 py-3.5 text-sm font-semibold text-[#F3ECDD] transition-colors duration-300 hover:bg-[#D4A84B] hover:text-[#14110F]"
                >
                  Start your project
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
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