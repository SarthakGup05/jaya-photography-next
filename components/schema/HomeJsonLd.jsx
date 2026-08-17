import { homePageSchema } from "@/lib/schema/homeSchema";

export default function HomeJsonLd() {
  const jsonLdString = JSON.stringify(homePageSchema).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
}
