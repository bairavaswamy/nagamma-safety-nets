import React from "react";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const StickyContactIcons = () => {
  return (
    <div className="fixed right-4 top-[60%] z-50 flex -translate-y-1/2 flex-col gap-4 sm:right-6">
      <a
        href="tel:+917995792953"
        aria-label="Call us at +91 79957 92953"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white"
      >
        <FiPhone className="h-6 w-6" aria-hidden="true" />
      </a>
      <a
        href="https://wa.me/917995792953"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white"
      >
        <FaWhatsapp className="h-6 w-6" aria-hidden="true" />
      </a>
    </div>
  );
}

export default StickyContactIcons;
