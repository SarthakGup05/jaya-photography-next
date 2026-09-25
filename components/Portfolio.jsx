"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Camera,
  Instagram,
  Heart,
  ArrowRight,
  ArrowUpRight,
  AlertCircle,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
} from "lucide-react";
import axiosInstance from "@/libs/axios-instance";

/* -----------------------------------------------------
 * Category Normalization & Clean Theme Taxonomy
 * --------------------------------------------------- */
const normalizeCategory = (rawCategory, serviceTitle = "") => {
  const cat = (rawCategory || "").trim().toLowerCase();
  const serv = (serviceTitle || "").trim().toLowerCase();

  if (cat.includes("maternity") || serv.includes("maternity")) {
    return "Maternity";
  }
  if (cat.includes("newborn") || serv.includes("newborn")) {
    return "Newborn";
  }
  if (
    cat.includes("half to one") ||
    cat.includes("milestone") ||
    cat.includes("sitter") ||
    serv.includes("baby")
  ) {
    return "Baby Milestone";
  }
  if (
    cat.includes("theme") ||
    cat.includes("smash") ||
    serv.includes("theme") ||
    serv.includes("cake")
  ) {
    return "Theme & Cake Smash";
  }
  if (cat.includes("family") || serv.includes("family")) {
    return "Family";
  }
  if (cat.includes("fashion") || serv.includes("fashion")) {
    return "Fashion & Portrait";
  }

  if (!rawCategory) return "Studio Portrait";
  const trimmed = rawCategory.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

const DEFAULT_PORTFOLIO_ITEMS = [
  {
    id: "p1",
    title: "Pure Angelic Cocoon Pose",
    themeTitle: "Fine-Art Newborn Dreamscape",
    category: "Newborn",
    image: "/bg/1.jpg",
    fullImage: "/bg/1.jpg",
    alt: "Luxury Newborn Photography Lucknow",
    location: "Urban Woods Studio, Lucknow",
    likes: 342,
    aspectRatio: "4:5 Portrait",
    tags: ["#NewbornPhotography", "#FineArtBaby", "#LucknowStudio", "#SafetyCertified"],
    description:
      "A soothing fine-art newborn portrait captured in our temperature-controlled, sanitized studio using imported organic knit textures and natural ambient lighting.",
  },
  {
    id: "p2",
    title: "Golden Hour Maternity Radiance",
    themeTitle: "Ethereal Motherhood Glow",
    category: "Maternity",
    image: "/bg/2.JPG",
    fullImage: "/bg/2.JPG",
    alt: "Luxury Maternity Photoshoot Lucknow",
    location: "Studio Fine-Art Set, Lucknow",
    likes: 489,
    aspectRatio: "4:5 Portrait",
    tags: ["#MaternityShoot", "#MotherhoodGlow", "#FineArtMaternity", "#LucknowMoms"],
    description:
      "Celebrating the sublime grace of motherhood with couture drape styling and warm, artistic backlighting tailored for timeless keepsake heirlooms.",
  },
  {
    id: "p3",
    title: "Lavender Dream Sitter Milestone",
    themeTitle: "Organic Sitter Milestone (6–12M)",
    category: "Baby Milestone",
    image: "/bg/lavender.jpg",
    fullImage: "/bg/lavender.jpg",
    alt: "Baby Milestone Photoshoot Lucknow",
    location: "Organic Floral Set, Lucknow",
    likes: 275,
    aspectRatio: "4:5 Portrait",
    tags: ["#BabyMilestone", "#SitterSession", "#LavenderTheme", "#BabySmiles"],
    description:
      "Capturing bright baby giggles, curious expressions, and adorable sitting milestones in a custom handcrafted botanical lavender floral setting.",
  },
  {
    id: "p4",
    title: "First Birthday Cake Smash & Splash",
    themeTitle: "Bespoke Birthday Joy",
    category: "Theme & Cake Smash",
    image: "/assets/images/albums/featured-images/gal-1-grid.jpg",
    fullImage: "/assets/images/albums/featured-images/gal-1-grid.jpg",
    alt: "Cake Smash Photoshoot Lucknow",
    location: "Themed Birthday Studio, Lucknow",
    likes: 412,
    aspectRatio: "4:5 Portrait",
    tags: ["#CakeSmashLucknow", "#1stBirthday", "#BabyCelebration", "#SmashAndSplash"],
    description:
      "Delightful celebration photography with customized color-matched themes, child-safe organic cakes, and playful warm splash tub baths.",
  },
  {
    id: "p5",
    title: "Generations Family Heirloom",
    themeTitle: "Timeless Family Portraiture",
    category: "Family",
    image: "/assets/images/albums/featured-images/gal-2-grid.jpg",
    fullImage: "/assets/images/albums/featured-images/gal-2-grid.jpg",
    alt: "Luxury Family Portrait Lucknow",
    location: "Heirloom Portrait Studio, Lucknow",
    likes: 318,
    aspectRatio: "4:5 Portrait",
    tags: ["#FamilyPortraits", "#GenerationsHeirloom", "#StudioPhotography", "#LucknowFamily"],
    description:
      "Sophisticated, emotive family portraits crafted to preserve timeless bonds between parents and little ones for generations to come.",
  },
  {
    id: "p6",
    title: "Editorial Fashion Studio Portrait",
    themeTitle: "High-Fashion Fine-Art Styling",
    category: "Fashion & Portrait",
    image: "/assets/images/albums/featured-images/gal-3-grid.jpg",
    fullImage: "/assets/images/albums/featured-images/gal-3-grid.jpg",
    alt: "Fashion Photography Studio Lucknow",
    location: "Fashion Studio, Lucknow",
    likes: 524,
    aspectRatio: "4:5 Portrait",
    tags: ["#FashionPortrait", "#StudioFashion", "#LucknowPortraits", "#FineArtGlamour"],
    description:
      "Modern editorial lighting and couture artistic styling designed to create commanding, magazine-worthy personal portraits.",
  },
  {
    id: "p7",
    title: "Couture Silhouette Maternity",
    themeTitle: "Sculpted Lighting Motherhood",
    category: "Maternity",
    image: "/assets/images/albums/featured-images/gal-4-grid.jpg",
    fullImage: "/assets/images/albums/featured-images/gal-4-grid.jpg",
    alt: "Artistic Maternity Photography Lucknow",
    location: "Creative Light Studio, Lucknow",
    likes: 391,
    aspectRatio: "4:5 Portrait",
    tags: ["#MaternityStyle", "#SilhouetteArt", "#MomsOfLucknow", "#FineArtPortraits"],
    description:
      "A dramatic yet tender silhouette study celebrating maternal contours with high-fashion editorial lighting and flowing designer gowns.",
  },
  {
    id: "p8",
    title: "Little Wonder Sitter Expressions",
    themeTitle: "Wonder & Discovery Milestone",
    category: "Baby Milestone",
    image: "/assets/images/albums/featured-images/gal-5-grid.jpg",
    fullImage: "/assets/images/albums/featured-images/gal-5-grid.jpg",
    alt: "Baby Sitter Photoshoot Lucknow",
    location: "Artisanal Wooden Set, Lucknow",
    likes: 462,
    aspectRatio: "4:5 Portrait",
    tags: ["#BabyLaughs", "#SitterStage", "#ToddlerPortraits", "#LucknowBaby"],
    description:
      "Candid, heart-melting expressions highlighting your baby's unique blossoming personality, twinkling eyes, and spontaneous laughter.",
  },
];

const PhotographyPortfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState(DEFAULT_PORTFOLIO_ITEMS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Interactive Likes state (with double-tap support)
  const [likedItems, setLikedItems] = useState(() => new Set());
  const [heartAnimId, setHeartAnimId] = useState(null);

  // Quick View / Instagram Lightbox Modal
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const router = useRouter();

  /* -----------------------------------------------------
   * Fetch Portfolio Data from API (Limit 50 ensures all categories load)
   * --------------------------------------------------- */
  const fetchPortfolioImages = async () => {
    try {
      const response = await axiosInstance.get("/gallery/images", {
        params: {
          isActive: "true",
          sortBy: "sortOrder",
          sortOrder: "asc",
          limit: 50,
        },
      });

      const imagesData = response.data.images || response.data;

      if (imagesData && Array.isArray(imagesData) && imagesData.length > 0) {
        const transformedItems = imagesData
          .map((image, idx) => {
            const normalizedCat = normalizeCategory(
              image.category,
              image.service?.title
            );
            return {
              id: image.id || image._id || `api-${idx}`,
              title: image.title || `${normalizedCat} Session`,
              themeTitle: image.service?.title || `${normalizedCat} Photography`,
              category: normalizedCat,
              rawCategory: image.category,
              image: image.src || image.thumb || image.cloudinaryUrl,
              fullImage: image.src || image.cloudinaryUrl || image.thumb,
              alt: image.alt || image.title || `Jaya Photography ${normalizedCat} Lucknow`,
              location: "Urban Woods Studio, Lucknow",
              likes: image.likes || 180 + ((idx * 43) % 310),
              aspectRatio: "4:5 Portrait",
              tags: [
                `#${normalizedCat.replace(/[\s&]+/g, "")}`,
                "#JayaPhotography",
                "#LucknowStudio",
                "#FineArtPortrait",
              ],
              description:
                image.description ||
                `Artistic fine-art ${normalizedCat.toLowerCase()} portrait session captured in our premier studio in Lucknow.`,
            };
          })
          .filter((item) => item.fullImage || item.image);

        if (transformedItems.length > 0) {
          setPortfolioItems(transformedItems);
        }
      }
    } catch (err) {
      console.warn("Using curated default portfolio items:", err?.message || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioImages();
  }, []);

  /* -----------------------------------------------------
   * Curated Display Items (Balanced 8–12 pictures across fine-art themes)
   * --------------------------------------------------- */
  const MAX_DISPLAY_COUNT = 12;

  const displayedItems = useMemo(() => {
    // Curate up to 12 pictures evenly balanced across all fine-art categories
    const categories = Array.from(
      new Set(portfolioItems.map((item) => item.category).filter(Boolean))
    );

    const itemsByCategory = {};
    categories.forEach((cat) => {
      itemsByCategory[cat] = portfolioItems.filter((i) => i.category === cat);
    });

    const curated = [];
    let round = 0;
    let added = true;

    // Round-robin selection across themes for maximum visual variety
    while (curated.length < MAX_DISPLAY_COUNT && added) {
      added = false;
      for (const cat of categories) {
        if (curated.length >= MAX_DISPLAY_COUNT) break;
        const list = itemsByCategory[cat];
        if (list && list[round]) {
          curated.push(list[round]);
          added = true;
        }
      }
      round++;
    }

    // Fallback if needed to reach target limit
    if (curated.length < MAX_DISPLAY_COUNT) {
      const curatedIds = new Set(curated.map((i) => i.id));
      for (const item of portfolioItems) {
        if (curated.length >= MAX_DISPLAY_COUNT) break;
        if (!curatedIds.has(item.id)) {
          curated.push(item);
          curatedIds.add(item.id);
        }
      }
    }

    return curated.slice(0, MAX_DISPLAY_COUNT);
  }, [portfolioItems]);

  /* -----------------------------------------------------
   * Like / Favorite Handler with Double Tap
   * --------------------------------------------------- */
  const handleToggleLike = useCallback((id, e) => {
    if (e) e.stopPropagation();
    setLikedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleDoubleTap = useCallback(
    (id, e) => {
      if (e) e.stopPropagation();
      setLikedItems((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      setHeartAnimId(id);
      setTimeout(() => {
        setHeartAnimId(null);
      }, 900);
    },
    []
  );

  /* -----------------------------------------------------
   * Modal Navigation
   * --------------------------------------------------- */
  const modalIndex = useMemo(() => {
    if (!activeModalItem) return -1;
    return displayedItems.findIndex((item) => item.id === activeModalItem.id);
  }, [activeModalItem, displayedItems]);

  const handlePrevModal = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      if (modalIndex > 0) {
        setActiveModalItem(displayedItems[modalIndex - 1]);
      } else {
        setActiveModalItem(displayedItems[displayedItems.length - 1]);
      }
    },
    [modalIndex, displayedItems]
  );

  const handleNextModal = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      if (modalIndex < displayedItems.length - 1) {
        setActiveModalItem(displayedItems[modalIndex + 1]);
      } else {
        setActiveModalItem(displayedItems[0]);
      }
    },
    [modalIndex, displayedItems]
  );

  // Keyboard navigation for modal
  useEffect(() => {
    if (!activeModalItem) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveModalItem(null);
      if (e.key === "ArrowLeft") handlePrevModal();
      if (e.key === "ArrowRight") handleNextModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalItem, handlePrevModal, handleNextModal]);

  const handleShare = async (item, e) => {
    if (e) e.stopPropagation();
    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/gallery` : "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: `Check out this ${item.category} photography theme by Jaya Photography Lucknow!`,
          url: shareUrl,
        });
      } catch (err) {
        // Ignored if cancelled
      }
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2200);
    }
  };

  /* -----------------------------------------------------
   * Loading State
   * --------------------------------------------------- */
  if (loading && portfolioItems.length === 0) {
    return (
      <section className="py-12 sm:py-16 px-6 bg-[#F0E7E5]">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="max-w-3xl mx-auto text-center space-y-2.5">
            <div className="h-5 w-48 bg-stone-300/60 rounded-full mx-auto animate-pulse" />
            <div className="h-10 w-96 bg-stone-300/60 rounded-xl mx-auto animate-pulse" />
            <div className="h-4 w-72 bg-stone-300/60 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-stone-300/60 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* -----------------------------------------------------
   * Error State
   * --------------------------------------------------- */
  if (error) {
    return (
      <section className="py-12 px-6 bg-[#F0E7E5] text-center">
        <div className="max-w-sm mx-auto space-y-4 bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-[#e2d5cb] shadow-lg">
          <AlertCircle className="w-10 h-10 text-rose-600 mx-auto" />
          <p className="text-gray-800 text-sm font-medium">{error}</p>
          <button
            onClick={fetchPortfolioImages}
            className="px-6 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-purple-900 transition-colors cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  /* -----------------------------------------------------
   * Main Render: Instagram Photography Showcase
   * --------------------------------------------------- */
  return (
    <section className="relative pt-10 pb-14 sm:pt-14 sm:pb-18 px-4 sm:px-6 lg:px-8 bg-[#F0E7E5] text-gray-900 overflow-hidden">
      {/* 🌸 Ambient Atmosphere Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#e6d8ce]/40 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#ebdcd3]/40 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-7">
        {/* ===================================================
         * 1. Header Section: Curated Studio Showcase
         * =================================================== */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e8ded6] border border-[#d8c8bc] text-[#42352f] text-[11px] font-medium tracking-[0.18em] uppercase shadow-2xs">
              Signature Photography Themes
            </span>
            <a
              href="https://www.instagram.com/jayaagnihotriphotography?stkn=MXJxMmF1ejhmbzM3Yg=="
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-stone-300 shadow-2xs text-xs font-medium text-stone-700 hover:text-stone-950 hover:bg-white transition-all cursor-pointer group"
            >
              <Instagram className="w-3.5 h-3.5 text-stone-600" />
              <span className="tracking-wide group-hover:underline">@jayaagnihotriphotography</span>
            </a>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-stone-900 tracking-tight leading-[1.2]">
            Fine-Art Baby, Newborn, Maternity & Family Photography{" "}
            <span className="font-normal italic text-[#6e5445]">
              in Lucknow
            </span>
          </h2>

          {/* Description */}
          <div className="text-stone-700 text-sm sm:text-base font-normal leading-relaxed max-w-3xl mx-auto space-y-2">
            <p>
              Explore a curated collection of fine-art photography themes in Lucknow, thoughtfully designed for newborns, babies, maternity portraits, milestone sessions, cake smash and family photography.
            </p>
            <p className="hidden md:block">
              At Jaya Agnihotri Photography, every theme combines creative concepts, professional studio lighting, elegant styling and a baby-friendly approach to create portraits that feel personal, artistic and timeless.
            </p>
            <p className="hidden sm:block">
              Whether you're planning a newborn photoshoot in Lucknow, a beautiful maternity photoshoot, your baby's next milestone, a first birthday cake smash, or a family portrait session, discover a theme that fits your story.
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1 text-xs sm:text-sm font-medium">
            <Link
              href="/gallery"
              className="text-stone-800 hover:text-stone-950 font-medium underline underline-offset-4 transition-colors"
            >
              View Full Gallery →
            </Link>
            <span className="text-stone-300">|</span>
            <Link
              href="/packages"
              className="text-stone-800 hover:text-stone-950 font-medium underline underline-offset-4 transition-colors"
            >
              Check Packages →
            </Link>
            <span className="text-stone-300">|</span>
            <Link
              href="/contact-us"
              className="text-stone-800 hover:text-stone-950 font-medium underline underline-offset-4 transition-colors"
            >
              Book Your Session →
            </Link>
          </div>
        </div>

        {/* ===================================================
         * 2. Photography Showcase Grid (Fine-Art 4:5 Portrait Standard)
         * =================================================== */}
        {displayedItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6 pt-2">
            {displayedItems.map((item, index) => {
              const isLiked = likedItems.has(item.id);
              const isShowingHeartAnim = heartAnimId === item.id;
              const likeCount = (item.likes || 320) + (isLiked ? 1 : 0);

              return (
                <div
                  key={item.id || index}
                  onDoubleClick={(e) => handleDoubleTap(item.id, e)}
                  onClick={() => setActiveModalItem(item)}
                  className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-stone-200/90 transition-all duration-500 cursor-pointer bg-stone-900 select-none aspect-[4/5]"
                >
                  {/* Photo with Smooth Zoom on Hover */}
                  <Image
                    src={item.image || item.fullImage}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    quality={85}
                    priority={index < 4}
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Subtle Instagram Matte Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top Header Floating Badges */}
                  <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 flex items-center justify-between pointer-events-none z-10">
                    {/* Theme Category Chip */}
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/25 shadow-xs">
                      {item.category}
                    </span>

                    {/* Like & Quick Action Controls */}
                    <div className="flex items-center gap-1.5 pointer-events-auto">
                      <button
                        type="button"
                        onClick={(e) => handleToggleLike(item.id, e)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer border ${
                          isLiked
                            ? "bg-rose-600 text-white border-rose-500 scale-110 shadow-md"
                            : "bg-black/50 text-white border-white/20 hover:bg-black/80 hover:text-rose-400"
                        }`}
                        title={isLiked ? "Unlike" : "Like this shot"}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                            isLiked ? "fill-current text-white" : ""
                          }`}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleShare(item, e)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 text-white backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-black/80 hover:text-purple-300 transition-colors cursor-pointer hidden xs:flex"
                        title="Share this theme"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Instagram Double-Tap Pop Heart Animation */}
                  {isShowingHeartAnim && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 animate-in zoom-in-50 fade-in duration-300">
                      <div className="w-20 h-20 rounded-full bg-rose-600/90 backdrop-blur-md flex items-center justify-center shadow-2xl animate-bounce">
                        <Heart className="w-10 h-10 text-white fill-current" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Details & Modern Instagram Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 text-white z-10 space-y-1.5 transition-transform duration-300">
                    {/* Location Pin */}
                    <div className="flex items-center gap-1 text-[10px] text-stone-300 font-medium line-clamp-1">
                      <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                      <span>{item.location || "Lucknow Studio"}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-1 drop-shadow-sm group-hover:text-purple-200 transition-colors">
                      {item.title}
                    </h3>

                    {/* Theme Concept Subtitle */}
                    {item.themeTitle && (
                      <p className="text-[11px] text-stone-300 font-normal line-clamp-1 hidden sm:block">
                        {item.themeTitle}
                      </p>
                    )}

                    {/* Bottom Action Row */}
                    <div className="pt-1 flex items-center justify-between text-[11px] text-stone-300 border-t border-white/15">
                      <div className="flex items-center gap-1 font-semibold text-white">
                        <Heart
                          className={`w-3 h-3 ${isLiked ? "fill-rose-500 text-rose-500" : "text-stone-300"}`}
                        />
                        <span>{likeCount}</span>
                      </div>

                      <div className="flex items-center gap-1 text-purple-300 font-semibold group-hover:text-white transition-colors">
                        <span className="text-[10px] uppercase tracking-wider">Inspect</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/80 backdrop-blur-md rounded-3xl border border-stone-300/80 space-y-4 max-w-md mx-auto p-8 shadow-sm">
            <Camera className="w-12 h-12 text-stone-400 mx-auto animate-pulse" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-stone-900">
                Gallery Showcase Loading
              </h3>
              <p className="text-stone-600 text-xs">
                Explore our fine-art Lucknow photography collection.
              </p>
            </div>
            <Link href="/gallery">
              <button className="px-5 py-2 bg-black text-white text-xs font-semibold rounded-full hover:bg-purple-900 transition-colors cursor-pointer">
                View Full Gallery
              </button>
            </Link>
          </div>
        )}

        {/* ===================================================
         * 5. Call To Action & Instagram Link Footer
         * =================================================== */}
        <div className="pt-6 border-t border-stone-300/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Studio Profile Meta */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full p-[2px] bg-[#d8c8bc] shadow-xs shrink-0">
              <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
                <Image
                  src="/bg/1.jpg"
                  alt="Jaya Photography Studio Avatar"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-stone-900">Jaya Agnihotri Photography</span>
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-stone-700 text-white text-[9px] font-bold">
                  ✓
                </span>
              </div>
              <p className="text-xs text-stone-600">
                10+ Years of Luxury Fine-Art in Lucknow
              </p>
            </div>
          </div>

          {/* Action Buttons - Mobile First */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <a
              href="https://www.instagram.com/jayaagnihotriphotography?stkn=MXJxMmF1ejhmbzM3Yg=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-full bg-white text-stone-900 border border-stone-300 hover:bg-stone-50 hover:border-stone-400 text-xs font-semibold tracking-wide shadow-2xs transition-all cursor-pointer"
            >
              <Instagram className="w-4 h-4 text-stone-700" />
              <span>Follow @jayaagnihotriphotography</span>
            </a>

            <Link href="/gallery" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-full bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 text-xs font-semibold tracking-wide transition-all shadow-2xs cursor-pointer group">
                <span>View Full Gallery</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <Link href="/contact-us" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-full bg-[#231b19] hover:bg-[#3a2e2a] text-white text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer">
                <span>Book a Theme Session</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ===================================================
       * 6. Instagram-Style Quick View / Lightbox Modal
       * =================================================== */}
      {activeModalItem && (
        <div
          onClick={() => setActiveModalItem(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
        >
          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[92vh] flex flex-col md:flex-row shadow-2xl border border-white/20 animate-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer border border-white/20"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Image in True Instagram 4:5 Ratio */}
            <div className="relative md:w-3/5 bg-stone-950 flex items-center justify-center min-h-[340px] md:min-h-[540px]">
              <div className="relative w-full aspect-[4/5] max-h-[70vh]">
                <Image
                  src={activeModalItem.fullImage || activeModalItem.image}
                  alt={activeModalItem.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Prev / Next Nav Buttons */}
              <button
                onClick={handlePrevModal}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 shadow-md"
                title="Previous Photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextModal}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 shadow-md"
                title="Next Photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Aspect Ratio Badge */}
              <div className="absolute bottom-3 left-3">
                <span className="bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-1 rounded-md border border-white/20">
                  Instagram 4:5 Standard (1080×1350)
                </span>
              </div>
            </div>

            {/* Right Column: Instagram Post Details & Booking Action */}
            <div className="md:w-2/5 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-[540px] space-y-4 bg-white">
              <div className="space-y-4">
                {/* Profile Header */}
                <div className="flex items-center justify-between border-b border-stone-200 pb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full p-[2px] bg-[#d8c8bc]">
                      <div className="w-full h-full rounded-full overflow-hidden relative">
                        <Image
                          src="/bg/1.jpg"
                          alt="Avatar"
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <a
                          href="https://www.instagram.com/jayaagnihotriphotography?stkn=MXJxMmF1ejhmbzM3Yg=="
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-stone-900 hover:text-stone-700 hover:underline"
                        >
                          jayaagnihotriphotography
                        </a>
                        <span className="text-stone-700 text-xs font-bold">✓</span>
                      </div>
                      <p className="text-[11px] text-stone-500">{activeModalItem.location}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-medium text-stone-700 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {activeModalItem.category}
                  </span>
                </div>

                {/* Session Title & Concept */}
                <div className="space-y-1.5">
                  <h4 className="text-base font-serif font-bold text-stone-900 leading-snug">
                    {activeModalItem.title}
                  </h4>
                  <p className="text-xs font-medium text-[#6e5445]">
                    Theme: {activeModalItem.themeTitle}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    {activeModalItem.description}
                  </p>
                </div>

                {/* Theme Hashtags */}
                {activeModalItem.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeModalItem.tags.map((tag, i) => (
                      <span key={i} className="text-[11px] font-normal text-stone-600 bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Actions & Conversion CTA */}
              <div className="space-y-3 pt-4 border-t border-stone-200">
                {/* Interactive Like & Share Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleToggleLike(activeModalItem.id, e)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        likedItems.has(activeModalItem.id)
                          ? "bg-rose-50 text-rose-600 border border-rose-200"
                          : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedItems.has(activeModalItem.id) ? "fill-current text-rose-600" : ""
                        }`}
                      />
                      <span>
                        {(activeModalItem.likes || 320) +
                          (likedItems.has(activeModalItem.id) ? 1 : 0)}{" "}
                        Likes
                      </span>
                    </button>

                    <button
                      onClick={(e) => handleShare(activeModalItem, e)}
                      className="p-1.5 rounded-full text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                      title="Share link"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {copiedNotification && (
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Link Copied
                    </span>
                  )}
                </div>

                {/* Direct Theme Booking CTA */}
                <div className="space-y-2">
                  <Link
                    href={`/contact-us?theme=${encodeURIComponent(activeModalItem.category)}`}
                    onClick={() => setActiveModalItem(null)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-black hover:bg-purple-950 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book This {activeModalItem.category} Theme</span>
                  </Link>

                  <Link
                    href="/gallery"
                    onClick={() => setActiveModalItem(null)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-stone-600 hover:text-black transition-colors"
                  >
                    <span>Browse All Studio Gallery Images</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotographyPortfolio;
