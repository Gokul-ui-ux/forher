import React, { useState } from 'react';
import { Calendar, Smartphone, Sparkles, X, ZoomIn, Heart } from 'lucide-react';
import { MEMORY_CONFIG } from '../config/memoryConfig';
import { audioEngine } from '../utils/audioEngine';

interface CalendarDate3DProps {
  onPhotoClick?: (url: string, title: string) => void;
}

export const CalendarDate3D: React.FC<CalendarDate3DProps> = ({ onPhotoClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const config = MEMORY_CONFIG.FIRST_MEETING;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const toggleOpen = () => {
    audioEngine.playPaperFlutter();
    setIsOpen(!isOpen);
    if (isFlipped) setIsFlipped(false);
  };

  const handleDoubleTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playGentleChime(950, 0.15);
    setIsFlipped(!isFlipped);
  };

  const handlePhotoClick = () => {
    audioEngine.playGentleChime(820, 0.12);
    setIsLightboxOpen(true);
    onPhotoClick?.(config.photoUrl, "Our Very First Meeting");
  };

  return (
    <section id="beginning" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#0e121c]/70 backdrop-blur-md mb-6 shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-[#e5c158]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#f7df9e] font-medium">
            {config.dayLabel}
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-gradient-ivory mb-6 tracking-wide">
          {config.title}
        </h2>

        <p className="text-lg sm:text-xl font-light text-[#c5c1b8] leading-relaxed italic max-w-2xl mx-auto">
          "{config.leadQuote}"
        </p>

        <div className="mt-4 text-xs tracking-[0.3em] uppercase text-[#d4af37]/80 font-mono">
          {config.date}
        </div>
      </div>

      {/* 3D Floating Interactive Calendar / Vault Object */}
      <div className="flex flex-col items-center justify-center relative z-20">
        {!isOpen ? (
          // UNOPENED 3D FLOATING CALENDAR TILE
          <div
            className="perspective-1000 cursor-pointer group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={toggleOpen}
          >
            <div
              className="relative w-80 sm:w-96 rounded-2xl glass-panel p-8 border border-[#d4af37]/30 transition-transform duration-300 ease-out shadow-2xl flex flex-col items-center text-center"
              style={{
                transform: `rotateY(${mousePos.x * 24}deg) rotateX(${-mousePos.y * 24}deg) translateZ(15px)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Outer Golden Glow Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#d4af37]/15 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Calendar Date Header */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#161c2b] to-[#070a10] border border-[#d4af37]/40 flex flex-col items-center justify-center shadow-lg mb-6 group-hover:scale-105 transition-transform duration-300">
                <span className="text-[10px] tracking-widest text-[#d89d9b] uppercase font-bold">OCT</span>
                <span className="text-2xl font-serif font-bold text-[#f7df9e]">02</span>
              </div>

              <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-2">
                Click To Unveil
              </span>

              <h3 className="text-2xl font-serif text-[#fbf9f5] mb-3">
                {config.date}
              </h3>

              <p className="text-sm text-[#9ca3af] leading-relaxed mb-6 font-light">
                {config.location}
              </p>

              {/* Pulsing Button Indicator */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/40 text-xs text-[#f7df9e] tracking-widest uppercase transition-all duration-300">
                <Sparkles className="w-3.5 h-3.5 text-[#e5c158] animate-pulse" />
                <span>Open Day 1 Memory</span>
              </div>

              {/* Subtle Corner Accents */}
              <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-[#d4af37]/40" />
              <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-[#d4af37]/40" />
              <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-[#d4af37]/40" />
              <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-[#d4af37]/40" />
            </div>
          </div>
        ) : (
          // OPENED 3D KEEPSAKE & PHOTO CARD
          <div
            className="perspective-1000 max-w-3xl w-full mx-auto animate-in fade-in zoom-in-95 duration-500"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-[#d4af37]/40 shadow-2xl transition-transform duration-300 ease-out"
              style={{
                transform: `rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Close Button */}
              <button
                onClick={toggleOpen}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors z-20"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] animate-ping" />
                  <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
                    The First Memory • Day 1
                  </span>
                </div>
                <div className="text-xs text-[#9ca3af] flex items-center gap-1.5 font-mono">
                  <Smartphone className="w-3.5 h-3.5 text-[#d89d9b]" />
                  <span>{config.location}</span>
                </div>
              </div>

              {/* Photo Area with Polaroid styling, Perfect 1024/460 Ratio and Double-Click Easter Egg */}
              <div
                className="relative rounded-2xl overflow-hidden border border-[#d4af37]/30 group cursor-pointer shadow-xl mb-6 bg-[#070a12]"
                onDoubleClick={handleDoubleTap}
                onClick={handlePhotoClick}
              >
                {!isFlipped ? (
                  // Front: Photo with exact 1024/460 aspect ratio preserving all text
                  <div
                    className="relative w-full overflow-hidden bg-[#070a12] flex items-center justify-center"
                    style={{ aspectRatio: '1024 / 460' }}
                  >
                    <img
                      src={config.photoUrl}
                      alt="Day 1 WhatsApp Conversation - October 2, 2024"
                      className="w-full h-full object-contain sm:object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070a10]/70 via-transparent to-transparent opacity-50 pointer-events-none" />

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="text-[11px] sm:text-xs text-white/90 font-mono tracking-wider bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        {config.date}
                      </span>
                      <span className="text-[11px] text-amber-200/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#d4af37]/30">
                        <ZoomIn className="w-3 h-3 text-[#d4af37]" /> Click to zoom / Double-tap note
                      </span>
                    </div>
                  </div>
                ) : (
                  // Back: Flipped Secret Note Easter Egg
                  <div
                    className="w-full p-8 flex flex-col items-center justify-center text-center bg-[#0d121c] border border-[#d4af37]/50 rounded-2xl"
                    style={{ aspectRatio: '1024 / 460', minHeight: '220px' }}
                  >
                    <Heart className="w-8 h-8 text-[#d89d9b] mb-4 fill-[#d89d9b]/20" />
                    <span className="text-xs uppercase tracking-widest text-[#d4af37] mb-2 font-mono">
                      Secret Polaroid Backside
                    </span>
                    <p className="font-serif italic text-xl sm:text-2xl text-[#f7df9e] leading-relaxed max-w-md font-light tracking-wide">
                      "{MEMORY_CONFIG.EASTER_EGGS.doubleClickPolaroidNote}"
                    </p>
                    <span className="text-[10px] text-[#9ca3af] mt-4 tracking-wider">
                      (Double-tap again to flip back)
                    </span>
                  </div>
                )}
              </div>

              {/* Handwritten Note Callout */}
              <div className="relative rounded-2xl bg-gradient-to-r from-[#161c2b]/80 to-[#101420]/80 p-6 border-l-2 border-[#d4af37] mb-6">
                <p className="font-serif italic text-xl sm:text-2xl text-[#fbf9f5] leading-relaxed font-light tracking-wide">
                  "{config.handwrittenNote}"
                </p>
              </div>

              {/* Extended Journal Story */}
              <p className="text-sm sm:text-base text-[#c5c1b8] font-light leading-relaxed">
                {config.extendedStory}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX FOR DAY 1 CHAT */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-3xl glass-panel border border-[#d4af37]/40 overflow-hidden shadow-2xl p-4 sm:p-6 bg-[#0a0d14]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] animate-ping" />
                <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
                  Original Day 1 Chat • October 2, 2024
                </span>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="relative w-full rounded-2xl overflow-hidden bg-black/80 flex items-center justify-center border border-white/10 shadow-inner"
              style={{ aspectRatio: '1024 / 460' }}
            >
              <img
                src={config.photoUrl}
                alt="Day 1 WhatsApp Chat - October 2, 2024"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#a8a29e]">
              <span className="italic text-[#d4af37]">
                "Neet aspirant thaana" • "Yes😂" • "Appada"
              </span>
              <span className="font-mono text-white/60">
                October 2, 2024 at 15:53
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
