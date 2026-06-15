const BASE_URL = "https://servanisafetynets.com";

export const businessProfile = {
  baseUrl: BASE_URL,
  businessId: `${BASE_URL}/#business`,
  websiteId: `${BASE_URL}/#website`,
  name: "Servani Safety Nets",
  alternateName: "Servani Enterprise",
  phone: "+91-7995792953",
  displayPhone: "+91 79957 92953",
  email: "servanienterprise@gmail.com",
  logo: `${BASE_URL}/servani-logo.webp`,
  image: `${BASE_URL}/og-image.webp`,
  priceRange: "INR 15-350 per sq ft",
  googleBusinessUrl: "https://g.page/r/CagMjrUK8tRuEBM",
  instagramUrl: "https://www.instagram.com/servanisafetynets/",
  facebookUrl: "https://www.facebook.com/p/Servani-Enterprise-61576734022219/",
  mapEmbedUrl:
    "https://www.google.com/maps?q=12.957239528521276,77.7034455315824&hl=en&z=17&output=embed",
  mapDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=12.957239528521276,77.7034455315824",
  address: {
    streetAddress: "Marathahalli, Old Airport Road, Varthur Main Road",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560037",
    addressCountry: "IN",
  },
  geo: {
    latitude: 12.957239528521276,
    longitude: 77.7034455315824,
  },
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "19:00",
  },
  languages: ["English", "Hindi", "Telugu", "Kannada"],
  serviceNames: [
    "Balcony Safety Nets",
    "Pigeon Safety Nets",
    "Anti Bird Nets",
    "Invisible Safety Nets",
    "Invisible Grills",
    "Bird Spikes",
    "Duct Area Safety Nets",
    "Window Safety Nets",
    "Staircase Safety Nets",
    "Children Safety Nets",
    "Cat Safety Nets",
    "Sports Safety Nets",
    "Construction Safety Nets",
    "Industrial Safety Nets",
    "Building Covering Nets",
    "Cloth Hangers",
  ],
};

export const businessReference = {
  "@id": businessProfile.businessId,
};

export const buildBusinessJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
      "@id": businessProfile.businessId,
      name: businessProfile.name,
      alternateName: businessProfile.alternateName,
      url: businessProfile.baseUrl,
      logo: businessProfile.logo,
      image: businessProfile.image,
      telephone: businessProfile.phone,
      email: businessProfile.email,
      priceRange: businessProfile.priceRange,
      description:
        "Servani Safety Nets provides balcony safety nets, pigeon nets, invisible grills, bird spikes, duct area nets, sports nets, and related safety installations in Bangalore.",
      address: {
        "@type": "PostalAddress",
        ...businessProfile.address,
      },
      geo: {
        "@type": "GeoCoordinates",
        ...businessProfile.geo,
      },
      hasMap: businessProfile.googleBusinessUrl,
      sameAs: [
        businessProfile.googleBusinessUrl,
        businessProfile.instagramUrl,
        businessProfile.facebookUrl,
      ],
      areaServed: [
        {
          "@type": "City",
          name: "Bengaluru",
        },
        {
          "@type": "City",
          name: "Bangalore",
        },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: businessProfile.openingHours.days,
          opens: businessProfile.openingHours.opens,
          closes: businessProfile.openingHours.closes,
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: businessProfile.phone,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: businessProfile.languages,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Safety Net and Invisible Grill Services",
        itemListElement: businessProfile.serviceNames.map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": businessProfile.websiteId,
      name: businessProfile.name,
      url: businessProfile.baseUrl,
      inLanguage: "en-IN",
      publisher: businessReference,
    },
  ],
});
