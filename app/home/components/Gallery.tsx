"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface GalleryItem {
  image: string;
  title: string;
  location: string;
  service: string;
}

export default function Gallery({ images }: { images: GalleryItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<GalleryItem | null>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
            Work Gallery
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[#111827] md:text-5xl">
            Our Work in Bangalore
          </h2>
          <p className="mt-4 text-[#475569]">
            Real installations across Bangalore homes and apartments.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0F766E] shadow-sm"
            aria-label="Previous slide"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0F766E] shadow-sm"
            aria-label="Next slide"
          >
            <FaChevronRight />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto px-12 pb-2"
          >
            {images.map((item) => (
              <article
                key={`${item.title}-${item.location}`}
                className="relative h-72 min-w-[300px] cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
                onClick={() => setPreview(item)}
              >
                <Image
                  src={item.image}
                  alt={`${item.service} in ${item.location} Bangalore`}
                  fill
                  className="object-cover"
                  sizes="300px"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F172A]/85 to-transparent p-4 text-white">
                  <div className="mb-2 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-[#C2410C] px-3 py-1 font-semibold">
                      {item.service}
                    </span>
                    <span className="rounded-full bg-white/20 px-3 py-1">
                      {item.location}
                    </span>
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/90 p-4"
          onClick={() => setPreview(null)}
        >
          <div className="relative h-[80vh] w-[90%] max-w-4xl">
            <button
              onClick={() => setPreview(null)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111827] shadow-sm"
              aria-label="Close preview"
            >
              x
            </button>
            <Image
              src={preview.image}
              alt={preview.title}
              fill
              className="object-contain"
              sizes="90vw"
            />

            <div className="absolute inset-x-0 bottom-0 rounded-b-lg bg-[#0F172A]/80 p-6 text-white">
              <h3 className="text-xl font-bold">{preview.title}</h3>
              <p className="text-slate-200">
                {preview.service} in {preview.location}, Bangalore
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
