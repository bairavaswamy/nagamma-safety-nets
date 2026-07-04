"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import type { Area, Service } from "../bangalore/data/serviceAreaData";

type ContactFormProps = {
  services: readonly Service[];
  areas: readonly Area[];
};

export default function ContactForm({ services, areas }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#075E54]/10 backdrop-blur-xl p-5 md:p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#263B35]">
            Name
          </span>
          <input
            required
            name="name"
            className="h-12 w-full rounded-lg border border-white/70 bg-white/72 px-4 text-sm outline-none transition focus:border-[#075E54] focus:ring-2 focus:ring-[#075E54]/15"
            placeholder="Your name"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#263B35]">
            Mobile number
          </span>
          <input
            required
            name="mobile"
            inputMode="tel"
            className="h-12 w-full rounded-lg border border-white/70 bg-white/72 px-4 text-sm outline-none transition focus:border-[#075E54] focus:ring-2 focus:ring-[#075E54]/15"
            placeholder="Your mobile number"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#263B35]">
            Service
          </span>
          <select
            required
            name="service"
            className="h-12 w-full rounded-lg border border-white/70 bg-white/70 backdrop-blur-xl px-4 text-sm outline-none transition focus:border-[#075E54] focus:ring-2 focus:ring-[#075E54]/15"
            defaultValue=""
          >
            <option value="" disabled>
              Select service
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#263B35]">
            Area
          </span>
          <select
            required
            name="area"
            className="h-12 w-full rounded-lg border border-white/70 bg-white/70 backdrop-blur-xl px-4 text-sm outline-none transition focus:border-[#075E54] focus:ring-2 focus:ring-[#075E54]/15"
            defaultValue=""
          >
            <option value="" disabled>
              Select area
            </option>
            {areas.map((area) => (
              <option key={area.slug} value={area.slug}>
                {area.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-semibold text-[#263B35]">
          Requirement
        </span>
        <textarea
          required
          name="requirement"
          rows={5}
          className="w-full rounded-lg border border-white/70 bg-white/72 px-4 py-3 text-sm outline-none transition focus:border-[#075E54] focus:ring-2 focus:ring-[#075E54]/15"
          placeholder="Tell us about the balcony, window, duct, terrace, or utility area."
        />
      </label>

      <button
        type="submit"
        className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#075E54] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(7,94,84,0.10)] transition hover:bg-[#04483F]"
      >
        <Send className="size-4" />
        Prepare Enquiry
      </button>

      {submitted ? (
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-[#075E54]/20 bg-[#DDF4EC] p-4 text-sm text-[#04483F]">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
          <p>
            Your request details are ready. Keep photos of the balcony, window,
            duct, terrace, or utility space ready for the site check.
          </p>
        </div>
      ) : null}
    </form>
  );
}
