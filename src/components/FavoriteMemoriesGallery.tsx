import React, { useState } from 'react';
import { Sparkles, X, ChevronLeft, ChevronRight, ZoomIn, Calendar } from 'lucide-react';
import { MEMORY_CONFIG } from '../config/memoryConfig';
import { audioEngine } from '../utils/audioEngine';

export const FavoriteMemoriesGallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const memories = MEMORY_CONFIG.FAVORITE_MEMORIES;

  const handleOpenPhoto = (index: number) => {
    audioEngine.playGentleChime(820, 0.1);
    setSelectedPhotoIndex(index);
  };

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    audioEngine.playGentleChime(760, 0.08);
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % memories.length);
  };

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return;
    audioEngine.playGentleChime(760, 0.08);
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + memories.length) % memories.length);
  };

  const activePhoto = selectedPhotoIndex !== null ? memories[selectedPhotoIndex] : null;

  return (
    <section id="memories" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#d4af37]/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#0e121c]/70 backdrop-blur-md mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#e5c158]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#f7df9e] font-mono">
            Framed Moments
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-gradient-ivory mb-6 tracking-wide uppercase">
          OUR FAVORITE MEMORIES
        </h2>

        <p className="text-base sm:text-lg font-light text-[#a8a29e] max-w-2xl mx-auto leading-relaxed">
          The candid frames, the late-night smiles, and the moments that make distance feel completely invisible.
        </p>
      </div>

      {/* Luxury Cinematic Editorial Gallery Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start relative z-10">
        {/* Row 1: Large Featured Photograph (Span 8) + Tall Companion (Span 4) */}
        {memories[0] && (
          <div
            onClick={() => handleOpenPhoto(0)}
            className="md:col-span-8 group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-[#d4af37]/60 cursor-pointer shadow-2xl transition-all duration-500 hover:-translate-y-1.5 aspect-[16/10]"
          >
            <img
              src={memories[0].photoUrl}
              alt={memories[0].title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity" />

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37] block mb-1">
                  Featured Memory • {memories[0].date}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white mb-1">
                  {memories[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#d1d5db] font-light max-w-lg hidden sm:block">
                  "{memories[0].caption}"
                </p>
              </div>
              <span className="p-3 rounded-full bg-black/50 border border-white/10 text-white group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                <ZoomIn className="w-4 h-4" />
              </span>
            </div>
          </div>
        )}

        {memories[1] && (
          <div
            onClick={() => handleOpenPhoto(1)}
            className="md:col-span-4 group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-[#d4af37]/60 cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-1.5 aspect-[3/4]"
          >
            <img
              src={memories[1].photoUrl}
              alt={memories[1].title}
              className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#d89d9b] block mb-1">
                  {memories[1].date}
                </span>
                <h3 className="text-xl font-serif text-white mb-1">
                  {memories[1].title}
                </h3>
              </div>
              <span className="p-2 rounded-full bg-black/40 border border-white/10 text-white/80 group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                <ZoomIn className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        )}

        {/* Row 2: Three Balanced Framed Memories (Span 4 + 4 + 4) */}
        {memories.slice(2, 5).map((mem, idx) => {
          const actualIndex = idx + 2;
          return (
            <div
              key={mem.id}
              onClick={() => handleOpenPhoto(actualIndex)}
              className="md:col-span-4 group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-[#d4af37]/60 cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-1.5 aspect-[3/4]"
            >
              <img
                src={mem.photoUrl}
                alt={mem.title}
                className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] block mb-0.5">
                    {mem.date}
                  </span>
                  <h4 className="text-lg font-serif text-white">
                    {mem.title}
                  </h4>
                </div>
                <span className="p-2 rounded-full bg-black/40 border border-white/10 text-white/80 group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                  <ZoomIn className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}

        {/* Row 3: Three Perfectly Aligned Portrait Memories (Span 4 + 4 + 4) */}
        {memories[5] && (
          <div
            onClick={() => handleOpenPhoto(5)}
            className="md:col-span-4 group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-[#d4af37]/60 cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-1.5 aspect-[3/4]"
          >
            <img
              src={memories[5].photoUrl}
              alt={memories[5].title}
              className="w-full h-full object-cover object-[center_22%] transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#d89d9b] block mb-0.5">
                  {memories[5].date}
                </span>
                <h4 className="text-lg font-serif text-white">
                  {memories[5].title}
                </h4>
              </div>
              <span className="p-2 rounded-full bg-black/40 border border-white/10 text-white/80 group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                <ZoomIn className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        )}

        {memories[6] && (
          <div
            onClick={() => handleOpenPhoto(6)}
            className="md:col-span-4 group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-[#d4af37]/60 cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-1.5 aspect-[3/4]"
          >
            <img
              src={memories[6].photoUrl}
              alt={memories[6].title}
              className="w-full h-full object-cover object-[center_18%] transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] block mb-0.5">
                  {memories[6].date}
                </span>
                <h4 className="text-lg font-serif text-white">
                  {memories[6].title}
                </h4>
              </div>
              <span className="p-2 rounded-full bg-black/40 border border-white/10 text-white/80 group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                <ZoomIn className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        )}

        {memories[7] && (
          <div
            onClick={() => handleOpenPhoto(7)}
            className="md:col-span-4 group relative rounded-3xl overflow-hidden glass-panel border border-[#d4af37]/40 hover:border-[#d4af37] cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-1.5 aspect-[3/4]"
          >
            <img
              src={memories[7].photoUrl}
              alt={memories[7].title}
              className="w-full h-full object-cover object-[center_16%] transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] block mb-0.5">
                  October 2 • {memories[7].date}
                </span>
                <h4 className="text-lg font-serif text-white">
                  {memories[7].title}
                </h4>
              </div>
              <span className="p-2 rounded-full bg-black/40 border border-[#d4af37]/40 text-[#f7df9e] group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                <ZoomIn className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN CINEMATIC VIEWER MODAL */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/92 backdrop-blur-2xl animate-in fade-in duration-300"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div
            className="relative w-full max-w-5xl rounded-3xl glass-panel border border-[#d4af37]/50 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white/80 hover:text-white border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Area with Exact 0% Cropped Rendering */}
            <div className="relative w-full max-h-[65vh] min-h-[320px] bg-black flex items-center justify-center p-3 sm:p-6 overflow-hidden">
              <img
                src={activePhoto.photoUrl}
                alt={activePhoto.title}
                className="max-h-[60vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
            </div>

            {/* Modal Caption Bar */}
            <div className="p-6 sm:p-8 bg-[#0c101a] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37] mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{activePhoto.date}</span>
                </div>
                <h3 className="text-2xl font-serif text-white mb-1">
                  {activePhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9ca3af] font-light">
                  "{activePhoto.caption}"
                </p>
              </div>

              {/* Prev / Next Navigation Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors flex items-center gap-1 text-xs"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-2xl bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#f7df9e] border border-[#d4af37]/40 transition-colors flex items-center gap-1 text-xs"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
