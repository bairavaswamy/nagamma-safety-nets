import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import ServiceAreaSearch from "../components/ServiceAreaSearch";
import {
  areas,
  getService,
  getServiceAreaPath,
  isGmbArea,
  services,
  siteConfig,
  type ServiceSlug,
} from "../data/serviceAreaData";

type ServicePageProps = {
  params: Promise<{
    service: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({
    service: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getService(serviceSlug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.name} in ${siteConfig.city} | ${siteConfig.name}`,
    description: `${service.name} service setup across ${areas.length} ${siteConfig.city} areas, with ${siteConfig.branchAreaName} as the primary location.`,
    alternates: {
      canonical: `${siteConfig.baseUrl}/bangalore/${service.slug}/`,
    },
  };
}

export default async function ServiceLandingPage({ params }: ServicePageProps) {
  const { service: serviceSlug } = await params;
  const service = getService(serviceSlug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      <section className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
              {siteConfig.city} service
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-[#111827] md:text-6xl">
              {service.name} in {siteConfig.city}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#475569] md:text-lg">
              {service.shortDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <Link
                href="/bangalore/"
                className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-2 font-semibold text-[#0F766E]"
              >
                Bangalore hub
              </Link>
              <span className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-2 font-semibold text-[#475569]">
                {areas.length} area pages ready
              </span>
            </div>
          </div>

          <ServiceAreaSearch
            services={services}
            areas={areas}
            defaultServiceSlug={service.slug}
          />
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
              Area pages
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {service.name} service areas
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={getServiceAreaPath(service.slug as ServiceSlug, area.slug)}
                className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-[#0F766E]/40"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-[#0F766E]" />
                  <h3 className="font-semibold">{area.name}</h3>
                </div>
                <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#0F766E]">
                  Open local page
                  <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                </p>
                {isGmbArea(area) ? (
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#C2410C]">
                    GMB location
                  </p>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
