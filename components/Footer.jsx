"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  ArrowRight,
} from "lucide-react";
import axiosInstance from "@/libs/axios-instance";

const Footer = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axiosInstance.get("/services/get-services", {
        params: {
          isActive: "true",
          sortBy: "sortOrder",
          sortOrder: "asc",
          limit: 6,
        },
      });

      const servicesData = response.data.services || response.data;

      if (servicesData && servicesData.length > 0) {
        setServices(
          servicesData.map((service) => ({
            id: service.id,
            name: service.name || service.title,
            slug: service.slug,
          })),
        );
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceClick = (service) => {
    router.push(`/service/${service.slug}`);
  };

  const handleContactClick = () => {
    router.push("/contact-us");
  };

  return (
    <footer className="bg-black text-white relative overflow-hidden border-t border-white/10">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-light tracking-wide text-white">
                Jaya Photography
              </h3>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed pr-2">
              Jaya Agnihotri Photography is a luxury photography studio in
              Lucknow, capturing life’s most precious moments with artistic
              vision and professional excellence since 2018. We specialize in
              newborn, maternity, baby milestones, cake smash, and family portraits.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-1">
              {[
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/jayaagnihotriphotography?stkn=MXJxMmF1ejhmbzM3Yg==",
                  label: "Instagram",
                },
                {
                  icon: Facebook,
                  href: "https://www.facebook.com/jayaagnihotriphotography",
                  label: "Facebook",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-gray-200" />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Services Section */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-medium text-white border-b border-white/10 pb-2.5">
              Our Services
            </h4>

            {loading ? (
              <div className="space-y-2.5 pt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-4 bg-white/10 rounded animate-pulse w-3/4"
                  />
                ))}
              </div>
            ) : services.length > 0 ? (
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.id}>
                    <button
                      onClick={() => handleServiceClick(service)}
                      className="group flex items-center justify-between w-full text-left text-gray-300 hover:text-white transition-colors duration-200 py-1 text-sm font-light cursor-pointer"
                    >
                      <span>{service.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-2" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-2">
                {[
                  "Newborn Photography",
                  "Maternity Sessions",
                  "Family Portraits",
                  "Baby Milestones",
                  "Cake Smash & Kids",
                ].map((service, index) => (
                  <li key={index}>
                    <span className="flex items-center justify-between w-full text-left text-gray-300 py-1 text-sm font-light cursor-default">
                      <span>{service}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-base font-medium text-white border-b border-white/10 pb-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { name: "About Us", path: "/about-us" },
                { name: "Gallery", path: "/gallery" },
                { name: "Packages", path: "/packages" },
                { name: "Blog & Guides", path: "/blogs" },
                { name: "Contact", path: "/contact-us" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="group flex items-center justify-between w-full text-left text-gray-300 hover:text-white transition-colors duration-200 py-1 text-sm font-light"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-2" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-medium text-white border-b border-white/10 pb-2.5">
              Get in Touch
            </h4>

            <div className="space-y-3.5 text-sm">
              <a
                href="https://share.google/3OhKy5swv2nxYiOMG"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-3 group text-gray-300 hover:text-white transition-colors cursor-pointer"
                title="Open Jaya Photography location on Google Maps"
              >
                <MapPin className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0 group-hover:text-purple-300 transition-colors" />
                <div className="leading-relaxed">
                  <p className="font-medium text-white">
                    Jaya Agnihotri Photography
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm">
                    Sushant Golf City, Lucknow
                  </p>
                  <span className="text-xs text-purple-400 group-hover:underline font-medium inline-block mt-0.5">
                    View on Google Maps →
                  </span>
                </div>
              </a>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <a
                  href="tel:+919335391320"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  +91 9335391320
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <a
                  href="mailto:jayaagnihotriphotography@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors duration-200 break-all text-xs sm:text-sm"
                >
                  jayaagnihotriphotography@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleContactClick}
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-md py-2.5 px-4 text-sm font-medium transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-center"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-white/10 relative z-10 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
            <p>© {new Date().getFullYear()} Jaya Photography. All rights reserved.</p>
            <p className="text-gray-500">
              Capturing precious moments in Lucknow & worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
