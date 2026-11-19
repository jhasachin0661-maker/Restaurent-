import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  // If deploying to https://<user>.github.io/<repo>/, uncomment and set the repo name:
  // basePath: '/Restaurent-',

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
