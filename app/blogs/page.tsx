import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";
import StickyContactIcons from "@/app/stickyicons/stickyIcons";
import { blogsData } from "@/app/data/blogsData";

export const metadata: Metadata = {
  title: { absolute: "Safety Nets Blog Bangalore | Servani" },
  description:
    "Read Bangalore safety net guides for balcony nets, pigeon control, invisible grills, pet safety, pricing, and installation planning.",
  alternates: {
    canonical: "https://servanisafetynets.com/blogs/",
  },
  openGraph: {
    title: "Safety Nets Blog Bangalore | Servani",
    description:
      "Guides for balcony safety nets, pigeon nets, invisible grills, pet safety, and installation planning in Bangalore.",
    url: "https://servanisafetynets.com/blogs/",
    siteName: "Servani Safety Nets",
    type: "website",
    locale: "en_IN",
  },
};

const BlogsPage = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">
        <section className="px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
            Articles
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#111827] md:text-6xl">
            Safety Nets Blog
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#475569]">
            Expert tips and insights on balcony safety nets, pigeon protection,
            invisible grills, and modern home safety solutions in Bangalore.
          </p>

          <p className="mt-4 text-sm text-[#64748B]">
            Updated regularly | Trusted by Bangalore customers
          </p>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-3">
          {blogsData.map((blog) => (
            <article
              key={blog.slug}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-[#0F766E]/40"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <span className="absolute left-3 top-3 rounded-full bg-[#C2410C] px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  {blog.badge}
                </span>
              </div>

              <div className="flex min-h-[260px] flex-col justify-between p-5">
                <div>
                  <h2 className="mb-2 text-lg font-bold text-[#111827]">
                    {blog.title}
                  </h2>

                  <p className="mb-2 text-xs text-[#64748B]">
                    {blog.displayDate}
                  </p>

                  <p className="line-clamp-3 text-sm leading-6 text-[#475569]">
                    {blog.description}
                  </p>
                </div>

                <Link
      prefetch={false}
                  href={`/blogs/${blog.slug}`}
                  className="mt-4 inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#C2410C] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#9A3412]"
                >
                  Read Article
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="px-6 pb-20 text-center">
          <h3 className="mb-3 text-2xl font-bold text-[#111827]">
            Need Safety Solutions for Your Home?
          </h3>
          <p className="mb-6 text-[#475569]">
            Get expert consultation and installation from Servani Safety Nets.
          </p>

          <a
            href="tel:+917995792953"
            className="inline-flex min-h-[44px] items-center rounded-lg bg-[#C2410C] px-6 py-3 font-semibold text-white transition hover:bg-[#9A3412]"
          >
            Call Now
          </a>
        </section>
      </main>

      <StickyContactIcons />
      <Footer />
    </>
  );
};

export default BlogsPage;
