"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

const FAQSection = ({ faqs }: { faqs: FAQ[] }) => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#111827] md:text-4xl">
          Common Questions
        </h2>
        <div className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-[#C2410C]" />

        <div className="mt-10 space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = open === i;

            return (
              <div
                key={faq.question}
                className={`rounded-lg border bg-white shadow-sm transition ${
                  isOpen ? "border-[#0F766E]" : "border-slate-200"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  type="button"
                >
                  <span className="text-base font-semibold text-[#111827] md:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-5 w-5 shrink-0 text-[#0F766E] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-slate-200 px-5 pb-5 pt-4 leading-7 text-[#475569]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
