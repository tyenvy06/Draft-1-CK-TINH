import React, { useEffect, useState } from 'react';
import { Sparkles, Compass, CheckCircle, Clock } from 'lucide-react';
import { TripPreferences } from '../types';
import { getDestinationImage } from '../data/mockData';

interface GeneratingPageProps {
  preferences: TripPreferences;
  onComplete: () => void;
}

const GENERATION_STEPS = [
  'Scouting verified spots & hidden cafes in {destination}...',
  'Filtering activities by {style} style & {budget} budget...',
  'Calculating transit times & optimal sequencing for {pace} pace...',
  'Finalizing insider tips for your {type} crew...',
];

const FUN_FACTS = [
  'Pro-tip: Most major cities have off-peak museum hours on Thursday afternoons with zero lines.',
  'Local street food stalls with handwritten chalkboards often serve the freshest daily ingredients.',
  'Hostel common rooms and indie coffee bars are prime hubs for local event flyers and secret gigs.',
];

export const GeneratingPage: React.FC<GeneratingPageProps> = ({
  preferences,
  onComplete,
}) => {
  const [progress, setProgress] = useState(15);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [factIndex] = useState(() => Math.floor(Math.random() * FUN_FACTS.length));

  const destInfo = getDestinationImage(preferences.destination);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(40);
      setCurrentStepIndex(1);
    }, 450);

    const timer2 = setTimeout(() => {
      setProgress(72);
      setCurrentStepIndex(2);
    }, 950);

    const timer3 = setTimeout(() => {
      setProgress(95);
      setCurrentStepIndex(3);
    }, 1450);

    const timerComplete = setTimeout(() => {
      setProgress(100);
      setTimeout(onComplete, 250);
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timerComplete);
    };
  }, [onComplete]);

  const currentStepText = GENERATION_STEPS[currentStepIndex]
    .replace('{destination}', preferences.destination)
    .replace('{style}', preferences.travelStyle)
    .replace('{budget}', preferences.budget)
    .replace('{pace}', preferences.travelPace)
    .replace('{type}', preferences.tripType);

  return (
    <div id="generating-page-root" className="flex min-h-[80vh] items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-lg rounded-3xl border border-[#EAE7DF] bg-white p-7 sm:p-9 shadow-lg text-center">
        {/* Destination Thumbnail */}
        <div className="relative mx-auto mb-6 h-36 w-full overflow-hidden rounded-2xl bg-gray-100 shadow-inner">
          <img
            src={destInfo.url}
            alt={preferences.destination}
            className="h-full w-full object-cover animate-pulse"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center p-4">
            <span className="font-display text-xl font-bold text-white">
              {preferences.destination} • {preferences.numberOfDays} Days
            </span>
          </div>
        </div>

        {/* Spinner Icon */}
        <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF5C39]/10 text-[#FF5C39]">
          <Compass className="h-7 w-7 animate-spin duration-1000" />
          <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-[#FF5C39] animate-bounce" />
        </div>

        {/* Headline */}
        <h2 className="font-display text-2xl font-black text-[#141A22]">
          Tailoring Your Itinerary
        </h2>
        <p className="mt-1 text-xs font-semibold text-[#737A84]">
          Personalizing activities for a {preferences.travelPace.toLowerCase()} {preferences.travelStyle.toLowerCase()} vibe
        </p>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-bold text-[#737A84] mb-2">
            <span>Building day-by-day plan</span>
            <span className="text-[#FF5C39]">{progress}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#EAE7DF]">
            <div
              className="h-full bg-[#FF5C39] transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Status */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-[#141A22]">
          <Clock className="h-3.5 w-3.5 text-[#FF5C39] animate-spin" />
          <span>{currentStepText}</span>
        </div>

        {/* Fun Travel Fact Box */}
        <div className="mt-8 rounded-xl border border-[#EAE7DF] bg-[#FAF9F5] p-3.5 text-left">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#FF5C39]">
            <CheckCircle className="h-3 w-3" />
            <span>Traveler Wisdom</span>
          </div>
          <p className="mt-1 text-xs text-[#555E6C] leading-relaxed">
            {FUN_FACTS[factIndex]}
          </p>
        </div>
      </div>
    </div>
  );
};
