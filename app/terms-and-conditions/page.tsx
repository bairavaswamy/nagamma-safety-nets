import type { Metadata } from "next";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";
import StickyContactIcons from "@/app/stickyicons/stickyIcons";

export const metadata: Metadata = {
  title: { absolute: "Terms and Conditions | Servani Safety Nets" },
  description:
    "Terms and conditions for Servani Safety Nets services, including installation, pricing, scheduling, warranty, website content, and support.",
  alternates: {
    canonical: "https://servanisafetynets.com/terms-and-conditions/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const terms = [
  {
    title: "1. Services",
    content:
      "We provide installation and maintenance of balcony safety nets, pigeon nets, invisible grills, and related safety solutions. All services are handled by trained professionals.",
  },
  {
    title: "2. Pricing & Payment",
    content:
      "Prices may vary based on size, material, and installation area. Final pricing will be confirmed after inspection or discussion.",
  },
  {
    title: "3. Installation & Scheduling",
    content:
      "We aim for timely service, but delays may occur due to weather or site conditions. Customers must provide proper access for installation.",
  },
  {
    title: "4. Warranty",
    content:
      "Our products typically come with 3-7 years warranty depending on material. Damage due to misuse or external factors is not covered.",
  },
  {
    title: "5. Website Content",
    content:
      "All content including text, images, and branding belongs to Servani Safety Nets and cannot be reused without permission.",
  },
  {
    title: "6. Liability",
    content:
      "We are not responsible for indirect damages, delays, or external issues beyond our control.",
  },
  {
    title: "7. Updates",
    content:
      "We may update these terms anytime. Continued use of our services means acceptance of updated terms.",
  },
];

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8FAFC] text-[#475569]">
        <div className="px-6 py-20 text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-[#111827] md:text-6xl">
            Terms & Conditions
          </h1>

          <p className="mx-auto max-w-2xl leading-8 text-[#475569]">
            Please read these terms carefully before using our services. Your
            trust and transparency are important to{" "}
            <span className="font-semibold text-[#0F766E]">
              Servani Safety Nets
            </span>
            .
          </p>
        </div>

        <div className="mx-auto max-w-5xl space-y-8 px-6 pb-20">
          {terms.map((item) => (
            <section
              key={item.title}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="mb-2 text-xl font-semibold text-[#0F766E]">
                {item.title}
              </h2>
              <p className="leading-7 text-[#475569]">{item.content}</p>
            </section>
          ))}

          <section className="rounded-lg border border-[#0F766E]/20 bg-[#ECFDF5] p-6 text-center">
            <h3 className="mb-2 text-lg font-semibold text-[#111827]">
              Need Help?
            </h3>
            <p className="mb-4 text-[#475569]">
              If you have any questions about our terms, feel free to contact us.
            </p>

            <a
              href="tel:+917995792953"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#C2410C] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#9A3412]"
            >
              Call Now
            </a>
          </section>

          <p className="text-center text-xs text-[#64748B]">
            Transparent policies | Trusted service | Customer-first approach
          </p>
        </div>
      </main>

      <StickyContactIcons />
      <Footer />
    </>
  );
};

export default TermsAndConditions;
