import { servicesData } from "@/app/data/servicesData";
import Navbar from "@/app/navbar/Navbar";
import StickyContactIcons from "@/app/stickyicons/stickyIcons";
import Footer from "@/app/footer/Footer";
import TopSection from "./components/TopSection";
import DetailedContent from "./components/DetailedContent";
import BenefitApplications from "./components/BenefitApplications";
import FAQSection from "./components/FAQSection";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { businessProfile, businessReference } from "@/app/data/businessProfile";

type Params = {
  params: { id: string };
};

// Static pages.
export const generateStaticParams = (): Array<{ id: string }> => {
  return Object.keys(servicesData).map((id) => ({ id }));
};

// Solution metadata.
export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const { id } = await params;
  const service = servicesData[id as keyof typeof servicesData];

  if (!service) {
    return {
      title: "Service Not Found | Servani Safety Nets",
      description: "Service not found.",
      robots: { index: false, follow: false },
    };
  }

   const cleanName = service.title;
  const url = `https://servanisafetynets.com/solutions/${id}`;
  const image = service.image || "/images/slider_1.webp";

  const title = `${cleanName} in Bangalore | Servani Safety Nets`;
  const description = `${cleanName} in Bangalore with measured installation, suitable material, and clean fixing for homes, apartments, and commercial spaces.`;

  return {
    title,
    description,
    keywords: [
      `${cleanName} Bangalore`,
      `${cleanName} installation Bangalore`,
      `${cleanName} price Bangalore`,
      "Safety Nets Bangalore",
      "Balcony Safety Nets Bangalore",
      "Pigeon Nets Bangalore",
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
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    metadataBase: new URL("https://servanisafetynets.com"),

    authors: [{ name: "Servani Safety Nets" }],
    publisher: "Servani Safety Nets",
    category: "Home Safety Solutions",
  };
};

// Page component.
const SolutionDetails = async({ params }: Params) => {
  const { id } = await params;
  const service = servicesData[id];

  if (!service) {
    notFound();
  }

    const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `https://servanisafetynets.com/solutions/${id}#service`,
      name: service.title,
      description: service.description,
      serviceType: service.title,
      provider: businessReference,
      areaServed: {
        "@type": "City",
        name: "Bangalore",
      },
    },

    {
      "@type": "FAQPage",
      "@id": `https://servanisafetynets.com/solutions/${id}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: `What is ${service.title}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: service.description,
          },
        },
        {
          "@type": "Question",
          name: `Do you provide ${service.title} in Bangalore?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Yes, Servani Safety Nets provides ${service.title.toLowerCase()} installation across Bangalore.`,
          },
        },
        {
          "@type": "Question",
          name: `Is it safe for children and pets?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Yes, our safety nets are designed for maximum protection and durability.`,
          },
        },
      ],
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
          name: "Solutions",
          item: `${businessProfile.baseUrl}/#solutions`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.title,
          item: `https://servanisafetynets.com/solutions/${id}`,
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
        id="solution-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <TopSection {...service} />

      <DetailedContent
        title={service.title}
        description={service.description}
        detailedContent={service.detailedContent}
      />

      <BenefitApplications />

      <FAQSection />

      <StickyContactIcons />
      </main>
      <Footer />
    </>
  );
};

export default SolutionDetails;
