"use client";

import React from "react";
import { FaFacebookF, FaGoogle, FaInstagram, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { businessProfile } from "../data/businessProfile";

const FooterBottom: React.FC = () => {
  return (
    <section aria-label="Footer bottom section">
      <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div>
          <p className="text-sm tracking-wide text-[#475569]">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-[#111827]">Servani Safety Nets</span>.
            All rights reserved.
          </p>

          <p className="mt-2 text-xs text-[#64748B]">
            Safety Nets & Invisible Grills in Bangalore
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="tel:+917995792953"
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#0F766E]/30 bg-white px-4 py-2 text-sm font-medium text-[#0F766E] transition hover:bg-[#0F766E] hover:text-white"
          >
            <FaPhoneAlt className="h-3 w-3" />
            Call Now
          </a>

          <a
            href="https://wa.me/917995792953"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-emerald-500/30 bg-white px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
          >
            <FaWhatsapp className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={businessProfile.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="rounded-lg border border-slate-200 bg-white p-3 text-[#0F766E] shadow-sm transition hover:border-[#0F766E]"
          >
            <FaFacebookF className="h-4 w-4" />
          </a>

          <a
            href="https://wa.me/917995792953"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="rounded-lg border border-slate-200 bg-white p-3 text-emerald-700 shadow-sm transition hover:border-emerald-600"
          >
            <FaWhatsapp className="h-4 w-4" />
          </a>

          <a
            href={businessProfile.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="rounded-lg border border-slate-200 bg-white p-3 text-[#0F766E] shadow-sm transition hover:border-[#0F766E]"
          >
            <FaInstagram className="h-4 w-4" />
          </a>

          <a
            href={businessProfile.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Business Profile"
            className="rounded-lg border border-slate-200 bg-white p-3 text-[#0F766E] shadow-sm transition hover:border-[#0F766E]"
          >
            <FaGoogle className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mt-8 space-y-2 text-center">
        <p className="text-xs text-[#64748B]">
          Trusted by 5000+ customers | 4.9 rating | Professional installation
        </p>

        <p className="text-xs font-medium text-[#0F766E]">
          Sister service site:{" "}
          <a
            href="https://eversafesafetynets.com/areas/bangalore/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-[#F97316]"
          >
            Eversafe Safety Nets Bangalore
          </a>
        </p>
      </div>
    </section>
  );
};

export default FooterBottom;
