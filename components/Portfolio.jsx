"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Camera, ArrowUpRight, AlertCircle } from "lucide-react";
import axiosInstance from "@/libs/axios-instance";

const PhotographyPortfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  /* -----------------------------------------------------
   * Fetch Portfolio Data
   * --------------------------------------------------- */
  const fetchPortfolioImages = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get("/gallery/images", {
        params: {
          isActive: "true",
          sortBy: "sortOrder",
          sortOrder: "asc",
          limit: 8,
        },
      });

      const imagesData = response.data.images || response.data;

      if (imagesData && imagesData.length > 0) {
        const transformedItems = imagesData
          .map((image) => ({
            id: image.id || image._id,
            title: image.title || "Studio Portrait",
            category: image.category || "Photography",
            image: image.thumb || image.src,
            fullImage: image.src,
            alt: image.alt || image.title || "Portfolio photograph",
            description: image.description || "",
          }))
          .filter((item) => item.fullImage || item.image);

        setPortfolioItems(transformedItems);
      } else {
        setError("No portfolio images available");
      }
    } catch (err) {
      console.error("Error fetching portfolio images:", error);
      setError("Failed to load portfolio images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioImages();
  }, []);

  /* -----------------------------------------------------
   * Loading State
   * --------------------------------------------------- */
  if (loading) {
    return (
      <section className="py-20 px-6 bg-[#F0E7E5]">
        <div className="max-w-6xl mx-auto text-center mb-12 space-y-3">
          <div className="h-4 w-36 bg-gray-300/60 rounded-full mx-auto animate-pulse"></div>
          <div className="h-10 w-80 bg-gray-300/60 rounded-xl mx-auto animate-pulse"></div>
          <div className="h-4 w-full max-w-md bg-gray-300/60 rounded mx-auto animate-pulse"></div>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-300/60 rounded-xl animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  /* -----------------------------------------------------
   * Error State
   * --------------------------------------------------- */
  if (error) {
    return (
      <section className="py-16 px-6 bg-[#F0E7E5] text-center">
        <div className="max-w-sm mx-auto space-y-4">
          <AlertCircle className="w-10 h-10 text-gray-600 mx-auto" />
          <p className="text-gray-700 text-sm font-medium">{error}</p>
          <button
            onClick={fetchPortfolioImages}
            className="px-6 py-2 bg-black text-white text-xs font-semibold uppercase rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  /* -----------------------------------------------------
   * Main Content (Preserving Signature #F0E7E5 Color Palette)
   * --------------------------------------------------- */
  return (
    <section className="relative py-20 px-6 bg-[#F0E7E5] text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* 🌟 3-Line Header Layout */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          {/* Line 1: Eyebrow Badge */}
          <p className="text-purple-700 font-bold text-xs uppercase tracking-widest">
            Newborn | Maternity | Baby Milestone | Family | Fashion
          </p>

          {/* Line 2: Headline */}
          <h2 className="text-3xl sm:text-5xl font-bold text-black leading-tight tracking-tight">
            Capturing Life's <span className="bg-gradient-to-r from-black to-purple-800 bg-clip-text text-transparent">Beautiful Moments</span>
          </h2>

          {/* Line 3: Description (Strict 3 lines max) */}
          <p className="text-gray-700 text-sm sm:text-base font-medium leading-relaxed line-clamp-3 max-w-xl mx-auto">
            A curated selection of our finest work showcasing newborn photography, maternity photoshoots, baby milestones, and portrait photography in Lucknow.
          </p>
        </div>

        {/* 📷 1080x1080 Square Photo Grid (No Lightbox) */}
        {portfolioItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id || index}
                onClick={() => router.push("/gallery")}
                className="group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-2xl border border-[#e0d0b8] transition-all duration-500 cursor-pointer bg-white"
              >
                {/* 1080x1080 Square Image */}
                <Image
                  src={item.image || item.fullImage}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  priority={index < 4}
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/20">
                    {item.category}
                  </span>
                </div>

                {/* Top Right Action Icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Details (Max 3 lines total) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 space-y-1">
                  <h4 className="text-sm font-bold text-white line-clamp-1">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-[11px] text-gray-200 font-normal line-clamp-2 leading-tight">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/80 rounded-2xl border border-[#e0d0b8] space-y-3">
            <Camera className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="text-base font-bold text-gray-800">No Portfolio Images</h3>
            <p className="text-gray-500 text-xs">Portfolio images will appear here once uploaded.</p>
          </div>
        )}

        {/* 🔗 CTA Section */}
        <div className="text-center pt-4 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/gallery">
            <button className="flex items-center gap-2 text-black font-bold text-base hover:text-purple-700 transition-colors cursor-pointer group">
              <span>View Complete Gallery</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <div className="w-px h-6 bg-gray-400/50 hidden sm:block"></div>

          <Link href="/contact-us">
            <button className="text-black font-bold text-base hover:text-purple-700 border-b-2 border-black hover:border-purple-700 transition-colors cursor-pointer pb-0.5">
              Book a Session
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PhotographyPortfolio;
