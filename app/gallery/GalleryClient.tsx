"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import StickyContactIcons from "../stickyicons/stickyIcons";

type MediaItem = {
  src: string;
  type: "image" | "video";
  alt: string;
};

const generateMedia = (
  count: number,
  type: "image" | "video",
  ext: string,
  category: string
): MediaItem[] =>
  Array.from({ length: count }, (_, i) => ({
    src: `/gallery/${category}-${i + 1}.${ext}`,
    type,
    alt: `${category.replaceAll("-", " ")} installation in Bangalore`,
  }));

const mediaItems: MediaItem[] = [
  ...generateMedia(9, "image", "webp", "balcony-safety-nets-bangalore"),
  ...generateMedia(9, "image", "webp", "transparent-safety-nets-bangalore"),
  ...generateMedia(21, "image", "webp", "invisible-grills-bangalore"),
  ...generateMedia(7, "image", "webp", "hdpe-nets-bangalore"),
  ...generateMedia(5, "video", "mp4", "installation"),
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const filteredItems = mediaItems.filter((item) =>
    activeTab === "images" ? item.type === "image" : item.type === "video"
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8FAFC] px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
            Gallery
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#111827] md:text-6xl">
            Our Installation Gallery
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#475569]">
            Explore real balcony safety nets, pigeon nets, and invisible grill
            installations across Bangalore homes and apartments.
          </p>

          <div
            className="mb-12 mt-10 flex justify-center gap-3"
            role="tablist"
            aria-label="Gallery media type"
          >
            <button
              onClick={() => setActiveTab("images")}
              role="tab"
              aria-selected={activeTab === "images"}
              className={`min-h-[44px] rounded-lg px-6 py-2 font-semibold transition ${
                activeTab === "images"
                  ? "bg-[#0F766E] text-white"
                  : "border border-slate-200 bg-white text-[#0F766E]"
              }`}
            >
              Photos
            </button>

            <button
              onClick={() => setActiveTab("videos")}
              role="tab"
              aria-selected={activeTab === "videos"}
              className={`min-h-[44px] rounded-lg px-6 py-2 font-semibold transition ${
                activeTab === "videos"
                  ? "bg-[#0F766E] text-white"
                  : "border border-slate-200 bg-white text-[#0F766E]"
              }`}
            >
              Videos
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filteredItems.map((item, index) => (
              <article
                key={item.src}
                onClick={() => setSelectedMedia(item)}
                className="cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
              >
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={500}
                    height={350}
                    className="h-64 w-full object-cover"
                    sizes="(max-width:768px) 100vw, 33vw"
                    priority={index < 2}
                  />
                ) : (
                  <video
                    src={item.src}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-64 w-full object-cover"
                  />
                )}

                <p className="px-3 py-3 text-center text-sm text-[#475569]">
                  {item.alt}
                </p>
              </article>
            ))}
          </div>
        </div>

        {selectedMedia && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/90 p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <div
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-[#111827] shadow-sm"
                aria-label="Close preview"
              >
                x
              </button>

              {selectedMedia.type === "image" ? (
                <Image
                  src={selectedMedia.src}
                  alt={selectedMedia.alt}
                  width={1000}
                  height={700}
                  className="max-h-[80vh] w-full rounded-lg object-contain"
                />
              ) : (
                <video
                  src={selectedMedia.src}
                  controls
                  autoPlay
                  className="max-h-[80vh] w-full rounded-lg"
                />
              )}
            </div>
          </div>
        )}
      </main>

      <StickyContactIcons />
      <Footer />
    </>
  );
}
