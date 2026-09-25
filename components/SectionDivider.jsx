"use client";

import React from "react";

export default function SectionDivider({ number, label }) {
  return (
    <div className="w-full bg-[#F0E7E5] py-2 sm:py-4 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full flex items-center gap-2 sm:gap-4">
          {/* Left Hairline Gradient */}
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d6c7bc] to-[#c7b5a7]" />

          {/* Editorial Breadcrumb / Section Badge */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#e8ded6]/80 border border-[#d8c8bc] backdrop-blur-xs text-[#42352f] shadow-2xs">
            {number && (
              <span className="font-serif italic text-xs sm:text-sm text-[#7e6047] font-bold">
                {number}
              </span>
            )}
            {number && label && (
              <span className="w-1 h-1 rounded-full bg-[#a38f7f]" />
            )}
            {label && (
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium text-[#42352f]">
                {label}
              </span>
            )}
          </div>

          {/* Right Hairline Gradient */}
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#d6c7bc] to-[#c7b5a7]" />
        </div>
      </div>
    </div>
  );
}
