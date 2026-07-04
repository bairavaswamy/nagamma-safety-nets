import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  HelpCircle,
  IndianRupee,
  Layers3,
  MapPin,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import ServiceAreaSearch from "../components/ServiceAreaSearch";
import {
  areas,
  getService,
  getServiceAreaPath,
  getServicePath,
  isGmbArea,
  services,
  siteConfig,
  type Service,
  type ServiceSlug,
} from "../data/serviceAreaData";
import {
  getServiceLandingContent,
  type ServiceLandingContent,
} from "../data/serviceLandingContent";

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

  const content = getServiceLandingContent(service.slug);
  const canonical = `${siteConfig.baseUrl}${getServicePath(service.slug)}`;
  const title = content?.metadata.title || `${service.name} in ${siteConfig.city}`;
  const description =
    content?.metadata.description ||
    `${service.name} service setup across ${areas.length} ${siteConfig.city} areas, with ${siteConfig.branchAreaName} as the primary location.`;
  const image =
    content?.hero.image.src || "/home-optimized/hero-balcony.webp";

  return {
    title,
    description,
    keywords: content?.metadata.keywords,
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
          url: `${siteConfig.baseUrl}${image}`,
          width: 1200,
          height: 800,
          alt: content?.hero.image.alt || `${service.name} in ${siteConfig.city}`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.baseUrl}${image}`],
    },
  };
}

export default async function ServiceLandingPage({ params }: ServicePageProps) {
  const { service: serviceSlug } = await params;
  const service = getService(serviceSlug);

  if (!service) {
    notFound();
  }

  const richContent = getServiceLandingContent(service.slug);

  if (richContent) {
    return <RichServiceLandingPage service={service} content={richContent} />;
  }

  return <BasicServiceLandingPage service={service} />;
}

function RichServiceLandingPage({
  service,
  content,
}: {
  service: Service;
  content: ServiceLandingContent;
}) {
  const jsonLd = buildServiceJsonLd(service, content);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="bg-white px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <Breadcrumbs service={service} />

            <p className="mt-8 text-sm font-semibold uppercase text-[#0F766E]">
              {content.hero.eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-[#111827] md:text-6xl">
              {content.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#475569] md:text-lg">
              {content.hero.intro}
            </p>

            <div className="mt-7 grid gap-3">
              {content.hero.bullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#0F766E]" />
                  <p className="text-sm leading-6 text-[#334155]">{bullet}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#price"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#0F766E] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#115E59]"
              >
                <IndianRupee className="size-4" />
                View Price Guide
              </Link>
              <Link
                href="#service-area-search"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-[#0F766E] transition hover:bg-[#F8FAFC]"
              >
                <MapPin className="size-4" />
                Search Your Area
              </Link>
            </div>
          </div>

          <div className="space-y-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-[#E2E8F0] shadow-sm">
              <Image
                src={content.hero.image.src}
                alt={content.hero.image.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
            <ServiceAreaSearch
              services={services}
              areas={areas}
              defaultServiceSlug={service.slug}
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {content.quickFacts.map((fact) => (
            <article
              key={fact.label}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-semibold uppercase text-[#0F766E]">
                {fact.label}
              </p>
              <h2 className="mt-3 text-xl font-bold text-[#111827]">
                {fact.value}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#475569]">
                {fact.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionKicker icon={<MapPin className="size-4" />} text="Local fit" />
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              What matters in Bangalore apartments
            </h2>
            <p className="mt-4 text-base leading-8 text-[#475569]">
              {service.name} work looks simple from far away, but the lasting
              result depends on small site details. The right work starts by
              reading the balcony, window, or utility opening before choosing a
              fitting method.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {content.localPoints.map((point) => (
              <article
                key={point.title}
                className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-5"
              >
                <ShieldCheck className="mb-4 size-6 text-[#0F766E]" />
                <h3 className="text-lg font-semibold">{point.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#475569]">
                  {point.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <SectionKicker
              icon={<Sparkles className="size-4" />}
              text="Installation views"
            />
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Common places where this service is fitted
            </h2>
            <p className="mt-4 text-base leading-8 text-[#475569]">
              These views show the kind of balcony faces, window openings, and
              utility areas that need measured installation instead of a quick
              one-size-fits-all setup.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {content.imageStrip.map((image) => (
              <figure
                key={image.src}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm font-semibold text-[#334155]">
                  {image.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <SectionKicker icon={<Layers3 className="size-4" />} text="Materials" />
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Material and fitting checks before you book
            </h2>
            <p className="mt-4 text-base leading-8 text-[#475569]">
              The net is only one part of the job. A reliable installation also
              needs the correct mesh size, edge support, fixing points, and a
              finish that works with the balcony surface.
            </p>
          </div>

          <ResponsiveTable
            headers={["Part", "Ask this", "Good choice", "Why it matters"]}
            rows={content.materialRows.map((row) => [
              row.part,
              row.whatToAsk,
              row.goodChoice,
              row.whyItMatters,
            ])}
          />
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <SectionKicker
              icon={<ClipboardCheck className="size-4" />}
              text="Compare"
            />
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Compare options before choosing {service.name.toLowerCase()}
            </h2>
            <p className="mt-4 text-base leading-8 text-[#475569]">
              {service.name} can be the right answer for many homes, but it is
              not the right answer for every balcony or window problem. This
              comparison keeps the decision honest.
            </p>
          </div>

          <ResponsiveTable
            headers={["Option", "Best for", "Strength", "Limitation", "Choose when"]}
            rows={content.comparisonRows.map((row) => [
              row.option,
              row.bestFor,
              row.strength,
              row.limitation,
              row.chooseWhen,
            ])}
          />
        </div>
      </section>

      <section id="price" className="bg-white px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <SectionKicker
              icon={<IndianRupee className="size-4" />}
              text="Price guide"
            />
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              {siteConfig.city} {service.name.toLowerCase()} price planning
            </h2>
            <p className="mt-4 text-base leading-8 text-[#475569]">
              Use this as a local planning range before the site is measured.
              Final price depends on material, height, access, number of
              openings, fitting style, and whether the work needs extra edge
              finishing.
            </p>
            <p className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-4 text-sm leading-6 text-[#9A3412]">
              These ranges are for buyer planning, not a fixed quotation. The
              final rate should be confirmed after checking the actual balcony
              or opening.
            </p>
          </div>

          <ResponsiveTable
            headers={["Scope", "Planning range", "Normally includes", "Affects price"]}
            rows={content.priceRows.map((row) => [
              row.scope,
              row.planningRange,
              row.normallyIncludes,
              row.affectsPrice,
            ])}
          />
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionKicker icon={<Wrench className="size-4" />} text="Process" />
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              How the installation should be handled
            </h2>
            <p className="mt-4 text-base leading-8 text-[#475569]">
              Good {service.name.toLowerCase()} work should feel measured and
              calm. The installer has to understand the opening, fixing points,
              safety expectation, and how the space will be used after the job.
            </p>
          </div>

          <div className="grid gap-4">
            {content.processSteps.map((step) => (
              <article
                key={step.title}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#475569]">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <ChecklistPanel
            title="Buyer checklist"
            icon={<ClipboardCheck className="size-5" />}
            items={content.buyerChecklist}
          />
          <ChecklistPanel
            title="After-care notes"
            icon={<Sparkles className="size-5" />}
            items={content.careTips}
          />
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <SectionKicker icon={<MapPin className="size-4" />} text="Areas" />
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              {service.name} service areas in Bangalore
            </h2>
            <p className="mt-4 text-base leading-8 text-[#475569]">
              Start with the nearest area page. Marathahalli is the primary
              local business location, and the same service route is available
              for the listed Bangalore areas.
            </p>
          </div>

          <AreaGrid service={service} />
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionKicker icon={<HelpCircle className="size-4" />} text="FAQ" />
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Questions people ask before booking
            </h2>
            <p className="mt-4 text-base leading-8 text-[#475569]">
              These answers are written for real buying decisions: price,
              material, drilling, airflow, children, pets, and future repair
              work.
            </p>
          </div>

          <div className="space-y-4">
            {content.faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-5"
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-[#475569]">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <h2 className="text-2xl font-bold leading-tight md:text-3xl">
              Check service and area together
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#475569]">
              Search the service with your Bangalore area to open the correct
              local page path.
            </p>
          </div>
          <ServiceAreaSearch
            services={services}
            areas={areas}
            defaultServiceSlug={service.slug}
          />
        </div>
      </section>
    </main>
  );
}

function BasicServiceLandingPage({ service }: { service: Service }) {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      <section className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Breadcrumbs service={service} />

            <p className="mt-8 text-sm font-semibold uppercase text-[#0F766E]">
              {siteConfig.city} service
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-[#111827] md:text-6xl">
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
            <p className="text-sm font-semibold uppercase text-[#0F766E]">
              Area pages
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
              {service.name} service areas
            </h2>
          </div>

          <AreaGrid service={service} />
        </div>
      </section>
    </main>
  );
}

function Breadcrumbs({ service }: { service: Service }) {
  return (
    <nav className="flex flex-wrap gap-2 text-sm text-[#64748B]">
      <Link href="/bangalore/" className="font-semibold text-[#0F766E]">
        Bangalore
      </Link>
      <span>/</span>
      <span>{service.name}</span>
    </nav>
  );
}

function SectionKicker({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-[#0F766E]">
      {icon}
      {text}
    </p>
  );
}

function ResponsiveTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="min-w-[760px] w-full border-collapse text-left text-sm">
        <thead className="bg-[#0F766E] text-white">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {rows.map((row) => (
            <tr key={row.join("-")} className="align-top">
              {row.map((cell, index) => (
                <td
                  key={`${row[0]}-${index}`}
                  className="px-4 py-4 leading-6 text-[#475569]"
                >
                  {index === 0 ? (
                    <span className="font-semibold text-[#111827]">{cell}</span>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ChecklistPanel({
  title,
  icon,
  items,
}: {
  title: string;
  icon: ReactNode;
  items: string[];
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-5">
      <h2 className="flex items-center gap-2 text-2xl font-bold">
        <span className="text-[#0F766E]">{icon}</span>
        {title}
      </h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#0F766E]" />
            <p className="text-sm leading-6 text-[#475569]">{item}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function AreaGrid({ service }: { service: Service }) {
  return (
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
            <p className="mt-2 text-xs font-semibold uppercase text-[#C2410C]">
              GMB location
            </p>
          ) : null}
        </Link>
      ))}
    </div>
  );
}

function buildServiceJsonLd(
  service: Service,
  content: ServiceLandingContent
) {
  const canonical = `${siteConfig.baseUrl}${getServicePath(service.slug)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: content.metadata.title,
        description: content.metadata.description,
        serviceType: service.name,
        url: canonical,
        provider: {
          "@type": "LocalBusiness",
          name: siteConfig.name,
          url: siteConfig.baseUrl,
          areaServed: siteConfig.city,
        },
        areaServed: [
          {
            "@type": "City",
            name: siteConfig.city,
          },
          ...areas.map((area) => ({
            "@type": "Place",
            name: `${area.name}, ${siteConfig.city}`,
          })),
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${service.name} options`,
          itemListElement: content.priceRows.slice(0, 4).map((row) => ({
            "@type": "Offer",
            name: row.scope,
            description: `${row.planningRange}. ${row.normallyIncludes}`,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: content.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
