// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const QUICK_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

const SERVICES_LIST = [
  "Strategy Consulting",
  "Brand Development",
  "Content Creation",
  "Social Media Management",
  "Digital Marketing",
  "Creative Design",
];

const SOCIALS = [
  {
    Icon: FaInstagram,
    href: "https://www.instagram.com/heavenlypanda_444?igsh=N2w4Y20zaTJ5d3g1&utm_source=qr",
    label: "Instagram",
  },
  {
    Icon: FaFacebookF,
    href: "https://www.facebook.com/share/17h7gwWtMe/?mibextid=wwXIfr",
    label: "Facebook",
  },
  {
    Icon: FaLinkedinIn,
    href: "https://linkedin.com/company/heavenlypanda-inv?trk=profile-position",
    label: "LinkedIn",
  },
  {
    Icon: FaYoutube,
    href: "https://youtu.be/62KAJlywmgU",
    label: "YouTube",
  },
];

const PHONES = [
  { number: "+86 151 1011 9513", href: "tel:+8615110119513" },
  { number: "+971 58 518 2101", href: "tel:+971585182101" },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="h-px w-6 bg-[#D4A84B]/60" />
      <h3 className="font-clash text-sm font-semibold uppercase tracking-[0.2em] text-[#F3ECDD]">
        {children}
      </h3>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[#D4A84B]/10 bg-[#14110F] text-[#F3ECDD]/65">
      {/* Main */}
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="group inline-block">
              <div className="relative h-24 w-56 sm:h-28 sm:w-64 md:h-32 md:w-72 lg:h-36 lg:w-80">
                <Image
                  src="/heavenly-logo2.jpeg"
                  alt="Heavenly Panda Consulting"
                  fill
                  priority
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-contain object-left transition-all duration-300 ease-out group-hover:brightness-110"
                />
              </div>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#F3ECDD]/50">
              Strategy, branding, content and social media designed to help
              ambitious businesses grow with clarity and confidence.
            </p>

            <div className="mt-7 flex items-center gap-3">
              {SOCIALS.map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4A84B]/20 text-[#D4A84B] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4A84B] hover:bg-[#D4A84B] hover:text-[#14110F]"
                >
                  <Icon className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="space-y-3.5 text-sm">
              {QUICK_LINKS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group/link inline-flex items-center gap-2 transition-colors duration-300 hover:text-[#D4A84B]"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#D4A84B]/40 transition-colors duration-300 group-hover/link:bg-[#D4A84B]" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <ColumnHeading>Our Services</ColumnHeading>
            <ul className="space-y-3.5 text-sm">
              {SERVICES_LIST.map((s) => (
                <li key={s}>
                  <span className="group/link inline-flex cursor-pointer items-center gap-2 transition-colors duration-300 hover:text-[#D4A84B]">
                    <span className="h-1 w-1 rounded-full bg-[#D4A84B]/40 transition-colors duration-300 group-hover/link:bg-[#D4A84B]" />
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <ColumnHeading>Contact Us</ColumnHeading>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-[#D4A84B]/70" />
                <div className="leading-relaxed">
                  <p>Beijing, China</p>
                  <p>Dubai South, UAE</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="shrink-0 text-[#D4A84B]/70" />
                <Link
                  href="mailto:heavenlypanda44@gmail.com"
                  className="transition-colors duration-300 hover:text-[#D4A84B]"
                >
                  heavenlypanda44@gmail.com
                </Link>
              </li>
              {PHONES.map((phone) => (
                <li key={phone.href} className="flex items-center gap-3">
                  <FaPhone className="shrink-0 text-[#D4A84B]/70" />
                  <Link
                    href={phone.href}
                    className="transition-colors duration-300 hover:text-[#D4A84B]"
                  >
                    {phone.number}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#D4A84B]/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-[#F3ECDD]/40 md:flex-row">
          <p>© {new Date().getFullYear()} Heavenly Panda Consulting. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors duration-300 hover:text-[#D4A84B]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors duration-300 hover:text-[#D4A84B]">
              Terms &amp; Conditions
            </Link>
            <Link href="/cookies" className="transition-colors duration-300 hover:text-[#D4A84B]">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}