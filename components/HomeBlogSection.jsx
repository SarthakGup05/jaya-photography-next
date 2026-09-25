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
    <section className="pt-10 pb-14 sm:pt-14 sm:pb-18 bg-[#f8f4ef] text-gray-900 relative overflow-hidden border-t border-[#e0d0b8]">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ebdcd3]/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e6d8ce]/40 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8ded6] border border-[#d8c8bc] text-[#42352f] text-[11px] font-medium tracking-[0.18em] uppercase shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-[#6e5445]" />
              <span>Behind The Lens & Guides</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-stone-900 leading-[1.2] tracking-tight">
              Photography Tips, Guides & Stories{" "}
              <span className="font-normal italic text-[#6e5445]">from Lucknow</span>
            </h2>
            <div className="text-stone-600 text-sm sm:text-base font-normal leading-relaxed space-y-2">
              <p>
                Discover helpful photography guides, expert tips, and inspiring stories for newborn photography, maternity photoshoots, baby milestones, cake smash sessions, family portraits, and creative photography in Lucknow.
              </p>
              <p className="hidden md:block">
                Learn when to book a newborn photoshoot, how to prepare for a maternity session, what to wear for a family portrait, how baby milestone photography works, and how to choose the right photography style for your family.
              </p>
              <p className="hidden sm:block text-xs sm:text-sm text-stone-500">
                Whether you're researching a newborn photographer in Lucknow, planning a maternity photoshoot, preparing for your baby's first birthday, or looking for family photography ideas, explore our latest articles for useful answers and inspiration.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 w-full sm:w-auto">
            <Link
              href="/blogs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 rounded-full bg-[#231b19] text-white text-xs sm:text-sm font-medium hover:bg-[#3a2e2a] transition-all duration-300 shadow-sm cursor-pointer group"
            >
              <span>Explore All Photography Guides</span>
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
                      <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#6e5445]" />
                          {date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#6e5445]" />
                          {readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-[#5e4738] transition-colors leading-snug line-clamp-2">
                        <Link href={`/blogs/${slug}`}>{title}</Link>
                      </h3>

                      <p className="text-stone-600 text-sm line-clamp-3 leading-relaxed">
                        {excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-3 border-t border-stone-100 flex items-center justify-between mt-2">
                    <span className="text-xs font-medium text-stone-600">
                      By {blog.author?.name || "Jaya Agnihotri"}
                    </span>

                    <Link
                      href={`/blogs/${slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 group-hover:text-[#5e4738] transition-colors"
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
