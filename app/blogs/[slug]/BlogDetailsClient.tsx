import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";
import StickyContactIcons from "@/app/stickyicons/stickyIcons";

export default function BlogDetailsClient({
  blog,
}: {
  blog: { title: string; displayDate: string; image: string; content: string };
}) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8FAFC] text-[#475569]">
        <section className="px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
            Servani Safety Nets
          </p>
          <h1 className="mx-auto mt-3 max-w-4xl text-3xl font-extrabold tracking-tight text-[#111827] md:text-5xl">
            {blog.title}
          </h1>

          <p className="mt-4 text-sm text-[#64748B]">
            Published on {blog.displayDate} | Servani Safety Nets
          </p>
        </section>

        <article className="mx-auto max-w-4xl px-6 pb-20">
          <div className="relative mb-10 h-80 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>

          <p className="mb-8 text-lg leading-8 text-[#475569]">
            Looking for safety solutions in Bangalore? In this guide, we explain
            what matters when comparing{" "}
            <span className="font-semibold text-[#0F766E]">
              balcony safety nets, pigeon nets, and invisible grills
            </span>{" "}
            for homes, children, and pets.
          </p>

          <div className="whitespace-pre-line rounded-lg border border-slate-200 bg-white p-6 leading-8 text-[#475569] shadow-sm md:p-8">
            {blog.content}
          </div>

          <section className="mt-12 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-[#0F766E]">
              Related Safety Services
            </h2>

            <div className="grid gap-4 text-sm sm:grid-cols-2">
              <Link
      prefetch={false}
                href="/services/balcony-safety-nets-in-bangalore"
                className="font-medium text-[#0F766E] hover:underline"
              >
                Balcony Safety Nets in Bangalore
              </Link>
              <Link
      prefetch={false}
                href="/services/pigeon-safety-nets-in-bangalore"
                className="font-medium text-[#0F766E] hover:underline"
              >
                Pigeon Safety Nets Installation
              </Link>
              <Link
      prefetch={false}
                href="/services/invisible-grills-in-bangalore"
                className="font-medium text-[#0F766E] hover:underline"
              >
                Invisible Grills for Apartments
              </Link>
              <Link
      prefetch={false}
                href="/services/children-safety-nets-in-bangalore"
                className="font-medium text-[#0F766E] hover:underline"
              >
                Child Safety Nets
              </Link>
            </div>
          </section>

          <section className="mt-16 rounded-lg border border-[#0F766E]/20 bg-[#ECFDF5] p-8 text-center">
            <h3 className="mb-3 text-2xl font-bold text-[#111827]">
              Need Professional Installation?
            </h3>

            <p className="mb-6 text-[#475569]">
              Get safety net installation in Bangalore with durable materials
              and trusted service.
            </p>

            <a
              href="tel:+917995792953"
              className="inline-flex min-h-[44px] items-center rounded-lg bg-[#C2410C] px-6 py-3 font-semibold text-white transition hover:bg-[#9A3412]"
            >
              Call Now
            </a>
          </section>

          <section className="mt-16">
            <h2 className="mb-4 text-xl font-semibold text-[#0F766E]">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 text-sm leading-7 text-[#475569]">
              <p>
                <strong className="text-[#111827]">
                  Are balcony safety nets durable?
                </strong>
                <br />
                Yes, high-quality HDPE safety nets last 3-5 years and resist
                weather conditions.
              </p>

              <p>
                <strong className="text-[#111827]">
                  Do safety nets block airflow?
                </strong>
                <br />
                No, they are designed to allow air and light while providing
                protection.
              </p>

              <p>
                <strong className="text-[#111827]">
                  How fast is installation?
                </strong>
                <br />
                Most installations are completed within a few hours.
              </p>
            </div>
          </section>
        </article>
      </main>

      <StickyContactIcons />
      <Footer />
    </>
  );
}
