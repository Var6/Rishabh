import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "opengraph.githubassets.com" },
      { protocol: "https", hostname: "cdninstagram.com" },
      { protocol: "https", hostname: "scontent.cdninstagram.com" },
      { protocol: "https", hostname: "scontent-bom1-1.cdninstagram.com" },
      { protocol: "https", hostname: "scontent-bom1-2.cdninstagram.com" },
      { protocol: "https", hostname: "scontent-del1-1.cdninstagram.com" },
      { protocol: "https", hostname: "scontent-sin6-1.cdninstagram.com" },
    ],
  },
};

export default nextConfig;
