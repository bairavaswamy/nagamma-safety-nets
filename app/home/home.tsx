import {
  cardsData,
  galleryData,
} from "./data/homeData";
import HeroSection from "./components/HeroSection";
import SafetySolutions from "./components/SafetySolutions";
import Gallery from "./components/Gallery";
import MissionSection from "./components/MissionSection";
import OfferMarquee from "./components/OfferMarquee";
import HomeEssentials from "./components/HomeEssentials";
import ServiceAreaSearch from "../bangalore/components/ServiceAreaSearch";
import { areas, services } from "../bangalore/data/serviceAreaData";

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={galleryData[0].image}
        fetchPriority="high"
      />

      <main className="min-h-screen bg-transparent text-[#172129]">

        <HeroSection
          title="Nagamma Safety Nets"
          description="Safety nets, invisible grills, sports nets, and cloth hanger installation across Bangalore."
          image={galleryData[0].image}
          slides={galleryData}
        />

        <section className="relative z-20 -mt-10 px-4 pb-10 md:-mt-12 md:px-12">
          <div className="mx-auto max-w-5xl">
            <ServiceAreaSearch services={services} areas={areas} />
          </div>
        </section>

        <OfferMarquee />

        <SafetySolutions cards={cardsData} />

        <HomeEssentials areas={areas} />

        <MissionSection />

        <Gallery images={galleryData} />

      </main>
    </>
  );
}
