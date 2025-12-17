import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cqjogkbaaqejtetxorvz.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  /* config options here */
};

module.exports = nextConfig;
