"use client";

import { MessageCircle } from "lucide-react";

const GetQuoteButton = () => {
  return (
    <button
      onClick={() =>
        window.open(
          "https://wa.me/7995792953?text=Hi%20Servani%20Safety%20Nets,%20I%20need%20a%20quote",
          "_blank",
          "noopener"
        )
      }
      className="mt-7 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#C2410C] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#9A3412] active:scale-[0.99]"
      type="button"
    >
      <MessageCircle aria-hidden="true" className="h-5 w-5" />
      Get Quote on WhatsApp
    </button>
  );
};

export default GetQuoteButton;
