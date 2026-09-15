import GalleryUI from "./GalleryUI";

export const metadata = {
  title: "Fine-Art Photo Gallery | Jaya Photography Lucknow",
  description:
    "Explore our fine-art portfolio of newborn, baby milestone, maternity, cake smash, and family portraits in Sushant Golf City, Lucknow.",
  alternates: {
    canonical: "https://jayaphotography.in/gallery",
  },
  openGraph: {
    title: "Fine-Art Photo Gallery | Jaya Photography Lucknow",
    description:
      "Explore our fine-art portfolio of newborn, maternity & family portraits in Lucknow.",
    url: "https://jayaphotography.in/gallery",
  },
};

export default function GalleryPage() {
  return <GalleryUI />;
}
