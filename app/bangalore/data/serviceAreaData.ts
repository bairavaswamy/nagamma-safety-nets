export const siteConfig = {
  name: "Nagamma Safety Nets",
  baseUrl: "https://nagammasafetynets.com",
  city: "Bangalore",
  branchAreaSlug: "marathahalli",
  branchAreaName: "Marathahalli",
} as const;

export const services = [
  {
    slug: "pigeon-safety-nets",
    name: "Pigeon Safety Nets",
    keyword: "pigeon safety nets",
    shortDescription:
      "Balcony, window, duct, and utility-area netting planned to reduce bird entry and keep homes cleaner.",
    aliases: ["pigeon nets", "bird safety nets", "bird nets"],
  },
  {
    slug: "invisible-grills",
    name: "Invisible Grills",
    keyword: "invisible grills",
    shortDescription:
      "Modern balcony and window grill systems designed for safety while keeping the view open.",
    aliases: ["invisible grill", "invisible balcony grills", "invisible window grills"],
  },
  {
    slug: "monkey-safety-nets",
    name: "Monkey Safety Nets",
    keyword: "monkey safety nets",
    shortDescription:
      "Heavy-duty netting for balconies, terraces, and open edges where stronger entry protection is needed.",
    aliases: ["monkey nets", "animal safety nets"],
  },
  {
    slug: "children-safety-nets",
    name: "Children Safety Nets",
    keyword: "children safety nets",
    shortDescription:
      "Protective netting for balconies, windows, stair openings, and indoor void areas in family homes.",
    aliases: ["child safety nets", "kids safety nets"],
  },
  {
    slug: "sports-nets",
    name: "Sports Nets",
    keyword: "sports nets",
    shortDescription:
      "Practice and play-area netting for apartments, schools, terraces, and sports activity zones.",
    aliases: ["sports safety nets", "cricket nets", "practice nets"],
  },
  {
    slug: "cloth-hangers",
    name: "Cloth Hangers",
    keyword: "cloth hangers",
    shortDescription:
      "Ceiling, pulley, fixed, and utility-area drying setups planned around usable space and reach.",
    aliases: ["cloth hanger", "ceiling cloth hanger", "pulley cloth hanger"],
  },
  {
    slug: "balcony-safety-nets",
    name: "Balcony Safety Nets",
    keyword: "balcony safety nets",
    shortDescription:
      "Measured balcony net installation for apartments, homes, and high-rise safety needs.",
    aliases: ["balcony nets", "balcony protection nets"],
  },
] as const;

export const areas = [
  {
    slug: "yelahanka",
    name: "Yelahanka",
    aliases: ["yalahanka"],
  },
  {
    slug: "nagavara",
    name: "Nagavara",
    aliases: ["nagavara", "nagawara"],
  },
  {
    slug: "kalyan-nagar",
    name: "Kalyan Nagar",
    aliases: ["kalyan nagar"],
  },
  {
    slug: "kr-puram",
    name: "KR Puram",
    aliases: ["kr puram", "k r puram", "krishnarajapuram"],
  },
  {
    slug: "whitefield",
    name: "Whitefield",
    aliases: ["white field"],
  },
  {
    slug: "bellandur",
    name: "Bellandur",
    aliases: ["belandhur", "bellandhur"],
  },
  {
    slug: "sarjapura",
    name: "Sarjapura",
    aliases: ["sarjapur", "sarjapura road", "sarjapur road"],
  },
  {
    slug: "electronic-city",
    name: "Electronic City",
    aliases: ["electronic city"],
  },
  {
    slug: "jp-nagar",
    name: "JP Nagar",
    aliases: ["jp nagar", "j p nagar"],
  },
  {
    slug: "kanakapura-road",
    name: "Kanakapura Road",
    aliases: ["kanakapura", "kanakapura road"],
  },
  {
    slug: "raja-rajeswari-nagar",
    name: "Raja Rajeshwari Nagar",
    aliases: ["raja rajeswari nagar", "rr nagar"],
  },
  {
    slug: "kengeri",
    name: "Kengeri",
    aliases: [],
  },
  {
    slug: "nagarabhavi",
    name: "Nagarabhavi",
    aliases: [],
  },
  {
    slug: "thanisandra",
    name: "Thanisandra",
    aliases: [],
  },
  {
    slug: "marathahalli",
    name: "Marathahalli",
    aliases: ["marathalli", "marathahalli"],
    isGmbLocation: true,
  },
  {
    slug: "hsr-layout",
    name: "HSR Layout",
    aliases: ["hsr"],
    addedForCoverage: true,
  },
  {
    slug: "koramangala",
    name: "Koramangala",
    aliases: [],
    addedForCoverage: true,
  },
  {
    slug: "indiranagar",
    name: "Indiranagar",
    aliases: ["indira nagar"],
    addedForCoverage: true,
  },
  {
    slug: "hebbal",
    name: "Hebbal",
    aliases: [],
    addedForCoverage: true,
  },
  {
    slug: "jayanagar",
    name: "Jayanagar",
    aliases: [],
    addedForCoverage: true,
  },
] as const;

export type Service = (typeof services)[number];
export type Area = (typeof areas)[number];
export type ServiceSlug = Service["slug"];
export type AreaSlug = Area["slug"];
export type ServiceAreaKey = `${ServiceSlug}:${AreaSlug}`;

export type ManualServiceAreaContent = {
  status: "draft" | "ready";
  h1: string;
  intro: string;
  sections: {
    title: string;
    body: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
};

export const manualServiceAreaContent: Partial<
  Record<ServiceAreaKey, ManualServiceAreaContent>
> = {};

export const serviceAreaPages = services.flatMap((service) =>
  areas.map((area) => ({
    service,
    area,
    path: getServiceAreaPath(service.slug, area.slug),
    key: getServiceAreaKey(service.slug, area.slug),
  }))
);

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getArea(slug: string) {
  return areas.find((area) => area.slug === slug);
}

export function getServicePath(serviceSlug: ServiceSlug) {
  return `/bangalore/${serviceSlug}/`;
}

export function getServiceAreaPath(serviceSlug: ServiceSlug, areaSlug: AreaSlug) {
  return `/bangalore/${serviceSlug}/${areaSlug}/`;
}

export function getServiceAreaKey(
  serviceSlug: ServiceSlug,
  areaSlug: AreaSlug
): ServiceAreaKey {
  return `${serviceSlug}:${areaSlug}` as ServiceAreaKey;
}

export function getManualServiceAreaContent(
  serviceSlug: ServiceSlug,
  areaSlug: AreaSlug
) {
  return manualServiceAreaContent[getServiceAreaKey(serviceSlug, areaSlug)];
}

export function getReadyServiceAreaPages() {
  return serviceAreaPages.filter(({ service, area }) => {
    const content = getManualServiceAreaContent(service.slug, area.slug);
    return content?.status === "ready";
  });
}

export function isGmbArea(area: Area) {
  return "isGmbLocation" in area && area.isGmbLocation === true;
}

export function isAddedCoverageArea(area: Area) {
  return "addedForCoverage" in area && area.addedForCoverage === true;
}
