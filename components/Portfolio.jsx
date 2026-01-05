"use client";

import React, { useState, useEffect, useRef } from "react";
import { Camera, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";
import axiosInstance from "@/libs/axios-instance";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// ✅ LightGallery (client only)
const LightGallery = dynamic(() => import("lightgallery/react"), { ssr: false });
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";


// ✅ LightGallery CSS
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-rotate.css";

const PhotographyPortfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(new Set());

  const router = useRouter();
  const containerRef = useRef(null);

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
            id: image.id,
            title: image.title || "Untitled",
            category: image.category || "Photography",
            image: image.thumb || image.src,
            fullImage: image.src,
            alt: image.alt || image.title || "Portfolio image",
            description: image.description || "",
            featured: image.featured,
          }))
          .filter((item) => item.fullImage && item.image);

        setPortfolioItems(transformedItems);
      } else {
        setError("No portfolio images available");
      }
    } catch (error) {
      console.error("Error fetching portfolio images:", error);
      setError("Failed to load portfolio images");
      toast.error("Failed to load portfolio images");
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------------------------------
   * GSAP Animations (Lazy loaded)
   * --------------------------------------------------- */
  useEffect(() => {
    fetchPortfolioImages();
  }, []);

  useEffect(() => {
    if (loading || error) return;

    (async () => {
      try {
        const gsapModule = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        const gsap = gsapModule.default;
        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(() => {
          gsap.set([".header-content", ".gallery-item", ".cta-content"], {
            opacity: 1,
          });

          // Header
          gsap.fromTo(
            ".header-content",
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".header-content",
                start: "top 85%",
              },
            }
          );

          // Gallery items
          gsap.utils.toArray(".gallery-item").forEach((item, index) => {
            gsap.fromTo(
              item,
              { opacity: 0, scale: 0.95 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 85%",
                },
                delay: index * 0.05,
              }
            );
          });

          // CTA
          gsap.fromTo(
            ".cta-content",
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".cta-content",
                start: "top 85%",
              },
            }
          );
        }, containerRef);

        return () => {
          ctx.revert();
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      } catch (error) {
        console.warn("GSAP failed to load:", error);
      }
    })();
  }, [loading, error, portfolioItems]);

  const handleImageLoad = (id) => {
    setImagesLoaded((prev) => new Set([...prev, id]));
  };

  /* -----------------------------------------------------
   * Loading State
   * --------------------------------------------------- */
  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4 bg-[#FAF0DC]">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <div className="h-12 w-64 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 w-96 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  /* -----------------------------------------------------
   * Error State
   * --------------------------------------------------- */
  if (error) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center bg-[#FAF0DC]">
        <div className="text-center max-w-sm">
          <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h2 className="text-xl font-light text-black mb-2">Portfolio Unavailable</h2>
          <p className="text-gray-600 text-sm mb-6">{error}</p>
          <button
            onClick={fetchPortfolioImages}
            className="animated-button text-black border-b border-black hover:border-gray-600 transition-colors duration-200 text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* -----------------------------------------------------
   * Main Content
   * --------------------------------------------------- */
  return (
    <div ref={containerRef} className="relative py-20 px-4 bg-[#F0E7E5] overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-black/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-black/3 rounded-full blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 header-content">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2 tracking-tight leading-relaxed">
            Capturing Life&apos;s <br />
            <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Beautiful Moments
            </span>
          </h1>
          <p className="text-gray-700 max-w-md mx-auto text-base font-medium leading-relaxed mt-4">
            A curated selection of our finest work showcasing newborn, maternity,
            and fashion photography.
          </p>
        </div>

        {/* Portfolio Grid */}
        {portfolioItems.length > 0 ? (
          <LightGallery
            speed={400}
            plugins={[lgThumbnail, lgZoom, lgFullscreen]}
            mode="lg-fade"
            thumbnail={true}
            showThumbByDefault={false}
            counter={true}
            addClass="lg-minimal-gallery"
            selector=".gallery-item"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
              {portfolioItems.map((item, index) => (
                <div
                  key={item.id || index}
                  className="gallery-item group cursor-pointer overflow-hidden relative rounded-lg shadow-lg"
                  style={{ aspectRatio: "1/1" }}
                  data-src={item.fullImage || item.image}
                  data-sub-html={`<div class="text-center"><h4 class="text-lg font-light mb-2">${item.title}</h4><p class="text-sm opacity-80">${item.category}</p></div>`}
                >
                  {!imagesLoaded.has(item.id) && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  )}
                  <img
                    src={item.image}
                    alt={item.alt}
                    width="400"
                    height="400"
                    className="w-full h-full object-cover transition-transform duration-500"
                    loading={index < 4 ? "eager" : "lazy"}
                    fetchPriority={index < 2 ? "high" : "auto"}
                    decoding={index < 4 ? "sync" : "async"}
                    onLoad={() => handleImageLoad(item.id)}
                    onError={(e) => {
                      if (e.target.src !== item.fullImage && item.fullImage) {
                        e.target.src = item.fullImage;
                      } else {
                        e.target.closest(".gallery-item").style.display = "none";
                      }
                    }}
                    style={{ aspectRatio: "1/1" }}
                  />
                </div>
              ))}
            </div>
          </LightGallery>
        ) : (
          <div className="text-center py-20">
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-light text-black mb-2">No Portfolio Items</h3>
            <p className="text-gray-600 text-sm">Portfolio images will appear here once uploaded.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16 space-y-4 cta-content">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button
              onClick={() => router.push("/gallery")}
              className="animated-button group flex items-center gap-2 text-black transition-all duration-300 cursor-pointer hover:text-gray-700"
            >
              <span className="font-bold text-lg">View Complete Gallery</span>
              <ArrowRight className="arrow w-5 h-5 transition-all duration-300" />
            </button>
            <div className="w-px h-6 bg-gray-300 hidden sm:block"></div>
            <button
              onClick={() => router.push("/contact-us")}
              className="animated-button text-black font-bold text-lg transition-all duration-300 cursor-pointer border-b-2 border-transparent hover:border-black"
            >
              Book a Session
            </button>
          </div>
        </div>
      </div>

      {/* Extra styles */}
      <style jsx>{`
        img {
          max-width: 100%;
          height: auto;
          display: block;
        }
        .gallery-item {
          contain: layout style paint;
        }
      `}</style>
    </div>
  );
};

export default PhotographyPortfolio;
