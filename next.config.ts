import type { NextConfig } from "next";

// next.config.js
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // disables ESLint errors from breaking build
  },
};

export default nextConfig;
