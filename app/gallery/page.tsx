import type { Metadata } from "next";
import Link from "next/link";
import { Camera, MapPinned } from "lucide-react";
import { galleryData } from "../home/data/homeData";
import { siteConfig } from "../bangalore/data/serviceAreaData";
import GalleryGrid from "./GalleryGrid";

export const metadata: Metadata = {
  title: `Gallery | ${siteConfig.name}`,
  description: `View ${siteConfig.name} safety net, invisible grill, and utility installation photos from Bangalore service areas.`,
  alternates: {
    canonical: `${siteConfig.baseUrl}/gallery/`,
  },
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      <section className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
              Gallery
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-[#111827] md:text-6xl">
              Installation work across Bangalore
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#475569] md:text-lg">
              Browse safety net, pigeon net, invisible grill, and home utility
              installation images from Bangalore service areas.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-5">
              <Camera className="mb-4 size-7 text-[#0F766E]" />
              <p className="text-3xl font-extrabold">{galleryData.length}</p>
              <p className="mt-1 text-sm text-[#475569]">Gallery items</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-5">
              <MapPinned className="mb-4 size-7 text-[#0F766E]" />
              <p className="text-3xl font-extrabold">
                {siteConfig.branchAreaName}
              </p>
              <p className="mt-1 text-sm text-[#475569]">
                Primary service location
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
                Work photos
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Browse by service type
              </h2>
            </div>
            <Link
              href="/bangalore/"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-[#0F766E] transition hover:bg-[#F8FAFC]"
            >
              View Service Areas
            </Link>
          </div>

          <GalleryGrid images={galleryData} />
        </div>
      </section>
    </main>
  );
}
