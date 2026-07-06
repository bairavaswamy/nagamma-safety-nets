import Link from "next/link";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "../bangalore/data/serviceAreaData";

export default function FloatingContactButtons() {
  return (
    <div
      className="fixed right-3 top-[70%] z-50 flex -translate-y-1/2 flex-col gap-3 sm:right-5"
      aria-label="Quick contact actions"
    >
      <Link
        href={siteConfig.phoneHref}
        aria-label={`Call ${siteConfig.name} at ${siteConfig.phoneDisplay}`}
        className="group flex size-12 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#B5121B] shadow-[0_18px_42px_rgba(23,33,41,0.18)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-[#B5121B] hover:text-white sm:size-14"
      >
        <Phone className="size-5 sm:size-6" />
        <span className="sr-only">Call {siteConfig.phoneDisplay}</span>
      </Link>

      <Link
        href={siteConfig.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp ${siteConfig.name} at ${siteConfig.phoneDisplay}`}
        className="group flex size-12 items-center justify-center rounded-full border border-white/70 bg-[#25D366] text-white shadow-[0_18px_42px_rgba(23,33,41,0.18)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-[#1FB85A] sm:size-14"
      >
        <FaWhatsapp className="size-6 sm:size-7" />
        <span className="sr-only">WhatsApp {siteConfig.phoneDisplay}</span>
      </Link>
    </div>
  );
}
