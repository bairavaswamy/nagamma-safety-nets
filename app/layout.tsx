import "./globals.css";
import type { Metadata } from "next";
import { siteConfig } from "./bangalore/data/serviceAreaData";
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
        url: `${siteConfig.baseUrl}/og-image.webp`,
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
    images: [`${siteConfig.baseUrl}/og-image.webp`],
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
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <FloatingNavbar />
        <div className="pt-24">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
