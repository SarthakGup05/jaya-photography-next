"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axiosInstance from "@/libs/axios-instance";
import { ArrowRight, Camera, Star, ArrowUpRight } from "lucide-react";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(new Set());
  const [selectedTab, setSelectedTab] = useState("All");

  const router = useRouter();

  /* -----------------------------------------------
   ✅ Fetch Services
  ------------------------------------------------*/
  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/services/get-services");
      setServices(response.data || []);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to load services. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleServiceClick = (slug) => {
    if (slug) router.push(`/service/${slug}`);
  };

  const handleImageLoad = (id) => {
    setImagesLoaded((prev) => new Set([...prev, id]));
  };

  const activeServices = services.filter((s) => s.isActive !== false);

  const categories = ["All", ...Array.from(new Set(activeServices.map((s) => s.category).filter(Boolean)))];

  const filteredServices = selectedTab === "All"
    ? activeServices
    : activeServices.filter((s) => s.category === selectedTab);

  /* -----------------------------------------------
   ✅ Loading Skeleton
  ------------------------------------------------*/
  if (loading) {
    return (
      <section className="py-24 bg-[#FDFBF7] text-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16 space-y-4">
          <div className="h-6 w-40 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
          <div className="h-12 w-96 bg-gray-200 rounded-xl mx-auto animate-pulse"></div>
          <div className="h-4 w-full max-w-lg bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-gray-200 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  /* -----------------------------------------------
   ✅ Error State
  ------------------------------------------------*/
  if (error) {
    return (
      <section className="py-20 bg-[#FDFBF7] text-center">
        <div className="max-w-md mx-auto px-6 space-y-4">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={fetchServices}
            className="px-6 py-2.5 bg-black text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-black transition-colors cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 bg-[#F0E7E5] text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* 🌟 Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="inline-block text-xs font-bold text-purple-700 bg-purple-100/70 border border-purple-200 px-4 py-1.5 rounded-full uppercase tracking-wider">
            Our Photography Services in Lucknow
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Capturing Life's <span className="bg-gradient-to-r from-black to-purple-800 bg-clip-text text-transparent">Precious Moments</span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg font-light leading-relaxed">
            Specializing in safety-first newborn sessions, glowing maternity portraits, and interactive baby milestone photography in Lucknow.
          </p>

          {/* 🏷️ Optional Category Tabs (If multiple categories exist) */}
          {categories.length > 2 && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedTab(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    selectedTab === cat
                      ? "bg-black text-white shadow-md scale-105"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-purple-600 hover:bg-purple-50/50 hover:text-purple-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 🖼️ Services Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={28}
          slidesPerView={1}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-16"
        >
          {filteredServices.map((service, index) => (
            <SwiperSlide key={service.id || service._id || service.slug || index}>
              <div
                onClick={() => handleServiceClick(service.slug)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 transition-all duration-500 cursor-pointer flex flex-col justify-end h-[460px]"
              >
                {/* Background Cover Image */}
                <div className="absolute inset-0 bg-gray-100">
                  <Image
                    src={service.coverImage || service.mainImage || "/bg/1.jpg"}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={index < 2}
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    onLoad={() => handleImageLoad(service.id)}
                  />
                </div>

                {/* Multi-stage Luxury Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-all duration-500"></div>

                {/* Top Action Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="bg-black/60 backdrop-blur-md text-[#E5C158] border border-[#D4AF37]/30 text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {service.category || "Specialty"}
                  </span>
                  
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-[#D4AF37] transition-all duration-300 shadow-md">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 p-6 space-y-3">
                  <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#E5C158] transition-colors leading-tight">
                    {service.title}
                  </h3>

                  {service.subtitle && (
                    <p className="text-gray-300 text-xs sm:text-sm line-clamp-2 font-light leading-relaxed">
                      {service.subtitle}
                    </p>
                  )}

                  <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#E5C158] group-hover:text-white transition-colors">
                    <span>Explore Details & Packages</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Services;
