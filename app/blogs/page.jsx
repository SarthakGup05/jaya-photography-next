import BlogsUI from "./BlogsUI";
import { getBlogs, getBlogCategories } from "@/lib/blogsData";

export const metadata = {
  title: "Blog & Photography Tips | Jaya Photography Lucknow",
  description: "Read expert photography tips for newborn sessions, maternity photoshoots, baby milestones, and family portraits in Lucknow by Jaya Agnihotri.",
  openGraph: {
    title: "Blog & Photography Tips | Jaya Photography Lucknow",
    description: "Read expert photography tips for newborn sessions, maternity photoshoots, baby milestones, and family portraits.",
    images: ["https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1200&auto=format&fit=crop"],
  },
};

export default async function BlogsPage() {
  const [blogsData, categoriesData] = await Promise.all([
    getBlogs({ limit: 20 }),
    getBlogCategories(),
  ]);

  const initialBlogs = blogsData?.blogs || [];
  const categories = categoriesData?.categories || [];

  return <BlogsUI initialBlogs={initialBlogs} categoriesList={categories} />;
}
