import type { MetadataRoute } from "next";
import { areas } from "./data/areasData";
import { servicesData as areaServicesData } from "./data/serviceData";
import { servicesData as solutionServicesData } from "./data/servicesData";
import { servicesData as servicePagesData } from "./servicesData/servicesData";
import { blogsData } from "./data/blogsData";

const BASE_URL = "https://servanisafetynets.com";
const lastModified = new Date("2026-06-15T00:00:00.000Z");

export const dynamic = "force-static";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");

const route = (
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"
) => ({
  url: `${BASE_URL}${path}`,
  lastModified,
  changeFrequency,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    route("/", 1, "weekly"),
    route("/about/", 0.8),
    route("/gallery/", 0.8, "weekly"),
    route("/contactUs/", 0.8),
    route("/faq/", 0.7),
    route("/blogs/", 0.7, "weekly"),
    route("/privacy-policy/", 0.3, "yearly"),
    route("/terms-and-conditions/", 0.3, "yearly"),
  ];

  const servicePages = Object.keys(servicePagesData).map((serviceId) =>
    route(`/services/${serviceId}/`, 0.9, "monthly")
  );

  const solutionPages = Object.keys(solutionServicesData).map((id) =>
    route(`/solutions/${id}/`, 0.75, "monthly")
  );

  const bangaloreServiceHubPages = Object.keys(areaServicesData).map((service) =>
    route(`/bangalore/${service}/`, 0.72, "monthly")
  );

  const blogPages = blogsData.map((blog) =>
    route(`/blogs/${blog.slug}/`, 0.65, "monthly")
  );

  const areaServicePages = areas.flatMap((area) => {
    const areaSlug = slugify(area);
    return Object.keys(areaServicesData).map((service) =>
      route(`/bangalore/${areaSlug}/${service}/`, 0.85, "monthly")
    );
  });

  return [
    ...staticPages,
    ...servicePages,
    ...solutionPages,
    ...bangaloreServiceHubPages,
    ...blogPages,
    ...areaServicePages,
  ];
}
