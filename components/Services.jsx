"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "@/libs/axios-instance";
import { ArrowRight, Camera, Star, ArrowUpRight, Sparkles, MapPin } from "lucide-react";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const DEFAULT_SERVICES = [
  {
    id: "s1",
    title: "Newborn Photography",
    slug: "baby-milestone-photoshoot-lucknow",
    category: "Newborn",
    subtitle: "Safety-first luxury newborn photography in Sushant Golf City, Lucknow.",
    coverImage: "/bg/1.jpg",
  },
  {
    id: "s2",
    title: "Maternity Photoshoot",
    slug: "maternity-photoshoot-lucknow",
    category: "Maternity",
    subtitle: "Celebrate your maternity journey with artistic fine-art portraits.",
    coverImage: "/bg/2.JPG",
  },
  {
    id: "s3",
    title: "Baby Milestone & Cake Smash",
    slug: "toddler-photoshoot-lucknow",
    category: "Baby Milestone",
    subtitle: "Capturing sitting, crawling, and cake smash celebration milestones.",
    coverImage: "/bg/lavender.jpg",
  },
  {
    id: "s4",
    title: "Fashion & Family Photography",
    slug: "fashion-photographer-lucknow",
    category: "Portrait",
    subtitle: "Elegant fashion shoots & memorable family portraits in studio.",
    coverImage: "/bg/2.JPG",
  },
];

const Services = () => {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(new Set());

  const router = useRouter();

  /* -----------------------------------------------
   ✅ Fetch Services
  ------------------------------------------------*/
  const fetchServices = async () => {
    try {
      const response = await axiosInstance.get("/services/get-services");
      if (response.data && response.data.length > 0) {
        setServices(response.data);
      }
    } catch (err) {
      console.error("Error fetching services:", err);
      // Keep default services gracefully
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

  /* -----------------------------------------------
   ✅ Loading Skeleton
  ------------------------------------------------*/
  if (loading && services.length === 0) {
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
    <section className="relative pt-10 pb-14 sm:pt-14 sm:pb-18 bg-[#F0E7E5] text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* 🌟 Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3.5">
          <span className="inline-block text-[11px] font-medium text-[#42352f] bg-[#e8ded6] border border-[#d8c8bc] px-4 py-1.5 rounded-full uppercase tracking-[0.18em] shadow-2xs">
            Our Photography Services in Lucknow
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-stone-900 leading-[1.2] tracking-tight">
            Maternity, Newborn, Baby & Family Photography{" "}
            <span className="font-normal italic text-[#6e5445]">
              in Lucknow
            </span>
          </h2>

          <p className="text-stone-600 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            From maternity portraits to your baby’s first milestones, Jaya Agnihotri Photography offers thoughtfully planned photography sessions in Lucknow for newborns, babies, mothers-to-be, children and families.
          </p>

          {/* Quick Action Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-1">
            <Link
              href="/service"
              className="px-4 py-2 rounded-full bg-[#231b19] text-white hover:bg-[#3a2e2a] text-xs font-medium tracking-wide transition-all shadow-2xs"
            >
              Explore All Services →
            </Link>
            <Link
              href="/packages"
              className="px-4 py-2 rounded-full bg-white/90 text-stone-800 border border-stone-300 hover:border-stone-500 text-xs font-medium tracking-wide transition-all shadow-2xs"
            >
              Check Packages →
            </Link>
            <Link
              href="/contact-us"
              className="px-4 py-2 rounded-full bg-white/90 text-stone-800 border border-stone-300 hover:border-stone-500 text-xs font-medium tracking-wide transition-all shadow-2xs"
            >
              Book Your Session →
            </Link>
          </div>
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
          {activeServices.map((service, index) => (
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
                    sizes="(max-width: 640px) 360px, (max-width: 1024px) 320px, 280px"
                    quality={75}
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

        {/* 🌟 Editorial Studio Story & Services Highlights */}
        <div className="mt-4 bg-white/85 backdrop-blur-md rounded-2xl p-6 sm:p-10 border border-[#dfd2c6] shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
            {/* Left Column: Scope & Styling */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#42352f] bg-[#ede4dc] px-3 py-1 rounded-full border border-[#dcd0c4]">
                <Sparkles className="w-3.5 h-3.5 text-[#6e5445]" />
                <span>Artistic Styling & Creative Concepts</span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 leading-snug">
                Artistic Photography, Studio Lighting & Baby-Friendly Care
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
                Our services include newborn photography, baby photography, maternity photoshoots, baby milestone photography, cake smash, toddler and kids photography, family portraits, creative theme photoshoots, and fashion photography. Each session combines artistic styling, professional studio lighting, customized concepts and a baby-friendly approach.
              </p>
            </div>

            {/* Right Column: Studio Comfort & Location */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#42352f] bg-[#ede4dc] px-3 py-1 rounded-full border border-[#dcd0c4]">
                <MapPin className="w-3.5 h-3.5 text-[#6e5445]" />
                <span>Sushant Golf City Studio, Lucknow</span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 leading-snug">
                Located near Centrum Hotel, Sushant Golf City
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
                Located in Sushant Golf City, Lucknow, near Centrum Hotel, our photography studio is designed to create comfortable, personalized sessions while preserving genuine expressions, beautiful connections and meaningful memories.
              </p>
            </div>
          </div>

          {/* Bottom Callout Banner */}
          <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
              Whether you're looking for a newborn photographer in Lucknow, baby photographer for a milestone session, maternity photographer for your pregnancy portraits, or a family photographer for timeless family memories, explore our services and find the session that fits your story.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
              <Link
                href="/contact-us"
                className="w-full sm:w-auto"
              >
                <button className="w-full sm:w-auto justify-center px-5 py-3 sm:py-2.5 rounded-full bg-[#231b19] text-white hover:bg-[#3a2e2a] text-xs font-medium tracking-wide transition-all shadow-sm flex items-center">
                  Book Your Session →
                </button>
              </Link>
              <Link
                href="/gallery"
                className="w-full sm:w-auto"
              >
                <button className="w-full sm:w-auto justify-center px-5 py-3 sm:py-2.5 rounded-full border border-stone-300 hover:border-stone-500 text-stone-800 text-xs font-medium tracking-wide transition-all bg-white flex items-center">
                  View Gallery →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
