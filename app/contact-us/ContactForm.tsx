"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2, MessageCircle, Send } from "lucide-react";
import { siteConfig, type Area, type Service } from "../bangalore/data/serviceAreaData";

type ContactFormProps = {
  services: readonly Service[];
  areas: readonly Area[];
};

const inputClass =
  "h-12 w-full rounded-xl border border-[var(--brand-border)] bg-white px-4 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/15";

export default function ContactForm({ services, areas }: ContactFormProps) {
  const [draft, setDraft] = useState<{ message: string; href: string } | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const mobileInput = form.elements.namedItem("mobile") as HTMLInputElement;
    const requirementInput = form.elements.namedItem("requirement") as HTMLTextAreaElement;
    const name = String(data.get("name") || "").trim();
    const mobile = String(data.get("mobile") || "").replace(/[\s()-]/g, "");
    const requirement = String(data.get("requirement") || "").trim();

    nameInput.setCustomValidity(name ? "" : "Please enter your name.");
    mobileInput.setCustomValidity(
      /^(?:\+?91)?[6-9]\d{9}$/.test(mobile)
        ? ""
        : "Enter a 10-digit Indian mobile number, optionally with +91."
    );
    requirementInput.setCustomValidity(
      requirement ? "" : "Please describe your requirement."
    );

    if (!form.reportValidity()) return;

    const service = services.find((item) => item.slug === data.get("service"));
    const area = areas.find((item) => item.slug === data.get("area"));
    if (!service || !area) return;

    const message = [
      `Hi ${siteConfig.name}, I would like to enquire about a service.`,
      "",
      `Name: ${name}`,
      `Mobile: ${mobile}`,
      `Service: ${service.name}`,
      `Area: ${area.name}, ${siteConfig.city}`,
      `Requirement: ${requirement}`,
    ].join("\n");
    const whatsappUrl = new URL(siteConfig.whatsappHref);
    whatsappUrl.searchParams.set("text", message);
    setDraft({ message, href: whatsappUrl.toString() });
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => setDraft(null)}
      className="rounded-3xl border border-[var(--brand-border)] bg-white p-5 shadow-[0_16px_50px_rgba(23,57,43,0.06)] md:p-8"
    >
      <div className="mb-6">
        <p className="text-xl font-semibold text-[var(--brand-text)]">Tell us about your space</p>
        <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">
          Prepare your enquiry here, then send it to our team through WhatsApp.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--brand-text)]">Name</span>
          <input
            required
            name="name"
            autoComplete="name"
            maxLength={100}
            onInput={(event) => event.currentTarget.setCustomValidity("")}
            className={inputClass}
            placeholder="Your name"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--brand-text)]">Mobile number</span>
          <input
            required
            type="tel"
            name="mobile"
            autoComplete="tel"
            inputMode="tel"
            maxLength={20}
            onInput={(event) => event.currentTarget.setCustomValidity("")}
            className={inputClass}
            placeholder="10-digit mobile number"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--brand-text)]">Service</span>
          <select required name="service" className={inputClass} defaultValue="">
            <option value="" disabled>Select service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>{service.name}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--brand-text)]">Area</span>
          <select required name="area" className={inputClass} defaultValue="">
            <option value="" disabled>Select area</option>
            {areas.map((area) => (
              <option key={area.slug} value={area.slug}>{area.name}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-semibold text-[var(--brand-text)]">Requirement</span>
        <textarea
          required
          name="requirement"
          rows={4}
          maxLength={1500}
          onInput={(event) => event.currentTarget.setCustomValidity("")}
          className="w-full rounded-xl border border-[var(--brand-border)] bg-white px-4 py-3 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/15"
          placeholder="Tell us about your balcony, window, terrace, or utility area."
        />
      </label>

      <button
        type="submit"
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-primary-dark)]"
      >
        <Send className="size-4" aria-hidden="true" />
        Prepare WhatsApp enquiry
      </button>

      <div aria-live="polite" aria-atomic="true">
        {draft ? (
          <div className="mt-5 rounded-2xl border border-[var(--brand-border)] bg-white p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)]">
              <CheckCircle2 className="size-5 shrink-0" aria-hidden="true" />
              Your enquiry is ready to review
            </p>
            <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-[var(--brand-muted)]">{draft.message}</p>
            <a
              href={draft.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-primary-dark)]"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Continue to WhatsApp
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <p className="mt-3 text-xs leading-5 text-[var(--brand-muted)]">
              WhatsApp opens in a new tab. Review your message and press Send there to contact us.
            </p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
