import React, { useState } from 'react';
import { Sparkles, Smartphone, Calendar, ZoomIn, Heart, ChevronRight, X } from 'lucide-react';
import { MEMORY_CONFIG, type TimelineItem } from '../config/memoryConfig';
import { audioEngine } from '../utils/audioEngine';

interface TimelineSectionProps {
  onSelectMemory?: (item: TimelineItem) => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ onSelectMemory }) => {
  const [activeModalItem, setActiveModalItem] = useState<TimelineItem | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const handleCardClick = (item: TimelineItem) => {
    audioEngine.playGentleChime(820, 0.12);
    setActiveModalItem(item);
    onSelectMemory?.(item);
  };

  return (
    <section id="timeline" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient accents */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-[#d89d9b]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Heading */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#0e121c]/70 backdrop-blur-md mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#e5c158]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#f7df9e] font-medium">
            Chronological Journey
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-gradient-ivory mb-6 tracking-wide">
          2 Years. Countless Memories.
        </h2>

        <p className="text-base sm:text-lg font-light text-[#a8a29e] max-w-2xl mx-auto leading-relaxed">
          From the nervous first hello to hundreds of shared sunrises, late-night giggles, and quiet understandings. Here is how our story unfolded, one memory at a time.
        </p>
      </div>

      {/* Timeline Layout with Glowing Center Path */}
      <div className="relative">
        {/* Glowing Center Line with Gold Gradient */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#d4af37]/10 via-[#d4af37]/40 to-[#d4af37]/10 pointer-events-none">
          {/* Animated stardust traveling down the line */}
          <div className="w-full h-24 bg-gradient-to-b from-transparent via-[#f7df9e] to-transparent animate-pulse" />
        </div>

        {/* Milestones List */}
        <div className="space-y-16 sm:space-y-24">
          {MEMORY_CONFIG.TIMELINE.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-8 md:gap-16 group`}
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                {/* Center Node / Node Pin with Pulsing Ripple */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 z-20 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <span className="w-4 h-4 rounded-full bg-[#05070B] border-2 border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.7)] group-hover:scale-125 transition-transform duration-300" />
                    <span className="absolute w-8 h-8 rounded-full bg-[#d4af37]/20 animate-ping pointer-events-none opacity-60" />
                  </div>
                </div>

                {/* Timeline Card */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                  <div
                    onClick={() => handleCardClick(item)}
                    className={`relative rounded-3xl glass-card p-6 sm:p-7 border border-white/10 hover:border-[#d4af37]/50 cursor-pointer overflow-hidden transform-gpu transition-all duration-500 ease-out hover:-translate-y-2 ${
                      hoveredCardId === item.id ? 'shadow-[0_20px_50px_rgba(212,175,55,0.15)]' : ''
                    }`}
                  >
                    {/* Corner Tag & Day Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {item.dayNumber && (
                          <span className="px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-xs font-mono font-medium text-[#f7df9e]">
                            {item.dayNumber}
                          </span>
                        )}
                        {item.tag && (
                          <span className="text-xs uppercase tracking-widest text-[#a8a29e] font-sans">
                            {item.tag}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#9ca3af] font-mono">
                        <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    {/* Image Preview Container */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-[#0a0d14] flex items-center justify-center">
                      <img
                        src={item.photoUrl}
                        alt={item.title}
                        className={`w-full h-full ${
                          item.photoUrl.includes('chat')
                            ? 'object-contain p-2 bg-[#06080e]'
                            : 'object-cover object-[center_20%]'
                        } transition-transform duration-700 ease-out group-hover:scale-105`}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070a10] via-transparent to-transparent opacity-50 pointer-events-none" />

                      {/* Hover Fullscreen Hint */}
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#05070B]/80 border border-[#d4af37]/40 text-xs text-[#f7df9e] tracking-wider uppercase backdrop-blur-md">
                          <ZoomIn className="w-3.5 h-3.5 text-[#d4af37]" /> View Full Memory
                        </span>
                      </div>
                    </div>

                    {/* Milestone Title & Description */}
                    <h3 className="text-2xl font-serif text-[#fbf9f5] group-hover:text-[#f7df9e] transition-colors duration-300 mb-2.5">
                      {item.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#c5c1b8] font-light leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Location Badge & Secret Note Teaser */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      {item.location ? (
                        <div className="flex items-center gap-1.5 text-xs text-[#9ca3af] font-mono">
                          <Smartphone className="w-3.5 h-3.5 text-[#d89d9b]" />
                          <span>{item.location}</span>
                        </div>
                      ) : <span />}

                      <span className="text-xs text-[#d4af37] font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Explore <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Spacer for Alternate Grid Side on Desktop */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>

      {/* FULLSCREEN MEMORY MODAL */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-3xl glass-panel border border-[#d4af37]/40 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 my-auto bg-[#0a0d14]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white/80 hover:text-white border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header with Perfect Aspect Ratio and 0% Cropping */}
            <div className="relative w-full overflow-hidden bg-black flex items-center justify-center p-3 sm:p-6 min-h-[280px]">
              <img
                src={activeModalItem.photoUrl}
                alt={activeModalItem.title}
                className="max-h-[60vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
            </div>

            {/* Modal Body Story */}
            <div className="p-6 sm:p-8 space-y-5 bg-[#0e121c] border-t border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {activeModalItem.dayNumber && (
                    <span className="px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-xs font-mono font-semibold text-[#f7df9e]">
                      {activeModalItem.dayNumber}
                    </span>
                  )}
                  {activeModalItem.tag && (
                    <span className="text-xs uppercase tracking-widest text-[#a8a29e] font-sans">
                      {activeModalItem.tag}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#d1d5db]">
                  <span className="flex items-center gap-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    {activeModalItem.date}
                  </span>
                  {activeModalItem.location && (
                    <span className="flex items-center gap-1.5 font-mono">
                      <Smartphone className="w-3.5 h-3.5 text-[#d89d9b]" />
                      {activeModalItem.location}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-white">
                {activeModalItem.title}
              </h3>

              <p className="text-base sm:text-lg text-[#e5e7eb] font-light leading-relaxed">
                {activeModalItem.description}
              </p>

              {activeModalItem.secretNote && (
                <div className="rounded-2xl bg-[#161c2b]/90 border-l-2 border-[#d4af37] p-5">
                  <span className="text-[11px] uppercase tracking-widest text-[#d4af37] block font-mono mb-2">
                    Heartfelt Reflection
                  </span>
                  <p className="font-serif italic text-xl sm:text-2xl text-[#f7df9e] leading-relaxed font-light tracking-wide">
                    "{activeModalItem.secretNote}"
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-[#9ca3af]">
                <span>Two years since the day we met</span>
                <span className="flex items-center gap-1 text-[#d89d9b]">
                  <Heart className="w-3.5 h-3.5 fill-current" /> Forever treasured
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
