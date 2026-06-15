'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { servicesData as originalServices } from '../data/serviceData';
import { areas } from '../data/areasData';

const servicesData = Object.fromEntries(
  Object.entries(originalServices).map(([key, service]) => [
    key,
    { ...service, areas },
  ])
);

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contactUs', label: 'Contact' },
];

type MobileMenuProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-');

const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  const pathname = usePathname();
  const [activeService, setActiveService] = useState<string | null>(null);

  const toggleService = (slug: string) => {
    setActiveService(activeService === slug ? null : slug);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-800" aria-label="Open menu">
        {isOpen ? <RxCross2 size={24} /> : <GiHamburgerMenu size={24} />}
      </button>

      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30 bg-[#0F172A]/45"
          />

          <aside className="fixed left-0 top-0 z-40 flex h-full w-[85%] max-w-xs flex-col border-r border-slate-200 bg-white shadow-lg">
            <div className="relative flex flex-col items-center pt-16 pb-5 border-b border-teal-100">
              <div className="relative w-14 h-14 mb-2">
                <Image
                  src="/servani-logo.webp"
                  alt="Servani Safety Nets"
                  fill
                  className="object-contain rounded-full border border-teal-100"
                />
              </div>

              <p className="text-base font-bold bg-gradient-to-r from-[#0F766E] to-teal-400 bg-clip-text text-transparent">
                Servani Safety Nets
              </p>
              <p className="text-[11px] text-gray-500 mt-1">Trust | Safety | Quality</p>

              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-4 text-gray-500 hover:text-[#F97316]"
                aria-label="Close menu"
              >
                <RxCross2 size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 pb-28">
              {links.map((link) => (
                <Link
                  prefetch={false}
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive(link.href)
                      ? 'bg-teal-50 text-[#0F766E]'
                      : 'text-gray-700 hover:bg-teal-50 hover:text-[#0F766E]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <p className="text-xs text-gray-500 px-4 mt-4 mb-1">Our Services</p>

              {Object.entries(servicesData).map(([key, service]) => {
                const isOpenService = activeService === key;

                return (
                  <div key={key} className="border-b border-teal-100 pb-3">
                    <button
                      onClick={() => toggleService(key)}
                      className="flex justify-between items-center w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-[#0F766E] transition font-medium"
                    >
                      <span>{service.title}</span>
                      {isOpenService ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {isOpenService && (
                      <div className="ml-4 mt-2 max-h-[500px] space-y-2 overflow-y-auto border-l border-teal-100 pl-3">
                        {service.areas.map((area) => (
                          <Link
                            prefetch={false}
                            key={`${key}-${area}`}
                            href={`/bangalore/${slugify(area)}/${key}/`}
                            onClick={() => setIsOpen(false)}
                            className="block text-sm font-medium text-gray-600 hover:text-[#0F766E] hover:bg-teal-50 px-3 py-1.5 rounded-md transition-all duration-200"
                          >
                            {service.title} in {area}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default MobileMenu;
