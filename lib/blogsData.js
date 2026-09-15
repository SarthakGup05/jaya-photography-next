import axiosInstance from "@/libs/axios-instance";

// 🌟 Fallback Blog Posts Dataset
export const FALLBACK_BLOGS = [
  {
    _id: "blog-1",
    id: "blog-1",
    slug: "newborn-photography-session-preparation-guide",
    title: "How to Prepare for Your Baby's First Newborn Photoshoot in Lucknow",
    subtitle: "A complete parent checklist for timing, feeding, studio warmth, props, and stress-free newborn portraits.",
    category: "Newborn Guide",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1200&auto=format&fit=crop",
    excerpt: "Preparing for a newborn photo session can feel overwhelming for new parents. Here is our step-by-step guide on timing, studio setup, temperature control, and outfit selection to ensure a magical, calm experience.",
    content: `
      <h2>Planning Your Baby's Magical First Photo Session</h2>
      <p>Welcoming a newborn into your life is a breathtaking milestone filled with tender quiet moments, tiny fingers, and soft sleepy sighs. Capturing these fleeting early days requires thoughtful planning and gentle patience.</p>
      
      <h3>Essential Preparation Checklist:</h3>
      <ul>
        <li><strong>Best Timing:</strong> Book your shoot within 5–14 days after delivery when babies sleep deeply.</li>
        <li><strong>Feeding:</strong> Feed your baby right before the session starts for maximum comfort.</li>
        <li><strong>Studio Climate:</strong> Our Sushant Golf City studio is maintained at a soothing 26°C–28°C.</li>
        <li><strong>Outfits & Props:</strong> We provide designer wraps, bonnets, and sanitized organic props.</li>
      </ul>

      <h3>1. The Ideal Timing for Newborn Portraits</h3>
      <p>We recommend scheduling your newborn session within the first 5 to 14 days after birth. During this sweet window, babies sleep deeply, retain their natural curled womb positions, and stay comfortable throughout prop changes.</p>
      
      <h3>2. Studio Warmth and Comfort Setup</h3>
      <p>Our luxury studio in Sushant Golf City, Lucknow is heated to a cozy 26°C to 28°C to ensure your baby stays warm and relaxed even without heavy swaddles. Parents are encouraged to dress in light, breathable clothing.</p>
      
      <h3>3. Recommended Session Steps</h3>
      <ol>
        <li>Initial consult & styling palette selection</li>
        <li>Warm feeding & gentle swaddling</li>
        <li>Creative solo baby poses on beanbag & props</li>
        <li>Tender family & parent bonding portraits</li>
      </ol>

      <blockquote>"Newborn photography isn't just about poses; it's about preserving the raw, unconditional love of a family's newest chapter." — Jaya Agnihotri</blockquote>
      
      <h3>4. Personal Touch & Family Heirlooms</h3>
      <p>Feel free to bring family heirlooms, custom name blocks, or special blankets. We beautifully integrate your personal stories into every styled portrait set.</p>
    `,
    date: "Sep 10, 2025",
    readTime: "5 min read",
    author: {
      name: "Jaya Agnihotri",
      role: "Lead Photographer & Studio Director",
      avatar: "/logo.png"
    }
  },
  {
    _id: "blog-2",
    id: "blog-2",
    slug: "maternity-photoshoot-outfit-and-styling-tips",
    title: "What to Wear for a Stunning Maternity Session in Lucknow",
    subtitle: "Style advice, color pairings, gown silhouettes, and location ideas that highlight your pregnancy glow.",
    category: "Maternity Tips",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1200&auto=format&fit=crop",
    excerpt: "Choosing outfits for your maternity photoshoot should celebrate your bump with elegance and comfort. Discover color combinations, flying gown styling, and outdoor vs studio guidance.",
    content: `
      <h2>Celebrating Motherhood with Timeless Style</h2>
      <p>Maternity photography captures the radiant beauty, expectation, and profound bond of motherhood. Here is how to select outfits that feel comfortable and look extraordinary in photographs.</p>
      
      <h3>1. Empire Waist & Flowing Fabrics</h3>
      <p>Flowing gowns made of chiffon, tulle, or lace accentuate your bump effortlessly while adding movement and romance to your portraits.</p>
      
      <h3>2. Color Palettes that Shine</h3>
      <p>Soft neutral tones like ivory, champagne, blush pink, and warm gold radiate warmth. Deep tones like emerald green, royal navy, or burgundy create striking, dramatic portraits.</p>
      
      <h3>3. Coordinating with Your Partner</h3>
      <p>We advise partners to wear solid neutrals—such as linen shirts, crisp white polos, or beige trousers—so the focus stays on togetherness and glowing connection.</p>
    `,
    date: "Aug 28, 2025",
    readTime: "4 min read",
    author: {
      name: "Jaya Agnihotri",
      role: "Lead Photographer",
      avatar: "/logo.png"
    }
  },
  {
    _id: "blog-3",
    id: "blog-3",
    slug: "baby-milestones-cake-smash-photoshoot-ideas",
    title: "Cake Smash & Baby Milestones: Turning Year One into Art",
    subtitle: "Creative themes, eggless cake recommendations, and joyful smash setups in Lucknow.",
    excerpt: "From sitting unassisted to celebrating the big 1st birthday, explore creative themes, eggless cake recommendations, and joyful smash setups.",
    category: "Milestone Tips",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=1200&auto=format&fit=crop",
    content: `
      <h2>Celebrating Your Baby's Milestone First Birthday</h2>
      <p>First birthday cake smash sessions are packed with laughter, messiness, and unscripted joy. Here is how we style unforgettable milestone sessions in Lucknow.</p>
      <h3>1. Choosing Safe & Soft Eggless Cakes</h3>
      <p>Opt for whipped cream frosting with pastel food coloring. Avoid hard fondant decorations that might be tricky for little fingers.</p>
      <h3>2. Splash Bath Cleanup Fun</h3>
      <p>After the cake smash, we move to a miniature warm splash bath with bubbles—capturing pure, infectious giggles!</p>
    `,
    date: "Aug 15, 2025",
    readTime: "4 min read",
    author: {
      name: "Jaya Agnihotri",
      role: "Lead Photographer",
      avatar: "/logo.png"
    }
  },
  {
    _id: "blog-4",
    id: "blog-4",
    slug: "family-portrait-photography-lucknow-tips",
    title: "Creating Timeless Family Portraits: Coordinated Outfits & Natural Posing",
    subtitle: "How to prepare young kids and capture natural family interactions.",
    excerpt: "How to prepare young kids, coordinate family wardrobes without matching uniforms, and capture natural interactions for lasting heirlooms.",
    category: "Family Portraits",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop",
    content: `
      <h2>Capturing the Warmth of Family Unity</h2>
      <p>A great family portrait is not about rigid poses; it is about authentic smiles and warm embraces. Learn how to plan a seamless family shoot.</p>
      <h3>1. Coordinate Colors, Don't Twin</h3>
      <p>Select 2-3 harmonious colors across family members (e.g. cream, sage green, and tan) rather than identical matching outfits.</p>
      <h3>2. Relaxed Interaction Over Perfect Poses</h3>
      <p>We guide families through natural laughter and play, resulting in candid portraits full of genuine emotion.</p>
    `,
    date: "Jul 30, 2025",
    readTime: "3 min read",
    author: {
      name: "Jaya Agnihotri",
      role: "Lead Photographer",
      avatar: "/logo.png"
    }
  }
];

// Helper to filter fallback array
function filterFallbackBlogs({ category = "", search = "", featured = "" } = {}) {
  return FALLBACK_BLOGS.filter((blog) => {
    const matchesCategory = !category || category === "All" || blog.category.toLowerCase() === category.toLowerCase();
    const matchesSearch =
      !search ||
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      blog.category.toLowerCase().includes(search.toLowerCase());
    const matchesFeatured = featured === "" || (featured === "true" ? blog.featured : !blog.featured);

    return matchesCategory && matchesSearch && matchesFeatured;
  });
}

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

    // Filter valid blogs
    if (data && Array.isArray(data.blogs) && data.blogs.length > 0) {
      data.blogs = data.blogs.filter(
        (blog) =>
          !blog.isDeleted &&
          blog.isActive !== false &&
          (!blog.status || blog.status === "published")
      );
      if (data.blogs.length > 0) return data;
    }

    // Fallback if empty array returned from API
    const fallbackList = filterFallbackBlogs({ category, search, featured });
    return { success: true, blogs: fallbackList, pagination: { total: fallbackList.length } };
  } catch (error) {
    console.warn("Using fallback blogs due to API unavailable:", error?.message);
    const fallbackList = filterFallbackBlogs({ category, search, featured });
    return { success: true, blogs: fallbackList, pagination: { total: fallbackList.length } };
  }
}

// 2. Fetch Single Blog by Slug
export async function getBlogBySlug(slug) {
  try {
    const response = await axiosInstance.get(`/blogs/slug/${slug}`);
    const data = response.data;

    if (
      data?.blog &&
      !data.blog.isDeleted &&
      data.blog.isActive !== false &&
      (!data.blog.status || data.blog.status === "published")
    ) {
      return data;
    }
  } catch (error) {
    console.warn(`Falling back for blog slug (${slug}):`, error?.message);
  }

  // Search in FALLBACK_BLOGS
  const found = FALLBACK_BLOGS.find((b) => b.slug === slug);
  if (found) {
    return { success: true, blog: found };
  }

  return { success: false, blog: null };
}

// 3. Fetch Featured Blogs Only
export async function getFeaturedBlogs(limit = 3) {
  return getBlogs({ limit, featured: "true" });
}

// 4. Fetch All Blog Categories
export async function getBlogCategories() {
  try {
    const response = await axiosInstance.get("/blogs/categories");
    if (response.data && Array.isArray(response.data.categories) && response.data.categories.length > 0) {
      return response.data;
    }
  } catch (error) {
    console.warn("Using fallback categories:", error?.message);
  }

  const set = new Set(["All"]);
  FALLBACK_BLOGS.forEach((b) => set.add(b.category));
  return { success: true, categories: Array.from(set) };
}

