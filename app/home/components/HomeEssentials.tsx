import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MessageSquare, Ruler, Wrench } from "lucide-react";
import type { Area } from "../../bangalore/data/serviceAreaData";

const steps = [
  { title: "Tell us about your space", body: "Share a few photos and what you need. We’ll help you explore suitable options.", icon: MessageSquare },
  { title: "We measure and plan", body: "A site visit helps us check the opening, fixing points and materials, then give you a clear quote.", icon: Ruler },
  { title: "Fitted with care", body: "Our team installs, finishes and checks the fitting, with guidance on everyday care.", icon: Wrench },
];
export default function HomeEssentials({ areas }: { areas: readonly Area[] }) {
  return (
    <section className="border-y border-[var(--brand-border)] bg-[var(--brand-secondary)]/65 py-16 sm:py-20 lg:py-24">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-20">
          <div className="relative pb-6">
            <div className="relative aspect-[1.05/1] overflow-hidden rounded-xl rounded-tr-[90px]">
              <Image src="/home-generated/gallery/invisible-grill-detail.webp" alt="Illustrative close-up of slim stainless steel grill cables and a neat balcony fixing" fill sizes="(max-width: 1023px) 100vw, 45vw" className="object-cover" />
              <span className="absolute bottom-4 left-4 rounded bg-black/35 px-2 py-1 text-[9px] tracking-wider text-white">ILLUSTRATIVE DETAIL</span>
            </div>
            <div className="absolute -bottom-1 right-4 flex items-center gap-3 rounded-lg border border-[var(--brand-border)] bg-[var(--brand-background)] px-5 py-4 sm:right-7"><Check className="size-5 text-[var(--brand-primary)]" /><p className="text-sm font-medium">The little details make a difference.</p></div>
          </div>
          <div>
            <p className="eyebrow">Our approach</p>
            <h2 className="section-heading mt-4">Good protection starts<br />with a better fit.</h2>
            <p className="mt-5 text-sm leading-7 text-[var(--brand-muted)]">Every home is different. We take the time to understand yours, so the finished installation feels like it belongs.</p>
            <ol className="mt-7 space-y-6">
              {steps.map((step, index) => <li key={step.title} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[var(--brand-primary)]/20 text-xs font-semibold text-[var(--brand-primary)]">0{index + 1}</span>
                <div><h3 className="text-base font-semibold">{step.title}</h3><p className="mt-1 text-[13px] leading-6 text-[var(--brand-muted)]">{step.body}</p></div>
              </li>)}
            </ol>
            <Link href="/about/" className="mt-7 inline-flex min-h-11 items-center gap-3 text-sm font-semibold">A little more about us <ArrowRight className="size-4" /></Link>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-5 border-t border-[var(--brand-primary)]/15 pt-7 md:flex-row md:items-center">
          <p className="text-sm font-medium">Based in Marathahalli.<br /><span className="mt-1 inline-block font-normal text-[var(--brand-muted)]">Here for homes across Bangalore.</span></p>
          <div className="flex max-w-[680px] flex-wrap gap-x-5 gap-y-3 text-xs text-[var(--brand-muted)]">
            {areas.slice(0, 6).map(area => <span key={area.slug}>{area.name}</span>)}
            <Link href="/bangalore/" className="inline-flex items-center gap-1 font-semibold text-[var(--brand-primary)]">All areas <ArrowRight className="size-3" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
