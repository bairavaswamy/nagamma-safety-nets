import Link from "next/link";
import { BadgePercent, Phone } from "lucide-react";
import { siteConfig } from "../../bangalore/data/serviceAreaData";

const offerItems = [
  {
    label: "Nagamma Safety Nets Bangalore",
    icon: "badge",
  },
  {
    label: "Balcony, window, and duct fitting",
  },
  {
    label: "Invisible grills, sports nets, and cloth hangers",
  },
  {
    label: `Call ${siteConfig.phoneDisplay}`,
    href: siteConfig.phoneHref,
    icon: "phone",
  },
];

const OfferGroup = ({ hidden = false }: { hidden?: boolean }) => (
  <div
    className="flex shrink-0 items-center gap-5 px-5 text-sm font-semibold md:text-base"
    aria-hidden={hidden}
  >
    {offerItems.map((item) => (
      <span key={item.label} className="flex items-center gap-2 whitespace-nowrap">
        {item.icon === "badge" ? (
          <BadgePercent className="size-4 text-[#0369A1]" aria-hidden="true" />
        ) : null}
        {item.icon === "phone" ? (
          <Phone className="size-4 text-[#0369A1]" aria-hidden="true" />
        ) : null}
        {item.href ? (
          <Link href={item.href} className="transition hover:text-[#0369A1]">
            {item.label}
          </Link>
        ) : (
          item.label
        )}
      </span>
    ))}
  </div>
);

const OfferMarquee = () => {
  return (
    <section
      className="overflow-hidden border-y border-white/70 bg-white/55 py-3 text-[#172129] shadow-sm backdrop-blur-xl"
      aria-label="Nagamma Safety Nets Bangalore service highlights."
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
