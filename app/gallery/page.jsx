"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  Camera,
  Filter,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ArrowUp,
  CheckCircle,
} from "lucide-react";
import axiosInstance from "@/libs/axios-instance";
import Modal from "@/components/modal";
import ContactForm from "@/components/Form";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  /* -----------------------------------------------------
   * ⚡ Instant Fetch
   * --------------------------------------------------- */
  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true);
      const [imgRes, catRes] = await Promise.all([
        axiosInstance.get("/gallery/images", {
          params: { isActive: "true", sortBy: "sortOrder", sortOrder: "asc" },
        }),
        axiosInstance.get("/gallery/categories").catch(() => ({ data: [] })),
      ]);

      const imgs = imgRes.data?.images || imgRes.data || [];
      const cats = catRes.data?.length
        ? catRes.data
        : Array.from(new Set(imgs.map((i) => i.category).filter(Boolean)));

      setImages(imgs);
      setCategories(cats);
    } catch (err) {
      console.error("Failed to load gallery:", err);
      toast.error("Failed to load gallery images");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  /* -----------------------------------------------------
   * 🔍 Filtered & Sorted Images
   * --------------------------------------------------- */
  const filteredImages = useMemo(() => {
    let result =
      activeCategory === "All"
        ? [...images]
        : images.filter((i) => i.category === activeCategory);

    result.sort((a, b) => {
      if (sortBy === "title") {
        return (a.title || "").localeCompare(b.title || "");
      }
      return new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0);
    });

    return result;
  }, [images, activeCategory, sortBy]);

  /* -----------------------------------------------------
   * 📜 Scroll Controls
   * --------------------------------------------------- */
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFavorite = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  /* -----------------------------------------------------
   * 🖼️ Lightbox Navigation
   * --------------------------------------------------- */
  const handlePrevImage = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  }, [selectedImageIndex, filteredImages.length]);

  const handleNextImage = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  }, [selectedImageIndex, filteredImages.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") setSelectedImageIndex(null);
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, handlePrevImage, handleNextImage]);

  /* -----------------------------------------------------
   * ⏳ Skeleton Loading
   * --------------------------------------------------- */
  if (loading) {
    return (
      <main className="min-h-screen bg-[#F0E7E5] pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <div className="h-4 w-36 bg-gray-300/60 rounded-full mx-auto animate-pulse"></div>
            <div className="h-10 w-72 bg-gray-300/60 rounded-xl mx-auto animate-pulse"></div>
            <div className="h-4 w-full bg-gray-300/60 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-white/70 rounded-2xl border border-[#e0d0b8] animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  const selectedImage =
    selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;

  return (
    <main className="relative min-h-screen bg-[#F0E7E5] text-gray-900 pt-28 pb-20">
      {/* 🌟 HERO HEADER */}
      <section className="max-w-4xl mx-auto text-center px-6 mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-purple-800 text-xs font-bold uppercase tracking-widest border border-[#e0d0b8]">
          Fine-Art Portfolio
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-gray-900 leading-tight">
          Our Fine-Art <span className="italic text-purple-700">Gallery</span>
        </h1>

        <p className="text-gray-700 text-base sm:text-lg font-medium max-w-xl mx-auto leading-relaxed">
          Moments that speak, emotions that live forever. A curated collection of newborn, maternity, and family portraits in Lucknow.
        </p>
      </section>

      {/* 🏷️ CATEGORY FILTER & SORT BAR */}
      <section className="max-w-7xl mx-auto px-6 mb-10">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#e0d0b8] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full md:w-auto">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-black text-white shadow-md scale-105"
                    : "bg-gray-50 text-gray-800 border border-gray-200 hover:border-purple-600 hover:bg-purple-50/50 hover:text-purple-700"
                }`}
              >
                {cat === "All" ? "All Photos" : cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-700 cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="title">By Title</option>
            </select>
          </div>
        </div>
      </section>

      {/* 📷 SEAMLESS GALLERY PHOTO GRID */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        {filteredImages.length === 0 ? (
          <div className="text-center py-20 bg-white/80 rounded-2xl border border-[#e0d0b8] p-8 space-y-3">
            <Camera className="w-12 h-12 text-gray-400 mx-auto" />
            <h3 className="text-lg font-bold text-gray-800">No Gallery Images Found</h3>
            <p className="text-gray-500 text-sm">
              Try selecting a different category or reset filters.
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="px-6 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-gray-800 transition-colors"
            >
              Show All Photos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredImages.map((img, index) => {
              const srcUrl = img.thumb || img.src || img.fullImage;
              return (
                <div
                  key={img.id || img._id || index}
                  onClick={() => setSelectedImageIndex(index)}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-white shadow-xs hover:shadow-xl border border-[#e0d0b8] transition-all duration-300 cursor-pointer"
                >
                  <Image
                    src={srcUrl}
                    alt={img.title || "Gallery Portrait"}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    priority={index < 4}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Favorite Heart Toggle */}
                  <button
                    onClick={(e) => toggleFavorite(img.id || index, e)}
                    className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-10"
                    title="Favorite"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.has(img.id || index)
                          ? "text-red-500 fill-red-500"
                          : "text-white"
                      }`}
                    />
                  </button>

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {img.category || "Portrait"}
                    </span>
                  </div>

                  {/* Bottom Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <h4 className="font-serif font-bold text-sm leading-tight line-clamp-1">
                      {img.title || "Studio Portrait"}
                    </h4>
                    <p className="text-[11px] text-gray-300 font-light flex items-center gap-1 mt-0.5">
                      <Maximize2 className="w-3 h-3 text-purple-300" /> Click to view full image
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 🔍 INSTANT SEAMLESS LIGHTBOX MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <button
            onClick={handleNextImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Next (Right Arrow)"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Full Image Content */}
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-full h-[70vh]">
              <Image
                src={selectedImage.src || selectedImage.fullImage || selectedImage.thumb}
                alt={selectedImage.title || "Gallery Portrait"}
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Caption & Counter */}
            <div className="mt-4 text-center text-white space-y-1">
              <span className="text-xs text-purple-300 font-bold uppercase tracking-widest">
                {selectedImage.category || "Studio Portrait"}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                {selectedImage.title || "Studio Portrait"}
              </h3>
              <p className="text-xs text-gray-400">
                {selectedImageIndex + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ✉️ SESSION BOOKING SECTION */}
      <section className="max-w-4xl mx-auto px-6 mb-16 text-center">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#e0d0b8] shadow-sm space-y-4">
          <Camera className="w-10 h-10 text-purple-700 mx-auto" />
          <h3 className="text-3xl font-serif font-bold text-gray-900">
            Love What You See?
          </h3>
          <p className="text-gray-700 text-sm sm:text-base font-medium max-w-md mx-auto">
            Let's capture your story — your next timeless masterpiece begins here.
          </p>

          <div className="pt-2">
            <Modal
              trigger={
                <Button className="rounded-xl px-8 py-3.5 bg-black text-white font-bold hover:bg-purple-700 transition-all cursor-pointer shadow-md text-sm">
                  Start Your Session
                </Button>
              }
            >
              {({ close }) => (
                <ContactForm
                  onSubmit={async (data) => {
                    await axiosInstance.post("/enquiries/create-enquiry", {
                      ...data,
                      source: "gallery",
                      bookingType: "gallery_inquiry",
                    });
                    toast.success("Inquiry sent!");
                    close();
                  }}
                />
              )}
            </Modal>
          </div>
        </div>
      </section>

      {/* ⬆️ Scroll Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="Scroll to top"
          className="fixed bottom-10 right-6 z-40 p-3.5 bg-black text-white rounded-full shadow-lg hover:bg-purple-700 transition-all cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </main>
  );
}
