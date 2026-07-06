import Link from "next/link";
import { ArrowRight, Camera, MapPinned, MessageSquareText, Phone } from "lucide-react";
import { siteConfig } from "../bangalore/data/serviceAreaData";

export default function ContactCta() {
  return (
    <section className="border-t border-white/45 bg-white/30 px-6 py-14 md:px-10">
      <div className="border border-white/70 bg-white/75 shadow-2xl shadow-[#B5121B]/15 backdrop-blur-xl mx-auto grid max-w-7xl gap-6 rounded-lg p-5 md:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#B5121B]">
            <MapPinned className="size-4" />
            {siteConfig.branchAreaName}, {siteConfig.city}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#172129] md:text-3xl">
            Need a site check for a balcony, window, duct, or utility space?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5E4B4B] md:text-base">
            Share the service, area, and a few photos of the opening. The visit
            can be planned around the surface, access, material, and daily use
            of the space.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <Link
            href={siteConfig.phoneHref}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-[#F0C9C9] bg-white/80 px-5 py-2 text-sm font-semibold text-[#B5121B] shadow-[0_10px_30px_rgba(181,18,27,0.10)] backdrop-blur-xl transition hover:bg-white"
          >
            <Phone className="size-4" />
            {siteConfig.phoneDisplay}
          </Link>
          <Link
            href={siteConfig.contactPath}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-[#B5121B] to-[#7A0C0F] px-5 py-2 text-sm font-semibold text-white shadow-[0_16px_38px_rgba(181,18,27,0.22)] transition hover:brightness-95"
          >
            <MessageSquareText className="size-4" />
            Contact Us
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/gallery/"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-white/70 bg-white/70 px-5 py-2 text-sm font-semibold text-[#B5121B] shadow-[0_10px_30px_rgba(181,18,27,0.10)] backdrop-blur-xl transition hover:bg-white/85"
          >
            <Camera className="size-4" />
            View Work
          </Link>
        </div>
      </div>
    </section>
  );
}
