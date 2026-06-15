import {
  cardsData,
  testimonials,
  galleryData,
} from "./data/homeData";
import HeroSection from "./components/HeroSection";
import SafetySolutions from "./components/SafetySolutions";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import CTASection from "./components/CTASection";
import MissionSection from "./components/MissionSection";
import OfferMarquee from "./components/OfferMarquee";

const featuredCardTitles = [
  "Balcony Safety Nets",
  "Pigeon Safety Nets",
  "Cloth Hangers",
  "Sports Safety Nets",
  "Invisible Safety Nets",
  "Invisible Grills",
  "Cat Safety Nets",
  "Bird Spikes",
  "Residential Safety Nets",
];

const homeCards = featuredCardTitles
  .map((title) => cardsData.find((card) => card.title === title))
  .filter((card): card is (typeof cardsData)[number] => Boolean(card))
  .map((card) => ({
    ...card,
    image: card.image.replace("/cards/", "/home-optimized/cards/"),
  }));

const homeGallery = galleryData.slice(0, 10).map((item) => ({
  ...item,
  image: item.image.replace("/images/", "/home-optimized/gallery/"),
}));

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/home-optimized/hero-balcony.webp"
        fetchPriority="high"
      />

      <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">

        <HeroSection
          title="Balcony Safety Nets"
          description="Protect your family with measured safety net installation for balconies, windows, and open spaces."
          image="/home-optimized/hero-balcony.webp"
        />

        <OfferMarquee />

        <SafetySolutions cards={homeCards} />

        <Gallery images={homeGallery} />

        <Testimonials testimonials={testimonials} />

        <CTASection />

        <MissionSection />

      </main>
    </>
  );
}
