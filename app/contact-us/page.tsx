import type { Metadata } from "next";
import Link from "next/link";
import { Clock, MapPin, ShieldCheck } from "lucide-react";
import ServiceAreaSearch from "../bangalore/components/ServiceAreaSearch";
import { areas, services, siteConfig } from "../bangalore/data/serviceAreaData";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: `Contact ${siteConfig.name}`,
  description: `Contact ${siteConfig.name} for safety nets, invisible grills, sports nets, cloth hangers, and balcony safety services in Bangalore.`,
  alternates: {
    canonical: `${siteConfig.baseUrl}/contact-us/`,
  },
};

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      <section className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
              Contact us
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-[#111827] md:text-6xl">
              Plan your safety net service in Bangalore
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#475569] md:text-lg">
              Share the service type, area, and installation requirement so the
              request can be mapped to the right Bangalore service page and local
              context.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-4">
                <MapPin className="mb-3 size-6 text-[#0F766E]" />
                <p className="text-sm font-semibold">{siteConfig.branchAreaName}</p>
                <p className="mt-1 text-xs text-[#64748B]">Primary location</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-4">
                <ShieldCheck className="mb-3 size-6 text-[#0F766E]" />
                <p className="text-sm font-semibold">{services.length} services</p>
                <p className="mt-1 text-xs text-[#64748B]">Core categories</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-4">
                <Clock className="mb-3 size-6 text-[#0F766E]" />
                <p className="text-sm font-semibold">Site check</p>
                <p className="mt-1 text-xs text-[#64748B]">Before fitting</p>
              </div>
            </div>
          </div>

          <ContactForm services={services} areas={areas} />
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
              Find the right local page
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Search by service and area
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#475569]">
              Choose one of the seven services and a Bangalore area to open the
              matching local page.
            </p>
            <Link
              href="/bangalore/"
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-[#0F766E] transition hover:bg-white"
            >
              View Bangalore Hub
            </Link>
          </div>

          <ServiceAreaSearch services={services} areas={areas} />
        </div>
      </section>
    </main>
  );
}
