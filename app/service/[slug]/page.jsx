import ServiceUI from "./ServiceUI";
import axiosInstance from "@/libs/axios-instance";
import { notFound } from "next/navigation";

// Fetch Helper
async function getService(slug) {
  if (!slug) return null; // Guard against undefined
  try {
    const response = await axiosInstance.get(`/services/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`[Server Fetch] Error for slug "${slug}":`, error.message);
    return null;
  }
}

// ✅ Fix 1: Update generateMetadata to await params
export async function generateMetadata(props) {
  const params = await props.params; // <--- AWAIT THIS
  const service = await getService(params.slug);

  if (!service) {
    return { title: "Service Not Found | Jaya Photography" };
  }

  return {
    title: service.metaTitle || `${service.title} | Jaya Photography`,
    description: service.metaDescription || service.description?.slice(0, 160),
    openGraph: {
      title: service.metaTitle || service.title,
      description: service.metaDescription,
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