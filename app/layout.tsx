// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Using Plus_Jakarta_Sans as a replacement for Clash Display
// It has a similar modern, geometric feel
const clashDisplay = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-clash-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Heavenly Panda · Strategy meets creative power",
  description:
    "Heavenly Panda Consulting — Beijing & UAE based consultancy bridging strategy and creative execution. Premium digital experiences.",
  keywords:
    "consultancy, creative agency, business strategy, social media, branding, Beijing, UAE",
  openGraph: {
    title: "Heavenly Panda · Strategy meets creative power",
    description:
      "We help brands grow with clear business strategy, compelling content, and social media that converts.",
    url: "https://heavenlypanda.com",
    siteName: "Heavenly Panda",
    images: [
      {
        url: "https://heavenlypanda.com/heavenly-logo2.jpeg",
        width: 1200,
        height: 630,
        alt: "Heavenly Panda Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heavenly Panda · Strategy meets creative power",
    description:
      "We help brands grow with clear business strategy, compelling content, and social media that converts.",
    images: ["https://heavenlypanda.com/heavenly-logo2.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/heavenly-logo2.jpeg",
        sizes: "any",
      },
    ],
    apple: [
      {
        url: "/heavenly-logo2.jpeg",
        sizes: "180x180",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${clashDisplay.variable}`}
    >
      <body>
        <Loader />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}