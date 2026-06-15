import type { Metadata } from "next";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Navbar from "../navbar/Navbar";
import ContactForm from "./formValidation";
import { ImLocation2 } from "react-icons/im";
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { RiTimeLine } from "react-icons/ri";
import Footer from "../footer/Footer";
import StickyContactIcons from "../stickyicons/stickyIcons";
import { businessProfile, businessReference } from "../data/businessProfile";

export const metadata: Metadata = {
  title: { absolute: "Contact Servani Safety Nets Bangalore | Call Now" },
  description:
    "Contact Servani Safety Nets in Bangalore for balcony safety nets, pigeon nets, invisible grills, cloth hangers, and quick site quotes.",
  alternates: {
    canonical: "https://servanisafetynets.com/contactUs/",
  },
  openGraph: {
    title: "Contact Servani Safety Nets Bangalore",
    description:
      "Call or message Servani Safety Nets for measured safety net and invisible grill installation quotes in Bangalore.",
    url: "https://servanisafetynets.com/contactUs/",
    siteName: "Servani Safety Nets",
    type: "website",
    locale: "en_IN",
  },
};

const ContactUs = () => {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${businessProfile.baseUrl}/contactUs/#contact`,
    url: `${businessProfile.baseUrl}/contactUs/`,
    name: "Contact Servani Safety Nets Bangalore",
    description:
      "Contact Servani Safety Nets for safety nets, pigeon protection, invisible grills, cloth hangers, and installation quotes in Bangalore.",
    inLanguage: "en-IN",
    about: businessReference,
    mainEntity: businessReference,
  };

  return (
    <>
      <Navbar />

      <main className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-[#F8FAFC] px-6 py-24">
        <script
          id="contact-page-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
        />

        <div className="relative z-10 mb-14 max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[#111827] md:text-5xl">
            Contact Servani Safety Nets
          </h1>

          <p className="text-lg leading-relaxed text-[#475569]">
            Have questions or need help? We are here to assist you with{" "}
            <span className="font-medium text-[#111827]">
              safety nets, pigeon protection, and invisible grills
            </span>
            . Reach out anytime and we will respond quickly.
          </p>
        </div>

        <div className="relative z-10 grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-[#0F766E]">
              Get in Touch
            </h2>

            <div className="space-y-5 text-[15px] text-[#475569] md:text-base">
              <p className="flex items-start gap-3">
                <ImLocation2 className="mt-1 text-[#0F766E]" size={22} />
                <span>
                  <strong className="text-[#111827]">Address:</strong>
                  <br />
                  {businessProfile.address.streetAddress},
                  <br />
                  {businessProfile.address.addressLocality} -{" "}
                  {businessProfile.address.postalCode}
                </span>
              </p>

              <p className="flex items-center gap-3">
                <FiPhoneCall className="text-[#0F766E]" size={22} />
                <span>
                  <strong className="text-[#111827]">Phone:</strong>{" "}
                  {businessProfile.displayPhone}
                </span>
              </p>

              <p className="flex items-center gap-3">
                <AiOutlineMail className="text-[#0F766E]" size={22} />
                <span>
                  <strong className="text-[#111827]">Email:</strong>{" "}
                  {businessProfile.email}
                </span>
              </p>

              <p className="flex items-start gap-3">
                <RiTimeLine className="text-[#0F766E]" size={22} />
                <span>
                  <strong className="text-[#111827]">Hours:</strong>
                  <br />
                  Mon - Sat (9:00 AM - 7:00 PM)
                </span>
              </p>
            </div>

            <div className="mt-10">
              <h3 className="mb-3 text-lg font-semibold text-[#0F766E]">
                Follow Us
              </h3>

              <div className="flex flex-col gap-6 text-[#475569] sm:flex-row">
                <a
                  href={businessProfile.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition hover:text-[#0F766E]"
                >
                  <FaFacebook size={22} /> Facebook
                </a>

                <a
                  href={businessProfile.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition hover:text-[#0F766E]"
                >
                  <FaInstagram size={22} /> Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>

        <div className="relative z-10 mt-20 w-full max-w-6xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-[#0F766E]">
            Find Us Here
          </h2>

          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <iframe
              title="Servani Safety Nets Location"
              src={businessProfile.mapEmbedUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              className="w-full"
            />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-center">
            <a
              href={businessProfile.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#C2410C] px-6 py-2 font-semibold text-white shadow-sm transition hover:bg-[#9A3412]"
            >
              Get Directions
            </a>
            <a
              href={businessProfile.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#0F766E] bg-white px-6 py-2 font-semibold text-[#0F766E] shadow-sm transition hover:bg-teal-50"
            >
              Google Profile
            </a>
          </div>
        </div>

        <div className="relative z-10 mt-20 max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-[#111827] md:text-3xl">
            Need Safety Solutions Today?
          </h2>

          <p className="mb-6 leading-relaxed text-[#475569]">
            Contact{" "}
            <span className="font-semibold text-[#0F766E]">
              Servani Safety Nets
            </span>{" "}
            for fast, reliable installation of safety nets, pigeon protection,
            and invisible grills.
          </p>

          <a
            href="tel:+917995792953"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#C2410C] px-8 py-3 font-bold text-white shadow-sm transition hover:bg-[#9A3412]"
          >
            Call Now
          </a>
        </div>
      </main>

      <StickyContactIcons />
      <Footer />
    </>
  );
};

export default ContactUs;
