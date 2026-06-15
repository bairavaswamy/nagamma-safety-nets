import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";
import { businessProfile, businessReference } from "../data/businessProfile";

export const metadata: Metadata = {
  title: { absolute: "Safety Net Installation Gallery Bangalore | Servani" },
  description:
    "View safety net, pigeon net, HDPE net, transparent net, and invisible grill installation photos from Bangalore homes and apartments.",
  alternates: {
    canonical: "https://servanisafetynets.com/gallery/",
  },
  openGraph: {
    title: "Safety Net Installation Gallery Bangalore | Servani",
    description:
      "Real installation photos for balcony safety nets, pigeon nets, transparent nets, HDPE nets, and invisible grills in Bangalore.",
    url: "https://servanisafetynets.com/gallery/",
    siteName: "Servani Safety Nets",
    type: "website",
    locale: "en_IN",
  },
};

export default function GalleryPage() {
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${businessProfile.baseUrl}/gallery/#gallery`,
    url: `${businessProfile.baseUrl}/gallery/`,
    name: "Safety Net Installation Gallery Bangalore",
    description:
      "Installation photos for balcony safety nets, pigeon nets, transparent nets, HDPE nets, and invisible grills in Bangalore.",
    inLanguage: "en-IN",
    publisher: businessReference,
    associatedMedia: [
      "balcony-safety-nets-bangalore",
      "transparent-safety-nets-bangalore",
      "invisible-grills-bangalore",
      "hdpe-nets-bangalore",
    ].map((category) => ({
      "@type": "ImageObject",
      contentUrl: `${businessProfile.baseUrl}/gallery/${category}-1.webp`,
      name: `${category.replaceAll("-", " ")} installation in Bangalore`,
    })),
  };

  return (
    <>
      <script
        id="gallery-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />
      <GalleryClient />
    </>
  );
}
