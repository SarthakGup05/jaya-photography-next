import ServicesCatalogUI from "./ServicesCatalogUI";
import axiosInstance from "@/libs/axios-instance";
import { FALLBACK_SERVICES, enrichServiceData } from "@/lib/servicesData";

export const revalidate = 60;

export const metadata = {
  title: "Fine-Art Photography Services Lucknow | Newborn, Maternity & Family | Jaya Photography",
  description:
    "Explore luxury photography services by Jaya Photography in Sushant Golf City, Lucknow. Safety-first newborn milestones, maternity fine-art portraits, and timeless family collections.",
  keywords: [
    "photography services lucknow",
    "baby photoshoot lucknow",
    "newborn photography lucknow",
    "maternity photoshoot lucknow",
    "family portraits lucknow",
    "jaya photography lucknow",
  ],
  alternates: {
    canonical: "https://jayaphotography.in/service",
  },
  openGraph: {
    title: "Fine-Art Photography Services in Lucknow | Jaya Photography",
    description:
      "Safety-certified luxury newborn, maternity, baby milestone, and family photography studio in Sushant Golf City, Lucknow.",
    url: "https://jayaphotography.in/service",
  },
};

async function getServices() {
  try {
    const response = await axiosInstance.get("/services/get-services");
    const rawServices = response.data?.services || response.data;
    if (Array.isArray(rawServices) && rawServices.length > 0) {
      const active = rawServices.filter((s) => s.isActive !== false);
      return active.map((s) => enrichServiceData(s));
    }
  } catch (error) {
    console.warn("[Services Directory] API fetch failed, utilizing enriched fallback list:", error.message);
  }

  return FALLBACK_SERVICES.map((s) => enrichServiceData(s));
}

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesCatalogUI initialServices={services} />;
}
