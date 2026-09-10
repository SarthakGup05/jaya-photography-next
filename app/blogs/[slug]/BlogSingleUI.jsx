"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Check,
  Facebook,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

export default function BlogSingleUI({ blog, relatedBlogs = [] }) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const shareTitle = encodeURIComponent(blog.title);

  return (
    <div className="min-h-screen bg-[#F0E7E5] text-gray-900 pt-20">
      {/* 📏 READING PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-200 z-50">
        <div
          className="h-full bg-purple-700 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 🧭 BREADCRUMBS & NAVIGATION */}
      <nav className="max-w-4xl mx-auto px-6 pt-8 pb-4 flex items-center justify-between text-xs text-gray-600 font-medium">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-black hover:text-purple-700 transition-colors font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Journal
        </Link>
        <div className="hidden sm:flex items-center gap-2">
          <Link href="/" className="hover:text-purple-700 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blogs" className="hover:text-purple-700 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate max-w-[200px]">{blog.category}</span>
        </div>
      </nav>

      {/* 📰 ARTICLE HEADER */}
      <header className="max-w-4xl mx-auto px-6 py-6 space-y-5 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-purple-800 text-xs font-bold uppercase tracking-wider border border-[#e0d0b8]">
          {blog.category}
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
          {blog.title}
        </h1>

        {blog.subtitle && (
          <p className="text-gray-700 text-lg sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            {blog.subtitle}
          </p>
        )}

        {/* AUTHOR & METADATA BAR */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-700 border-t border-b border-[#e0d0b8] py-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#f4e7d4] overflow-hidden relative border border-[#e0d0b8] flex items-center justify-center p-1">
              <Image
                src={blog.author?.avatar || "/logo.png"}
                alt={blog.author?.name || "Author"}
                fill
                style={{ objectFit: "contain" }}
                className="rounded-full p-1"
              />
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900 text-sm">
                {blog.author?.name || "Jaya Agnihotri"}
              </div>
              <div className="text-xs text-gray-600 font-medium">
                {blog.author?.role || "Lead Photographer"}
              </div>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-gray-400/40 hidden sm:block"></div>

          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-gray-500" />
              {blog.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-gray-500" />
              {blog.readTime}
            </span>
          </div>
        </div>
      </header>

      {/* 🖼️ FEATURED COVER IMAGE */}
      {blog.coverImage && (
        <div className="max-w-5xl mx-auto px-6 mb-12">
          <div className="relative h-[320px] sm:h-[480px] w-full rounded-2xl overflow-hidden shadow-md border border-[#e0d0b8] bg-white">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* 📜 ARTICLE BODY */}
      <main className="max-w-4xl mx-auto px-6 pb-16 grid grid-cols-1 gap-12">
        <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-800 prose-p:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-purple-700 prose-blockquote:bg-white prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:italic">
          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="space-y-6 text-gray-800 text-base sm:text-lg leading-relaxed bg-white p-8 sm:p-12 rounded-2xl border border-[#e0d0b8] shadow-xs"
          />
        </article>

        {/* 🔗 SHARE BUTTONS */}
        <div className="border-t border-b border-[#e0d0b8] py-6 flex flex-wrap items-center justify-between gap-4">
          <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Share this Article:
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#e0d0b8] text-gray-800 text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </button>

            <a
              href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              title="Share on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>

            <a
              href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white transition-colors"
              title="Share on Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 👤 AUTHOR PROFILE CARD */}
        <div className="bg-white rounded-2xl p-8 border border-[#e0d0b8] shadow-xs flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-20 h-20 rounded-full bg-[#f4e7d4] overflow-hidden relative flex-shrink-0 border-2 border-purple-700 flex items-center justify-center p-2">
            <Image
              src={blog.author?.avatar || "/logo.png"}
              alt={blog.author?.name || "Author"}
              fill
              style={{ objectFit: "contain" }}
              className="rounded-full p-1"
            />
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-purple-700">
              Written by
            </span>
            <h3 className="text-xl font-serif font-bold text-gray-900">
              {blog.author?.name || "Jaya Agnihotri"}
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed font-medium">
              Founder & Lead Photographer at Jaya Photography Lucknow. Specializing in newborn, maternity, baby milestones, and family portraiture with over 10+ years of fine-art experience.
            </p>
          </div>
        </div>

        {/* 📚 RELATED POSTS */}
        {relatedBlogs.length > 0 && (
          <section className="pt-4 space-y-6">
            <h3 className="text-2xl font-serif font-bold text-gray-900">
              More Recommended Guides
            </h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedBlogs.slice(0, 3).map((item) => (
                <div
                  key={item.id || item.slug}
                  className="group bg-white rounded-xl overflow-hidden border border-[#e0d0b8] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-[#F0E7E5] px-2 py-0.5 rounded-xs">
                        {item.category}
                      </span>
                      <h4 className="font-serif font-bold text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-2 text-sm leading-snug">
                        <Link href={`/blogs/${item.slug}`}>{item.title}</Link>
                      </h4>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <Link
                      href={`/blogs/${item.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-black hover:text-purple-700 transition-colors"
                    >
                      Read Article
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ✉️ SESSION BOOKING CTA */}
        <section className="bg-white text-gray-900 rounded-2xl p-8 sm:p-10 border border-[#e0d0b8] text-center space-y-4 shadow-sm relative overflow-hidden">
          <div className="relative z-10 space-y-3 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-black">
              Want to capture your own milestone?
            </h3>
            <p className="text-gray-700 text-sm font-medium">
              Contact Jaya Photography today to reserve your maternity, newborn, or family photo session in Lucknow.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <Link href="/contact-us">
                <button className="px-8 py-3 bg-black text-white font-bold rounded-xl hover:bg-purple-700 transition-all cursor-pointer text-sm shadow-md">
                  Book Session
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
