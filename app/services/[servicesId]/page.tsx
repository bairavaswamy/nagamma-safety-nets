import { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/app/servicesData/servicesData";
import { servicesContent } from "@/app/servicesData/servicesContent";
import { richServiceContent } from "@/app/servicesData/richServiceContent";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";
import StickyContactIcons from "@/app/stickyicons/stickyIcons";
import HeroSection from "./components/HeroSection";
import DetailedDescription from "./components/DetailedDescription";
import InfoSection from "./components/InfoSection";
import FAQSection from "./components/FAQSection";
import RichServiceContent from "./components/RichServiceContent";
import { businessProfile, businessReference } from "@/app/data/businessProfile";

type Params = {
  params: { servicesId: string };
};

// Static service paths.
export const generateStaticParams = () => {
  return Object.keys(servicesData).map((servicesId) => ({
    servicesId,
  }));
};

// Service metadata.
export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const { servicesId } = await params;

  const service =
    servicesData[servicesId as keyof typeof servicesData];

  if (!service) {
    return {
      title: "Service Not Found | Servani Safety Nets",
      description: "Requested service not found.",
      robots: { index: false, follow: false },
    };
  }


  const cleanName = service.title;
  const richContent = richServiceContent[servicesId];
  const title = richContent?.metaTitle || `${cleanName} | Servani Safety Nets`;
  const description =
    richContent?.metaDescription ||
    service.description ||
    `${cleanName} in Bangalore with measured installation, suitable material, and clean fixing for homes, apartments, and commercial spaces.`;

  const image = service.image || "/og-image.webp";
  const url = `https://servanisafetynets.com/services/${servicesId}`;

  return {
    title,
    description,

    keywords: [
      `${cleanName} in Bangalore`,
      `${servicesId.replaceAll("-", " ")}`,
      `${cleanName} installation Bangalore`,
      `${cleanName} price Bangalore`,
      "safety nets Bangalore",
      "balcony nets Bangalore",
      "pigeon nets Bangalore",
      "child safety nets",
      "pet safety nets",
      "Servani Safety Nets",
    ],

    alternates: { canonical: url },

    openGraph: {
      title,
      description,
      url,
      siteName: "Servani Safety Nets",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: cleanName,
        },
      ],
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true, 
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    metadataBase: new URL("https://servanisafetynets.com"),
  };
};

// Page component.
const ServiceDetailsPage = async({ params }: Params) => {
  const { servicesId } = await params;

  const service =
    servicesData[servicesId as keyof typeof servicesData];

  const content = servicesContent[servicesId];
  const richContent = richServiceContent[servicesId];

  // If service is not found.
  if (!service) {
    notFound();
  }

  // Fallback content for services without a detailed entry.
  const fallbackDescription = `We provide ${service.title} in Bangalore with measured installation, suitable material, and clean fixing for homes, apartments, and commercial spaces.`;

  const finalDescription =
    richContent?.detailedDescription ||
    content?.detailedDescription ||
    fallbackDescription;

  const finalFaqs =
    richContent?.faqs && richContent.faqs.length > 0
      ? richContent.faqs
      : content?.faqs && content.faqs.length > 0
      ? content.faqs
      : [
          {
            question: `What is ${service.title}?`,
            answer: `${service.title} is a safety solution provided by Servani Safety Nets in Bangalore.`,
          },
          {
            question: `Do you provide installation in Bangalore?`,
            answer: `Yes, we provide complete installation across Bangalore.`,
          },
        ];

        const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `https://servanisafetynets.com/services/${servicesId}#service`,
      name: service.title,
      description: finalDescription,
      provider: businessReference,
      areaServed: {
        "@type": "City",
        name: "Bangalore",
      },
      serviceType: service.title,
    },

    {
      "@type": "FAQPage",
      "@id": `https://servanisafetynets.com/services/${servicesId}#faq`,
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
          name: "Services",
          item: `${businessProfile.baseUrl}/#services`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.title,
          item: `https://servanisafetynets.com/services/${servicesId}`,
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
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <HeroSection {...service} />

      <DetailedDescription
        description={finalDescription}
        title={service.title}
      />

      {richContent && (
        <RichServiceContent content={richContent} serviceTitle={service.title} />
      )}

      <FAQSection faqs={finalFaqs} />

      <InfoSection {...service} />

      <StickyContactIcons />
      </main>
      <Footer />
    </>
  );
};

export default ServiceDetailsPage;
