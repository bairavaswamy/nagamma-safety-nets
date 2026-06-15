'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { areas } from '@/app/data/areasData';
import { servicesData } from '@/app/data/serviceData';

// Slugify function
const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-');

const links = [
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contactUs', label: 'Contact' },
];

export default function DesktopMenu() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const servicesArray = Object.entries(servicesData).map(([key, value]) => ({
    key,
    title: value.title,
  }));

  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700 relative">
      {/* Home first */}
      <li className="relative group">
        <Link
      prefetch={false}
          href="/"
          className={`relative py-1 transition duration-300 ${
            pathname === '/' ? 'text-[#0F766E]' : 'hover:text-[#0F766E]'
          }`}
        >
          Home
          <span
            className={`absolute left-0 -bottom-1 h-[2px] bg-[#0F766E] transition-all duration-300 ${
              pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}
          />
        </Link>
      </li>

      {/* SERVICES Dropdown after Home */}
      <li
        className="relative group"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => {
          setIsDropdownOpen(false);
          setHoveredService(null);
        }}
      >
        <button
          className={`relative py-1 transition duration-300 ${
            pathname.startsWith('/bangalore') ? 'text-[#0F766E]' : 'text-gray-700'
          } group`}
        >
          Services
          <span
            className={`absolute left-0 -bottom-1 h-[2px] bg-[#0F766E] transition-all duration-300 ${
              isDropdownOpen || pathname.startsWith('/bangalore') ? 'w-full' : 'w-0 group-hover:w-full'
            }`}
          />
        </button>

        {/* Dropdowns container */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 flex gap-2 z-50">
            {/* First Dropdown: Services */}
            {/* First Dropdown: Services */}
<div className="scrollbar-hide w-60 max-h-[500px] overflow-y-auto rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
  {servicesArray.map((service) => {
    const isActiveService = hoveredService === service.key;
    return (
      <div
        key={service.key}
        onMouseEnter={() => setHoveredService(service.key)}
        className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-300 ${
          isActiveService ? 'text-[#0F766E] font-semibold bg-teal-50' : 'text-gray-700 hover:text-[#0F766E] hover:bg-teal-50'
        }`}
      >
        {service.title}
      </div>
    );
  })}
</div>
            {/* Second Dropdown: Areas */}
            {hoveredService && (
              <div className="scrollbar-hide w-80 max-h-[500px] overflow-y-auto rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
                <ul>
                  {areas.map((area) => (
                    <li key={`${hoveredService}-${area}`}>
                      <Link
      prefetch={false}
                        href={`/bangalore/${slugify(area)}/${hoveredService}`}
                        className="block px-6 py-2 rounded-lg text-sm text-gray-600 hover:text-[#0F766E] hover:bg-teal-50"
                      >
                        {servicesData[hoveredService as keyof typeof servicesData].title} in {area.replace(/-/g, ' ')}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </li>

      {/* Other links */}
      {links.map((link) => (
        <li key={link.href} className="relative group">
          <Link
      prefetch={false}
            href={link.href}
            className={`relative py-1 transition duration-300 ${
              pathname === link.href ? 'text-[#0F766E]' : 'hover:text-[#0F766E]'
            }`}
          >
            {link.label}
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-[#0F766E] transition-all duration-300 ${
                pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </Link>
        </li>
      ))}

      {/* CTA Button */}
      <li>
        <a
          href="tel:7995792953"
          className="ml-4 rounded-lg bg-[#C2410C] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#9A3412]"
        >
          Call Now
        </a>
      </li>

      {/* Hide scrollbars */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          scrollbar-width: none;
        }
      `}</style>
    </ul>
  );
}
