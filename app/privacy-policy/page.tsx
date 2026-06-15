import type { Metadata } from "next";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";
import StickyContactIcons from "@/app/stickyicons/stickyIcons";
import { FaCookieBite, FaLock, FaShieldAlt, FaUserCheck } from "react-icons/fa";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Servani Safety Nets" },
  description:
    "Privacy policy for Servani Safety Nets, explaining how contact details, service inquiries, cookies, and website data are handled.",
  alternates: {
    canonical: "https://servanisafetynets.com/privacy-policy/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sections = [
  {
    title: "Information We Collect",
    icon: <FaUserCheck />,
    content:
      "We collect basic details like your name, phone number, and location when you contact us for safety net installation services in Bangalore. We may also collect non-personal data like browser type to improve our website experience.",
  },
  {
    title: "How We Use Your Information",
    icon: <FaShieldAlt />,
    content:
      "Your information is used to respond to your inquiries, provide installation services, and improve our offerings. We may share updates only with your consent.",
  },
  {
    title: "Data Protection",
    icon: <FaLock />,
    content:
      "We use secure systems and encrypted connections to help protect your personal data from unauthorized access or misuse.",
  },
  {
    title: "Cookies Policy",
    icon: <FaCookieBite />,
    content:
      "Our website may use cookies to improve user experience and understand traffic. You can disable cookies through your browser settings.",
  },
  {
    title: "Third-Party Services",
    icon: <FaShieldAlt />,
    content:
      "We may use trusted tools like Google Analytics or Ads to improve our services. These providers have their own privacy standards and policies.",
  },
  {
    title: "Your Consent",
    icon: <FaUserCheck />,
    content:
      "By using our website, you agree to our privacy practices and data usage as described in this policy.",
  },
];

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8FAFC] px-6 py-20 text-[#475569] md:px-12">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-[#111827] md:text-6xl">
            Privacy Policy
          </h1>

          <p className="text-base leading-8 md:text-lg">
            Your privacy matters to{" "}
            <span className="font-semibold text-[#0F766E]">
              Servani Safety Nets
            </span>
            . We are committed to protecting your data while providing safe and
            reliable services in Bangalore.
          </p>

          <p className="mt-4 text-xs text-[#64748B]">
            Last updated: June 15, 2026
          </p>
        </div>

        <div className="mx-auto max-w-5xl space-y-8">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="text-xl text-[#0F766E]">{section.icon}</span>
                <h2 className="text-xl font-semibold text-[#111827]">
                  {section.title}
                </h2>
              </div>

              <p className="text-sm leading-7 text-[#475569]">
                {section.content}
              </p>
            </section>
          ))}

          <section className="mt-12 text-center">
            <h2 className="mb-3 text-xl font-semibold text-[#111827]">
              Contact Us
            </h2>

            <p className="text-[#475569]">
              If you have any questions about this Privacy Policy, contact us at
            </p>

            <a
              href="mailto:servanienterprise@gmail.com"
              className="font-semibold text-[#0F766E] underline-offset-4 hover:underline"
            >
              servanienterprise@gmail.com
            </a>
          </section>

          <p className="mt-10 text-center text-xs text-[#64748B]">
            Trusted by Bangalore customers | Safe | Secure | Reliable
          </p>
        </div>
      </main>

      <StickyContactIcons />
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
