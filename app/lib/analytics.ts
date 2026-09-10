export type ContactMethod = "phone" | "whatsapp" | "email" | "enquiry";

export type ContactClickEvent = {
  event: "contact_click";
  contact_method: ContactMethod;
  page_path: string;
};

/** Accept container IDs only; GA measurement IDs and blank values stay disabled. */
export function getGtmId(value: string | undefined): string | null {
  const id = value?.trim();
  return id && /^GTM-[A-Z0-9]{4,}$/.test(id) ? id : null;
}

/** Keep user-entered text, phone numbers, emails and URL queries out of events. */
export function getContactClickEvent(
  href: string,
  pageUrl: string,
): ContactClickEvent | null {
  let target: URL;
  let page: URL;

  try {
    page = new URL(pageUrl);
    target = new URL(href, page);
  } catch {
    return null;
  }

  let method: ContactMethod | null = null;

  if (target.protocol === "tel:") {
    method = "phone";
  } else if (target.protocol === "mailto:") {
    method = "email";
  } else if (
    target.protocol === "https:" &&
    ["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(target.hostname)
  ) {
    method = "whatsapp";
  } else if (
    target.origin === page.origin &&
    /^\/contact-us\/?$/.test(target.pathname)
  ) {
    method = "enquiry";
  }

  return method
    ? {
        event: "contact_click",
        contact_method: method,
        page_path: page.pathname,
      }
    : null;
}
