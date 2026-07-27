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
  ];

  try {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || "https://backend.jayaphotography.in/api/v1";
    
    // Fetch all active services
    const response = await axios.get(`${apiURL}/services/get-services`, {
      params: { isActive: "true", sortBy: "sortOrder", sortOrder: "asc" },
      timeout: 10000, // 10-second timeout
    });

    const services = response.data || [];
    
    const dynamicRoutes = services
      .filter((service) => service && service.slug && service.isActive !== false)
      .map((service) => ({
        url: `${SITE_URL}/service/${service.slug}`,
        lastModified: service.updatedAt ? new Date(service.updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error("[Sitemap Generation Error] Falling back to static routes:", error.message);
    return staticRoutes;
  }
}
