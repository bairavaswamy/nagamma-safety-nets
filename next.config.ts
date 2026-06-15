import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  trailingSlash: true,
  output: "export",
};

export default nextConfig;
