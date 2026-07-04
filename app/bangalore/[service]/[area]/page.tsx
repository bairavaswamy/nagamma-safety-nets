import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import ServiceAreaSearch from "../../components/ServiceAreaSearch";
import {
  areas,
  getArea,
  getManualServiceAreaContent,
  getService,
  getServiceAreaPath,
  getServicePath,
  isGmbArea,
  services,
  siteConfig,
  type AreaSlug,
  type ServiceSlug,
} from "../../data/serviceAreaData";

type ServiceAreaPageProps = {
  params: Promise<{
    service: string;
    area: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.flatMap((service) =>
    areas.map((area) => ({
      service: service.slug,
      area: area.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: ServiceAreaPageProps): Promise<Metadata> {
  const { service: serviceSlug, area: areaSlug } = await params;
  const service = getService(serviceSlug);
  const area = getArea(areaSlug);

  if (!service || !area) {
    return {};
  }

  const manualContent = getManualServiceAreaContent(
    service.slug as ServiceSlug,
    area.slug as AreaSlug
  );
  const isReady = manualContent?.status === "ready";
  const title =
    manualContent?.h1 ||
    `${service.name} in ${area.name}, ${siteConfig.city} | ${siteConfig.name}`;

  return {
    title,
    description:
      manualContent?.intro ||
      `${service.name} page setup for ${area.name}, ${siteConfig.city}.`,
    robots: {
      index: isReady,
      follow: true,
    },
    alternates: {
      canonical: `${siteConfig.baseUrl}${getServiceAreaPath(
        service.slug as ServiceSlug,
        area.slug as AreaSlug
      )}`,
    },
  };
}

export default async function ServiceAreaPage({
  params,
}: ServiceAreaPageProps) {
  const { service: serviceSlug, area: areaSlug } = await params;
  const service = getService(serviceSlug);
  const area = getArea(areaSlug);

  if (!service || !area) {
    notFound();
  }

  const manualContent = getManualServiceAreaContent(
    service.slug as ServiceSlug,
    area.slug as AreaSlug
  );
  const pageHeading =
    manualContent?.h1 || `${service.name} in ${area.name}, ${siteConfig.city}`;
  const isReady = manualContent?.status === "ready";
  const otherServices = services.filter((item) => item.slug !== service.slug);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      <section className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <nav className="flex flex-wrap gap-2 text-sm text-[#64748B]">
              <Link href="/bangalore/" className="font-semibold text-[#0F766E]">
                Bangalore
              </Link>
              <span>/</span>
              <Link
                href={getServicePath(service.slug as ServiceSlug)}
                className="font-semibold text-[#0F766E]"
              >
                {service.name}
              </Link>
              <span>/</span>
              <span>{area.name}</span>
            </nav>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
              Local service page
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-[#111827] md:text-6xl">
              {pageHeading}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#475569] md:text-lg">
              {manualContent?.intro || service.shortDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-2 font-semibold text-[#475569]">
                {isReady ? "Content ready" : "Draft scaffold"}
              </span>
              {isGmbArea(area) ? (
                <span className="rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 font-semibold text-[#C2410C]">
                  GMB location: {siteConfig.branchAreaName}
                </span>
              ) : null}
            </div>
          </div>

          <ServiceAreaSearch
            services={services}
            areas={areas}
            defaultServiceSlug={service.slug}
            defaultAreaSlug={area.slug}
          />
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {manualContent?.sections?.length ? (
              manualContent.sections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                  <p className="mt-4 text-base leading-8 text-[#475569]">
                    {section.body}
                  </p>
                </article>
              ))
            ) : (
              <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold">
                  Hand-written content queue
                </h2>
                <p className="mt-4 text-base leading-8 text-[#475569]">
                  This URL is ready for unique local copy for {service.name} in{" "}
                  {area.name}. Keep this page as draft until the area-specific
                  intro, installation notes, nearby apartment context, and FAQs
                  are written.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Area-specific opening paragraph",
                    "Service details for local buildings",
                    "Trust signals from the Marathahalli branch",
                    "Unique FAQs before indexing",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 rounded-lg bg-[#F8FAFC] p-3 text-sm text-[#475569]"
                    >
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#0F766E]" />
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            )}

            {manualContent?.faqs?.length ? (
              <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold">FAQs</h2>
                <div className="mt-5 space-y-4">
                  {manualContent.faqs.map((faq) => (
                    <div key={faq.question}>
                      <h3 className="font-semibold">{faq.question}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#475569]">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ) : null}
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold">Same area services</h2>
              <div className="mt-4 space-y-2">
                {otherServices.map((item) => (
                  <Link
                    key={item.slug}
                    href={getServiceAreaPath(
                      item.slug as ServiceSlug,
                      area.slug as AreaSlug
                    )}
                    className="flex items-center justify-between rounded-lg bg-[#F8FAFC] px-3 py-2 text-sm font-semibold text-[#334155] transition hover:text-[#0F766E]"
                  >
                    {item.name}
                    <ArrowRight className="size-4" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold">Area</h2>
              <div className="mt-4 flex items-center gap-2 text-[#475569]">
                <MapPin className="size-4 text-[#0F766E]" />
                <span>{area.name}, {siteConfig.city}</span>
              </div>
              {isGmbArea(area) ? (
                <p className="mt-3 text-sm font-semibold text-[#C2410C]">
                  Primary GMB location for {siteConfig.name}.
                </p>
              ) : null}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
