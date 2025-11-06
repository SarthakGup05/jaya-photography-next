"use client";

import React from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingModal from "@/components/Floating-modal";

import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        {/* ✅ Top navigation bar */}
        <Nav />

        {/* ✅ Main content */}
        <main className="flex-1 p-0">{children}</main>

        {/* ✅ Footer */}
        <Footer />

        {/* ✅ Floating review modal */}
        <FloatingModal buttonText="⭐ Leave a Review">
          {/* <ReviewForm /> */}
        </FloatingModal>

        {/* ✅ Global toaster notifications */}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
