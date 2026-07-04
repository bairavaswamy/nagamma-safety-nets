import {
  areas,
  getServicePath,
  services,
  siteConfig,
} from "./bangalore/data/serviceAreaData";

export const businessSchemaId = `${siteConfig.baseUrl}/#business`;
export const websiteSchemaId = `${siteConfig.baseUrl}/#website`;

export const sanitizeJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

export function buildBusinessJsonLd() {
  return {
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": businessSchemaId,
    name: siteConfig.name,
    url: siteConfig.baseUrl,
    image: `${siteConfig.baseUrl}/og-image.webp`,
    description: siteConfig.businessDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.branchAreaName,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
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
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        url: `${siteConfig.baseUrl}${getServicePath(service.slug)}`,
      },
    })),
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": websiteSchemaId,
    name: siteConfig.name,
    url: siteConfig.baseUrl,
    publisher: {
      "@id": businessSchemaId,
    },
    inLanguage: "en-IN",
  };
}

export function buildRootJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [buildBusinessJsonLd(), buildWebsiteJsonLd()],
  };
}

export function buildContactPageJsonLd() {
  const canonical = `${siteConfig.baseUrl}${siteConfig.contactPath}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${canonical}#webpage`,
        name: `Contact ${siteConfig.name}`,
        url: canonical,
        isPartOf: {
          "@id": websiteSchemaId,
        },
        about: {
          "@id": businessSchemaId,
        },
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${siteConfig.baseUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Contact",
            item: canonical,
          },
        ],
      },
    ],
  };
}
