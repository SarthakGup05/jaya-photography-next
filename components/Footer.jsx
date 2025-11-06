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
          }))
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
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-light tracking-wide">
                  Jaya Photography
                </h3>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                Capturing life's most precious moments with artistic vision and
                professional excellence since 2020.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/jayaagnihotriphotography/",
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
                    className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Dynamic Services Section */}
            <div className="space-y-6">
              <h4 className="text-lg font-light text-white border-b border-white/10 pb-3">
                Our Services
              </h4>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 bg-white/10 rounded animate-pulse" />
                  ))}
                </div>
              ) : services.length > 0 ? (
                <div className="space-y-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceClick(service)}
                      className="group flex items-center justify-between w-full text-left text-gray-300 hover:text-white transition-colors duration-200 py-1"
                    >
                      <span className="text-sm font-light">{service.name}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {[
                    "Newborn Photography",
                    "Maternity Sessions",
                    "Family Portraits",
                    "Fashion Photography",
                  ].map((service, index) => (
                    <span
                      key={index}
                      className="flex items-center justify-between w-full text-left text-gray-300 hover:text-white transition-colors duration-200 py-1 cursor-default"
                    >
                      <span className="text-sm font-light">{service}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-light text-white border-b border-white/10 pb-3">
                Quick Links
              </h4>
              <div className="space-y-3">
                {[
                  { name: "About Us", path: "/about-us" },
                  { name: "Gallery", path: "/gallery" },
                  { name: "Contact", path: "/contact-us" },
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="group flex items-center justify-between w-full text-left text-gray-300 hover:text-white transition-colors duration-200 py-1"
                  >
                    <span className="text-sm font-light">{link.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-light text-white border-b border-white/10 pb-3">
                Get in Touch
              </h4>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-300 leading-relaxed">
                    <p>Sushant Golf City</p>
                    <p>Lucknow</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <a
                    href="tel:+919335391320"
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    +91 9335391320
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <a
                    href="mailto:jayaagnihotriphotography@gmail.com"
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    jayaagnihotriphotography@gmail.com
                  </a>
                </div>
              </div>

              <button
                onClick={handleContactClick}
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-none py-3 px-4 text-sm font-light transition-all duration-200 hover:scale-[1.02]"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>© 2025 Jaya Photography.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
