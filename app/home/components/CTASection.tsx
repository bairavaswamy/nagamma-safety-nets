import Link from "next/link";

const CTASection = () => {
  return (
    <section className="bg-[#ECFDF5] px-6 py-20 text-center">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-5 text-4xl font-extrabold leading-tight text-[#111827] md:text-5xl">
          Protect Your Family Today
        </h2>

        <p className="mb-6 text-base leading-8 text-[#475569] md:text-lg">
          Get professional safety nets and invisible grills in Bangalore.
          Strong materials, measured installation, and long-lasting protection.
        </p>

        <p className="mb-8 text-sm font-medium text-[#0F766E]">
          Same-day installation may be possible after measurement.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="tel:+917995792953"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#C2410C] px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-[#9A3412]"
          >
            Call Now
          </a>

          <a
            href="https://wa.me/917995792953"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#0F766E]/30 bg-white px-8 py-3 font-semibold text-[#0F766E] transition hover:bg-[#F8FAFC]"
          >
            WhatsApp
          </a>

          <Link
      prefetch={false}
            href="/contactUs"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#0F766E]/30 bg-white px-8 py-3 font-semibold text-[#0F766E] transition hover:bg-[#F8FAFC]"
          >
            Get Consultation
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-[#475569]">
          <span>Safety-focused fitting</span>
          <span>Expert installation</span>
          <span>4.9 rating</span>
          <span>5000+ homes protected</span>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
