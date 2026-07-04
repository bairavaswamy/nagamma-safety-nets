"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Camera,
  Home,
  Info,
  Layers3,
  MapPinned,
  Menu,
  MessageSquareText,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { getServicePath, services, siteConfig } from "../bangalore/data/serviceAreaData";

const mainLinks = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/bangalore/",
    label: "Bangalore",
    icon: MapPinned,
  },
  {
    href: "/about/",
    label: "About",
    icon: Info,
  },
  {
    href: "/gallery/",
    label: "Gallery",
    icon: Camera,
  },
  {
    href: "/contact-us/",
    label: "Contact",
    icon: MessageSquareText,
  },
  {
    href: "/#service-area-search",
    label: "Search",
    icon: Search,
  },
];

const isActivePath = (pathname: string, href: string) => {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href.replace(/\/$/, ""));
};

export default function FloatingNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const scrollY = window.scrollY;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-3 sm:px-4">
      {isOpen ? (
        <button
          type="button"
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-0 cursor-default touch-none bg-[#082F2A]/35 backdrop-blur-[1px] xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      ) : null}

      <nav
        aria-label="Primary navigation"
        className="border border-white/70 bg-white/75 shadow-2xl shadow-[#075E54]/15 backdrop-blur-xl relative z-10 mx-auto max-w-7xl overflow-hidden rounded-lg px-3 py-2 text-[#082F2A] md:px-4"
      >
        <div className="flex min-h-[56px] items-center justify-between gap-3">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-white/55"
            onClick={() => setIsOpen(false)}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#075E54] to-[#04483F] text-white shadow-[0_10px_26px_rgba(7,94,84,0.28)]">
              <ShieldCheck className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-extrabold leading-5 md:text-base">
                {siteConfig.name}
              </span>
              <span className="block text-xs font-medium text-[#70847D]">
                {siteConfig.branchAreaName}, {siteConfig.city}
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 xl:flex">
            {mainLinks.map((link) => {
              const Icon = link.icon;
              const active = isActivePath(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold transition ${
                    active
                      ? "bg-[#DDF4EC] text-[#075E54]"
                      : "text-[#263B35] hover:bg-white/55 hover:text-[#075E54]"
                  }`}
                >
                  <Icon className="size-4" />
                  {link.label}
                </Link>
              );
            })}

            <div className="group relative">
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-[#263B35] transition hover:bg-white/55 hover:text-[#075E54]"
              >
                <Layers3 className="size-4" />
                Services
                <ChevronDown className="size-4 transition group-hover:rotate-180" />
              </button>

              <div className="invisible absolute right-0 top-full w-[320px] pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
                <div className="border border-white/70 bg-white/75 shadow-2xl shadow-[#075E54]/15 backdrop-blur-xl rounded-lg p-2">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={getServicePath(service.slug)}
                      className="block rounded-lg px-3 py-3 transition hover:bg-white/55"
                    >
                      <span className="block text-sm font-semibold text-[#082F2A]">
                        {service.name}
                      </span>
                      <span className="mt-1 line-clamp-1 block text-xs text-[#70847D]">
                        {service.shortDescription}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/70 bg-white/45 text-[#263B35] transition hover:bg-white/70 hover:text-[#075E54] xl:hidden"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {isOpen ? (
          <div className="max-h-[calc(100vh-7rem)] touch-pan-y overflow-y-auto overscroll-contain border-t border-white/50 py-3 xl:hidden">
            <div className="grid gap-2">
              {mainLinks.map((link) => {
                const Icon = link.icon;
                const active = isActivePath(pathname, link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-sm font-semibold ${
                      active
                        ? "bg-[#DDF4EC] text-[#075E54]"
                        : "text-[#263B35] hover:bg-white/55"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="size-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-3 border-t border-white/50 pt-3">
              <p className="px-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#70847D]">
                Services
              </p>
              <div className="mt-2 grid gap-2">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={getServicePath(service.slug)}
                    className="rounded-lg px-3 py-3 text-sm font-semibold text-[#263B35] transition hover:bg-white/55 hover:text-[#075E54]"
                    onClick={() => setIsOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
