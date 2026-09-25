import Image from "next/image";
import Hero from "@/components/Hero";
import PhotographyPortfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import JayaAbout from "@/components/About";
import Testimonial from "@/components/Testimonial";
import HomeBlogSection from "@/components/HomeBlogSection";
import CTASection from "@/components/Cta";
import WhyTrustUs from "@/components/WhyTrustUs";
import HomeFaq from "@/components/HomeFaq";
import HomeJsonLd from "@/components/schema/HomeJsonLd";
import SectionDivider from "@/components/SectionDivider";

export const metadata = {
  title: "Maternity, Newborn & Baby Photographer in Lucknow | Jaya Photography",
  description:
    "Jaya Agnihotri Photography is a luxury photography studio in Lucknow for maternity, newborn, baby milestone, cake smash & family photography. Book your session.",
  keywords: [
    "photographer in Lucknow",
    "photography studio in Lucknow",
    "baby photographer in Lucknow",
    "baby photography in Lucknow",
    "baby photoshoot in Lucknow",
    "newborn photographer in Lucknow",
    "newborn photography in Lucknow",
    "newborn photoshoot in Lucknow",
    "maternity photographer in Lucknow",
    "maternity photography in Lucknow",
    "maternity photoshoot in Lucknow",
    "pregnancy photoshoot in Lucknow",
    "baby milestone photography Lucknow",
    "cake smash photography Lucknow",
    "family photographer in Lucknow",
    "family photoshoot in Lucknow",
    "toddler photographer Lucknow",
    "kids photographer Lucknow",
    "theme photoshoot Lucknow",
    "luxury photography studio Lucknow",
    "fine art photography Lucknow",
    "photography studio in Ansal API Lucknow",
    "photographer in Ansal API Lucknow",
    "photographer near Centrum Hotel Lucknow",
  ],
  alternates: {
    canonical: "https://jayaphotography.in",
  },
  openGraph: {
    title: "Maternity, Newborn & Baby Photographer in Lucknow | Jaya Photography",
    description:
      "Jaya Agnihotri Photography is a luxury photography studio in Lucknow for maternity, newborn, baby milestone, cake smash & family photography. Book your session.",
    url: "https://jayaphotography.in",
  },
};

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <Hero />
      <SectionDivider number="01" label="Signature Themes" />
      <PhotographyPortfolio />
      <SectionDivider number="02" label="Studio Services" />
      <Services />
      <SectionDivider number="03" label="Meet The Artist" />
      <JayaAbout />
      <SectionDivider number="04" label="Client Stories" />
      <Testimonial />
      <SectionDivider number="05" label="Why Parents Trust Us" />
      <WhyTrustUs />
      <SectionDivider number="06" label="Reserve A Session" />
      <CTASection />
      <SectionDivider number="07" label="Journal & Guides" />
      <HomeBlogSection />
      <SectionDivider number="08" label="Questions & Answers" />
      <HomeFaq />
    </>
  );
}
