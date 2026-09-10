import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F0E7E5] text-gray-900 transition-all duration-500">
      <div className="relative flex items-center justify-center mb-6">
        {/* Animated Outer Pulse Ring */}
        <div className="absolute w-28 h-28 rounded-full border-2 border-purple-700/30 animate-ping opacity-75"></div>
        <div className="absolute w-24 h-24 rounded-full border border-purple-700/50 animate-spin border-t-purple-700"></div>

        {/* Central Logo Badge */}
        <div className="w-16 h-16 rounded-full bg-white border border-[#e0d0b8] p-2 flex items-center justify-center shadow-lg relative z-10">
          <Image
            src="/logo.png"
            alt="Jaya Photography"
            width={48}
            height={48}
            style={{ height: "auto" }}
            className="object-contain"
          />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="font-serif text-xl font-bold text-gray-900 tracking-wide">
          Jaya Photography
        </h3>
        <p className="text-xs uppercase tracking-widest text-purple-800 font-bold animate-pulse">
          Crafting Timeless Memories...
        </p>
      </div>
    </div>
  );
}
