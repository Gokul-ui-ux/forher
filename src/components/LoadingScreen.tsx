import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsFadingOut(true);
          setTimeout(() => {
            onComplete();
          }, 900);
          return 100;
        }
        // Organic loading increment
        const increment = Math.floor(Math.random() * 8) + 3;
        return Math.min(100, prev + increment);
      });
    }, 55);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070B] text-center px-6 transition-opacity duration-1000 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Central Pulsing Golden Particle */}
      <div className="relative mb-12 flex items-center justify-center">
        <span className="w-2.5 h-2.5 rounded-full bg-[#f7df9e] shadow-[0_0_30px_#f7df9e] animate-ping" />
        <span className="absolute w-8 h-8 rounded-full bg-[#d4af37]/20 animate-pulse" />
      </div>

      {/* Cinematic Text */}
      <h2 className="text-xl sm:text-2xl font-serif font-light text-gradient-ivory tracking-[0.2em] uppercase mb-6">
        Loading our memories…
      </h2>

      {/* Luxury Progress Bar */}
      <div className="w-64 sm:w-80 h-1 bg-white/10 rounded-full overflow-hidden relative mb-4">
        <div
          className="h-full bg-gradient-to-r from-[#c5a059] via-[#f7df9e] to-[#d89d9b] rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage Counter */}
      <div className="text-xs font-mono text-[#d4af37] tracking-widest">
        {progress}%
      </div>
    </div>
  );
};
