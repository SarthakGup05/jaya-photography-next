export const homePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "PhotographyStudio"],
      "@id": "https://jayaphotography.in/#business",
      "name": "Jaya Agnihotri Photography",
      "url": "https://jayaphotography.in/",
      "telephone": "+919335391320",
      "description":
        "Jaya Agnihotri Photography is a luxury photography studio in Lucknow specializing in newborn photography, baby photoshoots, maternity photography, cake smash sessions, milestone portraits, family photography, toddler photography, creative theme photoshoots and professional fashion photography. Since 2018, we have helped families preserve life's most precious moments through timeless, emotion-filled portraits.",
      "foundingDate": "2018-10-11",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://jayaphotography.in/#logo",
        "url": "https://jayaphotography.in/logo.png",
        "contentUrl": "https://jayaphotography.in/logo.png"
      },
      "image": {
        "@id": "https://jayaphotography.in/#logo"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress":
          "8th Floor, Tower A, Urban Woods Premium Residency, Phase 1, Sector B, Ansal API, Near Centrum Hotel",
        "addressLocality": "Lucknow",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "226030",
        "addressCountry": "IN"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Lucknow"
        },
        {
          "@type": "City",
          "name": "Kanpur"
        },
        {
          "@type": "City",
          "name": "Unnao"
        },
        {
          "@type": "City",
          "name": "Sitapur"
        },
        {
          "@type": "City",
          "name": "Barabanki"
        },
        {
          "@type": "City",
          "name": "Raebareli"
        },
        {
          "@type": "Place",
          "name": "Gomti Nagar, Lucknow"
        },
        {
          "@type": "Place",
          "name": "Sushant Golf City, Lucknow"
        },
        {
          "@type": "Place",
          "name": "Hazratganj, Lucknow"
        },
        {
          "@type": "Place",
          "name": "Aliganj, Lucknow"
        },
        {
          "@type": "Place",
          "name": "Indira Nagar, Lucknow"
        },
        {
          "@type": "Place",
          "name": "Chinhat, Lucknow"
        },
        {
          "@type": "Place",
          "name": "Mahanagar, Lucknow"
        },
        {
          "@type": "Place",
          "name": "Ashiyana, Lucknow"
        },
        {
          "@type": "Place",
          "name": "Alambagh, Lucknow"
        },
        {
          "@type": "Place",
          "name": "Jankipuram, Lucknow"
        },
        {
          "@type": "Place",
          "name": "Rajajipuram, Lucknow"
        },
        {
          "@type": "Place",
          "name": "Vrindavan Colony, Lucknow"
        },
        {
          "@type": "Place",
          "name": "Golf City, Lucknow"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/jayaagnihotriphotography/",
        "https://www.instagram.com/jayaagnihotriphotography/"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+919335391320",
        "contactType": "customer service",
        "url": "https://wa.me/919335391320",
        "availableLanguage": ["English", "Hindi"]
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "11:30",
          "closes": "18:00"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Photography Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Newborn Photography in Lucknow",
              "url": "https://jayaphotography.in/service/newborn-photography-lucknow"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Maternity Photoshoot in Lucknow",
              "url": "https://jayaphotography.in/service/maternity-photoshoot-lucknow"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Baby Milestone Photoshoot in Lucknow",
              "url": "https://jayaphotography.in/service/baby-milestone-photoshoot-lucknow"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Toddler Photoshoot in Lucknow",
              "url": "https://jayaphotography.in/service/toddler-photoshoot-lucknow"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Family Photoshoot in Lucknow",
              "url": "https://jayaphotography.in/service/family-photoshoot"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Fashion Photography in Lucknow",
              "url": "https://jayaphotography.in/service/fashion-photographer-lucknow"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Creative Theme Photoshoot in Lucknow",
              "url": "https://jayaphotography.in/service/theme-photoshoot-lucknow"
            }
          }
        ]
      }
    },
    {
      "@type": "Organization",
      "@id": "https://jayaphotography.in/#organization",
      "name": "Jaya Agnihotri Photography",
      "url": "https://jayaphotography.in/",
      "logo": {
        "@id": "https://jayaphotography.in/#logo"
      },
      "founder": {
        "@id": "https://jayaphotography.in/#jaya-agnihotri"
      },
      "foundingDate": "2018-10-11",
      "telephone": "+919335391320",
      "sameAs": [
        "https://www.facebook.com/jayaagnihotriphotography/",
        "https://www.instagram.com/jayaagnihotriphotography/"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://jayaphotography.in/#jaya-agnihotri",
      "name": "Jaya Agnihotri",
      "jobTitle": "Photographer",
      "worksFor": {
        "@id": "https://jayaphotography.in/#organization"
      },
      "url": "https://jayaphotography.in/about-us"
    },
    {
      "@type": "WebSite",
      "@id": "https://jayaphotography.in/#website",
      "url": "https://jayaphotography.in/",
      "name": "Jaya Agnihotri Photography",
      "publisher": {
        "@id": "https://jayaphotography.in/#organization"
      },
      "inLanguage": "en-IN"
    },
    {
      "@type": "WebPage",
      "@id": "https://jayaphotography.in/#webpage",
      "url": "https://jayaphotography.in/",
      "name": "Best Photographer in Lucknow | Jaya Agnihotri Photography",
      "description":
        "Luxury baby, newborn, maternity, family, milestone, toddler, theme and fashion photography studio in Lucknow.",
      "isPartOf": {
        "@id": "https://jayaphotography.in/#website"
      },
      "about": {
        "@id": "https://jayaphotography.in/#business"
      },
      "mainEntity": {
        "@id": "https://jayaphotography.in/#business"
      },
      "inLanguage": "en-IN"
    }
  ]
};
