"use client";
import React, { useState, useEffect } from "react";

import { Camera, Phone, Mail, MapPin, User, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import axiosInstance from "../libs/axios-instance";

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    service: "",
  });

  const [services, setServices] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loadingServices, setLoadingServices] = useState(true);

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoadingServices(true);
      const response = await axiosInstance.get("/services/get-services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services");
      // Fallback to static services if API fails
      setServices([
        { id: 1, title: "Maternity Photography", slug: "maternity" },
        { id: 2, title: "Baby Photography", slug: "baby" },
        { id: 3, title: "Fashion Photography", slug: "fashion" },
        { id: 4, title: "Family Photography", slug: "family" },
        { id: 5, title: "Theme Photography", slug: "theme" },
      ]);
    } finally {
      setLoadingServices(false);
    }
  };

  const submitContactForm = async (contactData) => {
    try {
      setSubmitting(true);
      toast.loading("Sending your inquiry...", { id: "cta-form" });

      const submissionData = {
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        city: contactData.city,
        serviceType: contactData.service,
        message: `Inquiry from CTA section. City: ${contactData.city}, Service: ${contactData.service}`,
        source: "cta_section",
        submittedAt: new Date().toISOString(),
      };

      const response = await axiosInstance.post(
        "/enquiries/create-enquiry",
        submissionData
      );

      toast.success("Thank you! We'll get back to you within 24 hours.", {
        id: "cta-form",
        icon: "🎉",
        duration: 5000,
      });

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        service: "",
      });

      return response.data;
    } catch (error) {
      console.error("Error submitting contact form:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send inquiry. Please try again.";
      toast.error(errorMessage, {
        id: "cta-form",
        icon: "❌",
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

    if (submitting) {
      toast.error("Please wait, submitting your inquiry...", { icon: "⏳" });
      return;
    }

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name", { icon: "⚠️" });
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email address", { icon: "⚠️" });
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number", { icon: "⚠️" });
      return;
    }
    if (!formData.city.trim()) {
      toast.error("Please enter your city", { icon: "⚠️" });
      return;
    }
    if (!formData.service) {
      toast.error("Please select a photography service", { icon: "⚠️" });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address", { icon: "⚠️" });
      return;
    }

    try {
      await submitContactForm(formData);
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  return (
    <section className="pt-16 pb-20 sm:pt-20 sm:pb-24 px-4 bg-[#F0E7E5] border-t border-[#dfd3c9] relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#e6d8ce]/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ebdcd3]/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-[#e8ded6] px-4 py-1.5 rounded-full border border-[#d8c8bc] mb-3.5 shadow-2xs">
            <Camera className="w-3.5 h-3.5 text-[#6e5445]" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#42352f]">
              Professional Photography in Lucknow
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold mb-4 text-stone-900 leading-[1.2] tracking-tight">
            Ready to Capture Your{" "}
            <span className="font-normal italic text-[#6e5445]">
              Special Moments?
            </span>
          </h2>
          <div className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed space-y-2">
            <p>
              Planning a maternity, newborn, baby, milestone, cake smash, or family photoshoot in Lucknow? Let’s create beautiful, timeless memories together.
            </p>
            <p className="text-xs sm:text-sm text-stone-500">
              Tell us about your photography requirements, preferred session, and vision. Our team will review your enquiry and get in touch within 24 hours to discuss availability, packages, styling, and the next steps for your session.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-sm border border-[#dfd2c6] p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={submitting}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C7355] focus:border-[#8C7355] transition-all disabled:opacity-50 text-stone-800 placeholder-stone-400 text-sm"
                  required
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={submitting}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C7355] focus:border-[#8C7355] transition-all disabled:opacity-50 text-stone-800 placeholder-stone-400 text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={submitting}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C7355] focus:border-[#8C7355] transition-all disabled:opacity-50 text-stone-800 placeholder-stone-400 text-sm"
                  required
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  name="city"
                  placeholder="Your City"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={submitting}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all disabled:opacity-50 text-gray-800 placeholder-gray-500 text-sm"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <Camera className="absolute left-3 top-4 w-4 h-4 text-gray-500" />
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                disabled={submitting || loadingServices}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all appearance-none cursor-pointer disabled:opacity-50 text-gray-800 text-sm"
                required
              >
                <option value="">
                  {loadingServices
                    ? "Loading services..."
                    : "Select Photography Service"}
                </option>
                {services.map((service) => (
                  <option
                    key={service.id}
                    value={
                      service.slug ||
                      service.title.toLowerCase().replace(/\s+/g, "-")
                    }
                  >
                    {service.title}
                  </option>
                ))}
                <option value="multiple">Multiple Services</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                {loadingServices ? (
                  <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                ) : (
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#231b19] hover:bg-[#3a2e2a] text-white font-medium py-3.5 px-8 rounded-full transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base tracking-wide"
            >
              <span className="flex items-center justify-center gap-2">
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Enquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Book Your Photography Session →</span>
                    <Camera className="w-4 h-4 text-stone-300" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Subtext and Studio Location Details */}
          <div className="mt-8 pt-6 border-t border-stone-200/80 text-center space-y-2">
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl mx-auto">
              Whether you're looking for a professional photographer in Lucknow, a newborn photographer for your baby, a maternity photographer for your pregnancy portraits, or a family photographer for meaningful portraits, we’re here to help you plan a personalized experience.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-stone-700 pt-1">
              <span className="inline-flex items-center gap-1.5 text-stone-800">
                <MapPin className="w-3.5 h-3.5 text-[#6e5445]" />
                Located in Sushant Golf City, Lucknow, near Centrum Hotel
              </span>
              <span className="text-stone-300 hidden sm:inline">•</span>
              <span className="text-stone-500 font-normal">
                We’ll respond within 24 hours to discuss your vision and schedule your session.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
