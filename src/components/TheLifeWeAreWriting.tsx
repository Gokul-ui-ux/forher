import React from 'react';
import { Compass, Heart, Home, Sparkles, Infinity, Star, Coffee, Film, Cake, Sunrise, MessageCircleHeart } from 'lucide-react';
import { MEMORY_CONFIG, type LifeStage } from '../config/memoryConfig';

const getStageIcon = (name: string) => {
  switch (name) {
    case 'Compass':
      return <Compass className="w-5 h-5 text-[#f7df9e]" />;
    case 'Heart':
      return <Heart className="w-5 h-5 text-[#d89d9b]" />;
    case 'Home':
      return <Home className="w-5 h-5 text-[#d4af37]" />;
    case 'Infinity':
      return <Infinity className="w-5 h-5 text-[#c084fc]" />;
    case 'Sparkles':
    default:
      return <Sparkles className="w-5 h-5 text-[#e5c158]" />;
  }
};

const getLittleThingIcon = (idx: number) => {
  switch (idx % 6) {
    case 0: return <Sunrise className="w-4 h-4 text-[#f7df9e]" />;
    case 1: return <Coffee className="w-4 h-4 text-[#d4af37]" />;
    case 2: return <MessageCircleHeart className="w-4 h-4 text-[#d89d9b]" />;
    case 3: return <Film className="w-4 h-4 text-[#93c5fd]" />;
    case 4: return <Cake className="w-4 h-4 text-[#f4d382]" />;
    default: return <Heart className="w-4 h-4 text-[#c084fc]" />;
  }
};

export const TheLifeWeAreWriting: React.FC = () => {
  const data = MEMORY_CONFIG.LIFE_WE_ARE_WRITING;
  const dreams = MEMORY_CONFIG.HER_DREAMS;
  const littleThings = MEMORY_CONFIG.THE_LITTLE_THINGS;

  return (
    <section id="future" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background celestial illumination */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#d4af37]/5 rounded-full blur-[200px] pointer-events-none" />

      {/* Main Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-24 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#0e121c]/70 backdrop-blur-md mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#e5c158]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#f7df9e] font-mono">
            Our Shared Tomorrow
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-gradient-ivory mb-6 tracking-wide uppercase">
          {data.sectionTitle}
        </h2>

        <p className="text-base sm:text-lg font-light text-[#a8a29e] max-w-2xl mx-auto leading-relaxed">
          "{data.leadQuote}"
        </p>
      </div>

      {/* ======================================================== */}
      {/* PART 1: CINEMATIC VERTICAL TIMELINE OF 5 LIFE STAGES     */}
      {/* ======================================================== */}
      <div className="relative max-w-4xl mx-auto mb-32">
        {/* Soft Glowing Vertical Conduit */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#d4af37]/10 via-[#d4af37]/45 to-[#d4af37]/10 pointer-events-none">
          <div className="w-full h-32 bg-gradient-to-b from-transparent via-[#f7df9e] to-transparent animate-pulse" />
        </div>

        <div className="space-y-16 sm:space-y-24">
          {data.stages.map((stage: LifeStage, index: number) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={stage.number}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-8 md:gap-16 group`}
              >
                {/* Center Node on the Glowing Line */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 z-20 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <span className="w-5 h-5 rounded-full bg-[#05070B] border-2 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.7)] group-hover:scale-125 transition-transform duration-300" />
                    <span className="absolute w-8 h-8 rounded-full bg-[#d4af37]/20 animate-ping pointer-events-none opacity-60" />
                  </div>
                </div>

                {/* Timeline Card */}
                <div className="w-full md:w-1/2 pl-14 md:pl-0">
                  <div className="relative rounded-3xl glass-card p-8 border border-white/10 hover:border-[#d4af37]/50 transition-all duration-500 hover:-translate-y-1.5 shadow-xl">
                    {/* Stage Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {getStageIcon(stage.iconName)}
                      </div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
                        STAGE {stage.number}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif text-[#fbf9f5] group-hover:text-[#f7df9e] transition-colors mb-2">
                      {stage.title}
                    </h3>

                    <p className="text-xs uppercase tracking-widest text-[#d89d9b] font-mono mb-4">
                      {stage.subtitle}
                    </p>

                    <p className="text-sm sm:text-base text-[#c5c1b8] font-light leading-relaxed mb-6">
                      {stage.description}
                    </p>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#a8a29e] italic font-serif">
                      <span>"{stage.symbolicDetail}"</span>
                    </div>
                  </div>
                </div>

                {/* Desktop Spacer */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* PART 2: "YOUR DREAMS" SUBSECTION                         */}
      {/* ======================================================== */}
      <div className="max-w-4xl mx-auto rounded-3xl glass-panel border border-[#d4af37]/40 p-8 sm:p-14 shadow-2xl relative mb-28 text-center">
        <div className="w-16 h-16 rounded-3xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center mx-auto mb-6">
          <Star className="w-8 h-8 text-[#f7df9e] animate-pulse" />
        </div>

        <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-mono font-semibold block mb-3">
          For Iniya
        </span>

        <h3 className="text-3xl sm:text-5xl font-serif text-[#fbf9f5] mb-6">
          {dreams.title}
        </h3>

        <div className="space-y-4 max-w-2xl mx-auto mb-6">
          <p className="text-xl sm:text-2xl font-serif italic text-gradient-gold leading-relaxed">
            "{dreams.quote1}"
          </p>
          <p className="text-base sm:text-lg text-[#e5e7eb] font-light leading-relaxed">
            "{dreams.quote2}"
          </p>
        </div>

        <p className="text-xs sm:text-sm text-[#9ca3af] font-light max-w-lg mx-auto pt-4 border-t border-white/10">
          {dreams.subtext}
        </p>
      </div>

      {/* ======================================================== */}
      {/* PART 3: "THE LITTLE THINGS" SUBSECTION                   */}
      {/* ======================================================== */}
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d89d9b] font-mono block mb-2">
            Everyday Life Together
          </span>
          <h3 className="text-3xl sm:text-4xl font-serif text-[#fbf9f5]">
            THE LITTLE THINGS
          </h3>
          <p className="text-xs sm:text-sm text-[#9ca3af] font-light mt-2">
            Because a lifetime is made of ordinary Tuesdays made extraordinary with you.
          </p>
        </div>

        {/* Floating Everyday Moments Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {littleThings.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl glass-card p-6 border border-white/10 hover:border-[#d4af37]/40 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {getLittleThingIcon(idx)}
              </div>

              <h4 className="text-base font-serif text-white mb-2 group-hover:text-[#f7df9e] transition-colors">
                {item.title}
              </h4>

              <p className="text-xs text-[#a8a29e] font-light leading-relaxed">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
