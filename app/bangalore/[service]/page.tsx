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
import {
  buildBreadcrumbJsonLd,
  buildImageJsonLd,
  buildWebPageJsonLd,
  businessSchemaId,
  sanitizeJsonLd,
} from "../../schema";

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
    (content?.metadata.description
      ? cleanPricingText(content.metadata.description)
      : "") ||
    `${service.name} installation in ${siteConfig.city}, planned from the ${siteConfig.branchAreaName} service base.`;
  const image =
    content?.hero.image.src || "/home-generated/hero.webp";

  return {
    title,
    description,
    keywords: cleanKeywordList(content?.metadata.keywords),
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
    <main className="min-h-screen bg-transparent text-[#172129]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(jsonLd),
        }}
      />

      <section className="bg-white/45 px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <Breadcrumbs service={service} />

            <p className="mt-8 text-sm font-semibold uppercase text-[#0369A1]">
              {content.hero.eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-[#172129] md:text-6xl">
              {content.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#475569] md:text-lg">
              {content.hero.intro}
            </p>

            <div className="mt-7 grid gap-3">
              {withoutPricingItems(content.hero.bullets).map((bullet) => (
                <div key={bullet} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#0369A1]" />
                  <p className="text-sm leading-6 text-[#102A43]">
                    {cleanPricingText(bullet)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#service-area-search"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-white/70 bg-white/70 backdrop-blur-xl px-5 py-2 text-sm font-semibold text-[#0369A1] transition hover:bg-[#E0F2FE]"
              >
                <MapPin className="size-4" />
                Search Your Area
              </Link>
            </div>
          </div>

          <div className="space-y-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-[#D8E6ED] shadow-sm">
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
              className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl p-5"
            >
              <p className="text-sm font-semibold uppercase text-[#0369A1]">
                {cleanPricingText(fact.label)}
              </p>
              <h2 className="mt-3 text-xl font-bold text-[#172129]">
                {cleanPricingText(fact.value)}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#475569]">
                {cleanPricingText(fact.body)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white/45 px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionKicker icon={<MapPin className="size-4" />} text="Site fit" />
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
                className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl p-5"
              >
                <ShieldCheck className="mb-4 size-6 text-[#0369A1]" />
                <h3 className="text-lg font-semibold">
                  {cleanPricingText(point.title)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#475569]">
                  {cleanPricingText(point.body)}
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
                className="overflow-hidden rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl"
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
                <figcaption className="px-4 py-3 text-sm font-semibold text-[#102A43]">
                  {image.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/45 px-6 py-16 md:px-10">
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
              cleanPricingText(row.part),
              cleanPricingText(row.whatToAsk),
              cleanPricingText(row.goodChoice),
              cleanPricingText(row.whyItMatters),
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
              cleanPricingText(row.option),
              cleanPricingText(row.bestFor),
              cleanPricingText(row.strength),
              cleanPricingText(row.limitation),
              cleanPricingText(row.chooseWhen),
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
                className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl p-5"
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

      <section className="bg-white/45 px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <ChecklistPanel
            title="Buyer checklist"
            icon={<ClipboardCheck className="size-5" />}
            items={withoutPricingItems(content.buyerChecklist)}
          />
          <ChecklistPanel
            title="After-care notes"
            icon={<Sparkles className="size-5" />}
            items={withoutPricingItems(content.careTips)}
          />
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <SectionKicker icon={<MapPin className="size-4" />} text="Areas" />
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Where this service is available in Bangalore
            </h2>
            <p className="mt-4 text-base leading-8 text-[#475569]">
              Start with the nearest area page. Marathahalli is the business
              base, and the same service route is available across Bangalore.
            </p>
          </div>

          <AreaGrid service={service} />
        </div>
      </section>

      <section className="bg-white/45 px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionKicker icon={<HelpCircle className="size-4" />} text="FAQ" />
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Questions people ask before booking
            </h2>
            <p className="mt-4 text-base leading-8 text-[#475569]">
              These answers are written for real buying decisions: material,
              drilling, airflow, children, pets, and future repair work.
            </p>
          </div>

          <div className="space-y-4">
            {withoutPricingFaqs(content.faqs).map((faq) => (
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

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <h2 className="text-2xl font-bold leading-tight md:text-3xl">
              Check service and area together
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#475569]">
              Search the service with your Bangalore area to open the correct
              matching page path.
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
    <main className="min-h-screen bg-transparent text-[#172129]">
      <section className="bg-white/45 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Breadcrumbs service={service} />

            <p className="mt-8 text-sm font-semibold uppercase text-[#0369A1]">
              {siteConfig.city} service
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-[#172129] md:text-6xl">
              {service.name} in {siteConfig.city}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#475569] md:text-lg">
              {service.shortDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <Link
                href="/bangalore/"
                className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl px-4 py-2 font-semibold text-[#0369A1]"
              >
                Bangalore hub
              </Link>
              <span className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl px-4 py-2 font-semibold text-[#475569]">
                Bangalore pages ready
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
            <p className="text-sm font-semibold uppercase text-[#0369A1]">
              Area pages
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
              {service.name} pages by area
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
    <nav className="flex flex-wrap gap-2 text-sm text-[#52677A]">
      <Link href="/bangalore/" className="font-semibold text-[#0369A1]">
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
    <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-[#0369A1]">
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
    <div className="overflow-hidden rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl">
      <table className="hidden w-full border-collapse text-left text-sm md:table">
        <thead className="bg-[#E0F2FE] text-[#102A43]">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="border-b border-[#BAE6FD] px-4 py-3 font-semibold"
              >
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
                  key={`${row[0]}-${index}`}
                  className="border-b border-slate-100 px-4 py-4 leading-6 text-[#475569] last:border-b-0"
                >
                  {index === 0 ? (
                    <span className="font-semibold text-[#172129]">{cell}</span>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid gap-3 p-3 md:hidden">
        {rows.map((row) => (
          <article
            key={row.join("|")}
            className="rounded-lg border border-[#BAE6FD]/70 bg-white/82 p-4 shadow-sm"
          >
            <h3 className="text-base font-bold leading-6 text-[#172129]">
              {row[0]}
            </h3>

            <div className="mt-4 grid gap-3">
              {row.slice(1).map((cell, index) => (
                <div
                  key={`${row[0]}-${headers[index + 1]}`}
                  className="rounded-lg bg-[#F8FCFF] px-3 py-3"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0369A1]">
                    {headers[index + 1]}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#475569]">
                    {cell}
                  </p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
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
    <article className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl p-5">
      <h2 className="flex items-center gap-2 text-2xl font-bold">
        <span className="text-[#0369A1]">{icon}</span>
        {title}
      </h2>
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

function AreaGrid({ service }: { service: Service }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {areas.map((area) => (
        <Link
          key={area.slug}
          href={getServiceAreaPath(service.slug as ServiceSlug, area.slug)}
          className="group rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#0369A1]/10 backdrop-blur-xl p-4 transition hover:border-[#0369A1]/40"
        >
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-[#0369A1]" />
            <h3 className="font-semibold">{area.name}</h3>
          </div>
          <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#0369A1]">
            Open page
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </p>
          {isGmbArea(area) ? (
            <p className="mt-2 text-xs font-semibold uppercase text-[#0369A1]">
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
  const title = content.metadata.title;
  const description = cleanPricingText(content.metadata.description);
  const imageId = `${canonical}#primary-image`;
  const serviceId = `${canonical}#service`;

  return {
    "@context": "https://schema.org",
    "@graph": [
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
          item: canonical,
        },
      ]),
      buildImageJsonLd({
        id: imageId,
        src: content.hero.image.src,
        name: content.hero.image.alt,
        alt: content.hero.image.alt,
      }),
      {
        "@type": "Service",
        "@id": serviceId,
        name: title,
        description,
        serviceType: service.name,
        url: canonical,
        provider: {
          "@id": businessSchemaId,
        },
        image: {
          "@id": imageId,
        },
        mainEntityOfPage: {
          "@id": `${canonical}#webpage`,
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
      },
      {
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
      },
    ],
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
  faqs: ServiceLandingContent["faqs"]
) {
  return faqs.filter(
    (faq) => !hasPricingLanguage(faq.question) && !hasPricingLanguage(faq.answer)
  );
}

function cleanKeywordList(keywords?: string[]) {
  return keywords
    ?.filter((keyword) => !hasPricingLanguage(keyword))
    .map((keyword) => cleanPricingText(keyword));
}
