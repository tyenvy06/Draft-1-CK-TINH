import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Sparkles,
  ArrowLeft,
  Share2,
  Printer,
  RotateCcw,
  CheckCircle2,
  Circle,
  Shuffle,
  Info,
  ChevronDown,
  ChevronUp,
  Tag,
  Compass,
  UtensilsCrossed,
  Landmark,
  Mountain,
  Palmtree,
  ShoppingBag,
  ExternalLink,
  Flame,
  Wallet,
  Users,
  Zap,
} from 'lucide-react';
import {
  GeneratedItinerary,
  ItineraryDay,
  ItineraryActivity,
  TravelStyle,
} from '../types';
import { ALTERNATIVE_ACTIVITIES } from '../data/mockData';

interface ItineraryPageProps {
  itinerary: GeneratedItinerary;
  onEditPreferences: () => void;
  onReset: () => void;
}

const STYLE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Foodie: UtensilsCrossed,
  Culture: Landmark,
  Adventure: Mountain,
  Relaxation: Palmtree,
  Shopping: ShoppingBag,
  Dining: UtensilsCrossed,
  Sightseeing: Compass,
  Nightlife: Flame,
};

export const ItineraryPage: React.FC<ItineraryPageProps> = ({
  itinerary: initialItinerary,
  onEditPreferences,
  onReset,
}) => {
  const [itinerary, setItinerary] = useState<GeneratedItinerary>(initialItinerary);
  const [activeDayFilter, setActiveDayFilter] = useState<number | 'all'>('all');
  const [showCostDetails, setShowCostDetails] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [swappingActivityId, setSwappingActivityId] = useState<string | null>(null);

  // Toggle activity completed state
  const handleToggleCompleted = (activityId: string) => {
    setItinerary((prev) => {
      const updatedDays = prev.days.map((day) => ({
        ...day,
        activities: day.activities.map((act) =>
          act.id === activityId ? { ...act, isCompleted: !act.isCompleted } : act
        ),
      }));
      return { ...prev, days: updatedDays };
    });
  };

  // Swap activity with an alternative
  const handleSwapActivity = (dayNumber: number, activityId: string, category: TravelStyle) => {
    const alternatives = ALTERNATIVE_ACTIVITIES[category] || ALTERNATIVE_ACTIVITIES.Foodie;
    const randomIndex = Math.floor(Math.random() * alternatives.length);
    const chosen = alternatives[randomIndex];

    const newCost = chosen.cost[itinerary.budget];

    setItinerary((prev) => {
      const updatedDays = prev.days.map((day) => {
        if (day.dayNumber !== dayNumber) return day;

        const updatedActs = day.activities.map((act) => {
          if (act.id !== activityId) return act;
          return {
            ...act,
            activity: chosen.title,
            duration: chosen.duration,
            estimatedCost: newCost,
            costDisplay: newCost === 0 ? 'Free' : `$${newCost}`,
            category: chosen.category,
            insiderTip: chosen.tip,
            highlightTag: 'Swapped Choice',
          };
        });

        const newDayCost = updatedActs.reduce((sum, item) => sum + item.estimatedCost, 0);
        return {
          ...day,
          activities: updatedActs,
          dayCost: newDayCost,
        };
      });

      // Recalculate total
      const newTotal = updatedDays.reduce((sum, d) => sum + d.dayCost, 0) +
        prev.costBreakdown.transit +
        prev.costBreakdown.estimatedLodging;

      return {
        ...prev,
        days: updatedDays,
        totalEstimatedCost: newTotal,
      };
    });

    setSwappingActivityId(null);
  };

  // Copy plain text / markdown itinerary to clipboard
  const handleCopyItinerary = () => {
    let text = `TRIPTAILOR ITINERARY: ${itinerary.destination.toUpperCase()}\n`;
    text += `Duration: ${itinerary.numberOfDays} Days | Budget: ${itinerary.budget} | Style: ${itinerary.travelStyle} | Pace: ${itinerary.travelPace} | Squad: ${itinerary.tripType}\n`;
    text += `Total Estimated Cost: ~$${itinerary.totalEstimatedCost} USD\n\n`;

    itinerary.days.forEach((day) => {
      text += `--- DAY ${day.dayNumber}: ${day.theme} (Est: $${day.dayCost}) ---\n`;
      day.activities.forEach((act) => {
        text += `• [${act.time}] ${act.activity} (${act.duration}, ${act.costDisplay})\n`;
        text += `  Location: ${act.location}\n`;
        text += `  ${act.description}\n`;
        if (act.insiderTip) text += `  Tip: ${act.insiderTip}\n`;
      });
      text += `\n`;
    });

    text += `Generated with TripTailor • Smart Trip Planner for Young Explorers`;

    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const displayedDays =
    activeDayFilter === 'all'
      ? itinerary.days
      : itinerary.days.filter((d) => d.dayNumber === activeDayFilter);

  const completedCount = itinerary.days.reduce(
    (acc, d) => acc + d.activities.filter((a) => a.isCompleted).length,
    0
  );
  const totalActivitiesCount = itinerary.days.reduce((acc, d) => acc + d.activities.length, 0);

  return (
    <div id="itinerary-page-root" className="pb-24">
      {/* Toast Notification */}
      {copyFeedback && (
        <div
          id="copy-toast"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-[#141A22] px-5 py-3 text-sm font-bold text-white shadow-2xl animate-fade-in"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Itinerary copied to clipboard!</span>
        </div>
      )}

      {/* Top Controls Bar */}
      <div className="border-b border-[#EAE7DF] bg-white py-3.5 print:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            id="itinerary-edit-pref-btn"
            type="button"
            onClick={onEditPreferences}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#737A84] hover:text-[#141A22] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Modify Preferences</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="copy-itinerary-btn"
              type="button"
              onClick={handleCopyItinerary}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#DDD8CB] bg-[#FAF9F5] px-3 py-1.5 text-xs font-bold text-[#141A22] hover:border-[#141A22] transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Share / Copy</span>
            </button>

            <button
              id="print-itinerary-btn"
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#DDD8CB] bg-[#FAF9F5] px-3 py-1.5 text-xs font-bold text-[#141A22] hover:border-[#141A22] transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              id="restart-itinerary-btn"
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#141A22] px-3 py-1.5 text-xs font-bold text-white hover:bg-black transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5 text-[#FF5C39]" />
              <span className="hidden sm:inline">New Trip</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header with Large Travel Image */}
      <section id="itinerary-hero" className="relative bg-[#141A22] text-white">
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src={itinerary.destinationImage}
            alt={itinerary.destination}
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#141A22] via-[#141A22]/40 to-transparent" />

          {/* Hero Content Overlay */}
          <div className="absolute bottom-6 left-0 right-0">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-white mb-2">
                <Sparkles className="h-3.5 w-3.5 text-[#FF8566]" />
                <span>Personalized Day-by-Day Itinerary</span>
              </div>

              <h1
                id="itinerary-destination-title"
                className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white"
              >
                {itinerary.destination}
              </h1>
              <p className="mt-2 text-sm text-gray-200 max-w-2xl sm:text-base">
                {itinerary.destinationTagline}
              </p>
            </div>
          </div>
        </div>

        {/* Required Overview Stats Bar */}
        <div className="border-t border-white/10 bg-[#141A22]/95 backdrop-blur-md py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              id="trip-summary-stats"
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
            >
              {/* Stat 1: Total Estimated Cost */}
              <div
                id="stat-total-cost"
                className="rounded-xl bg-white/5 p-3 border border-white/10"
              >
                <div className="flex items-center justify-between text-xs font-medium text-gray-400">
                  <span>Total Est. Trip Cost</span>
                  <button
                    type="button"
                    onClick={() => setShowCostDetails(!showCostDetails)}
                    className="text-[#FF8566] hover:underline text-[11px] font-bold"
                  >
                    Breakdown
                  </button>
                </div>
                <div className="mt-1 font-display text-xl sm:text-2xl font-black text-[#FF8566]">
                  ~${itinerary.totalEstimatedCost}
                </div>
                <div className="text-[10px] text-gray-400">
                  Incl. activities, meals, transit & stay
                </div>
              </div>

              {/* Stat 2: Destination & Days */}
              <div
                id="stat-destination-days"
                className="rounded-xl bg-white/5 p-3 border border-white/10"
              >
                <div className="text-xs font-medium text-gray-400">Destination & Duration</div>
                <div className="mt-1 font-display text-lg sm:text-xl font-bold text-white truncate">
                  {itinerary.destination}
                </div>
                <div className="text-[11px] font-bold text-gray-300">
                  {itinerary.numberOfDays} {itinerary.numberOfDays === 1 ? 'Day' : 'Days'} Itinerary
                </div>
              </div>

              {/* Stat 3: Budget Level */}
              <div
                id="stat-budget-level"
                className="rounded-xl bg-white/5 p-3 border border-white/10"
              >
                <div className="text-xs font-medium text-gray-400">Budget Level</div>
                <div className="mt-1 font-display text-lg sm:text-xl font-bold text-white">
                  {itinerary.budget}
                </div>
                <div className="text-[11px] text-gray-300">
                  {itinerary.budget === 'Low' ? '$ • Smart budget' : itinerary.budget === 'Medium' ? '$$ • Balanced style' : '$$$ • Boutique upscale'}
                </div>
              </div>

              {/* Stat 4: Travel Style */}
              <div
                id="stat-travel-style"
                className="rounded-xl bg-white/5 p-3 border border-white/10"
              >
                <div className="text-xs font-medium text-gray-400">Travel Style</div>
                <div className="mt-1 font-display text-lg sm:text-xl font-bold text-white flex items-center gap-1.5">
                  <span>{itinerary.travelStyle}</span>
                </div>
                <div className="text-[11px] text-gray-300">
                  Tailored recommendations
                </div>
              </div>

              {/* Stat 5: Squad & Pace */}
              <div
                id="stat-squad-pace"
                className="rounded-xl bg-white/5 p-3 border border-white/10 col-span-2 sm:col-span-1"
              >
                <div className="text-xs font-medium text-gray-400">Crew & Energy Pace</div>
                <div className="mt-1 font-display text-lg sm:text-xl font-bold text-white">
                  {itinerary.tripType} • {itinerary.travelPace}
                </div>
                <div className="text-[11px] text-gray-300">
                  {itinerary.travelPace === 'Relaxed' ? '2 activities/day' : itinerary.travelPace === 'Balanced' ? '3–4 activities/day' : '5+ activities/day'}
                </div>
              </div>
            </div>

            {/* Expandable Cost Breakdown Drawer */}
            {showCostDetails && (
              <div
                id="cost-breakdown-panel"
                className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-lg animate-fade-in"
              >
                <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Estimated Cost Breakdown ({itinerary.numberOfDays} Days)
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCostDetails(false)}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    Close
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
                  <div className="rounded-xl bg-white/5 p-3">
                    <span className="text-gray-400">Activities & Sights</span>
                    <p className="mt-1 font-display text-base font-bold text-white">
                      ${itinerary.costBreakdown.activities}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3">
                    <span className="text-gray-400">Dining & Street Bites</span>
                    <p className="mt-1 font-display text-base font-bold text-white">
                      ${itinerary.costBreakdown.dining}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3">
                    <span className="text-gray-400">Local Transit (Metro/Rides)</span>
                    <p className="mt-1 font-display text-base font-bold text-white">
                      ${itinerary.costBreakdown.transit}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3">
                    <span className="text-gray-400">Est. Lodging ({itinerary.budget})</span>
                    <p className="mt-1 font-display text-base font-bold text-white">
                      ${itinerary.costBreakdown.estimatedLodging}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-[11px] text-gray-400">
                  Estimates are based on average youth traveler expenditures for {itinerary.destination} in 2026. Flights not included.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Itinerary Days & Activities */}
          <div className="lg:col-span-8">
            {/* Day Filter Pills */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                <button
                  id="filter-day-all"
                  type="button"
                  onClick={() => setActiveDayFilter('all')}
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all shrink-0 ${
                    activeDayFilter === 'all'
                      ? 'bg-[#141A22] text-white shadow-2xs'
                      : 'bg-white border border-[#EAE7DF] text-[#555E6C] hover:border-[#141A22]'
                  }`}
                >
                  All Days ({itinerary.numberOfDays})
                </button>

                {itinerary.days.map((day) => (
                  <button
                    key={day.dayNumber}
                    id={`filter-day-${day.dayNumber}`}
                    type="button"
                    onClick={() => setActiveDayFilter(day.dayNumber)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all shrink-0 ${
                      activeDayFilter === day.dayNumber
                        ? 'bg-[#141A22] text-white shadow-2xs'
                        : 'bg-white border border-[#EAE7DF] text-[#555E6C] hover:border-[#141A22]'
                    }`}
                  >
                    Day {day.dayNumber}
                  </button>
                ))}
              </div>

              {/* Progress counter */}
              <div className="flex items-center gap-2 text-xs font-bold text-[#737A84]">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>
                  {completedCount}/{totalActivitiesCount} spots checked off
                </span>
              </div>
            </div>

            {/* Day Schedule List */}
            <div className="space-y-8">
              {displayedDays.map((day) => (
                <div
                  key={day.dayNumber}
                  id={`day-container-${day.dayNumber}`}
                  className="rounded-3xl border border-[#EAE7DF] bg-white p-5 sm:p-7 shadow-2xs"
                >
                  {/* Day Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#EAE7DF] gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF5C39] text-white font-display text-sm font-black shadow-2xs">
                        D{day.dayNumber}
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#FF5C39]">
                          {day.dateLabel}
                        </div>
                        <h2 className="font-display text-lg sm:text-xl font-bold text-[#141A22]">
                          {day.theme}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-bold text-[#737A84]">
                      <span className="rounded-lg bg-[#FAF9F5] px-2.5 py-1 border border-[#EAE7DF]">
                        Est. Day Cost: <strong className="text-[#141A22]">${day.dayCost}</strong>
                      </span>
                      <span>{day.activities.length} activities</span>
                    </div>
                  </div>

                  {/* Activities Timeline */}
                  <div className="mt-6 space-y-4">
                    {day.activities.map((activity, index) => {
                      const IconComponent = STYLE_ICONS[activity.category] || Compass;

                      return (
                        <div
                          key={activity.id}
                          id={`activity-card-${activity.id}`}
                          className={`group relative rounded-2xl border transition-all duration-200 p-4 sm:p-5 ${
                            activity.isCompleted
                              ? 'border-emerald-200 bg-emerald-50/30'
                              : 'border-[#EAE7DF] bg-[#FAF9F6] hover:border-[#D1CCC0] hover:bg-white'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            {/* Left: Time and Title */}
                            <div className="flex items-start gap-3">
                              {/* Checkbox */}
                              <button
                                id={`toggle-check-${activity.id}`}
                                type="button"
                                onClick={() => handleToggleCompleted(activity.id)}
                                className="mt-1 text-[#A8A398] hover:text-emerald-600 transition-colors"
                                title="Mark as visited / done"
                              >
                                {activity.isCompleted ? (
                                  <CheckCircle2 className="h-5 w-5 text-emerald-600 fill-emerald-100" />
                                ) : (
                                  <Circle className="h-5 w-5" />
                                )}
                              </button>

                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  {/* Time */}
                                  <span className="inline-flex items-center gap-1 rounded-md bg-[#141A22] px-2 py-0.5 text-xs font-bold text-white">
                                    <Clock className="h-3 w-3 text-[#FF5C39]" />
                                    <span>{activity.time}</span>
                                  </span>

                                  {/* Category */}
                                  <span className="inline-flex items-center gap-1 rounded-md bg-white border border-[#DDD8CB] px-2 py-0.5 text-[11px] font-bold text-[#555E6C]">
                                    <IconComponent className="h-3 w-3 text-[#FF5C39]" />
                                    <span>{activity.category}</span>
                                  </span>

                                  {activity.highlightTag && (
                                    <span className="rounded-md bg-[#FF5C39]/10 px-2 py-0.5 text-[10px] font-bold text-[#FF5C39]">
                                      {activity.highlightTag}
                                    </span>
                                  )}
                                </div>

                                {/* Activity Title */}
                                <h3
                                  className={`mt-2 font-display text-base sm:text-lg font-bold ${
                                    activity.isCompleted
                                      ? 'text-emerald-900 line-through'
                                      : 'text-[#141A22]'
                                  }`}
                                >
                                  {activity.activity}
                                </h3>

                                {/* Location */}
                                <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[#737A84]">
                                  <MapPin className="h-3.5 w-3.5 text-[#FF5C39] shrink-0" />
                                  <span>{activity.location}</span>
                                </div>
                              </div>
                            </div>

                            {/* Right: Cost & Duration Badges */}
                            <div className="flex sm:flex-col sm:items-end items-center justify-between gap-2 border-t sm:border-t-0 border-[#EAE7DF] pt-2 sm:pt-0">
                              <div className="text-right">
                                <span className="text-[10px] font-medium text-[#737A84] block sm:inline">
                                  Est. Cost:{' '}
                                </span>
                                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-extrabold text-emerald-800 border border-emerald-200">
                                  {activity.costDisplay}
                                </span>
                              </div>

                              <div className="text-right text-xs font-semibold text-[#737A84]">
                                <span>Duration: {activity.duration}</span>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="mt-3 text-xs sm:text-sm text-[#555E6C] leading-relaxed">
                            {activity.description}
                          </p>

                          {/* Insider Tip Box */}
                          {activity.insiderTip && (
                            <div className="mt-3.5 flex items-start gap-2 rounded-xl bg-white border border-[#EAE7DF] p-3 text-xs text-[#555E6C]">
                              <Info className="h-4 w-4 text-[#FF5C39] shrink-0 mt-0.5" />
                              <div>
                                <strong className="font-bold text-[#141A22]">Insider Tip:</strong>{' '}
                                {activity.insiderTip}
                              </div>
                            </div>
                          )}

                          {/* Swap button */}
                          <div className="mt-3 flex justify-end print:hidden">
                            <button
                              id={`swap-act-btn-${activity.id}`}
                              type="button"
                              onClick={() =>
                                handleSwapActivity(day.dayNumber, activity.id, itinerary.travelStyle)
                              }
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#737A84] hover:text-[#FF5C39] transition-colors"
                            >
                              <Shuffle className="h-3 w-3" />
                              <span>Swap with alternative</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Trip Sidebar, Route Map, & Young Traveler Tips */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Trip Overview Card */}
            <div
              id="itinerary-summary-widget"
              className="rounded-3xl border border-[#EAE7DF] bg-white p-6 shadow-2xs sticky top-20"
            >
              <h3 className="font-display text-lg font-bold text-[#141A22] mb-4">
                Trip Parameters
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-[#EAE7DF]">
                  <span className="text-[#737A84]">Selected Destination</span>
                  <strong className="text-[#141A22]">{itinerary.destination}</strong>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#EAE7DF]">
                  <span className="text-[#737A84]">Number of Days</span>
                  <strong className="text-[#141A22]">{itinerary.numberOfDays} Days</strong>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#EAE7DF]">
                  <span className="text-[#737A84]">Budget Tier</span>
                  <strong className="text-[#141A22]">{itinerary.budget} ($)</strong>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#EAE7DF]">
                  <span className="text-[#737A84]">Travel Style</span>
                  <strong className="text-[#141A22]">{itinerary.travelStyle}</strong>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#EAE7DF]">
                  <span className="text-[#737A84]">Crew Type</span>
                  <strong className="text-[#141A22]">{itinerary.tripType}</strong>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#EAE7DF]">
                  <span className="text-[#737A84]">Pace Intensity</span>
                  <strong className="text-[#141A22]">{itinerary.travelPace}</strong>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-bold text-[#141A22]">Total Est. Cost</span>
                  <span className="font-display text-lg font-black text-[#FF5C39]">
                    ${itinerary.totalEstimatedCost}
                  </span>
                </div>
              </div>

              {/* Action button */}
              <button
                id="sidebar-edit-preferences-btn"
                type="button"
                onClick={onEditPreferences}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[#DDD8CB] bg-[#FAF9F5] py-2.5 text-xs font-bold text-[#141A22] hover:border-[#141A22] transition-colors"
              >
                <span>Adjust Trip Settings</span>
              </button>
            </div>

            {/* Young Traveler Tips Card */}
            <div
              id="youth-travel-tips-card"
              className="rounded-3xl border border-[#EAE7DF] bg-[#FAF9F5] p-6 shadow-2xs"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF5C39] mb-3">
                <Sparkles className="h-4 w-4" />
                <span>TripTailor Pro Tips</span>
              </div>

              <h4 className="font-display text-base font-bold text-[#141A22] mb-3">
                Tips for {itinerary.destination}
              </h4>

              <ul className="space-y-3 text-xs text-[#555E6C]">
                {itinerary.travelTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5C39]" />
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Packing & Transit Checklist */}
            <div
              id="transit-packing-card"
              className="rounded-3xl border border-[#EAE7DF] bg-white p-6 shadow-2xs"
            >
              <h4 className="font-display text-base font-bold text-[#141A22] mb-3">
                Essential Young Traveler Kit
              </h4>
              <div className="space-y-2 text-xs text-[#555E6C]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Portable power bank (10,000mAh+) for maps & photos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Zero-fee foreign transaction debit/credit card</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Offline Google Maps downloaded onto your phone</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Digital copies of passport and reservations in cloud</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
