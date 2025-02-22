import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
  images: {
    domains: ['kate-server-bucket.s3.amazonaws.com'],
  },
};

export default nextConfig;
