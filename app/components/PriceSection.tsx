type Props = {
  serviceName: string;
  serviceSlug?: string;
  areaName: string;
};

type PriceContent = {
  note: string;
  cards: Array<{
    title: string;
    range: string;
    detail: string;
  }>;
};

const servicePriceContent: Record<string, PriceContent> = {
  "cloth-hangers": {
    note:
      "Final pricing depends on hanger type, rod length, pulley or retractable mechanism, material, ceiling or wall strength, and installation access. These ranges are useful for planning; a confirmed quote should come after measurement.",
    cards: [
      {
        title: "Fixed cloth hanger rods",
        range: "INR 1,500-4,500 per setup",
        detail:
          "Useful for simple balcony and utility drying areas where fixed rods can be placed without blocking movement.",
      },
      {
        title: "Pulley or retractable hangers",
        range: "INR 3,500-9,500 per setup",
        detail:
          "Used where rods need to move, lift, or stay hidden when not in use. Final cost depends on hardware and fitting.",
      },
    ],
  },
};

const defaultPriceContent: PriceContent = {
  note:
    "Final pricing depends on the measured area, material, floor height, fixing surface, and access. These ranges are useful for planning; a confirmed quote should come after measurement.",
  cards: [
    {
      title: "Safety nets",
      range: "INR 15-45 per sq ft",
      detail:
        "Common planning range for balcony, window, pigeon, duct, and standard home safety net work.",
    },
    {
      title: "Invisible grills",
      range: "INR 180-350 per sq ft",
      detail:
        "Used for premium balcony and window safety where view, cable spacing, and finish quality matter.",
    },
  ],
};

export default function PriceSection({ serviceName, serviceSlug, areaName }: Props) {
  const content = (serviceSlug && servicePriceContent[serviceSlug]) || defaultPriceContent;

  return (
    <section className="bg-white px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#111827] md:text-4xl">
          {serviceName} price in {areaName}
        </h2>
        <div className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-[#C2410C]" />

        <p className="mx-auto mt-6 max-w-2xl text-center leading-8 text-[#475569]">
          {content.note}
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {content.cards.map((card) => (
            <div key={card.title} className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#0F766E]">{card.title}</h3>
              <p className="mt-2 text-2xl font-extrabold text-[#111827]">{card.range}</p>
              <p className="mt-3 leading-7 text-[#475569]">{card.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
