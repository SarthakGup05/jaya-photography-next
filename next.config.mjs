/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // ✅ Allow Cloudinary images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**", // allow all paths from Cloudinary
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
};

export default nextConfig;
