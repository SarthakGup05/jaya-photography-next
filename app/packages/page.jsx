import PackagesUI from "./PackagesUI";

export const metadata = {
  title: "Photography Packages & Pricing | Jaya Photography Lucknow",
  description:
    "Explore and compare luxury photoshoot packages for newborn, maternity, cake smash, and family portraits in Lucknow.",
  alternates: {
    canonical: "https://jayaphotography.in/packages",
  },
  openGraph: {
    title: "Photography Packages & Pricing | Jaya Photography Lucknow",
    description:
      "Compare luxury photoshoot packages for newborn, maternity & family portraits in Lucknow.",
    url: "https://jayaphotography.in/packages",
  },
};

export default function PackagesPage() {
  return <PackagesUI />;
}
