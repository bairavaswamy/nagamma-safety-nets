"use client";

import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link
      prefetch={false}
      href="/"
      className="flex items-center gap-3 group transition-all duration-300"
    >
      {/* Logo */}
      <div className="relative w-10 h-10 sm:w-12 sm:h-12">
        
        {/* Soft Glow */}
        <div className="absolute inset-0 rounded-full 
          bg-[#0F766E]/20 blur-md opacity-0 
          group-hover:opacity-100 transition duration-500" />

        {/* Ring */}
        <div className="absolute inset-0 rounded-full 
          border border-teal-100 group-hover:border-[#0F766E]/50 
          transition duration-300" />

        {/* Image */}
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image
            src="/servani-logo.webp"
            alt="Servani Safety Nets Logo"
            fill
            className="object-contain transition duration-500 group-hover:scale-105"
            priority
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        
        {/* Main Brand */}
        <span
          className="text-base sm:text-lg font-bold tracking-tight
          bg-gradient-to-r from-[#0F766E] to-teal-400 
          bg-clip-text text-transparent"
        >
          Servani Safety Nets
        </span>

        {/* Sub Brand */}
        <span className="text-xs sm:text-sm text-gray-600 tracking-wide">
          High-Rise Safety Experts
        </span>
      </div>
    </Link>
  );
};

export default Logo;
