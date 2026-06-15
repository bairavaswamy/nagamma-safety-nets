import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogDetailsClient from "./BlogDetailsClient";
import { blogsData } from "@/app/data/blogsData";
import { businessProfile, businessReference } from "@/app/data/businessProfile";

const BASE_URL = "https://servanisafetynets.com";

// ✅ STATIC PATHS
export async function generateStaticParams() {
  return blogsData.map((blog) => ({
    slug: blog.slug,
  }));
}

// ✅ SEO METADATA (FIXED FOR ASYNC PARAMS)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const blog = blogsData.find((b) => b.slug === slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Servani Safety Nets",
      robots: { index: false, follow: false },
    };
  }

  const url = `${BASE_URL}/blogs/${slug}`;

  const cleanContent = blog.content
    .replace(/<[^>]*>/g, "") // remove HTML
    .replace(/\n/g, " ");

  const title = `${blog.title} | Safety Nets in Bangalore`;

  const description =
    cleanContent.slice(0, 150) +
    " Professional safety nets installation in Bangalore.";

  return {
    title,
    description,

    keywords: [
      "safety nets Bangalore",
      "balcony safety nets Bangalore",
      "pigeon nets Bangalore",
      "invisible grills Bangalore",
      blog.title,
    ],

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "Servani Safety Nets",
      images: [
        {
          url: blog.image.startsWith("http")
            ? blog.image
            : `${BASE_URL}${blog.image}`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        blog.image.startsWith("http")
          ? blog.image
          : `${BASE_URL}${blog.image}`,
      ],
    },

    robots: {
      index: true,
      follow: true,
    },

    metadataBase: new URL(BASE_URL),
  };
}

// ✅ PAGE COMPONENT (FIXED 404 ISSUE)
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = blogsData.find((b) => b.slug === slug);

  if (!blog) return notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    image: blog.image.startsWith("http")
      ? blog.image
      : `${BASE_URL}${blog.image}`,
    author: {
      "@type": "Organization",
      "@id": businessProfile.businessId,
      name: businessProfile.name,
    },
    publisher: businessReference,
    datePublished: blog.date,
    description: blog.content.replace(/<[^>]*>/g, "").slice(0, 150),
    mainEntityOfPage: `${BASE_URL}/blogs/${slug}`,
  };

  return (
    <>
      {/* ✅ JSON-LD SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <BlogDetailsClient blog={blog} />
    </>
  );
}
