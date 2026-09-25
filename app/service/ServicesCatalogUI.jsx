"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Camera,
  Sparkles,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  ShieldCheck,
  MessageCircle,
  FolderDown,
  ArrowRight,
  SlidersHorizontal,
  Heart,
  ChevronRight,
} from "lucide-react";

import axiosInstance from "@/libs/axios-instance";
import { enrichServiceData } from "@/lib/servicesData";

export default function ServicesCatalogUI({ initialServices = [] }) {
  const [services, setServices] = useState(initialServices);
  const [activeCategory, setActiveCategory] = useState("All");

  // Sync latest services directly from backend API
  React.useEffect(() => {
    let isMounted = true;
    async function syncServices() {
      try {
        const res = await axiosInstance.get("/services/get-services");
        const list = res.data?.services || res.data;
        if (Array.isArray(list) && list.length > 0 && isMounted) {
          const active = list.filter((s) => s.isActive !== false);
          setServices(active.map((s) => enrichServiceData(s)));
        }
      } catch (err) {
        console.warn("Client services sync note:", err.message);
      }
    }
    syncServices();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set();
    services.forEach((s) => {
      if (s.category) set.add(s.category);
    });
    return ["All", ...Array.from(set)];
  }, [services]);

  const filteredServices = useMemo(() => {
    if (activeCategory === "All") return services;
    return services.filter((s) => s.category === activeCategory);
  }, [activeCategory, services]);

  const getWhatsAppUrl = (service) => {
    const text = `Hello Jaya Photography! I'm interested in learning more about your "${service.title}" services in Lucknow. Could you please share package details and available dates?`;
    return `https://wa.me/919335391320?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 selection:bg-amber-200 selection:text-stone-900 font-sans">
      {/* ========================================================
          1. HERO SECTION
      ======================================================== */}
      <section className="relative pt-24 pb-14 sm:pt-28 sm:pb-20 bg-gradient-to-b from-[#F3ECE5] via-[#FAF7F2] to-[#FAF7F2] border-b border-stone-200/80 overflow-hidden text-center">
        {/* Glow blur backgrounds */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-br from-amber-200/30 via-rose-100/20 to-transparent blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/90 border border-stone-200 text-stone-800 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Fine-Art Photography Studio · Lucknow
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-stone-900 leading-[1.15]">
            Artistic Photography Collections For Life’s{" "}
            <span className="italic text-amber-900">Precious Milestones</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
            From tender newborn slumbers and glowing maternity journeys to joyful family legacies. Explore our safety-certified, luxury photography services tailored for your family.
          </p>

          {/* Trust Highlights */}
          <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-stone-200/70 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-stone-800">100% Baby-Safe</p>
                <p className="text-[11px] text-stone-500">Heated & Sanitized</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-stone-200/70 shadow-2xs">
              <Sparkles className="w-5 h-5 text-amber-800 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-stone-800">Designer Wardrobe</p>
                <p className="text-[11px] text-stone-500">Gowns & Props Included</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-stone-200/70 shadow-2xs">
              <FolderDown className="w-5 h-5 text-amber-800 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-stone-800">All RAW Photos</p>
                <p className="text-[11px] text-stone-500">Full Resolution Cloud</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-stone-200/70 shadow-2xs">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-stone-800">⭐ 4.9 / 5 Rating</p>
                <p className="text-[11px] text-stone-500">350+ Happy Families</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. CATEGORY FILTERS & SERVICES GRID
      ======================================================== */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-amber-900 text-white shadow-sm"
                  : "bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.slug || service.id}
              className="group flex flex-col justify-between bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image & Badges */}
              <div>
                <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                  <img
                    src={service.coverImage || service.mainImage}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-60"></div>

                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-stone-800 shadow-xs">
                      {service.category}
                    </span>
                  </div>

                  {service.duration && (
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-stone-900/80 backdrop-blur-md text-amber-200">
                        <Clock className="w-3 h-3" />
                        {service.duration}
                      </span>
                    </div>
                  )}

                  {service.startingPrice && (
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-500 text-stone-950 shadow-xs">
                        From {service.startingPrice}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-serif font-semibold text-stone-900 group-hover:text-amber-900 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 font-light leading-relaxed">
                    {service.subtitle || service.description}
                  </p>

                  {/* Highlights checklist */}
                  {service.features && service.features.length > 0 && (
                    <div className="pt-3 border-t border-stone-100 space-y-1.5">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-2">
                <Link
                  href={`/service/${service.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 transition-colors shadow-xs"
                >
                  <span>Explore Service & Gallery</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={getWhatsAppUrl(service)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-full text-xs font-medium text-emerald-800 hover:bg-emerald-50 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          3. PACKAGES & STUDIO CTA BANNER
      ======================================================== */}
      <section className="py-14 bg-gradient-to-b from-stone-900 to-amber-950 text-white border-t border-stone-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
            Transparent Pricing & Collections
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white">
            Looking for Complete Photoshoot Packages?
          </h2>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Browse our curated Classic, Premium, and Luxury packages for newborn, baby milestone, and maternity photography with detailed inclusions and pricing.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md transition-all cursor-pointer"
            >
              <span>View Packages & Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all cursor-pointer"
            >
              <span>Contact Studio</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
