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
import { useRouter } from "next/navigation";

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
        <button onClick={fetchSlides} className="px-6 py-3 bg-gray-900 text-white rounded-lg cursor-pointer">
          Retry
        </button>
      </div>
    );

  return (
    // ✅ Container: 
    // - Desktop (md:h-screen): Full viewport height
    // - Mobile (aspect-square): Forces 1:1 box
    <section className="relative w-full aspect-square md:aspect-auto md:h-screen overflow-hidden bg-gray-900 mt-0 md:mt-20">
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

                {/* Gradient Overlay - Cinematic */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none"></div>

                {/* Content Container */}
                <div className="absolute inset-x-0 bottom-0 top-0 p-6 pt-20 md:p-12 lg:p-16 z-20 flex flex-col justify-end md:justify-center items-start bg-gradient-to-t from-black/90 via-black/40 to-transparent md:bg-none">
                  <div className="max-w-4xl w-full animate-fadeInUp">
                    
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3 mb-3 md:mb-3">
                      <span className="h-[1px] w-8 bg-purple-300/50 md:hidden"></span>
                      <p className="text-purple-200 font-medium tracking-[0.2em] text-[10px] md:text-sm uppercase shadow-black drop-shadow-md">
                        Jaya Photography
                      </p>
                    </div>

                    {/* Main H1 */}
                    <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] md:leading-[1.1] mb-4 md:mb-6 drop-shadow-2xl font-serif">
                      Best Maternity & <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-white animate-gradient-x bg-[length:200%_auto]">
                        Newborn Photographer
                      </span> <br />
                      <span className="text-xl sm:text-2xl md:text-5xl lg:text-6xl font-light text-white/90 mt-1 block md:inline">
                        in Lucknow
                      </span>
                    </h1>

                    {/* Desktop: Grid Layout for Intro Text & CTA */}
                    <div className="hidden md:grid grid-cols-[auto_1fr] gap-8 items-end mt-6 border-t border-white/20 pt-6">
                      {/* Left: CTA */}
                      <div>
                        <button 
                          onClick={() => router.push("/contact-us")}
                        className=" cursor-pointer group flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full font-medium transition-all hover:bg-purple-50"
                        >
                          Book a Session
                          <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                            →
                          </span>
                        </button>
                      </div>

                      {/* Right: Description Text (Editorial Style) */}
                      <div className="text-gray-200 font-light text-sm lg:text-base leading-relaxed max-w-lg">
                        <p className="mb-2">
                          We believe every moment of life is precious — especially the tiny smiles, tender touches, and glowing emotions of motherhood.
                        </p>
                        <p className="text-white/60 text-xs italic">
                          "We capture feelings, love, and unforgettable moments."
                        </p>
                      </div>
                    </div>

                    {/* Mobile: Premium Simplified View */}
                    <div className="md:hidden mt-4 space-y-5">
                      <p className="text-gray-100/90 font-light text-sm leading-relaxed mb-4 line-clamp-3 drop-shadow-sm">
                        Capturing the tiny smiles, tender touches, and glowing emotions. We don’t just take photos, we preserve your most beautiful memories.
                      </p>
                      
                      <div className="flex flex-col gap-3">
                        <button 
                          onClick={() => router.push("/contact-us")}
                          className="w-full py-3.5 bg-white/95 backdrop-blur-sm text-gray-900 rounded-2xl font-semibold text-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span>Book Your Session</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                        </button>
                        
                        <div className="flex items-center justify-center gap-4 text-[10px] text-white/60 font-medium tracking-wide">
                          <span className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span> 4.9/5 Rating
                          </span>
                          <span className="w-1 h-1 rounded-full bg-white/30"></span>
                          <span>500+ Happy Families</span>
                        </div>
                      </div>
                    </div>

                  </div>
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

        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;