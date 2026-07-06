import type { MetadataRoute } from "next";
import {
  getReadyServiceAreaPages,
  getServicePath,
  services,
  siteConfig,
} from "./bangalore/data/serviceAreaData";
import { galleryData } from "./home/data/homeData";

export const dynamic = "force-static";

const route = (
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  images: string[] = []
) => ({
  url: `${siteConfig.baseUrl}${path}`,
  lastModified: new Date(),
  changeFrequency,
  priority,
  ...(images.length
    ? {
        images: images.map((image) =>
          image.startsWith("http") ? image : `${siteConfig.baseUrl}${image}`
        ),
      }
    : {}),
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    route(
      "/",
      1,
      "weekly",
      galleryData.map((item) => item.image)
    ),
    route("/about/", 0.8, "monthly"),
    route(
      "/gallery/",
      0.8,
      "monthly",
      galleryData.map((item) => item.image)
    ),
    route("/contact-us/", 0.8, "monthly"),
    route(
      "/bangalore/",
      0.95,
      "weekly",
      services.map((service) => `/home-generated/cards/${service.slug}.webp`)
    ),
    ...services.map((service) =>
      route(getServicePath(service.slug), 0.9, "monthly", [
        `/home-generated/cards/${service.slug}.webp`,
      ])
    ),
    ...getReadyServiceAreaPages().map((page) =>
      route(page.path, 0.85, "monthly", [
        `/home-generated/cards/${page.service.slug}.webp`,
      ])
    ),
  ];
}
