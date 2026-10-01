import React, { useState } from 'react';
import { Video, Camera, Moon, MessageCircle, Headphones, Sun, Sparkles, Clock, PhoneCall } from 'lucide-react';
import { MEMORY_CONFIG, type CallTypeCard } from '../config/memoryConfig';
import { audioEngine } from '../utils/audioEngine';

const getCallIcon = (name: string) => {
  switch (name) {
    case 'Video':
      return <Video className="w-5 h-5 text-[#f7df9e]" />;
    case 'Camera':
      return <Camera className="w-5 h-5 text-[#d89d9b]" />;
    case 'Moon':
      return <Moon className="w-5 h-5 text-[#d4af37]" />;
    case 'MessageCircle':
      return <MessageCircle className="w-5 h-5 text-[#93c5fd]" />;
    case 'Headphones':
      return <Headphones className="w-5 h-5 text-[#f4d382]" />;
    case 'Sun':
      return <Sun className="w-5 h-5 text-[#e5c158]" />;
    case 'Sparkles':
    default:
      return <Sparkles className="w-5 h-5 text-[#f7df9e]" />;
  }
};

export const CallsSection: React.FC = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleCardHover = (card: CallTypeCard) => {
    setActiveCardId(card.id);
    audioEngine.playGentleChime(780, 0.08);
  };

  return (
    <section id="calls" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-[650px] h-[650px] bg-[#d4af37]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#0e121c]/70 backdrop-blur-md mb-6">
          <PhoneCall className="w-3.5 h-3.5 text-[#e5c158]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#f7df9e] font-mono">
            Shared Lifeline
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-gradient-ivory mb-8 tracking-wide uppercase">
          THE HOURS THAT MADE THE DISTANCE FEEL SMALLER
        </h2>

        {/* 6500+ Grand Headline Display */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="text-6xl sm:text-7xl md:text-8xl font-serif font-light text-gradient-gold tracking-tight mb-2 drop-shadow-xl">
            {MEMORY_CONFIG.CALL_HOURS_COUNT}
          </div>
          <p className="text-sm sm:text-base font-mono uppercase tracking-[0.3em] text-[#fbf9f5]">
            HOURS OF CALLS & CONVERSATIONS
          </p>
        </div>

        <p className="text-base sm:text-lg font-light text-[#a8a29e] max-w-2xl mx-auto leading-relaxed">
          Through Google Meet, video calls, sleepy mornings, and endless midnights. The screen was physical glass, but everything passing through it was completely real.
        </p>
      </div>

      {/* 7 Interactive Call Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 relative z-10">
        {MEMORY_CONFIG.CALL_TYPES.map((card) => {
          const isActive = activeCardId === card.id;

          return (
            <div
              key={card.id}
              onMouseEnter={() => handleCardHover(card)}
              onMouseLeave={() => setActiveCardId(null)}
              className={`relative rounded-3xl glass-card p-6 sm:p-7 border transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[260px] group ${
                isActive
                  ? 'border-[#d4af37]/80 bg-[#101524]/90 shadow-[0_15px_40px_rgba(212,175,55,0.15)] -translate-y-2'
                  : 'border-white/10 hover:border-[#d4af37]/40'
              }`}
            >
              {/* Card Top */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {getCallIcon(card.iconName)}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#d89d9b] bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    {card.hoursNote}
                  </span>
                </div>

                <h3 className="text-2xl font-serif text-[#fbf9f5] group-hover:text-[#f7df9e] transition-colors mb-2">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#9ca3af] font-light leading-relaxed mb-4">
                  {card.description}
                </p>
              </div>

              {/* Reveal Quote on Hover */}
              <div className="pt-4 border-t border-white/10">
                <p className="font-serif italic text-sm text-[#f7df9e] leading-relaxed">
                  "{card.quote}"
                </p>
              </div>
            </div>
          );
        })}

        {/* Bonus 8th Card: Total Summary Card */}
        <div className="relative rounded-3xl glass-panel p-6 sm:p-7 border border-[#d4af37]/40 flex flex-col justify-between bg-gradient-to-br from-[#121828]/90 to-[#070a10]">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center mb-5">
              <Clock className="w-6 h-6 text-[#f7df9e]" />
            </div>
            <h3 className="text-2xl font-serif text-[#fbf9f5] mb-2">
              Every Single Day
            </h3>
            <p className="text-xs sm:text-sm text-[#c5c1b8] font-light leading-relaxed">
              730 days of never going a single day without reaching for each other.
            </p>
          </div>
          <div className="pt-4 border-t border-white/10 text-xs font-mono text-[#d4af37]">
            Gokul & Iniya • Unbroken Bond
          </div>
        </div>
      </div>
    </section>
  );
};
