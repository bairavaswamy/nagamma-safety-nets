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
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#334155]">
            Name
          </span>
          <input
            required
            name="name"
            className="h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15"
            placeholder="Your name"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#334155]">
            Mobile number
          </span>
          <input
            required
            name="mobile"
            inputMode="tel"
            className="h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15"
            placeholder="Your mobile number"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#334155]">
            Service
          </span>
          <select
            required
            name="service"
            className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15"
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
          <span className="mb-2 block text-sm font-semibold text-[#334155]">
            Area
          </span>
          <select
            required
            name="area"
            className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15"
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
        <span className="mb-2 block text-sm font-semibold text-[#334155]">
          Requirement
        </span>
        <textarea
          required
          name="requirement"
          rows={5}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15"
          placeholder="Tell us about the balcony, window, duct, terrace, or utility area."
        />
      </label>

      <button
        type="submit"
        className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#0F766E] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#115E59]"
      >
        <Send className="size-4" />
        Prepare Enquiry
      </button>

      {submitted ? (
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-[#0F766E]/20 bg-[#ECFDF5] p-4 text-sm text-[#115E59]">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
          <p>
            Your enquiry details are ready. Add the final business phone or
            email to connect this form to live submissions.
          </p>
        </div>
      ) : null}
    </form>
  );
}
