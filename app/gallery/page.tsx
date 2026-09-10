import type { Metadata } from "next";
import Link from "next/link";
import { Camera, MapPinned } from "lucide-react";
import { galleryData } from "../home/data/homeData";
import { siteConfig } from "../bangalore/data/serviceAreaData";
import { buildGalleryPageJsonLd, sanitizeJsonLd } from "../schema";
import GalleryGrid from "./GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Explore illustrative safety net, invisible grill and home utility examples with ${siteConfig.name} in Bangalore.`,
  alternates: {
    canonical: `${siteConfig.baseUrl}/gallery/`,
  },
};

export default function GalleryPage() {
  const jsonLd = buildGalleryPageJsonLd();

  return (
    <main id="main-content" className="min-h-screen bg-transparent text-[var(--brand-text)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(jsonLd),
        }}
      />
      <section className="bg-[var(--brand-secondary)]/30 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
              Gallery
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-[var(--brand-text)] md:text-6xl">
              Picture a safer, more comfortable home.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--brand-muted)] md:text-lg">
              Explore safety nets, invisible grills and useful home fittings.
              These illustrative images show the possibilities for your space.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-[var(--brand-border)] bg-white p-5 shadow-sm shadow-[var(--brand-primary)]/10 backdrop-blur-xl">
              <Camera className="mb-4 size-7 text-[var(--brand-primary)]" />
              <p className="text-3xl font-semibold">{galleryData.length}</p>
              <p className="mt-1 text-sm text-[var(--brand-muted)]">Gallery items</p>
            </div>
            <div className="rounded-lg border border-[var(--brand-border)] bg-white p-5 shadow-sm shadow-[var(--brand-primary)]/10 backdrop-blur-xl">
              <MapPinned className="mb-4 size-7 text-[var(--brand-primary)]" />
              <p className="text-3xl font-semibold">
                {siteConfig.branchAreaName}
              </p>
              <p className="mt-1 text-sm text-[var(--brand-muted)]">
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
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                Service inspiration
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Browse by service type
              </h2>
            </div>
            <Link
              href="/bangalore/"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[var(--brand-border)] bg-white px-5 py-2 text-sm font-semibold text-[var(--brand-primary)] backdrop-blur-xl transition hover:bg-[var(--brand-secondary)]"
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
