"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Camera,
  Send,
  User,
  MessageCircle,
  Instagram,
  Facebook,
  Loader2,
  CheckCircle,
  ShieldCheck,
  Award,
  Heart,
  PhoneCall,
  MessageSquare,
} from "lucide-react";
import { toast } from "react-hot-toast";
import axiosInstance from "@/libs/axios-instance";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });

  const [services, setServices] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loadingServices, setLoadingServices] = useState(true);

  // Animation container ref
  const containerRef = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set([".animate-section"], {
        autoAlpha: 0,
        y: 25,
      });

      gsap.utils.toArray(".animate-section").forEach((section, index) => {
        gsap.to(section, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.08,
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Fetch photography services for the dropdown
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoadingServices(true);
      const response = await axiosInstance.get("/services/get-services");

      let servicesData = [];
      if (Array.isArray(response.data)) {
        servicesData = response.data.filter((service) => service.isActive !== false);
      } else if (response.data?.services) {
        servicesData = response.data.services.filter((service) => service.isActive !== false);
      }

      setServices(servicesData);
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([
        { id: 1, name: "Newborn Photography", title: "Newborn Photography" },
        { id: 2, name: "Maternity Photography", title: "Maternity Photography" },
        { id: 3, name: "Baby Milestone Shoot", title: "Baby Milestone Shoot" },
        { id: 4, name: "Fashion & Creative Portrait", title: "Fashion & Creative Portrait" },
        { id: 5, name: "Family Photography", title: "Family Photography" },
        { id: 6, name: "Other Specialty Shoot", title: "Other Specialty Shoot" },
      ]);
    } finally {
      setLoadingServices(false);
    }
  };

  const submitContactForm = async (contactData) => {
    try {
      setSubmitting(true);
      toast.loading("Sending your inquiry...", { id: "contact-form" });

      const submissionData = {
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        serviceType: contactData.serviceType,
        message: contactData.message,
        source: "contact_page",
        submittedAt: new Date().toISOString(),
      };

      const response = await axiosInstance.post(
        "/enquiries/create-enquiry",
        submissionData
      );

      toast.success("Thank you! We will get back to you within 24 hours.", {
        id: "contact-form",
        icon: "🎉",
        duration: 5000,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        message: "",
      });

      return response.data;
    } catch (error) {
      console.error("Error submitting contact form:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send message. Please try again or WhatsApp us directly.";
      toast.error(errorMessage, {
        id: "contact-form",
        duration: 6000,
      });
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }
    if (!formData.serviceType) {
      toast.error("Please select a photography service");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Please enter a short message about your shoot");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      await submitContactForm(formData);
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5 text-purple-700" />,
      title: "Phone & Call",
      details: ["+91 9335391320"],
      actionLabel: "Call Now",
      url: "tel:+919335391320",
    },
    {
      icon: <Mail className="w-5 h-5 text-purple-700" />,
      title: "Email Inquiry",
      details: ["jayaagnihotriphotography@gmail.com"],
      actionLabel: "Send Email",
      url: "mailto:jayaagnihotriphotography@gmail.com",
    },
    {
      icon: <MapPin className="w-5 h-5 text-purple-700" />,
      title: "Studio Location",
      details: ["Jaya Agnihotri Photography", "Sushant Golf City, Lucknow"],
      actionLabel: "Google Maps Navigation →",
      url: "https://share.google/3OhKy5swv2nxYiOMG",
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-700" />,
      title: "Studio Hours",
      details: [
        "Mon - Fri: 10:00 AM - 8:00 PM",
        "Sat - Sun: 10:00 AM - 6:00 PM",
      ],
      actionLabel: "Appointments Only",
      url: null,
    },
  ];

  const socialLinks = [
    {
      icon: <Instagram className="w-5 h-5" />,
      name: "Instagram",
      handle: "@jayaagnihotriphotography",
      url: "https://www.instagram.com/jayaagnihotriphotography/",
      bg: "bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500",
    },
    {
      icon: <Facebook className="w-5 h-5" />,
      name: "Facebook",
      handle: "Jaya Agnihotri Photography",
      url: "https://facebook.com/jayaagnihotriphotography",
      bg: "bg-gradient-to-r from-blue-600 to-indigo-600",
    },
  ];

  const studioPerks = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-purple-700" />,
      title: "100% Baby-Safe Studio",
      desc: "Sanitized props, temperature-controlled environment & delicate handling.",
    },
    {
      icon: <Award className="w-5 h-5 text-purple-700" />,
      title: "10+ Years & 500+ Shoots",
      desc: "Masters in Photography led studio with years of newborn expertise.",
    },
    {
      icon: <Camera className="w-5 h-5 text-purple-700" />,
      title: "Custom Wardrobe & Props",
      desc: "Complete luxury gowns, wraps, headbands & custom sets provided.",
    },
    {
      icon: <Heart className="w-5 h-5 text-purple-700" />,
      title: "Private Mother & Baby Lounge",
      desc: "Dedicated feeding & resting room for maximum comfort.",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#F0E7E5] text-gray-900 pt-28 pb-20 relative overflow-hidden"
    >
      {/* Subtle Luxury Glow Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/25 rounded-full blur-3xl"></div>
      </div>

      {/* 🌟 HERO HEADER */}
      <section className="animate-section max-w-4xl mx-auto text-center px-6 mb-12 space-y-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-purple-800 text-xs font-bold uppercase tracking-widest border border-[#e0d0b8] shadow-xs">
          Book Your Creative Session
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-gray-900 leading-tight">
          Let's Capture Your <span className="italic text-purple-700">Precious Moments</span>
        </h1>

        <p className="text-gray-700 text-base sm:text-lg font-medium max-w-xl mx-auto leading-relaxed">
          Have questions or ready to schedule your session? We'd love to hear from you! Fill out the form or reach us directly.
        </p>

        {/* ⚡ Quick Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://wa.me/919335391320"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-green-700 transition-all shadow-md hover:scale-105"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href="tel:+919335391320"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-purple-700 transition-all shadow-md hover:scale-105"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Direct Call</span>
          </a>

          <a
            href="https://share.google/3OhKy5swv2nxYiOMG"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-800 border border-[#e0d0b8] rounded-full text-xs font-bold uppercase tracking-wider hover:border-purple-600 hover:text-purple-700 transition-all shadow-xs"
          >
            <MapPin className="w-4 h-4 text-purple-700" />
            <span>Google Location</span>
          </a>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        {/* 📌 MAIN FORM & CONTACT DETAILS GRID */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* 📝 Left Column: Premium Contact Form (7 cols) */}
          <div className="animate-section lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#e0d0b8] shadow-xl space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-600 text-sm font-medium">
                Fill in your shoot preferences and we will contact you within 24 hours with details & packages.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Full Name & Email */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center pointer-events-none">
                      <User className="w-4 h-4 text-purple-700" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Priyanshu Sharma"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="w-full pl-14 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all disabled:opacity-50 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center pointer-events-none">
                      <Mail className="w-4 h-4 text-purple-700" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="w-full pl-14 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all disabled:opacity-50 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Phone & Service Type */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Phone Number *
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center pointer-events-none">
                      <Phone className="w-4 h-4 text-purple-700" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="w-full pl-14 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all disabled:opacity-50 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Select Service *
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center pointer-events-none">
                      <Camera className="w-4 h-4 text-purple-700" />
                    </div>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      disabled={submitting || loadingServices}
                      className="w-full pl-14 pr-10 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all appearance-none cursor-pointer disabled:opacity-50"
                      required
                    >
                      <option value="">
                        {loadingServices ? "Loading services..." : "-- Choose Photography Category --"}
                      </option>
                      {services.map((service) => (
                        <option
                          key={service.id || service._id || service.name}
                          value={service.name || service.title}
                        >
                          {service.name || service.title}
                        </option>
                      ))}
                      <option value="Custom Photography Project">Custom Photography Project</option>
                    </select>
                    <div className="absolute right-4 pointer-events-none text-gray-400">
                      {loadingServices ? (
                        <Loader2 className="w-4 h-4 animate-spin text-purple-700" />
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Message Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Your Message & Preferred Dates *
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-3.5 w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center pointer-events-none">
                    <MessageCircle className="w-4 h-4 text-purple-700" />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Tell us about baby's due date, preferred photoshoot location, or theme preferences..."
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={submitting}
                    rows={5}
                    className="w-full pl-14 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all resize-none disabled:opacity-50 placeholder-gray-400"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-black text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 group"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* 📞 Right Column: Contact Cards & Studio Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Cards */}
            <div className="animate-section space-y-3.5">
              {contactInfo.map((item, index) => {
                const CardWrapper = item.url ? "a" : "div";
                const wrapperProps = item.url
                  ? { href: item.url, target: "_blank", rel: "noopener noreferrer" }
                  : {};

                return (
                  <CardWrapper
                    key={index}
                    {...wrapperProps}
                    className="bg-white rounded-2xl p-5 border border-[#e0d0b8] shadow-sm hover:shadow-md transition-all duration-300 group block cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-700 group-hover:text-white transition-colors">
                        {item.icon}
                      </div>

                      <div className="flex-1 space-y-1">
                        <h3 className="font-bold text-sm text-gray-900 group-hover:text-purple-700 transition-colors">
                          {item.title}
                        </h3>

                        {item.details.map((detail, idx) => (
                          <p key={idx} className="text-xs text-gray-600 font-medium">
                            {detail}
                          </p>
                        ))}

                        {item.actionLabel && (
                          <span className="text-[11px] text-purple-700 font-bold group-hover:underline inline-block pt-0.5">
                            {item.actionLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardWrapper>
                );
              })}
            </div>

            {/* Social Media Connect */}
            <div className="animate-section bg-white rounded-2xl p-6 border border-[#e0d0b8] shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-lg text-gray-900">
                Follow Jaya Photography
              </h3>
              
              <div className="space-y-2.5">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-purple-200 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${social.bg} text-white flex items-center justify-center shadow-xs`}>
                        {social.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                          {social.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 font-light">
                          {social.handle}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-purple-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      Visit →
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* 🏆 STUDIO HIGHLIGHTS & PERKS */}
        <section className="animate-section bg-white rounded-3xl p-8 sm:p-12 border border-[#e0d0b8] shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-widest">
              Why Choose Jaya Photography
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900">
              The Premier Studio Experience
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studioPerks.map((perk, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#F0E7E5]/50 border border-[#e0d0b8]/60 space-y-3 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#e0d0b8] flex items-center justify-center shadow-xs">
                  {perk.icon}
                </div>
                <h3 className="font-serif font-bold text-base text-gray-900">
                  {perk.title}
                </h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 🗺️ GOOGLE MAPS STUDIO LOCATION */}
        <section className="animate-section bg-white rounded-3xl p-6 sm:p-8 border border-[#e0d0b8] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Visit Our Studio in Lucknow
              </h2>
              <p className="text-xs text-gray-600 font-medium">
                Sushant Golf City, Lucknow, Uttar Pradesh. Appointments recommended.
              </p>
            </div>

            <a
              href="https://share.google/3OhKy5swv2nxYiOMG"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-purple-700 transition-colors shadow-xs"
            >
              Get Driving Directions →
            </a>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-gray-200 h-[380px] shadow-inner">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.2441234567!2d80.9496963!3d26.8541383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfdc58e64c56d%3A0x3a1f0c8f9a2b6c1e!2sSushant%20Golf%20City%2C%20Lucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>

            {/* Studio Badge Overlay */}
            <a
              href="https://share.google/3OhKy5swv2nxYiOMG"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-lg border border-[#e0d0b8] hover:scale-105 transition-transform group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-700 text-white flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs text-gray-900 group-hover:text-purple-700 transition-colors">
                    Jaya Agnihotri Photography
                  </h4>
                  <p className="text-[11px] text-gray-500 font-light">
                    Sushant Golf City, Lucknow
                  </p>
                  <span className="text-[10px] text-purple-700 font-bold underline inline-block">
                    Open Google Maps
                  </span>
                </div>
              </div>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ContactUsPage;
