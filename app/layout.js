import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL("https://jayaphotography.in"),
  title: "Baby Photography | Newborn Baby Photoshoot in Lucknow",
  description:
    "Jaya photography best photographer in Lucknow for baby shoot. Book for infants, kids photography & babyshoot. Specialised in baby photography. 10 years of experience.",
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
