"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";

export default function BlogsUI({ initialBlogs = [], categoriesList = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    if (categoriesList && categoriesList.length > 0) {
      return categoriesList.includes("All") ? categoriesList : ["All", ...categoriesList];
    }
    const set = new Set(["All"]);
    initialBlogs.forEach((blog) => {
      if (blog.category) set.add(blog.category);
    });
    return Array.from(set);
  }, [initialBlogs, categoriesList]);

  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.category && blog.category.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialBlogs, searchQuery, selectedCategory]);

  const featuredBlog = useMemo(() => {
    return initialBlogs.find((b) => b.featured) || initialBlogs[0];
  }, [initialBlogs]);

  const remainingBlogs = useMemo(() => {
    if (!featuredBlog) return filteredBlogs;
    return filteredBlogs.filter((b) => b.id !== featuredBlog.id);
  }, [filteredBlogs, featuredBlog]);

  return (
    <main className="min-h-screen bg-[#F0E7E5] text-gray-900 pt-24 pb-20">
      {/* 🌟 HERO BANNER */}
      <section className="relative bg-[#F0E7E5] py-16 sm:py-20 px-6 mb-10 overflow-hidden border-b border-[#e0d0b8]">
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-5">
          <p className="text-purple-700 font-bold text-xs uppercase tracking-widest">
            Behind The Lens & Photography Journal
          </p>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-black leading-tight">
            Photography Insights & <span className="bg-gradient-to-r from-black to-purple-800 bg-clip-text text-transparent">Parent Guides</span>
          </h1>

          <p className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Expert advice for newborn sessions, maternity photoshoots, baby milestones, and portrait styling in Lucknow.
          </p>

          {/* 🔍 SEARCH BAR */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search photography tips, newborn guides, maternity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-[#e0d0b8] text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-700 transition-all text-sm sm:text-base shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 px-2.5 py-1 rounded-full font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* 🏷️ CATEGORY FILTER PILLS */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 custom-scrollbar scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-black text-white shadow-md scale-105"
                  : "bg-white text-gray-800 border border-[#e0d0b8] hover:border-purple-600 hover:bg-purple-50/50 hover:text-purple-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 🌟 FEATURED ARTICLE */}
        {!searchQuery && selectedCategory === "All" && featuredBlog && (
          <section className="mb-14">
            <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md border border-[#e0d0b8] hover:shadow-xl transition-all duration-500 grid lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[340px] overflow-hidden bg-gray-100">
                <Image
                  src={featuredBlog.coverImage}
                  alt={featuredBlog.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                  Featured Guide
                </div>
              </div>

              <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                    <span className="bg-[#F0E7E5] text-purple-800 px-3 py-1 rounded-md font-bold uppercase tracking-wider">
                      {featuredBlog.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredBlog.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredBlog.date}
                    </span>
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-serif font-bold text-gray-900 group-hover:text-purple-700 transition-colors leading-snug">
                    <Link href={`/blogs/${featuredBlog.slug}`}>
                      {featuredBlog.title}
                    </Link>
                  </h2>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {featuredBlog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f4e7d4] overflow-hidden relative border border-[#e0d0b8] flex items-center justify-center p-1">
                      <Image
                        src={featuredBlog.author?.avatar || "/logo.png"}
                        alt={featuredBlog.author?.name || "Author"}
                        fill
                        style={{ objectFit: "contain" }}
                        className="rounded-full p-1"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">
                        {featuredBlog.author?.name}
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        {featuredBlog.author?.role}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/blogs/${featuredBlog.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-black hover:text-purple-700 transition-colors"
                  >
                    Read Guide
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 📚 BLOG ARTICLES GRID */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              {searchQuery ? `Search Results (${filteredBlogs.length})` : "Latest Articles"}
            </h2>
          </div>

          {remainingBlogs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#e0d0b8] p-8 space-y-4">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto" />
              <h3 className="text-lg font-bold text-gray-800">No articles found</h3>
              <p className="text-gray-500 text-sm">
                Try searching with different keywords or switch categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-2 px-6 py-2.5 bg-black text-white text-xs uppercase tracking-wider rounded-lg font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingBlogs.map((blog) => (
                <article
                  key={blog.id || blog.slug}
                  className="group bg-white rounded-xl overflow-hidden border border-[#e0d0b8] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Container */}
                    <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-black/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {blog.category}
                      </div>
                    </div>

                    {/* Article Details */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {blog.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {blog.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-purple-700 transition-colors leading-snug line-clamp-2">
                        <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                      </h3>

                      <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700">
                      By {blog.author?.name || "Jaya Agnihotri"}
                    </span>

                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-black group-hover:text-purple-700 transition-colors"
                    >
                      Read Story
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ✉️ SESSION BOOKING BANNER */}
        <section className="relative rounded-2xl bg-white text-gray-900 p-8 sm:p-12 border border-[#e0d0b8] shadow-md mb-8">
          <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="text-purple-700 text-xs uppercase tracking-widest font-bold">
                Capture Timeless Memories
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-black leading-tight">
                Ready to Book Your Session in Lucknow?
              </h3>
              <p className="text-gray-700 text-sm sm:text-base font-medium">
                Whether it's a newborn, maternity, or family milestone shoot, let's create timeless art together.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row gap-3 justify-end">
              <Link href="/contact-us">
                <button className="w-full sm:w-auto px-8 py-3.5 bg-black text-white font-bold rounded-xl hover:bg-purple-700 transition-all cursor-pointer text-center text-sm shadow-md">
                  Book Session Now
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
