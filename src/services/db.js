// Database Service supporting Firebase adapter + LocalStorage Fallback

// Helper to generate beautiful, SVG data URIs for placeholder images (avoiding broken assets)
const generateSVGPlaceholder = (bg, text, label) => {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="100%" height="100%" fill="${bg}"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="'Poppins', sans-serif" font-weight="bold" font-size="28" fill="${text}">${label}</text><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="'Poppins', sans-serif" font-size="16" fill="${text}">Sadhana Luxury Salon</text></svg>`;
};

// Seed Data
const SEED_SERVICES = [
  // Men's Salon
  {
    id: "m_haircut",
    gender: "men",
    category: "hair",
    name: "Classic Haircut",
    description: "Personalized haircut and styling by our senior barber, complete with a refreshing hair wash and hot towel service.",
    basePrice: 200,
    duration: 30,
    rating: 4.9,
    reviewsCount: 124,
    hasRange: false
  },
  {
    id: "m_beard",
    gender: "men",
    category: "hair",
    name: "Beard Trim & Detail",
    description: "Precision beard shaping, line definition, and conditioning with premium beard oils and hot towels.",
    basePrice: 100,
    duration: 20,
    rating: 4.8,
    reviewsCount: 96,
    hasRange: false
  },
  {
    id: "m_combo",
    gender: "men",
    category: "hair",
    name: "Hair + Beard Combo",
    description: "Our signature luxury grooming service combining the Classic Haircut and Beard Detail at an attractive price.",
    basePrice: 300,
    duration: 45,
    rating: 4.9,
    reviewsCount: 310,
    hasRange: false
  },
  {
    id: "m_massage",
    gender: "men",
    category: "facial",
    name: "Relaxing Face Massage",
    description: "A soothing head and facial massage using premium herbal oils to boost blood circulation and relieve stress.",
    basePrice: 200,
    duration: 25,
    rating: 4.7,
    reviewsCount: 52,
    hasRange: false
  },
  {
    id: "m_scrub",
    gender: "men",
    category: "facial",
    name: "Deep Cleansing Scrub",
    description: "Exfoliating massage using natural walnut and apricot scrub to remove dead cells, blackheads, and skin tan.",
    basePrice: 200,
    maxPrice: 300,
    defaultPrice: 250,
    duration: 30,
    rating: 4.8,
    reviewsCount: 84,
    hasRange: true,
    rangeLabel: "Scrub Intensity"
  },
  {
    id: "m_dtan",
    gender: "men",
    category: "facial",
    name: "D-Tan Therapy",
    description: "Advanced active tan removal therapy using lactic acid and gold scrub to restore skin's natural brightness.",
    basePrice: 350,
    maxPrice: 450,
    defaultPrice: 400,
    duration: 35,
    rating: 4.9,
    reviewsCount: 112,
    hasRange: true,
    rangeLabel: "Face & Neck Coverage"
  },
  {
    id: "m_cleanup",
    gender: "men",
    category: "facial",
    name: "Intense Face Cleanup",
    description: "Customized skin cleansing targeting acne, open pores, and blackhead removal, suitable for all oily/dry skins.",
    basePrice: 750,
    maxPrice: 1250,
    defaultPrice: 950,
    duration: 45,
    rating: 4.8,
    reviewsCount: 68,
    hasRange: true,
    rangeLabel: "Product Quality (Regular / Gold)"
  },
  {
    id: "m_facial",
    gender: "men",
    category: "facial",
    name: "Anti-Ageing Facial",
    description: "Nourishing facial therapy using vitamin-rich creams and gold masks to reduce wrinkles, firming skin texture.",
    basePrice: 1500,
    maxPrice: 3500,
    defaultPrice: 2000,
    duration: 60,
    rating: 4.7,
    reviewsCount: 41,
    hasRange: true,
    rangeLabel: "Luxury Product Range"
  },
  {
    id: "m_hydra",
    gender: "men",
    category: "facial",
    name: "Luxury Hydra Facial",
    description: "Medical-grade hydradermabrasion system that cleanses, exfoliates, and hydrates with specialized nourishing serums.",
    basePrice: 3500,
    maxPrice: 7500,
    defaultPrice: 5000,
    duration: 75,
    rating: 4.9,
    reviewsCount: 89,
    hasRange: true,
    rangeLabel: "Serum Formula Upgrades"
  },
  {
    id: "m_color1",
    gender: "men",
    category: "treatment",
    name: "Hair Color (Matrix)",
    description: "Ammonia-free Matrix color offering 100% gray coverage with rich, natural gloss and damage protection.",
    basePrice: 350,
    duration: 40,
    rating: 4.7,
    reviewsCount: 78,
    hasRange: false
  },
  {
    id: "m_color2",
    gender: "men",
    category: "treatment",
    name: "Hair Color (L'Oreal Professional)",
    description: "Premium L'Oreal INOA oil-delivery system coloring that strengthens hair fibers while giving long-lasting radiant color.",
    basePrice: 400,
    duration: 40,
    rating: 4.8,
    reviewsCount: 145,
    hasRange: false
  },
  {
    id: "m_keratin",
    gender: "men",
    category: "treatment",
    name: "Keratin Treatment",
    description: "Deep conditioning keratin infusion that eliminates frizz, relaxes curls, and restores protein strength.",
    basePrice: 2500,
    maxPrice: 4500,
    defaultPrice: 3500,
    duration: 90,
    rating: 4.9,
    reviewsCount: 92,
    hasRange: true,
    rangeLabel: "Hair Length / Density"
  },
  {
    id: "m_botox",
    gender: "men",
    category: "treatment",
    name: "Hair Botox Treatment",
    description: "Advanced anti-aging hair therapy that repairs split ends and deeply reconstructs broken bonds for ultra shine.",
    basePrice: 3500,
    maxPrice: 4500,
    defaultPrice: 4000,
    duration: 90,
    rating: 4.9,
    reviewsCount: 56,
    hasRange: true,
    rangeLabel: "Product Volume Needed"
  },
  {
    id: "m_kerasmooth",
    gender: "men",
    category: "treatment",
    name: "Kerasmooth Smoothing",
    description: "Combination straightening & smoothing service containing keratin nourishment to make coarse hair manageable.",
    basePrice: 3800,
    maxPrice: 4500,
    defaultPrice: 4200,
    duration: 120,
    rating: 4.8,
    reviewsCount: 38,
    hasRange: true,
    rangeLabel: "Hair Texture Complexity"
  },
  {
    id: "m_headmassage",
    gender: "men",
    category: "treatment",
    name: "Therapeutic Head Massage",
    description: "Scalp massage using cooling camphor and olive oils to relieve headaches and boost relaxation.",
    basePrice: 150,
    duration: 20,
    rating: 4.8,
    reviewsCount: 201,
    hasRange: false
  },

  // Women's Salon
  {
    id: "w_haircut",
    gender: "women",
    category: "hair",
    name: "Stylist Haircut & Blowdry",
    description: "Fashion haircut (Layer, Step, Pixie, Bob) by senior stylists including deep hair wash and volume blow-dry.",
    basePrice: 400,
    maxPrice: 800,
    defaultPrice: 600,
    duration: 45,
    rating: 4.9,
    reviewsCount: 284,
    hasRange: true,
    rangeLabel: "Stylist Expertise (Senior / Master)"
  },
  {
    id: "w_styling",
    gender: "women",
    category: "hair",
    name: "Blow Dry & Hot Styling",
    description: "Elegant crimping, straightening, or soft curls for parties, corporate events, or casual get-togethers.",
    basePrice: 300,
    maxPrice: 600,
    defaultPrice: 450,
    duration: 30,
    rating: 4.8,
    reviewsCount: 162,
    hasRange: true,
    rangeLabel: "Ironing & Tong Upgrades"
  },
  {
    id: "w_color",
    gender: "women",
    category: "hair",
    name: "Root Touch-up & Global Color",
    description: "L'Oreal Majirel root touch-up or full hair coloring with customized highlights or balayage patterns.",
    basePrice: 600,
    maxPrice: 1200,
    defaultPrice: 850,
    duration: 60,
    rating: 4.7,
    reviewsCount: 198,
    hasRange: true,
    rangeLabel: "Color Brand & Volume"
  },
  {
    id: "w_smoothing",
    gender: "women",
    category: "hair",
    name: "Permanent Smoothening",
    description: "L'Oreal X-Tenso permanent straightening therapy giving straight, silky, and frizz-free hair for 6-8 months.",
    basePrice: 3000,
    maxPrice: 5000,
    defaultPrice: 4000,
    duration: 150,
    rating: 4.9,
    reviewsCount: 88,
    hasRange: true,
    rangeLabel: "Hair Length (Shoulder / Waist)"
  },
  {
    id: "w_spa",
    gender: "women",
    category: "hair",
    name: "Deep Restorative Hair Spa",
    description: "Steam-infused scalp therapy using active matrix oils to target hair loss, split ends, and dry texture.",
    basePrice: 500,
    maxPrice: 1500,
    defaultPrice: 1000,
    duration: 50,
    rating: 4.8,
    reviewsCount: 220,
    hasRange: true,
    rangeLabel: "Spa Treatment Type (Anti-Dandruff / Repair)"
  },
  {
    id: "w_basicfacial",
    gender: "women",
    category: "facial",
    name: "Radiance Basic Facial",
    description: "Standard skin cleanup with gentle scrub, cream massage, and soothing cucumber glow pack.",
    basePrice: 800,
    maxPrice: 1500,
    defaultPrice: 1200,
    duration: 45,
    rating: 4.7,
    reviewsCount: 104,
    hasRange: true,
    rangeLabel: "Massage Pack Brand"
  },
  {
    id: "w_bridal_facial",
    gender: "women",
    category: "facial",
    name: "O3+ Bridal Glow Facial",
    description: "Premium whitening & brightening facial therapy designed for brides, providing natural fairness and high glow.",
    basePrice: 2000,
    maxPrice: 3500,
    defaultPrice: 2800,
    duration: 75,
    rating: 4.9,
    reviewsCount: 95,
    hasRange: true,
    rangeLabel: "O3+ Kit Selection"
  },
  {
    id: "w_hydra",
    gender: "women",
    category: "facial",
    name: "Advanced Hydra Facial",
    description: "Ultra-hydrating skin polishing treatment using vacuum extraction and skin serum infusion for immediate glass skin.",
    basePrice: 3500,
    maxPrice: 7500,
    defaultPrice: 5000,
    duration: 75,
    rating: 4.9,
    reviewsCount: 167,
    hasRange: true,
    rangeLabel: "Serum Cocktail Potency"
  },
  {
    id: "w_peel",
    gender: "women",
    category: "facial",
    name: "Dermatological Chemical Peel",
    description: "Glycolic or Salicylic acid peel administered under expert care to remove blemishes, dark circles, and pigmentation.",
    basePrice: 2500,
    maxPrice: 4500,
    defaultPrice: 3500,
    duration: 45,
    rating: 4.8,
    reviewsCount: 61,
    hasRange: true,
    rangeLabel: "Peel Concentration"
  },
  {
    id: "w_threading",
    gender: "women",
    category: "facial",
    name: "Threading Services",
    description: "Eyebrows shaping, upper lip, chin, and forehead threading with cotton organic threads.",
    basePrice: 100,
    maxPrice: 300,
    defaultPrice: 150,
    duration: 15,
    rating: 4.7,
    reviewsCount: 520,
    hasRange: true,
    rangeLabel: "Threaded Areas Combo"
  },
  {
    id: "w_waxing",
    gender: "women",
    category: "facial",
    name: "Full Body Waxing (Rica)",
    description: "Smooth tan removal waxing using premium Rica chocolate wax, minimizing pain and rashes.",
    basePrice: 200,
    maxPrice: 800,
    defaultPrice: 500,
    duration: 45,
    rating: 4.8,
    reviewsCount: 390,
    hasRange: true,
    rangeLabel: "Body Part selection (Half arms / Full legs)"
  },
  {
    id: "w_partymakeup",
    gender: "women",
    category: "makeup",
    name: "Glam Party Makeup",
    description: "Full face HD party makeup including eyelashes, foundation matching, and setting spray for 12hr wear.",
    basePrice: 1500,
    maxPrice: 3000,
    defaultPrice: 2200,
    duration: 60,
    rating: 4.9,
    reviewsCount: 142,
    hasRange: true,
    rangeLabel: "Stylist Tier (Senior / MAC Master)"
  },
  {
    id: "w_bridalmakeup",
    gender: "women",
    category: "makeup",
    name: "Luxury Bridal Makeup",
    description: "Elite wedding day makeup package: Airbrush or HD base, premium eyelashes, draping (Saree/Lehenga), and hair accessory assistance.",
    basePrice: 5000,
    maxPrice: 10000,
    defaultPrice: 7500,
    duration: 120,
    rating: 5.0,
    reviewsCount: 78,
    hasRange: true,
    rangeLabel: "HD / Airbrush Technique"
  },
  {
    id: "w_eyemakeup",
    gender: "women",
    category: "makeup",
    name: "Eye Makeup Only",
    description: "Smokey eye, glitter details, winged liner, and lash application to highlight eyes.",
    basePrice: 500,
    maxPrice: 1000,
    defaultPrice: 750,
    duration: 30,
    rating: 4.8,
    reviewsCount: 93,
    hasRange: true,
    rangeLabel: "Glitter & Lash Selection"
  }
];

const SEED_STAFF = [
  {
    id: "rahul",
    name: "Rahul Sharma",
    photo: import.meta.env.BASE_URL + "assets/images/staff/rahul.png",
    specialty: "Master Barber & Hair Stylist",
    experience: 8,
    rating: 4.9,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    availableHours: "10:00 AM - 8:00 PM",
    certifications: ["Matrix Color Master", "Male Styling Expert"]
  },
  {
    id: "priya",
    name: "Priya Patel",
    photo: import.meta.env.BASE_URL + "assets/images/staff/priya.png",
    specialty: "Aesthetician & Facial Specialist",
    experience: 6,
    rating: 4.8,
    availableDays: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    availableHours: "11:00 AM - 8:00 PM",
    certifications: ["HydraFacial Certified MD", "Chemical Peel Expert"]
  },
  {
    id: "vikram",
    name: "Vikram Singh",
    photo: import.meta.env.BASE_URL + "assets/images/staff/vikram.png",
    specialty: "Senior Stylist & Grooming Expert",
    experience: 7,
    rating: 4.7,
    availableDays: ["Monday", "Wednesday", "Thursday", "Saturday", "Sunday"],
    availableHours: "10:00 AM - 7:00 PM",
    certifications: ["L'Oreal Color Specialist", "Bond Treatment Master"]
  },
  {
    id: "ananya",
    name: "Ananya Sen",
    photo: import.meta.env.BASE_URL + "assets/images/staff/ananya.png",
    specialty: "Bridal Makeup Artist & Hair Spa",
    experience: 10,
    rating: 4.9,
    availableDays: ["Friday", "Saturday", "Sunday"],
    availableHours: "10:00 AM - 8:00 PM",
    certifications: ["MAC Pro Makeup Artist", "Bridal Draping Expert"]
  }
];

const SEED_REVIEWS = [
  {
    id: "rev1",
    author: "Amit Verma",
    rating: 5,
    text: "Got the Hair + Beard combo from Rahul. Absolute professional work. The hot towel massage was extremely relaxing and worth every rupee!",
    serviceId: "m_combo",
    serviceName: "Hair + Beard Combo",
    date: "2026-06-18",
    helpful: 12
  },
  {
    id: "rev2",
    author: "Shreya Ghoshal",
    rating: 5,
    text: "Priya performed the Hydra Facial, and my skin felt absolutely glowing and plump instantly. Very luxurious experience, highly recommended!",
    serviceId: "w_hydra",
    serviceName: "Advanced Hydra Facial",
    date: "2026-06-20",
    helpful: 24
  },
  {
    id: "rev3",
    author: "Rohan Das",
    rating: 4,
    text: "Decent Anti-Ageing Facial. Price is slightly on the higher range but service is top-notch. Clean atmosphere.",
    serviceId: "m_facial",
    serviceName: "Anti-Ageing Facial",
    date: "2026-06-15",
    helpful: 5
  },
  {
    id: "rev4",
    author: "Meera Nair",
    rating: 5,
    text: "Had my Bridal Makeup done by Ananya. Her work is perfect. She did both the HD foundation base and the saree draping wonderfully.",
    serviceId: "w_bridalmakeup",
    serviceName: "Luxury Bridal Makeup",
    date: "2026-06-10",
    helpful: 48
  },
  {
    id: "rev5",
    author: "Siddharth Malhotra",
    rating: 5,
    text: "Very neat haircut and precise beard trimming. Vikram is my go-to guy at Sadhana. Clean workspace.",
    serviceId: "m_combo",
    serviceName: "Hair + Beard Combo",
    date: "2026-06-21",
    helpful: 8
  }
];

const SEED_OFFERS = [
  {
    id: "coupon_gold",
    discount: "20%",
    type: "percentage",
    code: "GOLD20",
    description: "20% Off Bridal Makeup Packages",
    validTill: "2026-07-31",
    applicableServices: ["w_bridalmakeup"]
  },
  {
    id: "coupon_first",
    discount: "₹100",
    type: "flat",
    code: "BEARD100",
    description: "Flat ₹100 Off Hair + Beard Grooming Combo",
    validTill: "2026-07-15",
    applicableServices: ["m_combo"]
  },
  {
    id: "coupon_glow",
    discount: "15%",
    type: "percentage",
    code: "GLOW15",
    description: "15% Off HydraFacials & Premium Facials",
    validTill: "2026-07-25",
    applicableServices: ["w_hydra", "m_hydra", "w_bridal_facial"]
  }
];

const SEED_GALLERY = [
  {
    id: "gal1",
    category: "hair",
    title: "Signature Undercut & Beard Shape",
    before: import.meta.env.BASE_URL + "assets/images/gallery/hair_before_v3.png",
    after: import.meta.env.BASE_URL + "assets/images/gallery/hair_after_v3.png"
  },
  {
    id: "gal2",
    category: "facial",
    title: "Hydra Facial Glow Transformation",
    before: import.meta.env.BASE_URL + "assets/images/gallery/skin_before.png",
    after: import.meta.env.BASE_URL + "assets/images/gallery/skin_after.png"
  },
  {
    id: "gal3",
    category: "makeup",
    title: "Bridal Draping & Glow Makeup",
    before: import.meta.env.BASE_URL + "assets/images/gallery/makeup_before.png",
    after: import.meta.env.BASE_URL + "assets/images/gallery/makeup_after.png"
  }
];

const SEED_BOOKINGS = [
  {
    id: "b_001",
    date: new Date().toISOString().split("T")[0],
    time: "10:30 AM",
    serviceId: "m_combo",
    serviceName: "Hair + Beard Combo",
    price: 300,
    staffId: "rahul",
    staffName: "Rahul Sharma",
    customerName: "Sanjay Kumar",
    customerPhone: "9876543210",
    customerEmail: "sanjay@gmail.com",
    status: "confirmed"
  },
  {
    id: "b_002",
    date: new Date().toISOString().split("T")[0],
    time: "12:00 PM",
    serviceId: "w_hydra",
    serviceName: "Advanced Hydra Facial",
    price: 5000,
    staffId: "priya",
    staffName: "Priya Patel",
    customerName: "Aditi Rao",
    customerPhone: "9988776655",
    customerEmail: "aditi@outlook.com",
    status: "completed"
  },
  {
    id: "b_003",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
    time: "02:30 PM",
    serviceId: "w_bridalmakeup",
    serviceName: "Luxury Bridal Makeup",
    price: 7500,
    staffId: "ananya",
    staffName: "Ananya Sen",
    customerName: "Kriti Sanon",
    customerPhone: "9000800070",
    customerEmail: "kriti@wedding.in",
    status: "confirmed"
  }
];

class LocalDatabase {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem("sadhana_services")) {
      localStorage.setItem("sadhana_services", JSON.stringify(SEED_SERVICES));
    }
    if (!localStorage.getItem("sadhana_staff")) {
      localStorage.setItem("sadhana_staff", JSON.stringify(SEED_STAFF));
    }
    if (!localStorage.getItem("sadhana_reviews")) {
      localStorage.setItem("sadhana_reviews", JSON.stringify(SEED_REVIEWS));
    }
    if (!localStorage.getItem("sadhana_offers")) {
      localStorage.setItem("sadhana_offers", JSON.stringify(SEED_OFFERS));
    }
    if (!localStorage.getItem("sadhana_gallery_v3")) {
      localStorage.setItem("sadhana_gallery_v3", JSON.stringify(SEED_GALLERY));
    }
    if (!localStorage.getItem("sadhana_bookings")) {
      localStorage.setItem("sadhana_bookings", JSON.stringify(SEED_BOOKINGS));
    }
  }

  getServices() {
    return JSON.parse(localStorage.getItem("sadhana_services"));
  }

  getStaff() {
    return JSON.parse(localStorage.getItem("sadhana_staff"));
  }

  getReviews() {
    return JSON.parse(localStorage.getItem("sadhana_reviews"));
  }

  getOffers() {
    return JSON.parse(localStorage.getItem("sadhana_offers"));
  }

  getGallery() {
    return JSON.parse(localStorage.getItem("sadhana_gallery_v3")) || SEED_GALLERY;
  }

  getBookings() {
    return JSON.parse(localStorage.getItem("sadhana_bookings"));
  }

  addBooking(booking) {
    const bookings = this.getBookings();
    const newBooking = {
      id: `b_${Date.now()}`,
      status: "confirmed",
      ...booking
    };
    bookings.push(newBooking);
    localStorage.setItem("sadhana_bookings", JSON.stringify(bookings));
    return newBooking;
  }

  updateBookingStatus(bookingId, status) {
    const bookings = this.getBookings();
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status } : b);
    localStorage.setItem("sadhana_bookings", JSON.stringify(updated));
    return true;
  }

  addReview(review) {
    const reviews = this.getReviews();
    const newReview = {
      id: `rev_${Date.now()}`,
      helpful: 0,
      date: new Date().toISOString().split("T")[0],
      ...review
    };
    reviews.unshift(newReview); // add at start
    localStorage.setItem("sadhana_reviews", JSON.stringify(reviews));

    // Update service rating averages
    const services = this.getServices();
    const serviceIndex = services.findIndex(s => s.id === review.serviceId);
    if (serviceIndex !== -1) {
      const s = services[serviceIndex];
      const newReviewsCount = (s.reviewsCount || 0) + 1;
      const currentAvg = s.rating || 4.5;
      const newRating = parseFloat((((currentAvg * s.reviewsCount) + review.rating) / newReviewsCount).toFixed(1));
      
      services[serviceIndex] = {
        ...s,
        rating: newRating,
        reviewsCount: newReviewsCount
      };
      localStorage.setItem("sadhana_services", JSON.stringify(services));
    }

    return newReview;
  }

  incrementHelpful(reviewId) {
    const reviews = this.getReviews();
    const updated = reviews.map(r => r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r);
    localStorage.setItem("sadhana_reviews", JSON.stringify(updated));
    return true;
  }

  // Get aggregated stats for Admin Dashboard
  getStats() {
    const bookings = this.getBookings();
    
    // Revenue calculations
    const totalRev = bookings.reduce((sum, b) => b.status === "completed" || b.status === "confirmed" ? sum + b.price : sum, 0);
    const today = new Date().toISOString().split("T")[0];
    const todayBookings = bookings.filter(b => b.date === today);
    const todayRev = todayBookings.reduce((sum, b) => b.status === "completed" || b.status === "confirmed" ? sum + b.price : sum, 0);
    
    // Category Breakdown
    const services = this.getServices();
    const categoryRevenue = { hair: 0, facial: 0, makeup: 0, treatment: 0 };
    bookings.forEach(b => {
      if (b.status === "completed" || b.status === "confirmed") {
        const s = services.find(srv => srv.id === b.serviceId);
        if (s) {
          categoryRevenue[s.category] = (categoryRevenue[s.category] || 0) + b.price;
        } else {
          categoryRevenue.hair += b.price; // fallback
        }
      }
    });

    return {
      totalAppointments: bookings.length,
      revenueTotal: totalRev,
      revenueToday: todayRev,
      bookingsTodayCount: todayBookings.length,
      bookingsToday: todayBookings,
      upcomingBookings: bookings.filter(b => b.date >= today && b.status === "confirmed").sort((a, b) => a.date.localeCompare(b.date)),
      categoryRevenue
    };
  }
}

export const db = new LocalDatabase();
