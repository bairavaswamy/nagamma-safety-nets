import type { Metadata } from "next";
import FAQClient from "./FAQClient";
import {
  invisibleGrillFaq,
  petsSafetyFaq,
  pigeonSafetyFaq,
} from "../data/FaqData";
import { businessProfile, businessReference } from "../data/businessProfile";

export const metadata: Metadata = {
  title: { absolute: "Safety Nets FAQs Bangalore | Servani" },
  description:
    "Answers about balcony safety nets, pigeon nets, invisible grills, pet safety nets, installation time, material choices, and pricing in Bangalore.",
  alternates: {
    canonical: "https://servanisafetynets.com/faq/",
  },
  openGraph: {
    title: "Safety Nets FAQs Bangalore | Servani",
    description:
      "Common questions about safety nets, pigeon control, invisible grills, pet safety, materials, and pricing in Bangalore.",
    url: "https://servanisafetynets.com/faq/",
    siteName: "Servani Safety Nets",
    type: "website",
    locale: "en_IN",
  },
};

export default function FAQPage() {
  const faqs = [...pigeonSafetyFaq, ...petsSafetyFaq, ...invisibleGrillFaq];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${businessProfile.baseUrl}/faq/#faq`,
    url: `${businessProfile.baseUrl}/faq/`,
    name: "Safety Nets FAQs Bangalore",
    about: businessReference,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        id="faq-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQClient />
    </>
  );
}
