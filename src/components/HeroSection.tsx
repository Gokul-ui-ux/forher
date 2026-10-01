import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { HeroCanvas3D } from './HeroCanvas3D';
import { MEMORY_CONFIG } from '../config/memoryConfig';

interface HeroSectionProps {
  onEnterStory: () => void;
  onSecretDayOneClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onEnterStory,
  onSecretDayOneClick,
}) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Cinematic timed reveals adapted to LDR
    const timer1 = setTimeout(() => setStage(1), 800);   // "Two years ago…"
    const timer2 = setTimeout(() => setStage(2), 2600);  // "Two people, two different places..."
    const timer3 = setTimeout(() => setStage(3), 4800);  // "And somehow…"
    const timer4 = setTimeout(() => setStage(4), 6600);  // "Two years later, here we are."
    const timer5 = setTimeout(() => setStage(5), 8400);  // Climax reveal

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  const handleSkipIntro = () => {
    setStage(5);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#05070B] text-center select-none">
      {/* 3D WebGL Canvas Layer (Sophisticated Long Distance Celestial Sky) */}
      <HeroCanvas3D onDayOneClick={onSecretDayOneClick} />

      {/* Atmospheric Vignette & Contrast Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070B]/50 via-transparent to-[#05070B] pointer-events-none" />
      <div className="absolute inset-0 vignette-overlay pointer-events-none" />

      {/* Skip Intro button */}
      {stage < 5 && (
        <button
          onClick={handleSkipIntro}
          className="absolute top-6 right-6 z-30 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[#a8a29e] hover:text-white transition-all backdrop-blur-md"
        >
          Skip Intro →
        </button>
      )}

      {/* CENTER EMOTIONAL TEXT SEQUENCE */}
      <div className="relative z-20 max-w-4xl px-6 flex flex-col items-center justify-center pointer-events-auto">
        {/* Single Glowing Particle */}
        <div className="mb-8 relative flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f7df9e] shadow-[0_0_30px_#f7df9e] animate-ping" />
          <span className="absolute w-8 h-8 rounded-full bg-[#d4af37]/20 animate-pulse" />
        </div>

        {/* Stage 1 to 4: Intro Phased Reveals */}
        {stage >= 1 && stage < 5 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-700">
            <p className="text-xl sm:text-2xl md:text-3xl font-serif text-[#a8a29e] tracking-widest">
              Two years ago…
            </p>

            {stage >= 2 && (
              <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#fbf9f5] font-light leading-relaxed max-w-2xl mx-auto animate-in fade-in duration-700">
                Two separate lives started talking across screens and miles.
              </p>
            )}

            {stage >= 3 && (
              <p className="text-xl sm:text-2xl font-serif text-[#c5a059] italic animate-in fade-in duration-700">
                And somehow…
              </p>
            )}

            {stage >= 4 && (
              <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#fbf9f5] animate-in fade-in duration-700">
                Two years later, here we are.
              </p>
            )}
          </div>
        )}

        {/* Stage 5: Grand Climax Reveal */}
        {stage === 5 && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#0e121c]/70 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#e5c158]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#f7df9e] font-mono">
                {MEMORY_CONFIG.COUPLE_TAGLINE} • {MEMORY_CONFIG.THEME_TAGLINE}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-cinzel font-bold text-gradient-gold tracking-tight drop-shadow-2xl">
              2 YEARS SINCE I MET YOU
            </h1>

            <p className="text-base sm:text-xl font-light text-[#c5c1b8] max-w-2xl mx-auto tracking-wide leading-relaxed font-sans">
              Two people, two places, countless conversations — and somehow, distance never stopped us from becoming us.
            </p>

            {/* Enter Story CTA Button */}
            <div className="pt-4">
              <button
                onClick={onEnterStory}
                className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#d4af37] text-[#05070B] font-medium tracking-wider uppercase text-xs sm:text-sm shadow-[0_0_35px_rgba(212,175,55,0.45)] hover:shadow-[0_0_55px_rgba(212,175,55,0.7)] hover:scale-105 transition-all duration-300 active:scale-95"
              >
                <span>ENTER OUR STORY</span>
                <ArrowDown className="w-4 h-4 text-[#05070B] group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Subtle small line near the bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-xl px-4 pointer-events-none text-center">
        <p className="text-xs sm:text-sm font-light text-[#a8a29e]/70 italic tracking-wide">
          "Some stories begin with a meeting. Ours grew through every call, every message, and every late night."
        </p>
      </div>
    </section>
  );
};
