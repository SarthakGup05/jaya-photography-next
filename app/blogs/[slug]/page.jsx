import BlogSingleUI from "./BlogSingleUI";
import { getBlogBySlug, getBlogs } from "@/lib/blogsData";
import { notFound } from "next/navigation";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function generateMetadata(props) {
  const params = await props.params;
  const data = await getBlogBySlug(params.slug);
  const blog = data?.blog;

  if (!blog) {
    return {
      title: { absolute: "Blog Article Not Found | Jaya Photography" },
    };
  }

  // 1. Meta Title extraction (prioritizing custom metaTitle/seoTitle fields over default H1 blog title)
  const metaTitle =
    blog.metaTitle ||
    blog.meta_title ||
    blog.seoTitle ||
    blog.seo_title ||
    blog.meta?.title ||
    blog.seo?.title ||
    blog.title;

  // 2. Meta Description extraction
  const metaDescription =
    blog.metaDescription ||
    blog.meta_description ||
    blog.seoDescription ||
    blog.seo_description ||
    blog.meta?.description ||
    blog.seo?.description ||
    blog.subtitle ||
    blog.excerpt ||
    blog.title;

  // 3. Meta Keywords extraction
  const rawKeywords =
    blog.metaKeywords ||
    blog.meta_keywords ||
    blog.keywords ||
    blog.seoKeywords ||
    blog.seo_keywords ||
    blog.meta?.keywords ||
    blog.seo?.keywords ||
    blog.tags;

  let keywords = [];
  if (Array.isArray(rawKeywords) && rawKeywords.length > 0) {
    keywords = rawKeywords.map((k) => (typeof k === "string" ? k.trim() : k)).filter(Boolean);
  } else if (typeof rawKeywords === "string" && rawKeywords.trim()) {
    keywords = rawKeywords.split(",").map((k) => k.trim()).filter(Boolean);
  } else {
    // Fallback blog-specific keywords so homepage keywords are NEVER inherited
    keywords = [
      blog.title,
      blog.category,
      `${blog.category || "photography"} in lucknow`,
      "maternity photoshoot lucknow",
      "newborn photoshoot lucknow",
      "jaya photography blog",
    ].filter(Boolean);
  }

  const canonicalUrl = `https://jayaphotography.in/blogs/${blog.slug}`;
  const ogImage = blog.coverImage ? [blog.coverImage] : [];

  return {
    // absolute title prevents Next.js layout from appending "%s | Jaya Photography Lucknow"
    title: {
      absolute: metaTitle,
    },
    description: metaDescription,
    keywords: keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      images: ogImage,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: ogImage,
    },
  };
}

export default async function BlogPage(props) {
  const params = await props.params;
  const [blogData, allBlogsData] = await Promise.all([
    getBlogBySlug(params.slug),
    getBlogs({ limit: 6 }),
  ]);

  const blog = blogData?.blog;
  if (!blog) {
    return notFound();
  }

  const allBlogs = allBlogsData?.blogs || [];
  const currentId = blog._id || blog.id || blog.slug;
  const relatedBlogs = allBlogs.filter((b) => {
    const bId = b._id || b.id || b.slug;
    return bId !== currentId && b.slug !== blog.slug;
  });

  return <BlogSingleUI blog={blog} relatedBlogs={relatedBlogs} />;
}
