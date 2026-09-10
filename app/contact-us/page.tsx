import type { Metadata } from "next";
import Link from "next/link";
import { Clock, MapPin, Phone, ShieldCheck } from "lucide-react";
import ServiceAreaSearch from "../bangalore/components/ServiceAreaSearch";
import { areas, services, siteConfig } from "../bangalore/data/serviceAreaData";
import { buildContactPageJsonLd, sanitizeJsonLd } from "../schema";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${siteConfig.name} for safety nets, invisible grills, sports nets, cloth hangers, and balcony safety services in Bangalore.`,
  alternates: {
    canonical: `${siteConfig.baseUrl}/contact-us/`,
  },
};

export default function ContactUsPage() {
  const jsonLd = buildContactPageJsonLd();

  return (
    <main id="main-content" className="min-h-screen bg-transparent text-[var(--brand-text)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(jsonLd),
        }}
      />
      <section className="bg-[var(--brand-secondary)]/30 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
              Contact us
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-[var(--brand-text)] md:text-6xl">
              Plan your safety net service in Bangalore
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--brand-muted)] md:text-lg">
              Share the service type, area, and installation requirement so the
              request is easy to review before a site visit is planned.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-lg border border-[var(--brand-border)] bg-white shadow-sm shadow-[var(--brand-primary)]/10 backdrop-blur-xl p-4">
                <MapPin className="mb-3 size-6 text-[var(--brand-primary)]" />
                <p className="text-sm font-semibold">{siteConfig.branchAreaName}</p>
                <p className="mt-1 text-xs text-[var(--brand-muted)]">Primary location</p>
              </div>
              <Link
                href={siteConfig.phoneHref}
                className="rounded-lg border border-[var(--brand-border)] bg-white p-4 shadow-sm shadow-[var(--brand-primary)]/10 backdrop-blur-xl transition hover:bg-white/85"
              >
                <Phone className="mb-3 size-6 text-[var(--brand-primary)]" />
                <p className="text-sm font-semibold">{siteConfig.phoneDisplay}</p>
                <p className="mt-1 text-xs text-[var(--brand-muted)]">Call for service</p>
              </Link>
              <div className="rounded-lg border border-[var(--brand-border)] bg-white shadow-sm shadow-[var(--brand-primary)]/10 backdrop-blur-xl p-4">
                <ShieldCheck className="mb-3 size-6 text-[var(--brand-primary)]" />
                <p className="text-sm font-semibold">Measured fitting</p>
                <p className="mt-1 text-xs text-[var(--brand-muted)]">For each opening</p>
              </div>
              <div className="rounded-lg border border-[var(--brand-border)] bg-white shadow-sm shadow-[var(--brand-primary)]/10 backdrop-blur-xl p-4">
                <Clock className="mb-3 size-6 text-[var(--brand-primary)]" />
                <p className="text-sm font-semibold">Site check</p>
                <p className="mt-1 text-xs text-[var(--brand-muted)]">Before fitting</p>
              </div>
            </div>
          </div>

          <ContactForm services={services} areas={areas} />
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
              Find the right page
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Search by service and area
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">
              Choose the service and area to open the matching Bangalore page.
            </p>
            <Link
              href="/bangalore/"
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[var(--brand-border)] bg-white backdrop-blur-xl px-5 py-2 text-sm font-semibold text-[var(--brand-primary)] transition hover:bg-white"
            >
              View Bangalore Services
            </Link>
          </div>

          <ServiceAreaSearch id="service-area-search" services={services} areas={areas} />
        </div>
      </section>
    </main>
  );
}
