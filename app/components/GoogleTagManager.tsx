"use client";

import { useEffect } from "react";
import {
  GoogleTagManager as NextGoogleTagManager,
  sendGTMEvent,
} from "@next/third-parties/google";
import { getContactClickEvent, getGtmId } from "../lib/analytics";

const gtmId = getGtmId(process.env.NEXT_PUBLIC_GTM_ID);

export default function GoogleTagManager() {
  useEffect(() => {
    if (!gtmId) return;

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const contactEvent = getContactClickEvent(link.href, window.location.href);
      if (contactEvent) sendGTMEvent(contactEvent, "dataLayer");
    };

    // Delegation covers links added by client navigation without reattaching.
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (!gtmId) return null;

  return (
    <>
      <NextGoogleTagManager gtmId={gtmId} />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          title="Google Tag Manager"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
