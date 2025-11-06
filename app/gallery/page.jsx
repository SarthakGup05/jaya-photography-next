"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Camera,
  Filter,
  Grid,
  Heart,
  Eye,
  ArrowUp,
  Sparkles,
  ImageIcon,
} from "lucide-react";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-fullscreen.css";

import axiosInstance from "@/libs/axios-instance";
import Modal from "@/components/modal";
import ContactForm from "@/components/Form";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredImages, setFilteredImages] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(new Set());
  const [viewMode, setViewMode] = useState("masonry");

  const containerRef = useRef(null);
  const lightGalleryRef = useRef(null);

  // ✅ Cloudinary optimization helper
  const optimizeImageUrl = useCallback((url, width = 600, quality = "auto") => {
    if (!url?.includes("res.cloudinary.com")) return url;
    return url.replace(
      "/upload/",
      `/upload/c_fill,g_auto,q_${quality},f_auto,w_${width}/`
    );
  }, []);

  // ✅ Fetch data
  useEffect(() => {
    (async () => {
      try {
        const [imgRes, catRes] = await Promise.all([
          axiosInstance.get("/gallery/images"),
          axiosInstance.get("/gallery/categories"),
        ]);
        const imgs = imgRes.data?.images || imgRes.data || [];
        const cats = catRes.data || [...new Set(imgs.map((i) => i.category))];
        setImages(imgs);
        setCategories(cats);
      } catch (err) {
        toast.error("Failed to load gallery");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ✅ Filter & sort
  useEffect(() => {
    if (!images?.length) return;
    let filtered =
      activeCategory === "all"
        ? [...images]
        : images.filter((i) => i.category === activeCategory);
    filtered.sort((a, b) =>
      sortBy === "title"
        ? (a.title || "").localeCompare(b.title || "")
        : new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
    );
    setFilteredImages(filtered);
  }, [images, activeCategory, sortBy]);

  // ✅ Scroll button toggle
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  // ✅ GSAP (lazy-loaded)
  useEffect(() => {
    if (loading) return;
    (async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.from(".hero-content", {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".hero-content", start: "top 85%" },
        });
        gsap.from(".filter-section", {
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ".filter-section", start: "top 80%" },
        });
      }, containerRef);
      return () => ctx.revert();
    })();
  }, [loading]);

  const toggleFavorite = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const getHeight = (i) => [280, 320, 360, 300, 350, 400][i % 6];

  if (loading) return <div className="text-center py-20">Loading gallery...</div>;

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-[#f3e6fa] via-white to-[#f3e6fa]/60"
    >
      {/* Hero */}
      <section className="hero-content text-center pt-32 pb-16 px-4">
        <h1 className="text-6xl md:text-8xl font-light text-gray-900 mb-4 tracking-tight">
          Our{" "}
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-800 bg-clip-text text-transparent font-semibold">
            Gallery
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Moments that speak, emotions that live forever.
        </p>
      </section>

      {/* Filter */}
      <section className="filter-section max-w-7xl mx-auto px-6 mb-12">
        <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-wrap gap-3">
              {["all", ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                      : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {cat === "all" ? "All Photos" : cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-purple-400"
              >
                <option value="newest">Newest</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <LightGallery
          ref={lightGalleryRef}
          plugins={[lgThumbnail, lgZoom, lgFullscreen]}
          mode="lg-fade"
          speed={400}
          thumbnail={true}
          download={false}
          selector=".gallery-item"
        >
          <div
            className={
              viewMode === "masonry"
                ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            }
          >
            {filteredImages.map((img, i) => {
              const thumb = optimizeImageUrl(img.thumb || img.src, 600);
              const full = optimizeImageUrl(img.src, 1600);
              const height = viewMode === "masonry" ? getHeight(i) : 320;

              return (
                <a
                  key={img.id}
                  data-src={full}
                  data-sub-html={`<h4>${img.title}</h4><p>${img.category}</p>`}
                  className={`gallery-item group block mb-6 relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl`}
                >
                  <div className="relative w-full overflow-hidden">
                    <Image
                      src={thumb}
                      alt={img.title || "Gallery Image"}
                      width={500}
                      height={height}
                      className="object-cover w-full h-auto rounded-2xl transition-transform duration-500 group-hover:scale-105"
                      style={{ height }}
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
                      priority={i < 4}
                      onLoad={() =>
                        setImagesLoaded((p) => new Set([...p, img.id]))
                      }
                    />
                    <button
                      onClick={(e) => toggleFavorite(img.id, e)}
                      className="absolute top-3 right-3 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.has(img.id)
                            ? "text-red-500 fill-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all" />
                    <div className="absolute bottom-0 p-4 text-white opacity-0 group-hover:opacity-100 transition">
                      <h4 className="font-semibold text-lg">{img.title}</h4>
                      <p className="text-sm opacity-90">{img.category}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </LightGallery>
      </section>

      {/* CTA */}
      <section className="cta-section max-w-5xl mx-auto px-6 pb-20 text-center">
        <div className="bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl py-16 px-8 relative">
          <Camera className="w-12 h-12 text-purple-600 mx-auto mb-6" />
          <h3 className="text-4xl font-bold mb-4 text-gray-900">
            Love What You See?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Let’s capture your story — your next masterpiece begins here.
          </p>
          <Modal
            trigger={
              <Button className="rounded-full px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:scale-105 transition">
                <Camera className="w-5 h-5 mr-2" /> Start Your Session
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
      </section>

      {/* Scroll Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="Scroll to top"
          className="fixed bottom-16 right-8 p-4 bg-white rounded-full shadow-lg text-purple-600 hover:bg-purple-50 transition"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Gallery;
