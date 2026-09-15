import Image from "next/image";
import Hero from "@/components/Hero";
import PhotographyPortfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import JayaAbout from "@/components/About";
import Testimonial from "@/components/Testimonial";
import HomeBlogSection from "@/components/HomeBlogSection";
import CTASection from "@/components/Cta";
import HomeJsonLd from "@/components/schema/HomeJsonLd";

export const metadata = {
  title: "Jaya Photography Lucknow | Luxury Baby, Newborn & Maternity Photoshoot",
  description:
    "Jaya Agnihotri Photography is the premier luxury baby, newborn, maternity, cake smash, and family portrait studio in Sushant Golf City, Lucknow. 10+ years of fine-art experience.",
  alternates: {
    canonical: "https://jayaphotography.in",
  },
  openGraph: {
    title: "Jaya Photography Lucknow | Luxury Baby, Newborn & Maternity Photoshoot",
    description:
      "Premier luxury baby, newborn & maternity photography studio in Sushant Golf City, Lucknow.",
    url: "https://jayaphotography.in",
  },
};

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <Hero />
      <PhotographyPortfolio />
      <Services />
      <JayaAbout />
      <Testimonial />
      <HomeBlogSection />
      <CTASection />
    </>
  );
}
