"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
  {
    question: "What types of safety nets do you install?",
    answer:
      "At Servani Safety Nets, we install balcony safety nets, pigeon protection nets, bird spikes, invisible grills, and more - customized for residential and commercial spaces.",
  },
  {
    question: "Are your safety nets durable and weather-resistant?",
    answer:
      "Yes. Our safety nets are made from premium HDPE materials that are UV-resistant, rust-proof, and built to withstand weather conditions for long-term safety.",
  },
  {
    question: "Do you provide installation service in all areas of Bengaluru?",
    answer:
      "Yes. Servani Safety Nets covers major areas in Bengaluru with reliable and professional installation services.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Most installations are completed within a few hours depending on the size and requirements. We keep the work clean and efficient.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#111827] md:text-5xl">
          Frequently Asked Questions
        </h2>

        <div className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-[#C2410C]" />

        <div className="mt-12 space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-semibold text-[#111827] transition hover:text-[#0F766E]"
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <FiChevronUp className="shrink-0 text-[#0F766E]" />
                ) : (
                  <FiChevronDown className="shrink-0 text-[#64748B]" />
                )}
              </button>

              <div
                className={`grid transition-all duration-200 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-slate-200 px-6 pb-6 pt-4 leading-7 text-[#475569]">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-[#64748B]">
          Trusted by families | Designed for safety | Built to last
        </p>
      </div>
    </section>
  );
};

export default FAQSection;
