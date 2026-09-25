"use client";

import React from "react";
import { Camera, ShieldCheck, HeartHandshake, MapPin, Sparkles, Quote } from "lucide-react";

const TRUST_PILLARS = [
  {
    icon: Camera,
    title: "Professional Quality",
    subtitle: "Artistic photography, premium setups & professional studio equipment",
    description:
      "Every session is thoughtfully styled with professional lighting, creative concepts, and attention to detail to create timeless portraits.",
  },
  {
    icon: ShieldCheck,
    title: "Baby-First Approach",
    subtitle: "Comfortable, hygienic & baby-friendly studio experience",
    description:
      "Newborn and baby sessions are planned around your child’s comfort, with a calm, patient approach and carefully selected props and setups.",
  },
  {
    icon: HeartHandshake,
    title: "Flexible & Friendly",
    subtitle: "Personal guidance for posing, outfits, themes & session planning",
    description:
      "From choosing a concept to preparing for your photoshoot, we help make the experience relaxed, organized, and enjoyable for parents and children.",
  },
  {
    icon: MapPin,
    title: "Local & Convenient",
    subtitle: "Photography studio in Sushant Golf City, Lucknow",
    description:
      "Conveniently located near Centrum Hotel, our studio welcomes families from across Lucknow for maternity, newborn, baby, milestone, and family photography.",
  },
];

export default function WhyTrustUs() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F0E7E5] relative overflow-hidden border-t border-[#dfd3c9]">
      {/* Subtle warm ambient glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#e8dbcf]/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#ebdfd6]/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e8ded6] border border-[#d8c8bc] text-[#42352f] text-[11px] font-medium tracking-[0.18em] uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#6e5445]" />
            <span>The Jaya Photography Experience</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-stone-900 tracking-tight leading-[1.2]">
            Why Parents Trust Our{" "}
            <span className="font-normal italic text-[#6e5445]">
              Photography Studio
            </span>
          </h2>

          <p className="text-stone-600 text-sm sm:text-base font-normal leading-relaxed max-w-2xl mx-auto">
            Thoughtfully planned around safety, comfort, and timeless artistry to create an effortless experience for growing families in Lucknow.
          </p>
        </div>

        {/* 4 Pillars Grid - Mobile First */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TRUST_PILLARS.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white/85 backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-[#dfd2c6] shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#ede4dc] text-[#4a3b32] border border-[#dcd0c4] shadow-2xs transition-transform group-hover:scale-105">
                    <IconComponent className="w-5 h-5 text-[#5e4738]" />
                  </div>

                  {/* Title (H3) */}
                  <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-[#5e4738] transition-colors">
                    {pillar.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm font-medium text-[#6e5445] leading-snug">
                    {pillar.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-stone-100 flex items-center text-[11px] font-medium text-stone-400 group-hover:text-stone-700 transition-colors tracking-wide">
                  <span>Pillar 0{idx + 1} of Excellence</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Quote Banner */}
        <div className="max-w-3xl mx-auto mt-6">
          <div className="relative bg-[#231b19] text-white rounded-2xl p-6 sm:p-8 text-center shadow-md border border-[#3d312e] overflow-hidden">
            <Quote className="absolute top-2 left-4 w-12 h-12 text-white/5 pointer-events-none" />
            <Quote className="absolute bottom-2 right-4 w-12 h-12 text-white/5 pointer-events-none rotate-180" />
            <p className="text-base sm:text-lg font-serif italic text-stone-200 leading-relaxed relative z-10">
              “Because every moment of childhood and motherhood deserves to be remembered beautifully.”
            </p>
            <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[#c9b7a7] font-medium">
              — Jaya Agnihotri Photography • Sushant Golf City, Lucknow
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
