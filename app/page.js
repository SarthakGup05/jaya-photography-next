import Image from "next/image";
import Hero from "@/components/Hero";
import PhotographyPortfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import JayaAbout from "@/components/About";
import Testimonial from "@/components/Testimonial";
import BookSession from "@/components/Cta";
import CTASection from "@/components/Cta";
import HomeJsonLd from "@/components/schema/HomeJsonLd";

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <Hero />
      <PhotographyPortfolio />
      <Services />
      <JayaAbout />
      <Testimonial />
      <CTASection />
    </>
  );
}
