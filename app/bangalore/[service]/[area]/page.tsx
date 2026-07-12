import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  HelpCircle,
  MapPin,
  MapPinned,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
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
  type Area,
  type AreaSlug,
  type ManualServiceAreaContent,
  type Service,
  type ServiceSlug,
} from "../../data/serviceAreaData";
import { getServiceLandingContent } from "../../data/serviceLandingContent";
import {
  buildBreadcrumbJsonLd,
  buildImageJsonLd,
  buildWebPageJsonLd,
  businessSchemaId,
  sanitizeJsonLd,
} from "../../../schema";

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
    manualContent?.metaTitle ||
    manualContent?.h1 ||
    `${service.name} in ${area.name}, ${siteConfig.city}`;
  const description =
    (manualContent?.metaDescription
      ? cleanPricingText(manualContent.metaDescription)
      : "") ||
    (manualContent?.intro ? cleanPricingText(manualContent.intro) : "") ||
    `${service.name} installation in ${area.name}, ${siteConfig.city}.`;
  const canonical = `${siteConfig.baseUrl}${getServiceAreaPath(
    service.slug as ServiceSlug,
    area.slug as AreaSlug
  )}`;
  const serviceLandingContent = getServiceLandingContent(
    service.slug as ServiceSlug
  );
  const shareImage =
    serviceLandingContent?.hero.image.src ||
    "/home-generated/hero.webp";

  return {
    title,
    description,
    keywords: cleanKeywordList(manualContent?.keywords),
    robots: {
      index: isReady,
      follow: true,
    },
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.baseUrl}${shareImage}`,
          width: 1200,
          height: 800,
          alt: title,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.baseUrl}${shareImage}`],
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

  if (manualContent?.status === "ready" && manualContent.localHighlights?.length) {
    return (
      <RichManualServiceAreaPage
        service={service}
        area={area}
        content={manualContent}
      />
    );
  }

  return (
    <BasicServiceAreaPage
      service={service}
      area={area}
      manualContent={manualContent}
    />
  );
}

function RichManualServiceAreaPage({
  service,
  area,
  content,
}: {
  service: Service;
  area: Area;
  content: ManualServiceAreaContent;
}) {
  const sameAreaServices = services.filter((item) => item.slug !== service.slug);
  const jsonLd = buildServiceAreaJsonLd(service, area, content);

  return (
    <main className="min-h-screen bg-transparent text-[#172129]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(jsonLd),
        }}
      />

      <section className="bg-white/45 px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-start">
          <div>
            <Breadcrumbs service={service} area={area} />

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-[#0369A1]">
              Installation in {area.name}
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-[#172129] md:text-6xl">
              {content.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#475569] md:text-lg">
              {cleanPricingText(content.intro)}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {isGmbArea(area) ? (
                <span className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#BAE6FD] bg-[#E0F2FE] px-4 py-2 text-sm font-semibold text-[#0369A1]">
                  <MapPinned className="size-4" />
                  GMB location
                </span>
              ) : null}
              <span className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#D8DEE2] bg-[#F0F9FF] px-4 py-2 text-sm font-semibold text-[#0369A1]">
                <ShieldCheck className="size-4" />
                Site notes
              </span>
              <span className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl px-4 py-2 text-sm font-semibold text-[#475569]">
                <MapPin className="size-4" />
                {siteConfig.city}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#service-area-search"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-white/70 bg-white/70 backdrop-blur-xl px-5 py-2 text-sm font-semibold text-[#0369A1] transition hover:bg-[#E0F2FE]"
              >
                <Search className="size-4" />
                Search Services
              </Link>
            </div>
          </div>

          <div className="space-y-5">
            <ServiceAreaSearch
              services={services}
              areas={areas}
              defaultServiceSlug={service.slug}
              defaultAreaSlug={area.slug}
            />

            <div className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl p-5">
              <h2 className="text-lg font-bold">Site brief</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {withoutPricingRecords(content.localHighlights ?? [], [
                  "label",
                  "value",
                  "note",
                ]).map((item) => (
                  <div key={item.label} className="rounded-lg bg-white/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0369A1]">
                      {cleanPricingText(item.label)}
                    </p>
                    <h3 className="mt-2 text-lg font-bold">
                      {cleanPricingText(item.value)}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#475569]">
                      {cleanPricingText(item.note)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <SectionKicker
              icon={<Building2 className="size-4" />}
              text="Problem map"
            />
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Why this service is commonly needed in {area.name}
            </h2>
            <p className="mt-4 text-base leading-8 text-[#475569]">
              Around {area.name}, {service.name.toLowerCase()} work depends on
              the exact opening, fixing surface, building rules, and how the
              family uses the balcony or window every day.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {(content.problemCards ?? []).map((card) => (
              <article
                key={card.title}
                className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl p-5"
              >
                <ShieldCheck className="mb-4 size-6 text-[#0369A1]" />
                <h3 className="text-lg font-semibold">
                  {cleanPricingText(card.title)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#475569]">
                  {cleanPricingText(card.body)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/45 px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <SectionKicker
              icon={<ClipboardCheck className="size-4" />}
              text="Fit notes"
            />
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Where the net should be checked before fitting
            </h2>
            <p className="mt-4 text-base leading-8 text-[#475569]">
              Before booking, it helps to know which part of the home is causing
              the problem. A main balcony, window opening, utility side, high
              floor edge, and rental flat can all need different fitting
              decisions.
            </p>
          </div>

          <ResponsiveInfoTable
            headers={["Place", "Fit plan", "Watch for"]}
            rows={(content.specificationRows ?? []).map((row) => [
              cleanPricingText(row.place),
              cleanPricingText(row.fitPlan),
              cleanPricingText(row.watchFor),
            ])}
          />
        </div>
      </section>

      <section className="bg-white/45 px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionKicker icon={<Wrench className="size-4" />} text="Visit plan" />
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              How an installation visit should move
            </h2>
            <p className="mt-4 text-base leading-8 text-[#475569]">
              A clean visit starts with clear photos and ends with a final gap
              and finish check. That way the installation solves the main
              concern without making balcony use, cleaning, or service access
              harder later.
            </p>
          </div>

          <div className="grid gap-4">
            {(content.visitSteps ?? []).map((step) => (
              <article
                key={step.title}
                className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl p-5"
              >
                <h3 className="text-lg font-semibold">
                  {cleanPricingText(step.title)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#475569]">
                  {cleanPricingText(step.body)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <ListPanel
            title="Before booking"
            icon={<ClipboardCheck className="size-5" />}
            items={withoutPricingItems(content.checklist ?? [])}
          />
          <ListPanel
            title="After installation"
            icon={<Sparkles className="size-5" />}
            items={withoutPricingItems(content.careTips ?? [])}
          />
        </div>
      </section>

      <section className="bg-white/45 px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionKicker icon={<MapPin className="size-4" />} text="Nearby" />
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Nearby pockets around {area.name}
            </h2>
            <p className="mt-4 text-base leading-8 text-[#475569]">
              These nearby pockets are useful for route timing and grouped
              visits around the same side of Bangalore.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(content.nearbyPockets ?? []).map((pocket) => (
              <div
                key={pocket}
                className="flex min-h-[56px] items-center gap-2 rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl px-4 py-3 text-sm font-semibold text-[#102A43]"
              >
                <MapPin className="size-4 shrink-0 text-[#0369A1]" />
                {pocket}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <SectionKicker icon={<HelpCircle className="size-4" />} text="FAQs" />
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Questions before booking in {area.name}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {withoutPricingFaqs(content.faqs ?? []).map((faq) => (
              <article
                key={faq.question}
                className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl p-5"
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-[#475569]">
                  {cleanPricingText(faq.answer)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/45 px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <SectionKicker
              icon={<ArrowRight className="size-4" />}
              text={`More in ${area.name}`}
            />
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Other services in {area.name}
            </h2>
            <p className="mt-4 text-base leading-8 text-[#475569]">
              If you need another kind of balcony, window, utility, or drying
              space work in {area.name}, these service pages stay linked
              from the same area.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {sameAreaServices.map((item) => (
              <Link
                key={item.slug}
                href={getServiceAreaPath(
                  item.slug as ServiceSlug,
                  area.slug as AreaSlug
                )}
                className="group flex items-center justify-between rounded-lg border border-white/60 bg-white/45 backdrop-blur-xl px-4 py-4 text-sm font-semibold text-[#102A43] transition hover:border-[#0369A1]/40 hover:text-[#0369A1]"
              >
                {item.name}
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function BasicServiceAreaPage({
  service,
  area,
  manualContent,
}: {
  service: Service;
  area: Area;
  manualContent?: ManualServiceAreaContent;
}) {
  const pageHeading =
    cleanPricingText(
      manualContent?.h1 || `${service.name} in ${area.name}, ${siteConfig.city}`
    );
  const isReady = manualContent?.status === "ready";
  const otherServices = services.filter((item) => item.slug !== service.slug);

  return (
    <main className="min-h-screen bg-transparent text-[#172129]">
      <section className="bg-white/45 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Breadcrumbs service={service} area={area} />

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-[#0369A1]">
              Service page
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-[#172129] md:text-6xl">
              {pageHeading}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#475569] md:text-lg">
              {cleanPricingText(manualContent?.intro || service.shortDescription)}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl px-4 py-2 font-semibold text-[#475569]">
                {isReady ? "Content ready" : "Content pending"}
              </span>
              {isGmbArea(area) ? (
                <span className="rounded-lg border border-[#BAE6FD] bg-[#E0F2FE] px-4 py-2 font-semibold text-[#0369A1]">
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
                  className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl p-6"
                >
                  <h2 className="text-2xl font-bold">
                    {cleanPricingText(section.title)}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-[#475569]">
                    {cleanPricingText(section.body)}
                  </p>
                </article>
              ))
            ) : (
              <article className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl p-6">
                <h2 className="text-2xl font-bold">
                  Content still to write
                </h2>
                <p className="mt-4 text-base leading-8 text-[#475569]">
                  This URL is ready for hand-written copy for {service.name} in{" "}
                  {area.name}. Keep this page as draft until the area-specific
                  intro, installation notes, nearby apartment context, and FAQs
                  are written.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Area-specific opening paragraph",
                    "Service details for nearby buildings",
                    "Trust signals from the Marathahalli branch",
                    "Unique FAQs before indexing",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 rounded-lg bg-[#E0F2FE] p-3 text-sm text-[#475569]"
                    >
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#0369A1]" />
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            )}

            {manualContent?.faqs?.length ? (
              <article className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl p-6">
                <h2 className="text-2xl font-bold">FAQs</h2>
                <div className="mt-5 space-y-4">
                  {withoutPricingFaqs(manualContent.faqs).map((faq) => (
                    <div key={faq.question}>
                      <h3 className="font-semibold">{faq.question}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#475569]">
                        {cleanPricingText(faq.answer)}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ) : null}
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl p-5">
              <h2 className="text-lg font-bold">Same area services</h2>
              <div className="mt-4 space-y-2">
                {otherServices.map((item) => (
                  <Link
                    key={item.slug}
                    href={getServiceAreaPath(
                      item.slug as ServiceSlug,
                      area.slug as AreaSlug
                    )}
                    className="flex items-center justify-between rounded-lg bg-[#E0F2FE] px-3 py-2 text-sm font-semibold text-[#102A43] transition hover:text-[#0369A1]"
                  >
                    {item.name}
                    <ArrowRight className="size-4" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl p-5">
              <h2 className="text-lg font-bold">Area</h2>
              <div className="mt-4 flex items-center gap-2 text-[#475569]">
                <MapPin className="size-4 text-[#0369A1]" />
                <span>
                  {area.name}, {siteConfig.city}
                </span>
              </div>
              {isGmbArea(area) ? (
                <p className="mt-3 text-sm font-semibold text-[#0369A1]">
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

function Breadcrumbs({ service, area }: { service: Service; area: Area }) {
  return (
    <nav className="flex flex-wrap gap-2 text-sm text-[#52677A]">
      <Link href="/bangalore/" className="font-semibold text-[#0369A1]">
        Bangalore
      </Link>
      <span>/</span>
      <Link
        href={getServicePath(service.slug as ServiceSlug)}
        className="font-semibold text-[#0369A1]"
      >
        {service.name}
      </Link>
      <span>/</span>
      <span>{area.name}</span>
    </nav>
  );
}

function SectionKicker({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-lg bg-[#EAF6FF] px-3 py-2 text-sm font-semibold text-[#0369A1]">
      {icon}
      {text}
    </p>
  );
}

function ResponsiveInfoTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl">
      <table className="hidden w-full border-collapse text-left md:table">
        <thead className="bg-[#E0F2FE] text-sm text-[#102A43]">
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-b border-slate-200 px-4 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")} className="align-top">
              {row.map((cell, index) => (
                <td
                  key={`${cell}-${index}`}
                  className="border-b border-slate-100 px-4 py-4 text-sm leading-6 text-[#475569] last:border-b-0"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid gap-0 md:hidden">
        {rows.map((row) => (
          <article key={row.join("|")} className="border-b border-slate-200 p-4">
            {row.map((cell, index) => (
              <div key={`${cell}-${index}`} className={index ? "mt-3" : ""}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0369A1]">
                  {headers[index]}
                </p>
                <p className="mt-1 text-sm leading-6 text-[#475569]">{cell}</p>
              </div>
            ))}
          </article>
        ))}
      </div>
    </div>
  );
}

function ListPanel({
  title,
  icon,
  items,
}: {
  title: string;
  icon: ReactNode;
  items: string[];
}) {
  return (
    <article className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-[#EAF6FF] text-[#0369A1]">
          {icon}
        </span>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#0369A1]" />
            <p className="text-sm leading-6 text-[#475569]">
              {cleanPricingText(item)}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

function buildServiceAreaJsonLd(
  service: Service,
  area: Area,
  content: ManualServiceAreaContent
) {
  const path = getServiceAreaPath(
    service.slug as ServiceSlug,
    area.slug as AreaSlug
  );
  const canonical = `${siteConfig.baseUrl}${path}`;
  const title = cleanPricingText(content.metaTitle || content.h1);
  const description = cleanPricingText(content.metaDescription || content.intro);
  const serviceLandingContent = getServiceLandingContent(
    service.slug as ServiceSlug
  );
  const imageId = `${canonical}#primary-image`;
  const serviceId = `${canonical}#service`;
  const areaId = `${canonical}#area`;
  const serviceNode: Record<string, unknown> = {
    "@type": "Service",
    "@id": serviceId,
    name: title,
    description,
    serviceType: service.name,
    url: canonical,
    mainEntityOfPage: {
      "@id": `${canonical}#webpage`,
    },
    provider: {
      "@id": businessSchemaId,
    },
    image: {
      "@id": imageId,
    },
    areaServed: {
      "@id": areaId,
    },
  };

  const graph: Record<string, unknown>[] = [
    buildWebPageJsonLd({
      canonical,
      name: title,
      description,
      imageId,
      breadcrumbId: `${canonical}#breadcrumb`,
      mainEntityId: serviceId,
    }),
    buildBreadcrumbJsonLd(canonical, [
      {
        name: "Home",
        item: `${siteConfig.baseUrl}/`,
      },
      {
        name: siteConfig.city,
        item: `${siteConfig.baseUrl}/bangalore/`,
      },
      {
        name: service.name,
        item: `${siteConfig.baseUrl}${getServicePath(
          service.slug as ServiceSlug
        )}`,
      },
      {
        name: area.name,
        item: canonical,
      },
    ]),
    buildImageJsonLd({
      id: imageId,
      src: serviceLandingContent?.hero.image.src || "/og-image.png",
      name: `${service.name} in ${area.name}, ${siteConfig.city}`,
      alt:
        serviceLandingContent?.hero.image.alt ||
        `${service.name} in ${area.name}, ${siteConfig.city}`,
    }),
    {
      "@type": "Place",
      "@id": areaId,
      name: `${area.name}, ${siteConfig.city}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: area.name,
        addressRegion: siteConfig.region,
        addressCountry: siteConfig.country,
      },
    },
    serviceNode,
  ];

  if (content.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntityOfPage: {
        "@id": `${canonical}#webpage`,
      },
      mainEntity: withoutPricingFaqs(content.faqs).map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: cleanPricingText(faq.answer),
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function hasPricingLanguage(text?: string) {
  return Boolean(
    text &&
      /\b(price|pricing|rate|rates|cost|costs|quote|quoted|quotation)\b|₹|\bRs\.?\b|\bINR\b/i.test(
        text
      )
  );
}

function cleanPricingText(text: string) {
  return text
    .replace(/\bRs\.?\s*[\d,]+(?:\s*to\s*Rs\.?\s*[\d,]+)?(?:\s*per\s*sq\s*ft)?/gi, "")
    .replace(/\bINR\b/gi, "")
    .replace(/\bprice-sensitive\b/gi, "site-sensitive")
    .replace(/\bprice ranges?\b/gi, "site measurement")
    .replace(/\bprice planning\b/gi, "site measurement")
    .replace(/\bprice notes?\b/gi, "booking notes")
    .replace(/\bpricing\b/gi, "site measurement")
    .replace(/\bprice\b/gi, "site measurement")
    .replace(/\blower cost\b/gi, "simpler setup")
    .replace(/\blow cost\b/gi, "simple setup")
    .replace(/\bhigher cost\b/gi, "more installation effort")
    .replace(/\bcosts?\b/gi, "setup needs")
    .replace(/\brates?\b/gi, "service details")
    .replace(/\bquotes?\b|\bquoted\b|\bquotation\b/gi, "booking details")
    .replace(/\s+,/g, ",")
    .replace(/,\s*,/g, ",")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function withoutPricingItems(items: string[]) {
  return items.filter((item) => !hasPricingLanguage(item));
}

function withoutPricingFaqs(
  faqs: NonNullable<ManualServiceAreaContent["faqs"]>
) {
  return faqs.filter(
    (faq) => !hasPricingLanguage(faq.question) && !hasPricingLanguage(faq.answer)
  );
}

function withoutPricingRecords<T extends Record<string, string>>(
  items: T[],
  fields: (keyof T)[]
) {
  return items.filter((item) =>
    fields.every((field) => !hasPricingLanguage(item[field]))
  );
}

function cleanKeywordList(keywords?: string[]) {
  return keywords
    ?.filter((keyword) => !hasPricingLanguage(keyword))
    .map((keyword) => cleanPricingText(keyword));
}
