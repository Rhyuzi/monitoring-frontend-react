import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // This option tells Next.js to ignore ESLint errors during production builds
    ignoreDuringBuilds: true,
  },
  
};

export default nextConfig;
