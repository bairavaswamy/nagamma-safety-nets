import Link from "next/link";
import { MapPin, ShieldCheck } from "lucide-react";
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
    <footer className="border-t border-white/10 bg-[linear-gradient(135deg,#082F2A_0%,#04483F_56%,#4B261B_100%)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr_1.1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white shadow-[0_14px_38px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                <ShieldCheck className="size-6" />
              </span>
              <span>
                <span className="block text-lg font-extrabold">
                  {siteConfig.name}
                </span>
                <span className="block text-sm text-slate-300">
                  {siteConfig.city} safety services
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
              Safety nets, invisible grills, sports nets, and cloth hanger
              services across Bangalore with {siteConfig.branchAreaName} as the
              service base.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-teal-100">
              <MapPin className="size-4 text-[#A7E6D0]" />
              {siteConfig.branchAreaName}, {siteConfig.city}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#A7E6D0]">
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
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#A7E6D0]">
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
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#A7E6D0]">
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
