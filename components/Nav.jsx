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
} from "lucide-react";

const Nav = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // For Mobile
  const [hoverDropdown, setHoverDropdown] = useState(null); // For Desktop
  const [isOpen, setIsOpen] = useState(false);
  const [photographyServices, setPhotographyServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
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

  // ✅ Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axiosInstance.get("/services/get-services", {
          params: { isActive: "true", sortBy: "sortOrder", sortOrder: "asc" },
        });
        const items = res.data.map((s) => ({
          name: s.title,
          href: `/service/${s.slug}`,
        }));
        setPhotographyServices(items);
      } catch (err) {
        console.error("Error fetching services:", err);
        setPhotographyServices([
          { name: "Baby Photography", href: "/services/baby-photography" },
          { name: "Maternity Photography", href: "/services/maternity-photography" },
          { name: "Fashion Photography", href: "/services/fashion-photography" },
          { name: "Family Photography", href: "/services/family-photography" },
        ]);
      } finally {
        setServicesLoading(false);
      }
    };
    fetchServices();
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
      name: "Photography",
      href: "#",
      icon: <Camera className="w-4 h-4" />,
      dropdown: photographyServices,
      loading: servicesLoading,
    },
    { name: "Packages", href: "/packages", icon: <Star className="w-4 h-4" /> },
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
      href: "https://www.instagram.com/jayaagnihotriphotography/",
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
        className="fixed top-5 right-5 z-[110] bg-[#e9d9c4] p-2.5 rounded-full text-gray-800 shadow-md md:hidden hover:scale-105 transition-transform"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* =======================================================
          📱 MOBILE SIDEBAR (Existing Logic)
      ======================================================= */}
      <aside
        className={`fixed top-0 right-0 h-screen w-72 z-[100] bg-[#f4e7d4] text-gray-800 shadow-2xl flex flex-col justify-between transform transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="pt-8 pb-4 flex justify-center border-b border-[#e0d0b8]">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={140}
              height={45}
              className="rounded-md"
            />
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-2 mt-4 custom-scrollbar">
          {navLinks.map((link, idx) => (
            <div key={link.name}>
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => toggleMobileDropdown(idx)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-800 hover:bg-[#e7d7c3] transition-all font-medium text-sm"
                  >
                    <span className="flex items-center gap-3">
                      {link.icon}
                      {link.name}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        openDropdown === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openDropdown === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-4 pl-4 border-l border-[#d8c6aa] mt-1 space-y-1">
                      {link.loading ? (
                        <div className="flex items-center py-2 text-gray-500 text-xs">
                          <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                          Loading...
                        </div>
                      ) : (
                        link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:text-[#b08d55] rounded-md transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isCurrentPage(link.href)
                      ? "bg-[#e8d8c0] shadow-sm"
                      : "hover:bg-[#e7d7c3]"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Socials */}
        <div className="p-6 bg-[#e9dcc7] flex justify-center gap-6">
          {socialLinks.map(({ icon: Icon, href, color }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-700 ${color} transition-transform hover:scale-110`}
            >
              <Icon size={20} />
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