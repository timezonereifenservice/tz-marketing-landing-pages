import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Smaller responses / less CPU on edge of response pipeline
  poweredByHeader: false,
  compress: true,

  // Image Optimization (Vercel Image Optimization + Fluid)
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [65, 75, 85],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: false,
  },

  // Long-cache hashed static assets; keep HTML fresh for ads LPs
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/brand/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/favicon.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/lp/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/lp/getriebespuelung-koeln",
        destination: "/lp/getriebespuelung",
        permanent: true,
      },
      {
        source: "/lp/reifenservice-koeln",
        destination: "/lp/reifenservice",
        permanent: true,
      },
      {
        source: "/lp/oelwechsel-koeln",
        destination: "/lp/oelwechsel",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
