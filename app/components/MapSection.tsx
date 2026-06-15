import React from "react";
import { businessProfile } from "../data/businessProfile";

type MapSectionProps = {
  area: string;
};

const MapSection: React.FC<MapSectionProps> = ({ area }) => {
  return (
    <section className="bg-white px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#111827] md:text-4xl">
          Service location
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center leading-8 text-[#475569]">
          Servani Safety Nets provides installation support in {area}, Bangalore
          and nearby apartments, villas, offices, and commercial spaces.
        </p>

        <div className="mt-10 h-80 w-full overflow-hidden rounded-lg border border-slate-200 bg-[#F8FAFC] shadow-sm md:h-96">
          <iframe
            title={`Map of ${area}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              area + ", Bangalore"
            )}&output=embed`}
          />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={businessProfile.mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#C2410C] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#9A3412]"
          >
            Get Directions
          </a>
          <a
            href={businessProfile.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#0F766E] bg-white px-5 py-2 text-sm font-semibold text-[#0F766E] shadow-sm transition hover:bg-teal-50"
          >
            Google Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
