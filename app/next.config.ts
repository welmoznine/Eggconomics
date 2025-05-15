import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.kroger.com", 
        pathname: "/product/images/**", 
      },
    ],
  },
};

export default nextConfig;
