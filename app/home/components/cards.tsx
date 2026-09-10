import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface SafetyCardProps { image: string; title: string; description: string; href: string; badge?: string; tags?: string[]; highlight?: boolean; }

export default function SafetyCard({ image, title, description, href, badge }: SafetyCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-[var(--brand-border)] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[var(--brand-card-shadow)]">
      <Link href={href} className="relative block aspect-[1.37/1] overflow-hidden" tabIndex={-1} aria-hidden="true">
        <Image src={image} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
        {badge && <span className="absolute left-3 top-3 rounded-sm bg-white/95 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[.09em] text-[var(--brand-primary)]">{badge}</span>}
      </Link>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
        <h3 className="text-[18px] font-semibold tracking-[-.02em]"><Link href={href} className="flex min-h-8 items-center justify-between gap-2">{title}<ArrowUpRight className="size-4 shrink-0 text-[var(--brand-primary)]" /></Link></h3>
        <p className="mt-2 flex-1 text-[13px] leading-[1.8] text-[var(--brand-muted)]">{description}</p>
      </div>
    </article>
  );
}
