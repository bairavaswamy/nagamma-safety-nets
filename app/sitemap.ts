import type { MetadataRoute } from "next";
import {
  getReadyServiceAreaPages,
  getServicePath,
  services,
  siteConfig,
} from "./bangalore/data/serviceAreaData";

export const dynamic = "force-static";

const route = (
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"
) => ({
  url: `${siteConfig.baseUrl}${path}`,
  lastModified: new Date(),
  changeFrequency,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    route("/", 1, "weekly"),
    route("/about/", 0.8, "monthly"),
    route("/gallery/", 0.8, "monthly"),
    route("/contact-us/", 0.8, "monthly"),
    route("/bangalore/", 0.95, "weekly"),
    ...services.map((service) => route(getServicePath(service.slug), 0.9)),
    ...getReadyServiceAreaPages().map((page) => route(page.path, 0.85)),
  ];
}
