import type { Metadata } from "next";
import HomePage from "./home/home";
import { siteConfig } from "./bangalore/data/serviceAreaData";

export const metadata: Metadata = {
  title: `${siteConfig.name} Bangalore`,
  description:
    `${siteConfig.name} provides home safety net installation in Bangalore.`,
  alternates: {
    canonical: `${siteConfig.baseUrl}/`,
  },
};

const Home = () => {
  return <HomePage />;
}

export default Home;
