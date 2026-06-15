import type { Metadata } from "next";
import Link from "next/link";
import { Home, MapPin, Phone, Search, ShieldCheck } from "lucide-react";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import StickyContactIcons from "./stickyicons/stickyIcons";

const BASE_URL = "https://servanisafetynets.com";

export const metadata: Metadata = {
  title: {
    absolute: "Page Not Found | Servani Safety Nets",
  },
  description:
    "The requested Servani Safety Nets page could not be found. Browse safety net services in Bangalore or contact us for help.",
  alternates: {
    canonical: `${BASE_URL}/404`,
  },
  openGraph: {
    title: "Page Not Found | Servani Safety Nets",
    description:
      "The requested Servani Safety Nets page could not be found. Browse safety net services in Bangalore or contact Servani Safety Nets for help.",
    url: `${BASE_URL}/404`,
    siteName: "Servani Safety Nets",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const helpfulLinks = [
  {
    href: "/services/balcony-safety-nets-in-bangalore",
    label: "Balcony Safety Nets",
    text: "Child and pet safety for balconies and high-rise homes.",
  },
  {
    href: "/services/pigeon-safety-nets-in-bangalore",
    label: "Pigeon Safety Nets",
    text: "Measured balcony and duct protection from pigeon entry.",
  },
  {
    href: "/services/invisible-grills-in-bangalore",
    label: "Invisible Grills",
    text: "Slim stainless-steel safety for windows and balconies.",
  },
  {
    href: "/gallery",
    label: "Installation Gallery",
    text: "See real completed safety net and grill work.",
  },
];

const commonAreas = [
  "Whitefield",
  "Indiranagar",
  "HSR Layout",
  "Electronic City",
  "Jayanagar",
  "Hebbal",
];

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8FAFC] pt-[68px] text-[#111827]">
        <section className="border-b border-slate-200 bg-white px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-[#ECFDF5] px-4 py-2 text-sm font-semibold text-[#0F766E]">
                <Search className="size-4" />
                Page not found
              </p>

              <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-[#111827] md:text-5xl">
                This safety nets page is not available.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#475569] md:text-lg">
                The link may be old, typed incorrectly, or moved during the
                latest site update. You can still reach the main service pages,
                Bangalore area pages, or contact Servani Safety Nets directly.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  prefetch={false}
                  href="/"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#0F766E] px-5 py-3 font-semibold text-white transition hover:bg-[#115E59]"
                >
                  <Home className="size-4" />
                  Home
                </Link>
                <a
                  href="tel:+917995792953"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#C2410C] px-5 py-3 font-semibold text-white transition hover:bg-[#9A3412]"
                >
                  <Phone className="size-4" />
                  Call Now
                </a>
                <a
                  href="https://wa.me/917995792953"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#0F766E]/30 bg-white px-5 py-3 font-semibold text-[#0F766E] transition hover:bg-[#F8FAFC]"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#ECFDF5] text-[#0F766E]">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#111827]">
                    Need help finding the right page?
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#475569]">
                    Tell us your area, balcony/window size, and safety need. We
                    will guide you to the right service.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {commonAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-[#334155]"
                  >
                    <MapPin className="size-4 text-[#0F766E]" />
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
                Popular pages
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-[#111827]">
                Continue from here
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {helpfulLinks.map((item) => (
                <Link
                  prefetch={false}
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#0F766E]/40 hover:shadow-md"
                >
                  <h3 className="font-bold text-[#111827]">{item.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#475569]">
                    {item.text}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <StickyContactIcons />
      <Footer />
    </>
  );
}
