import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import SafetyCard, { type SafetyCardProps } from "./cards";
import { siteConfig } from "../../bangalore/data/serviceAreaData";

export default function SafetySolutions({ cards }: { cards: SafetyCardProps[] }) {
  return (
    <section id="core-services" className="py-16 sm:py-20 lg:py-24">
      <div className="site-container">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:mb-11 md:flex-row md:items-end">
          <div><p className="eyebrow">Thoughtful solutions</p><h2 className="section-heading mt-4">Every space deserves<br />a little more care.</h2></div>
          <p className="max-w-[340px] text-sm leading-7 text-[var(--brand-muted)]">From an open balcony to a busy utility area, find the right fit for your home and the way you live.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(card => <SafetyCard key={card.title} {...card} />)}
          <article className="flex min-h-[320px] flex-col justify-between rounded-xl bg-[var(--brand-primary)] p-7 text-white">
            <span className="flex size-11 items-center justify-center rounded-full border border-white/25"><Phone className="size-5" strokeWidth={1.5} /></span>
            <div><h3 className="text-[25px] font-medium leading-tight tracking-tight">Not sure what<br />your space needs?</h3><p className="mt-3 text-sm leading-6 text-white/70">Let’s take a look together. Start with a free site visit.</p></div>
            <Link href={siteConfig.contactPath} className="mt-6 flex min-h-11 items-center justify-between border-t border-white/25 pt-4 text-sm font-semibold">Talk to our team <ArrowUpRight className="size-5" /></Link>
          </article>
        </div>
      </div>
    </section>
  );
}
