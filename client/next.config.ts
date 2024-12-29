import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.goout.net"
      },
      {
        protocol: "https",
        hostname: "rollingstoneindia.com"
      }
    ]
  }
};

export default nextConfig;
