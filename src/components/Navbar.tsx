import React from 'react';
import { Compass, Sparkles, PlusCircle } from 'lucide-react';

interface NavbarProps {
  currentStep: 'landing' | 'preferences' | 'generating' | 'itinerary';
  onNavigate: (step: 'landing' | 'preferences') => void;
  onReset: () => void;
  hasItinerary: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStep,
  onNavigate,
  onReset,
  hasItinerary,
}) => {
  return (
    <header
      id="app-header"
      className="sticky top-0 z-40 w-full border-b border-[#EAE7DF] bg-[#FBFBF9]/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => onNavigate('landing')}
          className="group flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF5C39] text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-xl font-black tracking-tight text-[#141A22]">
                TripTailor
              </span>
              <span className="rounded-full bg-[#FF5C39]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#FF5C39]">
                Beta
              </span>
            </div>
            <p className="hidden text-[11px] font-medium text-[#737A84] sm:block">
              Smart planner for young explorers
            </p>
          </div>
        </button>

        {/* Step Indicator */}
        <nav id="flow-breadcrumbs" className="hidden md:flex items-center gap-2 text-xs font-semibold">
          <button
            id="nav-step-landing"
            onClick={() => onNavigate('landing')}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              currentStep === 'landing'
                ? 'bg-[#141A22] text-white'
                : 'text-[#656D78] hover:bg-[#EFECE4]'
            }`}
          >
            1. Discover
          </button>
          <span className="text-[#C6C2B8]">/</span>
          <button
            id="nav-step-preferences"
            onClick={() => onNavigate('preferences')}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              currentStep === 'preferences'
                ? 'bg-[#141A22] text-white'
                : 'text-[#656D78] hover:bg-[#EFECE4]'
            }`}
          >
            2. Preferences
          </button>
          <span className="text-[#C6C2B8]">/</span>
          <span
            id="nav-step-itinerary"
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              currentStep === 'itinerary' || currentStep === 'generating'
                ? 'bg-[#141A22] text-white'
                : 'text-[#A29E94]'
            }`}
          >
            3. Itinerary
          </span>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          {hasItinerary && currentStep === 'itinerary' ? (
            <button
              id="new-trip-btn"
              onClick={onReset}
              className="flex items-center gap-2 rounded-xl border border-[#D9D4C7] bg-white px-3.5 py-2 text-xs font-bold text-[#141A22] shadow-2xs transition-all hover:border-[#141A22] hover:bg-[#FAF9F5]"
            >
              <PlusCircle className="h-4 w-4 text-[#FF5C39]" />
              <span>Plan New Trip</span>
            </button>
          ) : (
            <button
              id="start-planning-header-btn"
              onClick={() => onNavigate('preferences')}
              className="flex items-center gap-2 rounded-xl bg-[#FF5C39] px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#E64C2A] active:scale-98"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Plan a Trip</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
