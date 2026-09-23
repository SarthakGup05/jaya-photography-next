"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import axiosInstance from "@/libs/axios-instance";
import {
  Facebook,
  Instagram,
  Menu,
  X,
  Camera,
  Loader2,
  User,
  Star,
  Home,
  Image as ImageIcon,
  Phone,
  ChevronDown,
  PhoneCall,
  BookOpen,
} from "lucide-react";

import { FALLBACK_SERVICES } from "@/lib/servicesData";

const DEFAULT_SERVICES_NAV = FALLBACK_SERVICES.map((s) => ({
  name: s.name || s.title,
  href: `/service/${s.slug}`,
}));

const Nav = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // For Mobile
  const [hoverDropdown, setHoverDropdown] = useState(null); // For Desktop
  const [isOpen, setIsOpen] = useState(false);
  const [photographyServices, setPhotographyServices] = useState(DEFAULT_SERVICES_NAV);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // ✅ Handle Scroll Effect (Only for resizing/shadow depth now)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Lock body scroll when mobile sidebar is open to fix mobile scroll jitter/chaining
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [isOpen]);

  // ✅ Auto-close mobile menu and dropdown on page navigation
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // ✅ Fetch services
  useEffect(() => {
    let isMounted = true;
    const fetchServices = async () => {
      try {
        const res = await axiosInstance.get("/services/get-services", {
          params: { isActive: "true", sortBy: "sortOrder", sortOrder: "asc" },
        });
        const rawServices = res.data?.services || res.data;
        if (isMounted && Array.isArray(rawServices) && rawServices.length > 0) {
          const items = rawServices.map((s) => ({
            name: s.title || s.name,
            href: `/service/${s.slug}`,
          }));
          setPhotographyServices(items);
        }
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        if (isMounted) setServicesLoading(false);
      }
    };
    fetchServices();
    return () => {
      isMounted = false;
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    {
      name: "About",
      href: "/about-us",
      icon: <User className="w-4 h-4" />,
      dropdown: [{ name: "About Us", href: "/about-us" }],
    },
    { name: "Gallery", href: "/gallery", icon: <ImageIcon className="w-4 h-4" /> },
    {
      name: "Services",
      href: "#",
      icon: <Camera className="w-4 h-4" />,
      dropdown: photographyServices,
      loading: servicesLoading,
    },
    { name: "Packages", href: "/packages", icon: <Star className="w-4 h-4" /> },
    { name: "Blog", href: "/blogs", icon: <BookOpen className="w-4 h-4" /> },
    { name: "Contact", href: "/contact-us", icon: <Phone className="w-4 h-4" /> },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/jayaagnihotriphotography/",
      color: "hover:text-blue-600",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/jayaagnihotriphotography?stkn=MXJxMmF1ejhmbzM3Yg==",
      color: "hover:text-pink-600",
    },
    {
      icon: PhoneCall,
      href: "https://wa.me/919335391320",
      color: "hover:text-green-600",
    },
  ];

  const isCurrentPage = (href) => pathname === href;
  const toggleMobileDropdown = (index) =>
    setOpenDropdown(openDropdown === index ? null : index);

  return (
    <>
      {/* =======================================================
          🖥️ DESKTOP NAVBAR (Solid Background)
      ======================================================= */}
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 hidden md:flex items-center justify-between px-8 bg-[#f4e7d4] border-b border-[#e0d0b8] ${
          scrolled ? "py-2 shadow-md" : "py-4 shadow-sm"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Logo"
            width={scrolled ? 110 : 130}
            height={45}
            style={{ height: "auto" }}
            className="transition-all duration-300"
          />
        </Link>

        {/* Horizontal Menu */}
        <nav className="flex items-center gap-6 lg:gap-8">
          {navLinks.map((link, idx) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => setHoverDropdown(idx)}
              onMouseLeave={() => setHoverDropdown(null)}
            >
              {/* Main Link */}
              <Link
                href={link.href}
                className={`flex items-center gap-2 text-sm font-medium tracking-wide transition-colors relative py-2 ${
                  isCurrentPage(link.href)
                    ? "text-[#b08d55]"
                    : "text-gray-800 hover:text-[#b08d55]"
                }`}
              >
                {link.name}
                {link.dropdown && (
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      hoverDropdown === idx ? "rotate-180" : ""
                    }`}
                  />
                )}
                
                {/* Underline Animation */}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-[#b08d55] transition-all duration-300 ${
                  isCurrentPage(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>

              {/* 🔽 Desktop Dropdown Menu */}
              {link.dropdown && (
                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform group-hover:translate-y-0 translate-y-2`}
                >
                  <div className="bg-[#fff9f0] shadow-xl rounded-lg overflow-hidden border border-[#e9d9c4] ring-1 ring-black/5">
                    {link.loading ? (
                      <div className="flex items-center justify-center p-4 text-gray-500 text-xs">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </div>
                    ) : (
                      <div className="py-1">
                        {link.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f4e7d4] hover:text-[#5a4633] transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Socials / CTA */}
        <div className="flex items-center gap-4">
          {socialLinks.map(({ icon: Icon, href, color }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-600 ${color} transition-transform hover:scale-110`}
            >
              <Icon size={18} />
            </a>
          ))}
          <Link
            href="/contact-us"
            className="hidden lg:block px-6 py-2 bg-[#d8c6aa] text-white text-sm font-medium rounded-full hover:bg-[#c2b092] transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            Book Now
          </Link>
        </div>
      </header>

      {/* =======================================================
          📱 MOBILE HAMBURGER BUTTON (Visible md- hidden)
      ======================================================= */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Close Menu" : "Open Menu"}
        className="fixed top-5 right-5 z-[110] bg-[#e9d9c4] p-2.5 rounded-full text-gray-800 shadow-md md:hidden hover:scale-105 transition-transform cursor-pointer"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* =======================================================
          📱 MOBILE SIDEBAR
      ======================================================= */}
      <aside
        className={`fixed top-0 right-0 h-screen h-[100dvh] max-h-[100dvh] w-80 max-w-[85vw] z-[100] bg-[#f4e7d4] text-gray-800 shadow-2xl flex flex-col justify-between transform transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] md:hidden overscroll-contain ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header with Logo and Close Button */}
        <div className="pt-6 pb-4 px-5 flex items-center justify-between border-b border-[#e0d0b8] shrink-0">
          <Link href="/" onClick={() => setIsOpen(false)} className="inline-block">
            <Image
              src="/logo.png"
              alt="Logo"
              width={125}
              height={40}
              style={{ height: "auto" }}
              className="rounded-md"
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close Menu"
            className="p-2 rounded-full bg-[#e9d9c4] text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Smooth Scrollable Nav Links */}
        <nav
          className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-1.5 custom-scrollbar touch-pan-y"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {navLinks.map((link, idx) => (
            <div key={link.name} className="rounded-xl">
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => toggleMobileDropdown(idx)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium text-sm cursor-pointer ${
                      openDropdown === idx
                        ? "bg-[#e8d8c0] text-[#5a4633] font-semibold shadow-2xs"
                        : "text-gray-800 hover:bg-[#e7d7c3] hover:text-[#5a4633]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {link.icon}
                      {link.name}
                    </span>
                    <div className="flex items-center gap-2">
                      {link.dropdown && (
                        <span className="text-[11px] text-stone-600 font-normal px-2 py-0.5 rounded-full bg-[#dfceb6]">
                          {link.dropdown.length}
                        </span>
                      )}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          openDropdown === idx ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openDropdown === idx
                        ? "max-h-[900px] opacity-100 mt-1.5"
                        : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    <div className="ml-3 pl-3 border-l-2 border-[#d8c6aa]/80 space-y-1 py-1">
                      {link.name === "Services" && (
                        <Link
                          href="/service"
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold rounded-lg transition-colors mb-1.5 ${
                            pathname === "/service"
                              ? "bg-[#d8c6aa] text-white shadow-xs"
                              : "bg-[#e8d8c0]/70 text-[#7a5c37] hover:bg-[#e8d8c0]"
                          }`}
                        >
                          <span>✨ View All Services</span>
                          <span className="text-[10px] uppercase tracking-wider">Catalog →</span>
                        </Link>
                      )}

                      {link.loading ? (
                        <div className="flex items-center py-2.5 px-3 text-gray-500 text-xs">
                          <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin text-[#b08d55]" />
                          Loading services...
                        </div>
                      ) : (
                        link.dropdown.map((item) => {
                          const isActive = pathname === item.href;
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className={`block px-3.5 py-2 text-sm rounded-lg transition-all ${
                                isActive
                                  ? "bg-[#d8c6aa] text-[#433221] font-semibold shadow-2xs"
                                  : "text-gray-700 hover:text-[#5a4633] hover:bg-[#e8d8c0]/60"
                              }`}
                            >
                              {item.name}
                            </Link>
                          );
                        })
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isCurrentPage(link.href)
                      ? "bg-[#e8d8c0] text-[#5a4633] font-semibold shadow-2xs"
                      : "text-gray-800 hover:bg-[#e7d7c3] hover:text-[#5a4633]"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              )}
            </div>
          ))}

          {/* Quick Booking CTA Button */}
          <div className="pt-2 pb-1">
            <Link
              href="/contact-us"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 shadow-xs transition-colors"
            >
              <span>Book A Session</span>
            </Link>
          </div>
        </nav>

        {/* Socials / Footer with Safe Area Support */}
        <div className="p-4 px-6 bg-[#e9dcc7] flex items-center justify-center gap-6 shrink-0 border-t border-[#e0d0b8] pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
          {socialLinks.map(({ icon: Icon, href, color }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Social Link"
              className={`text-gray-700 ${color} transition-transform hover:scale-110 p-1`}
            >
              <Icon size={19} />
            </a>
          ))}
        </div>
      </aside>

      {/* 🌫️ Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[90] md:hidden transition-opacity duration-500"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Nav;