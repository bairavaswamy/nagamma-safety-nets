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
              About us
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-[var(--brand-text)] md:text-6xl">
              Practical safety work for Bangalore homes and apartments
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--brand-muted)] md:text-lg">
              {siteConfig.name} helps families, apartment residents, and property
              teams plan dependable safety net and utility installations across
              {` ${siteConfig.city}`}. The service base is in{" "}
              {siteConfig.branchAreaName}, with structured coverage across the
              city.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/bangalore/"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[var(--brand-primary)] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(23,77,139,0.12)] transition hover:bg-[var(--brand-primary-dark)]"
              >
                View Bangalore Services
              </Link>
              <Link
                href="/gallery/"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[var(--brand-border)] bg-white backdrop-blur-xl px-5 py-2 text-sm font-semibold text-[var(--brand-primary)] transition hover:bg-[var(--brand-secondary)]"
              >
                View Gallery
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-[var(--brand-border)] bg-white shadow-sm shadow-[var(--brand-primary)]/10 backdrop-blur-xl p-5">
              <ShieldCheck className="mb-4 size-7 text-[var(--brand-primary)]" />
              <p className="text-3xl font-semibold">Core</p>
              <p className="mt-1 text-sm text-[var(--brand-muted)]">Main work lines</p>
            </div>
            <div className="rounded-lg border border-[var(--brand-border)] bg-white shadow-sm shadow-[var(--brand-primary)]/10 backdrop-blur-xl p-5">
              <MapPin className="mb-4 size-7 text-[var(--brand-primary)]" />
              <p className="text-3xl font-semibold">{siteConfig.city}</p>
              <p className="mt-1 text-sm text-[var(--brand-muted)]">Service coverage</p>
            </div>
            <div className="rounded-lg border border-[var(--brand-border)] bg-white shadow-sm shadow-[var(--brand-primary)]/10 backdrop-blur-xl p-5 sm:col-span-2">
              <Sparkles className="mb-4 size-7 text-[var(--brand-primary)]" />
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
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
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
                className="rounded-lg border border-[var(--brand-border)] bg-white shadow-sm shadow-[var(--brand-primary)]/10 backdrop-blur-xl p-5 transition hover:border-[var(--brand-primary)]/40"
              >
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--brand-muted)]">
                  {service.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-secondary)]/30 px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
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
                className="flex items-start gap-3 rounded-lg border border-[var(--brand-border)] bg-white shadow-sm shadow-[var(--brand-primary)]/10 backdrop-blur-xl p-4"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--brand-primary)]" />
                <p className="text-sm leading-6 text-[var(--brand-muted)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
