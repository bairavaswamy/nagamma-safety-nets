import type { ServiceSlug } from "./serviceAreaData";

export type ServiceLandingContent = {
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    bullets: string[];
    image: {
      src: string;
      alt: string;
    };
  };
  quickFacts: {
    label: string;
    value: string;
    body: string;
  }[];
  localPoints: {
    title: string;
    body: string;
  }[];
  imageStrip: {
    src: string;
    alt: string;
    caption: string;
  }[];
  materialRows: {
    part: string;
    whatToAsk: string;
    goodChoice: string;
    whyItMatters: string;
  }[];
  comparisonRows: {
    option: string;
    bestFor: string;
    strength: string;
    limitation: string;
    chooseWhen: string;
  }[];
  priceRows: {
    scope: string;
    planningRange: string;
    normallyIncludes: string;
    affectsPrice: string;
  }[];
  processSteps: {
    title: string;
    body: string;
  }[];
  buyerChecklist: string[];
  careTips: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export const serviceLandingContent: Partial<
  Record<ServiceSlug, ServiceLandingContent>
> = {
  "pigeon-safety-nets": {
    metadata: {
      title: "Pigeon Safety Nets in Bangalore",
      description:
        "Compare pigeon safety nets in Bangalore with material notes, fitting process, local price ranges, buyer checklist, FAQs, and area coverage.",
      keywords: [
        "pigeon safety nets in Bangalore",
        "balcony pigeon net Bangalore",
        "pigeon net installation Bangalore",
        "anti bird netting Bangalore",
        "bird safety nets Bangalore",
        "pigeon net for balcony",
      ],
    },
    hero: {
      eyebrow: "Bangalore balcony bird control",
      title: "Pigeon Safety Nets in Bangalore for Cleaner Balconies",
      intro:
        "Pigeons usually start with one corner, one AC ledge, or one utility gap. A good pigeon safety net should close those entry points neatly without making the balcony dark, blocking airflow, or leaving weak edges where birds can push through again.",
      bullets: [
        "Measured for balconies, windows, ducts, AC ledges, and utility areas",
        "Planned around railings, ceiling hooks, pipes, grills, and apartment rules",
        "Clear guidance on material, fitting method, maintenance, and price range",
      ],
      image: {
        src: "/home-optimized/cards/pigeon-safety-nets-in-bangalore.webp",
        alt: "Pigeon safety net installed on a Bangalore apartment balcony",
      },
    },
    quickFacts: [
      {
        label: "Most requested for",
        value: "Balcony and utility gaps",
        body: "The usual problem is repeated bird entry, droppings on floors, nesting near AC lines, and cleaning trouble in corners.",
      },
      {
        label: "Preferred material",
        value: "UV-stabilized HDPE or nylon",
        body: "A weather-ready net with a tidy edge finish works better than a loose mesh tied only at a few points.",
      },
      {
        label: "Local base",
        value: "Marathahalli side",
        body: "The primary service base is Marathahalli, with service planned across Bangalore apartments and nearby residential areas.",
      },
    ],
    localPoints: [
      {
        title: "High-rise balconies need edge-to-edge fixing",
        body: "In many Bangalore apartments, the open space is not a simple rectangle. Railings, ceiling beams, AC pipes, and side gaps all need to be checked so the net does not sag or leave a corner open.",
      },
      {
        title: "Utility areas need airflow, not a closed wall",
        body: "A utility balcony or dry area should still breathe after installation. The net has to stop pigeon entry while keeping enough light and ventilation for clothes, plants, and daily use.",
      },
      {
        title: "Marathahalli and ORR homes often have duct-side issues",
        body: "Apartments near Marathahalli, Bellandur, Whitefield, KR Puram, and the Outer Ring Road side often have service shafts, AC ledges, and pipe corners where birds settle first.",
      },
      {
        title: "Rental flats and society rules matter",
        body: "Before drilling, it is better to understand whether the building allows anchors, clamp fittings, or removable hooks. A cleaner plan avoids patchwork later.",
      },
    ],
    imageStrip: [
      {
        src: "/home-optimized/gallery/gallery_2.webp",
        alt: "Balcony pigeon net work with open airflow",
        caption: "Balcony coverage",
      },
      {
        src: "/home-optimized/gallery/gallery_6.webp",
        alt: "Bird control netting around apartment opening",
        caption: "Bird entry control",
      },
      {
        src: "/home-optimized/gallery/gallery_7.webp",
        alt: "Safety net fitted around an open apartment area",
        caption: "Open area fitting",
      },
    ],
    materialRows: [
      {
        part: "Net mesh",
        whatToAsk: "Is the mesh UV-stabilized and suitable for outdoor balcony use?",
        goodChoice: "HDPE or nylon pigeon net with small, even mesh",
        whyItMatters:
          "A stronger outdoor net handles sun, rain, and daily wind better than a weak indoor mesh.",
      },
      {
        part: "Mesh size",
        whatToAsk: "Will the opening size stop pigeons from entering through corners?",
        goodChoice: "Small pigeon-control mesh planned for the exact opening",
        whyItMatters:
          "Large gaps can still allow bird entry near railing bends, pipe spaces, or AC brackets.",
      },
      {
        part: "Border rope or cable",
        whatToAsk: "How will the edge be tightened and finished?",
        goodChoice: "Neat rope line or support wire along the boundary",
        whyItMatters:
          "Most failures start at loose borders, not in the middle of the net.",
      },
      {
        part: "Hooks and anchors",
        whatToAsk: "Will the fixing suit the wall, ceiling, railing, and society rules?",
        goodChoice: "Rust-resistant hooks, anchors, or clamps chosen after inspection",
        whyItMatters:
          "The same hook style is not right for every balcony surface or rental home.",
      },
      {
        part: "Colour and visibility",
        whatToAsk: "Will the net look neat from inside and outside?",
        goodChoice: "Transparent, white, or black net based on the balcony finish",
        whyItMatters:
          "The right colour keeps the balcony usable and avoids a heavy, closed-in look.",
      },
    ],
    comparisonRows: [
      {
        option: "Pigeon safety net",
        bestFor: "Bird entry through balcony, window, duct, or utility openings",
        strength: "Directly blocks pigeons while keeping air and light",
        limitation: "Not a replacement for a child or fall-safety barrier",
        chooseWhen:
          "The main issue is droppings, nesting, feathers, smell, and repeated cleaning.",
      },
      {
        option: "Balcony safety net",
        bestFor: "Open balcony edges where safety is the bigger concern",
        strength: "Designed as a broader protective barrier for daily home use",
        limitation: "May be more visible depending on thickness and opening size",
        chooseWhen:
          "Children, pets, or an open railing gap are the first priority.",
      },
      {
        option: "Invisible grill",
        bestFor: "Homes that want an open view with stronger edge protection",
        strength: "Clean look, stainless-steel cable system, good for view-facing balconies",
        limitation: "Small birds can still enter if the gap plan is not bird-focused",
        chooseWhen:
          "You want a premium safety finish and may add bird netting only where needed.",
      },
      {
        option: "Bird spikes",
        bestFor: "Narrow ledges, AC outdoor unit edges, and parapet resting points",
        strength: "Discourages birds from sitting on a specific ledge",
        limitation: "Does not close an open balcony or duct",
        chooseWhen:
          "Birds sit on a ledge but do not enter a large open space.",
      },
      {
        option: "DIY mesh",
        bestFor: "Very temporary coverage on a small reachable window",
        strength: "Low upfront cost",
        limitation: "Loose edges, weak ties, and poor weather life are common",
        chooseWhen:
          "The space is small, low-risk, and easy to refit without working at height.",
      },
    ],
    priceRows: [
      {
        scope: "Standard balcony pigeon net",
        planningRange: "Rs. 15 to Rs. 30 per sq ft",
        normallyIncludes: "Net, edge tying, basic hooks, and fitting for accessible openings",
        affectsPrice:
          "Balcony height, number of sides, railing shape, and how many corners need closing",
      },
      {
        scope: "Window, duct, or utility opening",
        planningRange: "Rs. 20 to Rs. 35 per sq ft",
        normallyIncludes: "Measurement, small mesh net, anchor points, and edge finish",
        affectsPrice:
          "Tight working space, pipe obstructions, shaft access, and minimum visit effort",
      },
      {
        scope: "Premium or thicker net finish",
        planningRange: "Rs. 30 to Rs. 45 per sq ft",
        normallyIncludes: "Higher-grade net, cleaner border work, and stronger fastening plan",
        affectsPrice:
          "Material grade, colour choice, exposure to sun and rain, and finishing expectation",
      },
      {
        scope: "Bird spikes as an add-on",
        planningRange: "Rs. 80 to Rs. 180 per running ft",
        normallyIncludes: "Spike strip, adhesive or screw fixing, and ledge alignment",
        affectsPrice:
          "Ledge length, surface condition, access height, and whether cleaning is needed first",
      },
      {
        scope: "Small job or difficult access",
        planningRange: "Final quote after measurement",
        normallyIncludes: "Site check, access planning, and a minimum work charge if applicable",
        affectsPrice:
          "Very small openings, exterior access, double-height spaces, and ladder or rope access needs",
      },
    ],
    processSteps: [
      {
        title: "1. Understand the bird entry pattern",
        body: "The first check is where pigeons are landing, entering, or nesting. A balcony may need one full-face net, while a duct or AC corner may need a smaller focused closure.",
      },
      {
        title: "2. Measure the real opening",
        body: "The measurement should include side gaps, top beam depth, railing curve, pipe clearance, and the points where the net can be tightened without damaging the finish.",
      },
      {
        title: "3. Choose material and fixing style",
        body: "Material is selected based on visibility, outdoor exposure, wind, and building rules. The fixing style is planned before drilling or tying starts.",
      },
      {
        title: "4. Install with tight edges",
        body: "The net is fixed from edge to edge and checked at corners. A neat border matters because birds look for the smallest open route back into the same spot.",
      },
      {
        title: "5. Clean check and after-care notes",
        body: "After fitting, the opening is checked from inside and outside. The customer should know how to clean the net gently and when to call for a tightening check.",
      },
    ],
    buyerChecklist: [
      "Ask whether the quoted rate includes hooks, edge rope, installation, and visit charges.",
      "Share clear balcony photos before the visit, especially corners, ceiling points, and AC pipes.",
      "Check if the installer will close side gaps instead of covering only the front face.",
      "Confirm whether drilling is allowed by your apartment association or owner.",
      "Avoid very loose netting because it looks untidy and gives birds a place to push through.",
      "Do not choose only by the lowest rate if the balcony is high, windy, or hard to access.",
      "Ask how long the work normally takes and whether cleaning is needed before installation.",
      "Keep future access in mind for AC service, painting, and balcony maintenance.",
    ],
    careTips: [
      "Clean droppings before installation so smell and stains do not remain trapped behind the net.",
      "Use water and mild cleaning only; harsh pulling can loosen hooks or border rope.",
      "Check corners after heavy wind or painting work because edges are disturbed first.",
      "Do not hang heavy items from pigeon netting; it is for bird entry control, not load bearing.",
    ],
    faqs: [
      {
        question: "What is the best net for pigeons in a Bangalore balcony?",
        answer:
          "For most apartment balconies, a UV-stabilized HDPE or nylon pigeon net with small mesh and tight border fixing is the practical choice. The final material should be selected after checking sunlight, wind, balcony size, and visibility preference.",
      },
      {
        question: "How much does pigeon safety net installation cost in Bangalore?",
        answer:
          "A common planning range is Rs. 15 to Rs. 30 per sq ft for standard balcony work, with higher ranges for ducts, premium material, difficult access, or extra finishing. The final quote should always come after measurement.",
      },
      {
        question: "Will pigeon nets block light or airflow?",
        answer:
          "A properly selected pigeon net should not close the balcony like a sheet. It is meant to stop bird entry while allowing light and airflow to continue through the mesh.",
      },
      {
        question: "Can pigeon safety nets be installed without drilling?",
        answer:
          "Sometimes, yes. Certain railings and temporary rental spaces can use clamps or existing points, but many balconies still need hooks or anchors for a tight long-term fit. The wall and ceiling condition decide the method.",
      },
      {
        question: "Are pigeon safety nets safe for children and pets?",
        answer:
          "Pigeon nets help with bird entry, but they should not be treated as a child safety or pet fall-protection system. If safety is the priority, ask for balcony safety nets or invisible grills planned for that purpose.",
      },
      {
        question: "How long does installation usually take?",
        answer:
          "Many standard balconies can be completed in a short visit after measurement. Larger balconies, duct-side work, exterior access, or multiple openings can take longer.",
      },
      {
        question: "Which areas in Bangalore do you cover for pigeon net work?",
        answer:
          "Nagamma Safety Nets serves Bangalore with Marathahalli as the primary local base and covers areas such as Whitefield, Bellandur, KR Puram, HSR Layout, Sarjapura, Electronic City, JP Nagar, Yelahanka, Thanisandra, Kengeri, and nearby locations.",
      },
      {
        question: "Can the net be removed later for painting or repair work?",
        answer:
          "In most cases the net can be removed or refitted, but the ease depends on the fixing method. If painting, AC work, or grill work is expected soon, mention it before installation.",
      },
    ],
  },
};

export function getServiceLandingContent(serviceSlug: ServiceSlug) {
  return serviceLandingContent[serviceSlug];
}
