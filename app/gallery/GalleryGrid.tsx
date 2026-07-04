"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { X } from "lucide-react";

type GalleryItem = {
  image: string;
  title: string;
  location: string;
  service: string;
};

type GalleryGridProps = {
  images: GalleryItem[];
};

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [activeService, setActiveService] = useState("All");
  const [preview, setPreview] = useState<GalleryItem | null>(null);

  const services = useMemo(
    () => ["All", ...Array.from(new Set(images.map((item) => item.service)))],
    [images]
  );

  const filteredImages =
    activeService === "All"
      ? images
      : images.filter((item) => item.service === activeService);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {services.map((service) => (
          <button
            key={service}
            type="button"
            onClick={() => setActiveService(service)}
            className={`min-h-[40px] rounded-lg border px-4 py-2 text-sm font-semibold transition ${
              activeService === service
                ? "border-[#075E54] bg-[#075E54] text-white"
                : "border-slate-200 bg-white/70 text-[#263B35] hover:border-[#075E54]/40"
            }`}
          >
            {service}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredImages.map((item) => (
          <button
            key={`${item.title}-${item.location}`}
            type="button"
            onClick={() => setPreview(item)}
            className="group overflow-hidden rounded-lg border border-white/65 bg-white/70 backdrop-blur-xl text-left shadow-[0_14px_45px_rgba(7,94,84,0.10)] transition hover:border-[#075E54]/40"
          >
            <span className="relative block aspect-[4/3] overflow-hidden">
              <Image
                src={item.image}
                alt={`${item.title} in ${item.location}`}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </span>
            <span className="block p-4">
              <span className="inline-flex rounded-lg bg-[#DDF4EC] px-3 py-1 text-xs font-semibold text-[#075E54]">
                {item.service}
              </span>
              <span className="mt-3 block text-lg font-semibold text-[#082F2A]">
                {item.title}
              </span>
              <span className="mt-1 block text-sm text-[#70847D]">
                {item.location}, Bangalore
              </span>
            </span>
          </button>
        ))}
      </div>

      {preview ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#082F2A]/90 p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="relative h-[82vh] w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-white/70 text-[#082F2A] shadow-sm"
              aria-label="Close image preview"
            >
              <X className="size-5" />
            </button>
            <Image
              src={preview.image}
              alt={preview.title}
              fill
              className="object-contain"
              sizes="90vw"
            />
            <div className="absolute inset-x-0 bottom-0 rounded-b-lg bg-[#082F2A]/80 p-5 text-white">
              <h2 className="text-xl font-bold">{preview.title}</h2>
              <p className="mt-1 text-sm text-slate-200">
                {preview.service} in {preview.location}, Bangalore
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
