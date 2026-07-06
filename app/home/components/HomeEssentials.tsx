import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  MapPin,
  Ruler,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { Area } from "@/app/bangalore/data/serviceAreaData";

const processItems = [
  {
    title: "Photos and first discussion",
    body: "Share the balcony, window, duct, terrace, or utility space. We check access, opening size, and the kind of safety concern before suggesting a fitting plan.",
    icon: ClipboardCheck,
  },
  {
    title: "Measurement before fitting",
    body: "The net, grill, hanger, or sports enclosure is planned around the actual surface, hook points, railing depth, and how the space is used every day.",
    icon: Ruler,
  },
  {
    title: "Neat installation finish",
    body: "The work is completed with suitable anchors, clean tension, trimmed edges, and a final check so the space stays usable after installation.",
    icon: Wrench,
  },
];

export default function HomeEssentials({ areas }: { areas: readonly Area[] }) {
  return (
    <section className="bg-white/45 px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="inline-flex items-center gap-2 rounded-lg bg-[#F4E7E7] px-3 py-2 text-sm font-semibold uppercase text-[#B5121B]">
              <ShieldCheck className="size-4" />
              Home setup
            </p>
            <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight text-[#172129] md:text-5xl">
              Planned safety work for Bangalore apartments
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#5E4B4B]">
              A good installation should not feel forced into the space. We
              look at the opening, material, fixing surface, and daily use
              before deciding how the net, grill, hanger, or sports enclosure
              should be fitted.
            </p>

            <Link
              href="/bangalore/"
              className="mt-7 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#B5121B] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(181,18,27,0.12)] transition hover:bg-[#7A0C0F]"
            >
              View Bangalore Services
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {processItems.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-lg border border-white/70 bg-white/70 p-5 shadow-xl shadow-[#172129]/10 backdrop-blur-xl"
                >
                  <Icon className="mb-4 size-6 text-[#B5121B]" />
                  <h3 className="text-lg font-semibold text-[#172129]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#5E4B4B]">
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-12 rounded-lg border border-white/70 bg-white/70 p-5 shadow-xl shadow-[#172129]/10 backdrop-blur-xl md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#B5121B]">
                Coverage
              </p>
              <h3 className="mt-2 text-2xl font-bold text-[#172129]">
                Marathahalli base, Bangalore service routes
              </h3>
            </div>
            <Link
              href="/#service-area-search"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-[#EACACA] bg-[#F8EFEF] px-4 py-2 text-sm font-semibold text-[#B5121B] transition hover:bg-white"
            >
              <MapPin className="size-4" />
              Search Service and Area
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {areas.slice(0, 20).map((area) => (
              <span
                key={area.slug}
                className="rounded-lg border border-white/70 bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#5E4B4B]"
              >
                {area.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
