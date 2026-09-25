"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Award, Camera, Sparkles, MapPin, ArrowRight, Quote } from "lucide-react";

const JayaAbout = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload hero image for better LCP
  useEffect(() => {
    const preloadLink = document.createElement("link");
    preloadLink.rel = "preload";
    preloadLink.as = "image";
    preloadLink.href = "/bg/1.jpg";
    preloadLink.fetchPriority = "high";
    document.head.appendChild(preloadLink);

    return () => {
      if (document.head.contains(preloadLink)) {
        document.head.removeChild(preloadLink);
      }
    };
  }, []);

  return (
    <section className="relative py-16 sm:py-24 bg-[#F0E7E5] text-stone-900 overflow-hidden border-t border-[#dfd3c9]">
      {/* Subtle warm ambient background glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#e6d8ce]/50 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ebdcd3]/40 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* ===================================================
           * Left Column: Luxury Portrait Artwork & Framing
           * =================================================== */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px] sm:max-w-[400px]">
              
              {/* Outer Fine-Art Frame */}
              <div className="relative p-3 bg-white/85 backdrop-blur-md rounded-2xl border border-[#ded2c7] shadow-xl">
                
                {/* Photo Container */}
                <div className="relative w-full rounded-xl overflow-hidden bg-stone-900 shadow-inner aspect-[3/4]">
                  {/* Skeleton loader */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center">
                      <div className="w-10 h-10 border-2 border-stone-300 border-t-stone-700 rounded-full animate-spin"></div>
                    </div>
                  )}

                  <Image
                    src="/bg/1.jpg"
                    alt="Jaya Agnihotri — Professional Photographer in Lucknow"
                    fill
                    priority
                    className={`object-cover object-top transition-all duration-700 hover:scale-105 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    sizes="(max-width: 768px) 90vw, 400px"
                  />

                  {/* Subtle Fine-Art Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20 pointer-events-none" />

                  {/* Floating Overlay Badge: Est. 2018 */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="bg-stone-950/70 backdrop-blur-md text-stone-200 border border-white/20 text-[10px] font-medium px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                      Est. 2018
                    </span>
                  </div>

                  {/* Bottom Portrait Caption Card */}
                  <div className="absolute bottom-3 inset-x-3 z-10 bg-white/95 backdrop-blur-md rounded-lg p-3 border border-white/60 shadow-md flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-stone-900 tracking-wide">
                        Jaya Agnihotri
                      </h4>
                      <p className="text-[11px] text-[#6e5445] font-normal">
                        Master’s in Photography • Lead Artist
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 border border-stone-200">
                      <Camera className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Offset decorative border accent */}
              <div className="absolute -inset-1.5 rounded-2xl border border-[#d6c7bc] -z-10 pointer-events-none transform -rotate-1 hidden sm:block" />
            </div>
          </div>

          {/* ===================================================
           * Right Column: Editorial Bio, Story & Stats
           * =================================================== */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e8ded6] border border-[#d8c8bc] text-[#42352f] text-[11px] font-medium tracking-[0.18em] uppercase shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#6e5445]" />
              <span>Behind The Lens</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-bold text-stone-900 leading-[1.2] tracking-tight">
              Meet Jaya Agnihotri —{" "}
              <span className="font-normal italic text-[#6e5445]">
                Professional Photographer in Lucknow
              </span>
            </h2>

            {/* Narrative Body */}
            <div className="space-y-3.5 text-stone-700 text-sm sm:text-base leading-relaxed">
              <p className="text-stone-900 font-medium text-base sm:text-lg leading-relaxed">
                Hi, I’m <strong className="font-bold text-stone-950">Jaya Agnihotri</strong>, founder of Jaya Agnihotri Photography. My photography journey began during college with fashion, food, and product photography before I discovered my passion for capturing babies, mothers, and family connections.
              </p>

              <p className="text-stone-700">
                Since 2018, I have specialized in newborn photography, maternity photography, baby milestone photography, and family portraits in Lucknow. With a Master’s Degree in Photography and 500+ photography sessions, I combine artistic vision, professional studio lighting, creative styling, and a baby-friendly approach.
              </p>

              {/* Highlighted Philosophy Card */}
              <div className="relative p-4 sm:p-5 rounded-xl bg-white/70 backdrop-blur-xs border-l-2 border-[#8C7355] border-y-0 border-r-0 shadow-2xs space-y-1.5 my-3">
                <Quote className="w-4 h-4 text-[#8C7355]/70" />
                <p className="text-xs sm:text-sm font-serif italic text-stone-800 leading-relaxed">
                  Every session is thoughtfully planned around comfort, patience, natural expressions, and meaningful storytelling. Located at Urban Woods Premium Residency, Sector B, Ansal API, near Centrum Hotel, Lucknow, my studio offers a warm and welcoming environment for maternity, newborn, baby, milestone, and family photoshoots.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-600">
                I create timeless portraits celebrating every beautiful stage of your family. Looking for a professional photographer in Lucknow? Explore my portfolio or book your personalized photography session with Jaya Agnihotri Photography to preserve your most meaningful memories beautifully.
              </p>
            </div>

            {/* 3 Luxury Stats Cards - Mobile First */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2">
              <div className="bg-white/85 backdrop-blur-xs rounded-xl p-2.5 sm:p-4 border border-[#ded2c7] text-center shadow-2xs hover:shadow-sm transition-shadow">
                <div className="text-lg sm:text-2xl font-serif font-bold text-stone-900 leading-none mb-1">
                  8+ Years
                </div>
                <div className="text-[9px] sm:text-xs text-stone-600 font-medium uppercase tracking-tight sm:tracking-wide leading-tight">
                  Photography Experience
                </div>
              </div>

              <div className="bg-white/85 backdrop-blur-xs rounded-xl p-2.5 sm:p-4 border border-[#ded2c7] text-center shadow-2xs hover:shadow-sm transition-shadow">
                <div className="text-lg sm:text-2xl font-serif font-bold text-stone-900 leading-none mb-1">
                  500+
                </div>
                <div className="text-[9px] sm:text-xs text-stone-600 font-medium uppercase tracking-tight sm:tracking-wide leading-tight">
                  Photography Sessions
                </div>
              </div>

              <div className="bg-white/85 backdrop-blur-xs rounded-xl p-2.5 sm:p-4 border border-[#ded2c7] text-center shadow-2xs hover:shadow-sm transition-shadow">
                <div className="text-lg sm:text-2xl font-serif font-bold text-stone-900 leading-none mb-1">
                  Master’s
                </div>
                <div className="text-[9px] sm:text-xs text-stone-600 font-medium uppercase tracking-tight sm:tracking-wide leading-tight">
                  Degree in Photography
                </div>
              </div>
            </div>

            {/* Action Buttons - Mobile First */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 pt-2">
              <Link href="/contact-us" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto justify-center px-6 py-3.5 sm:py-3 bg-[#231b19] text-white hover:bg-[#3a2e2a] transition-all duration-300 rounded-full shadow-sm hover:shadow-md cursor-pointer text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2">
                  <span>Book Your Photography Session</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link href="/gallery" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto justify-center px-5 py-3.5 sm:py-3 border border-stone-300 bg-white/80 text-stone-800 hover:bg-white hover:border-stone-500 transition-all duration-300 rounded-full cursor-pointer text-xs sm:text-sm font-semibold shadow-2xs flex items-center">
                  <span>View Portfolio →</span>
                </button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default JayaAbout;

