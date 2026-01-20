"use client";

import React, { useState, useEffect, useRef, memo } from "react";
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
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-[#faf9fb] to-[#f5f4f6] overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#1DA1F2]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-3xl text-center relative z-10">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3 text-[#0f1419]">
          What Our Clients Say
        </h2>
        <p className="text-[#5a5a5a] mb-12 text-base md:text-lg">
          Real Experiences, Real Emotions
        </p>

        {/* Tweet-Style Testimonial Card */}
        <div
          ref={cardRef}
          className="relative bg-white border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] rounded-2xl px-6 py-8 md:px-10 md:py-10 text-left max-w-2xl mx-auto transition-all duration-700"
        >
          {/* Header: Profile */}
          <div className="flex items-center mb-6">
            {t.image ? (
              <img
                src={t.image}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#1DA1F2] flex items-center justify-center text-sm font-medium text-white">
                {t.name?.charAt(0)}
              </div>
            )}

            <div className="ml-4 flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-[#0f1419] text-base">
                  {t.name}
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#1DA1F2]" />
              </div>
              <span className="text-sm text-gray-500">@{t.service || "client"}</span>
            </div>
          </div>

          {/* Body: Quote */}
          <div className="relative text-[#0f1419] text-lg md:text-xl leading-relaxed mb-6 font-normal">
            <Quote className="absolute -top-2 -left-3 w-5 h-5 text-[#1DA1F2]/40" />
            <p className="pl-6 italic">“{t.text}”</p>
          </div>

          {/* Rating Stars */}
          <div className="flex items-center gap-1 mb-6">
            {[...Array(t.rating || 5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>

          {/* Footer: Time or tag */}
          <div className="text-sm text-gray-500">
            Captured beautifully — thank you for trusting us 💫
          </div>

          {/* Twitter-style border bar */}
          <div className="absolute left-0 right-0 bottom-0 h-[4px] bg-gradient-to-r from-[#1DA1F2] to-[#a855f7] rounded-b-2xl"></div>
        </div>

        {/* Navigation */}
        {testimonials.length > 1 && (
          <div className="flex justify-center items-center mt-10 gap-6">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-gray-300 hover:bg-[#1DA1F2] hover:text-white transition cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current
                      ? "bg-[#1DA1F2] scale-110"
                      : "bg-gray-300 hover:bg-[#1DA1F2]/50"
                  } cursor-pointer`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full border border-gray-300 hover:bg-[#1DA1F2] hover:text-white transition cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          section {
            padding-top: 5rem;
            padding-bottom: 5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default memo(Testimonials);
