"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";
import { useBlogStore } from "@/store/useBlogStore";

// Curated fallback blogs in case backend API returns no items
const FALLBACK_BLOGS = [
  {
    id: "fallback-1",
    slug: "newborn-photography-session-preparation-guide",
    title: "How to Prepare for Your Baby's First Newborn Photoshoot",
    excerpt:
      "Essential tips on temperature control, feeding schedules, outfit selections, and styling for a calm, beautiful newborn session in Lucknow.",
    category: "Newborn Guide",
    coverImage:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1000&auto=format&fit=crop",
    date: "Sep 10, 2025",
    readTime: "4 min read",
    author: { name: "Jaya Agnihotri", role: "Lead Photographer" },
  },
  {
    id: "fallback-2",
    slug: "maternity-photoshoot-outfit-and-styling-tips",
    title: "What to Wear for a Stunning Maternity Session in Lucknow",
    excerpt:
      "Discover gown choices, color palettes, prop selection, and location ideas that highlight your pregnancy glow with timeless elegance.",
    category: "Maternity Tips",
    coverImage:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop",
    date: "Aug 28, 2025",
    readTime: "5 min read",
    author: { name: "Jaya Agnihotri", role: "Lead Photographer" },
  },
  {
    id: "fallback-3",
    slug: "baby-milestones-cake-smash-photoshoot-ideas",
    title: "Cake Smash & Baby Milestones: Capturing Year One",
    excerpt:
      "From sitting unassisted to first birthdays, learn how we turn messy fun and precious baby giggles into visual family heirlooms.",
    category: "Milestone Tips",
    coverImage:
      "https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=1000&auto=format&fit=crop",
    date: "Aug 15, 2025",
    readTime: "3 min read",
    author: { name: "Jaya Agnihotri", role: "Lead Photographer" },
  },
];

const HomeBlogSection = () => {
  const { blogs, fetchBlogs, isLoading } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const displayBlogs = blogs.length > 0 ? blogs.slice(0, 3) : FALLBACK_BLOGS;
  const loading = isLoading && blogs.length === 0;

  return (
    <section className="py-16 sm:py-24 bg-[#f8f4ef] text-gray-900 relative overflow-hidden border-t border-[#e0d0b8]">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eee2d0] text-purple-900 text-xs font-bold uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Behind The Lens & Guides</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight">
              Latest Stories & <span className="text-purple-800">Photography Tips</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg font-normal leading-relaxed">
              Expert advice for newborn sessions, maternity photoshoots, baby milestones, and luxury portrait styling in Lucknow.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-purple-800 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Blog Cards Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 space-y-4 border border-[#e0d0b8] animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded-xl" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayBlogs.map((blog) => {
              const blogId = blog._id || blog.id || blog.slug;
              const slug = blog.slug || "";
              const title = blog.title || "Photography Guide";
              const excerpt = blog.excerpt || "";
              const category = blog.category || "Photography";
              const coverImage =
                blog.coverImage ||
                "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1000&auto=format&fit=crop";
              const date = blog.date || "Recent";
              const readTime = blog.readTime || "4 min read";

              return (
                <article
                  key={blogId}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#e0d0b8] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Image */}
                    <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                      <Image
                        src={coverImage}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute top-3 left-3 bg-black/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
                        {category}
                      </div>
                    </div>

                    {/* Article Details */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-purple-700" />
                          {date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-purple-700" />
                          {readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-purple-800 transition-colors leading-snug line-clamp-2">
                        <Link href={`/blogs/${slug}`}>{title}</Link>
                      </h3>

                      <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                        {excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-3 border-t border-gray-100 flex items-center justify-between mt-2">
                    <span className="text-xs font-semibold text-gray-700">
                      By {blog.author?.name || "Jaya Agnihotri"}
                    </span>

                    <Link
                      href={`/blogs/${slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-black group-hover:text-purple-800 transition-colors"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeBlogSection;
