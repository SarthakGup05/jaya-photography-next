import BlogSingleUI from "./BlogSingleUI";
import { getBlogBySlug, getBlogs } from "@/lib/blogsData";
import { notFound } from "next/navigation";

export async function generateMetadata(props) {
  const params = await props.params;
  const data = await getBlogBySlug(params.slug);
  const blog = data?.blog;

  if (!blog) {
    return { title: "Blog Article Not Found | Jaya Photography" };
  }

  return {
    title: `${blog.title} | Jaya Photography Blog`,
    description: blog.subtitle || blog.excerpt || blog.title,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.coverImage ? [blog.coverImage] : [],
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
  const relatedBlogs = allBlogs.filter((b) => b.slug !== blog.slug);

  return <BlogSingleUI blog={blog} relatedBlogs={relatedBlogs} />;
}
