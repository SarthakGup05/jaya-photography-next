import axios from "axios";

const SITE_URL = "https://jayaphotography.in";

export default async function sitemap() {
  const staticRoutes = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/service`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/packages`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const apiURL = process.env.NEXT_PUBLIC_API_URL || "https://oriera-admin-main-1.onrender.com/api/v1";
  const dynamicRoutes = [];

  // Fetch active services
  try {
    const servicesRes = await axios.get(`${apiURL}/services/get-services`, {
      params: { isActive: "true", sortBy: "sortOrder", sortOrder: "asc" },
      timeout: 5000,
    });
    const services = servicesRes.data || [];
    const serviceRoutes = services
      .filter((service) => service && service.slug && service.isActive !== false)
      .map((service) => ({
        url: `${SITE_URL}/service/${service.slug}`,
        lastModified: service.updatedAt ? new Date(service.updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));
    dynamicRoutes.push(...serviceRoutes);
  } catch (e) {
    console.warn("Sitemap services fetch warning:", e.message);
  }

  // Fetch active blog posts
  try {
    const blogsRes = await axios.get(`${apiURL}/blogs`, {
      params: { status: "published", isActive: "true", isDeleted: "false" },
      timeout: 5000,
    });
    const blogs = blogsRes.data?.blogs || [];
    const blogRoutes = blogs
      .filter((blog) => blog && blog.slug)
      .map((blog) => ({
        url: `${SITE_URL}/blogs/${blog.slug}`,
        lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      }));
    dynamicRoutes.push(...blogRoutes);
  } catch (e) {
    console.warn("Sitemap blogs fetch warning:", e.message);
  }

  // Fallback blog routes if API didn't return any
  if (!dynamicRoutes.some((r) => r.url.includes("/blogs/"))) {
    const fallbackBlogSlugs = [
      "newborn-photography-session-preparation-guide",
      "maternity-photoshoot-outfit-and-styling-tips",
      "baby-milestones-cake-smash-photoshoot-ideas",
      "family-portrait-photography-lucknow-tips",
    ];
    fallbackBlogSlugs.forEach((slug) => {
      dynamicRoutes.push({
        url: `${SITE_URL}/blogs/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });
  }

  return [...staticRoutes, ...dynamicRoutes];
}
