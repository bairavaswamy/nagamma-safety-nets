import {
  areas,
  getServicePath,
  services,
  siteConfig,
} from "./bangalore/data/serviceAreaData";
import { galleryData } from "./home/data/homeData";

export const businessSchemaId = `${siteConfig.baseUrl}/#business`;
export const websiteSchemaId = `${siteConfig.baseUrl}/#website`;
export const logoSchemaId = `${siteConfig.baseUrl}/#logo`;
export const primaryImageSchemaId = `${siteConfig.baseUrl}/#primary-image`;

export const sanitizeJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

type JsonLdRecord = Record<string, unknown>;

type BreadcrumbItem = {
  name: string;
  item: string;
};

type ImageInput = {
  src: string;
  name: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  id?: string;
};

export function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${siteConfig.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildImageJsonLd(image: ImageInput): JsonLdRecord {
  const url = absoluteUrl(image.src);

  return {
    "@type": "ImageObject",
    "@id": image.id || `${url}#image`,
    url,
    contentUrl: url,
    name: image.name,
    caption: image.caption || image.alt || image.name,
    ...(image.width ? { width: image.width } : {}),
    ...(image.height ? { height: image.height } : {}),
    inLanguage: "en-IN",
  };
}

export function buildBreadcrumbJsonLd(
  canonical: string,
  items: BreadcrumbItem[]
): JsonLdRecord {
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function buildWebPageJsonLd({
  type = "WebPage",
  canonical,
  name,
  description,
  imageId,
  breadcrumbId,
  mainEntityId,
}: {
  type?: string;
  canonical: string;
  name: string;
  description: string;
  imageId?: string;
  breadcrumbId?: string;
  mainEntityId?: string;
}): JsonLdRecord {
  return {
    "@type": type,
    "@id": `${canonical}#webpage`,
    url: canonical,
    name,
    description,
    isPartOf: {
      "@id": websiteSchemaId,
    },
    about: {
      "@id": businessSchemaId,
    },
    ...(imageId
      ? {
          primaryImageOfPage: {
            "@id": imageId,
          },
        }
      : {}),
    ...(breadcrumbId
      ? {
          breadcrumb: {
            "@id": breadcrumbId,
          },
        }
      : {}),
    ...(mainEntityId
      ? {
          mainEntity: {
            "@id": mainEntityId,
          },
        }
      : {}),
    inLanguage: "en-IN",
  };
}

function buildServiceItemListJsonLd(canonical: string): JsonLdRecord {
  return {
    "@type": "ItemList",
    "@id": `${canonical}#services`,
    name: `${siteConfig.name} services in ${siteConfig.city}`,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": `${siteConfig.baseUrl}${getServicePath(service.slug)}#service`,
        name: service.name,
        description: service.shortDescription,
        url: `${siteConfig.baseUrl}${getServicePath(service.slug)}`,
        provider: {
          "@id": businessSchemaId,
        },
      },
    })),
  };
}

export function buildBusinessJsonLd() {
  return {
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": businessSchemaId,
    name: siteConfig.name,
    url: siteConfig.baseUrl,
    telephone: siteConfig.phoneInternational,
    logo: {
      "@id": logoSchemaId,
    },
    image: [
      {
        "@id": logoSchemaId,
      },
      {
        "@id": primaryImageSchemaId,
      },
    ],
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
    description: siteConfig.businessDescription,
    publisher: {
      "@id": businessSchemaId,
    },
    inLanguage: "en-IN",
  };
}

export function buildRootJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildBusinessJsonLd(),
      buildWebsiteJsonLd(),
      buildImageJsonLd({
        id: logoSchemaId,
        src: "/logo-horizontal.webp",
        name: `${siteConfig.name} logo`,
        alt: `${siteConfig.name} logo`,
        width: 640,
        height: 200,
      }),
      buildImageJsonLd({
        id: primaryImageSchemaId,
        src: "/og-image.png",
        name: `${siteConfig.name} Bangalore safety net installation`,
        alt: `${siteConfig.name} Bangalore`,
        width: 1200,
        height: 630,
      }),
    ],
  };
}

export function buildHomePageJsonLd() {
  const canonical = `${siteConfig.baseUrl}/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        canonical,
        name: `${siteConfig.name} Bangalore`,
        description:
          "Safety nets, invisible grills, sports nets, and cloth hanger installation across Bangalore.",
        imageId: `${canonical}#home-image`,
        breadcrumbId: `${canonical}#breadcrumb`,
        mainEntityId: businessSchemaId,
      }),
      buildBreadcrumbJsonLd(canonical, [
        {
          name: "Home",
          item: canonical,
        },
      ]),
      buildImageJsonLd({
        id: `${canonical}#home-image`,
        src: galleryData[0].image,
        name: `${siteConfig.name} balcony safety net work`,
        alt: galleryData[0].title,
      }),
      buildServiceItemListJsonLd(canonical),
    ],
  };
}

export function buildBangaloreLandingJsonLd() {
  const canonical = `${siteConfig.baseUrl}/bangalore/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        type: "CollectionPage",
        canonical,
        name: `Safety net services in ${siteConfig.city}`,
        description:
          "Safety net, invisible grill, sports net, cloth hanger, and balcony protection services across Bangalore.",
        imageId: primaryImageSchemaId,
        breadcrumbId: `${canonical}#breadcrumb`,
      }),
      buildBreadcrumbJsonLd(canonical, [
        {
          name: "Home",
          item: `${siteConfig.baseUrl}/`,
        },
        {
          name: siteConfig.city,
          item: canonical,
        },
      ]),
      buildServiceItemListJsonLd(canonical),
      {
        "@type": "ItemList",
        "@id": `${canonical}#areas`,
        name: `${siteConfig.city} service areas`,
        itemListElement: areas.map((area, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Place",
            name: `${area.name}, ${siteConfig.city}`,
          },
        })),
      },
    ],
  };
}

export function buildAboutPageJsonLd() {
  const canonical = `${siteConfig.baseUrl}/about/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        type: "AboutPage",
        canonical,
        name: `About ${siteConfig.name}`,
        description: `${siteConfig.name} provides safety net, invisible grill, sports net, and cloth hanger services across Bangalore from ${siteConfig.branchAreaName}.`,
        imageId: primaryImageSchemaId,
        breadcrumbId: `${canonical}#breadcrumb`,
        mainEntityId: businessSchemaId,
      }),
      buildBreadcrumbJsonLd(canonical, [
        {
          name: "Home",
          item: `${siteConfig.baseUrl}/`,
        },
        {
          name: "About",
          item: canonical,
        },
      ]),
    ],
  };
}

export function buildGalleryPageJsonLd() {
  const canonical = `${siteConfig.baseUrl}/gallery/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        type: "ImageGallery",
        canonical,
        name: `${siteConfig.name} work photos`,
        description:
          "Safety net, pigeon net, invisible grill, cloth hanger, and sports net installation photos from Bangalore.",
        imageId: `${canonical}#gallery-image-1`,
        breadcrumbId: `${canonical}#breadcrumb`,
      }),
      buildBreadcrumbJsonLd(canonical, [
        {
          name: "Home",
          item: `${siteConfig.baseUrl}/`,
        },
        {
          name: "Gallery",
          item: canonical,
        },
      ]),
      {
        "@type": "ItemList",
        "@id": `${canonical}#images`,
        name: `${siteConfig.name} installation images`,
        itemListElement: galleryData.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@id": `${canonical}#gallery-image-${index + 1}`,
          },
        })),
      },
      ...galleryData.map((item, index) =>
        buildImageJsonLd({
          id: `${canonical}#gallery-image-${index + 1}`,
          src: item.image,
          name: item.title,
          alt: `${item.service} in ${item.location}, ${siteConfig.city}`,
          caption: `${item.service} work in ${item.location}, ${siteConfig.city}`,
        })
      ),
    ],
  };
}

export function buildContactPageJsonLd() {
  const canonical = `${siteConfig.baseUrl}${siteConfig.contactPath}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        type: "ContactPage",
        canonical,
        name: `Contact ${siteConfig.name}`,
        description: `Contact ${siteConfig.name} for safety nets, invisible grills, sports nets, cloth hangers, and balcony safety services in ${siteConfig.city}.`,
        imageId: primaryImageSchemaId,
        breadcrumbId: `${canonical}#breadcrumb`,
        mainEntityId: businessSchemaId,
      }),
      buildBreadcrumbJsonLd(canonical, [
        {
          name: "Home",
          item: `${siteConfig.baseUrl}/`,
        },
        {
          name: "Contact",
          item: canonical,
        },
      ]),
    ],
  };
}
