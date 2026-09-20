import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { PreferencesPage } from './components/PreferencesPage';
import { GeneratingPage } from './components/GeneratingPage';
import { ItineraryPage } from './components/ItineraryPage';
import { TripPreferences, GeneratedItinerary } from './types';
import { generatePersonalizedItinerary } from './data/mockData';

export default function App() {
  const [currentStep, setCurrentStep] = useState<'landing' | 'preferences' | 'generating' | 'itinerary'>('landing');

  const [preferences, setPreferences] = useState<TripPreferences>({
    destination: 'Tokyo',
    numberOfDays: 5,
    budget: 'Medium',
    travelStyle: 'Foodie',
    tripType: 'Friends',
    travelPace: 'Balanced',
  });

  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);

  // Start planning from landing page (optionally with a preselected destination)
  const handleStartPlanning = (destination?: string) => {
    if (destination) {
      setPreferences((prev) => ({
        ...prev,
        destination,
      }));
    }
    setCurrentStep('preferences');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit preferences to generate
  const handlePreferencesSubmit = (newPrefs: TripPreferences) => {
    setPreferences(newPrefs);
    setCurrentStep('generating');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Once generating completes
  const handleGenerationComplete = () => {
    const generated = generatePersonalizedItinerary(preferences);
    setItinerary(generated);
    setCurrentStep('itinerary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to preferences to edit
  const handleEditPreferences = () => {
    setCurrentStep('preferences');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to landing
  const handleReset = () => {
    setCurrentStep('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#1E232A] flex flex-col font-sans">
      {/* Navigation Header */}
      <Navbar
        currentStep={currentStep}
        onNavigate={(step) => {
          setCurrentStep(step);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onReset={handleReset}
        hasItinerary={Boolean(itinerary)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentStep === 'landing' && (
          <LandingPage onStartPlanning={handleStartPlanning} />
        )}

        {currentStep === 'preferences' && (
          <PreferencesPage
            initialPreferences={preferences}
            onSubmit={handlePreferencesSubmit}
            onBack={() => {
              setCurrentStep('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentStep === 'generating' && (
          <GeneratingPage
            preferences={preferences}
            onComplete={handleGenerationComplete}
          />
        )}

        {currentStep === 'itinerary' && itinerary && (
          <ItineraryPage
            itinerary={itinerary}
            onEditPreferences={handleEditPreferences}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#EAE7DF] bg-white py-8 text-center text-xs text-[#737A84] print:hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-[#141A22]">TripTailor</span>
            <span>•</span>
            <span>Tailored itineraries for the next generation of travelers</span>
          </div>
          <p className="text-[11px] text-[#A8A398]">
            Crafted for young explorers • Mock Data Engine v1.0 • No external APIs or logins needed
          </p>
        </div>
      </footer>
    </div>
  );
}
