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
  SlidersHorizontal,
  Check,
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

const THEME_CATEGORIES = [
  { id: "All", label: "All Themes" },
  { id: "Baby Milestone", label: "Baby Milestones" },
  { id: "Maternity", label: "Maternity Glow" },
  { id: "Theme & Cake Smash", label: "Themes & Cake Smash" },
  { id: "Family", label: "Family & Heritage" },
  { id: "Fashion & Portrait", label: "Fashion & Portrait" },
  { id: "Newborn", label: "Newborn Fine-Art" },
];

const DEFAULT_PORTFOLIO_ITEMS = [
  {
    id: "p1",
    title: "Pure Angelic Cocoon Pose",
    themeTitle: "Fine-Art Newborn Dreamscape",
    category: "Newborn",
    image: "/bg/1.jpg",
    fullImage: "/bg/1.jpg",
    alt: "Luxury Newborn Photography Lucknow",
    location: "Sushant Golf City Studio, Lucknow",
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
    location: "Fashion Studio, Sushant Golf City",
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

  // Active Theme Filter
  const [activeTheme, setActiveTheme] = useState("All");

  // Instagram Aspect Ratio Standard (Default: 4:5 vertical portrait standard, toggleable to 1:1 square)
  const [aspectRatioMode, setAspectRatioMode] = useState("4:5"); // "4:5" or "1:1"

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
              location: "Sushant Golf City Studio, Lucknow",
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
                `Artistic fine-art ${normalizedCat.toLowerCase()} portrait session captured in our premier studio in Sushant Golf City, Lucknow.`,
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
   * Live Counts for Each Category
   * --------------------------------------------------- */
  const themeCounts = useMemo(() => {
    const counts = { All: portfolioItems.length };
    portfolioItems.forEach((item) => {
      if (item.category) {
        counts[item.category] = (counts[item.category] || 0) + 1;
      }
    });
    return counts;
  }, [portfolioItems]);

  /* -----------------------------------------------------
   * Dynamically Available Themes (Guarantees every pill has photos)
   * --------------------------------------------------- */
  const availableThemes = useMemo(() => {
    const presentCategories = new Set(
      portfolioItems.map((item) => item.category).filter(Boolean)
    );

    const filtered = THEME_CATEGORIES.filter(
      (theme) => theme.id === "All" || presentCategories.has(theme.id)
    );

    // Any unforeseen category from backend is also added seamlessly
    presentCategories.forEach((cat) => {
      if (!THEME_CATEGORIES.some((t) => t.id === cat)) {
        filtered.push({ id: cat, label: cat });
      }
    });

    return filtered;
  }, [portfolioItems]);

  // Safety fallback: if active theme no longer exists, revert to "All"
  useEffect(() => {
    if (activeTheme !== "All") {
      const exists = availableThemes.some((t) => t.id === activeTheme);
      if (!exists) {
        setActiveTheme("All");
      }
    }
  }, [availableThemes, activeTheme]);

  /* -----------------------------------------------------
   * Filtered & Curated Display Items (Keeps 8–12 pictures)
   * --------------------------------------------------- */
  const MAX_DISPLAY_COUNT = 12;

  const filteredItems = useMemo(() => {
    if (activeTheme !== "All") {
      return portfolioItems
        .filter((item) => item.category === activeTheme)
        .slice(0, MAX_DISPLAY_COUNT);
    }

    // When "All" is active, curate up to 12 pictures evenly balanced across all categories
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

    // Round-robin selection across themes
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
  }, [portfolioItems, activeTheme]);

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
    return filteredItems.findIndex((item) => item.id === activeModalItem.id);
  }, [activeModalItem, filteredItems]);

  const handlePrevModal = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      if (modalIndex > 0) {
        setActiveModalItem(filteredItems[modalIndex - 1]);
      } else {
        setActiveModalItem(filteredItems[filteredItems.length - 1]);
      }
    },
    [modalIndex, filteredItems]
  );

  const handleNextModal = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      if (modalIndex < filteredItems.length - 1) {
        setActiveModalItem(filteredItems[modalIndex + 1]);
      } else {
        setActiveModalItem(filteredItems[0]);
      }
    },
    [modalIndex, filteredItems]
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
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-7">
        {/* ===================================================
         * 1. Header Section: Instagram Feed & Studio Distinction
         * =================================================== */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          {/* Eyebrow Badge with Instagram Accent */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-purple-200/70 shadow-xs text-xs font-semibold text-purple-900">
            <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
            <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
            <span className="tracking-wide">@jayaphotography.lucknow • Instagram Portfolio</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
            Signature Photography{" "}
            <span className="bg-gradient-to-r from-purple-900 via-rose-700 to-amber-700 bg-clip-text text-transparent">
              Themes
            </span>
          </h2>

          {/* Description */}
          <p className="text-stone-700 text-sm sm:text-base font-normal leading-relaxed max-w-2xl mx-auto">
            A curated showcase of our finest fine-art concepts captured in Lucknow’s premier portrait studio.
            Select a theme below to explore newborn, maternity, baby milestone, cake smash, and family sessions.
          </p>
        </div>

        {/* ===================================================
         * 2. Modern Photography Theme Filter Tabs
         * =================================================== */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-1">
          {availableThemes.map((theme) => {
            const isSelected = activeTheme === theme.id;
            const count =
              theme.id === "All"
                ? Math.min(MAX_DISPLAY_COUNT, portfolioItems.length)
                : themeCounts[theme.id] || 0;
            return (
              <button
                key={theme.id}
                onClick={() => setActiveTheme(theme.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-xs ${
                  isSelected
                    ? "bg-black text-white shadow-md scale-105"
                    : "bg-white/90 text-stone-700 border border-stone-300/80 hover:border-purple-600 hover:text-purple-900 hover:bg-purple-50/50"
                }`}
              >
                <span>{theme.label}</span>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                      isSelected ? "bg-white/20 text-white" : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ===================================================
         * 3. Filter Controls & Instagram Aspect Ratio Switcher
         * =================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-y border-stone-300/60 py-3.5 px-2">
          {/* Active Theme Summary */}
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
            <SlidersHorizontal className="w-3.5 h-3.5 text-purple-700" />
            <span>
              Showing:{" "}
              <strong className="text-black">
                {activeTheme === "All" ? "All Photography Themes" : `${activeTheme} Theme`}
              </strong>{" "}
              ({filteredItems.length} {filteredItems.length === 1 ? "shot" : "shots"})
            </span>
          </div>

          {/* Instagram Standard Ratio Toggle: 4:5 Portrait vs 1:1 Square */}
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md p-1 rounded-full border border-stone-300/80 shadow-xs">
            <span className="text-[11px] font-medium text-stone-500 pl-2 pr-1 hidden xs:inline">
              Photo Format:
            </span>
            <button
              onClick={() => setAspectRatioMode("4:5")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                aspectRatioMode === "4:5"
                  ? "bg-black text-white shadow-xs"
                  : "text-stone-600 hover:text-black hover:bg-stone-100"
              }`}
            >
              <span className="w-1.5 h-2 rounded-[1px] border border-current" />
              <span>4:5 Portrait</span>
              <span className="text-[10px] opacity-75 font-normal">(IG Standard)</span>
            </button>
            <button
              onClick={() => setAspectRatioMode("1:1")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                aspectRatioMode === "1:1"
                  ? "bg-black text-white shadow-xs"
                  : "text-stone-600 hover:text-black hover:bg-stone-100"
              }`}
            >
              <span className="w-2 h-2 rounded-[1px] border border-current" />
              <span>1:1 Square</span>
            </button>
          </div>
        </div>

        {/* ===================================================
         * 4. Photography Showcase Grid (Instagram Standard 4:5 / 1:1)
         * =================================================== */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredItems.map((item, index) => {
              const isLiked = likedItems.has(item.id);
              const isShowingHeartAnim = heartAnimId === item.id;
              const likeCount = (item.likes || 320) + (isLiked ? 1 : 0);

              return (
                <div
                  key={item.id || index}
                  onDoubleClick={(e) => handleDoubleTap(item.id, e)}
                  onClick={() => setActiveModalItem(item)}
                  className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-stone-200/90 transition-all duration-500 cursor-pointer bg-stone-900 select-none ${
                    aspectRatioMode === "4:5" ? "aspect-[4/5]" : "aspect-square"
                  }`}
                >
                  {/* Photo with Smooth Zoom on Hover */}
                  <Image
                    src={item.image || item.fullImage}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    quality={80}
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

                  {/* Standard Ratio Tag at Top (Instagram 4:5 or 1:1) */}
                  <div className="absolute top-12 left-2.5 sm:left-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                    <span className="text-[9px] font-mono tracking-widest text-stone-300 bg-black/50 backdrop-blur-xs px-1.5 py-0.5 rounded-sm border border-white/10">
                      IG {aspectRatioMode}
                    </span>
                  </div>

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
                No shots found in “{activeTheme}”
              </h3>
              <p className="text-stone-600 text-xs">
                Switch back to All Themes to browse our complete Lucknow photography collection.
              </p>
            </div>
            <button
              onClick={() => setActiveTheme("All")}
              className="px-5 py-2 bg-black text-white text-xs font-semibold rounded-full hover:bg-purple-900 transition-colors cursor-pointer"
            >
              Show All Themes
            </button>
          </div>
        )}

        {/* ===================================================
         * 5. Call To Action & Instagram Link Footer
         * =================================================== */}
        <div className="pt-6 border-t border-stone-300/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Studio Profile Meta */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-sm shrink-0">
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
                <span className="text-sm font-bold text-stone-900">Jaya Agnihotri Photography</span>
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] font-bold">
                  ✓
                </span>
              </div>
              <p className="text-xs text-stone-600">
                10+ Years of Luxury Fine-Art in Sushant Golf City, Lucknow
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs font-bold tracking-wide shadow-md hover:shadow-lg hover:brightness-105 transition-all cursor-pointer"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @jayaphotography</span>
            </a>

            <Link href="/gallery">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 text-xs font-bold tracking-wide transition-all shadow-xs cursor-pointer group">
                <span>View Full Gallery</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <Link href="/contact-us">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black hover:bg-purple-950 text-white text-xs font-bold tracking-wide transition-all shadow-sm cursor-pointer">
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
                    <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
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
                        <span className="text-xs font-bold text-stone-900">
                          jayaphotography.lucknow
                        </span>
                        <span className="text-blue-600 text-xs font-bold">✓</span>
                      </div>
                      <p className="text-[11px] text-stone-500">{activeModalItem.location}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-purple-800 bg-purple-100/80 px-2.5 py-1 rounded-full uppercase">
                    {activeModalItem.category}
                  </span>
                </div>

                {/* Session Title & Concept */}
                <div className="space-y-1.5">
                  <h4 className="text-base font-extrabold text-stone-900 leading-snug">
                    {activeModalItem.title}
                  </h4>
                  <p className="text-xs font-semibold text-purple-700">
                    Theme: {activeModalItem.themeTitle}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    {activeModalItem.description}
                  </p>
                </div>

                {/* Theme Hashtags */}
                {activeModalItem.tags && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {activeModalItem.tags.map((tag, i) => (
                      <span key={i} className="text-[11px] font-medium text-purple-800">
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
