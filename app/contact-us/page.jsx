import ContactUsUI from "./ContactUsUI";

export const metadata = {
  title: "Contact Us & Studio Location | Jaya Photography Lucknow",
  description:
    "Book your newborn, maternity, baby milestone, or family photo session with Jaya Photography in Sushant Golf City, Lucknow. Reach us via phone, email, or form.",
  alternates: {
    canonical: "https://jayaphotography.in/contact-us",
  },
  openGraph: {
    title: "Contact Us | Jaya Photography Lucknow",
    description:
      "Book your photoshoot session with Jaya Photography in Sushant Golf City, Lucknow.",
    url: "https://jayaphotography.in/contact-us",
  },
};

export default function ContactPage() {
  return <ContactUsUI />;
}
