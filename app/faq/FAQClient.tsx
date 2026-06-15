"use client";

import { useState } from "react";
import {
  invisibleGrillFaq,
  petsSafetyFaq,
  pigeonSafetyFaq,
} from "@/app/data/FaqData";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";
import StickyContactIcons from "@/app/stickyicons/stickyIcons";
import { FaChevronDown } from "react-icons/fa";

type FAQ = {
  question: string;
  answer: string;
};

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderFAQSection = (
    title: string,
    subtitle: string,
    faqs: FAQ[],
    baseIndex: number
  ) => (
    <section className="mb-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] md:text-4xl">
          {title}
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#475569] md:text-base">
          {subtitle}
        </p>

        <div className="mx-auto mt-5 h-[3px] w-16 rounded-full bg-[#C2410C]" />
      </div>

      <div className="mx-auto max-w-4xl space-y-5">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === baseIndex + i;

          return (
            <div
              key={faq.question}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(baseIndex + i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-sm font-medium text-[#111827] md:text-base">
                  {faq.question}
                </span>

                <FaChevronDown
                  className={`shrink-0 text-[#0F766E] transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-200 ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="border-t border-slate-200 px-6 pb-5 pt-4 text-sm leading-7 text-[#475569]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8FAFC] px-6 py-20 md:px-12">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
            Help Center
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#111827] md:text-6xl">
            Frequently Asked Questions
          </h1>

          <p className="mt-5 text-base leading-8 text-[#475569] md:text-lg">
            Find answers about safety nets, pigeon protection, and invisible
            grills in Bangalore. Everything you need to know before installation.
          </p>
        </div>

        {renderFAQSection(
          "Pigeon Safety Nets",
          "Everything about pigeon control, bird protection, and balcony safety solutions.",
          pigeonSafetyFaq,
          0
        )}

        {renderFAQSection(
          "Pet & Children Safety Nets",
          "Safety details for kids and pets with durable net installations.",
          petsSafetyFaq,
          100
        )}

        {renderFAQSection(
          "Invisible Grills",
          "Modern safety solutions that provide protection without blocking your view.",
          invisibleGrillFaq,
          200
        )}

        <section className="mx-auto mt-20 max-w-3xl rounded-lg border border-[#0F766E]/20 bg-[#ECFDF5] p-8 text-center">
          <h3 className="mb-4 text-2xl font-bold text-[#111827] md:text-3xl">
            Still Have Questions?
          </h3>

          <p className="mb-8 text-[#475569]">
            Talk directly with our team for the right safety solution.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="tel:+917995792953"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#C2410C] px-6 py-3 font-semibold text-white transition hover:bg-[#9A3412]"
            >
              Call Now
            </a>

            <a
              href="https://wa.me/917995792953"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#0F766E] px-6 py-3 font-semibold text-white transition hover:bg-[#115E59]"
            >
              WhatsApp
            </a>
          </div>

          <p className="mt-6 text-xs text-[#64748B]">
            4.9 rating | 1000+ happy customers in Bangalore
          </p>
        </section>
      </main>

      <StickyContactIcons />
      <Footer />
    </>
  );
};

export default FAQPage;
