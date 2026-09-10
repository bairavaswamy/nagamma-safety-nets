import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { siteConfig } from "../bangalore/data/serviceAreaData";
export default function ContactCta() {
  return (
    <section className="py-14 sm:py-20">
      <div className="site-container">
        <div className="relative overflow-hidden rounded-2xl bg-[var(--brand-primary)] px-6 py-10 text-white sm:px-12 sm:py-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-28 size-96 rounded-full border border-white/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-2 -top-16 size-72 rounded-full border border-white/10" />
          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#D8BE97]">Let’s make your space feel safer</p><h2 className="mt-4 text-[32px] font-medium leading-tight tracking-tight sm:text-[42px]">A little care.<br /><span className="editorial-serif">A lot of peace of mind.</span></h2><p className="mt-4 max-w-md text-sm leading-7 text-white/75">Tell us what you have in mind. We’ll help you find the right solution, starting with a free site visit.</p></div>
            <div className="flex flex-col items-start gap-4 lg:min-w-[245px]">
              <Link href="/contact-us/" className="inline-flex min-h-12 items-center gap-6 rounded-md bg-[var(--brand-background)] px-6 py-3 text-sm font-semibold text-[var(--brand-primary)] transition hover:bg-white" data-contact-location="footer-cta">Arrange a free site visit <ArrowUpRight className="size-4" /></Link>
              <a href={siteConfig.phoneHref} className="inline-flex min-h-11 items-center gap-3 text-sm text-white/90"><Phone className="size-4" /> Or call +91 {siteConfig.phoneDisplay}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
