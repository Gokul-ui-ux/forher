import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { FloatingNavbar } from './components/FloatingNavbar';
import { HeroSection } from './components/HeroSection';
import { CalendarDate3D } from './components/CalendarDate3D';
import { TimelineSection } from './components/TimelineSection';
import { CallsSection } from './components/CallsSection';
import { FavoriteMemoriesGallery } from './components/FavoriteMemoriesGallery';
import { RoyalScrollLetter } from './components/RoyalScrollLetter';
import { VinylRecord3D } from './components/VinylRecord3D';
import { PhotoQuoteSection } from './components/PhotoQuoteSection';
import { TheLifeWeAreWriting } from './components/TheLifeWeAreWriting';
import { FinalRevealSection } from './components/FinalRevealSection';
import { EasterEggsController } from './components/EasterEggsController';
import { audioEngine } from './utils/audioEngine';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleEnterStory = () => {
    audioEngine.playGentleChime(660, 0.1);
    const element = document.getElementById('beginning');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSecretDayOneClick = () => {
    audioEngine.playStardust();
    const element = document.getElementById('beginning');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05070B] text-[#E6E1D8] font-sans overflow-x-hidden">
      {/* Cinematic Loading Experience */}
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          {/* Floating Luxury Glass Navigation */}
          <FloatingNavbar />

          <main>
            {/* 1. Cinematic 3D Landing Page (Gokul & Iniya Celestial Sky) */}
            <HeroSection
              onEnterStory={handleEnterStory}
              onSecretDayOneClick={handleSecretDayOneClick}
            />

            {/* 2. The First Meeting ("Where It All Began" — October 2) */}
            <CalendarDate3D />

            {/* 3. Our Timeline ("2 Years. Countless Memories." — October 2) */}
            <TimelineSection />

            {/* 4. Dedicated Calls Section: 6500+ Hours of Calls & Conversations */}
            <CallsSection />

            {/* 5. Our Favorite Memories: Luxury Editorial Gallery */}
            <FavoriteMemoriesGallery />

            {/* 6. A Letter For You: Personal Letter from Gokul to Iniya */}
            <RoyalScrollLetter />

            {/* 7. Our Song ("If Our Story Had a Sound…") */}
            <VinylRecord3D />

            {/* 8. Photo + Parallax Quote Section */}
            <PhotoQuoteSection />

            {/* 9. The Life We're Still Writing (5 Stages + Your Dreams + The Little Things) */}
            <TheLifeWeAreWriting />

            {/* 10. Final Climax Reveal ("I WANT TO GROW THROUGH IT WITH YOU" — October 2) */}
            <FinalRevealSection />
          </main>

          {/* Hidden Easter Eggs */}
          <EasterEggsController />
        </>
      )}
    </div>
  );
};

export default App;
