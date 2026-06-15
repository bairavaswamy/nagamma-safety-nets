"use client";

import GetQuoteButton from "./GetQuoteButton";
import ImageCard from "./ImageCard";

type InfoSectionProps = {
  title: string;
  description: string;
  image: string;
};

const InfoSection = ({ title, description, image }: InfoSectionProps) => {
  const benefits = [
    "Measured after checking the balcony, window, duct, or stair shape",
    "Material suggested for the actual use: children, pets, pigeons, or fall protection",
    "Neat fixing with attention to corners, pipes, railings, and access points",
    "Clear price explanation before installation starts",
  ];

  return (
    <section className="bg-[#F8FAFC] px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
            Service Details
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827] md:text-4xl">
            Why homeowners choose {title}
          </h2>
          <p className="mt-5 text-base leading-8 text-[#475569] md:text-lg">
            {description}
          </p>

          <ul className="mt-7 space-y-3 text-[#334155]">
            {benefits.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#0F766E]" />
                <span className="leading-7">{item}</span>
              </li>
            ))}
          </ul>

          <GetQuoteButton />
        </div>

        <ImageCard image={image} title={title} />
      </div>
    </section>
  );
};

export default InfoSection;
