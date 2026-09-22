"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Camera,
  Check,
  X,
  Crown,
  Star,
  Sparkles,
  Clock,
  Image as ImageIcon,
  Heart,
  Baby,
  ShieldCheck,
  FolderDown,
  Palette,
  MessageCircle,
  PhoneCall,
  ArrowRight,
  HelpCircle,
  Layers,
  CheckCircle2,
  ChevronRight,
  SlidersHorizontal,
  Table as TableIcon,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/modal";
import ContactForm from "@/components/Form";
import axiosInstance from "@/libs/axios-instance";
import toast from "react-hot-toast";
import {
  PACKAGE_CATEGORIES,
  PACKAGES_DATA,
  STUDIO_PROMISES,
  PACKAGES_FAQ,
} from "@/lib/packagesData";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function PackagesUI() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("cards"); // 'cards' | 'table'
  const [selectedPackageForModal, setSelectedPackageForModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter packages based on active category
  const filteredPackages = useMemo(() => {
    if (activeCategory === "all") {
      return PACKAGES_DATA;
    }
    return PACKAGES_DATA.filter((pkg) => pkg.category === activeCategory);
  }, [activeCategory]);

  const activeCategoryMeta = useMemo(() => {
    return (
      PACKAGE_CATEGORIES.find((cat) => cat.id === activeCategory) ||
      PACKAGE_CATEGORIES[0]
    );
  }, [activeCategory]);

  const handleOpenBooking = (pkg) => {
    setSelectedPackageForModal(pkg);
    setIsModalOpen(true);
  };

  const handleBookingSubmit = async (formData, packageData) => {
    try {
      const bookingData = {
        ...formData,
        packageId: packageData.id,
        packageTitle: packageData.title,
        packagePrice: packageData.price,
        serviceType: packageData.serviceName || formData.serviceType,
        bookingType: "package_booking",
      };

      await axiosInstance.post("/enquiries/create-enquiry", bookingData);

      toast.success(
        `Booking inquiry for "${packageData.title}" received! We'll contact you within 24 hours.`,
        { duration: 5000 }
      );
      setIsModalOpen(false);
    } catch (error) {
      console.warn("Booking submit API error, offering WhatsApp fallback:", error);
      toast.success(
        `Inquiry noted! Click below to send directly via WhatsApp to lock your slot.`,
        { duration: 4000 }
      );
      setIsModalOpen(false);
      // Fallback open WhatsApp
      const waUrl = `https://wa.me/919335391320?text=${encodeURIComponent(
        `Hi Jaya Photography, I submitted a booking request for "${packageData.title}" (${packageData.price}). Name: ${formData.name || ""}, Phone: ${formData.phone || ""}.`
      )}`;
      window.open(waUrl, "_blank");
    }
  };

  const getWhatsAppUrl = (pkg) => {
    const text =
      pkg.whatsappMessage ||
      `Hello Jaya Photography! I'm interested in booking the "${pkg.title}" (${pkg.price}) photoshoot package. Could you please share available dates?`;
    return `https://wa.me/919335391320?text=${encodeURIComponent(text)}`;
  };

  // Helper icons for studio promises
  const renderPromiseIcon = (iconName) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-amber-700" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-amber-700" />;
      case "FolderDown":
        return <FolderDown className="w-6 h-6 text-amber-700" />;
      case "Palette":
        return <Palette className="w-6 h-6 text-amber-700" />;
      default:
        return <Camera className="w-6 h-6 text-amber-700" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 selection:bg-amber-200 selection:text-stone-900 font-sans">
      {/* ========================================================
          1. HERO & INTRODUCTION SECTION
      ======================================================== */}
      <section className="relative pt-32 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-gradient-to-b from-[#F3ECE5] via-[#FAF7F2] to-[#FAF7F2] border-b border-stone-200/70">
        {/* Ambient background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-br from-amber-200/30 via-rose-100/20 to-transparent blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-rose-100/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb & pill */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/80 border border-stone-200/90 text-stone-800 shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              Fine-Art Studio Collections · Lucknow
            </span>
          </div>

          {/* Main Headline */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-stone-900 leading-[1.15]">
              Cherish Every Precious Moment With{" "}
              <span className="relative inline-block text-amber-900 italic">
                Artistic Perfection
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-gradient-to-r from-amber-400 via-rose-300 to-amber-200 rounded-full"></span>
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
              Transparent packages tailored for your baby milestone, maternity journey, and newborn memories. Zero hidden costs, full RAW photos included, and private studio luxury in Sushant Golf City, Lucknow.
            </p>
          </div>

          {/* Studio Trust Bar */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-4 py-3 rounded-2xl border border-stone-200/80 shadow-sm">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-800 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-800">100% Baby-Safe</p>
                <p className="text-[11px] text-stone-500">Heated & Sanitized</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-4 py-3 rounded-2xl border border-stone-200/80 shadow-sm">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-800 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-800">Designer Outfits</p>
                <p className="text-[11px] text-stone-500">Gowns & Wraps Included</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-4 py-3 rounded-2xl border border-stone-200/80 shadow-sm">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-800 shrink-0">
                <FolderDown className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-800">All RAW Photos</p>
                <p className="text-[11px] text-stone-500">Full Resolution Drive</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-4 py-3 rounded-2xl border border-stone-200/80 shadow-sm">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-800 shrink-0">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-800">Fine-Art Retouch</p>
                <p className="text-[11px] text-stone-500">Bespoke Color Toning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. INTERACTIVE CONTROLS & CATEGORY TABS
      ======================================================== */}
      <section className="sticky top-20 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/90 py-4 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 p-1 bg-stone-100/90 rounded-full border border-stone-200 max-w-full overflow-x-auto no-scrollbar shadow-inner">
            {PACKAGE_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-stone-900 text-amber-100 shadow-md transform scale-100"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/70"
                  }`}
                >
                  <span>{cat.shortTitle || cat.label}</span>
                  {cat.id !== "all" && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-amber-800/80 text-amber-200"
                          : "bg-stone-200 text-stone-600"
                      }`}
                    >
                      5
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* View Mode & Quick Stats */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-500 hidden sm:inline-block">
              Showing <strong className="text-stone-800">{filteredPackages.length}</strong> collections
            </span>

            {/* Toggle Cards / Table */}
            <div className="flex items-center bg-stone-100 p-1 rounded-full border border-stone-200">
              <button
                onClick={() => setViewMode("cards")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  viewMode === "cards"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
                title="Grid Cards View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cards</span>
              </button>

              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  viewMode === "table"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
                title="Comparison Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Compare</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. CATEGORY CONTEXT BANNER
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-gradient-to-r from-[#F4EAE4] via-[#F8F1EC] to-[#F1E8E0] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-200">
                {activeCategoryMeta.badge}
              </span>
              {activeCategoryMeta.recommendedStage && (
                <span className="text-xs text-stone-600 hidden sm:inline-block">
                  · {activeCategoryMeta.recommendedStage}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-900">
              {activeCategoryMeta.label}{" "}
              {activeCategoryMeta.sublabel && (
                <span className="text-amber-900/80 font-normal">
                  ({activeCategoryMeta.sublabel})
                </span>
              )}
            </h2>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-light">
              {activeCategoryMeta.description}
            </p>
          </div>

          <div className="absolute right-4 -bottom-6 opacity-10 pointer-events-none hidden lg:block">
            <Camera className="w-52 h-52 text-stone-900" />
          </div>
        </div>
      </section>

      {/* ========================================================
          4. MAIN CONTENT: CARDS VIEW OR COMPARISON TABLE
      ======================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {viewMode === "cards" ? (
          /* ---------------- CARDS VIEW ---------------- */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredPackages.map((pkg) => {
              const isHighlighted = pkg.isPopular || pkg.tier === "StarLight" || pkg.tier === "Luxury Signature" || pkg.tier === "Everlasting Memories";

              return (
                <div
                  key={pkg.id}
                  className={`group relative rounded-3xl transition-all duration-300 flex flex-col justify-between overflow-hidden border ${
                    isHighlighted
                      ? "bg-gradient-to-b from-white via-amber-50/25 to-white border-amber-300 shadow-[0_10px_35px_-12px_rgba(212,175,55,0.25)] ring-1 ring-amber-300/60"
                      : "bg-white/95 border-stone-200/90 shadow-[0_8px_25px_-10px_rgba(0,0,0,0.06)] hover:border-amber-300 hover:shadow-xl hover:-translate-y-1"
                  }`}
                >
                  {/* Popular / Top Tier Pill */}
                  {pkg.badge && (
                    <div className="absolute top-4 right-4 z-20">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm ${
                          pkg.isPopular
                            ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white"
                            : "bg-stone-100 text-stone-700 border border-stone-200"
                        }`}
                      >
                        {pkg.isPopular && <Crown className="w-3 h-3 text-amber-200" />}
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  {/* Card Header */}
                  <div className="p-6 sm:p-8 pb-4">
                    {/* Category Label */}
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-1">
                      {pkg.serviceName}
                    </p>

                    {/* Tier Title */}
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                      {pkg.title}
                    </h3>

                    {/* Price Display */}
                    <div className="mt-5 mb-4 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 font-serif">
                        {pkg.price}
                      </span>
                      <span className="text-xs text-stone-600 font-medium">
                        / full session
                      </span>
                    </div>

                    {/* Evocative Narrative Description */}
                    <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed mb-6">
                      {pkg.description}
                    </p>

                    {/* Quick Metric Pills */}
                    <div className="grid grid-cols-2 gap-2 mb-6 text-xs text-stone-700">
                      <div className="flex items-center gap-1.5 p-2 rounded-xl bg-stone-50 border border-stone-100">
                        <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span className="truncate font-medium">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-2 rounded-xl bg-stone-50 border border-stone-100">
                        <ImageIcon className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span className="truncate font-medium">{pkg.editedCount} Edited Images</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-2 rounded-xl bg-stone-50 border border-stone-100">
                        <Layers className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span className="truncate font-medium">{pkg.setupsCount}</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-2 rounded-xl bg-stone-50 border border-stone-100">
                        <FolderDown className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span className="truncate font-medium">All RAW Included</span>
                      </div>
                    </div>

                    {/* Inclusions List */}
                    <div className="border-t border-stone-100 pt-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                        Package Deliverables:
                      </p>
                      <ul className="space-y-2.5">
                        {pkg.inclusions.map((inclusion, idx) => {
                          const isSpecialOption =
                            inclusion.toLowerCase().includes("additional") ||
                            inclusion.toLowerCase().includes("option");

                          return (
                            <li
                              key={idx}
                              className={`flex items-start gap-2.5 text-xs sm:text-[13px] leading-snug ${
                                isSpecialOption
                                  ? "text-amber-900 bg-amber-50/60 p-2 rounded-xl border border-amber-200/70"
                                  : "text-stone-700"
                              }`}
                            >
                              <div className="mt-0.5 shrink-0">
                                {isSpecialOption ? (
                                  <Heart className="w-4 h-4 text-amber-700 fill-amber-200" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  </div>
                                )}
                              </div>
                              <span className="font-light">{inclusion}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  {/* Card Bottom CTA Actions */}
                  <div className="p-6 sm:p-8 pt-4 bg-stone-50/60 border-t border-stone-100 space-y-2.5">
                    {/* Primary Booking Button */}
                    <Button
                      onClick={() => handleOpenBooking(pkg)}
                      className={`w-full py-6 rounded-2xl font-semibold text-sm tracking-wide transition-all duration-300 shadow-sm cursor-pointer flex items-center justify-center gap-2 ${
                        isHighlighted
                          ? "bg-gradient-to-r from-amber-700 via-amber-800 to-stone-900 hover:from-amber-800 hover:to-black text-amber-50 shadow-md"
                          : "bg-stone-900 hover:bg-stone-800 text-white"
                      }`}
                    >
                      <Camera className="w-4 h-4" />
                      <span>Book {pkg.tier} ({pkg.price})</span>
                    </Button>

                    {/* Secondary WhatsApp Direct Inquiry */}
                    <a
                      href={getWhatsAppUrl(pkg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-2xl text-xs font-medium text-stone-700 hover:text-emerald-700 bg-white hover:bg-emerald-50/50 border border-stone-200 hover:border-emerald-300 flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Ask via WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ---------------- TABLE COMPARISON VIEW ---------------- */
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8 bg-gradient-to-r from-[#F4EAE4] to-[#FAF7F2] border-b border-stone-200">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                Detailed Side-by-Side Comparison
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Easily evaluate deliverables, session durations, and setup varieties across all tiers.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-stone-50/90 border-b border-stone-200">
                    <th className="p-4 sm:p-6 font-bold text-stone-800 min-w-[180px] bg-stone-100/60 sticky left-0 z-10">
                      Tier & Features
                    </th>
                    {filteredPackages.map((pkg) => (
                      <th
                        key={pkg.id}
                        className={`p-4 sm:p-6 min-w-[200px] text-center align-top border-l border-stone-200 ${
                          pkg.isPopular ? "bg-amber-50/40" : ""
                        }`}
                      >
                        {pkg.isPopular && (
                          <span className="inline-block mb-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full uppercase">
                            Most Popular
                          </span>
                        )}
                        <h4 className="font-serif font-bold text-stone-900 text-base">
                          {pkg.tier}
                        </h4>
                        <p className="text-xs text-stone-500 mb-2">{pkg.serviceName}</p>
                        <p className="text-xl font-extrabold text-stone-900 font-serif">
                          {pkg.price}
                        </p>
                        <Button
                          onClick={() => handleOpenBooking(pkg)}
                          size="sm"
                          className="mt-3 w-full rounded-xl text-xs bg-stone-900 hover:bg-amber-800 text-white cursor-pointer"
                        >
                          Select
                        </Button>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-200">
                  {/* Row: Duration */}
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-4 sm:p-6 font-semibold text-stone-800 bg-stone-50/60 sticky left-0 z-10">
                      Session Duration
                    </td>
                    {filteredPackages.map((pkg) => (
                      <td key={pkg.id} className="p-4 sm:p-6 text-center border-l border-stone-200 font-medium text-stone-700">
                        {pkg.duration}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Setups & Themes */}
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-4 sm:p-6 font-semibold text-stone-800 bg-stone-50/60 sticky left-0 z-10">
                      Setups & Themes
                    </td>
                    {filteredPackages.map((pkg) => (
                      <td key={pkg.id} className="p-4 sm:p-6 text-center border-l border-stone-200 text-stone-700">
                        {pkg.setupsCount}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Edited Images */}
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-4 sm:p-6 font-semibold text-stone-800 bg-stone-50/60 sticky left-0 z-10">
                      Edited Retouched Photos
                    </td>
                    {filteredPackages.map((pkg) => (
                      <td key={pkg.id} className="p-4 sm:p-6 text-center border-l border-stone-200 font-bold text-amber-900">
                        {pkg.editedCount} Pictures
                      </td>
                    ))}
                  </tr>

                  {/* Row: RAW Files */}
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-4 sm:p-6 font-semibold text-stone-800 bg-stone-50/60 sticky left-0 z-10">
                      All RAW Files Included
                    </td>
                    {filteredPackages.map((pkg) => (
                      <td key={pkg.id} className="p-4 sm:p-6 text-center border-l border-stone-200">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Inclusions Breakdown */}
                  <tr className="hover:bg-stone-50/50">
                    <td className="p-4 sm:p-6 font-semibold text-stone-800 bg-stone-50/60 sticky left-0 z-10 align-top">
                      Inclusions Summary
                    </td>
                    {filteredPackages.map((pkg) => (
                      <td key={pkg.id} className="p-4 sm:p-6 border-l border-stone-200 align-top text-left text-xs text-stone-600 space-y-1.5">
                        {pkg.inclusions.map((inc, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <span className="text-amber-700 font-bold">•</span>
                            <span>{inc}</span>
                          </div>
                        ))}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Quick WhatsApp Link */}
                  <tr className="bg-stone-50/70">
                    <td className="p-4 sm:p-6 font-semibold text-stone-800 bg-stone-100/60 sticky left-0 z-10">
                      Fast Track Inquiry
                    </td>
                    {filteredPackages.map((pkg) => (
                      <td key={pkg.id} className="p-4 sm:p-6 text-center border-l border-stone-200">
                        <a
                          href={getWhatsAppUrl(pkg)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================
          5. THE JAYA STUDIO SIGNATURE EXPERIENCE
      ======================================================== */}
      <section className="py-16 md:py-24 bg-[#F5EEE8] border-t border-stone-200/90 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-white px-4 py-1.5 rounded-full border border-stone-200 shadow-sm">
              The Luxury Studio Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              Why Lucknow Families Choose Jaya Photography
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light max-w-xl mx-auto">
              Every detail in our Sushant Golf City studio is thoughtfully engineered for warmth, safety, and breathtaking timeless imagery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STUDIO_PROMISES.map((promise, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm hover:shadow-md transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-100/70 flex items-center justify-center mb-4">
                  {renderPromiseIcon(promise.icon)}
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {promise.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  {promise.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          6. FREQUENTLY ASKED QUESTIONS
      ======================================================== */}
      <section className="py-16 md:py-24 bg-white border-t border-stone-200/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              Frequently Asked Questions
            </h2>
            <p className="text-stone-600 text-sm font-light">
              Clear answers to help you prepare for your session with complete peace of mind.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {PACKAGES_FAQ.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-[#FAF7F2] rounded-2xl border border-stone-200 px-6 overflow-hidden transition-all shadow-none data-[state=open]:border-amber-400/80 data-[state=open]:bg-amber-50/20"
              >
                <AccordionTrigger className="text-left font-serif font-semibold text-stone-900 text-base sm:text-lg hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-stone-600 text-xs sm:text-sm leading-relaxed pb-5 font-light">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ========================================================
          7. BOTTOM CONCIERGE & CUSTOM CONSULTATION CTA
      ======================================================== */}
      <section className="py-16 bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-900/40 text-amber-300 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Bespoke Session Consulting
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-medium leading-tight">
            Need Guidance Choosing the Right Package?
          </h2>

          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Every family’s story is unique. Speak directly with lead artist Jaya Agnihotri to discuss customized themes, twin sessions, outdoor sunset extensions, or milestone bundles.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/919335391320?text=Hello%20Jaya%20Photography!%20I%20would%20like%20to%20consult%20about%20a%20photoshoot%20package."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp (+91 93353 91320)</span>
            </a>

            <a
              href="tel:+919335391320"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
              <span>Call Studio Directly</span>
            </a>
          </div>

          <p className="text-xs text-stone-400 pt-2 font-light">
            Studio Address: Sushant Golf City, Amar Shaheed Path, Lucknow, Uttar Pradesh
          </p>
        </div>
      </section>

      {/* ========================================================
          8. BOOKING MODAL DIALOG
      ======================================================== */}
      {selectedPackageForModal && (
        <Modal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          title={
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-serif font-bold text-stone-900 block">
                  Book "{selectedPackageForModal.title}"
                </span>
                <span className="text-xs sm:text-sm text-stone-600 font-normal">
                  Investment: <strong className="text-amber-900 font-bold">{selectedPackageForModal.price}</strong> ({selectedPackageForModal.duration})
                </span>
              </div>
            </div>
          }
          description={`Please share your details to reserve your preferred date. Our team will verify studio availability and reach out promptly.`}
          className="sm:max-w-[620px] max-h-[90vh] overflow-y-auto bg-white rounded-3xl"
        >
          {({ close }) => (
            <div className="space-y-4">
              {/* Package Summary snippet inside modal */}
              <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/80 text-xs text-stone-700 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-semibold text-stone-900">{selectedPackageForModal.serviceName}</span> · {selectedPackageForModal.tier}
                </div>
                <div className="font-bold text-amber-900">
                  {selectedPackageForModal.editedCount} Edited Photos + All RAW
                </div>
              </div>

              <ContactForm
                initialData={{
                  serviceType:
                    selectedPackageForModal.serviceName || "baby-photography",
                  message: `Hello! I would like to book the "${selectedPackageForModal.title}" photoshoot package (${selectedPackageForModal.price}). Please let me know the nearest available studio slots.`,
                }}
                submitButtonText={`Confirm Booking for ${selectedPackageForModal.tier}`}
                onSubmit={async (formData) => {
                  await handleBookingSubmit(formData, selectedPackageForModal);
                  close();
                }}
                className="max-w-none shadow-none p-0 border-0"
              />
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
