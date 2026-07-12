"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!isServicesOpen) {
      return;
    }

    const closeOnPointerDown = (event: PointerEvent) => {
      if (
        servicesMenuRef.current &&
        !servicesMenuRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnPointerDown);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnPointerDown);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isServicesOpen]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-3 sm:px-4">
      {isOpen ? (
        <button
          type="button"
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-0 cursor-default touch-none bg-[#172129]/35 backdrop-blur-[2px] xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      ) : null}

      <nav
        aria-label="Primary navigation"
        className="relative z-10 mx-auto max-w-7xl overflow-visible rounded-lg border border-[#E5E7EA] bg-white/95 px-3 py-2 text-[#172129] shadow-2xl shadow-[#172129]/12 backdrop-blur-xl md:px-4"
      >
        <div className="flex min-h-[56px] items-center justify-between gap-3">
          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="flex min-w-0 items-center rounded-lg px-1.5 py-1 transition hover:bg-[#E0F2FE]"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src="/logo-horizontal.webp"
              alt={`${siteConfig.name} logo`}
              width={320}
              height={100}
              priority
              className="h-11 w-auto max-w-[180px] object-contain sm:h-14 sm:max-w-[235px]"
            />
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
                      ? "border border-[#BAE6FD] bg-[#E0F2FE] text-[#0369A1]"
                      : "text-[#102A43] hover:bg-[#E0F2FE] hover:text-[#0369A1]"
                  }`}
                >
                  <Icon className="size-4" />
                  {link.label}
                </Link>
              );
            })}

            <div
              ref={servicesMenuRef}
              className="group relative"
              onMouseEnter={() => setIsServicesOpen(true)}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isServicesOpen}
                className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-[#102A43] transition hover:bg-[#E0F2FE] hover:text-[#0369A1]"
                onClick={() => setIsServicesOpen(true)}
                onFocus={() => setIsServicesOpen(true)}
              >
                <Layers3 className="size-4" />
                Services
                <ChevronDown
                  className={`size-4 transition ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute right-0 top-full z-50 w-[320px] pt-3 transition group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100 ${
                  isServicesOpen
                    ? "visible pointer-events-auto opacity-100"
                    : "invisible pointer-events-none opacity-0"
                }`}
              >
                <div
                  role="menu"
                  className="rounded-lg border border-[#E5E7EA] bg-white/95 p-2 shadow-2xl shadow-[#172129]/12 backdrop-blur-xl"
                >
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={getServicePath(service.slug)}
                      role="menuitem"
                      className="block rounded-lg px-3 py-3 transition hover:bg-[#E0F2FE]"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      <span className="block text-sm font-semibold text-[#172129]">
                        {service.name}
                      </span>
                      <span className="mt-1 line-clamp-1 block text-xs text-[#52677A]">
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
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5E7EA] bg-[#E0F2FE] text-[#172129] transition hover:bg-[#EAF6FF] hover:text-[#0369A1] xl:hidden"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {isOpen ? (
          <div className="max-h-[calc(100vh-7rem)] touch-pan-y overflow-y-auto overscroll-contain border-t border-[#E5E7EA] py-3 xl:hidden">
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
                        ? "border border-[#BAE6FD] bg-[#E0F2FE] text-[#0369A1]"
                        : "text-[#102A43] hover:bg-[#E0F2FE]"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="size-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-3 border-t border-[#E5E7EA] pt-3">
              <p className="px-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#0369A1]">
                Services
              </p>
              <div className="mt-2 grid gap-2">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={getServicePath(service.slug)}
                    className="rounded-lg px-3 py-3 text-sm font-semibold text-[#102A43] transition hover:bg-[#E0F2FE] hover:text-[#0369A1]"
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
