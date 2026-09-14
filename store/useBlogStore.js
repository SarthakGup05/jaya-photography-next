import { create } from "zustand";
import { getBlogs, getBlogCategories } from "@/lib/blogsData";

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache TTL

export const useBlogStore = create((set, get) => ({
  blogs: [],
  categories: ["All"],
  selectedCategory: "All",
  searchQuery: "",
  isLoading: false,
  isInitialized: false,
  lastFetched: null,

  // Seed store with SSR or component initial props if store empty
  setInitialData: ({ blogs = [], categoriesList = [] }) => {
    const { isInitialized, blogs: existingBlogs } = get();
    if (!isInitialized || existingBlogs.length === 0) {
      const catsSet = new Set(["All", ...categoriesList]);
      blogs.forEach((b) => {
        if (b.category) catsSet.add(b.category);
      });

      set({
        blogs,
        categories: Array.from(catsSet),
        isInitialized: true,
        lastFetched: Date.now(),
      });
    }
  },

  // Set Search Query
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Set Selected Category
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  // Reset Search & Category
  resetFilters: () => set({ searchQuery: "", selectedCategory: "All" }),

  // Asynchronous Fetching & Caching
  fetchBlogs: async (force = false) => {
    const { lastFetched, isLoading, isInitialized } = get();
    const now = Date.now();

    if (!force && isInitialized && lastFetched && now - lastFetched < CACHE_TTL_MS) {
      return; // Return cached store data instantly
    }

    set({ isLoading: true });

    try {
      const [blogsRes, catsRes] = await Promise.all([
        getBlogs({ limit: 30 }),
        getBlogCategories(),
      ]);

      const fetchedBlogs = blogsRes?.blogs || [];
      const fetchedCats = catsRes?.categories || [];

      const catsSet = new Set(["All", ...fetchedCats]);
      fetchedBlogs.forEach((b) => {
        if (b.category) catsSet.add(b.category);
      });

      set({
        blogs: fetchedBlogs,
        categories: Array.from(catsSet),
        isInitialized: true,
        isLoading: false,
        lastFetched: now,
      });
    } catch (err) {
      console.error("Error updating blog store:", err);
      set({ isLoading: false });
    }
  },
}));
