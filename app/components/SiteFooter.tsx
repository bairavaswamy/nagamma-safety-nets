import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";
import { areas, getServicePath, services, siteConfig } from "../bangalore/data/serviceAreaData";
export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--brand-border)] bg-[var(--brand-secondary)]/65 pb-6 pt-12">
      <div className="site-container">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_.8fr_1fr]">
          <div><Link href="/" aria-label="Nagamma Safety Nets home"><Image src="/brand/logo.svg" alt="Nagamma Safety Nets" width={438} height={104} className="h-auto w-[230px]" /></Link>
            <p className="mt-5 max-w-[270px] text-[13px] leading-7 text-[var(--brand-muted)]">Thoughtful protection for the spaces you call home. Safety nets and home essentials, fitted with care.</p>
            <p className="mt-5 flex items-center gap-2 text-xs"><MapPin className="size-3.5" /> {siteConfig.branchAreaName}, Bangalore</p>
            <a href={siteConfig.phoneHref} className="mt-3 inline-flex min-h-8 items-center gap-2 text-sm font-semibold"><Phone className="size-3.5" />+91 {siteConfig.phoneDisplay}</a>
          </div>
          <div><h2 className="text-[11px] font-semibold uppercase tracking-[.14em]">Our services</h2><nav aria-label="Footer services" className="mt-5 grid gap-3">{services.map(service => <Link key={service.slug} href={getServicePath(service.slug)} className="text-[13px] text-[var(--brand-muted)] hover:text-[var(--brand-primary)]">{service.name}</Link>)}</nav></div>
          <div><h2 className="text-[11px] font-semibold uppercase tracking-[.14em]">Explore</h2><nav aria-label="Footer navigation" className="mt-5 grid gap-3">{[{href:"/about/",name:"Our approach"},{href:"/gallery/",name:"Service gallery"},{href:"/bangalore/",name:"Areas we serve"},{href:"/contact-us/",name:"Get in touch"},{href:"/#service-area-search",name:"Find your service"}].map(link => <Link key={link.href} href={link.href} className="text-[13px] text-[var(--brand-muted)] hover:text-[var(--brand-primary)]">{link.name}</Link>)}</nav></div>
          <div><h2 className="text-[11px] font-semibold uppercase tracking-[.14em]">Around Bangalore</h2><div className="mt-5 grid gap-3 text-[13px] text-[var(--brand-muted)]">{areas.slice(0,6).map(area => <span key={area.slug}>{area.name}</span>)}</div><Link href="/bangalore/" className="mt-4 inline-flex min-h-8 items-center gap-1 text-xs font-semibold">See all service areas <ArrowUpRight className="size-3.5" /></Link></div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-[var(--brand-border)] pt-5 text-[11px] text-[var(--brand-muted)] sm:flex-row"><p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p><p>Carefully measured. Thoughtfully installed.</p></div>
      </div>
    </footer>
  );
}
