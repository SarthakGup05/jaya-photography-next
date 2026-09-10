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
import { Camera, Star, ChevronLeft, ChevronRight, ArrowRight, ShieldCheck } from "lucide-react";

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
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

    const transformation = isMobileDevice
      ? "c_fill,ar_1:1,g_auto,w_1200,q_auto,f_auto"
      : "c_fill,w_2560,g_auto,q_auto,f_auto";

    return url.replace("/upload/", `/upload/${transformation}/`);
  };

  const getMediaUrl = (slide) => {
    const base = process.env.NEXT_PUBLIC_API_URL || "";
    const url = isMobile && slide.mobileMediaUrl ? slide.mobileMediaUrl : slide.mediaUrl;
    const fullUrl = url?.startsWith("http") ? url : `${base}${url}`;
    return getOptimizedUrl(fullUrl, isMobile);
  };

  if (loading) {
    return (
      <div className="relative w-full aspect-square md:aspect-auto md:h-screen bg-[#F0E7E5] flex flex-col items-center justify-center p-8 space-y-4">
        <div className="w-16 h-16 rounded-full bg-white/70 border border-[#e0d0b8] p-2 flex items-center justify-center shadow-md animate-pulse">
          <Camera className="w-8 h-8 text-purple-700 animate-pulse" />
        </div>
        <div className="h-4 w-40 bg-gray-300/60 rounded-full animate-pulse"></div>
        <div className="h-10 w-96 max-w-full bg-gray-300/60 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  if (error) {
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
    <section className="relative w-full aspect-square md:aspect-auto md:h-screen overflow-hidden bg-gray-900 mt-0 md:mt-20">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        effect="fade"
        speed={1500}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: "inline-block w-2.5 h-2.5 mx-1 bg-white/40 rounded-full cursor-pointer transition-all duration-300",
          bulletActiveClass: "!w-8 !bg-white !rounded-full",
        }}
        navigation={{
          nextEl: ".hero-swiper-next",
          prevEl: ".hero-swiper-prev",
        }}
        loop={slides.length > 1}
        className="h-full w-full"
      >
        {slides.map((slide, index) => {
          const mediaUrl = getMediaUrl(slide);

          return (
            <SwiperSlide key={slide.id || index}>
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
                    alt={slide.title || "Hero Photography Slide"}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                )}

                {/* Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30 pointer-events-none"></div>
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
      <div className="absolute inset-x-0 bottom-0 top-0 p-6 pt-20 md:p-12 lg:p-16 z-20 flex flex-col justify-end md:justify-center items-start bg-gradient-to-t from-black/90 via-black/40 to-transparent md:bg-none pointer-events-none">
        <div className="max-w-4xl w-full space-y-6 pointer-events-auto">
          
          {/* Studio Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-widest">
            Jaya Photography Lucknow
          </div>

          {/* Main H1 Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.12] tracking-tight drop-shadow-2xl">
            Best Maternity & <br />
            <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent">
              Newborn Photographer
            </span> <br />
            <span className="text-2xl sm:text-4xl lg:text-5xl font-light text-white/90">
              in Lucknow
            </span>
          </h1>

          {/* Desktop Intro & Action Row */}
          <div className="hidden md:grid grid-cols-[auto_1fr] gap-8 items-center pt-4 border-t border-white/20">
            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/contact-us")}
                className="group flex items-center gap-2.5 px-7 py-3.5 bg-white text-black rounded-full text-sm font-bold transition-all duration-300 hover:bg-purple-100 shadow-xl cursor-pointer"
              >
                <span>Book a Session</span>
                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>

              <button
                onClick={() => router.push("/gallery")}
                className="px-6 py-3.5 border border-white/40 text-white rounded-full text-sm font-semibold hover:bg-white/10 transition-all cursor-pointer backdrop-blur-xs"
              >
                Explore Gallery
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 text-xs text-white/80 font-medium border-l border-white/20 pl-6">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>4.9/5 Star Rating</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-300" />
                <span>Baby-Safe Studio</span>
              </div>
            </div>
          </div>

          {/* Mobile View CTA */}
          <div className="md:hidden pt-2 space-y-4">
            <p className="text-gray-200 font-light text-xs sm:text-sm leading-relaxed line-clamp-2">
              Preserving tiny smiles, tender touches, and glowing emotions in a baby-safe studio.
            </p>
            
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => router.push("/contact-us")}
                className="w-full py-3.5 bg-white text-black rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book Your Session</span>
                <ArrowRight className="w-4 h-4 text-purple-700" />
              </button>
              
              <div className="flex items-center justify-center gap-3 text-[11px] text-white/70 font-medium">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  4.9/5 Rating
                </span>
                <span>•</span>
                <span>500+ Happy Families</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;