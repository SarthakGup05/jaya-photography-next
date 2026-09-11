"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  RotateCcw,
  Home,
  RefreshCw,
  MessageCircle,
  Camera,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function GlobalErrorPage({ error, reset }) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Log exception for telemetry / diagnostic tracking
    console.error("Application Error caught by app/error.jsx:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#F0E7E5] text-gray-900 flex flex-col justify-center items-center px-4 py-16 sm:py-24 relative overflow-hidden">
      {/* 🔮 BACKGROUND DECORATIVE ELEMENTS */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-12 right-12 w-80 h-80 bg-purple-200/40 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        {/* 📸 ERROR BADGE & APERTURE */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-red-500/20 via-purple-500/20 to-amber-500/20 blur-lg animate-pulse" />
          
          <div className="relative bg-white/90 backdrop-blur-md px-6 py-3 rounded-full border border-[#e0d0b8] shadow-md flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-sm">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-900">
              System Alert • Unexpected Exception
            </span>
          </div>
        </div>

        {/* ⚠️ MAIN HEADING */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Something Went Wrong
          </h1>
          <p className="text-gray-700 text-base sm:text-lg font-medium max-w-lg mx-auto leading-relaxed">
            An unexpected error occurred while processing this request. Our team has been notified, and we're working behind the lens to fix it.
          </p>
        </div>

        {/* 🛠️ ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {reset && (
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-purple-800 text-white font-bold text-sm hover:bg-purple-900 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
          )}

          <button
            onClick={() => typeof window !== "undefined" && window.location.reload()}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-gray-900 font-bold text-sm border border-[#e0d0b8] hover:bg-gray-50 shadow-xs transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-purple-700" />
            Reload Page
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-black text-white font-bold text-sm hover:bg-gray-800 shadow-xs transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Go to Homepage
          </Link>
        </div>

        {/* 🐞 OPTIONAL TECHNICAL ERROR DETAILS */}
        {error && (
          <div className="pt-4 max-w-xl mx-auto">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-purple-800 transition-colors uppercase tracking-wider cursor-pointer"
            >
              <span>{showDetails ? "Hide Technical Details" : "Show Technical Details"}</span>
              {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showDetails && (
              <div className="mt-3 p-4 bg-white/90 text-left rounded-xl border border-[#e0d0b8] shadow-inner text-xs font-mono text-red-900 overflow-x-auto max-h-40">
                <p className="font-bold text-gray-700 mb-1">Error Message:</p>
                <p>{error?.message || "Unknown Application Error"}</p>
                {error?.digest && (
                  <p className="mt-2 text-gray-500 text-[11px]">
                    Digest Hash: {error.digest}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* 📞 ASSISTANCE FOOTER */}
        <div className="pt-6 border-t border-[#e0d0b8]/80 text-xs text-gray-600 font-medium">
          Need immediate assistance?{" "}
          <Link
            href="/contact-us"
            className="text-purple-800 font-bold hover:underline inline-flex items-center gap-1 ml-1"
          >
            <MessageCircle className="w-3.5 h-3.5" /> Contact Jaya Photography Support
          </Link>
        </div>
      </div>
    </main>
  );
}
