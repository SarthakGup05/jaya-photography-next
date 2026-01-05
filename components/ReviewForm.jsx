"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  Send,
  User,
  MapPin,
  Briefcase,
  AlertCircle,
  Loader2,
  Mail,
  Phone
} from "lucide-react";
import { toast } from "react-hot-toast";
import axiosInstance from "@/libs/axios-instance";

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    location: "",
    rating: 0,
    text: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  
  // For Star Rating Hover Effect
  const [hoverRating, setHoverRating] = useState(0);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true);
        const response = await axiosInstance.get("/services/get-services", {
          params: { isActive: "true", sortBy: "sortOrder", sortOrder: "asc" },
        });
        let servicesData =
          Array.isArray(response.data) && response.data.length
            ? response.data
            : response.data.services || [];
        const activeServices = servicesData
          .filter((s) => s.isActive)
          .sort((a, b) => a.sortOrder - b.sortOrder);
        setServices(activeServices);
      } catch (error) {
        toast.error("Failed to load services");
        // Fallback data
        setServices([
          { id: "fallback-1", name: "Maternity Photography" },
          { id: "fallback-2", name: "Newborn Photography" },
          { id: "fallback-3", name: "Baby Photography" },
          { id: "fallback-4", name: "Family Photography" },
        ]);
      } finally {
        setServicesLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleRatingClick = (rating) => {
    setFormData((p) => ({ ...p, rating }));
    if (errors.rating) setErrors((p) => ({ ...p, rating: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.service) newErrors.service = "Required";
    if (!formData.location.trim()) newErrors.location = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = "Invalid email";
    }
    if (formData.rating === 0) newErrors.rating = "Rating required";
    if (!formData.text.trim()) newErrors.text = "Review text required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) submitData.append(key, value);
      });
      submitData.append("type", "text");

      const response = await axiosInstance.post(
        "/testimonials/create-testimonial",
        submitData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        toast.success(
          response.data.message ||
            "Thank you! Your review has been submitted."
        );
        setFormData({
          name: "",
          service: "",
          location: "",
          rating: 0,
          text: "",
          email: "",
          phone: "",
        });
        setErrors({});
        setHoverRating(0);
      }
    } catch (err) {
      toast.error("Failed to submit review. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Shared Input Styles for Glass Effect
  const inputBaseClasses = `w-full bg-gray-50/50 dark:bg-white/5 border rounded-xl px-4 py-3 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all backdrop-blur-sm`;
  
  const getErrorClass = (fieldName) => 
    errors[fieldName] ? "border-red-400 focus:ring-red-200" : "border-gray-200 dark:border-white/10";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      {/* --- Row 1: Name & Location --- */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-1">
             Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="e.g. Sarah Connor"
              value={formData.name}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${getErrorClass("name")} pl-10`}
            />
          </div>
          {errors.name && <p className="text-red-400 text-xs ml-1">{errors.name}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-1">
             Location <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="location"
              placeholder="e.g. New York, NY"
              value={formData.location}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${getErrorClass("location")} pl-10`}
            />
          </div>
          {errors.location && <p className="text-red-400 text-xs ml-1">{errors.location}</p>}
        </div>
      </div>

      {/* --- Row 2: Email & Phone --- */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-1">
             Email <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="sarah@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${getErrorClass("email")} pl-10`}
            />
          </div>
          {errors.email && <p className="text-red-400 text-xs ml-1">{errors.email}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
             Phone (Optional)
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              name="phone"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleInputChange}
              className={`${inputBaseClasses} border-gray-200 dark:border-white/10 pl-10`}
            />
          </div>
        </div>
      </div>

      {/* --- Service Selection --- */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-1">
           Service Rendered <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <select
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            disabled={servicesLoading}
            className={`${inputBaseClasses} ${getErrorClass("service")} pl-10 appearance-none`}
          >
            <option value="">{servicesLoading ? "Loading..." : "Select a service"}</option>
            {services.map((s) => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
          {/* Custom Arrow */}
          <div className="absolute right-4 top-4 pointer-events-none opacity-50 text-xs">▼</div>
        </div>
        {errors.service && <p className="text-red-400 text-xs ml-1">{errors.service}</p>}
      </div>

      {/* --- Star Rating --- */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-1">
           Overall Experience <span className="text-red-400">*</span>
        </label>
        <div className="flex items-center gap-1 bg-gray-50/30 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-3 w-fit backdrop-blur-sm">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingClick(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none transition-transform hover:scale-110 p-0.5"
            >
              <Star
                className={`w-8 h-8 transition-colors duration-200 ${
                  star <= (hoverRating || formData.rating)
                    ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            </button>
          ))}
          <span className="ml-3 text-sm font-medium text-gray-500">
            {formData.rating > 0 ? `${formData.rating}/5` : "Rate us"}
          </span>
        </div>
        {errors.rating && <p className="text-red-400 text-xs ml-1">{errors.rating}</p>}
      </div>

      {/* --- Review Text --- */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-1">
           Your Review <span className="text-red-400">*</span>
        </label>
        <textarea
          name="text"
          rows={4}
          maxLength={1000}
          value={formData.text}
          onChange={handleInputChange}
          placeholder="Tell us about your experience..."
          className={`${inputBaseClasses} ${getErrorClass("text")} resize-none`}
        />
        <div className="flex justify-end text-[10px] text-gray-400 pr-1">
          {formData.text.length}/1000
        </div>
        {errors.text && <p className="text-red-400 text-xs ml-1">{errors.text}</p>}
      </div>

      {/* --- Submit Button --- */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full group relative flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transform transition-all hover:-translate-y-1 active:translate-y-0 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="relative z-10">Submitting...</span>
          </>
        ) : (
          <>
            <span className="relative z-10">Submit Review</span>
            <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </>
        )}
        
        {/* Button shine effect */}
        {!isSubmitting && (
           <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
        )}
      </button>
    </form>
  );
};

export default ReviewForm;