// app/page.tsx
import Navbar from "@/components/Navbar";
import  Hero  from "@/components/Hero";
import TrustedLogos from "@/components/TrustedLogos";
//import { StatsBand } from "@/components/Stats";
import { WhoWeAre } from "@/components/WhoWeAre";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { WhyUs } from "@/components/WhyUs";
import { CTA } from "@/components/CTA";
import Footer  from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#F3ECDD] text-[#1A1A1A] font-sans overflow-hidden">
      <Navbar />
      <Hero />
      <TrustedLogos />
      <WhoWeAre />
      <Services />
      <Process />
      <WhyUs />
      <CTA />
      <Footer />
    </main>
  );
}