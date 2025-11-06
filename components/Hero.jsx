"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  EffectFade,
  Navigation,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import axiosInstance from "@/libs/axios-instance";

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      setError("Unable to load gallery at the moment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const getOptimizedUrl = (url) => {
    if (!url) return "";
    if (!url.includes("res.cloudinary.com")) return url;
    return url.replace(
      "/upload/",
      "/upload/c_fill,g_auto,q_auto:good,f_auto,dpr_auto/"
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
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-lg">
        Capturing moments...
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-center p-6">
        <p className="text-red-600 mb-3">{error}</p>
        <button
          onClick={fetchSlides}
          className="px-6 py-3 bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105"
        >
          Retry
        </button>
      </div>
    );

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
          bulletActiveClass:
            "swiper-pagination-bullet-active custom-bullet-active",
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        loop={slides.length > 1}
        className="h-full"
      >
        {slides.map((slide) => {
          const mediaUrl = getMediaUrl(slide);
          return (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full">
                {/* Main Image or Video */}
                {slide.type === "VIDEO" ? (
                  <video
                    src={mediaUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={mediaUrl}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70 z-10"></div>

                {/* Content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6">
                  <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-xl tracking-tight mb-3 leading-tight animate-fadeInUp">
                    {slide.title}
                  </h1>
                  {slide.subtitle && (
                    <p className="text-lg md:text-2xl text-gray-200 font-light max-w-2xl animate-fadeInUp delay-100">
                      {slide.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {/* Navigation */}
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

      {/* Styles */}
      <style jsx>{`
        .custom-bullet {
          width: 10px;
          height: 10px;
          margin: 0 5px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .custom-bullet-active {
          background: linear-gradient(90deg, #ec4899, #8b5cf6);
          transform: scale(1.3);
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.6);
        }

        .swiper-button-prev-custom,
        .swiper-button-next-custom {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 30;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .swiper-button-prev-custom:hover,
        .swiper-button-next-custom:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        }

        .swiper-button-prev-custom {
          left: 1rem;
        }
        .swiper-button-next-custom {
          right: 1rem;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1.2s ease forwards;
        }

        @media (max-width: 768px) {
          .swiper-button-prev-custom,
          .swiper-button-next-custom {
            display: none;
          }
          .text-lg {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
