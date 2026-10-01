import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MEMORY_CONFIG } from '../config/memoryConfig';
import { audioEngine } from '../utils/audioEngine';

export const FinalRevealSection: React.FC = () => {
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const data = MEMORY_CONFIG.FINAL_REVEAL;

  const triggerCelebration = () => {
    setHasCelebrated(true);
    audioEngine.playStardust();

    const count = 220;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#F7DF9E', '#E5C158', '#D89D9B', '#FFFFFF'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <section className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center bg-[#030407] overflow-hidden">
      {/* Central Ethereal Golden Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#d4af37]/8 rounded-full blur-[200px] pointer-events-none" />

      {/* Single pulsing stardust particle in the dark */}
      <div className="mb-12 relative flex items-center justify-center">
        <span className="w-3 h-3 rounded-full bg-[#f7df9e] shadow-[0_0_25px_#f7df9e] animate-ping" />
        <span className="absolute w-6 h-6 rounded-full bg-[#d4af37]/30 animate-pulse" />
      </div>

      {/* Sequenced Emotional Climax Reveals */}
      <div className="max-w-4xl mx-auto space-y-6 mb-12 relative z-10">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-light text-gradient-ivory tracking-wide uppercase">
          {data.line1}
        </h2>

        <p className="text-xl sm:text-2xl md:text-3xl font-serif text-[#d1d5db] font-light italic">
          "{data.line2}"
        </p>

        {/* Poem lines */}
        <div className="py-6 space-y-2 text-lg sm:text-2xl font-serif text-[#f7df9e]/90 tracking-wide">
          {data.poemLines.map((line, idx) => (
            <p key={idx} className="font-light">
              {line}
            </p>
          ))}
        </div>

        <p className="text-lg sm:text-xl font-serif text-[#c5a059] italic pt-4">
          {data.transitionLine}
        </p>

        {/* Grand Headline: "I WANT TO GROW THROUGH IT WITH YOU." */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-cinzel font-bold text-gradient-gold tracking-tight pt-4 pb-2 drop-shadow-2xl">
          {data.climaxHeadline}
        </h1>

        {/* Gokul & Iniya */}
        <div className="pt-6 flex items-center justify-center gap-3">
          <span className="text-2xl sm:text-4xl font-serif tracking-widest text-[#fbf9f5] font-light">
            {MEMORY_CONFIG.BOY_NAME}
          </span>
          <Heart className="w-6 h-6 text-[#d89d9b] fill-current animate-pulse" />
          <span className="text-2xl sm:text-4xl font-serif tracking-widest text-[#fbf9f5] font-light">
            {MEMORY_CONFIG.GIRL_NAME}
          </span>
        </div>

        <p className="text-lg sm:text-2xl font-serif text-[#fbf9f5] pt-2">
          {data.anniversaryMessage}
        </p>
      </div>

      {/* Grand Best Photo Portrait — Our Very First Photo Together */}
      <div className="relative z-10 max-w-2xl w-full mx-auto rounded-3xl glass-panel p-4 sm:p-5 border border-[#d4af37]/50 shadow-[0_25px_60px_rgba(0,0,0,0.8)] mb-12">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black">
          <img
            src={data.photoUrl}
            alt="Our Very First Photo Together • Gokul & Iniya"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/60 via-transparent to-transparent pointer-events-none" />

          {/* Elegant Tag for First Photo */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
            <span className="text-[11px] font-mono tracking-widest text-[#f7df9e] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase">
              Our Very First Photo Together
            </span>
            <span className="text-[11px] font-mono text-white/80 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
              October 2
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Stardust Celebration Button */}
      <div className="relative z-20">
        <button
          onClick={triggerCelebration}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#d4af37] text-[#05070B] font-medium tracking-wider uppercase text-xs sm:text-sm shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] hover:scale-105 transition-all duration-300 active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-[#05070B] group-hover:rotate-12 transition-transform" />
          <span>{hasCelebrated ? 'Our Promise Sent ✨' : data.buttonLabel}</span>
        </button>
      </div>

      {/* Footer watermark */}
      <div className="mt-24 text-[11px] font-mono text-[#9ca3af]/50 uppercase tracking-[0.3em]">
        Gokul & Iniya • 2 Years Since October 2 • Two people. Two places. One story.
      </div>
    </section>
  );
};
