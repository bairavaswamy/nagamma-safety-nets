import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, MapPin, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="overflow-hidden">
      <div className="site-container grid gap-10 pb-12 pt-9 md:pb-16 md:pt-12 lg:grid-cols-[1fr_1.04fr] lg:items-center lg:gap-12">
        <div className="pb-2 lg:py-6">
          <p className="eyebrow"><MapPin className="size-3.5" /> Locally based. Bangalore wide.</p>
          <h1 className="mt-6 text-[clamp(36px,11.8vw,46px)] font-semibold leading-[1.08] tracking-[-0.055em] text-[var(--brand-primary)] sm:text-[60px] lg:text-[66px] xl:text-[72px]">
            A safer home.<br />
            An open view.<br />
            <span className="editorial-serif tracking-[-0.045em]">Peace of mind.</span>
          </h1>
          <p className="mt-6 max-w-[435px] text-[15px] leading-[1.85] text-[var(--brand-muted)] sm:text-base">
            Thoughtfully fitted safety nets, invisible grills and home essentials. Nagamma Safety Nets helps protect the spaces you love, across Bangalore.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact-us/" className="btn-primary" data-contact-location="hero">Book a free site visit <ArrowRight className="size-4" /></Link>
            <Link href="#core-services" className="btn-secondary">Explore services <ArrowDown className="size-4" /></Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-[11px] font-medium text-[var(--brand-muted)] sm:text-xs">
            {["Made to measure", "Neatly installed", "Local expertise"].map(item => (
              <span key={item} className="inline-flex items-center gap-1.5"><Check className="size-3.5 text-[var(--brand-primary)]" />{item}</span>
            ))}
          </div>
        </div>
        <div className="relative pb-6 pl-3 sm:pl-5 lg:pl-0">
          <div className="absolute -right-8 top-8 h-[82%] w-[90%] rounded-tl-[130px] rounded-br-[70px] border border-[var(--brand-accent)]/35" aria-hidden="true" />
          <div className="relative aspect-[1.12/1] overflow-hidden rounded-tl-[110px] rounded-tr-xl rounded-br-[64px] rounded-bl-xl lg:aspect-[.99/1]">
            <Image src="/images/balcony-premium.webp" alt="Illustrative apartment balcony with neatly fitted safety netting, an open city view and greenery" fill loading="eager" fetchPriority="high" sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover object-[43%_center]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <span className="absolute bottom-5 right-6 text-[9px] tracking-[.1em] text-white/90">ILLUSTRATIVE SERVICE IMAGE</span>
          </div>
          <div className="absolute -left-1 bottom-0 flex max-w-[275px] items-center gap-3 rounded-lg border border-[var(--brand-border)] bg-white p-4 shadow-[0_12px_36px_rgba(23,77,139,.09)] sm:-left-3 sm:p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--brand-secondary)]"><ShieldCheck className="size-6 text-[var(--brand-primary)]" strokeWidth={1.5} /></span>
            <div><p className="text-sm font-semibold">Protection that fits in.</p><p className="mt-1 text-[11px] text-[var(--brand-muted)]">Carefully measured. Beautifully finished.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
