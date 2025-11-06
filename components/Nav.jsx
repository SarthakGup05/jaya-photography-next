"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import axiosInstance from "@/libs/axios-instance";
import { toast } from "react-hot-toast";

import {
  Facebook,
  Instagram,
  Linkedin,
  ChevronDown,
  Menu,
  X,
  Camera,
  Loader2,
  User,
  Star,
  Home,
  Image as ImageIcon,
  Phone,
  PhoneCall,
} from "lucide-react";

const Nav = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [photographyServices, setPhotographyServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  const pathname = usePathname();
  const dropdownRefs = useRef([]);

  // ✅ Static nav links
  const staticNavLinks = [
    { name: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    {
      name: "About",
      icon: <User className="w-4 h-4" />,
      dropdown: [
        { name: "About Us", href: "/about-us", description: "Learn about our photographer" },
      ],
    },
    { name: "Gallery", href: "/gallery", icon: <ImageIcon className="w-4 h-4" /> },
  ];

  // ✅ Fetch photography services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true);
        const res = await axiosInstance.get("/services/get-services", {
          params: { isActive: "true", sortBy: "sortOrder", sortOrder: "asc" },
        });

        const serviceItems = res.data.map((service) => ({
          name: service.title,
          href: `/service/${service.slug}`,
        }));

        setPhotographyServices(serviceItems);
      } catch (err) {
        console.error("Error fetching photography services:", err);
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

  // ✅ Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);
      if (scrollPosition > 50) setOpenDropdown(null);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRefs.current.some((ref) => ref?.contains(e.target))) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Combined nav links
  const navLinks = [
    ...staticNavLinks,
    {
      name: "Photography",
      icon: <Camera className="w-4 h-4" />,
      dropdown: photographyServices,
      loading: servicesLoading,
    },
    { name: "Packages", href: "/packages", icon: <Star className="w-4 h-4" /> },
    { name: "Contact Us", href: "/contact-us", icon: <Phone className="w-4 h-4" /> },
  ];

  const toggleDropdown = (index, e) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const renderDropdownItems = (dropdown, loading = false) => {
    if (loading)
      return (
        <div className="px-4 py-3 flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
          <span className="ml-2 text-sm text-gray-700">Loading services...</span>
        </div>
      );

    if (!dropdown || dropdown.length === 0)
      return <div className="px-4 py-3 text-center text-sm text-gray-600">No items available</div>;

    return dropdown.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        className="block px-4 py-3 text-gray-800 hover:bg-white/80 hover:text-black transition-all duration-200 rounded-lg mx-2"
        onClick={() => {
          setOpenDropdown(null);
          setMobileOpen(false);
        }}
      >
        <div className="flex flex-col">
          <span className="font-medium">{item.name}</span>
          {item.description && <span className="text-xs text-gray-600">{item.description}</span>}
        </div>
      </Link>
    ));
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/jayaagnihotriphotography/",
      color: "hover:text-blue-600",
      bg: "hover:bg-blue-100",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/jayaagnihotriphotography/",
      color: "hover:text-pink-600",
      bg: "hover:bg-pink-100",
      label: "Instagram",
    },
    {
      icon: PhoneCall,
      href: "https://wa.me/919335391320",
      color: "hover:text-green-600",
      bg: "hover:bg-green-100",
      label: "WhatsApp",
    },
  ];

  const isCurrentPage = (href) => pathname === href;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "shadow-xl border-b border-purple-200" : "shadow-lg border-b border-purple-100"
      }`}
      style={{
        backgroundColor: scrolled ? "#f3e6fa" : "#F0E7E5",
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* ✅ Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src="/logo.png"
              alt="Photography Studio Logo"
              width={150}
              height={50}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </Link>

        {/* ✅ Desktop Nav */}
        <div className="hidden md:flex gap-1 items-center">
          {navLinks.map((link, idx) =>
            link.dropdown ? (
              <div key={link.name} ref={(el) => (dropdownRefs.current[idx] = el)} className="relative">
                <button
                  className="flex items-center gap-2 text-black hover:text-gray-800 px-4 py-2 rounded-full hover:bg-white/60"
                  onClick={(e) => toggleDropdown(idx, e)}
                  type="button"
                >
                  {link.icon}
                  {link.name}
                  {link.loading && <Loader2 className="w-3 h-3 animate-spin" />}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${openDropdown === idx ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`absolute left-0 mt-2 min-w-[280px] bg-white border border-gray-200 rounded-xl shadow-2xl py-2 transition-all ${
                    openDropdown === idx ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  {renderDropdownItems(link.dropdown, link.loading)}
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/60 transition-all ${
                  isCurrentPage(link.href) ? "bg-white/80 shadow-sm" : "text-black"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            )
          )}
        </div>

        {/* ✅ Social Icons */}
        <div className="hidden md:flex gap-2 ml-6 items-center">
          {socialLinks.map(({ icon: Icon, href, color, bg, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full text-gray-700 ${color} ${bg} transition-all hover:scale-110`}
              title={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        {/* ✅ Mobile Button */}
        <button
          className="md:hidden p-2 rounded-full text-black hover:bg-white/60 transition-all"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ✅ Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-6 pt-4 space-y-2 bg-[#f3e6fa] border-t border-purple-200">
          {navLinks.map((link, idx) =>
            link.dropdown ? (
              <div key={link.name}>
                <button
                  className="flex items-center justify-between w-full text-black px-4 py-3 rounded-xl hover:bg-white/60"
                  onClick={(e) => toggleDropdown(idx, e)}
                >
                  <span className="flex items-center gap-2">
                    {link.icon}
                    {link.name}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${openDropdown === idx ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`transition-all pl-6 overflow-hidden ${
                    openDropdown === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {renderDropdownItems(link.dropdown, link.loading)}
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-3 rounded-xl hover:bg-white/60 text-black"
                onClick={() => {
                  setMobileOpen(false);
                  setOpenDropdown(null);
                }}
              >
                <div className="flex items-center gap-2">
                  {link.icon}
                  <span>{link.name}</span>
                </div>
              </Link>
            )
          )}

          {/* Mobile social icons */}
          <div className="pt-3 border-t border-purple-200 flex gap-3">
            {socialLinks.map(({ icon: Icon, href, color, bg, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full text-gray-700 ${color} ${bg} transition-all hover:scale-110`}
                title={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
