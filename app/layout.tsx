import "./globals.css";
import type { Metadata } from "next";
import { siteConfig } from "./bangalore/data/serviceAreaData";
import { buildRootJsonLd, sanitizeJsonLd } from "./schema";
import ContactCta from "./components/ContactCta";
import FloatingContactButtons from "./components/FloatingContactButtons";
import FloatingNavbar from "./components/FloatingNavbar";
import SiteFooter from "./components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),

  title: {
    default: `${siteConfig.name} Bangalore`,
    template: `%s | ${siteConfig.name}`,
  },

  description:
    `${siteConfig.name} provides home safety net installation in Bangalore.`,

  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

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
    canonical: siteConfig.baseUrl,
  },

  openGraph: {
    title: `${siteConfig.name} Bangalore`,
    description: "Home safety net installation in Bangalore.",
    url: siteConfig.baseUrl,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Bangalore`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} Bangalore`,
    description: "Home safety net installation in Bangalore.",
    images: [`${siteConfig.baseUrl}/og-image.png`],
  },

  icons: {
    icon: [
      {
        url: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: "/favicon-red.ico",
        type: "image/x-icon",
      },
    ],
    shortcut: "/favicon-red.ico",
    apple: [
      {
        url: "/apple-touch-icon-red.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootJsonLd = buildRootJsonLd();

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-gradient-to-br from-[#FBFAFA] via-[#F8EFEF] to-[#EEF1F3] text-[#172129] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: sanitizeJsonLd(rootJsonLd),
          }}
        />
        <FloatingNavbar />
        <FloatingContactButtons />
        {children}
        <ContactCta />
        <SiteFooter />
      </body>
    </html>
  );
}
