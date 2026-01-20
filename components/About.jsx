"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const JayaAbout = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // ✅ Preload hero image for better LCP
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
    <div className="min-h-screen bg-black mt-20">
      {/* About Section */}
      <div className="py-16 bg-[#F0E7E5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative">
                {/* Container with fixed ratio to avoid CLS */}
                <div
                  className="w-80 h-[500px] rounded-lg overflow-hidden shadow-lg relative"
                  style={{ aspectRatio: "320/500" }}
                >
                  {/* Skeleton loader */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                      <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-400 rounded-full animate-spin"></div>
                    </div>
                  )}

                  {/* ✅ Next.js optimized image */}
                  <Image
                    src="/bg/1.jpg"
                    alt="Jaya - Professional Photographer"
                    fill
                    priority
                    className={`object-cover transition-opacity duration-500 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    sizes="(max-width: 768px) 100vw, 500px"
                  />

                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                </div>

                {/* Decorative dots */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-200 rounded-full"></div>
                <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-yellow-200 rounded-full"></div>
              </div>
            </div>

            {/* Right - Text */}
            <div className="space-y-6">
              <div className="text-gray-600 text-xs uppercase tracking-wider font-medium">
                Photographer
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold text-black leading-tight">
                Meet Jaya — Professional Photographer in Lucknow
              </h2>

              <div className="space-y-4 text-gray-700 text-lg leading-relaxed font-semibold">
                <p>
                  Hi, I'm <span className="text-black font-bold">Jaya Agnihotri</span>, founder of Jaya Photography.
                  Photography has been my passion since college — I began with fashion, food, and product shoots, but my heart always belonged to babies and mothers.
                </p>
                <p>
                  In 2018, I followed my calling and began specializing in newborn, maternity, baby milestone, and family portraits.
                  Today, after <span className="font-bold">500+ successful sessions</span> and a <span className="font-bold">Masters in Photography</span>, I bring an artistic vision and baby-safe expertise to every session.
                </p>
                <p>
                  For me, every shoot is about love, patience, comfort, and storytelling.
                  I create a warm, girl-friendly environment with professional studio lighting and creative styling.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4 pt-4 flex-wrap">
                <Link href="/gallery">
                  <button className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl cursor-pointer">
                    View Portfolio
                  </button>
                </Link>

                <Link href="/contact-us">
                  <button className="px-6 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded-lg cursor-pointer">
                    Book Session
                  </button>
                </Link>
              </div>

              {/* Minimal stats */}
              <div className="grid grid-cols-3 gap-6 mt-10 pt-6 border-t border-gray-300">
                <div className="text-center">
                  <div className="text-lg font-light text-black mb-1">10+ Years</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-light text-black mb-1">500+ Shoots</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">
                    Sessions
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-light text-black mb-1">Masters In</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">
                    Photography
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        img {
          max-width: 100%;
          height: auto;
          display: block;
        }

        .w-80 {
          contain: layout style paint;
        }
      `}</style>
    </div>
  );
};

export default JayaAbout;
