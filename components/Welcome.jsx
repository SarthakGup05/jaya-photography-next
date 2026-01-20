"use client";
import React, { useEffect, useRef } from "react";
import { Camera, Heart, Sparkles } from "lucide-react";

const Welcome = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Simple intersection observer for fade-in effect if GSAP isn't available/loaded yet
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-gradient-to-b from-white to-[#F0E7E5] overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Decorative Icon */}
        <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 mb-6 flex justify-center">
          <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center border border-purple-100 shadow-sm">
            <Heart className="w-6 h-6 text-purple-400 fill-purple-100" />
          </div>
        </div>

        {/* Main Welcome Text */}
        <h2 className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-8 leading-tight font-serif">
          Welcome to <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Jaya Photography</span>
          <span className="block text-xl md:text-2xl text-gray-500 font-light mt-4 font-sans">one of the most loved maternity, newborn, and baby photographers in Lucknow.</span>
        </h2>

        {/* Body Text */}
        <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200 space-y-6 text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          <p>
            We believe every moment of life is precious — especially the <span className="text-pink-500 font-medium">tiny smiles</span>, 
            <span className="text-purple-500 font-medium"> tender touches</span>, 
            <span className="text-blue-500 font-medium"> warm hugs</span>, and glowing emotions that come with motherhood and childhood.
          </p>
          
          <div className="py-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
          </div>

          <p className="text-xl md:text-2xl font-serif text-gray-800 italic">
            "We don’t just take photos — We capture feelings, love, and unforgettable moments."
          </p>
        </div>

        {/* Floating elements effect */}
        <div className="absolute top-1/2 left-0 -translate-x-1/2 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/3 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </section>
  );
};

export default Welcome;
