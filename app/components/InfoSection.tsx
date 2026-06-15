"use client";

import Image from "next/image";

type Props = {
  title: string;
  description: string;
  image: string;
};

const InfoSection = ({ title, description, image }: Props) => {
  const benefits = [
    "Site measurement before final quote",
    "Material selected for the actual use case",
    "Neat fixing around corners, pipes, and railings",
    "Clear handover after installation",
  ];

  return (
    <section className="bg-[#F8FAFC] px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
            Installation Approach
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827] md:text-4xl">
            {title}
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

          <a
            href="https://wa.me/7995792953?text=Hi%20Servani%20Safety%20Nets,%20I%20need%20a%20quote"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#C2410C] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#9A3412]"
          >
            Get Quote
          </a>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
          <Image
            src={image}
            alt={title}
            width={760}
            height={560}
            sizes="(max-width: 768px) 92vw, 520px"
            className="aspect-[4/3] w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
