"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle2,
  Quote,
} from "lucide-react";
import axiosInstance from "@/libs/axios-instance";

// ✅ Lazy-load GSAP for performance
const loadGSAP = () => import("gsap");

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const cardRef = useRef(null);
  const gsapRef = useRef(null);

  // ✅ Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axiosInstance.get("/testimonials/get-testimonials");
        const data = res.data.testimonials
          .filter((t) => t.isActive && t.type === "text")
          .sort((a, b) => a.sortOrder - b.sortOrder);
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };
    fetchTestimonials();
  }, []);

  // ✅ Lazy-load GSAP
  useEffect(() => {
    loadGSAP().then((mod) => {
      gsapRef.current = mod.gsap;
    });
  }, []);

  // ✅ Animate card transition
  useEffect(() => {
    if (!gsapRef.current || !cardRef.current) return;
    const gsap = gsapRef.current;
    const card = cardRef.current;

    gsap.fromTo(
      card,
      {
        x: direction > 0 ? 80 : -80,
        opacity: 0,
        rotateY: direction > 0 ? 8 : -8,
      },
      {
        x: 0,
        opacity: 1,
        rotateY: 0,
        duration: 0.7,
        ease: "power3.out",
      }
    );
  }, [current, direction]);

  // ✅ Auto-slide every 6s
  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials]);

  if (testimonials.length === 0) return null;

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-20 sm:pb-24 bg-[#F0E7E5] border-t border-[#dfd3c9] overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#ebdcd3]/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#e6d8ce]/40 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10 space-y-8 sm:space-y-10">
        {/* ===================================================
         * 1. Section Header (Clean & Punchy)
         * =================================================== */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block text-[11px] font-medium text-[#42352f] bg-[#e8ded6] border border-[#d8c8bc] px-4 py-1.5 rounded-full uppercase tracking-[0.18em] shadow-2xs">
            What Our Clients Say
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold tracking-tight text-stone-900 leading-[1.2]">
            Real Experiences,{" "}
            <span className="font-normal italic text-[#6e5445]">
              Real Emotions
            </span>
          </h2>

          <p className="text-stone-600 text-sm sm:text-base font-normal leading-relaxed">
            Heartfelt stories from families who trusted Jaya Agnihotri Photography for their maternity, newborn, baby, and milestone portraits in Lucknow.
          </p>
        </div>

        {/* ===================================================
         * 2. Luxury Fine-Art Editorial Testimonial Card
         * =================================================== */}
        <div
          ref={cardRef}
          className="relative bg-white/90 backdrop-blur-md border border-[#dfd2c6] shadow-sm hover:shadow-md rounded-3xl p-7 sm:p-10 md:p-12 text-left max-w-3xl mx-auto transition-all"
        >
          {/* Top Bar: Rating & Category Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-stone-200/80">
            {/* 5 Warm Gold Stars */}
            <div className="flex items-center gap-1">
              {[...Array(t.rating || 5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-amber-500 fill-amber-400"
                />
              ))}
              <span className="ml-2 text-xs font-semibold text-stone-700 tracking-wide">
                5.0 Rating
              </span>
            </div>

            {/* Session Tag */}
            <span className="text-[11px] font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-[#f3eae3] text-[#5e4738] border border-[#dcd0c4]">
              {t.service || "Maternity & Newborn Session"}
            </span>
          </div>

          {/* Quote Body */}
          <div className="py-6 sm:py-8 space-y-3">
            <Quote className="w-8 h-8 text-[#8C7355]/30 -mb-1" />
            <p className="text-lg sm:text-2xl font-serif text-stone-900 leading-relaxed italic font-normal">
              “{t.text}”
            </p>
          </div>

          {/* Author Profile & Navigation Footer */}
          <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            {/* Reviewer Details */}
            <div className="flex items-center gap-3.5">
              {t.image ? (
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#dfd2c6]"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#ede4dc] text-[#5e4738] border border-[#dcd0c4] flex items-center justify-center text-base font-serif font-bold shadow-2xs">
                  {t.name?.charAt(0) || "P"}
                </div>
              )}

              <div>
                <h4 className="font-serif font-bold text-stone-900 text-base sm:text-lg leading-tight">
                  {t.name}
                </h4>
                <p className="text-xs text-[#6e5445] font-medium tracking-wide mt-0.5">
                  Verified Family • Lucknow
                </p>
              </div>
            </div>

            {/* Carousel Navigation */}
            {testimonials.length > 1 && (
              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-xs font-serif text-stone-500 tracking-widest mr-1">
                  0{current + 1} / 0{testimonials.length}
                </span>

                <button
                  onClick={prev}
                  className="w-9 h-9 rounded-full border border-stone-300 bg-white/90 hover:bg-[#231b19] hover:text-white hover:border-[#231b19] transition-all text-stone-700 flex items-center justify-center cursor-pointer shadow-2xs"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={next}
                  className="w-9 h-9 rounded-full border border-stone-300 bg-white/90 hover:bg-[#231b19] hover:text-white hover:border-[#231b19] transition-all text-stone-700 flex items-center justify-center cursor-pointer shadow-2xs"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ===================================================
         * 3. Editorial Studio Information & Comfort Pillars
         * =================================================== */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-[#dfd2c6] shadow-2xs space-y-5 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 text-left">
            <div className="space-y-1.5">
              <h3 className="text-sm sm:text-base font-serif font-bold text-stone-900">
                Patience, Comfort & Meaningful Storytelling
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                From a baby’s first portraits and milestone moments to maternity journeys and family celebrations, every session is thoughtfully created around comfort, patience, creativity and genuine emotions.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm sm:text-base font-serif font-bold text-stone-900">
                Urban Woods Photography Studio
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                Located at Urban Woods Premium Residency, Sector B, Ansal API, Near Centrum Hotel, Lucknow, our studio offers a calm, welcoming environment designed specifically for newborn safety, maternity comfort, and memorable family photoshoots.
              </p>
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/gallery"
                className="text-stone-800 hover:text-stone-950 underline underline-offset-4 transition-colors"
              >
                View Portfolio →
              </Link>
              <span className="text-stone-300">|</span>
              <Link
                href="/packages"
                className="text-stone-800 hover:text-stone-950 underline underline-offset-4 transition-colors"
              >
                Explore Packages →
              </Link>
            </div>

            <Link
              href="/contact-us"
              className="w-full sm:w-auto text-center px-5 py-2.5 rounded-full bg-[#231b19] text-white hover:bg-[#3a2e2a] text-xs font-medium tracking-wide transition-all shadow-2xs"
            >
              Book Your Session →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Testimonials);
