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
    handleResize(); // Check on mount
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

  const getOptimizedUrl = (url, isMobileDevice) => {
    if (!url) return "";
    if (!url.includes("res.cloudinary.com")) return url;

    // 1. Desktop: Full width (2560px), original aspect ratio
    // 2. Mobile: Square crop (ar_1:1) at 1200px width for high quality
    const transformation = isMobileDevice 
      ? "c_fill,ar_1:1,g_auto,w_1200,q_auto,f_auto" 
      : "c_fill,w_2560,g_auto,q_auto,f_auto";

    return url.replace("/upload/", `/upload/${transformation}/`);
  };

  const getMediaUrl = (slide) => {
    const base = process.env.NEXT_PUBLIC_API_URL || "";
    // Prioritize mobile specific image if available, else fallback to main image
    const url = isMobile && slide.mobileMediaUrl ? slide.mobileMediaUrl : slide.mediaUrl;
    const fullUrl = url?.startsWith("http") ? url : `${base}${url}`;
    return getOptimizedUrl(fullUrl, isMobile);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-lg font-light tracking-widest">
        CAPTURING MOMENTS...
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-center p-6">
        <p className="text-red-600 mb-3 font-medium">{error}</p>
        <button onClick={fetchSlides} className="px-6 py-3 bg-gray-900 text-white rounded-lg">
          Retry
        </button>
      </div>
    );

  return (
    // ✅ Container: 
    // - Desktop (md:h-screen): Full viewport height
    // - Mobile (aspect-square): Forces 1:1 box
    <section className="relative w-full aspect-square md:aspect-auto md:h-screen overflow-hidden bg-gray-900">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        effect="fade"
        speed={1500}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active custom-bullet-active",
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        loop={slides.length > 1}
        className="h-full w-full"
      >
        {slides.map((slide, index) => {
          const mediaUrl = getMediaUrl(slide);

          return (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full">
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
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none"></div>

                {/* Text Content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4 md:px-6">
                  <h1 className="text-3xl md:text-7xl font-bold text-white drop-shadow-2xl mb-2 animate-fadeInUp">
                    {slide.title}
                  </h1>
                  {slide.subtitle && (
                    <p className="text-sm md:text-2xl text-gray-100 font-light max-w-[80%] drop-shadow-md animate-fadeInUp delay-200">
                      {slide.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {/* Navigation Arrows (Desktop Only) */}
        <div className="swiper-button-prev-custom group hidden md:flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div className="swiper-button-next-custom group hidden md:flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Swiper>

      <style jsx global>{`
        /* Bullet Styles */
        .custom-bullet {
          width: 8px;
          height: 8px;
          margin: 0 4px !important;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s;
        }
        .custom-bullet-active {
          background: #fff;
          transform: scale(1.2);
        }

        /* Nav Buttons */
        .swiper-button-prev-custom,
        .swiper-button-next-custom {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 30;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          cursor: pointer;
        }
        .swiper-button-prev-custom { left: 20px; }
        .swiper-button-next-custom { right: 20px; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
      `}</style>
    </section>
  );
};

export default Hero;