import {
  TripPreferences,
  GeneratedItinerary,
  ItineraryDay,
  ItineraryActivity,
  PopularDestination,
  TravelStyle,
  BudgetTier,
  TripType,
  TravelPace,
} from '../types';

export const POPULAR_DESTINATIONS: PopularDestination[] = [
  {
    name: 'Tokyo',
    country: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Neon nightscapes, retro arcades, and Michelin-star ramen alleys',
    highlightStyle: 'Foodie',
    typicalCostLow: 65,
  },
  {
    name: 'Barcelona',
    country: 'Spain',
    imageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Gothic quarters, sunset beach tapas, and surreal Gaudí wonders',
    highlightStyle: 'Culture',
    typicalCostLow: 55,
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Lush jungle waterfalls, aesthetic cliff cafes, and surf breaks',
    highlightStyle: 'Adventure',
    typicalCostLow: 35,
  },
  {
    name: 'Mexico City',
    country: 'Mexico',
    imageUrl: 'https://images.unsplash.com/photo-1518659277860-0d7393167a40?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Tree-lined bohemian avenues, artisanal mezcal, and modern art icons',
    highlightStyle: 'Foodie',
    typicalCostLow: 40,
  },
  {
    name: 'Seoul',
    country: 'South Korea',
    imageUrl: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=80',
    tagline: 'K-beauty concept stores, midnight street food, and historic palaces',
    highlightStyle: 'Shopping',
    typicalCostLow: 50,
  },
  {
    name: 'Paris',
    country: 'France',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Canal Saint-Martin picnics, indie bookstores, and hidden wine bars',
    highlightStyle: 'Relaxation',
    typicalCostLow: 70,
  },
];

// Fallback images based on keywords
export function getDestinationImage(destinationName: string): { url: string; tagline: string } {
  const normalized = destinationName.toLowerCase().trim();
  const match = POPULAR_DESTINATIONS.find(d => d.name.toLowerCase() === normalized);
  if (match) {
    return { url: match.imageUrl, tagline: match.tagline };
  }

  if (normalized.includes('tokyo') || normalized.includes('japan') || normalized.includes('kyoto') || normalized.includes('osaka')) {
    return {
      url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Vibrant neighborhoods, tranquil shrines, and unforgettable street flavors',
    };
  }
  if (normalized.includes('barcelona') || normalized.includes('spain') || normalized.includes('madrid')) {
    return {
      url: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Sun-drenched plazas, vibrant seaside dining, and historic charm',
    };
  }
  if (normalized.includes('bali') || normalized.includes('indonesia') || normalized.includes('island') || normalized.includes('beach')) {
    return {
      url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Tropical breezes, vibrant beach clubs, and serene nature escapes',
    };
  }
  if (normalized.includes('seoul') || normalized.includes('korea')) {
    return {
      url: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Future-forward districts, historic gates, and electric night vibes',
    };
  }
  if (normalized.includes('paris') || normalized.includes('france')) {
    return {
      url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Cobblestone passages, riverside strolls, and world-class culinary art',
    };
  }
  if (normalized.includes('new york') || normalized.includes('nyc') || normalized.includes('usa')) {
    return {
      url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Rooftop views, iconic skyline energy, and endless hidden gems',
    };
  }
  if (normalized.includes('rome') || normalized.includes('italy')) {
    return {
      url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Ancient wonders, authentic trattorias, and lively evening piazzas',
    };
  }
  if (normalized.includes('london') || normalized.includes('uk')) {
    return {
      url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Vintage borough markets, royal parks, and iconic urban charm',
    };
  }
  if (normalized.includes('bangkok') || normalized.includes('thailand')) {
    return {
      url: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Ornate temples, buzzing night markets, and sensational street food',
    };
  }
  if (normalized.includes('amsterdam') || normalized.includes('netherlands')) {
    return {
      url: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Scenic canal bridges, indie design boutiques, and relaxed cafe culture',
    };
  }

  // Default dynamic wanderlust image
  return {
    url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    tagline: 'A bespoke adventure handcrafted for your squad and your budget',
  };
}

interface ActivityTemplate {
  title: string;
  location: (dest: string) => string;
  desc: (dest: string, style: TravelStyle, budget: BudgetTier, type: TripType) => string;
  duration: string;
  category: TravelStyle | 'Dining' | 'Nightlife' | 'Sightseeing';
  baseCost: { Low: number; Medium: number; High: number };
  insiderTip: string;
  highlightTag?: string;
  timeSlot: 'morning' | 'lunch' | 'afternoon' | 'sunset' | 'dinner' | 'evening';
}

const ACTIVITY_TEMPLATES: ActivityTemplate[] = [
  // Morning slots
  {
    title: 'Specialty Roastery & Breakfast Pastries',
    location: (dest) => `${dest} Arts District`,
    desc: (dest, style, budget, type) =>
      `Kickstart your morning at an indie micro-roaster popular with local creators. Great pour-overs, artisanal sourdough toast, and sunlit outdoor seating tailored for ${type.toLowerCase()} travelers.`,
    duration: '1 hr',
    category: 'Dining',
    baseCost: { Low: 5, Medium: 14, High: 25 },
    insiderTip: 'Ask the barista for their single-origin brew of the week.',
    highlightTag: 'Local Favorite',
    timeSlot: 'morning',
  },
  {
    title: 'Historic Neighborhood & Street Walk',
    location: (dest) => `Old Town Quarters, ${dest}`,
    desc: (dest, style, budget) =>
      `Wander through winding cobblestones, striking heritage doorways, and hidden pocket courtyards away from the tourist buses.`,
    duration: '1.5 hrs',
    category: 'Culture',
    baseCost: { Low: 0, Medium: 0, High: 15 },
    insiderTip: 'Early morning light here is golden for photography.',
    highlightTag: 'Free & Scenic',
    timeSlot: 'morning',
  },
  {
    title: 'Scenic Panorama Hike & Viewpoint',
    location: (dest) => `Summit Lookout, ${dest}`,
    desc: (dest) =>
      `A brisk scenic trek up to the city's highest natural vantage point with panoramic 360-degree views of the skyline and horizon.`,
    duration: '2 hrs',
    category: 'Adventure',
    baseCost: { Low: 0, Medium: 10, High: 35 },
    insiderTip: 'Bring comfortable sneakers and water; the trail has shaded resting pavilions.',
    highlightTag: 'Must-See View',
    timeSlot: 'morning',
  },
  {
    title: 'Slow Morning Botanical Stroll & Greenhouse',
    location: (dest) => `Central Botanical Haven, ${dest}`,
    desc: (dest) =>
      `Gentle paths through tropical conservatories, lily pad ponds, and serene manicured lawns ideal for unwinding.`,
    duration: '1.5 hrs',
    category: 'Relaxation',
    baseCost: { Low: 4, Medium: 12, High: 25 },
    insiderTip: 'Grab a bench near the glasshouse fountains for tranquil reading.',
    highlightTag: 'Peaceful Oasis',
    timeSlot: 'morning',
  },

  // Lunch slots
  {
    title: 'Iconic Local Street Food Tasting Market',
    location: (dest) => `Central Food Hall, ${dest}`,
    desc: (dest, style, budget) =>
      `Feast on legendary local dishes from multi-generational stallholders. Sample signature regional street specialties, freshly prepared dumplings or skewers, and sweet treats.`,
    duration: '1.5 hrs',
    category: 'Dining',
    baseCost: { Low: 8, Medium: 22, High: 45 },
    insiderTip: 'Follow the stalls with the longest lines of local students and office workers.',
    highlightTag: 'Foodie Must',
    timeSlot: 'lunch',
  },
  {
    title: 'Trendy Courtyard Bistro & Natural Wine',
    location: (dest) => `Green District, ${dest}`,
    desc: (dest) =>
      `A casual-chic eatery serving farm-to-table seasonal sharing plates, handmade pastas, and crisp organic refreshments.`,
    duration: '1.5 hrs',
    category: 'Dining',
    baseCost: { Low: 12, Medium: 28, High: 60 },
    insiderTip: 'The lunch set menu is nearly half the price of their dinner service.',
    highlightTag: 'Top Rated',
    timeSlot: 'lunch',
  },

  // Afternoon slots
  {
    title: 'Contemporary Art & Design Pavilions',
    location: (dest) => `Museum Precinct, ${dest}`,
    desc: (dest, style) =>
      `Explore immersive multi-sensory installations, modern architecture, and curated rotating collections from emerging global artists.`,
    duration: '2 hrs',
    category: 'Culture',
    baseCost: { Low: 8, Medium: 18, High: 35 },
    insiderTip: 'Student IDs or under-26 passes often get 50% discount at the door.',
    highlightTag: 'Inspiring Art',
    timeSlot: 'afternoon',
  },
  {
    title: 'Curated Vintage & Indie Concept Boutiques',
    location: (dest) => `Bohemian Quarter, ${dest}`,
    desc: (dest) =>
      `Hunt for one-of-a-kind vintage apparel, locally crafted ceramics, Japanese stationery, and independent streetwear labels.`,
    duration: '2 hrs',
    category: 'Shopping',
    baseCost: { Low: 0, Medium: 25, High: 75 },
    insiderTip: 'Check the basement level for rare archive fashion collections.',
    highlightTag: 'Hidden Finds',
    timeSlot: 'afternoon',
  },
  {
    title: 'Urban Kayak or E-Bike City Discovery',
    location: (dest) => `Waterfront Trail & Promenade, ${dest}`,
    desc: (dest) =>
      `Glide through the waterways or cruise bike-friendly urban corridors with cool breezes and vibrant street art murals along the path.`,
    duration: '2 hrs',
    category: 'Adventure',
    baseCost: { Low: 12, Medium: 30, High: 65 },
    insiderTip: 'Download the local bike-share app ahead of time for easy unlocking.',
    highlightTag: 'Active Fun',
    timeSlot: 'afternoon',
  },
  {
    title: 'Aesthetic Tea Sanctuary & Book Lounge',
    location: (dest) => `Quiet Alleyways, ${dest}`,
    desc: (dest) =>
      `Escape the bustle in a minimalist tatami or low-cushion salon offering heritage tea ceremonies, iced matcha, and tranquil vibes.`,
    duration: '1.5 hrs',
    category: 'Relaxation',
    baseCost: { Low: 6, Medium: 15, High: 30 },
    insiderTip: 'Try the cold-brewed hojicha paired with red bean wagashi.',
    highlightTag: 'Super Chill',
    timeSlot: 'afternoon',
  },

  // Sunset slots
  {
    title: 'Sunset Golden Hour by the Water / Rooftop',
    location: (dest) => `Harbor Promenade or Sky Terrace, ${dest}`,
    desc: (dest) =>
      `Watch the twilight skyline transition as the city lights flicker to life. Incredible ambient music, open breeze, and prime photo angles.`,
    duration: '1 hr',
    category: 'Sightseeing',
    baseCost: { Low: 0, Medium: 12, High: 28 },
    insiderTip: 'Arrive 30 minutes before official sundown to secure the best corner spot.',
    highlightTag: 'Golden Hour',
    timeSlot: 'sunset',
  },

  // Dinner & Evening slots
  {
    title: 'Izakaya / Tapas Crawl & Sizzling Small Plates',
    location: (dest) => `Night Alley District, ${dest}`,
    desc: (dest, style, budget, type) =>
      `Atmospheric wooden counters serving smokey skewers, sizzling dumplings, crispy croquettes, and draft refreshments in a lively communal setting.`,
    duration: '2 hrs',
    category: 'Dining',
    baseCost: { Low: 14, Medium: 35, High: 70 },
    insiderTip: 'Order the chef’s daily special chalkboard recommendations.',
    highlightTag: 'Vibrant Vibe',
    timeSlot: 'dinner',
  },
  {
    title: 'Hidden Vinyl Listening Bar or Secret Speakeasy',
    location: (dest) => `Behind the Bookshelf, ${dest}`,
    desc: (dest) =>
      `A cozy, low-lit hideaway spinning vintage jazz, Japanese funk, or indie disco on analog tube amps with bespoke mocktails and cocktails.`,
    duration: '2 hrs',
    category: 'Nightlife',
    baseCost: { Low: 10, Medium: 25, High: 50 },
    insiderTip: 'Ring the unmarked bronze buzzer beside the antique door to enter.',
    highlightTag: 'Exclusive Vibe',
    timeSlot: 'evening',
  },
  {
    title: 'Neon Night Market Exploration & Sweets',
    location: (dest) => `Night Arcade District, ${dest}`,
    desc: (dest) =>
      `Bustling stalls glowing under retro lanterns. Pick up warm shaved ice, churros, or taiyaki while browsing quirky souvenir trinkets.`,
    duration: '1.5 hrs',
    category: 'Nightlife',
    baseCost: { Low: 6, Medium: 16, High: 35 },
    insiderTip: 'Bring small paper bills or cash; card terminals are rare at individual stalls.',
    highlightTag: 'Late Night Fun',
    timeSlot: 'evening',
  },
];

// Day theme templates
const DAY_THEMES = [
  'Arrival, Street Flavors & Iconic Neighborhoods',
  'Hidden Cultural Gems & Modern Art Discoveries',
  'Panoramic Views, Indie Alleys & Sunset Vibe',
  'Creative Districts, Vintage Finds & Food Crawl',
  'Nature Escape, Scenic Trails & Local Markets',
  'Waterfront Breezes, Secret Cafes & Night Lights',
  'Final Keepsakes, Farewell Feast & Midnight Magic',
  'Off-the-Beaten-Path Treasures & Local Hangouts',
  'Architectural Marvels & Relaxing Green Havens',
  'Culinary Masterclass & Neighborhood Vinyl Bars',
];

// City-specific tailored items
const CITY_SPECIFIC_ITEMS: Record<string, Partial<ActivityTemplate>[]> = {
  tokyo: [
    {
      title: 'Morning Ramen & Tsukiji Outer Market Stroll',
      location: () => 'Tsukiji & Ginza Borders, Tokyo',
      desc: () => 'Taste fresh tamagoyaki egg skewers, seared wagyu bites, and hot matcha lattes before the midday crowds arrive.',
      category: 'Dining',
      highlightTag: 'Tokyo Classic',
    },
    {
      title: 'Retro Arcade Gaming & Gachapon Alley',
      location: () => 'Akihabara Radiokan, Tokyo',
      desc: () => 'Try your luck at claw machines, vintage Street Fighter cabinets, and multi-floor hobby collectibles.',
      category: 'Adventure',
      highlightTag: 'Youth Culture',
    },
    {
      title: 'Shibuya Sky Sunset & Scramble Crossing View',
      location: () => 'Shibuya Scramble Square Rooftop, Tokyo',
      desc: () => 'Stand 230 meters above Shibuya on a glass-deck sky terrace as neon billboards illuminate the crossing below.',
      category: 'Sightseeing',
      highlightTag: 'Iconic View',
    },
    {
      title: 'Golden Gai Tiny Lantern Bar Crawl',
      location: () => 'Shinjuku Golden Gai, Tokyo',
      desc: () => 'Six narrow alleys packed with over 200 eccentric micro-bars holding only 5 to 6 patrons each.',
      category: 'Nightlife',
      highlightTag: 'Unforgettable',
    },
    {
      title: 'Shimokitazawa Thrift Stores & Record Bins',
      location: () => 'Shimokitazawa Vintage District, Tokyo',
      desc: () => 'Tokyo’s premier indie haven with curated American vintage, Japanese denim, and hole-in-the-wall curry spots.',
      category: 'Shopping',
      highlightTag: 'Indie Fashion',
    },
  ],
  barcelona: [
    {
      title: 'Sagrada Família Morning Light & Gaudí Details',
      location: () => 'Eixample, Barcelona',
      desc: () => 'Witness the morning sunlight stream through the kaleidoscope stained-glass nave inside Gaudí’s surreal basilica.',
      category: 'Culture',
      highlightTag: 'Must-See Wonder',
    },
    {
      title: 'El Born Tapas Crawl & Vermouth Bar',
      location: () => 'El Born Historic Quarter, Barcelona',
      desc: () => 'Nibble on patatas bravas, Iberian ham croquettes, and chilled draft vermouth with a twist of orange.',
      category: 'Dining',
      highlightTag: 'Local Staple',
    },
    {
      title: 'Bunkers del Carmel Sunset Picnic',
      location: () => 'Turó de la Rovira, Barcelona',
      desc: () => 'Abandoned Spanish Civil War bunkers offering the absolute best panoramic sunset views over the entire Mediterranean coast.',
      category: 'Adventure',
      highlightTag: 'Sunset Gold',
    },
    {
      title: 'Barceloneta Beach Paddleboard & Chiringuito',
      location: () => 'Platja de la Barceloneta, Barcelona',
      desc: () => 'Rent a board for calm morning waves, then grab cold sparkling sangria and grilled sardines at a beachside shack.',
      category: 'Relaxation',
      highlightTag: 'Seaside Chill',
    },
  ],
  bali: [
    {
      title: 'Tegallalang Rice Terrace Sunrise Stroll',
      location: () => 'Ubud Terraces, Bali',
      desc: () => 'Walk along misty emerald green tiers before the heat and tour buses arrive, tasting fresh young coconut water.',
      category: 'Adventure',
      highlightTag: 'Lush Nature',
    },
    {
      title: 'Aesthetic Canggu Beachfront Cafe & Smoothie Bowls',
      location: () => 'Batu Bolong, Canggu, Bali',
      desc: () => 'Dragonfruit acai bowls, cold brew tonics, and bohemian rattan interiors buzzing with creative digital nomads.',
      category: 'Dining',
      highlightTag: 'Island Vibe',
    },
    {
      title: 'Uluwatu Sunset Cliffside Amphitheater & Kecak Dance',
      location: () => 'Uluwatu Temple Cliffs, Bali',
      desc: () => 'Dramatic fire dance performance perched 70 meters above roaring Indian Ocean waves during golden hour.',
      category: 'Culture',
      highlightTag: 'Spectacular',
    },
    {
      title: 'La Brisa Eco-Chic Beach Club & Surf Sunset',
      location: () => 'Echo Beach, Canggu, Bali',
      desc: () => 'Rustic reclaimed fishing-boat daybeds, warm fairy lights, and live ambient DJs as the sun dips into the ocean.',
      category: 'Relaxation',
      highlightTag: 'Beach Sunset',
    },
  ],
  'mexico city': [
    {
      title: 'Roma Norte Coffee & Street Taco Stand',
      location: () => 'Colonia Roma Norte, Mexico City',
      desc: () => 'Start with guava pastries at Panadería Rosetta, followed by legendary al pastor tacos with pineapple on street corners.',
      category: 'Dining',
      highlightTag: 'Epic Tastes',
    },
    {
      title: 'Frida Kahlo Museum & Coyoacán Colonial Plaza',
      location: () => 'Coyoacán Blue House, Mexico City',
      desc: () => 'Stroll through the cobalt-blue home and garden where Frida lived, then browse artisan churro and craft stalls.',
      category: 'Culture',
      highlightTag: 'Artistic Icon',
    },
    {
      title: 'Chapultepec Castle & Bohemian Forest Boat Ride',
      location: () => 'Bosque de Chapultepec, Mexico City',
      desc: () => 'Explore the only royal castle in the Americas, with sweeping avenue vistas and shaded park trails.',
      category: 'Sightseeing',
      highlightTag: 'Historic Park',
    },
    {
      title: 'Lucha Libre Masked Wrestling & Mezcaleria',
      location: () => 'Arena México, Mexico City',
      desc: () => 'High-flying acrobatics and roaring crowds at iconic masked wrestling, followed by craft mezcal tastings.',
      category: 'Nightlife',
      highlightTag: 'High Energy',
    },
  ],
  seoul: [
    {
      title: 'Gyeongbokgung Palace in Hanbok Dress',
      location: () => 'Jongno-gu, Seoul',
      desc: () => 'Rent traditional colorful hanbok attire for free palace entry and gorgeous photos across ancient royal pavilions.',
      category: 'Culture',
      highlightTag: 'Royal Heritage',
    },
    {
      title: 'Gwangjang Market Midnight Bindaetteok & Tteokbokki',
      location: () => 'Gwangjang Market, Seoul',
      desc: () => 'Savor crispy mung bean pancakes, spicy rice cakes, and hand-cut kalguksu noodles on heated market benches.',
      category: 'Dining',
      highlightTag: 'Street Food Legend',
    },
    {
      title: 'Hongdae Busking & Indie Streetwear Alleys',
      location: () => 'Hongdae University Zone, Seoul',
      desc: () => 'Live dance crews, photo booth studios with props, indie pop-up shops, and Korean street corn dogs.',
      category: 'Shopping',
      highlightTag: 'Youth Energy',
    },
    {
      title: 'Han River Park Sunset Picnic & Convenience Store Ramen',
      location: () => 'Yeouido Hangang Park, Seoul',
      desc: () => 'Cook self-serve ramen on automated induction machines, rent a picnic mat, and watch ferries drift by at dusk.',
      category: 'Relaxation',
      highlightTag: 'Seoul Lifestyle',
    },
  ],
  paris: [
    {
      title: 'Fresh Croissants & Le Marais Hidden Courtyards',
      location: () => 'Le Marais, Paris',
      desc: () => 'Flaky warm butter croissants from an artisanal boulangerie followed by boutique galleries and ivy-draped passages.',
      category: 'Dining',
      highlightTag: 'Parisian Morning',
    },
    {
      title: 'Musée d’Orsay Impressionist Masterpieces',
      location: () => 'Left Bank, Paris',
      desc: () => 'Stand under the colossal vintage station clock and view Monet water lilies and Van Gogh brushstrokes.',
      category: 'Culture',
      highlightTag: 'Timeless Art',
    },
    {
      title: 'Canal Saint-Martin Wine & Cheese Sunset',
      location: () => 'Canal Saint-Martin, Paris',
      desc: () => 'Join Parisian locals dangling feet over iron footbridges with fresh baguette, camembert, and chilled rosé.',
      category: 'Relaxation',
      highlightTag: 'Youth Hangout',
    },
    {
      title: 'Montmartre Rooftop View & Vinyl Cave',
      location: () => 'Montmartre Steps, Paris',
      desc: () => 'Ascend winding cobblestone staircases for skyline views, stopping by quirky natural wine caves with vinyl music.',
      category: 'Nightlife',
      highlightTag: 'Romantic Vibe',
    },
  ],
};

function getCityItems(destination: string): Partial<ActivityTemplate>[] {
  const norm = destination.toLowerCase().trim();
  for (const [key, items] of Object.entries(CITY_SPECIFIC_ITEMS)) {
    if (norm.includes(key)) {
      return items;
    }
  }
  return [];
}

export function generatePersonalizedItinerary(prefs: TripPreferences): GeneratedItinerary {
  const { destination, numberOfDays, budget, travelStyle, tripType, travelPace } = prefs;
  const destInfo = getDestinationImage(destination);
  const cityItems = getCityItems(destination);

  // Determine activities per day according to travel pace:
  // Relaxed: 2-3 activities/day
  // Balanced: 3-4 activities/day
  // Packed: 4-5 activities/day
  let activitiesPerDay = 3;
  if (travelPace === 'Relaxed') {
    activitiesPerDay = 2;
  } else if (travelPace === 'Balanced') {
    activitiesPerDay = 3;
  } else if (travelPace === 'Packed') {
    activitiesPerDay = 5;
  }

  // Budget multiplier and base daily lodging estimate
  const lodgingRates: Record<BudgetTier, number> = {
    Low: 28, // hostel dorm or budget studio
    Medium: 75, // stylish boutique hotel / clean private room
    High: 180, // 4-star designer boutique hotel / luxury loft
  };

  const transitRates: Record<BudgetTier, number> = {
    Low: 5, // metro pass / public transit
    Medium: 14, // combination of metro + occasional rideshare
    High: 35, // taxis / private rideshare
  };

  const days: ItineraryDay[] = [];
  let totalActivityCost = 0;
  let totalDiningCost = 0;

  // Time schedules based on pace
  const timeSlotsByPace: Record<TravelPace, string[]> = {
    Relaxed: ['10:30 AM', '02:30 PM', '07:30 PM'],
    Balanced: ['09:30 AM', '01:00 PM', '04:30 PM', '08:00 PM'],
    Packed: ['08:30 AM', '11:00 AM', '01:30 PM', '04:30 PM', '07:00 PM', '09:30 PM'],
  };

  const currentSlots = timeSlotsByPace[travelPace];

  // Build each day
  for (let d = 1; d <= numberOfDays; d++) {
    const dayThemeIndex = (d - 1) % DAY_THEMES.length;
    const dayTheme = DAY_THEMES[dayThemeIndex];
    const dayActivities: ItineraryActivity[] = [];
    let dayCost = 0;

    const countForToday = Math.min(activitiesPerDay, currentSlots.length);

    // Pick activities tailored to style & budget
    for (let slotIndex = 0; slotIndex < countForToday; slotIndex++) {
      const timeSlot = currentSlots[slotIndex];
      let candidate: Partial<ActivityTemplate> | undefined;

      // Every few items, see if we can use a city-specific item
      if (cityItems.length > 0 && (d + slotIndex) % 2 === 0) {
        const cityItemIndex = ((d - 1) * countForToday + slotIndex) % cityItems.length;
        candidate = cityItems[cityItemIndex];
      }

      // Fallback to template library
      if (!candidate) {
        // Find templates matching style or dining
        const filteredTemplates = ACTIVITY_TEMPLATES.filter((tpl) => {
          if (slotIndex === 0) return tpl.timeSlot === 'morning';
          if (slotIndex === 1 && countForToday >= 3) return tpl.timeSlot === 'lunch' || tpl.category === 'Dining';
          if (slotIndex === countForToday - 1) return tpl.timeSlot === 'evening' || tpl.timeSlot === 'dinner';
          // Middle slots: prioritize travel style
          return tpl.category === travelStyle || tpl.timeSlot === 'afternoon' || tpl.timeSlot === 'sunset';
        });

        const pool = filteredTemplates.length > 0 ? filteredTemplates : ACTIVITY_TEMPLATES;
        const templateIndex = ((d - 1) * 3 + slotIndex) % pool.length;
        candidate = pool[templateIndex];
      }

      // Calculate cost
      let costVal = 0;
      if (candidate.baseCost) {
        costVal = candidate.baseCost[budget];
      } else {
        // Default estimate based on budget
        if (candidate.category === 'Dining') {
          costVal = budget === 'Low' ? 10 : budget === 'Medium' ? 25 : 55;
        } else if (candidate.category === 'Culture' || candidate.category === 'Adventure') {
          costVal = budget === 'Low' ? 6 : budget === 'Medium' ? 20 : 45;
        } else {
          costVal = budget === 'Low' ? 0 : budget === 'Medium' ? 15 : 35;
        }
      }

      // Adjust for trip type
      if (tripType === 'Friends') {
        // Slightly higher for group rounds/tasting
        costVal = Math.round(costVal * 1.05);
      } else if (tripType === 'Couple') {
        costVal = Math.round(costVal * 1.1);
      }

      const isDining = candidate.category === 'Dining';
      if (isDining) {
        totalDiningCost += costVal;
      } else {
        totalActivityCost += costVal;
      }
      dayCost += costVal;

      const actTitle = candidate.title || `Explore ${destination} Highlights`;
      const actLocation =
        typeof candidate.location === 'function' ? candidate.location(destination) : `${destination} Center`;
      const actDesc =
        typeof candidate.desc === 'function'
          ? candidate.desc(destination, travelStyle, budget, tripType)
          : `Immerse yourself in authentic ${destination} culture with curated activities matched to your ${travelStyle.toLowerCase()} vibe.`;

      const duration = candidate.duration || '1.5 hrs';
      const category = candidate.category || travelStyle;
      const costDisplay = costVal === 0 ? 'Free' : `$${costVal}`;

      dayActivities.push({
        id: `day-${d}-act-${slotIndex + 1}`,
        dayNumber: d,
        time: timeSlot,
        activity: actTitle,
        location: actLocation,
        description: actDesc,
        estimatedCost: costVal,
        costDisplay,
        duration,
        category,
        insiderTip: candidate.insiderTip || 'Carry a digital wallet and tap-to-pay card for effortless transactions.',
        highlightTag: candidate.highlightTag,
        isCompleted: false,
      });
    }

    days.push({
      dayNumber: d,
      theme: dayTheme,
      dateLabel: `Day ${d}`,
      activities: dayActivities,
      dayCost,
    });
  }

  // Calculate totals
  const totalLodging = lodgingRates[budget] * numberOfDays;
  const totalTransit = transitRates[budget] * numberOfDays;
  const totalEstimatedCost = totalActivityCost + totalDiningCost + totalTransit + totalLodging;

  // Generate Youth Travel Tips based on destination & style
  const travelTips: string[] = [
    `Download the local metro navigation app for ${destination} before landing to bypass airport taxi queues.`,
    `As a ${travelStyle.toLowerCase()} traveler on a ${budget.toLowerCase()} budget, watch for weekday lunch specials which often offer 40% savings on identical dinner menus.`,
    `Traveling as a ${tripType.toLowerCase()} crew? Use a digital split bill app (like Splitwise) to instantly reconcile shared meals and transit fares without math stress.`,
    `Carry an e-SIM or local data plan so you can effortlessly browse hidden cafe locations and live translation tools on the fly.`,
  ];

  return {
    id: `trip-${Date.now()}`,
    destination,
    destinationTagline: destInfo.tagline,
    destinationImage: destInfo.url,
    numberOfDays,
    budget,
    travelStyle,
    tripType,
    travelPace,
    totalEstimatedCost,
    costBreakdown: {
      activities: totalActivityCost,
      dining: totalDiningCost,
      transit: totalTransit,
      estimatedLodging: totalLodging,
      total: totalEstimatedCost,
    },
    days,
    travelTips,
  };
}

// Helper to provide swap replacement alternatives
export const ALTERNATIVE_ACTIVITIES: Record<TravelStyle, Array<{ title: string; category: TravelStyle; duration: string; cost: { Low: number; Medium: number; High: number }; tip: string }>> = {
  Foodie: [
    { title: 'Craft Gelato / Specialty Dessert Stop', category: 'Foodie', duration: '45 mins', cost: { Low: 5, Medium: 10, High: 18 }, tip: 'Ask for seasonal fruit sorbet or pistachio swirl.' },
    { title: 'Hidden Alley Cocktail / Mocktail Lab', category: 'Foodie', duration: '1.5 hrs', cost: { Low: 12, Medium: 25, High: 45 }, tip: 'Tell the mixologist your flavor profile preference.' },
    { title: 'Artisanal Bakery & Organic Matcha Bar', category: 'Foodie', duration: '1 hr', cost: { Low: 6, Medium: 14, High: 22 }, tip: 'Grab a flaky chocolate pastry fresh from the oven.' },
  ],
  Culture: [
    { title: 'Heritage Architecture Photo Walk', category: 'Culture', duration: '1.5 hrs', cost: { Low: 0, Medium: 0, High: 15 }, tip: 'Look up at ornamental cornices and hidden alleys.' },
    { title: 'Independent Indie Bookstore & Zine Press', category: 'Culture', duration: '1 hr', cost: { Low: 0, Medium: 15, High: 30 }, tip: 'Browse the local staff-recommended shelf.' },
    { title: 'Community Clay / Pottery Studio Session', category: 'Culture', duration: '2 hrs', cost: { Low: 15, Medium: 35, High: 65 }, tip: 'Great tactile break from city sightseeing.' },
  ],
  Adventure: [
    { title: 'Hidden Sea Cave / Rock Pool Exploration', category: 'Adventure', duration: '2 hrs', cost: { Low: 0, Medium: 15, High: 40 }, tip: 'Check the tide chart beforehand for safe entry.' },
    { title: 'Sunset Bouldering or Climbing Gym Drop-In', category: 'Adventure', duration: '2 hrs', cost: { Low: 14, Medium: 25, High: 45 }, tip: 'Shoe rental is usually included in day passes.' },
    { title: 'Scenic E-Scooter River Path Ride', category: 'Adventure', duration: '1 hr', cost: { Low: 8, Medium: 16, High: 30 }, tip: 'Keep to designated bike lanes and wear a helmet.' },
  ],
  Relaxation: [
    { title: 'Thermal Bath / Onsen Relaxation Soak', category: 'Relaxation', duration: '2 hrs', cost: { Low: 10, Medium: 28, High: 65 }, tip: 'Hydrate well before and after the mineral bath.' },
    { title: 'Hammock Garden & Cold Brew Reading Hour', category: 'Relaxation', duration: '1.5 hrs', cost: { Low: 4, Medium: 10, High: 20 }, tip: 'Arrive early afternoon for the quietest shade.' },
    { title: 'Sunset Beach Sound Bath / Gentle Yoga', category: 'Relaxation', duration: '1 hr', cost: { Low: 8, Medium: 18, High: 35 }, tip: 'Bring a lightweight beach towel to sit on.' },
  ],
  Shopping: [
    { title: 'Weekend Flea Market & Antique Curiosities', category: 'Shopping', duration: '2 hrs', cost: { Low: 0, Medium: 20, High: 60 }, tip: 'Polite bargaining is welcomed at antique stalls.' },
    { title: 'Local Designer Pop-Up & Concept Studio', category: 'Shopping', duration: '1.5 hrs', cost: { Low: 0, Medium: 30, High: 80 }, tip: 'Look for one-off studio sample pieces.' },
    { title: 'Stationery & Ceramic Craft Haven', category: 'Shopping', duration: '1 hr', cost: { Low: 5, Medium: 18, High: 40 }, tip: 'High quality compact souvenirs that fit easily in a carry-on.' },
  ],
};
