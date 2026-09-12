import axiosInstance from "@/libs/axios-instance";

// 1. Fetch All Published Blogs
export async function getBlogs({ page = 1, limit = 10, category = "", search = "", featured = "" } = {}) {
  try {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    params.append("status", "published");
    params.append("isActive", "true");
    params.append("isDeleted", "false");

    if (category && category !== "All") params.append("category", category);
    if (search) params.append("search", search);
    if (featured !== "") params.append("featured", featured);

    const response = await axiosInstance.get(`/blogs?${params.toString()}`);
    const data = response.data;

    // Safety check: Filter out deleted/inactive/draft blogs on client side
    if (data && Array.isArray(data.blogs)) {
      data.blogs = data.blogs.filter(
        (blog) =>
          !blog.isDeleted &&
          blog.isActive !== false &&
          (!blog.status || blog.status === "published")
      );
    }

    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error?.response?.data || error.message);
    return { success: false, blogs: [], pagination: {} };
  }
}

// 2. Fetch Single Blog by Slug
export async function getBlogBySlug(slug) {
  try {
    const response = await axiosInstance.get(`/blogs/slug/${slug}`);
    const data = response.data;

    // Safety check: If blog is deleted, inactive, or not published, treat as not found
    if (
      data?.blog &&
      (data.blog.isDeleted ||
        data.blog.isActive === false ||
        (data.blog.status && data.blog.status !== "published"))
    ) {
      return { success: false, blog: null };
    }

    return data;
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

