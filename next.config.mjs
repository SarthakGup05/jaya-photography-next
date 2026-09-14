/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // ✅ Image Optimization Config
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320, 384, 450, 512],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
  },

  // 301 Redirects mapping from 301 Redirect Mapping.xlsx
  async redirects() {
    return [
      {
        source: "/service/professional-fashion-photography",
        destination: "/service/fashion-photographer-lucknow",
        permanent: true,
      },
      {
        source: "/service/family-portrait",
        destination: "/service/family-photoshoot",
        permanent: true,
      },
      {
        source: "/service/theme-photoshoot-lucknow-",
        destination: "/service/theme-photoshoot-lucknow",
        permanent: true,
      },
      {
        source: "/service/half-day-one-day-photoshoot-lucknow-",
        destination: "/",
        permanent: true,
      },
      {
        source: "/service/toddler-beyond-photoshoot-lucknow",
        destination: "/service/toddler-photoshoot-lucknow",
        permanent: true,
      },
      {
        source: "/services/baby-photography",
        destination: "/",
        permanent: true,
      },
      {
        source: "/services/family-photography",
        destination: "/service/family-photoshoot",
        permanent: true,
      },
      {
        source: "/services/fashion-photography",
        destination: "/service/fashion-photographer-lucknow",
        permanent: true,
      },
      {
        source: "/services/maternity-photography",
        destination: "/service/maternity-photoshoot-lucknow",
        permanent: true,
      },
    ];
  },

  // ✅ Reverse proxy to bypass CORS in browser
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://oriera-admin-main-1.onrender.com/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
