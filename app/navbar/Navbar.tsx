"use client";

import { useState } from "react";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed left-0 top-0 z-50 h-[68px] w-full border-b border-slate-200 bg-white text-gray-900 shadow-sm">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Logo />

        <div className="hidden md:block">
          <DesktopMenu />
        </div>

        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </nav>
  );
}

export default Navbar;
