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
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#075E54]">
            Work Gallery
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[#082F2A] md:text-5xl">
            Our Work in Bangalore
          </h2>
          <p className="mt-4 text-[#536761]">
            Real installations across Bangalore homes and apartments.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/65 bg-white/70 backdrop-blur-xl text-[#075E54] shadow-sm"
            aria-label="Previous slide"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/65 bg-white/70 backdrop-blur-xl text-[#075E54] shadow-sm"
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
                className="relative h-72 min-w-[300px] cursor-pointer overflow-hidden rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#075E54]/10 backdrop-blur-xl"
                onClick={() => setPreview(item)}
              >
                <Image
                  src={item.image}
                  alt={`${item.service} in ${item.location} Bangalore`}
                  fill
                  className="object-cover"
                  sizes="300px"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#082F2A]/85 to-transparent p-4 text-white">
                  <div className="mb-2 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-[#C65A31] px-3 py-1 font-semibold">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#082F2A]/90 p-4"
          onClick={() => setPreview(null)}
        >
          <div className="relative h-[80vh] w-[90%] max-w-4xl">
            <button
              onClick={() => setPreview(null)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-[#082F2A] shadow-sm"
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

            <div className="absolute inset-x-0 bottom-0 rounded-b-lg bg-[#082F2A]/80 p-6 text-white">
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
