"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, MapPin, Menu, Phone, X } from "lucide-react";
import { getServicePath, services, siteConfig } from "../bangalore/data/serviceAreaData";

const links = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About us" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/bangalore/", label: "Areas we serve" },
];
export default function FloatingNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const servicesToggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && (open || servicesOpen)) {
        if (open) toggleRef.current?.focus();
        else servicesToggleRef.current?.focus();
        setOpen(false);
        setServicesOpen(false);
      }
    };
    const outside = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); };
  }, [open, servicesOpen]);
  const closeMenus = () => { setOpen(false); setServicesOpen(false); };
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));
  return (
    <>
      <div className="bg-[var(--brand-primary)] text-white/85">
        <div className="site-container flex min-h-8 items-center justify-between gap-3 py-1.5 text-[10px] sm:text-[11px]">
          <span className="inline-flex items-center gap-2"><MapPin className="size-3" /> Home safety, thoughtfully installed.</span>
          <a href={siteConfig.phoneHref} className="inline-flex items-center gap-2 whitespace-nowrap font-medium"><Phone className="size-3" /><span className="hidden sm:inline">Let’s talk</span> +91 {siteConfig.phoneDisplay}</a>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-[var(--brand-border)] bg-[var(--brand-background)]/95 backdrop-blur-lg">
        <nav aria-label="Primary navigation" className="site-container">
          <div className="flex h-[82px] items-center justify-between gap-4">
            <Link href="/" aria-label="Nagamma Safety Nets home" onClick={closeMenus} className="shrink-0">
              <Image src="/brand/logo.svg" alt="Nagamma Safety Nets" width={438} height={104} priority className="h-auto w-[200px] sm:w-[230px]" />
            </Link>
            <div className="hidden items-center gap-7 lg:flex">
              {links.slice(0,1).map(link => <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? "page" : undefined} className={`text-[13px] transition hover:text-[var(--brand-primary)] ${isActive(link.href) ? "font-semibold text-[var(--brand-primary)]" : "text-[var(--brand-muted)]"}`}>{link.label}</Link>)}
              <div ref={menuRef} className="relative">
                <button ref={servicesToggleRef} type="button" aria-expanded={servicesOpen} aria-controls="desktop-services" className="flex min-h-11 items-center gap-1.5 text-[13px] text-[var(--brand-muted)] hover:text-[var(--brand-primary)]" onClick={() => setServicesOpen(value => !value)}>Services <ChevronDown className={`size-3.5 transition ${servicesOpen ? "rotate-180" : ""}`} /></button>
                {servicesOpen && <div id="desktop-services" className="absolute left-0 top-full w-72 rounded-lg border border-[var(--brand-border)] bg-white p-2 shadow-sm">{services.map(service => <Link key={service.slug} href={getServicePath(service.slug)} onClick={closeMenus} className="block rounded-md px-4 py-3 text-sm hover:bg-[var(--brand-secondary)]">{service.name}</Link>)}</div>}
              </div>
              {links.slice(1).map(link => <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? "page" : undefined} className={`text-[13px] transition hover:text-[var(--brand-primary)] ${isActive(link.href) ? "font-semibold text-[var(--brand-primary)]" : "text-[var(--brand-muted)]"}`}>{link.label}</Link>)}
            </div>
            <Link href="/contact-us/" className="btn-primary hidden sm:inline-flex" data-contact-location="navigation">Get a free quote <ArrowUpRight className="size-4" /></Link>
            <button ref={toggleRef} type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)} className="flex size-11 shrink-0 items-center justify-center rounded-md border border-[var(--brand-border)] lg:hidden">{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
          </div>
          {open && <div id="mobile-navigation" className="max-h-[calc(100dvh-120px)] overflow-y-auto border-t border-[var(--brand-border)] pb-5 lg:hidden">
            <div className="grid gap-1 py-3">{links.map(link => <Link key={link.href} href={link.href} onClick={closeMenus} aria-current={isActive(link.href) ? "page" : undefined} className="rounded-md px-3 py-3 text-sm hover:bg-[var(--brand-secondary)]">{link.label}</Link>)}</div>
            <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--brand-muted)]">Our services</p>
            <div className="grid sm:grid-cols-2">{services.map(service => <Link key={service.slug} href={getServicePath(service.slug)} onClick={closeMenus} className="rounded-md px-3 py-3 text-sm hover:bg-[var(--brand-secondary)]">{service.name}</Link>)}</div>
            <Link href="/contact-us/" className="btn-primary mt-4 w-full" onClick={closeMenus}>Get a free quote <ArrowUpRight className="size-4" /></Link>
          </div>}
        </nav>
      </header>
    </>
  );
}
