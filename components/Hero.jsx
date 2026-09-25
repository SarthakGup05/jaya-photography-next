"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import axiosInstance from "@/libs/axios-instance";
import { useRouter } from "next/navigation";
import { Camera, Star, ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Award } from "lucide-react";

const DEFAULT_SLIDES = [
  {
    id: "default-hero",
    mediaUrl: "https://res.cloudinary.com/ddbqkfmrf/image/upload/v1757014131/slider/images/mobile/file_aycjlv.jpg",
    mobileMediaUrl: "https://res.cloudinary.com/ddbqkfmrf/image/upload/v1757014131/slider/images/mobile/file_aycjlv.jpg",
    title: "Best Maternity & Newborn Photographer in Lucknow",
    type: "IMAGE",
  },
];

const Hero = () => {
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

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
      if (activeSlides.length > 0) {
        setSlides(activeSlides);
      }
    } catch (err) {
      console.error("Hero fetch error:", err);
      // Keep default slide if fetch fails instead of breaking UI
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

    const transformation = isMobileDevice
      ? "c_fill,g_auto,w_750,q_auto:good,f_auto"
      : "c_fill,w_1600,g_auto,q_auto:good,f_auto";

    return url.replace("/upload/", `/upload/${transformation}/`);
  };

  const getFullUrl = (url) => {
    if (!url) return "";
    const base = process.env.NEXT_PUBLIC_API_URL || "";
    return url.startsWith("http") ? url : `${base}${url}`;
  };

  if (loading && slides.length === 0) {
    return (
      <div className="relative w-full h-[82vh] min-h-[560px] max-h-[720px] md:h-screen md:min-h-0 md:max-h-none bg-[#F0E7E5] flex flex-col items-center justify-center p-8 space-y-4 mt-0 md:mt-20">
        <div className="w-16 h-16 rounded-full bg-white/70 border border-[#e0d0b8] p-2 flex items-center justify-center shadow-md animate-pulse">
          <Camera className="w-8 h-8 text-purple-700 animate-pulse" />
        </div>
        <div className="h-4 w-40 bg-gray-300/60 rounded-full animate-pulse"></div>
        <div className="h-10 w-96 max-w-full bg-gray-300/60 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  if (error && slides.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#F0E7E5] text-center p-6 space-y-4">
        <p className="text-red-700 font-medium">{error}</p>
        <button
          onClick={fetchSlides}
          className="px-6 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-purple-700 transition-colors cursor-pointer"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  return (
    <section className="relative w-full h-[82vh] min-h-[560px] max-h-[720px] md:h-screen md:min-h-0 md:max-h-none overflow-hidden bg-gray-900 mt-0 md:mt-20">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        effect="fade"
        speed={1500}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: "inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 mx-1 bg-white/40 rounded-full cursor-pointer transition-all duration-300",
          bulletActiveClass: "!w-6 sm:!w-8 !bg-white !rounded-full",
        }}
        navigation={{
          nextEl: ".hero-swiper-next",
          prevEl: ".hero-swiper-prev",
        }}
        loop={slides.length > 1}
        className="h-full w-full hero-swiper-container"
      >
        {slides.map((slide, index) => {
          const desktopUrl = getOptimizedUrl(getFullUrl(slide.mediaUrl), false);
          const mobileUrl = getOptimizedUrl(
            getFullUrl(slide.mobileMediaUrl || slide.mediaUrl),
            true
          );

          return (
            <SwiperSlide key={slide.id || index}>
              <div className="relative h-full w-full">
                {slide.type === "VIDEO" ? (
                  <video
                    src={desktopUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <picture className="absolute inset-0 w-full h-full">
                    <source media="(max-width: 768px)" srcSet={mobileUrl} />
                    <img
                      src={desktopUrl}
                      alt={slide.title || "Hero Photography Slide"}
                      className="w-full h-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding={index === 0 ? "async" : "async"}
                    />
                  </picture>
                )}

                {/* Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30 pointer-events-none"></div>
              </div>
            </SwiperSlide>
          );
        })}

        {/* Custom Navigation Controls (Desktop) */}
        <button
          aria-label="Previous Slide"
          className="hero-swiper-prev group hidden md:flex absolute top-1/2 left-6 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/20 items-center justify-center text-white hover:bg-black/70 hover:border-white/50 transition-all cursor-pointer shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          aria-label="Next Slide"
          className="hero-swiper-next group hidden md:flex absolute top-1/2 right-6 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/20 items-center justify-center text-white hover:bg-black/70 hover:border-white/50 transition-all cursor-pointer shadow-lg"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </Swiper>

      {/* 🌟 Content Container */}
      <div className="absolute inset-x-0 bottom-0 top-0 p-5 pt-16 pb-12 sm:p-8 md:p-12 lg:p-16 z-20 flex flex-col justify-end md:justify-center items-start bg-gradient-to-t from-black/95 via-black/40 to-transparent md:bg-none pointer-events-none">
        <div className="max-w-4xl w-full space-y-3 sm:space-y-5 pointer-events-auto">
          
          {/* Studio Eyebrow Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-semibold uppercase tracking-widest shadow-md">
            Jaya Agnihotri Photography • Lucknow
          </div>

          {/* Main H1 Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-snug sm:leading-[1.12] tracking-tight drop-shadow-2xl">
            Maternity, Newborn & Baby Photographer{" "}
            <span className="font-normal italic text-[#f5e8db] block sm:inline mt-0.5 sm:mt-0">
              in Lucknow
            </span>
          </h1>

          {/* Intro Description */}
          <div className="text-stone-200 font-light text-xs sm:text-base leading-relaxed max-w-2xl drop-shadow-sm space-y-1.5">
            <p>
              Beautifully crafted maternity portraits, newborn photographs, baby milestones and family memories in a warm, baby-friendly luxury photography studio in Lucknow.
            </p>
            <p className="hidden sm:block">
              From your pregnancy journey to your baby's first year and beyond, every session is thoughtfully planned around comfort, connection, styling and timeless storytelling.
            </p>
          </div>

          {/* Action & Trust Section */}
          <div className="pt-2 space-y-3.5">
            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => router.push("/contact-us")}
                className="group flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 bg-white text-stone-900 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 hover:bg-stone-100 shadow-xl cursor-pointer active:scale-95"
              >
                <span>Book Your Photography Session</span>
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#231b19] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              </button>

              <button
                onClick={() => router.push("/gallery")}
                className="px-5 py-3 sm:px-6 sm:py-3.5 border border-white/35 text-white rounded-full text-xs sm:text-sm font-medium hover:bg-white/15 transition-all cursor-pointer backdrop-blur-xs text-center"
              >
                Explore Portfolio
              </button>
            </div>

            {/* Trust Badges - 4.9/5 Client Rating | 500+ Families & Sessions | Master's in Photography | Baby-Friendly Studio */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs text-stone-200 font-medium pt-1">
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
                <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>4.9/5 Client Rating</span>
              </div>
              <span className="text-white/40 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-300" />
                <span>500+ Families & Sessions</span>
              </div>
              <span className="text-white/40 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
                <Award className="w-3.5 h-3.5 text-stone-300" />
                <span>Master's in Photography</span>
              </div>
              <span className="text-white/40 hidden md:inline">•</span>
              <div className="hidden md:flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10 text-stone-200">
                <span>Baby-Friendly Studio</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;