import { BadgePercent } from "lucide-react";

const offerItems = [
  "Nagamma Safety Nets Bangalore",
  "20% off on safety nets",
  "15% off on invisible grills",
];

const OfferGroup = ({ hidden = false }: { hidden?: boolean }) => (
  <div
    className="flex shrink-0 items-center gap-5 px-5 text-sm font-semibold md:text-base"
    aria-hidden={hidden}
  >
    {offerItems.map((item, index) => (
      <span key={item} className="flex items-center gap-2 whitespace-nowrap">
        {index === 0 ? (
          <BadgePercent className="size-4 text-orange-200" aria-hidden="true" />
        ) : null}
        {item}
      </span>
    ))}
  </div>
);

const OfferMarquee = () => {
  return (
    <section
      className="overflow-hidden border-y border-teal-900/10 bg-[#0F766E] py-3 text-white"
      aria-label="Nagamma Safety Nets offer: 20 percent off safety nets and 15 percent off invisible grills."
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <OfferGroup />
        <OfferGroup hidden />
        <OfferGroup hidden />
        <OfferGroup hidden />
      </div>
    </section>
  );
};

export default OfferMarquee;
