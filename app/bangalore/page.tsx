import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import ServiceAreaSearch from "./components/ServiceAreaSearch";
import { areas, services, siteConfig } from "./data/serviceAreaData";
import { cardsData } from "../home/data/homeData";
import { buildBangaloreLandingJsonLd, sanitizeJsonLd } from "../schema";

export const metadata: Metadata = {
  title: `Safety Net Services in ${siteConfig.city}`,
  description: `${siteConfig.name} helps Bangalore homes choose practical safety net, invisible grill, sports net, and cloth hanger installation from the Marathahalli service base.`,
  alternates: {
    canonical: `${siteConfig.baseUrl}/bangalore/`,
  },
};

const choosingNotes = [
  {
    title: "For balconies and high-rise homes",
    body: "Choose balcony safety nets when the main concern is fall protection, child safety, pet safety, or an open edge that needs a neat barrier without closing the space.",
  },
  {
    title: "For birds and everyday cleaning",
    body: "Choose pigeon safety nets when birds are entering balconies, windows, ducts, or utility areas and the home needs a cleaner, easier-to-maintain setup.",
  },
  {
    title: "For open views with safety",
    body: "Choose invisible grills when the space needs a stronger edge guard but the view, light, and balcony look should stay open.",
  },
  {
    title: "For activity areas and utility use",
    body: "Sports nets and cloth hangers are planned around daily movement, reach, airflow, and the way the space is actually used.",
  },
];

const workingStyle = [
  "The opening is checked before suggesting a fitting style.",
  "Corners, pipes, railing gaps, and ceiling points are planned carefully.",
  "The finish is kept simple so the space remains easy to use after installation.",
  "Service and location details are matched before the visit is planned.",
];

export default function BangaloreLandingPage() {
  const jsonLd = buildBangaloreLandingJsonLd();

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
              Bangalore services
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-[var(--brand-text)] md:text-6xl">
              Choose the right safety work for your home
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--brand-muted)] md:text-lg">
              Every balcony, window, duct, terrace, and utility space behaves a
              little differently. This page helps you start with the right kind
              of work, then choose your area so the request is clear from the
              beginning.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#services"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[var(--brand-primary)] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(23,77,139,0.12)] transition hover:bg-[var(--brand-primary-dark)]"
              >
                View Services
              </Link>
              <Link
                href="#service-area-search"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[var(--brand-border)] bg-white backdrop-blur-xl px-5 py-2 text-sm font-semibold text-[var(--brand-primary)] transition hover:bg-[var(--brand-secondary)]"
              >
                Search by Area
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-[var(--brand-border)] bg-white shadow-sm shadow-[var(--brand-primary)]/10 backdrop-blur-xl p-5">
            <div className="mb-5 flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-primary)] text-white">
                <MapPin className="size-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold">
                  Based around {siteConfig.branchAreaName}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">
                  Nagamma Safety Nets serves Bangalore from the Marathahalli
                  side, which makes it easier to plan nearby apartment, villa,
                  and commercial visits with the right site details.
                </p>
              </div>
            </div>

            <ServiceAreaSearch id="service-area-search" services={services} areas={areas} />
          </div>
        </div>
      </section>

      <section id="services" className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
              What do you need help with?
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Start with the problem, not the product name
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--brand-muted)]">
              Some homes need fall protection, some need bird control, and some
              need a cleaner way to use the balcony or utility space. These
              cards keep the choice simple.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {cardsData.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group overflow-hidden rounded-lg border border-[var(--brand-border)] bg-white shadow-sm shadow-[var(--brand-primary)]/10 backdrop-blur-xl transition hover:border-[var(--brand-primary)]/40"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <span className="absolute left-3 top-3 rounded-lg bg-[var(--brand-secondary)]/30 px-3 py-1 text-xs font-semibold text-[var(--brand-primary)] shadow-sm">
                    {service.badge}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-[var(--brand-text)]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--brand-muted)]">
                    {service.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[service.badge].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-[var(--brand-surface-soft)] px-2.5 py-1 text-xs font-medium text-[var(--brand-primary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 text-sm font-semibold text-[var(--brand-primary)]">
                    See details
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-secondary)]/30 px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
              How to decide
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              A practical way to narrow it down
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--brand-muted)]">
              The right choice depends on what is happening in the space: a
              child leaning near a railing, birds entering a duct, a balcony
              needing a cleaner look, or a utility area that needs better daily
              use.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {choosingNotes.map((note) => (
              <article
                key={note.title}
                className="rounded-lg border border-[var(--brand-border)] bg-white shadow-sm shadow-[var(--brand-primary)]/10 backdrop-blur-xl p-5"
              >
                <ShieldCheck className="mb-4 size-6 text-[var(--brand-primary)]" />
                <h3 className="text-lg font-semibold">{note.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--brand-muted)]">
                  {note.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
              Before installation
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Good fitting starts with small details
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--brand-muted)]">
              A net or grill should not feel like an afterthought. The fitting
              has to respect the railing, ceiling, wall finish, pipes, window
              movement, and the way people use the space every day.
            </p>
          </div>

          <div className="rounded-lg border border-[var(--brand-border)] bg-white shadow-sm shadow-[var(--brand-primary)]/10 backdrop-blur-xl p-5">
            <div className="grid gap-3">
              {workingStyle.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--brand-primary)]" />
                  <p className="text-sm leading-6 text-[var(--brand-muted)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="service-areas" className="bg-[var(--brand-secondary)]/30 px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
              Bangalore coverage
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Choose your area and open the matching page
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--brand-muted)]">
              If your area is listed below, use the search box to pair it with
              the service you need. If you are near one of these places, start
              with the closest area and the details can be adjusted later.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map((area) => (
              <div
                key={area.slug}
                className="rounded-lg border border-[var(--brand-border)] bg-white shadow-sm shadow-[var(--brand-primary)]/10 backdrop-blur-xl p-4"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-[var(--brand-primary)]" />
                  <h3 className="font-semibold">{area.name}</h3>
                </div>
                {area.slug === siteConfig.branchAreaSlug ? (
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-primary)]">
                    Primary service base
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
