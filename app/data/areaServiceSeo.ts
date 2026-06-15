type ServiceSeoProfile = {
  shortLabel: string;
  titleLabel: string;
  intent: string;
  detail: string;
  hooks: string[];
  offer?: string;
};

const serviceProfiles: Record<string, ServiceSeoProfile> = {
  "balcony-safety-nets": {
    shortLabel: "Balcony Nets",
    titleLabel: "Balcony Safety Nets",
    intent: "child and pet balcony safety",
    detail: "railing gaps, corners, and open sides",
    hooks: ["20% Off", "Clean Fitting", "Quick Quote"],
    offer: "20% off on safety nets",
  },
  "pigeon-safety-nets": {
    shortLabel: "Pigeon Nets",
    titleLabel: "Pigeon Safety Nets",
    intent: "clean balconies and pigeon control",
    detail: "bird entry gaps, nesting spots, and utility openings",
    hooks: ["20% Off", "Bird Control", "Quick Quote"],
    offer: "20% off on safety nets",
  },
  "anti-bird-nets": {
    shortLabel: "Anti Bird Nets",
    titleLabel: "Anti Bird Nets",
    intent: "balcony, duct, and open-side bird control",
    detail: "entry gaps, ledges, and service openings",
    hooks: ["20% Off", "Bird Control", "Clean Fitting"],
    offer: "20% off on safety nets",
  },
  "bird-spikes": {
    shortLabel: "Bird Spikes",
    titleLabel: "Bird Spikes",
    intent: "ledge and AC-unit pigeon control",
    detail: "parapets, pipes, signboards, and window ledges",
    hooks: ["Ledge Control", "Quick Quote", "Clean Setup"],
  },
  "invisible-nets": {
    shortLabel: "Invisible Nets",
    titleLabel: "Invisible Nets",
    intent: "clear-view balcony protection",
    detail: "view-facing balconies, windows, and pet-safe edges",
    hooks: ["20% Off", "Clear View", "Quick Quote"],
    offer: "20% off on safety nets",
  },
  "invisible-safety-nets": {
    shortLabel: "Invisible Safety Nets",
    titleLabel: "Invisible Safety Nets",
    intent: "clear-view balcony safety",
    detail: "view-facing balconies, windows, and pet-safe edges",
    hooks: ["20% Off", "Clear View", "Quick Quote"],
    offer: "20% off on safety nets",
  },
  "invisible-grills": {
    shortLabel: "Invisible Grills",
    titleLabel: "Invisible Grills",
    intent: "premium balcony and window safety",
    detail: "cable spacing, frame strength, and view-facing openings",
    hooks: ["15% Off", "Premium Safety", "Clean Finish"],
    offer: "15% off on invisible grills",
  },
  "open-area-safety-nets": {
    shortLabel: "Open Area Nets",
    titleLabel: "Open Area Safety Nets",
    intent: "terrace, shaft, and courtyard protection",
    detail: "large openings, access points, and support edges",
    hooks: ["20% Off", "Measured Cover", "Quick Quote"],
    offer: "20% off on safety nets",
  },
  "duct-area-safety-nets": {
    shortLabel: "Duct Area Nets",
    titleLabel: "Duct Area Safety Nets",
    intent: "open shaft and utility duct protection",
    detail: "vertical shafts, pipe gaps, and maintenance access",
    hooks: ["20% Off", "Shaft Safety", "Clean Fitting"],
    offer: "20% off on safety nets",
  },
  "sports-nets": {
    shortLabel: "Sports Nets",
    titleLabel: "Sports Safety Nets",
    intent: "cricket, turf, and play-area ball control",
    detail: "practice areas, boundary sides, and ball-stop height",
    hooks: ["20% Off", "Turf Netting", "Quick Quote"],
    offer: "20% off on safety nets",
  },
  "monkey-safety-nets": {
    shortLabel: "Monkey Nets",
    titleLabel: "Monkey Safety Nets",
    intent: "balcony and terrace monkey entry control",
    detail: "balcony edges, terrace openings, and window gaps",
    hooks: ["20% Off", "Entry Control", "Strong Fitting"],
    offer: "20% off on safety nets",
  },
  "window-safety-nets": {
    shortLabel: "Window Nets",
    titleLabel: "Window Safety Nets",
    intent: "child, pet, and pigeon window safety",
    detail: "bedroom, kitchen, and utility window gaps",
    hooks: ["20% Off", "Window Safety", "Quick Quote"],
    offer: "20% off on safety nets",
  },
  "staircase-safety-nets": {
    shortLabel: "Staircase Nets",
    titleLabel: "Staircase Safety Nets",
    intent: "duplex and open-stair fall protection",
    detail: "stair voids, rail gaps, and child-safe edges",
    hooks: ["20% Off", "Fall Protection", "Clean Fitting"],
    offer: "20% off on safety nets",
  },
  "building-covering-nets": {
    shortLabel: "Building Covering Nets",
    titleLabel: "Building Covering Nets",
    intent: "facade repair and repainting coverage",
    detail: "frontage, work height, access, and anchor points",
    hooks: ["20% Off", "Facade Cover", "Site Quote"],
    offer: "20% off on safety nets",
  },
  "building-covering-safety-nets": {
    shortLabel: "Building Safety Nets",
    titleLabel: "Building Covering Safety Nets",
    intent: "facade repair and exterior work safety",
    detail: "frontage, work height, access, and anchor points",
    hooks: ["20% Off", "Facade Safety", "Site Quote"],
    offer: "20% off on safety nets",
  },
  "cloth-hangers": {
    shortLabel: "Cloth Hangers",
    titleLabel: "Cloth Hangers",
    intent: "balcony and utility drying space",
    detail: "ceiling support, appliance clearance, and daily reach",
    hooks: ["Utility Upgrade", "Clean Setup", "Quick Quote"],
  },
};

const titleAreaAliases: Record<string, string> = {
  "electronic-city-phase-1": "E City Phase 1",
  "electronic-city-phase-2": "E City Phase 2",
  "rajarajeshwari-nagar": "RR Nagar",
};

const hashText = (value: string) =>
  value.split("").reduce((total, char) => total + char.charCodeAt(0), 0);

const titleCaseFromSlug = (slug: string) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const trimSentence = (value: string, maxLength: number) => {
  if (value.length <= maxLength) return value;

  const shortened = value.slice(0, maxLength - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > 80 ? lastSpace : maxLength - 1).trimEnd()}.`;
};

const chooseDescription = ({
  areaName,
  profile,
}: {
  areaName: string;
  profile: ServiceSeoProfile;
}) => {
  const offer = profile.offer ? `${profile.offer}.` : "";
  const candidates = [
    `${profile.titleLabel} in ${areaName} for ${profile.intent}. Site check, clean fitting, clear quote. ${offer} Call +91 79957 92953.`,
    `${profile.titleLabel} in ${areaName} for ${profile.intent}. Site check, clean fitting, clear quote. ${offer}`,
    `${profile.titleLabel} in ${areaName} for ${profile.intent}. We check ${profile.detail} and give a clear quote.`,
    `${profile.shortLabel} in ${areaName}: ${profile.intent}. Measured fitting and clear quote by Servani.`,
  ].map((value) => value.replace(/\s+/g, " ").trim());

  return candidates.find((value) => value.length <= 158) || trimSentence(candidates.at(-1) || "", 158);
};

export const formatAreaName = (areaSlug: string, areaNamesBySlug: Map<string, string>) =>
  areaNamesBySlug.get(areaSlug) || titleCaseFromSlug(areaSlug);

export const buildAreaServiceMetadata = ({
  areaName,
  areaSlug,
  serviceSlug,
  serviceTitle,
}: {
  areaName: string;
  areaSlug: string;
  serviceSlug: string;
  serviceTitle: string;
}) => {
  const profile =
    serviceProfiles[serviceSlug] || {
      shortLabel: serviceTitle,
      titleLabel: serviceTitle,
      intent: "measured safety installation",
      detail: "site access, material, and fixing surface",
      hooks: ["Quick Quote", "Clean Fitting", "Measured Install"],
    };

  const seed = hashText(`${areaSlug}-${serviceSlug}`);
  const hook = profile.hooks[seed % profile.hooks.length];
  const titleArea = titleAreaAliases[areaSlug] || areaName;

  const titleOptions = [
    `${profile.titleLabel} ${titleArea} | ${hook}`,
    `${titleArea} ${profile.titleLabel} | ${hook}`,
    `${profile.shortLabel} ${titleArea} | ${hook}`,
    `${titleArea} ${profile.shortLabel} | ${hook}`,
  ];

  const title =
    titleOptions.find((option) => option.length <= 58) ||
    `${profile.shortLabel} ${titleArea}`;

  const description = chooseDescription({ areaName, profile });

  return {
    title,
    description,
    ogTitle: `${profile.titleLabel} in ${areaName}`,
    imageAlt: `${profile.titleLabel} installation in ${areaName}, Bangalore`,
    keywords: [
      `${profile.titleLabel} in ${areaName}`,
      `${profile.shortLabel} ${areaName}`,
      `${profile.titleLabel} Bangalore`,
      `${profile.intent} ${areaName}`,
      `${profile.shortLabel} price ${areaName}`,
      "Servani Safety Nets",
    ],
  };
};
