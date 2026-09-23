import ServiceUI from "./ServiceUI";
import axiosInstance from "@/libs/axios-instance";
import { getFallbackServiceBySlug, enrichServiceData } from "@/lib/servicesData";
import { notFound } from "next/navigation";

export const revalidate = 60;

// Fetch Helper with API
async function getService(slug) {
  if (!slug) return null; // Guard against undefined

  let serviceData = null;

  try {
    const serviceRes = await axiosInstance.get(`/services/slug/${slug}`);
    const data = serviceRes.data?.service || serviceRes.data;
    if (data && (data.title || data.slug)) {
      serviceData = data;
    }
  } catch (error) {
    console.warn(`[Server Fetch] API error for slug "${slug}":`, error.message);
  }

  if (serviceData) {
    return enrichServiceData(serviceData);
  }

  // Fallback lookup
  const fallback = getFallbackServiceBySlug(slug);
  if (fallback) {
    return enrichServiceData(fallback);
  }

  return null;
}

// ✅ Fix 1: Update generateMetadata to await params
export async function generateMetadata(props) {
  const params = await props.params;
  const service = await getService(params.slug);

  if (!service) {
    return { title: { absolute: "Service Not Found | Jaya Photography" } };
  }

  const serviceSlug = service.slug || params.slug;
  const metaTitle = service.metaTitle || service.meta_title || `${service.title} | Jaya Photography Lucknow`;
  const metaDescription = service.metaDescription || service.meta_description || service.description?.slice(0, 160);
  
  const rawKeywords = service.metaKeywords || service.keywords || service.meta_keywords;
  let keywords = [];
  if (Array.isArray(rawKeywords) && rawKeywords.length > 0) {
    keywords = rawKeywords;
  } else if (typeof rawKeywords === "string" && rawKeywords.trim()) {
    keywords = rawKeywords.split(",").map((k) => k.trim()).filter(Boolean);
  } else {
    keywords = [service.title, `${service.title} lucknow`, "jaya photography lucknow"];
  }

  return {
    title: {
      absolute: metaTitle,
    },
    description: metaDescription,
    keywords: keywords,
    alternates: {
      canonical: `https://jayaphotography.in/service/${serviceSlug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `https://jayaphotography.in/service/${serviceSlug}`,
      images: [service.mainImage || service.coverImage],
    },
  };
}

// ✅ Fix 2: Update Page Component to await params
export default async function ServicePage(props) {
  const params = await props.params; // <--- AWAIT THIS
  const service = await getService(params.slug);

  if (!service) {
    return notFound();
  }

  return <ServiceUI service={service} />;
}