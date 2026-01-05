"use client";

import React, { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Camera, ChevronRight, AlertCircle, Loader2 } from "lucide-react";
import axiosInstance from "@/libs/axios-instance";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import ReviewForm from "@/components/ReviewForm"; // Assuming you want the form we built earlier?
// If you want the specific Enquiry Form from your snippet:
const ContactForm = dynamic(() => import("@/components/Form"), { ssr: false });
const Modal = dynamic(() => import("@/components/modal"), { ssr: false });
const PhotographyPortfolio = dynamic(() => import("@/components/Portfolio"), {
  ssr: false,
  loading: () => <div className="text-center py-12 text-gray-500">Loading gallery...</div>,
});

const ServiceUI = ({ service }) => {
  const router = useRouter();

  // If service is null (handled in parent, but good safety)
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f3e6fa] to-[#F0E7E5]">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm mx-4">
          <div className="p-4 bg-white rounded-full shadow-md">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Service Not Found</h2>
          <button
            onClick={() => router.push("/services")}
            className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  // ✅ Booking form submission handler
  const handleBookingSubmit = async (formData) => {
    try {
      const bookingData = {
        ...formData,
        serviceId: service?.id,
        serviceTitle: service?.title,
        serviceSlug: service?.slug,
        bookingType: "service_booking",
      };

      await axiosInstance.post("/enquiries/create-enquiry", bookingData);
      toast.success(`Booking request for "${service.title}" sent successfully!`);
    } catch (error) {
      const message = error.response?.data?.message || "Failed to submit booking. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3e6fa] via-white to-[#F0E7E5] relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-purple-200/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 right-20 w-32 h-32 bg-pink-200/12 rounded-full blur-2xl"></div>
      </div>

      {/* 🏞 Hero Section */}
      <section className="relative pt-24 pb-12 px-4 text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/70 px-4 py-2 rounded-full shadow-sm border border-purple-100 mb-6">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
            <span className="text-xs font-medium text-gray-700">
              {service.featured ? "Featured Service" : "Professional Service"}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {service.title.split(" ").map((word, i) => (
              <span
                key={i}
                className={
                  i === 0
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                    : ""
                }
              >
                {word}{" "}
              </span>
            ))}
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            {service.subtitle}
          </p>
        </div>
      </section>

      {/* 🧩 Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/70 rounded-2xl p-6 shadow-lg border border-white/50">
              <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium mb-3">
                Service Overview
              </span>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                About {service.title}
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {service.description}
              </p>

              {service.duration && (
                <div className="flex items-center gap-3 mt-4 p-3 bg-purple-50/50 rounded-xl border border-purple-100">
                  <Camera className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">
                    Session Duration: {service.duration}
                  </span>
                </div>
              )}
            </div>

            {/* Features */}
            {service.features?.length > 0 && (
              <div className="bg-white/70 rounded-2xl p-6 shadow-lg border border-white/50">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  What’s Included
                </h3>
                <div className="grid gap-3">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50/40 to-pink-50/40 rounded-xl border border-purple-100/50"
                    >
                      <ChevronRight className="w-4 h-4 text-purple-600 mt-0.5" />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Booking CTA */}
            <Suspense fallback={<div className="text-center text-gray-500">Loading form...</div>}>
              <Modal
                trigger={
                  <button className="w-full group bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-500 transform hover:scale-105 shadow-lg">
                    <span className="flex items-center justify-center gap-2">
                      <span>Book This Session</span>
                      <Camera className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    </span>
                  </button>
                }
                title={`📸 Book "${service.title}"`}
                description={`Fill your details below to book a ${service.title} session.`}
                className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto"
              >
                {({ close }) => (
                  <ContactForm
                    initialData={{
                      serviceType: service.slug,
                      message: `Hello! I'm interested in booking a "${service.title}" session.`,
                    }}
                    submitButtonText={`Book ${service.title}`}
                    onSubmit={async (formData) => {
                      await handleBookingSubmit(formData);
                      close();
                    }}
                  />
                )}
              </Modal>
            </Suspense>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white/20 border border-white/30">
                <img
                  src={service.mainImage || service.coverImage || "/api/placeholder/400/300"}
                  alt={service.title}
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <Suspense fallback={<div className="text-center py-12 text-gray-500">Loading gallery...</div>}>
        <PhotographyPortfolio />
      </Suspense>
    </div>
  );
};

export default ServiceUI;