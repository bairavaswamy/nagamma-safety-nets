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
    <section className="bg-white/45 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B5121B]">
            Project snapshots
          </p>
          <span className="mx-auto mt-3 block h-1 w-12 rounded-full bg-[#B5121B]" />
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#172129] md:text-5xl">
            Safety Work for Bangalore Homes
          </h2>
          <p className="mt-4 text-[#5E4B4B]">
            Balcony nets, invisible grills, utility fittings, pigeon control,
            and sports net work shown in real-use settings.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/75 text-[#172129] shadow-lg shadow-[#172129]/10 backdrop-blur-xl transition hover:text-[#B5121B]"
            aria-label="Previous slide"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/75 text-[#172129] shadow-lg shadow-[#172129]/10 backdrop-blur-xl transition hover:text-[#B5121B]"
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
                className="relative h-72 min-w-[300px] cursor-pointer overflow-hidden rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#172129]/10 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[#172129]/15 sm:min-w-[360px]"
                onClick={() => setPreview(item)}
              >
                <Image
                  src={item.image}
                  alt={`${item.service} in ${item.location} Bangalore`}
                  fill
                  className="object-cover"
                  sizes="300px"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#172129]/85 to-transparent p-4 text-white">
                  <div className="mb-2 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full border border-white/35 bg-white/85 px-3 py-1 font-semibold text-[#172129] backdrop-blur-md">
                      {item.service}
                    </span>
                    <span className="rounded-full border border-[#F0C9C9]/45 bg-[#F8EFEF]/90 px-3 py-1 font-medium text-[#7A0C0F] backdrop-blur-md">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#172129]/90 p-4"
          onClick={() => setPreview(null)}
        >
          <div className="relative h-[80vh] w-[90%] max-w-4xl">
            <button
              onClick={() => setPreview(null)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-[#172129] shadow-sm"
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

            <div className="absolute inset-x-0 bottom-0 rounded-b-lg bg-[#172129]/80 p-6 text-white">
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
