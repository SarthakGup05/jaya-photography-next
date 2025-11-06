"use client";

import React from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingModal from "@/components/Floating-modal";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ✅ Navigation */}
      <Nav />

      {/* ✅ Page Content */}
      <main className="flex-1">{children}</main>

      {/* ✅ Footer */}
      <Footer />

      {/* ✅ Floating Modal */}
      <FloatingModal buttonText="⭐ Leave a Review">
        {/* <ReviewForm /> */}
      </FloatingModal>

      {/* ✅ Global Toast Notifications */}
      <Toaster position="top-center" />
    </div>
  );
}
