const px = (id: number, w = 1200, h = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const site = {
  name: "Maison Royale",
  tagline: "Hotel & Restaurant",
  phone: "+1 (212) 555-0188",
  email: "reservations@maisonroyale.example",
  address: "12 Crown Avenue, Mayfair District, New York, NY 10021",
  receptionHours: "Front desk & concierge — 24 hours, every day",
  restaurantHours: [
    { label: "Breakfast", value: "Daily · 7:00 — 10:30" },
    { label: "Lunch", value: "Daily · 12:30 — 15:00" },
    { label: "Dinner", value: "Tue — Sun · 18:30 — 23:00" },
  ],
  parking: "Complimentary valet parking at the Crown Avenue entrance. Self-parking garage on Albemarle Lane, 2 minutes on foot.",
  socials: [
    { name: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { name: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { name: "X", href: "https://x.com", icon: "x" },
  ],
};

export type Room = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  pricePerNight: number;
  size: string;
  maxGuests: number;
  bed: string;
  inventory: number;
  amenities: string[];
  image: string;
  imageWide: string;
  gallery: string[];
};

export const rooms: Room[] = [
  {
    slug: "deluxe-room",
    name: "Deluxe Room",
    tagline: "Refined comfort with garden views",
    description:
      "A serene retreat layered in ivory linen and warm oak, overlooking the private courtyard gardens.",
    longDescription:
      "The Deluxe Room is a study in quiet luxury. Floor-to-ceiling windows frame the courtyard gardens, while a custom king-size bed dressed in 400-thread-count Egyptian cotton invites deep rest. A marble bathroom with rainfall shower, heated floors and Maison Royale amenities completes the experience.",
    pricePerNight: 420,
    size: "42 m² / 452 ft²",
    maxGuests: 2,
    bed: "King-size bed",
    inventory: 10,
    amenities: [
      "High-speed Wi-Fi",
      "King-size bed",
      "Garden view",
      "24h room service",
      "Marble rain shower",
      "Nespresso bar",
    ],
    image: px(2725675, 1200, 900),
    imageWide: px(2725675, 1600, 900),
    gallery: [px(2725675, 1200, 800), px(3688261, 1200, 800), px(7722153, 1200, 800)],
  },
  {
    slug: "executive-suite",
    name: "Executive Suite",
    tagline: "A residence above the city",
    description:
      "Separate living salon, sweeping city views and a deep soaking tub — designed for longer, slower stays.",
    longDescription:
      "Occupying a coveted corner of the hotel, the Executive Suite pairs a generous bedroom with a private living salon and writing desk. Watch the city glow from the picture windows, unwind in the freestanding soaking tub, and let your dedicated butler handle the rest.",
    pricePerNight: 780,
    size: "68 m² / 732 ft²",
    maxGuests: 3,
    bed: "King-size bed + day bed",
    inventory: 6,
    amenities: [
      "High-speed Wi-Fi",
      "Panoramic city view",
      "Separate living salon",
      "Soaking tub",
      "Butler service",
      "Evening turndown",
    ],
    image: px(8082217, 1200, 900),
    imageWide: px(8082217, 1600, 900),
    gallery: [px(8082217, 1200, 800), px(6394550, 1200, 800), px(6466496, 1200, 800)],
  },
  {
    slug: "royal-presidential-suite",
    name: "Royal Presidential Suite",
    tagline: "The crown of Maison Royale",
    description:
      "Our most storied address — a full-floor suite with private dining room, grand salon and terrace.",
    longDescription:
      "Reserved for those who expect the exceptional, the Royal Presidential Suite spans the entire ninth floor. A grand salon with fireplace, a private dining room for eight served by our Michelin-trained brigade, a master bedroom wrapped in silk, and a wraparound terrace above the skyline.",
    pricePerNight: 2400,
    size: "180 m² / 1,937 ft²",
    maxGuests: 4,
    bed: "Emperor bed + guest room",
    inventory: 1,
    amenities: [
      "Full-floor privacy",
      "Private dining room",
      "Wraparound terrace",
      "Personal butler & chef",
      "Chauffeured arrival",
      "Private spa suite access",
    ],
    image: px(8134775, 1200, 900),
    imageWide: px(8134775, 1600, 900),
    gallery: [px(8134775, 1200, 800), px(8082217, 1200, 800), px(2725675, 1200, 800)],
  },
];

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  veg: boolean;
  signature?: boolean;
};

export type MenuCategory = {
  id: string;
  label: string;
  cuisine: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "indian",
    label: "Indian",
    cuisine: "Royal spice heritage",
    items: [
      { name: "Lobster Moilee", description: "Butter-poached lobster, coconut & curry-leaf velouté, lemon rice crisp", price: 58, veg: false, signature: true },
      { name: "Dum Pukht Biryani", description: "Aged basmati, saffron, slow-sealed lamb shank, burnt-onion raita", price: 46, veg: false },
      { name: "Paneer Khurchan Tart", description: "Charred cottage cheese, pepper confit, fenugreek glaze", price: 32, veg: true },
      { name: "Dal Maison Royale", description: "48-hour black lentils, smoked tomato, hand-churned butter", price: 26, veg: true, signature: true },
    ],
  },
  {
    id: "continental",
    label: "Continental",
    cuisine: "Classic European technique",
    items: [
      { name: "Dover Sole Meunière", description: "Brown butter, caper blossom, charred lemon, pommes mousseline", price: 64, veg: false, signature: true },
      { name: "Châteaubriand for Two", description: "Dry-aged tenderloin, périgourdine sauce, confit shallot", price: 120, veg: false },
      { name: "Wild Mushroom Vol-au-Vent", description: "Puff pastry, morels, aged comté, black truffle cream", price: 38, veg: true },
      { name: "Burrata & Heritage Tomato", description: "Basil oil, aged balsamic pearls, sourdough tuile", price: 28, veg: true },
    ],
  },
  {
    id: "asian",
    label: "Asian",
    cuisine: "Delicate umami craft",
    items: [
      { name: "Black Cod Miso", description: "72-hour marination, yuzu kosho, pickled baby turnip", price: 56, veg: false, signature: true },
      { name: "Peking Duck Two Ways", description: "Lacquered breast, crisp pancake, plum lacquer, cucumber blossom", price: 68, veg: false },
      { name: "Edamame Truffle Gyoza", description: "Hand-folded dumplings, white truffle ponzu, chive oil", price: 30, veg: true },
      { name: "Silken Tofu & Sesame", description: "Chilled tofu, golden sesame emulsion, crispy lotus root", price: 24, veg: true },
    ],
  },
  {
    id: "fusion",
    label: "Fusion",
    cuisine: "The chef's imagination",
    items: [
      { name: "Tandoori Octopus Carpaccio", description: "Charred octopus, makhani emulsion, puffed wild rice", price: 48, veg: false, signature: true },
      { name: "Wagyu Rendang Wellington", description: "A5 wagyu, rendang duxelles, laminated pastry, jus noir", price: 95, veg: false },
      { name: "Saffron Risotto Kofta", description: "Carnaroli rice, paneer kofta heart, parmesan air", price: 36, veg: true },
      { name: "Matcha & Rose Mille-Feuille", description: "Rose petal cream, pistachio praline, gold leaf", price: 22, veg: true, signature: true },
    ],
  },
];

export const signatureDishes = [
  {
    name: "Lobster Moilee",
    note: "Kerala coastline, reimagined",
    image: px(37068830, 900, 1100),
  },
  {
    name: "Garden of the Maison",
    note: "A living salad of 22 elements",
    image: px(16474891, 900, 1100),
  },
  {
    name: "Matcha & Rose Mille-Feuille",
    note: "Our most photographed dessert",
    image: px(34520947, 900, 1100),
  },
];

export type Experience = {
  title: string;
  description: string;
  image: string;
};

export const experiences: Experience[] = [
  {
    title: "Rooftop Dining",
    description: "Dine above the skyline at Ciel, our rooftop terrace — seven courses under the open sky.",
    image: px(36353801, 1000, 1200),
  },
  {
    title: "Private Candlelight Dinner",
    description: "An intimate table for two, a dedicated sommelier, and a menu written only for you.",
    image: px(15945600, 1000, 1200),
  },
  {
    title: "Weddings & Celebrations",
    description: "From grand ballroom weddings to golden anniversaries — crafted by our events atelier.",
    image: px(29040997, 1000, 1200),
  },
  {
    title: "Spa & Wellness",
    description: "A sanctuary of warm stone and stillness. Signature rituals, hammam, and a heated lap pool.",
    image: px(9146378, 1000, 1200),
  },
  {
    title: "Meetings & Conferences",
    description: "Boardrooms with natural light, discreet service, and seamless technology for up to 200 guests.",
    image: px(5869295, 1000, 1200),
  },
  {
    title: "Weekend Getaways",
    description: "Late check-outs, breakfast in bed, and curated city itineraries for two unhurried days.",
    image: px(3011575, 1000, 1200),
  },
];

export type Offer = {
  title: string;
  description: string;
  detail: string;
  terms: string;
  image: string;
};

export const offers: Offer[] = [
  {
    title: "Romantic Escape",
    description: "One night in an Executive Suite, candlelight dinner for two, champagne on arrival and rose-petal turndown.",
    detail: "Sample rate from $980 per night*",
    terms: "*Sample promotional rate for illustration — subject to availability and confirmation by our reservations team.",
    image: px(24433378, 1100, 800),
  },
  {
    title: "The Chef's Table",
    description: "A ten-course tasting menu served inside the kitchen, with wine pairings chosen by our head sommelier.",
    detail: "Sample price $295 per guest*",
    terms: "*Sample price shown for illustration — final pricing confirmed at reservation.",
    image: px(19409040, 1100, 800),
  },
  {
    title: "Suite Seasons",
    description: "Stay three nights in any suite and enjoy the fourth with our compliments, plus daily breakfast at Le Jardin.",
    detail: "Seasonal offer — sample saving of 25%*",
    terms: "*Sample seasonal offer — blackout dates apply; confirmed on booking.",
    image: px(8082217, 1100, 800),
  },
  {
    title: "Family Rendezvous",
    description: "Connecting rooms, children's amenities, patisserie masterclass and a private city tour for the family.",
    detail: "Sample rate from $650 per night*",
    terms: "*Sample package rate for illustration — final inclusions confirmed by concierge.",
    image: px(2771935, 1100, 800),
  },
  {
    title: "Celebration & Anniversary",
    description: "A private dining salon, bespoke cake by our pâtissier, floral styling and a keepsake photography session.",
    detail: "Bespoke pricing on request",
    terms: "Each celebration is individually quoted by our events atelier.",
    image: px(16120267, 1100, 800),
  },
];

export const testimonials = [
  {
    name: "Alexandra M.",
    location: "London, United Kingdom",
    rating: 5,
    text: "From the moment the car door opened, every detail felt considered. The Executive Suite was flawless and dinner at the restaurant was the finest meal of our trip.",
    source: "Sample review — illustrative content",
  },
  {
    name: "Rajiv & Meera K.",
    location: "Mumbai, India",
    rating: 5,
    text: "We celebrated our anniversary with the private candlelight dinner. The team remembered details we had mentioned weeks earlier. Truly remarkable hospitality.",
    source: "Sample review — illustrative content",
  },
  {
    name: "Daniel R.",
    location: "New York, USA",
    rating: 5,
    text: "I travel 40 weeks a year and Maison Royale is the rare hotel that feels like a home with better service. The black cod miso alone is worth the stay.",
    source: "Sample review — illustrative content",
  },
  {
    name: "Sofia L.",
    location: "Milan, Italy",
    rating: 4,
    text: "Elegant, calm and impeccably run. The spa ritual was extraordinary. I only wish I had booked a longer stay — next time, the Presidential Suite.",
    source: "Sample review — illustrative content",
  },
];

export const galleryImages = [
  { src: px(12387870, 1200, 800), alt: "Hotel pool terrace at night", tall: false },
  { src: px(8134775, 900, 1200), alt: "Suite lounge with warm lighting", tall: true },
  { src: px(37968303, 1200, 800), alt: "Candlelit fine dining table", tall: false },
  { src: px(19409040, 900, 1200), alt: "Gourmet plated dish", tall: true },
  { src: px(33780374, 1200, 800), alt: "Hotel architecture at sunset", tall: false },
  { src: px(29040997, 1200, 800), alt: "Wedding reception in the ballroom", tall: false },
  { src: px(2725675, 900, 1200), alt: "Deluxe room interior", tall: true },
  { src: px(22994309, 1200, 800), alt: "Seafood course, plated", tall: false },
  { src: px(27305293, 900, 1200), alt: "Restaurant dining room", tall: true },
  { src: px(36896284, 1200, 800), alt: "Lakeside view from the hotel", tall: false },
  { src: px(6466496, 1200, 800), alt: "Housekeeping perfecting a suite", tall: false },
  { src: px(17294715, 1200, 800), alt: "Private event table styling", tall: false },
];

export const heroImage = px(12387870, 1920, 1080);
export const aboutImage = px(33780374, 1400, 1000);
export const restaurantHeroImage = px(37968303, 1600, 1000);
export const chefImage = px(27305293, 900, 1200);
export const reservationImage = px(15945600, 1200, 1500);
