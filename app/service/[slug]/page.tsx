import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicesData as servicePagesData } from "@/app/servicesData/servicesData";
import { servicesData as solutionPagesData } from "@/app/data/servicesData";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";
import StickyContactIcons from "@/app/stickyicons/stickyIcons";
import { businessReference } from "@/app/data/businessProfile";

type Params = {
  params: Promise<{ slug: string }>;
};

type LegacyTarget = {
  title: string;
  description: string;
  image: string;
  targetPath: string;
  targetLabel: string;
};

const BASE_URL = "https://servanisafetynets.com";

const legacySlugs = Array.from(
  new Set([...Object.keys(servicePagesData), ...Object.keys(solutionPagesData)])
);

const resolveLegacyTarget = (slug: string): LegacyTarget | null => {
  const servicePage = servicePagesData[slug as keyof typeof servicePagesData];

  if (servicePage) {
    return {
      title: servicePage.title,
      description: servicePage.description,
      image: servicePage.image,
      targetPath: `/services/${slug}/`,
      targetLabel: "View service details",
    };
  }

  const solutionPage = solutionPagesData[slug];

  if (solutionPage) {
    return {
      title: solutionPage.title,
      description: solutionPage.description,
      image: solutionPage.image,
      targetPath: `/solutions/${slug}/`,
      targetLabel: "View solution details",
    };
  }

  return null;
};

export const generateStaticParams = () =>
  legacySlugs.map((slug) => ({
    slug,
  }));

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const { slug } = await params;
  const target = resolveLegacyTarget(slug);

  if (!target) {
    return {
      title: "Page Not Found | Servani Safety Nets",
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `${BASE_URL}${target.targetPath}`;

  return {
    title: target.title,
    description: target.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: target.title,
      description: target.description,
      url: canonicalUrl,
      siteName: "Servani Safety Nets",
      images: [
        {
          url: target.image,
          width: 1200,
          height: 630,
          alt: target.title,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: target.title,
      description: target.description,
      images: [target.image],
    },
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
};

export default async function LegacyServicePage({ params }: Params) {
  const { slug } = await params;
  const target = resolveLegacyTarget(slug);

  if (!target) notFound();

  const canonicalUrl = `${BASE_URL}${target.targetPath}`;
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/service/${slug}/#page`,
        name: target.title,
        url: `${BASE_URL}/service/${slug}/`,
        isPartOf: {
          "@id": `${BASE_URL}/#website`,
        },
        mainEntity: {
          "@id": `${canonicalUrl}#service`,
        },
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: target.title,
        description: target.description,
        provider: businessReference,
        areaServed: {
          "@type": "City",
          name: "Bangalore",
        },
      },
    ],
  };

  return (
    <>
      <Navbar />
      <main>
        <script
          id="legacy-service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        <section className="bg-[#F8FAFC] px-5 pb-16 pt-28 md:px-10">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
                Servani Safety Nets
              </p>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#111827] md:text-6xl">
                {target.title}
              </h1>
              <p className="mt-6 text-base leading-8 text-[#475569] md:text-lg">
                {target.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  prefetch={false}
                  href={target.targetPath}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#C2410C] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#9A3412]"
                >
                  {target.targetLabel}
                </Link>
                <a
                  href="tel:7995792953"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#0F766E] px-6 py-3 font-semibold text-[#0F766E] transition hover:bg-teal-50"
                >
                  Call Now
                </a>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
              <Image
                src={target.image}
                alt={target.title}
                width={900}
                height={640}
                className="aspect-[4/3] w-full rounded-md object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-16 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {[
              {
                title: "Measured Fit",
                body: "The opening size, access, height, and fixing surface are checked before final pricing.",
              },
              {
                title: "Suitable Material",
                body: "Material and mesh choice depend on safety use, bird control needs, visibility, and weather exposure.",
              },
              {
                title: "Clear Handover",
                body: "The team checks edges, tension, and usable space after installation so the finish stays practical.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#111827]">{item.title}</h2>
                <p className="mt-3 leading-7 text-[#475569]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <StickyContactIcons />
      <Footer />
    </>
  );
}
