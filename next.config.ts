import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  // Repo name for GitHub Pages: https://jhasachin0661-maker.github.io/Restaurent-/
  basePath: '/Restaurent-',

  /* config options here */
  // cacheComponents disabled for static export
  // cacheComponents: true,
  // Partial Prefetching disabled for static export
  // partialPrefetching: false,

  experimental: {
    ppr: false,
  },
  partialPrefetching: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    root: ".",
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
