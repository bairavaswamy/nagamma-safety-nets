import Image from "next/image";
import type { Metadata } from "next";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import StickyContactIcons from "../stickyicons/stickyIcons";
import AboutIntro from "../about/AboutIntro";
import Specialization from "../about/Specialization";
import WhyChooseUs from "../about/WhyChooseUs";
import Mission from "../about/Mission";
import Values from "../about/Values";
import WhySolutionsMatter from "../about/WhySolutionsMatter";
import Closing from "../about/Closing";

export const metadata: Metadata = {
  title: "About Servani Safety Nets | Safety Nets, Pigeon Nets & Invisible Grills",
  description:
    "Servani Safety Nets provides high-quality safety nets, pigeon protection, bird spikes, and invisible grills with expert installation in Bangalore.",
  keywords: [
    "safety net installation Bangalore",
    "pigeon nets",
    "bird spikes installation",
    "invisible grills",
    "balcony safety nets",
    "child safety nets",
    "bird protection solutions",
  ],
  alternates: {
    canonical: "https://servanisafetynets.com/about/",
  },
  openGraph: {
    title: "Servani Safety Nets | Trusted Safety Solutions Provider",
    description:
      "Expert installation of safety nets, pigeon nets, bird spikes, and invisible grills for homes and apartments.",
    url: "https://servanisafetynets.com/about/",
    siteName: "Servani Safety Nets",
    type: "website",
    locale: "en_IN",
  },
};

const About = () => {
  return (
    <>
      <Navbar />

      <main className="mt-16 overflow-hidden bg-[#F8FAFC] px-4 py-16 text-[#111827] md:px-8">
        <div className="mx-auto max-w-6xl space-y-12">
          <h1 className="text-center text-3xl font-extrabold tracking-tight text-[#111827] md:text-5xl">
            Servani Safety Nets
          </h1>

          <AboutIntro />

          <div className="flex justify-center">
            <div className="relative h-64 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:h-80 md:w-[80%]">
              <Image
                src="/images/safety-nets-installation.webp"
                alt="Servani Safety Nets Installation Services"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          <Specialization />
          <WhyChooseUs />
          <Mission />
          <Values />
          <WhySolutionsMatter />
          <Closing />
        </div>
      </main>

      <StickyContactIcons />
      <Footer />
    </>
  );
};

export default About;
