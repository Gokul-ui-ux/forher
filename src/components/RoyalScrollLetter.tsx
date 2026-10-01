import React, { useState } from 'react';
import { Mail, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MEMORY_CONFIG } from '../config/memoryConfig';
import { audioEngine } from '../utils/audioEngine';

export const RoyalScrollLetter: React.FC = () => {
  const [isUnrolled, setIsUnrolled] = useState(false);
  const [isBreakingSeal, setIsBreakingSeal] = useState(false);

  const letterData = MEMORY_CONFIG.ROYAL_SCROLL_LETTER;

  const handleOpenScroll = () => {
    if (isUnrolled) return;
    setIsBreakingSeal(true);
    audioEngine.playPaperFlutter();

    // Trigger soft stardust
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F7DF9E', '#C5A059', '#FFFFFF'],
      scalar: 0.8,
    });

    setTimeout(() => {
      setIsUnrolled(true);
      setIsBreakingSeal(false);
      audioEngine.playGentleChime(880, 0.15);
    }, 700);
  };

  const handleRollBack = () => {
    audioEngine.playPaperFlutter();
    setIsUnrolled(false);
  };

  return (
    <section id="letter" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background warm candlelight illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#d4af37]/8 rounded-full blur-[170px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#0e121c]/70 backdrop-blur-md mb-6">
          <Mail className="w-3.5 h-3.5 text-[#e5c158]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#f7df9e] font-mono">
            A Letter From Gokul
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-gradient-ivory mb-4 tracking-wide uppercase">
          {letterData.sectionTitle}
        </h2>

        <p className="text-base sm:text-lg font-light text-[#a8a29e] max-w-2xl mx-auto leading-relaxed">
          {letterData.subtitle}
        </p>
      </div>

      {/* PERSONAL LETTER INTERACTIVE CONTAINER */}
      <div className="max-w-3xl mx-auto relative z-20 flex flex-col items-center">
        {!isUnrolled ? (
          // ==========================================
          // STATE 1: SEALED LETTER
          // ==========================================
          <div
            onClick={handleOpenScroll}
            className={`group cursor-pointer perspective-1000 p-8 flex flex-col items-center transition-transform duration-500 hover:scale-105 ${
              isBreakingSeal ? 'scale-110 opacity-80' : ''
            }`}
          >
            {/* The Sealed Keepsake Cylinder */}
            <div className="relative w-80 sm:w-96 rounded-2xl bg-gradient-to-r from-[#17130b] via-[#2a2115] to-[#17130b] border-y-4 border-[#d4af37]/80 shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-8 flex flex-col items-center text-center overflow-hidden">
              {/* Subtle Warm Keepsake Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/10 via-transparent to-transparent pointer-events-none" />

              {/* Top Gold Rod */}
              <div className="absolute -top-3 left-0 right-0 h-4 bg-gradient-to-r from-[#8c6d23] via-[#f7df9e] to-[#8c6d23] rounded-full shadow-lg flex items-center justify-between px-2">
                <span className="w-3 h-3 rounded-full bg-[#fbf9f5] shadow-md border border-[#8c6d23]" />
                <span className="w-3 h-3 rounded-full bg-[#fbf9f5] shadow-md border border-[#8c6d23]" />
              </div>

              {/* Heart Wax Seal */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-[#7c140d] via-[#b92b27] to-[#d43f3a] border-2 border-[#f7df9e] shadow-[0_0_30px_rgba(185,43,39,0.8)] flex flex-col items-center justify-center my-3 group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
                <Heart className="w-7 h-7 text-white fill-white/95 mb-0.5" />
                <span className="text-[9px] font-mono tracking-widest text-[#fbf9f5] uppercase font-bold">
                  OCT 02
                </span>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-mono font-semibold mb-1.5">
                  From Gokul To Iniya • October 2
                </span>

                <h3 className="text-2xl sm:text-3xl font-serif text-[#fbf9f5] mb-4 tracking-wide">
                  To Iniya
                </h3>

                {/* Action Button */}
                <button
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7df9e] to-[#d4af37] text-[#05070B] text-xs font-mono uppercase tracking-widest font-bold shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#05070B]" />
                  <span>OPEN MY LETTER</span>
                </button>
              </div>

              {/* Bottom Gold Rod */}
              <div className="absolute -bottom-3 left-0 right-0 h-4 bg-gradient-to-r from-[#8c6d23] via-[#f7df9e] to-[#8c6d23] rounded-full shadow-lg flex items-center justify-between px-2">
                <span className="w-3 h-3 rounded-full bg-[#fbf9f5] shadow-md border border-[#8c6d23]" />
                <span className="w-3 h-3 rounded-full bg-[#fbf9f5] shadow-md border border-[#8c6d23]" />
              </div>
            </div>

            <p className="mt-6 text-xs text-[#d4af37]/80 font-mono uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#d4af37]" /> Tap the seal to open my letter
            </p>
          </div>
        ) : (
          // ==========================================
          // STATE 2: UNROLLED PERSONAL LETTER
          // ==========================================
          <div className="w-full animate-in fade-in zoom-in-95 duration-700 relative">
            {/* Top Bar */}
            <div className="w-full h-6 bg-gradient-to-r from-[#8c6d23] via-[#f7df9e] to-[#8c6d23] rounded-full shadow-2xl flex items-center justify-between px-4 border border-[#fff]/40">
              <span className="w-4 h-4 rounded-full bg-[#fbf9f5] shadow-md" />
              <span className="text-[10px] font-mono text-[#05070b] uppercase tracking-widest font-bold">
                A Letter From Gokul To Iniya • October 2
              </span>
              <span className="w-4 h-4 rounded-full bg-[#fbf9f5] shadow-md" />
            </div>

            {/* The Warm Ivory Letter Body */}
            <div
              className="relative p-8 sm:p-14 md:p-16 text-[#241c14] shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden my-1 rounded-sm"
              style={{
                backgroundColor: '#F7F2E7',
                backgroundImage: `radial-gradient(circle at 50% 50%, #FAF6EE 0%, #EDE4D0 100%)`,
                borderLeft: '4px solid #C5A059',
                borderRight: '4px solid #C5A059',
              }}
            >
              {/* Gold Filigree Inner Border */}
              <div className="absolute inset-4 sm:inset-6 border border-[#C5A059]/40 pointer-events-none rounded-sm" />
              <div className="absolute inset-5 sm:inset-7 border border-[#C5A059]/20 pointer-events-none rounded-sm" />

              {/* Decorative Corner Stars */}
              <div className="absolute top-7 left-7 text-[#C5A059] font-serif text-lg leading-none pointer-events-none">✦</div>
              <div className="absolute top-7 right-7 text-[#C5A059] font-serif text-lg leading-none pointer-events-none">✦</div>
              <div className="absolute bottom-7 left-7 text-[#C5A059] font-serif text-lg leading-none pointer-events-none">✦</div>
              <div className="absolute bottom-7 right-7 text-[#C5A059] font-serif text-lg leading-none pointer-events-none">✦</div>

              {/* Letter Content */}
              <div className="relative z-10 max-w-xl mx-auto space-y-6">
                {/* Salutation */}
                <h3 className="font-serif italic text-3xl sm:text-4xl text-[#3d2f21] pt-4 mb-6">
                  {letterData.salutation}
                </h3>

                {/* Body Paragraphs */}
                <div className="space-y-5 text-base sm:text-lg font-serif leading-relaxed text-[#2f241a]/95">
                  {letterData.paragraphs.map((p, idx) => (
                    <p key={idx} className="indent-4 sm:indent-6">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Valediction & Signature */}
                <div className="pt-8 border-t border-[#C5A059]/30 flex flex-col items-end space-y-1">
                  <p className="font-serif italic text-xl text-[#3d2f21]">
                    {letterData.valediction}
                  </p>
                  <p className="font-serif italic text-3xl sm:text-4xl text-[#8a1c14] tracking-wide pt-1 font-medium">
                    {letterData.authorName}
                  </p>
                  <span className="text-[11px] font-mono tracking-widest text-[#8c6d23] uppercase">
                    {letterData.dateStamp}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="w-full h-6 bg-gradient-to-r from-[#8c6d23] via-[#f7df9e] to-[#8c6d23] rounded-full shadow-2xl flex items-center justify-between px-4 border border-[#fff]/40">
              <span className="w-4 h-4 rounded-full bg-[#fbf9f5] shadow-md" />
              <span className="w-4 h-4 rounded-full bg-[#fbf9f5] shadow-md" />
            </div>

            {/* Fold letter back up button */}
            <div className="mt-8 text-center">
              <button
                onClick={handleRollBack}
                className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#a8a29e] hover:text-white transition-colors"
              >
                Fold Letter Back Up ↑
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
