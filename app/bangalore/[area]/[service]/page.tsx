import { Metadata } from "next";
import { notFound } from "next/navigation";
import { areas } from "@/app/data/areasData";
import { servicesData } from "@/app/data/serviceData";

import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";
import HeroSection from "@/app/components/HeroSection";
import DetailedDescription from "@/app/components/DetailedDescription";
import InfoSection from "@/app/components/InfoSection";
import FAQSection from "@/app/components/FAQSection";
import StickyContactIcons from "@/app/stickyicons/stickyIcons";
import MapSection from "@/app/components/MapSection";
import Solution from "@/app/components/Solution";
import PriceSection from "@/app/components/PriceSection";
import NearbyAreasSection from "@/app/components/NearbyAreasSection";
import AreaRichContent from "@/app/components/AreaRichContent";
import { richAreaContent } from "@/app/data/richAreaContent";
import {
  buildAreaServiceMetadata,
  formatAreaName,
} from "@/app/data/areaServiceSeo";
import { businessProfile, businessReference } from "@/app/data/businessProfile";

type Params = {
  params: Promise<{ area: string; service: string }>;
};


const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
const areaNamesBySlug = new Map(areas.map((area) => [slugify(area), area]));
const validAreaSlugs = new Set(areaNamesBySlug.keys());
const serviceAliases: Record<string, keyof typeof servicesData> = {
  "building-covering-safety-nets": "building-covering-nets",
  "invisible-safety-nets": "invisible-nets",
};
const serviceRouteSlugs = Array.from(
  new Set([...Object.keys(servicesData), ...Object.keys(serviceAliases)])
);
const resolveServiceSlug = (service: string) => serviceAliases[service] || service;

// Fallback copy for pages without a dedicated rich content entry.
const introVariants = [
  `Need {service} in {area}? Servani Safety Nets measures the space and installs a suitable net with a clean finish.`,
  `Servani Safety Nets provides {service} in {area}, Bangalore for homes, apartments, and commercial spaces that need practical protection.`,
  `Get measured {service} in {area} with material and fixing planned around your balcony, window, shaft, or open space.`,
];

const trustVariants = [
  `Our technicians check fixing points before installation.`,
  `We use weather-resistant material selected for the opening.`,
  `Each installation is sized after checking access and surface condition.`,
];

const closingVariants = [
  `Contact Servani Safety Nets for a measured quote in {area}.`,
  `Schedule your {service} installation in {area} after site measurement.`,
  `Share your location and opening size for {service} support in {area}.`,
];

// Generate a stable fallback description.
function generateDescription(service: string, area: string) {
  const seed = `${service}-${area}`.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const intro = introVariants[seed % introVariants.length];
  const trust = trustVariants[(seed + 1) % trustVariants.length];
  const closing = closingVariants[(seed + 2) % closingVariants.length];

  return `
${intro.replace(/{service}/g, service).replace(/{area}/g, area)}

${trust}

We provide ${service.toLowerCase()} solutions for balconies, windows, apartments, and open areas in ${area}, Bangalore. Our services are designed for child safety, pet protection, and bird control.

${closing.replace(/{service}/g, service).replace(/{area}/g, area)}
  `;
}

// Generate all area-service pages.
export const generateStaticParams = () => {
  return areas.flatMap((area) =>
    serviceRouteSlugs.map((service) => ({
      area: slugify(area),
      service,
    }))
  );
};

// SEO metadata.
export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const { area, service } = await params;
  const canonicalService = resolveServiceSlug(service);
  const serviceData = servicesData[canonicalService as keyof typeof servicesData];

  if (!serviceData || !validAreaSlugs.has(area)) {
    return {
      title: "Page Not Found | Servani Safety Nets",
      robots: { index: false, follow: false },
    };
  }

  const areaName = formatAreaName(area, areaNamesBySlug);
  const url = `https://servanisafetynets.com/bangalore/${area}/${canonicalService}`;
  const seo = buildAreaServiceMetadata({
    areaName,
    areaSlug: area,
    serviceSlug: service,
    serviceTitle: serviceData.title,
  });

  return {
    title: { absolute: `${seo.title} | Servani` },
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: seo.ogTitle,
      description: seo.description,
      url,
      siteName: "Servani Safety Nets",
      images: [
        {
          url: serviceData.image,
          width: 1200,
          height: 630,
          alt: seo.imageAlt,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
      twitter: {
      card: "summary_large_image",
      title: seo.ogTitle,
      description: seo.description,
      images: [serviceData.image],
    },

  };
};



// Page component.
const AreaServicePage = async ({ params }: Params) => {
  const { area, service } = await params;
  const canonicalService = resolveServiceSlug(service);
  const serviceData = servicesData[canonicalService as keyof typeof servicesData];

  if (!serviceData || !validAreaSlugs.has(area)) notFound();

  const areaName = formatAreaName(area, areaNamesBySlug);
  const serviceName = serviceData.title;
  const richContent = richAreaContent[`${area}/${canonicalService}`];

  const dynamicDescription =
    richContent?.description || generateDescription(serviceName, areaName);

  const finalFaqs =
    richContent?.faqs || [
      {
        question: `Do you provide ${serviceName} in ${areaName}?`,
        answer: `Yes, Servani Safety Nets offers ${serviceName.toLowerCase()} services in ${areaName}, Bangalore with professional installation.`,
      },
      {
        question: `What is the cost of ${serviceName} in ${areaName}?`,
        answer: `The cost depends on measured area, material, access, and fixing requirements. Contact us for a quote after measurement.`,
      },
      {
        question: `How long does installation take in ${areaName}?`,
        answer: `Most ${serviceName.toLowerCase()} installations are completed within a few hours after measurement, depending on access and site size.`,
      },
      {
        question: `Is it safe for children and pets?`,
        answer: `Yes, when the material, mesh size, and edge fixing are chosen for children or pets specifically.`,
      },
      {
        question: `Do you offer service near ${areaName}?`,
        answer: `Yes, we also serve nearby areas around ${areaName}.`,
      },
    ];

  const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `https://servanisafetynets.com/bangalore/${area}/${canonicalService}#service`,
      name: `${serviceName} in ${areaName}`,
      description: dynamicDescription,
      provider: businessReference,
      areaServed: {
        "@type": "Place",
        name: areaName,
      },
      serviceType: serviceName,
    },

    {
      "@type": "FAQPage",
      "@id": `https://servanisafetynets.com/bangalore/${area}/${canonicalService}#faq`,
      mainEntity: finalFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${businessProfile.baseUrl}/bangalore/${area}/${canonicalService}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: businessProfile.baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: `${serviceName} Service Areas`,
          item: `${businessProfile.baseUrl}/bangalore/${canonicalService}/`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${serviceName} in ${areaName}`,
          item: `${businessProfile.baseUrl}/bangalore/${area}/${canonicalService}`,
        },
      ],
    },
  ],
};

  return (
    <>
      <Navbar />
<main>
      <script
        id="area-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <HeroSection
        title={`${serviceName} in ${areaName}`}
        description={
          richContent?.opening ||
          `${serviceName} installation in ${areaName}, Bangalore for homes, apartments, and commercial spaces with measured fitting and clean handover.`
        }
        image={serviceData.image}
      />

      <DetailedDescription
        title={`${serviceName} in ${areaName}`}
        description={dynamicDescription}
      />

      {richContent && <AreaRichContent content={richContent} />}

      <Solution
        serviceName={serviceName}
        serviceSlug={canonicalService}
        areaName={areaName}
        image={serviceData.image}
      />

      <PriceSection serviceName={serviceName} serviceSlug={canonicalService} areaName={areaName} />

      <NearbyAreasSection serviceName={serviceName} serviceSlug={canonicalService} areaName={areaName} />

      <InfoSection
        title={`Why Choose ${serviceName} in ${areaName}?`}
        description={`Servani Safety Nets is a trusted provider of ${serviceName.toLowerCase()} in ${areaName}, Bangalore. We offer high-quality materials, expert installation, and customized solutions for complete safety. Our services are ideal for child safety, pet protection, and bird control.`}
        image={serviceData.image}
      />


      <MapSection area={areaName} />
      
      <FAQSection faqs={finalFaqs} />
</main>
      <StickyContactIcons />
      <Footer />
    </>
  );
};

export default AreaServicePage;
