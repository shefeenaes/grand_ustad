// All website text lives here. Edit this file to change copy without touching components.

export const site = {
  name: "Grand Ustad",
  legalName: "Grand Ustad Hospitality Group",
  tagline: "Events, Catering and Fine Dining",
  /** "Ustad" means master; the hero plays on the name instead of repeating the logo. */
  hero: {
    eyebrow: "Events · Catering · Fine Dining",
    lead: "Masters of the",
    accent: "feast.",
    subtitle: "Two decades of weddings, galas and grand gatherings across the UAE.",
  },
  /** Footer sign-off; the watermark is "Grand Ustad" in Arabic. */
  footer: {
    lead: "Let's make it a",
    accent: "feast.",
    cta: "Start planning on WhatsApp",
    watermark: "جراند أستاذ",
    hint: "Go on, toss the onion.",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.grandustad.com",
  description:
    "Grand Ustad Hospitality Group — events, catering and fine dining in Abu Dhabi, UAE. Outdoor events, wedding and corporate events, event management and decor, party and meal orders, and a fine dining restaurant.",
  /** The first number is the main line, used where only one fits (e.g. link previews). */
  phones: [
    { display: "+971 52 207 7662", href: "+971522077662" },
    { display: "+971 54 454 5649", href: "+971544545649" },
  ],
  whatsapp: "971522077662",
  email: "grandustadrestaurant@gmail.com",
  address: "Building number 241, Ground floor ME 11, Musaffa, Abu Dhabi, UAE",
  mapsUrl: "https://maps.app.goo.gl/zNRA5BD4CzyyZAVs7",
  addressParts: {
    street: "Building number 241, Ground floor ME 11",
    locality: "Musaffa",
    region: "Abu Dhabi",
    country: "AE",
  },
  nav: [
    { label: "Home", href: "#banner" },
    { label: "About us", href: "#aboutus" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact us", href: "#contactus" },
  ],
  about: [
    "Welcome to Grand Ustad Hospitality Group, where we open our doors to all with a steadfast commitment to delivering unparalleled hospitality services. With two decades of dedication and unwavering determination, we have successfully expanded our presence across the United Arab Emirates.",
    "Our journey has been defined by a relentless pursuit of excellence, transforming Grand Ustad into a renowned and respected brand throughout the UAE. As a sister company of Golden Globe, we have grown from our beginnings in catering and fine dining into a full-service events company, delivering outdoor events, weddings, corporate functions, event management and decor, alongside party and meal orders for every occasion.",
    "As we continue to grow and adapt, we have extended our reach into diverse sectors, driven by our passion for innovation and customer satisfaction. Grand Ustad Hospitality Group is proudly headquartered in Abu Dhabi, UAE, serving as a beacon of hospitality excellence in this dynamic and thriving region.",
  ],
  services: [
    {
      slug: "outdoor-events",
      title: "Outdoor Events",
      icon: "tent",
      image: "/images/service-outdoor-events.jpeg",
      imageAlt: "Outdoor event at dusk with a marquee, stage and lit guest tables set up by Grand Ustad",
      description:
        "Host grand celebrations under the open sky with our Outdoor Events. We provide luxurious tents, stage and lighting, state-of-the-art screens for multimedia presentations, and every facility needed to welcome hundreds or thousands of guests. From festivals and community gatherings to large-scale celebrations, we handle the setup, catering and coordination so your event runs flawlessly from start to finish.",
    },
    {
      slug: "wedding-events",
      title: "Wedding Events",
      icon: "rings",
      image: "/images/service-wedding-events.jpeg",
      imageAlt: "Wedding reception stage with a floral arch and draped fabric by Grand Ustad",
      description:
        "Celebrate your special moments with our bespoke wedding event services, designed to make every occasion truly unforgettable. From intimate pre-wedding functions and traditional ceremonies to grand wedding receptions, we help bring your vision to life with beautiful setups, exceptional catering, and thoughtful attention to every detail. Whether it is a traditional celebration or a contemporary wedding, we create a warm, elegant, and memorable experience for you and your guests.",
    },
    {
      slug: "corporate-events",
      title: "Corporate Events",
      icon: "briefcase",
      image: "/images/visual-catering-setup-corporate-event-with-various-food-stations.jpeg",
      imageAlt: "Buffet food stations set up by Grand Ustad at a corporate event",
      description:
        "Make every corporate gathering a memorable experience with our comprehensive corporate event services. From business meetings and conferences to annual celebrations, product launches, and corporate dinners, we bring every occasion to life with seamless planning, elegant setups, and exceptional catering. Whether you are hosting an intimate business gathering or a large-scale corporate event, we ensure every detail reflects professionalism, quality, and excellence.",
    },
    {
      slug: "event-management-decor",
      title: "Event Management & Decor",
      icon: "gear",
      image: "/images/service-event-decor.jpeg",
      imageAlt: "Long dining table with floral centrepieces and green velvet chairs styled by Grand Ustad",
      description:
        "Leave the planning to us. Our event management team takes care of everything from concept and scheduling to vendors, staffing and on-the-day coordination. Paired with our in-house decor service, including stage design, floral arrangements, lighting and themed table settings, we transform any venue into a space that reflects your style and the spirit of your occasion.",
    },
    {
      slug: "party-meal-orders",
      title: "Party & Meal Orders",
      icon: "trays",
      image: "/images/service-party-orders.jpeg",
      imageAlt: "Catering trays of biryani, curries and kebabs packed for delivery by Grand Ustad",
      description:
        "Freshly prepared food, delivered when and where you need it. We take corporate party orders, office lunches, family get-togethers and bulk meal orders of any size, with menus tailored to your guests and your budget. Every order is cooked in our own kitchen with the same care as our restaurant, and delivered hot and on time.",
    },
    {
      slug: "fine-dining-restaurant",
      title: "Fine Dining Restaurant",
      icon: "cloche",
      image: "/images/restaurant-interior.jpeg",
      imageAlt: "The Grand Ustad dining room with leather chairs, marble tables and warm wall lighting",
      description:
        "Step into a world of culinary sophistication at our Fine Dining Restaurant. Each visit is a gastronomic adventure, where masterfully crafted dishes meet an ambiance of elegance. From the first bite to the final sip, indulge in a symphony of flavors that transform dining into an unforgettable experience.",
    },
  ],
  /** Listed in mosaic order. `size` sets the tile: feature is 2×2, tall is 1×2, wide is 2×1. `focus` keeps the food in frame when a tile crops. */
  gallery: [
    { src: "/images/restaurant-interior.jpeg", size: "feature", alt: "The Grand Ustad dining room set for service" },
    { src: "/images/gallery-chicken-lollipop.jpeg", size: "tall", alt: "Glazed chicken lollipops on spring onion curls, scattered with sesame" },
    { src: "/images/gallery-crispy-burger.jpeg", size: "tall", alt: "Double-stacked crispy chicken burger with lettuce, cheese and spicy mayo" },
    { src: "/images/gallery-caesar-salad.jpeg", size: "tall", alt: "Chicken Caesar salad with shaved parmesan" },
    { src: "/images/gallery-spread.jpeg", size: "tall", alt: "A full Grand Ustad spread of mixed grills, burger, sizzler, noodles, salads and a jug of blue lemonade" },
    { src: "/images/visual-catering-setup-corporate-event-with-various-food-stations.jpeg", size: "wide", alt: "Buffet food stations at a corporate event catered by Grand Ustad" },
    { src: "/images/indian-cuisine-food-table-restaurant.jpeg", size: "wide", alt: "A table of curries, biryani and breads at the Grand Ustad restaurant" },
    { src: "/images/gallery-rice-platter.jpeg", size: "tall", alt: "Red-masala meat over long-grain rice with a green chilli" },
    { src: "/images/gallery-shake.jpeg", size: "tall", alt: "A tall glass of creamy shake drizzled with honey" },
    { src: "/images/gallery-biryani.jpeg", size: "feature", focus: "center 62%", alt: "Biryani with pappadam, pickle, onion salad and raita" },
  ],
  contact: {
    eyebrow: "Contact us",
    title: "Send us a message",
    text: "Tell us about your event, wedding or order and our team will come back to you within one working day.",
  },
} as const;

export type Service = (typeof site.services)[number];

/** Keeps place names like "Abu Dhabi" from splitting across lines. */
export const keepTogether = (text: string) => text.replace(/Abu Dhabi/g, "Abu\u00A0Dhabi");
