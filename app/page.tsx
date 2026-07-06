import type { Metadata } from "next";
import HomePage from "./home/home";
import { siteConfig } from "./bangalore/data/serviceAreaData";
import { buildHomePageJsonLd, sanitizeJsonLd } from "./schema";

export const metadata: Metadata = {
  title: `${siteConfig.name} Bangalore`,
  description:
    `${siteConfig.name} provides home safety net installation in Bangalore.`,
  alternates: {
    canonical: `${siteConfig.baseUrl}/`,
  },
};

const Home = () => {
  const jsonLd = buildHomePageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(jsonLd),
        }}
      />
      <HomePage />
    </>
  );
}

export default Home;
