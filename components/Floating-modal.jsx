"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { X, Sparkles } from "lucide-react";
import ReviewForm from "./ReviewForm"; 

const FloatingModal = ({ buttonText = "Feedback" }) => {
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
      <div className="fixed bottom-8 right-8 z-40" ref={buttonRef}>
        <div className="pulse-ring absolute inset-0 rounded-full bg-indigo-500/30 blur-sm z-0"></div>
        <button
          onClick={() => setOpen(true)}
          className="relative z-10 flex items-center gap-3 bg-gray-900 text-white pl-5 pr-6 py-4 rounded-full shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)] border border-white/10 overflow-hidden group transition-all hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 opacity-90 transition-opacity group-hover:opacity-100"></div>
          <Sparkles className="w-5 h-5 text-yellow-200 relative z-30 fill-yellow-200/20" />
          <span className="font-medium text-sm tracking-wide relative z-30">{buttonText}</span>
        </button>
      </div>

      {/* --- Modal Overlay --- */}
      {open && (
        <div
          ref={overlayRef}
          onClick={(e) => e.target === overlayRef.current && closeModal()}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 opacity-0 invisible"
          style={{ background: "rgba(5, 5, 10, 0.4)", backdropFilter: "blur(12px)" }}
        >
          {/* --- Glass Card Container --- */}
          <div
            ref={modalRef}
            className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-[2rem] shadow-2xl border border-white/20 bg-white/80 dark:bg-black/60"
          >
            {/* Ambient Background Glow */}
            <div ref={glowRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60 rounded-[2rem]">
               <div className="absolute -top-[20%] -right-[20%] w-[80%] h-[80%] rounded-full bg-purple-400/30 blur-[60px] animate-pulse"></div>
               <div className="absolute top-[40%] -left-[20%] w-[60%] h-[60%] rounded-full bg-blue-400/30 blur-[60px]"></div>
            </div>

            {/* --- 1. Fixed Header (FIXED: Reduced padding bottom) --- */}
            <div className="modal-content relative z-10 flex-none flex justify-between items-center px-8 pt-8 pb-2">
              <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-300 dark:to-pink-300">
                  Let's Connect
                </h2>
                <p className="text-gray-500 dark:text-gray-300 text-sm mt-1 font-medium">
                  We value your thoughts
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-full bg-gray-100/50 hover:bg-gray-200/50 dark:bg-white/10 dark:hover:bg-white/20 transition-colors text-gray-600 dark:text-gray-200"
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