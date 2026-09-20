import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  DollarSign,
  Compass,
  Users,
  User,
  Heart,
  Home,
  Zap,
  Coffee,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  UtensilsCrossed,
  Landmark,
  Mountain,
  Palmtree,
  ShoppingBag,
  Check,
  Flame,
} from 'lucide-react';
import {
  TripPreferences,
  BudgetTier,
  TravelStyle,
  TripType,
  TravelPace,
} from '../types';

interface PreferencesPageProps {
  initialPreferences: TripPreferences;
  onSubmit: (preferences: TripPreferences) => void;
  onBack: () => void;
}

const QUICK_DESTINATIONS = [
  'Tokyo',
  'Barcelona',
  'Bali',
  'Mexico City',
  'Seoul',
  'Paris',
  'Rome',
  'New York',
  'Bangkok',
  'Amsterdam',
];

const BUDGET_OPTIONS: Array<{
  value: BudgetTier;
  label: string;
  symbol: string;
  desc: string;
  estimate: string;
}> = [
  {
    value: 'Low',
    label: 'Low',
    symbol: '$',
    desc: 'Hostels, street food stalls, metro transit, and free cultural sights.',
    estimate: '~$35–$65 / day',
  },
  {
    value: 'Medium',
    label: 'Medium',
    symbol: '$$',
    desc: 'Stylish boutique stays, top-rated casual bistros, and curated entry passes.',
    estimate: '~$80–$140 / day',
  },
  {
    value: 'High',
    label: 'High',
    symbol: '$$$',
    desc: 'Designer hotel lofts, fine dining reservations, private rides, and VIP passes.',
    estimate: '~$180–$320+ / day',
  },
];

const TRAVEL_STYLES: Array<{
  value: TravelStyle;
  label: string;
  icon: React.FC<{ className?: string }>;
  desc: string;
}> = [
  {
    value: 'Foodie',
    label: 'Foodie',
    icon: UtensilsCrossed,
    desc: 'Street markets, trending bakeries, local hole-in-the-walls, and culinary crawls.',
  },
  {
    value: 'Culture',
    label: 'Culture',
    icon: Landmark,
    desc: 'Historic districts, independent galleries, architectural icons, and heritage arts.',
  },
  {
    value: 'Adventure',
    label: 'Adventure',
    icon: Mountain,
    desc: 'Panoramic summit hikes, e-bike cruises, water sports, and thrill viewpoints.',
  },
  {
    value: 'Relaxation',
    label: 'Relaxation',
    icon: Palmtree,
    desc: 'Slow cafe mornings, scenic beach clubs, lush gardens, and sunset picnics.',
  },
  {
    value: 'Shopping',
    label: 'Shopping',
    icon: ShoppingBag,
    desc: 'Curated vintage thrift shops, local designer concept stores, and night markets.',
  },
];

const TRIP_TYPES: Array<{
  value: TripType;
  label: string;
  icon: React.FC<{ className?: string }>;
  desc: string;
}> = [
  {
    value: 'Solo',
    label: 'Solo',
    icon: User,
    desc: 'Independent explorer, social cafes, walkable neighborhoods, and flexible stops.',
  },
  {
    value: 'Couple',
    label: 'Couple',
    icon: Heart,
    desc: 'Scenic sunset spots, cozy romantic bistros, and unforgettable strolls.',
  },
  {
    value: 'Friends',
    label: 'Friends',
    icon: Users,
    desc: 'Group dining feasts, vibrant nightlife, shared adventures, and photo moments.',
  },
  {
    value: 'Family',
    label: 'Family',
    icon: Home,
    desc: 'Comfortable transit, all-ages interactive activities, and balanced downtime.',
  },
];

const TRAVEL_PACES: Array<{
  value: TravelPace;
  label: string;
  icon: React.FC<{ className?: string }>;
  paceCount: string;
  desc: string;
}> = [
  {
    value: 'Relaxed',
    label: 'Relaxed',
    icon: Coffee,
    paceCount: '2 activities / day',
    desc: 'Late morning starts, long unhurried lunches, and plenty of wandering downtime.',
  },
  {
    value: 'Balanced',
    label: 'Balanced',
    icon: Compass,
    paceCount: '3–4 activities / day',
    desc: 'The goldilocks pace: great balance of must-see highlights and relaxed breaks.',
  },
  {
    value: 'Packed',
    label: 'Packed',
    icon: Zap,
    paceCount: '5+ activities / day',
    desc: 'Sunrise to midnight: maximize every hour with non-stop exploration and action.',
  },
];

export const PreferencesPage: React.FC<PreferencesPageProps> = ({
  initialPreferences,
  onSubmit,
  onBack,
}) => {
  const [destination, setDestination] = useState(initialPreferences.destination || 'Tokyo');
  const [numberOfDays, setNumberOfDays] = useState(initialPreferences.numberOfDays || 5);
  const [budget, setBudget] = useState<BudgetTier>(initialPreferences.budget || 'Medium');
  const [travelStyle, setTravelStyle] = useState<TravelStyle>(initialPreferences.travelStyle || 'Foodie');
  const [tripType, setTripType] = useState<TripType>(initialPreferences.tripType || 'Friends');
  const [travelPace, setTravelPace] = useState<TravelPace>(initialPreferences.travelPace || 'Balanced');
  const [destError, setDestError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      setDestError('Please enter or select a destination city.');
      return;
    }
    setDestError('');
    onSubmit({
      destination: destination.trim(),
      numberOfDays,
      budget,
      travelStyle,
      tripType,
      travelPace,
    });
  };

  const handleQuickDestSelect = (city: string) => {
    setDestination(city);
    setDestError('');
  };

  return (
    <div id="preferences-page-root" className="py-8 sm:py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          id="back-to-landing-btn"
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#737A84] hover:text-[#141A22] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Overview</span>
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5C39]/10 px-3 py-1 text-xs font-bold text-[#FF5C39] mb-3">
            <Sparkles className="h-3 w-3" />
            <span>Step 2 of 3 • Tailor Your Trip</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-[#141A22] sm:text-4xl">
            Tell us how you like to travel
          </h1>
          <p className="mt-2 text-sm text-[#555E6C]">
            Set your core preferences below. We’ll generate a customized day-by-day itinerary tailored specifically to your vibe.
          </p>
        </div>

        {/* Preferences Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Destination Input */}
          <div
            id="pref-destination-card"
            className="rounded-2xl border border-[#EAE7DF] bg-white p-6 sm:p-7 shadow-2xs"
          >
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="destination-input" className="flex items-center gap-2 text-sm font-extrabold text-[#141A22]">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF5C39]/10 text-[#FF5C39]">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>1. Where do you want to go?</span>
              </label>
              <span className="text-[11px] font-bold text-[#737A84]">Required</span>
            </div>

            <div className="relative">
              <input
                id="destination-input"
                type="text"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  if (destError) setDestError('');
                }}
                placeholder="e.g. Tokyo, Barcelona, Bali, Mexico City, London..."
                className={`w-full rounded-xl border px-4 py-3.5 text-base font-semibold text-[#141A22] placeholder:text-[#A8A398] focus:outline-none focus:ring-2 focus:ring-[#FF5C39] ${
                  destError ? 'border-rose-500 bg-rose-50/20' : 'border-[#DDD8CB] bg-[#FAF9F5]'
                }`}
              />
              {destError && (
                <p className="mt-2 text-xs font-semibold text-rose-600">{destError}</p>
              )}
            </div>

            {/* Quick popular chips */}
            <div className="mt-4">
              <span className="text-xs font-semibold text-[#737A84]">Popular destinations:</span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {QUICK_DESTINATIONS.map((city) => {
                  const isSelected = destination.toLowerCase() === city.toLowerCase();
                  return (
                    <button
                      key={city}
                      id={`quick-dest-${city.toLowerCase()}`}
                      type="button"
                      onClick={() => handleQuickDestSelect(city)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                        isSelected
                          ? 'bg-[#141A22] text-white shadow-2xs'
                          : 'bg-[#F0EDE5] text-[#555E6C] hover:bg-[#E4E0D5] hover:text-[#141A22]'
                      }`}
                    >
                      {city}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. Number of Days */}
          <div
            id="pref-days-card"
            className="rounded-2xl border border-[#EAE7DF] bg-white p-6 sm:p-7 shadow-2xs"
          >
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-2 text-sm font-extrabold text-[#141A22]">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF5C39]/10 text-[#FF5C39]">
                  <Calendar className="h-4 w-4" />
                </div>
                <span>2. Number of Days</span>
              </label>
              <span className="text-sm font-black text-[#FF5C39]">
                {numberOfDays} {numberOfDays === 1 ? 'Day' : 'Days'} Trip
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center rounded-xl border border-[#DDD8CB] bg-[#FAF9F5] p-1 w-fit">
                <button
                  id="days-decrement-btn"
                  type="button"
                  onClick={() => setNumberOfDays(Math.max(1, numberOfDays - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-[#141A22] hover:bg-[#EAE7DF] active:scale-95 transition-all"
                  aria-label="Decrease days"
                >
                  -
                </button>
                <div className="w-16 text-center font-display text-lg font-black text-[#141A22]">
                  {numberOfDays}
                </div>
                <button
                  id="days-increment-btn"
                  type="button"
                  onClick={() => setNumberOfDays(Math.min(14, numberOfDays + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-[#141A22] hover:bg-[#EAE7DF] active:scale-95 transition-all"
                  aria-label="Increase days"
                >
                  +
                </button>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-2">
                {[3, 5, 7, 10].map((daysCount) => (
                  <button
                    key={daysCount}
                    id={`days-preset-${daysCount}`}
                    type="button"
                    onClick={() => setNumberOfDays(daysCount)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                      numberOfDays === daysCount
                        ? 'bg-[#141A22] text-white shadow-2xs'
                        : 'border border-[#DDD8CB] bg-[#FAF9F5] text-[#555E6C] hover:border-[#141A22] hover:text-[#141A22]'
                    }`}
                  >
                    {daysCount} Days
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-3 text-xs text-[#737A84]">
              Ideal sweet spot for young travelers is typically 3 to 7 days for a single metropolitan area.
            </p>
          </div>

          {/* 3. Budget Tier */}
          <div
            id="pref-budget-card"
            className="rounded-2xl border border-[#EAE7DF] bg-white p-6 sm:p-7 shadow-2xs"
          >
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-2 text-sm font-extrabold text-[#141A22]">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF5C39]/10 text-[#FF5C39]">
                  <DollarSign className="h-4 w-4" />
                </div>
                <span>3. Budget Level</span>
              </label>
              <span className="text-xs font-bold text-[#737A84]">Selected: {budget}</span>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              {BUDGET_OPTIONS.map((opt) => {
                const isSelected = budget === opt.value;
                return (
                  <button
                    key={opt.value}
                    id={`budget-option-${opt.value.toLowerCase()}`}
                    type="button"
                    onClick={() => setBudget(opt.value)}
                    className={`relative flex flex-col rounded-xl p-4 text-left transition-all border ${
                      isSelected
                        ? 'border-[#FF5C39] bg-[#FFF8F6] shadow-sm'
                        : 'border-[#EAE7DF] bg-[#FAF9F6] hover:border-[#D1CCC0] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display text-lg font-black text-[#141A22]">
                        {opt.label}
                      </span>
                      <span
                        className={`rounded-lg px-2 py-0.5 text-xs font-black ${
                          isSelected ? 'bg-[#FF5C39] text-white' : 'bg-[#EAE7DF] text-[#737A84]'
                        }`}
                      >
                        {opt.symbol}
                      </span>
                    </div>
                    <p className="text-xs text-[#555E6C] leading-relaxed flex-1">
                      {opt.desc}
                    </p>
                    <div className="mt-3 border-t border-[#EAE7DF]/80 pt-2 text-[11px] font-bold text-[#141A22]">
                      {opt.estimate}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Travel Style */}
          <div
            id="pref-style-card"
            className="rounded-2xl border border-[#EAE7DF] bg-white p-6 sm:p-7 shadow-2xs"
          >
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-2 text-sm font-extrabold text-[#141A22]">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF5C39]/10 text-[#FF5C39]">
                  <Compass className="h-4 w-4" />
                </div>
                <span>4. Travel Style</span>
              </label>
              <span className="text-xs font-bold text-[#737A84]">Selected: {travelStyle}</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {TRAVEL_STYLES.map((style) => {
                const isSelected = travelStyle === style.value;
                const StyleIcon = style.icon;
                return (
                  <button
                    key={style.value}
                    id={`style-option-${style.value.toLowerCase()}`}
                    type="button"
                    onClick={() => setTravelStyle(style.value)}
                    className={`flex items-start gap-3 rounded-xl p-3.5 text-left transition-all border ${
                      isSelected
                        ? 'border-[#FF5C39] bg-[#FFF8F6] shadow-sm'
                        : 'border-[#EAE7DF] bg-[#FAF9F6] hover:border-[#D1CCC0] hover:bg-white'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        isSelected ? 'bg-[#FF5C39] text-white' : 'bg-[#EFECE4] text-[#555E6C]'
                      }`}
                    >
                      <StyleIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-sm font-bold text-[#141A22]">
                          {style.label}
                        </span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-[#FF5C39]" />}
                      </div>
                      <p className="mt-1 text-xs text-[#555E6C] line-clamp-2 leading-relaxed">
                        {style.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Trip Type */}
          <div
            id="pref-type-card"
            className="rounded-2xl border border-[#EAE7DF] bg-white p-6 sm:p-7 shadow-2xs"
          >
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-2 text-sm font-extrabold text-[#141A22]">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF5C39]/10 text-[#FF5C39]">
                  <Users className="h-4 w-4" />
                </div>
                <span>5. Trip Type</span>
              </label>
              <span className="text-xs font-bold text-[#737A84]">Selected: {tripType}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TRIP_TYPES.map((type) => {
                const isSelected = tripType === type.value;
                const TypeIcon = type.icon;
                return (
                  <button
                    key={type.value}
                    id={`type-option-${type.value.toLowerCase()}`}
                    type="button"
                    onClick={() => setTripType(type.value)}
                    className={`flex flex-col items-center rounded-xl p-4 text-center transition-all border ${
                      isSelected
                        ? 'border-[#FF5C39] bg-[#FFF8F6] shadow-sm'
                        : 'border-[#EAE7DF] bg-[#FAF9F6] hover:border-[#D1CCC0] hover:bg-white'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        isSelected ? 'bg-[#FF5C39] text-white' : 'bg-[#EFECE4] text-[#555E6C]'
                      }`}
                    >
                      <TypeIcon className="h-5 w-5" />
                    </div>
                    <span className="mt-2.5 font-display text-sm font-bold text-[#141A22]">
                      {type.label}
                    </span>
                    <p className="mt-1 text-[11px] text-[#737A84] line-clamp-2">
                      {type.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. Travel Pace */}
          <div
            id="pref-pace-card"
            className="rounded-2xl border border-[#EAE7DF] bg-white p-6 sm:p-7 shadow-2xs"
          >
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-2 text-sm font-extrabold text-[#141A22]">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF5C39]/10 text-[#FF5C39]">
                  <Zap className="h-4 w-4" />
                </div>
                <span>6. Travel Pace</span>
              </label>
              <span className="text-xs font-bold text-[#737A84]">Selected: {travelPace}</span>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              {TRAVEL_PACES.map((pace) => {
                const isSelected = travelPace === pace.value;
                const PaceIcon = pace.icon;
                return (
                  <button
                    key={pace.value}
                    id={`pace-option-${pace.value.toLowerCase()}`}
                    type="button"
                    onClick={() => setTravelPace(pace.value)}
                    className={`flex flex-col rounded-xl p-4 text-left transition-all border ${
                      isSelected
                        ? 'border-[#FF5C39] bg-[#FFF8F6] shadow-sm'
                        : 'border-[#EAE7DF] bg-[#FAF9F6] hover:border-[#D1CCC0] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <PaceIcon className={`h-4 w-4 ${isSelected ? 'text-[#FF5C39]' : 'text-[#737A84]'}`} />
                        <span className="font-display text-base font-black text-[#141A22]">
                          {pace.label}
                        </span>
                      </div>
                      <span className="rounded bg-[#EAE7DF] px-2 py-0.5 text-[10px] font-bold text-[#555E6C]">
                        {pace.paceCount}
                      </span>
                    </div>
                    <p className="text-xs text-[#555E6C] leading-relaxed">
                      {pace.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sticky / Primary Submit Action Card */}
          <div
            id="generate-action-bar"
            className="rounded-2xl border border-[#141A22] bg-[#141A22] p-6 text-white shadow-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[#FF5C39] px-2 py-0.5 text-[11px] font-black uppercase text-white">
                    Ready to Generate
                  </span>
                  <span className="text-xs text-gray-300">
                    {destination} • {numberOfDays} Days • {budget} Budget • {travelStyle}
                  </span>
                </div>
                <h3 className="mt-1 font-display text-xl font-bold">
                  Create your tailored itinerary
                </h3>
              </div>

              <button
                id="generate-trip-submit-btn"
                type="submit"
                className="group flex items-center justify-center gap-2.5 rounded-xl bg-[#FF5C39] px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#E64C2A] active:scale-98 cursor-pointer"
              >
                <span>Generate Trip</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
