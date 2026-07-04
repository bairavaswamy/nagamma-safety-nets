import {
  cardsData,
  testimonials,
  galleryData,
} from "./data/homeData";
import HeroSection from "./components/HeroSection";
import SafetySolutions from "./components/SafetySolutions";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import MissionSection from "./components/MissionSection";
import OfferMarquee from "./components/OfferMarquee";
import ServiceAreaSearch from "../bangalore/components/ServiceAreaSearch";
import { areas, services } from "../bangalore/data/serviceAreaData";

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/home-optimized/hero-balcony.webp"
        fetchPriority="high"
      />

      <main className="min-h-screen bg-transparent text-[#082F2A]">

        <HeroSection
          title="Nagamma Safety Nets"
          description="Safety nets, invisible grills, sports nets, and cloth hanger installation across Bangalore from the Marathahalli service base."
          image="/home-optimized/hero-balcony.webp"
        />

        <OfferMarquee />

        <section className="bg-white/45 px-6 py-10 md:px-12">
          <div className="mx-auto max-w-5xl">
            <ServiceAreaSearch services={services} areas={areas} />
          </div>
        </section>

        <SafetySolutions cards={cardsData} />

        <Gallery images={galleryData} />

        <Testimonials testimonials={testimonials} />

        <MissionSection />

      </main>
    </>
  );
}
