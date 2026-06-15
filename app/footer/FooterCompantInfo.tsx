import React from "react";

const FooterCompanyInfo: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] md:text-4xl">
        Servani Safety Nets
      </h2>

      <div className="mb-6 mt-4 h-[3px] w-20 rounded-full bg-[#C2410C]" />

      <p className="max-w-2xl text-sm leading-7 text-[#475569] md:text-base">
        Safety net and invisible grill installation for Bangalore homes,
        apartments, balconies, windows, ducts, open areas, and staircases.
        We focus on clean fixing, suitable material, and practical safety for
        children, pets, pigeon control, and everyday use.
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-6 text-sm">
        <div>
          <p className="text-lg font-bold text-[#0F766E]">5000+</p>
          <p className="text-xs text-[#64748B]">Installations</p>
        </div>
        <div>
          <p className="text-lg font-bold text-[#0F766E]">4.9 rating</p>
          <p className="text-xs text-[#64748B]">Customer Rating</p>
        </div>
        <div>
          <p className="text-lg font-bold text-[#0F766E]">10+</p>
          <p className="text-xs text-[#64748B]">Years Experience</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-[#475569]">
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-1">
          Measured Installation
        </span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-1">
          Same Day Visits
        </span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-1">
          Apartment Friendly Fixing
        </span>
      </div>
    </div>
  );
};

export default FooterCompanyInfo;
