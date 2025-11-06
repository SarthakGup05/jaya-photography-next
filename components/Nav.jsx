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
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [photographyServices, setPhotographyServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [blurLevel, setBlurLevel] = useState("backdrop-blur-sm");
  const pathname = usePathname();

  // ✅ Adjust blur intensity adaptively
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setBlurLevel("backdrop-blur-md");
      else setBlurLevel("backdrop-blur-sm");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    { name: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
    {
      name: "About",
      icon: <User className="w-5 h-5" />,
      dropdown: [{ name: "About Us", href: "/about-us" }],
    },
    { name: "Gallery", href: "/gallery", icon: <ImageIcon className="w-5 h-5" /> },
    {
      name: "Photography",
      icon: <Camera className="w-5 h-5" />,
      dropdown: photographyServices,
      loading: servicesLoading,
    },
    { name: "Packages", href: "/packages", icon: <Star className="w-5 h-5" /> },
    { name: "Contact", href: "/contact-us", icon: <Phone className="w-5 h-5" /> },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/jayaagnihotriphotography/",
      color: "hover:text-blue-600",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/jayaagnihotriphotography/",
      color: "hover:text-pink-600",
      label: "Instagram",
    },
    {
      icon: PhoneCall,
      href: "https://wa.me/919335391320",
      color: "hover:text-green-600",
      label: "WhatsApp",
    },
  ];

  const isCurrentPage = (href) => pathname === href;
  const toggleDropdown = (index) =>
    setOpenDropdown(openDropdown === index ? null : index);

  return (
    <>
      {/* ☰ Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Close Menu" : "Open Menu"}
        className="fixed top-5 right-5 z-[110] bg-[#e9d9c4] p-3 rounded-full text-gray-800 shadow-md hover:shadow-lg transition-all duration-300 md:top-6 md:right-6"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* 🌿 Sidebar (Right Side) */}
      <aside
        className={`fixed top-0 right-0 h-screen w-72 md:w-80 z-[100] bg-[#f4e7d4] text-gray-800 shadow-2xl flex flex-col justify-between transform transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        {/* 🔆 Logo */}
        <div className="pt-10 pb-4 flex justify-center">
          <Link href="/" onClick={() => setIsOpen(false)} title="Go to Home">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={50}
              className="rounded-md hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        {/* 🧭 Nav Links */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-1 mt-4">
          {navLinks.map((link, idx) => (
            <div key={link.name} className="relative group">
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(idx)}
                    title={`${link.name} Menu`}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-800 hover:bg-[#e7d7c3] transition-all"
                  >
                    <span className="flex items-center gap-3">
                      {link.icon}
                      {link.name}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        openDropdown === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openDropdown === idx
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {link.loading ? (
                      <div className="flex items-center px-6 py-2 text-gray-500 text-sm">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </div>
                    ) : (
                      link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          title={`Go to ${item.name}`}
                          onClick={() => setIsOpen(false)}
                          className="block pl-10 pr-4 py-2 text-gray-700 hover:text-black hover:bg-[#e9dcc7] rounded-md transition-all"
                        >
                          {item.name}
                        </Link>
                      ))
                    )}
                  </div>
                </>
              ) : (
                <Link
                  href={link.href}
                  title={`Go to ${link.name}`}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isCurrentPage(link.href)
                      ? "bg-[#e8d8c0] font-semibold"
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

        {/* 🌐 Social Icons */}
        <div className="flex items-center justify-center gap-5 py-5 border-t border-[#d8c6aa]">
          {socialLinks.map(({ icon: Icon, href, color, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              className={`text-gray-700 ${color} hover:scale-110 transition-transform`}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </aside>

      {/* 🌫️ Adaptive Background Blur Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black/40 ${blurLevel} z-[90] transition-all duration-500 ease-in-out`}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Nav;
