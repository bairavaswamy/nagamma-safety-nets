import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "../bangalore/data/serviceAreaData";
export default function FloatingContactButtons() {
  return (
    <aside aria-label="Quick contact" className="floating-contact-actions fixed right-3 top-[70%] z-40 flex flex-col gap-3 sm:right-5">
      <a
        href={siteConfig.phoneHref}
        aria-label={`Call Nagamma Safety Nets at ${siteConfig.phoneDisplay}`}
        title="Call us"
        className="flex size-12 items-center justify-center rounded-full border border-[var(--brand-border)] bg-white text-[var(--brand-primary)] shadow-[0_6px_24px_rgba(23,77,139,.18)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-secondary)] sm:size-14"
      >
        <Phone className="size-5 sm:size-6" aria-hidden="true" />
      </a>
      <a
        href={siteConfig.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Nagamma Safety Nets on WhatsApp"
        title="Chat on WhatsApp"
        className="flex size-12 items-center justify-center rounded-full border border-white/70 bg-[var(--brand-primary)] text-white shadow-[0_6px_24px_rgba(23,77,139,.22)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-primary-dark)] sm:size-14"
      >
        <FaWhatsapp className="size-6 sm:size-7" aria-hidden="true" />
      </a>
    </aside>
  );
}
