// All website text lives here. Edit this file to change copy without touching components.

export const site = {
  name: "Grand Ustad",
  legalName: "Grand Ustad Hospitality Group",
  tagline: "Restaurant and Catering Services",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.grandustad.com",
  description:
    "Grand Ustad Hospitality Group — restaurant and catering services in Abu Dhabi, UAE. Mega outdoor events, labour camp catering, facility management, industrial catering and fine dine restaurants.",
  phone: "+971 52 207 7662",
  phoneHref: "+971522077662",
  whatsapp: "971522077662",
  email: "grandustadrestaurant@gmail.com",
  address: "Building number 241, Ground floor ME 11, Musaffa, Abu Dhabi, UAE",
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
    "Our journey has been defined by a relentless pursuit of excellence, transforming Grand Ustad into a renowned and respected brand throughout the UAE. From our beginnings in Catering Services and Fine Dining Restaurants to offering Catering-related Consultancy services, we have continuously evolved to meet the ever-changing needs of our valued patrons.",
    "As we continue to grow and adapt, we have extended our reach into diverse sectors, driven by our passion for innovation and customer satisfaction. Grand Ustad Hospitality Group is proudly headquartered in Abu Dhabi, UAE, serving as a beacon of hospitality excellence in this dynamic and thriving region.",
  ],
  services: [
    {
      slug: "mega-outdoor-events",
      title: "Mega Outdoor Events",
      icon: "tent",
      image: "/images/service-events.svg",
      imageAlt: "Outdoor wedding tent set up by Grand Ustad",
      description:
        "Experience the epitome of outdoor weddings with our comprehensive event services. Our Mega Outdoor Wedding Events package includes luxurious tents that create a captivating atmosphere, state-of-the-art screens for multimedia presentations, and all the facilities you need to host a flawless celebration amidst breathtaking natural settings. Your special day will be etched in the memories of all who attend.",
    },
    {
      slug: "labour-camp-catering",
      title: "Labour Camp Catering",
      icon: "dish",
      image: "/images/service-camp.svg",
      imageAlt: "Labour camp dining hall served by Grand Ustad",
      description:
        "Our commitment to worker welfare shines through our Labour Camp Catering services. Beyond nourishing laborers with balanced and wholesome meals, we offer comprehensive support. For both junior and senior staff, we provide comfortable accommodations, maintain cleanliness through dedicated housekeeping, and ensure convenience with laundry services. We strive to enhance their well-being, recognizing the importance of a holistic approach to their quality of life.",
    },
    {
      slug: "facility-management",
      title: "Facility Management",
      icon: "gear",
      image: "/images/service-facility.svg",
      imageAlt: "Grand Ustad facility management team on site",
      description:
        "Elevate your facility's performance with our Facility Management services. We take pride in optimizing every aspect of your space's operations, from maintenance to security, ensuring a seamless, efficient, and secure environment for your business to thrive.",
    },
    {
      slug: "industrial-catering",
      title: "Industrial Catering",
      icon: "trays",
      image: "/images/service-industrial.svg",
      imageAlt: "Industrial catering kitchen line at Grand Ustad",
      description:
        "Our commitment to Industrial Catering goes far beyond simply providing meals; it's about enhancing productivity and well-being in industrial settings for all levels of your workforce, including senior staff, junior staff, and laborers. We ensure that everyone is fueled with nutritious and delicious meals. Moreover, we understand the importance of a comfortable dining environment equipped with both gas and electrical facilities. This not only boosts physical vitality but also contributes to overall employee satisfaction, reinforcing their dedication to your company's success.",
    },
    {
      slug: "fine-dine-restaurants",
      title: "Fine Dine Restaurants",
      icon: "cloche",
      image: "/images/service-finedine.svg",
      imageAlt: "Plated fine dining dish at a Grand Ustad restaurant",
      description:
        "Step into a world of culinary sophistication at our Fine Dine Restaurants. Each visit is a gastronomic adventure, where masterfully crafted dishes meet an ambiance of elegance. From the first bite to the final sip, indulge in a symphony of flavors that transform dining into an unforgettable experience.",
    },
  ],
  gallery: [
    { src: "/images/gallery-1.svg", alt: "Grand Ustad gallery image 1", span: "large" },
    { src: "/images/gallery-2.svg", alt: "Grand Ustad gallery image 2", span: "small" },
    { src: "/images/gallery-3.svg", alt: "Grand Ustad gallery image 3", span: "small" },
    { src: "/images/gallery-4.svg", alt: "Grand Ustad gallery image 4", span: "wide" },
  ],
  contact: {
    eyebrow: "Contact us",
    title: "Send us a message",
    text: "Tell us about your event, camp or facility and our team will come back to you within one working day.",
  },
  newsletter: {
    title: "Join our family",
    text: "Sign up to get all the latest news, website updates, offers and promos.",
  },
} as const;

export type Service = (typeof site.services)[number];
