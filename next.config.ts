import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/booking_webapp_nullpontmuhely",
  assetPrefix: "/booking_webapp_nullpontmuhely/",
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
