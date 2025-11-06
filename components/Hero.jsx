"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Parallax,
  EffectFade,
  Navigation,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/parallax";
import "swiper/css/effect-fade";
import axiosInstance from "@/libs/axios-instance";

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchSlides = async () => {
    try {
      const { data } = await axiosInstance.get("/slider/get-sliders");
      const activeSlides = (data.data || data || [])
        .filter((s) => s.isActive)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      setSlides(activeSlides);
    } catch (err) {
      console.error("Hero fetch error:", err);
      setError("Failed to load slides. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  // ✅ Smart Cloudinary optimization
  const getOptimizedUrl = (url) => {
    if (!url) return "";
    if (!url.includes("res.cloudinary.com")) return url;
    return url.replace(
      "/upload/",
      "/upload/c_fit,g_auto,q_auto:best,f_auto,dpr_auto/"
    );
  };

  const getMediaUrl = (slide) => {
    const base = process.env.NEXT_PUBLIC_API_URL || "";
    const url =
      isMobile && slide.mobileMediaUrl ? slide.mobileMediaUrl : slide.mediaUrl;
    const fullUrl = url?.startsWith("http") ? url : `${base}${url}`;
    return getOptimizedUrl(fullUrl);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[100vh] bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-lg text-gray-600 animate-pulse">
          Loading beautiful moments...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-[100vh] bg-gradient-to-br from-red-50 to-pink-50 text-center p-6">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchSlides}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow hover:scale-105 transition-transform"
        >
          Try Again
        </button>
      </div>
    );

  return (
    <section className="relative w-full hero-section overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Parallax, EffectFade, Navigation]}
        parallax
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className} custom-bullet"></span>`,
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        loop={slides.length > 1}
        className="w-full h-full"
      >
        {slides.map((slide) => {
          const mediaUrl = getMediaUrl(slide);
          return (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full overflow-hidden">
                {/* 🌈 Ambient blurred background */}
                <div
                  className="absolute inset-0 z-0 ambient-bg"
                  style={{
                    backgroundImage: `url(${mediaUrl})`,
                  }}
                ></div>

                {/* 🖼 Main image / video */}
                {slide.type === "VIDEO" ? (
                  <video
                    className={`absolute inset-0 w-full h-full z-10 ${
                      isMobile ? "object-cover" : "object-contain"
                    } slide-media`}
                    src={mediaUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={mediaUrl}
                    alt={slide.title}
                    className={`absolute inset-0 w-full h-full z-10 ${
                      isMobile ? "object-cover" : "object-contain"
                    } slide-media`}
                    loading="lazy"
                    decoding="async"
                  />
                )}

                {/* 🖋 Text Overlay */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-20 px-6">
                  <h2 className="text-3xl sm:text-5xl font-semibold mb-3 drop-shadow-xl text-overlay">
                    {slide.title}
                  </h2>
                  {slide.subtitle && (
                    <p className="text-base sm:text-lg font-light max-w-md drop-shadow-md text-overlay">
                      {slide.subtitle}
                    </p>
                  )}
                </div>

                {/* 🌑 Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-15 pointer-events-none"></div>
              </div>
            </SwiperSlide>
          );
        })}

        {/* 🟣 Navigation buttons */}
        <div className="swiper-button-prev-custom">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div className="swiper-button-next-custom">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Swiper>

      {/* ✨ Styles */}
      <style jsx>{`
        .hero-section {
          height: 100vh;
          max-height: 900px;
          position: relative;
        }

        .ambient-bg {
          background-size: cover;
          background-position: center;
          filter: blur(40px) saturate(1.2) brightness(0.9);
          transform: scale(1.1);
          opacity: 0.7;
        }

        .slide-media {
          animation: fadeZoom 1s ease-in-out;
          object-fit: contain;
        }

        @keyframes fadeZoom {
          from {
            opacity: 0;
            transform: scale(1.05);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .text-overlay {
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(6px);
          border-radius: 12px;
          padding: 0.5rem 1.25rem;
          display: inline-block;
        }

        .hero-section::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle,
            transparent 65%,
            rgba(0, 0, 0, 0.35) 100%
          );
          pointer-events: none;
          z-index: 15;
        }

        .custom-bullet {
          background: rgba(255, 255, 255, 0.4);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin: 0 4px;
          transition: all 0.3s ease;
        }

        .custom-bullet.swiper-pagination-bullet-active {
          background: linear-gradient(45deg, #ec4899, #8b5cf6);
          transform: scale(1.3);
          box-shadow: 0 0 8px rgba(236, 72, 153, 0.6);
        }

        .swiper-button-prev-custom,
        .swiper-button-next-custom {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 30;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0.7;
        }

        .swiper-button-prev-custom:hover,
        .swiper-button-next-custom:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
        }

        .swiper-button-prev-custom {
          left: 10px;
        }

        .swiper-button-next-custom {
          right: 10px;
        }

        @media (max-width: 768px) {
          .slide-media {
            object-fit: cover;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
