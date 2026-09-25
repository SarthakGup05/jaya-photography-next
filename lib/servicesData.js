// lib/servicesData.js

// 🌟 Photography Services Dataset with Real Backend Cloudinary Imagery & Mappings
export const FALLBACK_SERVICES = [
  {
    _id: "service-newborn",
    id: 2,
    slug: "newborn-photography-lucknow",
    aliases: ["newborn-photography", "newborn-milestone", "baby-milestone-photoshoot-lucknow"],
    name: "Newborn Photography",
    title: "Newborn Photography in Lucknow",
    metaTitle: "Newborn Photography in Lucknow | Jaya Photography",
    metaDescription: "Premier safety-first newborn photography studio in Lucknow. 10+ years experience, sanitized props & private lounge.",
    metaKeywords: ["newborn photography lucknow", "baby milestone photoshoot lucknow", "baby photographer lucknow"],
    category: "Newborn",
    packageCategory: "newborn",
    idealTiming: "Best scheduled between 5–25 days after birth for sleepy, curled poses",
    startingPrice: "₹18,000",
    subtitle: "Safety-first luxury newborn portraits in Lucknow.",
    description: "Welcoming a baby into the world is a momentous occasion filled with tender, fleeting moments. Our studio in Lucknow is specifically designed for delicate newborns and growing babies. We maintain strict hygiene, temperature-controlled warmth (26°C-28°C), and soft sanitized props so your little one remains relaxed throughout the session.",
    duration: "2–4 Hours",
    featured: true,
    coverImage: "https://res.cloudinary.com/ddbqkfmrf/image/upload/v1755716070/services/service-1755716067933-0vj7p4ckxyw.jpg",
    mainImage: "https://res.cloudinary.com/ddbqkfmrf/image/upload/v1755716362/services/service-1755716357374-ln08kck5woh.jpg",
    features: [
      "100% Baby-safe, sanitized organic wraps, bonnets & props provided",
      "Heated & temperature-controlled studio environment (26°C - 28°C)",
      "Private mother & baby feeding, nursing and lounge space",
      "Solo baby poses, macro detail shots (fingers & toes), and parent bonding portraits",
      "High-resolution art-edited digital portraits with print release",
      "All original RAW photographs delivered on high-speed cloud drive",
    ],
    amenities: [
      { title: "Heated Studio (26°C–28°C)", desc: "Warm soothing climate calibrated for unclothed and wrapped newborn comfort." },
      { title: "Sanitized Props & Wraps", desc: "Every organic wrap, basket, and fabric is UV-sanitized and washed with baby-safe detergent." },
      { title: "Private Feeding Lounge", desc: "Dedicated quiet nursing corner equipped with hot water, feeding pillows, and baby essentials." },
      { title: "Certified Baby Handling", desc: "Over 10 years of gentle, anatomical newborn soothing and posing expertise." },
    ],
    faqs: [
      {
        question: "When is the best time to photograph my newborn baby?",
        answer: "The ideal window for sleepy, curled-up newborn poses is between 5 to 25 days after birth. During this window, babies naturally sleep deeply and retain their womb flexibility.",
      },
      {
        question: "Do I need to bring clothes or props for the photoshoot?",
        answer: "No! Our Lucknow studio is fully stocked with handcrafted wooden beds, antique bowls, imported organic wraps, headbands, and theme props. You only need to bring baby's diapers, extra milk, and pacifier.",
      },
      {
        question: "Can parents and older siblings join the photo session?",
        answer: "Absolutely yes! Parent and sibling bonding portraits are among the most cherished keepsakes. We provide styling guidance so the family wardrobe coordinates gracefully.",
      },
    ],
  },
  {
    _id: "service-maternity",
    id: 1,
    slug: "maternity-photoshoot-lucknow",
    aliases: ["maternity-photography-lucknow", "maternity-photography"],
    name: "Maternity Photoshoot",
    title: "Maternity Photoshoot in Lucknow",
    metaTitle: "Maternity Photoshoot in Lucknow | Luxury Pregnancy Photography",
    metaDescription: "Celebrate your pregnancy glow with fine-art maternity photoshoots in Lucknow. Designer gowns, partner styling, and studio or outdoor locations.",
    metaKeywords: ["maternity photoshoot lucknow", "maternity photographer lucknow", "pregnancy shoot lucknow", "flying gown maternity shoot"],
    category: "Maternity",
    packageCategory: "maternity",
    idealTiming: "Best scheduled between 28–34 weeks when bump shape is round and energy is high",
    startingPrice: "₹18,000",
    subtitle: "Celebrate your maternity journey with artistic fine-art portraits and designer gown styling.",
    description: "Maternity photography honors the beauty, strength, and anticipation of expecting mothers. We offer an extensive collection of designer flying gowns, lace robes, and elegant silhouettes in our luxury studio or scenic outdoor locations across Lucknow.",
    duration: "1.5–2 Hours",
    featured: true,
    coverImage: "https://res.cloudinary.com/ddbqkfmrf/image/upload/v1755715272/services/service-1755715269789-00q24wovpiiq.jpg",
    mainImage: "https://res.cloudinary.com/ddbqkfmrf/image/upload/v1755715274/services/service-1755715271998-0g1wxsjwqlgq.jpg",
    features: [
      "Access to luxury designer maternity gowns, flying fabrics & accessories",
      "Professional hair & makeup assistance available on request",
      "Partner and sibling participation included at no extra cost",
      "Choice of indoor fine-art studio or scenic outdoor sunset garden concepts",
      "Retouched high-definition digital gallery with editorial skin smoothing",
      "All original RAW high-resolution photographs delivered",
    ],
    amenities: [
      { title: "Designer Wardrobe Closet", desc: "Over 20+ imported maternity flying gowns, bodycon lace robes, and tiaras included." },
      { title: "Comfort-First Studio Pacing", desc: "Frequent rest intervals, comfortable seating, and relaxed posing tailored for pregnant mothers." },
      { title: "Partner & Family Inclusion", desc: "Spouse and elder sibling portraits captured naturally at zero supplementary fee." },
      { title: "Private Dressing Suite", desc: "Full-length mirrors, climate control, and privacy for seamless outfit changes." },
    ],
    faqs: [
      {
        question: "What is the best week for a maternity photoshoot?",
        answer: "The best time is between week 28 and week 34 of pregnancy. During this time, your baby bump is prominently round and beautiful, while you still feel comfortable moving and posing.",
      },
      {
        question: "Do you provide maternity gowns and dresses?",
        answer: "Yes! We have a curated studio wardrobe of designer maternity gowns (including dramatic flying gowns, lace robes, and elegant fabrics) in various colors and sizes available for complimentary use.",
      },
    ],
  },
  {
    _id: "service-baby",
    id: 11,
    slug: "baby-photography-lucknow",
    aliases: ["baby-milestone-photoshoot-lucknow", "baby-photography"],
    name: "Baby Photography",
    title: "Baby Photography in Lucknow",
    metaTitle: "Baby Photography in Lucknow | Jaya Photography",
    metaDescription: "Capture sitting milestones, innocent giggles, and growing baby stages in our Lucknow studio.",
    metaKeywords: ["baby photography lucknow", "sitter session lucknow"],
    category: "Baby Milestone",
    packageCategory: "baby",
    idealTiming: "Best scheduled between 6–12 months (sitting up and crawling stages)",
    startingPrice: "₹15,000",
    subtitle: "Cherish the playful giggles, first teeth, and milestone smiles with customized setups.",
    description: "Baby milestone sessions capture the golden moments when your baby begins sitting unassisted, smiling at the mirror, and crawling. We use handcrafted wooden props, soft organic backdrops, and gentle lighting.",
    duration: "90–120 Minutes (1.5–2 Hours)",
    featured: true,
    coverImage: "https://res.cloudinary.com/ddbqkfmrf/image/upload/v1755961350/services/service-1755961347684-0v52oeey35o.jpg",
    mainImage: "https://res.cloudinary.com/ddbqkfmrf/image/upload/v1755961352/services/service-1755961350022-l4owicvvbc.jpg",
    features: [
      "Age-appropriate milestone setups (sitter, crawler, stander)",
      "Sanitized themed wooden bowls, mini bathtubs, and soft blankets",
      "Parent and sibling interaction portraits included",
      "High-resolution art-edited digital gallery & all original RAW photos",
    ],
    amenities: [
      { title: "Baby-Safe Studio", desc: "Cleaned and sanitized before every shoot; temperature-controlled environment." },
      { title: "Relaxed Timing", desc: "Plenty of room for snack breaks, naps, and cuddles." },
    ],
    faqs: [
      {
        question: "What is the best age for a baby milestone shoot?",
        answer: "Between 6 and 9 months when baby can sit confidently without falling is one of the most delightful stages with lots of expressive smiles!",
      },
    ],
  },
  {
    _id: "service-toddler",
    id: 12,
    slug: "toddler-photoshoot-lucknow",
    aliases: ["toddler-beyond-photoshoot-lucknow"],
    name: "Toddler Photoshoot",
    title: "Toddler Photoshoot in Lucknow",
    metaTitle: "Toddler Photoshoot in Lucknow | Kids Photographer",
    metaDescription: "Professional toddler photoshoot in Lucknow capturing childhood milestones, natural expressions, and precious memories.",
    metaKeywords: ["toddler photoshoot lucknow", "kids photographer lucknow"],
    category: "Toddler & Kids",
    packageCategory: "baby",
    idealTiming: "Best scheduled around 1st, 2nd, or 3rd birthday celebrations",
    startingPrice: "₹15,000",
    subtitle: "Capturing beautiful childhood milestones, natural expressions & precious memories.",
    description: "Celebrate your child's beautiful journey with a professional toddler photoshoot in Lucknow by Jaya Photography. We let toddlers play and be themselves in our interactive studio sets.",
    duration: "90–120 Minutes (1.5–2 Hours)",
    featured: true,
    coverImage: "https://res.cloudinary.com/ddbqkfmrf/image/upload/v1755961839/services/service-1755961836706-x1x2xs9ldxc.jpg",
    mainImage: "https://res.cloudinary.com/ddbqkfmrf/image/upload/v1755961841/services/service-1755961839014-tqy8kqmwl4.jpg",
    features: [
      "Creative toddler photoshoot themes & interactive setups",
      "Patient photographer trained in handling energetic toddlers",
      "Multiple outfit changes and custom backdrops",
      "High-resolution edited digital portraits and all original RAW photos",
    ],
    amenities: [
      { title: "Safe Play Equipment", desc: "Non-toxic rounded toys, wooden vehicles, and soft mats." },
    ],
    faqs: [
      {
        question: "How do you handle shy or energetic toddlers?",
        answer: "We never force poses. We turn the entire shoot into play with bubbles, songs, and games so smiles are authentic.",
      },
    ],
  },
  {
    _id: "service-cake-smash",
    id: 15,
    slug: "cake-smash-photography-lucknow",
    aliases: ["cake-smash-photoshoot"],
    name: "Cake Smash Photography",
    title: "Cake Smash Photography in Lucknow",
    metaTitle: "Cake Smash Photography in Lucknow | 1st Birthday Photoshoot",
    metaDescription: "Celebrate baby's 1st birthday with a fun, messy cake smash photoshoot in Lucknow. Custom themes, balloon garlands & bubble bath.",
    metaKeywords: ["cake smash photoshoot lucknow", "1st birthday photoshoot lucknow"],
    category: "Cake Smash",
    packageCategory: "baby",
    idealTiming: "Scheduled around 11 to 12 months for 1st birthday invitations & celebrations",
    startingPrice: "₹15,000",
    subtitle: "Celebrate your baby's 1st birthday with joyful cake smash memories and playful splashes.",
    description: "A cake smash photoshoot is the quintessential 1st birthday celebration! We create custom theme setups with balloon garlands, bunting, and baby-safe decor, followed by a splash bathtub session.",
    duration: "1.5–2 Hours",
    featured: true,
    coverImage: "https://res.cloudinary.com/ddbqkfmrf/image/upload/v1788988998/services/service-cake_smash_photography_lucknow-1788988997238.jpg",
    mainImage: "https://res.cloudinary.com/ddbqkfmrf/image/upload/v1788988998/services/service-cake_smash_photography_lucknow-1788988997238.jpg",
    features: [
      "Custom theme decor & color-coordinated balloon garland setup",
      "Pre-smash formal portrait session with family",
      "The fun smash & messy eating celebration",
      "Warm bubble bath splash session cleanup",
      "All RAW unedited photos + artistically retouched favorites",
    ],
    amenities: [
      { title: "Warm Water Cleanup", desc: "Warm towels and clean warm water bath tub ready immediately after the cake fun." },
    ],
    faqs: [
      {
        question: "Do you provide the birthday cake?",
        answer: "To ensure safety against infant food allergies, parents usually bring their preferred bakery cake. We provide all the background decor, bunting, and cake stand!",
      },
    ],
  },
  {
    _id: "service-family",
    id: 5,
    slug: "family-photoshoot-lucknow",
    aliases: ["family-photoshoot", "family-portrait"],
    name: "Family Photoshoot",
    title: "Family Photoshoot in Lucknow",
    metaTitle: "Family Photoshoot in Lucknow | Luxury Family Portraits",
    metaDescription: "Create everlasting family heirlooms with professional family portrait sessions in Lucknow. Warm poses, natural interactions, and multigenerational shoots.",
    metaKeywords: ["family photoshoot lucknow", "family portraits lucknow", "family photographer lucknow"],
    category: "Family",
    packageCategory: "all",
    idealTiming: "Year-round availability; ideal for anniversaries, birthdays, and multi-generation reunions",
    startingPrice: "₹16,000",
    subtitle: "Warm, candid, and elegant family portraits capturing genuine togetherness.",
    description: "Family portraits preserve the unique bond, laughter, and generations of love in your family. Whether celebrating a family milestone or creating annual heirlooms, we guide you through relaxed posing that brings out authentic smiles.",
    duration: "90–120 Minutes",
    featured: true,
    coverImage: "https://res.cloudinary.com/ddbqkfmrf/image/upload/v1756751623/services/service-1756751621197-x1ivuz0ok8.jpg",
    mainImage: "https://res.cloudinary.com/ddbqkfmrf/image/upload/v1756751623/services/service-1756751621197-x1ivuz0ok8.jpg",
    features: [
      "Multigenerational family portrait setups (grandparents, parents & kids)",
      "Wardrobe coordination & color scheme consultation prior to shoot",
      "Candid laughter & natural emotion capture with expert posing prompts",
      "High-resolution edited digital portraits ready for luxury framing",
      "All original unedited RAW photos included",
    ],
    amenities: [
      { title: "Spacious Studio Setup", desc: "Comfortably accommodates multi-member family groupings with expansive backdrops." },
      { title: "Senior Citizen Friendly", desc: "Ground-floor accessible studio with plush seating arrangements for elderly family members." },
    ],
    faqs: [
      {
        question: "How many family members can participate?",
        answer: "Our studio accommodates nuclear and extended families of 4 to 8 members. We also provide custom setups for larger multigenerational family reunions.",
      },
    ],
  },
  {
    _id: "service-fashion",
    id: 3,
    slug: "fashion-photographer-lucknow",
    aliases: ["professional-fashion-photography", "fashion-photography"],
    name: "Professional Fashion Photographer",
    title: "Fashion Photographer in Lucknow",
    metaTitle: "Fashion & Portrait Photography in Lucknow | Jaya Photography",
    metaDescription: "Professional fashion, portfolio, and creative portrait photography in Lucknow. Studio lighting, high-fashion styling, and model portfolios.",
    metaKeywords: ["fashion photographer lucknow", "model portfolio lucknow", "portrait photography lucknow"],
    category: "Fashion & Portrait",
    packageCategory: "all",
    idealTiming: "Booked year-round for model portfolios, corporate branding, and personal milestones",
    startingPrice: "₹20,000",
    subtitle: "High-end fashion portraiture, creative concepts, and model portfolios in Lucknow.",
    description: "Elevate your professional portfolio or personal brand with high-fashion portrait photography. Featuring professional studio lighting, editorial posing guidance, and high-end retouching.",
    duration: "2–4 Hours",
    featured: false,
    coverImage: "https://res.cloudinary.com/ddbqkfmrf/image/upload/v1755717145/services/service-1755717141905-qw7wh69702p.jpg",
    mainImage: "https://res.cloudinary.com/ddbqkfmrf/image/upload/v1755717147/services/service-1755717144358-mr4mdj2y5lh.jpg",
    features: [
      "Editorial lighting modifiers (softboxes, octas, beauty dishes, rim lights)",
      "Hands-on professional posing direction for models and beginners alike",
      "Multiple outfit changes & diverse backdrop options (white, charcoal, warm beige)",
      "Magazine-quality high-end skin and color retouching",
    ],
    amenities: [
      { title: "Vanity Makeup Station", desc: "Illuminated Hollywood vanity mirrors for makeup artists and styling touches." },
    ],
    faqs: [
      {
        question: "I am not a professional model. Will you guide my poses?",
        answer: "Yes! Most of our portrait clients have never posed professionally before. We guide every angle, tilt of the head, and expression step-by-step.",
      },
    ],
  },
  {
    _id: "service-theme",
    id: 4,
    slug: "theme-photoshoot-lucknow",
    aliases: ["theme-photoshoot-lucknow-", "concept-photography"],
    name: "Theme Photoshoot",
    title: "Creative Theme Photoshoot in Lucknow",
    metaTitle: "Themed Concept Photoshoot in Lucknow | Jaya Photography",
    metaDescription: "Custom themed concept photoshoots in Lucknow for birthdays, festivals, and creative concepts.",
    metaKeywords: ["theme photoshoot lucknow", "concept photography lucknow"],
    category: "Themed Shoot",
    packageCategory: "baby",
    idealTiming: "Custom scheduled for birthdays, festivals (Diwali, Christmas, Janmashtami) or creative themes",
    startingPrice: "₹18,000",
    subtitle: "Custom themed concepts and magical set designs brought to life.",
    description: "Turn your creative vision into reality with our bespoke themed photoshoots. From fairytale setups to traditional festive themes, we design custom sets tailored to your celebration.",
    duration: "2–3 Hours",
    featured: false,
    coverImage: "https://res.cloudinary.com/ddbqkfmrf/image/upload/v1755766514/services/service-1755766512285-mthcvhaoifg.jpg",
    mainImage: "https://res.cloudinary.com/ddbqkfmrf/image/upload/v1755766611/services/service-1755766610311-w09wwoc7sma.jpg",
    features: [
      "Bespoke set design & custom prop arrangement tailored to your vision",
      "Themed costume assistance & styling accessories",
      "Creative artistic color grading & magazine-grade retouching",
      "Full digital gallery release including all original RAW photos",
    ],
    amenities: [
      { title: "Bespoke Prop Design", desc: "Custom themes handcrafted in-house matching your exact milestone vision." },
    ],
    faqs: [
      {
        question: "Can we request a custom theme that isn't on your website?",
        answer: "Yes! We love creating custom themes. Share your inspiration or Pinterest board with us at least 1–2 weeks before the shoot.",
      },
    ],
  },
];

// Universal Process Steps for Photoshoot Experience
export const SERVICE_PROCESS_STEPS = [
  {
    step: "01",
    title: "Personalized Consultation",
    desc: "We discuss your vision, preferred color schemes, themes, and wardrobe styling to personalize every detail.",
  },
  {
    step: "02",
    title: "The Session Experience",
    desc: "A relaxed, comfort-first shoot in our sanitized Lucknow studio or scenic outdoor location with patient guidance.",
  },
  {
    step: "03",
    title: "Private Online Proofing",
    desc: "Access your full high-resolution digital gallery within 48–72 hours to comfortably handpick your favorite shots.",
  },
  {
    step: "04",
    title: "Master Retouching & Delivery",
    desc: "Our artists masterfully hand-retouch your selected portraits with natural skin tones and deliver heirloom-grade files.",
  },
];

// Helper to filter matching gallery images from backend API
export function filterGalleryImagesForService(service, allGalleryImages = []) {
  if (!allGalleryImages || !Array.isArray(allGalleryImages) || allGalleryImages.length === 0) {
    return [];
  }
  const slug = (service?.slug || "").toLowerCase();
  const serviceId = service?.id || service?._id;

  return allGalleryImages.filter((img) => {
    if (img.serviceId && serviceId && String(img.serviceId) === String(serviceId)) {
      return true;
    }
    const cat = (img.category || "").toLowerCase().trim();
    const title = (img.title || "").toLowerCase().trim();

    if (slug.includes("maternity") && cat.includes("maternity")) return true;
    if (slug.includes("family") && cat.includes("family")) return true;
    if (slug.includes("fashion") && (cat.includes("fashion") || title.includes("fashion"))) return true;
    if (slug.includes("theme") && (cat.includes("theme") || title.includes("theme"))) return true;
    if (
      (slug.includes("baby") || slug.includes("toddler") || slug.includes("cake") || slug.includes("newborn")) &&
      (cat.includes("half to one") || cat.includes("baby") || title.includes("baby") || title.includes("cake") || title.includes("toddler"))
    ) {
      return true;
    }
    return false;
  });
}

// Helper to find service by slug or alias
export function getFallbackServiceBySlug(slug) {
  if (!slug) return null;
  const normalizedSlug = slug.toLowerCase().trim();
  return (
    FALLBACK_SERVICES.find(
      (s) =>
        s.slug.toLowerCase() === normalizedSlug ||
        (Array.isArray(s.aliases) && s.aliases.some((a) => a.toLowerCase() === normalizedSlug))
    ) || null
  );
}

// Helper to enrich raw backend service with exactly 2 to 3 fixed photos from service data
export function enrichServiceData(service) {
  if (!service) return null;
  const fallback = getFallbackServiceBySlug(service.slug || service.id) || FALLBACK_SERVICES[0];

  const galleryList = [];

  // 1. Primary showcase: Service mainImage from API
  if (service.mainImage) {
    galleryList.push({
      url: service.mainImage,
      title: `${service.title || service.name} - Studio Signature`,
      tag: "Signature Pose",
    });
  }

  // 2. Cover image from API if distinct
  if (service.coverImage && service.coverImage !== service.mainImage) {
    galleryList.push({
      url: service.coverImage,
      title: `${service.title || service.name} - Studio Setup`,
      tag: "Studio Setup",
    });
  }

  // 3. Fallback complementary fixed photo if fewer than 2 images
  if (galleryList.length < 2 && fallback.coverImage && fallback.coverImage !== service.mainImage) {
    galleryList.push({
      url: fallback.coverImage,
      title: `${service.title || fallback.title} - Fine-Art Frame`,
      tag: "Fine-Art",
    });
  }

  // Strictly cap at 2-3 fixed photos
  const finalGallery = galleryList.slice(0, 3);

  const amenities = Array.isArray(service.amenities) && service.amenities.length > 0
    ? service.amenities
    : fallback.amenities || [];

  const faqs = Array.isArray(service.faqs) && service.faqs.length > 0
    ? service.faqs
    : fallback.faqs || [];

  const category = service.category || service.name || fallback.category || "Fine-Art Photography";
  const packageCategory = service.packageCategory || fallback.packageCategory || "all";
  const startingPrice = service.startingPrice || fallback.startingPrice || "₹15,000";
  const idealTiming = service.idealTiming || fallback.idealTiming || "Book 2–3 weeks in advance";

  return {
    ...fallback,
    ...service,
    category,
    gallery: finalGallery,
    amenities,
    faqs,
    packageCategory,
    startingPrice,
    idealTiming,
    features: (service.features && service.features.length > 0) ? service.features : fallback.features,
    coverImage: service.coverImage || fallback.coverImage,
    mainImage: service.mainImage || fallback.mainImage,
  };
}
