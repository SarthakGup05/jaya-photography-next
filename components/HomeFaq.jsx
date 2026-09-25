"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, MessageSquare, PhoneCall } from "lucide-react";

export const HOME_FAQS = [
  {
    question: "What photography services does Jaya Agnihotri Photography offer in Lucknow?",
    answer:
      "Jaya Agnihotri Photography specializes in maternity, newborn, baby, baby milestone, cake smash, toddler, kids, family, creative theme, and fashion photography in Lucknow. Sessions are thoughtfully planned around your style, requirements, and story.",
  },
  {
    question: "Where is Jaya Agnihotri Photography located in Lucknow?",
    answer:
      "Our photography studio is located in Sushant Golf City, Lucknow, near Centrum Hotel. The studio provides a comfortable and professionally equipped environment for maternity, newborn, baby, and family photoshoots.",
  },
  {
    question: "How can I book a photography session in Lucknow?",
    answer:
      "You can enquire through the website, call, or WhatsApp to discuss your preferred photography service, requirements, availability, and package options. Once your session is planned, we’ll guide you through the booking process.",
  },
  {
    question: "Do you provide newborn photography in Lucknow?",
    answer:
      "Yes. We offer professionally planned newborn photoshoots in Lucknow with creative themes, artistic styling, professional lighting, and a baby-first approach focused on comfort throughout the session.",
  },
  {
    question: "When should I book a maternity photoshoot?",
    answer:
      "Maternity sessions are generally planned during the later stages of pregnancy when the baby bump is beautifully visible and you are still comfortable. Contact the studio to discuss the ideal timing for your individual session.",
  },
  {
    question: "Can parents and siblings participate in baby photoshoots?",
    answer:
      "Yes. Parents and siblings can be included in suitable baby, newborn, milestone, and family sessions to create meaningful portraits that capture your family’s connection.",
  },
  {
    question: "Do you provide outfits, props and photography themes?",
    answer:
      "Selected sessions can include creative themes, props, styling guidance, and customized setups. Available options depend on the photography service and package you choose.",
  },
  {
    question: "What happens if my baby becomes fussy during the photoshoot?",
    answer:
      "Baby sessions are approached with patience and flexibility. Breaks for feeding, comforting, settling, or changing can be accommodated when needed so the experience remains relaxed for both baby and parents.",
  },
  {
    question: "Do you offer baby milestone and first birthday photography in Lucknow?",
    answer:
      "Yes. We offer baby milestone photography, sitter sessions, cake smash photography, and first birthday photoshoots in Lucknow, with customized concepts and age-appropriate creative setups.",
  },
  {
    question: "How much does a photography session in Lucknow cost?",
    answer:
      "Photography pricing depends on the type of session, duration, number of setups, styling, deliverables, and package selected. Visit the Photography Packages section or contact the studio for current options and availability.",
  },
  {
    question: "Why choose Jaya Agnihotri Photography for your family photoshoot?",
    answer:
      "Jaya combines a Master’s Degree in Photography, artistic styling, professional studio lighting, and a baby-friendly approach to create personal, timeless portraits. The studio specializes in preserving meaningful moments from maternity through childhood.",
  },
  {
    question: "How quickly will I receive a response after submitting an enquiry?",
    answer:
      "After submitting your enquiry, the studio aims to respond within 24 hours to discuss your photography requirements, preferred session, availability, and booking details.",
  },
];

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#faf7f5] relative overflow-hidden border-t border-[#e2d5cb]">
      {/* FAQ Schema for SEO rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e8ded6] border border-[#d8c8bc] text-[#42352f] text-[11px] font-medium tracking-[0.18em] uppercase shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#6e5445]" />
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-stone-900 tracking-tight leading-[1.2]">
            Frequently Asked Questions{" "}
            <span className="font-normal italic text-[#6e5445]">
              About Photography in Lucknow
            </span>
          </h2>

          <p className="text-stone-600 text-sm sm:text-base font-normal leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about booking, preparing for your photoshoot, props, outfits, and session experience at our Sushant Golf City studio.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {HOME_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 shadow-2xs hover:shadow-xs transition-all duration-300 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C7355]"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-serif font-semibold text-stone-900 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#231b19] text-white rotate-180"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-sm sm:text-base text-stone-600 leading-relaxed border-t border-stone-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Assistance Callout */}
        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-[#dfd2c6] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900">
              Have a question not covered here?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              We are delighted to chat and help design the perfect session for your family.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
            <Link
              href="/contact-us"
              className="w-full sm:w-auto text-center px-5 py-3 sm:py-2.5 rounded-full bg-[#231b19] text-white text-xs sm:text-sm font-medium hover:bg-[#3a2e2a] transition-all shadow-sm flex items-center justify-center"
            >
              Contact Us
            </Link>
            <a
              href="https://wa.me/919335391320"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-5 py-3 sm:py-2.5 rounded-full border border-stone-300 text-stone-800 hover:bg-stone-50 hover:border-stone-400 text-xs sm:text-sm font-medium transition-all flex items-center justify-center"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
