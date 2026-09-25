"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { X, Star } from "lucide-react";
import ReviewForm from "./ReviewForm"; 

const FloatingModal = ({ buttonText = "Feedback" }) => {
  const pathname = usePathname();
  const hasBottomBar = Boolean(
    pathname?.startsWith("/service/") &&
    pathname !== "/service" &&
    pathname !== "/service/"
  );

  const [open, setOpen] = useState(false);
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(buttonRef.current, { y: -5, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".pulse-ring", { scale: 1.5, opacity: 0, duration: 2, repeat: -1, ease: "power2.out" });
    }, buttonRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (open) {
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
      tl.fromTo(
        modalRef.current,
        { scale: 0.8, y: 50, opacity: 0, rotationX: 10 },
        { scale: 1, y: 0, opacity: 1, rotationX: 0, duration: 0.8, ease: "elastic.out(1, 0.75)", clearProps: "transform" },
        "-=0.3"
      );
      tl.fromTo(".modal-content", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, "-=0.5");
    }
  }, [open]);

  const closeModal = () => {
    const tl = gsap.timeline({ onComplete: () => setOpen(false) });
    tl.to(modalRef.current, { scale: 0.9, y: 20, opacity: 0, duration: 0.3, ease: "back.in(1.7)" });
    tl.to(overlayRef.current, { autoAlpha: 0, duration: 0.2 }, "-=0.2");
  };

  return (
    <>
      <style jsx global>{`
        .glass-scrollbar::-webkit-scrollbar { width: 6px; }
        .glass-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .glass-scrollbar::-webkit-scrollbar-thumb { background: rgba(167, 139, 250, 0.2); border-radius: 10px; }
        .glass-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(167, 139, 250, 0.5); }
      `}</style>

      {/* --- Trigger Button --- */}
      <div
        className={`fixed z-40 transition-[bottom] duration-300 right-4 md:right-8 ${
          hasBottomBar
            ? "bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:bottom-8"
            : "bottom-4 md:bottom-8"
        }`}
        ref={buttonRef}
      >
        <button
          onClick={() => setOpen(true)}
          className="relative z-10 flex items-center gap-2 sm:gap-2.5 bg-[#231b19] text-white pl-4 pr-5 py-2.5 sm:py-3 rounded-full shadow-2xl border border-[#4a3b34] hover:bg-[#3a2e2a] hover:border-[#635047] transition-all hover:scale-105 active:scale-95 cursor-pointer text-xs sm:text-sm font-medium tracking-wide"
        >
          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 fill-amber-300" />
          <span>Leave a Review</span>
        </button>
      </div>

      {/* --- Modal Overlay --- */}
      {open && (
        <div
          ref={overlayRef}
          onClick={(e) => e.target === overlayRef.current && closeModal()}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 opacity-0 invisible"
          style={{ background: "rgba(25, 20, 18, 0.55)", backdropFilter: "blur(10px)" }}
        >
          {/* --- Glass Card Container --- */}
          <div
            ref={modalRef}
            className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-3xl shadow-2xl border border-[#dfd2c6] bg-[#faf7f5]"
          >
            {/* Ambient Background Glow */}
            <div ref={glowRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40 rounded-3xl">
               <div className="absolute -top-[20%] -right-[20%] w-[80%] h-[80%] rounded-full bg-[#ebdcd3] blur-[60px]"></div>
               <div className="absolute top-[40%] -left-[20%] w-[60%] h-[60%] rounded-full bg-[#e6d8ce] blur-[60px]"></div>
            </div>

            {/* --- 1. Fixed Header --- */}
            <div className="modal-content relative z-10 flex-none flex justify-between items-center px-8 pt-8 pb-2">
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  Share Your Experience
                </h2>
                <p className="text-stone-500 text-xs sm:text-sm mt-1 font-normal">
                  Your feedback helps growing families in Lucknow discover our studio.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-full bg-gray-100/50 hover:bg-gray-200/50 dark:bg-white/10 dark:hover:bg-white/20 transition-colors text-gray-600 dark:text-gray-200 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* --- 2. Scrollable Content Area --- */}
            <div className="modal-content relative z-10 flex-1 overflow-y-auto glass-scrollbar px-8 pb-8">
              {/* Divider Line (FIXED: Reduced margin from mb-6 to my-2) */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-2 opacity-50"></div>
              
              {/* Render the Form Here */}
              <ReviewForm />
            </div>

            {/* Glass Shine Overlay */}
            <div className="absolute inset-0 pointer-events-none border border-white/20 rounded-[2rem] z-20"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingModal;