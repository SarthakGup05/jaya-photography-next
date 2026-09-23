"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Camera,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  FolderDown,
  Layers,
  ArrowRight,
  Heart,
  ChevronLeft,
  X,
  Maximize2,
  Calendar,
  AlertCircle,
  HelpCircle,
  Gift,
} from "lucide-react";
import axiosInstance from "@/libs/axios-instance";
import { toast } from "react-hot-toast";
import { PACKAGES_DATA } from "@/lib/packagesData";
import { SERVICE_PROCESS_STEPS } from "@/lib/servicesData";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// Dynamic imports for performance & modal rendering
const ContactForm = dynamic(() => import("@/components/Form"), { ssr: false });
const Modal = dynamic(() => import("@/components/modal"), { ssr: false });

const ServiceUI = ({ service }) => {
  const router = useRouter();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackageForModal, setSelectedPackageForModal] = useState(null);

  // Single primary photo from API
  const heroPhoto = useMemo(() => {
    return (
      service?.mainImage ||
      service?.coverImage ||
      "https://res.cloudinary.com/ddbqkfmrf/image/upload/v1755716070/services/service-1755716067933-0vj7p4ckxyw.jpg"
    );
  }, [service]);

  // Matching packages from PACKAGES_DATA
  const matchingPackages = useMemo(() => {
    if (!service) return [];
    const cat = (service.packageCategory || "").toLowerCase();

    if (cat === "baby" || service.slug?.includes("baby") || service.slug?.includes("toddler") || service.slug?.includes("theme")) {
      return PACKAGES_DATA.filter((p) => p.category === "baby").slice(0, 3);
    }
    if (cat === "maternity" || service.slug?.includes("maternity")) {
      return PACKAGES_DATA.filter((p) => p.category === "maternity").slice(0, 3);
    }
    if (cat === "newborn" || service.slug?.includes("newborn")) {
      return PACKAGES_DATA.filter((p) => p.category === "newborn").slice(0, 3);
    }
    // General fallback: popular packages across categories
    return PACKAGES_DATA.filter((p) => p.isPopular).slice(0, 3);
  }, [service]);

  // WhatsApp quick helper
  const getWhatsAppUrl = (pkg = null) => {
    const text = pkg
      ? `Hello Jaya Photography! I'm interested in booking the "${pkg.title}" (${pkg.price}) for ${service.title}. Could you please share available session dates?`
      : `Hello Jaya Photography! I'm interested in booking a "${service.title}" session in Lucknow. Could you please share available dates and pricing details?`;
    return `https://wa.me/919335391320?text=${encodeURIComponent(text)}`;
  };

  // Booking submit handler
  const handleBookingSubmit = async (formData, pkg = null) => {
    try {
      const bookingData = {
        ...formData,
        serviceId: service?._id || service?.id,
        serviceTitle: service?.title,
        serviceSlug: service?.slug,
        packageTitle: pkg?.title || selectedPackageForModal?.title || undefined,
        bookingType: pkg || selectedPackageForModal ? "package_booking" : "service_booking",
      };

      await axiosInstance.post("/enquiries/create-enquiry", bookingData);
      toast.success(
        `Booking inquiry for "${service.title}" received! Our team will contact you within 24 hours.`,
        { duration: 5000 }
      );
      setIsBookingModalOpen(false);
      setSelectedPackageForModal(null);
    } catch (error) {
      console.warn("Booking submit fallback to WhatsApp:", error);
      toast.success("Inquiry noted! Connecting directly with our studio via WhatsApp.", {
        duration: 4000,
      });
      setIsBookingModalOpen(false);
      const fallbackUrl = getWhatsAppUrl(pkg || selectedPackageForModal);
      window.open(fallbackUrl, "_blank");
    }
  };

  const handleOpenBooking = (pkg = null) => {
    setSelectedPackageForModal(pkg);
    setIsBookingModalOpen(true);
  };

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-4">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
          <div className="w-14 h-14 mx-auto mb-4 bg-amber-50 text-amber-800 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-medium text-stone-900 mb-2">Service Not Found</h2>
          <p className="text-stone-600 text-sm mb-6">
            The photography collection you are looking for may have been updated or moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push("/service")}
              className="bg-amber-900 hover:bg-amber-950 text-white px-6 py-2.5 rounded-full text-sm font-medium transition cursor-pointer"
            >
              Explore All Services
            </button>
            <button
              onClick={() => router.push("/")}
              className="bg-stone-100 hover:bg-stone-200 text-stone-800 px-6 py-2.5 rounded-full text-sm font-medium transition cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 selection:bg-amber-200 selection:text-stone-900 font-sans pb-24 md:pb-16">
      {/* ========================================================
          1. EDITORIAL HERO & BREADCRUMBS
      ======================================================== */}
      <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 bg-gradient-to-b from-[#F3ECE5] via-[#FAF7F2] to-[#FAF7F2] border-b border-stone-200/80 overflow-hidden">
        {/* Ambient subtle warm glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[320px] bg-gradient-to-br from-amber-200/30 via-rose-100/20 to-transparent blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute top-16 right-10 w-64 h-64 bg-amber-100/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Trail */}
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-amber-900 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-600">Services</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            {service.category && (
              <>
                <span className="text-stone-600 hidden sm:inline">{service.category}</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400 hidden sm:inline" />
              </>
            )}
            <span className="text-stone-900 font-medium truncate max-w-[200px] sm:max-w-none">
              {service.title}
            </span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading & Key Value Props */}
            <div className="lg:col-span-7 space-y-5">
              {/* Category Pill with Rating */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/90 border border-stone-200 text-stone-800 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  {service.category || "Fine-Art Portraiture"}
                </span>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-50/80 border border-amber-200/60 text-amber-900">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>4.9 / 5 Rating (350+ Families)</span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-stone-900 leading-[1.15]">
                {service.title}
              </h1>

              {/* Evocative Subtitle */}
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-light max-w-2xl">
                {service.subtitle || service.description?.slice(0, 180)}
              </p>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
                <div className="bg-white/80 backdrop-blur-xs rounded-xl p-3 border border-stone-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Duration</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-stone-800 truncate">
                    {service.duration || "2 to 3 Hours"}
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-xs rounded-xl p-3 border border-stone-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Location</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-stone-800 truncate">
                    Sushant Golf City
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-xs rounded-xl p-3 border border-stone-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Wardrobe</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-stone-800 truncate">
                    Studio Collection
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-xs rounded-xl p-3 border border-stone-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-1">
                    <FolderDown className="w-3.5 h-3.5" />
                    <span>Photos</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-stone-800 truncate">
                    All RAW + Retouched
                  </p>
                </div>
              </div>

              {/* Dual Action CTAs */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleOpenBooking(null)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 hover:to-amber-900 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Book This Session</span>
                </button>

                <a
                  href={getWhatsAppUrl(null)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-all duration-300 shadow-2xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Inquiry</span>
                </a>

                <a
                  href="#packages"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-full text-sm font-medium text-stone-700 hover:text-amber-900 hover:bg-white/60 transition"
                >
                  <span>View Packages</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Single Hero Spotlight Image */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative border frame */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-200/40 via-rose-100/30 to-amber-100/20 rounded-3xl blur-md pointer-events-none"></div>

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white p-2 border border-stone-200 shadow-xl">
                  {/* Single Spotlight Image */}
                  <div
                    onClick={() => setLightboxOpen(true)}
                    className="relative aspect-4/5 sm:aspect-4/5 w-full rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer bg-stone-100"
                  >
                    <img
                      src={heroPhoto}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                    {/* Tag badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-stone-800 shadow-sm border border-white/40">
                        {service.category || "Signature Studio Frame"}
                      </span>
                    </div>

                    {/* Lightbox Trigger Icon */}
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-stone-900/60 text-white backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    {/* Title caption overlay */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs uppercase tracking-wider text-amber-200 font-medium">
                        {service.title}
                      </p>
                      <p className="text-sm font-semibold truncate">
                        Sushant Golf City Studio · Lucknow
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. DETAILED OVERVIEW & WHAT'S INCLUDED
      ======================================================== */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Main Story & Inclusions */}
          <div className="lg:col-span-8 space-y-10">
            {/* About Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-xs space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-50 text-amber-900 border border-amber-200/60">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                The Fine-Art Approach
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900">
                About {service.title} at Jaya Photography
              </h2>

              <div className="prose prose-stone text-stone-600 leading-relaxed space-y-4 text-base font-light">
                <p className="whitespace-pre-wrap">{service.description}</p>
                {service.idealTiming && (
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-stone-800">
                    <Calendar className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block mb-0.5">
                        Ideal Timing Window
                      </span>
                      <p className="text-sm font-medium text-stone-700">
                        {service.idealTiming}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Inclusions Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-xs space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-2xl font-serif font-medium text-stone-900">
                    What’s Included in Every Session
                  </h3>
                  <p className="text-stone-500 text-sm mt-1">
                    Everything you need for an effortless, pampered photography experience.
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 text-stone-700">
                  Zero Hidden Fees
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                {(service.features || [
                  "All high-resolution RAW unedited photos delivered via private cloud",
                  "Master art-retouched portraits ready for framing",
                  "Full access to studio designer wardrobe and safe props",
                  "Family & sibling participation included at no surcharge",
                  "Private climate-controlled studio lounge in Sushant Golf City",
                  "Print release and lifetime cloud backup",
                ]).map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200/70 group hover:border-amber-300 transition-colors"
                  >
                    <div className="p-1 rounded-full bg-amber-100 text-amber-900 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-800" />
                    </div>
                    <span className="text-sm font-medium text-stone-800 leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Studio Amenities */}
            {service.amenities && service.amenities.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-serif font-medium text-stone-900">
                  Studio Amenities & Safety Standards
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                        <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Right Sidebar: Fast Booking Card & Quick Facts */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Quick Reserve Card */}
              <div className="bg-gradient-to-b from-stone-900 via-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-800 space-y-6">
                <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-300 font-medium">
                      Studio Collection
                    </span>
                    <h4 className="text-xl font-serif font-semibold text-white mt-0.5">
                      Reserve Your Date
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Sushant Golf City
                  </span>
                </div>

                <div className="space-y-3 text-sm text-stone-300">
                  <div className="flex items-center justify-between py-1.5 border-b border-stone-800/80">
                    <span className="text-stone-400">Starting From</span>
                    <span className="text-base font-semibold text-amber-200">
                      {service.startingPrice || "₹15,000"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-stone-800/80">
                    <span className="text-stone-400">Pacing</span>
                    <span className="font-medium text-stone-200">{service.duration || "2–3 Hours"}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-stone-800/80">
                    <span className="text-stone-400">RAW Photos</span>
                    <span className="font-medium text-emerald-400">100% Included</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-stone-400">Retouched Edits</span>
                    <span className="font-medium text-stone-200">High-Res Art Edits</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => handleOpenBooking(null)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md transition-all cursor-pointer font-sans"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Inquire / Book This Session</span>
                  </button>

                  <a
                    href={getWhatsAppUrl(null)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-medium bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Instant WhatsApp Chat</span>
                  </a>

                  <a
                    href="tel:+919335391320"
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs text-stone-400 hover:text-stone-200 transition"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Direct Call: +91 93353 91320</span>
                  </a>
                </div>
              </div>

              {/* Studio Trust Badges */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs space-y-3.5">
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Why Families Choose Us
                </h5>
                <div className="space-y-2.5 text-xs text-stone-700">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>10+ Years of Certified Studio Experience</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Sanitized Organic Fabrics & Baby-Safe Warmth</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Family & Partner Portraits with Zero Extra Cost</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <FolderDown className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>All High-Res RAW Photos Given on Cloud Drive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. HOW IT WORKS (THE 4-STEP PROCESS JOURNEY)
      ======================================================== */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-[#F3ECE5] via-[#FAF7F2] to-[#FAF7F2] border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white border border-stone-200 text-stone-800">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              Stress-Free Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900">
              How Your Photoshoot Unfolds
            </h2>
            <p className="text-stone-600 text-base font-light">
              From our first styling call to delivering your lifetime heirlooms, every step is crafted with gentle care and artistic precision.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_PROCESS_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-serif font-bold text-amber-900/30 group-hover:text-amber-800 transition-colors">
                      {step.step}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-stone-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. MATCHING PACKAGES & TRANSPARENT PRICING
      ======================================================== */}
      {matchingPackages.length > 0 && (
        <section id="packages" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-50 text-amber-900 border border-amber-200/70">
              <Gift className="w-3.5 h-3.5 text-amber-700" />
              Tailored Studio Collections
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900">
              Packages for {service.title}
            </h2>
            <p className="text-stone-600 text-base font-light">
              Clear, transparent pricing designed around your celebration. Choose your ideal tier or contact us for bespoke arrangements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {matchingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-300 hover:shadow-xl ${
                  pkg.isPopular
                    ? "border-amber-700 ring-2 ring-amber-700/20 shadow-md"
                    : "border-stone-200 shadow-xs"
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-amber-700 text-white shadow-sm">
                      Most Popular
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                      {pkg.tier || "Collection"}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">{pkg.duration}</span>
                  </div>

                  <h3 className="text-xl font-serif font-semibold text-stone-900 mb-2">
                    {pkg.title}
                  </h3>

                  <div className="flex items-baseline gap-1 my-4">
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
                      {pkg.price}
                    </span>
                    <span className="text-xs text-stone-500">/ session</span>
                  </div>

                  <p className="text-xs text-stone-600 mb-6 font-light leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-stone-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
                      Package Inclusions:
                    </p>
                    {pkg.inclusions?.slice(0, 5).map((inc, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span className="leading-snug">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 space-y-2.5">
                  <button
                    onClick={() => handleOpenBooking(pkg)}
                    className={`w-full py-3.5 rounded-full text-sm font-semibold transition cursor-pointer ${
                      pkg.isPopular
                        ? "bg-amber-800 hover:bg-amber-900 text-white shadow-md"
                        : "bg-stone-900 hover:bg-stone-800 text-white"
                    }`}
                  >
                    Select {pkg.tier || "Package"}
                  </button>

                  <a
                    href={getWhatsAppUrl(pkg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-emerald-800 hover:text-emerald-950 transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-900 hover:text-amber-950 underline underline-offset-4"
            >
              <span>Explore all studio packages and comparison matrix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* ========================================================
          5. SERVICE FAQS
      ======================================================== */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-14 sm:py-20 bg-white border-y border-stone-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-50 text-amber-900">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900">
                Common Questions About {service.title}
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {service.faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="bg-[#FAF7F2] rounded-2xl px-5 border border-stone-200 shadow-2xs"
                >
                  <AccordionTrigger className="text-left font-serif font-medium text-base text-stone-900 hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-stone-600 leading-relaxed font-light pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}



      {/* ========================================================
          7. LIGHTBOX MODAL (FOR ENLARGED PHOTO INSPECTION)
      ======================================================== */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={heroPhoto}
              alt={service.title}
              className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <p className="text-base font-medium">{service.title}</p>
              <p className="text-xs text-stone-400 mt-1">
                Jaya Photography Lucknow · Sushant Golf City Studio
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          8. BOOKING FORM MODAL
      ======================================================== */}
      <Modal
        open={isBookingModalOpen}
        onOpenChange={setIsBookingModalOpen}
        title={`📸 Book "${selectedPackageForModal ? selectedPackageForModal.title : service.title}"`}
        description="Share your preferred date and contact info. Our studio coordinator will reach out to tailor your session."
        className="sm:max-w-[620px] max-h-[85vh] overflow-y-auto bg-[#FAF7F2]"
      >
        {({ close }) => (
          <ContactForm
            key={`${service?.slug || service?.id}-${selectedPackageForModal?.id || "direct"}`}
            initialData={{
              serviceType: service?.slug || service?.title,
              serviceName: service?.title || service?.name,
              message: selectedPackageForModal
                ? `Hello! I would like to book the "${selectedPackageForModal.title}" (${selectedPackageForModal.price}) package for ${service.title}.`
                : `Hello! I am interested in booking a "${service.title}" session.`,
            }}
            submitButtonText={
              selectedPackageForModal
                ? `Confirm Booking (${selectedPackageForModal.price})`
                : `Request Booking`
            }
            onSubmit={async (formData) => {
              await handleBookingSubmit(formData, selectedPackageForModal);
              close();
            }}
          />
        )}
      </Modal>

      {/* ========================================================
          9. MOBILE STICKY BOTTOM FLOATING BAR
      ======================================================== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-stone-500 truncate">{service.title}</p>
            <p className="text-sm font-bold text-stone-900">
              {service.startingPrice || "From ₹15,000"}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={getWhatsAppUrl(null)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
              aria-label="WhatsApp Us"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            <button
              onClick={() => handleOpenBooking(null)}
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-stone-900 text-white shadow-sm cursor-pointer"
            >
              Book Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceUI;