export type BudgetTier = 'Low' | 'Medium' | 'High';

export type TravelStyle = 'Foodie' | 'Culture' | 'Adventure' | 'Relaxation' | 'Shopping';

export type TripType = 'Solo' | 'Couple' | 'Friends' | 'Family';

export type TravelPace = 'Relaxed' | 'Balanced' | 'Packed';

export interface TripPreferences {
  destination: string;
  numberOfDays: number;
  budget: BudgetTier;
  travelStyle: TravelStyle;
  tripType: TripType;
  travelPace: TravelPace;
}

export interface ItineraryActivity {
  id: string;
  dayNumber: number;
  time: string;
  activity: string;
  location: string;
  description: string;
  estimatedCost: number;
  costDisplay: string;
  duration: string;
  category: TravelStyle | 'Dining' | 'Nightlife' | 'Sightseeing' | 'Transport';
  insiderTip?: string;
  isCompleted?: boolean;
  highlightTag?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  theme: string;
  dateLabel: string;
  activities: ItineraryActivity[];
  dayCost: number;
}

export interface CostBreakdown {
  activities: number;
  dining: number;
  transit: number;
  estimatedLodging: number;
  total: number;
}

export interface GeneratedItinerary {
  id: string;
  destination: string;
  destinationTagline: string;
  destinationImage: string;
  numberOfDays: number;
  budget: BudgetTier;
  travelStyle: TravelStyle;
  tripType: TripType;
  travelPace: TravelPace;
  totalEstimatedCost: number;
  costBreakdown: CostBreakdown;
  days: ItineraryDay[];
  travelTips: string[];
}

export interface PopularDestination {
  name: string;
  country: string;
  imageUrl: string;
  tagline: string;
  highlightStyle: TravelStyle;
  typicalCostLow: number;
}
