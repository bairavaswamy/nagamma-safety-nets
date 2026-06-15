import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areas } from "@/app/data/areasData";
import { servicesData } from "@/app/data/serviceData";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";
import StickyContactIcons from "@/app/stickyicons/stickyIcons";
import { businessReference } from "@/app/data/businessProfile";

type Params = {
  params: Promise<{ area: string }>;
};

const BASE_URL = "https://servanisafetynets.com";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");

const serviceSlugs = Object.keys(servicesData);

const formatName = (slug: string) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const generateStaticParams = () =>
  serviceSlugs.map((area) => ({
    area,
  }));

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const { area } = await params;
  const service = servicesData[area as keyof typeof servicesData];

  if (!service) {
    return {
      title: "Page Not Found | Servani Safety Nets",
      robots: { index: false, follow: false },
    };
  }

  const title = `${service.title} Service Areas in Bangalore`;
  const description = `Choose your Bangalore area for ${service.title.toLowerCase()} with measured installation, suitable fixing, and clean handover by Servani Safety Nets.`;
  const url = `${BASE_URL}/bangalore/${area}/`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Servani Safety Nets",
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [service.image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
};

export default async function BangaloreServiceHub({ params }: Params) {
  const { area } = await params;
  const service = servicesData[area as keyof typeof servicesData];

  if (!service) notFound();

  const pageUrl = `${BASE_URL}/bangalore/${area}/`;
  const itemList = areas.map((areaName, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: `${service.title} in ${areaName}`,
    url: `${BASE_URL}/bangalore/${slugify(areaName)}/${area}/`,
  }));

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#page`,
        name: `${service.title} service areas in Bangalore`,
        url: pageUrl,
        description: service.description,
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.title,
        description: service.description,
        provider: businessReference,
        areaServed: {
          "@type": "City",
          name: "Bangalore",
        },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#areas`,
        itemListElement: itemList,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <main>
        <script
          id="bangalore-service-hub-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        <section className="bg-[#F8FAFC] px-5 pb-16 pt-28 md:px-10">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
                Bangalore Service Areas
              </p>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#111827] md:text-6xl">
                {service.title} in Bangalore
              </h1>
              <p className="mt-6 text-base leading-8 text-[#475569] md:text-lg">
                Select your area for measured {service.title.toLowerCase()} installation.
                We check the opening, fixing surface, access, and expected use before
                suggesting the right material and finish.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="tel:7995792953"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#C2410C] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#9A3412]"
                >
                  Call Now
                </a>
                <a
                  href="https://wa.me/7995792953?text=Hi%20Servani%20Safety%20Nets,%20I%20need%20a%20quote"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#0F766E] px-6 py-3 font-semibold text-[#0F766E] transition hover:bg-teal-50"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
              <Image
                src={service.image}
                alt={`${service.title} in Bangalore`}
                width={900}
                height={640}
                className="aspect-[4/3] w-full rounded-md object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] md:text-4xl">
              Choose Your Area
            </h2>
            <p className="mt-5 max-w-3xl leading-8 text-[#475569]">
              Use these area links to open the exact local page for {service.title.toLowerCase()}.
              Each page keeps the service and location separate, so the information stays specific
              instead of repeating the same broad content.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {areas.map((areaName) => (
                <Link
                  prefetch={false}
                  key={areaName}
                  href={`/bangalore/${slugify(areaName)}/${area}/`}
                  className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-4 font-medium text-[#334155] shadow-sm transition hover:border-[#0F766E] hover:bg-white hover:text-[#0F766E]"
                >
                  {service.title} in {formatName(slugify(areaName))}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F8FAFC] px-5 py-16 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {[
              {
                title: "Measured Before Quote",
                body: "Final pricing depends on size, height, fixing surface, material choice, and access.",
              },
              {
                title: "Area-Specific Planning",
                body: "Apartment balconies, windows, ducts, terraces, and commercial spaces need different fixing methods.",
              },
              {
                title: "Clean Installation",
                body: "The team checks edge tension, usable space, and handover details before closing the work.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-[#111827]">{item.title}</h3>
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
