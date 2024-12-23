import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
    ],
  },
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "ts", "jsx", "tsx", "mdx"],
};

export default nextConfig;
