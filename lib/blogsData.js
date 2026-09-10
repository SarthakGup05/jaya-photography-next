import axiosInstance from "@/libs/axios-instance";

// 1. Fetch All Published Blogs
export async function getBlogs({ page = 1, limit = 10, category = "", search = "", featured = "" } = {}) {
  try {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    params.append("status", "published");
    params.append("isActive", "true");

    if (category && category !== "All") params.append("category", category);
    if (search) params.append("search", search);
    if (featured !== "") params.append("featured", featured);

    const response = await axiosInstance.get(`/blogs?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error?.response?.data || error.message);
    return { success: false, blogs: [], pagination: {} };
  }
}

// 2. Fetch Single Blog by Slug
export async function getBlogBySlug(slug) {
  try {
    const response = await axiosInstance.get(`/blogs/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog by slug (${slug}):`, error?.response?.data || error.message);
    return { success: false, blog: null };
  }
}

// 3. Fetch Featured Blogs Only
export async function getFeaturedBlogs(limit = 3) {
  return getBlogs({ limit, featured: "true" });
}

// 4. Fetch All Blog Categories
export async function getBlogCategories() {
  try {
    const response = await axiosInstance.get("/blogs/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching blog categories:", error?.response?.data || error.message);
    return { success: false, categories: [] };
  }
}
