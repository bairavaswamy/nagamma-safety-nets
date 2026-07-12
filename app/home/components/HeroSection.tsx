"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";

interface HeroProps {
  title: string;
  description: string;
  image?: string;
  slides?: {
    image: string;
    title: string;
    service: string;
    location: string;
  }[];
}

const heroBadges = [
  "Measured fitting",
  "Clean finish",
  "Site checked installation",
];

const HeroSection = ({ title, description, image, slides = [] }: HeroProps) => {
  const heroImage = image || "/home-generated/hero.webp";
  const heroSlides = slides.length
    ? slides
    : [
        {
          image: heroImage,
          title: "Balcony Safety Net",
          service: "Safety Nets",
          location: "Bangalore",
        },
      ];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (heroSlides.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  const moveSlide = (direction: "previous" | "next") => {
    setActiveSlide((current) => {
      if (direction === "previous") {
        return current === 0 ? heroSlides.length - 1 : current - 1;
      }

      return (current + 1) % heroSlides.length;
    });
  };
  const activeHeroSlide = heroSlides[activeSlide];

  return (
    <section className="relative min-h-[84vh] w-full overflow-hidden bg-[#172129] md:min-h-[94vh]">
      <div className="absolute inset-0">
        <Image
          key={activeHeroSlide.image}
          src={activeHeroSlide.image}
          alt={`${activeHeroSlide.service} in ${activeHeroSlide.location} Bangalore`}
          fill
          priority={activeSlide === 0}
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.88),rgba(15,23,42,0.66)_42%,rgba(15,23,42,0.26)_72%,rgba(15,23,42,0.04))]" />

      <div className="relative z-10 mx-auto flex min-h-[84vh] max-w-7xl flex-col items-start justify-center px-6 py-28 text-left text-white md:min-h-[94vh] md:px-12">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#BAE6FD] backdrop-blur-md">
          <ShieldCheck className="size-4" />
          Nagamma Safety Nets
        </p>

        <h1 className="home-hero-title max-w-4xl font-extrabold">
          {title} <span className="text-[#BAE6FD]">in Bangalore</span>
        </h1>

        <p className="home-hero-copy mt-6 max-w-2xl text-white/90">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/contact-us/"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#0369A1] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_38px_rgba(14,165,233,0.32)] transition hover:bg-[#075985] md:text-base"
          >
            <MessageSquareText className="size-4" />
            Get a Free Site Visit
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/gallery/"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 md:text-base"
          >
            View Our Work
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {heroBadges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/20 bg-white/12 px-4 py-2 text-xs font-medium text-white/85 backdrop-blur-md md:text-sm"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="mt-8 flex w-full max-w-4xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                aria-label={`Show ${slide.title}`}
                className={`carousel-control h-2.5 rounded-full transition-all ${
                  index === activeSlide
                    ? "w-10 bg-white"
                    : "w-2.5 bg-white/45 hover:bg-white/75"
                }`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous carousel image"
              className="carousel-control flex size-10 items-center justify-center rounded-full border border-white/25 bg-white/12 text-white backdrop-blur-md transition hover:bg-white/20"
              onClick={() => moveSlide("previous")}
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next carousel image"
              className="carousel-control flex size-10 items-center justify-center rounded-full border border-white/25 bg-white/12 text-white backdrop-blur-md transition hover:bg-white/20"
              onClick={() => moveSlide("next")}
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
