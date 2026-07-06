import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import {
  areas,
  getServiceAreaPath,
  getServicePath,
  services,
  siteConfig,
  type AreaSlug,
} from "../bangalore/data/serviceAreaData";

export default function SiteFooter() {
  const branchAreaSlug = siteConfig.branchAreaSlug as AreaSlug;

  return (
    <footer className="border-t border-white/10 bg-[linear-gradient(135deg,#111820_0%,#3B0A0D_48%,#7A0C0F_100%)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr_1.1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex rounded-lg p-1 transition hover:opacity-90"
              aria-label={`${siteConfig.name} home`}
            >
              <Image
                src="/logo-horizontal-light.webp"
                alt={`${siteConfig.name} logo`}
                width={300}
                height={94}
                className="h-16 w-auto max-w-[280px] object-contain"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
              Safety nets, invisible grills, sports nets, and cloth hanger
              services across Bangalore with {siteConfig.branchAreaName} as the
              service base.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#F0C9C9]">
              <MapPin className="size-4 text-[#F0C9C9]" />
              {siteConfig.branchAreaName}, {siteConfig.city}
            </div>

            <Link
              href={siteConfig.phoneHref}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#F0C9C9] transition hover:text-white"
            >
              <Phone className="size-4" />
              {siteConfig.phoneDisplay}
            </Link>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F0C9C9]">
              Services
            </h2>
            <nav className="mt-4 grid gap-2" aria-label="Footer services">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={getServicePath(service.slug)}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  {service.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F0C9C9]">
              Marathahalli
            </h2>
            <nav className="mt-4 grid gap-2" aria-label="Marathahalli services">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={getServiceAreaPath(service.slug, branchAreaSlug)}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  {service.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F0C9C9]">
              Coverage
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {areas.map((area) => (
                <span
                  key={area.slug}
                  className="rounded-lg border border-white/[0.12] bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-md"
                >
                  {area.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>
            Copyright {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/about/" className="transition hover:text-white">
              About
            </Link>
            <Link href="/gallery/" className="transition hover:text-white">
              Gallery
            </Link>
            <Link href="/contact-us/" className="transition hover:text-white">
              Contact
            </Link>
            <Link href="/bangalore/" className="transition hover:text-white">
              Bangalore Services
            </Link>
            <Link
              href="/#service-area-search"
              className="transition hover:text-white"
            >
              Search Services
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
