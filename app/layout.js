import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://jayaphotography.in"),
  title: {
    default: "Jaya Photography Lucknow | Luxury Baby, Newborn & Maternity Photoshoot",
    template: "%s | Jaya Photography Lucknow",
  },
  description:
    "Jaya Agnihotri Photography is the premier luxury baby, newborn, maternity, cake smash, and family portrait studio in Lucknow. 10+ years of fine-art experience.",
  keywords: [
    "baby photography lucknow",
    "newborn photoshoot lucknow",
    "maternity photographer lucknow",
    "cake smash photoshoot lucknow",
    "best baby photographer in lucknow",
    "jaya agnihotri photography",
    "family portraits lucknow",
  ],
  authors: [{ name: "Jaya Agnihotri", url: "https://jayaphotography.in" }],
  creator: "Jaya Agnihotri",
  publisher: "Jaya Photography Lucknow",
  alternates: {
    canonical: "https://jayaphotography.in",
  },
  openGraph: {
    title: "Jaya Photography Lucknow | Luxury Baby, Newborn & Maternity Photoshoot",
    description:
      "Premier luxury photography studio in Lucknow specializing in newborn sessions, maternity photoshoots, baby milestones, cake smash, and family portraits.",
    url: "https://jayaphotography.in",
    siteName: "Jaya Photography",
    images: [
      {
        url: "/file_ho8tds.jpg",
        width: 1200,
        height: 630,
        alt: "Jaya Photography Studio Lucknow",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaya Photography Lucknow | Luxury Baby, Newborn & Maternity Photoshoot",
    description:
      "Premier luxury photography studio in Lucknow capturing life's precious moments with artistic elegance.",
    images: ["/file_ho8tds.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
