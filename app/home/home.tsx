import { cardsData, galleryData } from "./data/homeData";
import HeroSection from "./components/HeroSection";
import SafetySolutions from "./components/SafetySolutions";
import Gallery from "./components/Gallery";
import HomeEssentials from "./components/HomeEssentials";
import MissionSection from "./components/MissionSection";
import ServiceAreaSearch from "../bangalore/components/ServiceAreaSearch";
import { areas, services } from "../bangalore/data/serviceAreaData";

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <section className="border-y border-[var(--brand-border)] bg-white py-7 sm:py-8" aria-label="Find your local service">
        <div className="site-container grid gap-5 xl:grid-cols-[230px_1fr] xl:items-center xl:gap-10">
          <div><p className="eyebrow">A little closer to home</p><h2 className="mt-2 text-[22px] font-semibold tracking-tight">Find your local service.</h2></div>
          <ServiceAreaSearch id="service-area-search" services={services} areas={areas} compact />
        </div>
      </section>
      <SafetySolutions cards={cardsData} />
      <HomeEssentials areas={areas} />
      <Gallery images={galleryData} />
      <MissionSection />
    </main>
  );
}
