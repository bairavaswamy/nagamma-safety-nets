import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import {
  getServicePath,
  services,
  siteConfig,
} from "../bangalore/data/serviceAreaData";
import { buildAboutPageJsonLd, sanitizeJsonLd } from "../schema";

export const metadata: Metadata = {
  title: "About Us",
  description: `${siteConfig.name} provides safety net, invisible grill, sports net, and cloth hanger services across Bangalore from the Marathahalli service location.`,
  alternates: {
    canonical: `${siteConfig.baseUrl}/about/`,
  },
};

const strengths = [
  "Measured fitting for balconies, windows, ducts, stair openings, terraces, and utility spaces.",
  "Focused safety and utility work for the main needs Bangalore homes ask for.",
  "Bangalore coverage planned from the Marathahalli business base.",
  "Clean installation planning that protects safety, airflow, light, and daily usability.",
];

export default function AboutPage() {
  const jsonLd = buildAboutPageJsonLd();

  return (
    <main className="min-h-screen bg-transparent text-[#172129]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(jsonLd),
        }}
      />
      <section className="bg-white/45 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B5121B]">
              About us
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-[#172129] md:text-6xl">
              Practical safety work for Bangalore homes and apartments
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#5E4B4B] md:text-lg">
              {siteConfig.name} helps families, apartment residents, and property
              teams plan dependable safety net and utility installations across
              {` ${siteConfig.city}`}. The service base is in{" "}
              {siteConfig.branchAreaName}, with structured coverage across the
              city.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/bangalore/"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#B5121B] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(181,18,27,0.12)] transition hover:bg-[#7A0C0F]"
              >
                View Bangalore Services
              </Link>
              <Link
                href="/gallery/"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white/70 bg-white/70 backdrop-blur-xl px-5 py-2 text-sm font-semibold text-[#B5121B] transition hover:bg-[#F8EFEF]"
              >
                View Gallery
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#B5121B]/10 backdrop-blur-xl p-5">
              <ShieldCheck className="mb-4 size-7 text-[#B5121B]" />
              <p className="text-3xl font-extrabold">Core</p>
              <p className="mt-1 text-sm text-[#5E4B4B]">Main work lines</p>
            </div>
            <div className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#B5121B]/10 backdrop-blur-xl p-5">
              <MapPin className="mb-4 size-7 text-[#B5121B]" />
              <p className="text-3xl font-extrabold">{siteConfig.city}</p>
              <p className="mt-1 text-sm text-[#5E4B4B]">Service coverage</p>
            </div>
            <div className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#B5121B]/10 backdrop-blur-xl p-5 sm:col-span-2">
              <Sparkles className="mb-4 size-7 text-[#B5121B]" />
              <p className="text-3xl font-extrabold">
                {siteConfig.branchAreaName}
              </p>
              <p className="mt-1 text-sm text-[#5E4B4B]">
                Primary service location
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B5121B]">
              What we do
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Focused home-safety work with a clear Bangalore structure
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={getServicePath(service.slug)}
                className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#B5121B]/10 backdrop-blur-xl p-5 transition hover:border-[#B5121B]/40"
              >
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5E4B4B]">
                  {service.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/45 px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B5121B]">
              Our approach
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Built around practical installation decisions
            </h2>
          </div>
          <div className="grid gap-3">
            {strengths.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#B5121B]/10 backdrop-blur-xl p-4"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#B5121B]" />
                <p className="text-sm leading-6 text-[#5E4B4B]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
