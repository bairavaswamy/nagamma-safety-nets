import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { buildBusinessJsonLd } from "./data/businessProfile";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://servanisafetynets.com"),

  title: {
    default: "Servani Safety Nets Bangalore | Balcony Nets, Pigeon Nets & Invisible Grills",
    template: "%s | Servani Safety Nets",
  },

  description:
    "Servani Safety Nets provides balcony safety nets, pigeon nets, invisible grills, duct area nets, and industrial safety solutions in Bangalore. Affordable, durable & professional installation.",

  keywords: [
    "Safety Nets Bangalore",
    "Balcony Safety Nets Bangalore",
    "Pigeon Nets Bangalore",
    "Invisible Grills Bangalore",
    "Bird Nets Bangalore",
    "Duct Area Safety Nets",
    "Industrial Safety Nets Bangalore",
    "Servani Safety Nets",
  ],

  authors: [{ name: "Servani Safety Nets" }],
  creator: "Servani Safety Nets",
  publisher: "Servani Safety Nets",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://servanisafetynets.com",
  },

  openGraph: {
    title: "Servani Safety Nets Bangalore",
    description:
      "Top safety net services in Bangalore - balcony nets, pigeon nets, invisible grills and more. Call now for installation.",
    url: "https://servanisafetynets.com",
    siteName: "Servani Safety Nets",
    images: [
      {
        url: "https://servanisafetynets.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Servani Safety Nets Bangalore",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Servani Safety Nets Bangalore",
    description:
      "Balcony safety nets, pigeon nets & invisible grills installation in Bangalore.",
    images: ["https://servanisafetynets.com/og-image.webp"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = buildBusinessJsonLd();

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}

        {/* SEO Schema */}
        <script
          id="schema-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        {children}
      </body>
    </html>
  );
}
