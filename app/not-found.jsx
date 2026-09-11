import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Camera,
  Home,
  ArrowLeft,
  Compass,
  Search,
  MessageCircle,
  FolderImage,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Page Not Found | Jaya Photography",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F0E7E5] text-gray-900 flex flex-col justify-center items-center px-4 py-16 sm:py-24 relative overflow-hidden">
      {/* 🔮 ELEGANT BACKGROUND GLOW & DECORATIONS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-100/50 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-3xl w-full text-center space-y-8 relative z-10">
        {/* 📸 APERTURE & 404 BADGE */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-amber-500/20 blur-lg animate-pulse" />
          
          <div className="relative bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-[#e0d0b8] shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center shadow-md">
              <Camera className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-purple-900">
              Error 404 • Frame Out Of Focus
            </span>
          </div>
        </div>

        {/* 404 GIANT DISPLAY NUMBER */}
        <div className="relative">
          <h1 className="text-8xl sm:text-9xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-gray-900 via-purple-950 to-purple-800 tracking-tight select-none drop-shadow-sm">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <span className="text-9xl font-serif font-black tracking-widest text-purple-900">
              JAYA
            </span>
          </div>
        </div>

        {/* HEADING & SUBTITLE */}
        <div className="space-y-3 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900">
            Looks Like This Shot Was Missed
          </h2>
          <p className="text-gray-700 text-base sm:text-lg font-medium leading-relaxed">
            The page or article you are looking for might have been moved, renamed, or is temporarily unavailable in our journal.
          </p>
        </div>

        {/* 🚀 PRIMARY CALL TO ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-black text-white font-bold text-sm hover:bg-purple-900 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </Link>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-gray-900 font-bold text-sm border border-[#e0d0b8] hover:bg-purple-50 hover:border-purple-600 hover:text-purple-900 shadow-xs transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <FolderImage className="w-4 h-4 text-purple-700" />
            Browse Portfolio
          </Link>
        </div>

        {/* 🧭 POPULAR DESTINATIONS GRID */}
        <div className="pt-8 border-t border-[#e0d0b8]/80 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-4">
            Or Explore Popular Destinations
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Home", href: "/", icon: Home, desc: "Main Showcase" },
              { label: "Gallery", href: "/gallery", icon: FolderImage, desc: "Our Work" },
              { label: "Journal", href: "/blogs", icon: Compass, desc: "Tips & Stories" },
              { label: "Contact", href: "/contact-us", icon: MessageCircle, desc: "Get in Touch" },
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group bg-white/70 hover:bg-white p-4 rounded-xl border border-[#e0d0b8] hover:border-purple-600 hover:shadow-md transition-all duration-200 text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-50 group-hover:bg-purple-700 group-hover:text-white text-purple-800 flex items-center justify-center mb-2 transition-colors">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-sm text-gray-900 group-hover:text-purple-800 transition-colors">
                    {item.label}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {item.desc}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* BRAND FOOTNOTE */}
        <div className="pt-4 text-xs text-gray-500 font-medium flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Jaya Photography • Baby & Maternity Specialist Lucknow</span>
        </div>
      </div>
    </main>
  );
}
