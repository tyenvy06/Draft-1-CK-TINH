import React from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  UtensilsCrossed,
  Landmark,
  Mountain,
  Palmtree,
  ShoppingBag,
  Clock,
  Wallet,
  Users,
  CheckCircle2,
  Flame,
} from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../data/mockData';
import { TravelStyle } from '../types';

interface LandingPageProps {
  onStartPlanning: (destination?: string) => void;
}

const STYLE_BADGES: Record<TravelStyle, { label: string; icon: React.FC<{ className?: string }> }> = {
  Foodie: { label: 'Foodie', icon: UtensilsCrossed },
  Culture: { label: 'Culture', icon: Landmark },
  Adventure: { label: 'Adventure', icon: Mountain },
  Relaxation: { label: 'Relaxation', icon: Palmtree },
  Shopping: { label: 'Shopping', icon: ShoppingBag },
};

export const LandingPage: React.FC<LandingPageProps> = ({ onStartPlanning }) => {
  return (
    <div id="landing-page-root" className="min-h-screen">
      {/* Hero Section */}
      <section id="hero-section" className="relative overflow-hidden pt-12 pb-16 lg:pt-18 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7">
              {/* Badge */}
              <div
                id="hero-tag"
                className="inline-flex items-center gap-2 rounded-full border border-[#FF5C39]/20 bg-[#FF5C39]/10 px-3.5 py-1.5 text-xs font-bold text-[#FF5C39] shadow-2xs mb-6"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Next-Gen Travel Planning for Young Explorers</span>
              </div>

              {/* Display Headline */}
              <h1
                id="hero-headline"
                className="font-display text-4xl font-extrabold tracking-tight text-[#141A22] sm:text-5xl lg:text-6xl"
              >
                Your dream trip. <br />
                Your exact vibe. <br />
                <span className="text-[#FF5C39]">Tailored in seconds.</span>
              </h1>

              {/* Subheadline */}
              <p
                id="hero-subheadline"
                className="mt-6 max-w-xl text-lg text-[#555E6C] leading-relaxed"
              >
                Skip generic tourist buses and overwhelming spreadsheets. TripTailor crafts custom day-by-day itineraries matched to your travel crew, budget tier, and energy pace.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <button
                  id="hero-cta-primary"
                  onClick={() => onStartPlanning()}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#FF5C39] px-7 py-4 text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-[#E64C2A] hover:shadow-lg active:scale-98"
                >
                  <span>Build Your Itinerary</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>

                <a
                  href="#popular-destinations"
                  id="hero-cta-secondary"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#DDD8CB] bg-white px-6 py-4 text-base font-bold text-[#141A22] transition-colors duration-200 hover:border-[#141A22] hover:bg-[#FAF8F3]"
                >
                  <span>Explore Trending Cities</span>
                </a>
              </div>

              {/* Quick Perks */}
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[#EAE7DF] pt-8">
                <div>
                  <div className="font-display text-xl font-black text-[#141A22]">100% Free</div>
                  <div className="text-xs font-medium text-[#737A84]">No signup required</div>
                </div>
                <div>
                  <div className="font-display text-xl font-black text-[#141A22]">Real Budgets</div>
                  <div className="text-xs font-medium text-[#737A84]">Low to high estimates</div>
                </div>
                <div>
                  <div className="font-display text-xl font-black text-[#141A22]">Custom Pace</div>
                  <div className="text-xs font-medium text-[#737A84]">Relaxed to packed days</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5">
              <div
                id="hero-preview-card"
                className="relative rounded-3xl border border-[#E8E4D8] bg-white p-4 shadow-xl"
              >
                {/* Image */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80"
                    alt="Tokyo night street"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-white mb-1.5">
                      <Flame className="h-3 w-3 text-[#FF5C39]" />
                      <span>Trending Choice</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold">Tokyo, Japan</h3>
                    <p className="text-xs text-white/90">5 Days • Foodie & Culture • $68/day</p>
                  </div>
                </div>

                {/* Sample Day Card */}
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-[#737A84] px-1">
                    <span>SAMPLE ITINERARY PREVIEW</span>
                    <span className="text-[#FF5C39]">Day 1 Highlight</span>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-[#FAF9F5] p-3 border border-[#EFECE4]">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FF5C39]/10 text-[#FF5C39]">
                      <UtensilsCrossed className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#141A22]">09:30 AM • Tsukiji Street Market</span>
                        <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[11px] font-bold text-emerald-700">$12</span>
                      </div>
                      <p className="mt-1 text-xs text-[#555E6C] line-clamp-1">
                        Fresh tamago skewers, seared wagyu bites, and hot matcha before the crowds.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-[#FAF9F5] p-3 border border-[#EFECE4]">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2E7BE6]/10 text-[#2E7BE6]">
                      <Landmark className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#141A22]">01:30 PM • Akihabara Retro Hub</span>
                        <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[11px] font-bold text-emerald-700">Free</span>
                      </div>
                      <p className="mt-1 text-xs text-[#555E6C] line-clamp-1">
                        Claw arcade games, vintage gaming cartridge shops, and gachapon alleyways.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  id="preview-card-cta"
                  onClick={() => onStartPlanning('Tokyo')}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#141A22] py-2.5 text-xs font-bold text-white transition-colors hover:bg-black"
                >
                  <span>Plan Tokyo with TripTailor</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations Grid */}
      <section
        id="popular-destinations"
        className="border-t border-[#EAE7DF] bg-white py-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#FF5C39]">
                Trending Hotspots
              </div>
              <h2 className="mt-1 font-display text-3xl font-extrabold text-[#141A22] sm:text-4xl">
                Where are young travelers heading?
              </h2>
            </div>
            <p className="mt-2 text-sm text-[#737A84] md:max-w-xs">
              Select a destination to instantly load personalized recommendations for your trip.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR_DESTINATIONS.map((dest) => {
              const StyleIcon = STYLE_BADGES[dest.highlightStyle]?.icon || Compass;
              return (
                <div
                  key={dest.name}
                  id={`destination-card-${dest.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#EAE7DF] bg-[#FAF9F6] shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-[#D1CCC0] hover:shadow-md"
                >
                  {/* Photo container */}
                  <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 rounded-full bg-black/40 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white flex items-center gap-1.5">
                      <StyleIcon className="h-3.5 w-3.5 text-[#FF8566]" />
                      <span>{dest.highlightStyle}</span>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="font-display text-xl font-bold">{dest.name}</h3>
                      <p className="text-xs text-white/80">{dest.country}</p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <p className="text-xs text-[#555E6C] leading-relaxed line-clamp-2">
                      {dest.tagline}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-[#EAE7DF] pt-4">
                      <div>
                        <span className="text-[11px] font-medium text-[#737A84]">From approx.</span>
                        <div className="text-sm font-extrabold text-[#141A22]">
                          ${dest.typicalCostLow} <span className="text-xs font-normal text-[#737A84]">/ day</span>
                        </div>
                      </div>

                      <button
                        id={`plan-${dest.name.toLowerCase()}-btn`}
                        onClick={() => onStartPlanning(dest.name)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#141A22] px-3.5 py-2 text-xs font-bold text-white transition-colors duration-150 hover:bg-[#FF5C39]"
                      >
                        <span>Plan {dest.name}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 lg:py-24 border-t border-[#EAE7DF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-wider text-[#FF5C39]">
              Simple 3-Step Flow
            </div>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-[#141A22] sm:text-4xl">
              From daydreaming to departure in under 30 seconds
            </h2>
            <p className="mt-3 text-sm text-[#737A84]">
              No complicated multi-page questionnaires. Just your core preferences and an instant itinerary you can actually use.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div
              id="how-step-1"
              className="relative rounded-2xl border border-[#EAE7DF] bg-white p-7 shadow-2xs"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF5C39]/10 text-lg font-black text-[#FF5C39]">
                01
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-[#141A22]">
                Choose Your Destination & Days
              </h3>
              <p className="mt-2 text-xs text-[#555E6C] leading-relaxed">
                Pick any world city or hot spot. Choose anywhere from a quick 2-day weekend break to a full 14-day international exploration.
              </p>
              <div className="mt-5 flex items-center gap-2 text-xs font-bold text-[#737A84]">
                <Clock className="h-4 w-4 text-[#FF5C39]" />
                <span>Takes 10 seconds</span>
              </div>
            </div>

            {/* Step 2 */}
            <div
              id="how-step-2"
              className="relative rounded-2xl border border-[#EAE7DF] bg-white p-7 shadow-2xs"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF5C39]/10 text-lg font-black text-[#FF5C39]">
                02
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-[#141A22]">
                Select Vibe, Budget & Pace
              </h3>
              <p className="mt-2 text-xs text-[#555E6C] leading-relaxed">
                Whether you’re on a budget hostel trip or boutique splurge, traveling solo or with your squad, relaxed or packed morning-to-night.
              </p>
              <div className="mt-5 flex items-center gap-2 text-xs font-bold text-[#737A84]">
                <Wallet className="h-4 w-4 text-[#FF5C39]" />
                <span>No generic itineraries</span>
              </div>
            </div>

            {/* Step 3 */}
            <div
              id="how-step-3"
              className="relative rounded-2xl border border-[#EAE7DF] bg-white p-7 shadow-2xs"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF5C39]/10 text-lg font-black text-[#FF5C39]">
                03
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-[#141A22]">
                Get Your Personalized Schedule
              </h3>
              <p className="mt-2 text-xs text-[#555E6C] leading-relaxed">
                Receive an hour-by-hour itinerary with costs, descriptions, local tips, and direct swap options to personalize on the fly.
              </p>
              <div className="mt-5 flex items-center gap-2 text-xs font-bold text-[#737A84]">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Ready to screenshot & share</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-[#141A22] text-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            Ready to plan your next unforgettable trip?
          </h2>
          <p className="mt-4 text-sm text-gray-300 max-w-xl mx-auto">
            Join thousands of young travelers crafting effortless, high-vibe journeys without the planning headache.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              id="bottom-start-planning-btn"
              onClick={() => onStartPlanning()}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#FF5C39] px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#E64C2A] active:scale-98"
            >
              <span>Start Planning with TripTailor</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
