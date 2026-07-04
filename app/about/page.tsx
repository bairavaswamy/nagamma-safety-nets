import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import {
  areas,
  getServicePath,
  services,
  siteConfig,
} from "../bangalore/data/serviceAreaData";

export const metadata: Metadata = {
  title: `About ${siteConfig.name}`,
  description: `${siteConfig.name} provides safety net, invisible grill, sports net, and cloth hanger services across Bangalore from the Marathahalli service location.`,
  alternates: {
    canonical: `${siteConfig.baseUrl}/about/`,
  },
};

const strengths = [
  "Measured fitting for balconies, windows, ducts, stair openings, terraces, and utility spaces.",
  "Focused service structure for seven core safety and utility solutions.",
  "Area-wise coverage across Bangalore with Marathahalli as the primary local base.",
  "Clean installation planning that protects safety, airflow, light, and daily usability.",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      <section className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
              About us
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-[#111827] md:text-6xl">
              Practical safety work for Bangalore homes and apartments
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#475569] md:text-lg">
              {siteConfig.name} helps families, apartment residents, and property
              teams plan dependable safety net and utility installations across
              {` ${siteConfig.city}`}. The service base is in{" "}
              {siteConfig.branchAreaName}, with structured coverage across the
              city.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/bangalore/"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#0F766E] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#115E59]"
              >
                View Bangalore Services
              </Link>
              <Link
                href="/gallery/"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-[#0F766E] transition hover:bg-[#F8FAFC]"
              >
                View Gallery
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-5">
              <ShieldCheck className="mb-4 size-7 text-[#0F766E]" />
              <p className="text-3xl font-extrabold">{services.length}</p>
              <p className="mt-1 text-sm text-[#475569]">Core services</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-5">
              <MapPin className="mb-4 size-7 text-[#0F766E]" />
              <p className="text-3xl font-extrabold">{areas.length}</p>
              <p className="mt-1 text-sm text-[#475569]">Bangalore areas</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-5 sm:col-span-2">
              <Sparkles className="mb-4 size-7 text-[#0F766E]" />
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
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
              What we do
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Seven focused services, one clear local structure
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={getServicePath(service.slug)}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#0F766E]/40"
              >
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[#475569]">
                  {service.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
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
                className="flex items-start gap-3 rounded-lg border border-slate-200 bg-[#F8FAFC] p-4"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#0F766E]" />
                <p className="text-sm leading-6 text-[#475569]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
