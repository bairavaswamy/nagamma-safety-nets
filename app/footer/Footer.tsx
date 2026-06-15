import React from "react";
import { FaDove, FaShieldAlt, FaBlog, FaQuestionCircle, FaBug } from "react-icons/fa";
import { GiBrickWall, GiFactory, GiPoolDive, GiMonkey } from "react-icons/gi";
import { MdPrivacyTip, MdPolicy, MdPets, MdConstruction } from "react-icons/md";

import FooterCompanyInfo from "./FooterCompantInfo";
import FooterSection from "./FooterSection";
import FooterBottom from "./FooterBottom";

interface FooterItem {
  name: string;
  icon: React.ReactNode;
  link: string;
}

const pigeonBirdNets: FooterItem[] = [
  { name: "Pigeon Safety Nets", icon: <FaDove />, link: "/solutions/pigeon-safety-nets" },
  { name: "Anti Bird Nets", icon: <FaDove />, link: "/solutions/anti-bird-nets" },
  { name: "Bird Nets for Balconies", icon: <FaDove />, link: "/solutions/bird-nets-for-balconies" },
  { name: "Bird Netting Service", icon: <FaDove />, link: "/solutions/bird-netting-service" },
  { name: "Bird Protection Nets", icon: <FaDove />, link: "/solutions/bird-protection-nets" },
  { name: "Pigeon Nets Installation", icon: <FaDove />, link: "/solutions/pigeon-nets-installation" },
  { name: "Pigeon and Bird Spikes", icon: <FaDove />, link: "/solutions/pigeon-bird-spikes" },
  { name: "Shade Nets", icon: <FaShieldAlt />, link: "/solutions/shade-nets" },
  { name: "Nylon Nets", icon: <FaShieldAlt />, link: "/solutions/nylon-nets" },
  { name: "Anti Seagull Nets", icon: <FaShieldAlt />, link: "/solutions/anti-seagull-safety-nets" },
  { name: "Glass Safety Nets", icon: <FaShieldAlt />, link: "/solutions/glass-safety-nets" },
  { name: "HDPE Nets", icon: <FaShieldAlt />, link: "/solutions/hdpe-safety-nets" },
  { name: "Window Safety Nets", icon: <FaShieldAlt />, link: "/solutions/window-safety-nets" },
];

const safetyNets: FooterItem[] = [
  { name: "Building Safety Nets", icon: <GiBrickWall />, link: "/solutions/building-safety-nets" },
  { name: "Children Safety Nets", icon: <FaShieldAlt />, link: "/solutions/children-safety-nets" },
  { name: "Construction Safety Nets", icon: <FaShieldAlt />, link: "/solutions/construction-safety-nets" },
  { name: "Industrial Safety Nets", icon: <GiFactory />, link: "/solutions/industrial-safety-nets" },
  { name: "Pets Safety Nets", icon: <MdPets />, link: "/solutions/pets-safety-nets" },
  { name: "Swimming Pool Safety Nets", icon: <GiPoolDive />, link: "/solutions/swimming-pool-safety-nets" },
  { name: "Duct Area Safety Nets", icon: <MdConstruction />, link: "/solutions/duct-area-safety-nets" },
  { name: "Open Area Safety Nets", icon: <GiBrickWall />, link: "/solutions/open-area-safety-nets" },
  { name: "Mosquito Safety Nets", icon: <FaBug />, link: "/solutions/mosquito-safety-nets" },
  { name: "Monkey Safety Nets", icon: <GiMonkey />, link: "/solutions/monkey-safety-nets" },
];

const resources: FooterItem[] = [
  { name: "Blog", icon: <FaBlog />, link: "/blogs" },
  { name: "FAQs", icon: <FaQuestionCircle />, link: "/faq" },
  { name: "Privacy Policy", icon: <MdPrivacyTip />, link: "/privacy-policy" },
  { name: "Terms & Conditions", icon: <MdPolicy />, link: "/terms-and-conditions" },
];


const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-[#F8FAFC] text-[#334155]" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <FooterCompanyInfo />

        <div className="my-10 h-px bg-slate-200" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <FooterSection 
            title="Pigeon & Bird Nets" 
            items={pigeonBirdNets} 
            iconColor="text-[#0F766E]" 
          />
          <FooterSection 
            title="Safety Nets" 
            items={safetyNets} 
            iconColor="text-[#0F766E]" 
          />
          <FooterSection 
            title="Resources" 
            items={resources} 
            iconColor="text-[#0F766E]" 
          />
        </div>

        <div className="mt-16 text-center">
          <p className="mb-4 text-lg text-[#475569]">
            Need help choosing the right safety solution?
          </p>

          <a
            href="tel:7995792953"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#C2410C] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#9A3412]"
          >
            Call for Free Consultation
          </a>
        </div>

        <div className="my-10 h-px bg-slate-200" />

        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
