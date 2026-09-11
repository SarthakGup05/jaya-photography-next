"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, Camera } from "lucide-react";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body className="bg-[#F0E7E5] text-gray-900 font-sans antialiased min-h-screen flex items-center justify-center p-4">
        <div className="max-w-xl w-full text-center space-y-6 bg-white/80 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-[#e0d0b8] shadow-xl">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center border border-red-200 shadow-xs">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              Critical Application Error
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed font-medium">
              A critical error prevented the application layout from rendering. Please try refreshing or return to the main home page.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-800 text-white font-bold text-xs hover:bg-purple-900 transition-colors shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>

            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-bold text-xs hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
            >
              <Home className="w-4 h-4" />
              Reload Homepage
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
