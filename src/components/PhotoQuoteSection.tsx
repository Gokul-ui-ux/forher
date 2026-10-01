import React, { useEffect, useState, useRef } from 'react';
import { MEMORY_CONFIG } from '../config/memoryConfig';

export const PhotoQuoteSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const data = MEMORY_CONFIG.PHOTO_QUOTE;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const offset = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      setScrollY(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-32"
    >
      {/* Parallax Background Photo with Zoom & Dimming */}
      <div
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center transition-transform duration-300 ease-out will-change-transform"
        style={{
          backgroundImage: `url(${data.photoUrl})`,
          transform: `scale(${1.05 + scrollY * 0.08}) translateY(${(scrollY - 0.5) * -40}px)`,
        }}
      />

      {/* Cinematic Dark Vignette & Gold Gradient Overlays */}
      <div className="absolute inset-0 bg-[#05070B]/55 backdrop-blur-[0.5px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/20 to-[#05070B]" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#05070B]/40 to-[#05070B]" />

      {/* Emotional Typography Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Subtle decorative line */}
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-10" />

        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#fbf9f5] leading-relaxed mb-8 tracking-wide">
          "{data.quoteLine1}"
        </h3>

        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-gradient-gold leading-relaxed mb-10 tracking-wide">
          "{data.quoteLine2}"
        </h3>

        <p className="text-sm sm:text-base font-light text-[#c5c1b8] max-w-xl mx-auto tracking-widest uppercase">
          {data.subtext}
        </p>

        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-10" />
      </div>
    </section>
  );
};
