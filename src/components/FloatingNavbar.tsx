import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, Music, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const FloatingNavbar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress((window.scrollY / total) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMusic = () => {
    const playing = audioEngine.toggle();
    setIsPlayingMusic(playing);
  };

  const toggleSound = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const navLinks = [
    { label: 'Beginning', href: '#beginning' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Calls', href: '#calls' },
    { label: 'Memories', href: '#memories' },
    { label: 'Letter', href: '#letter' },
    { label: 'Song', href: '#song' },
    { label: 'Future', href: '#future' },
  ];

  return (
    <>
      {/* Top Thin Golden Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-50 bg-white/5 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#c5a059] via-[#f7df9e] to-[#d89d9b] transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Glassmorphism Pill Navbar */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-5xl">
        <div className="glass-panel px-4 sm:px-6 py-3 rounded-full border border-white/10 flex items-center justify-between shadow-2xl">
          {/* Brand Monogram */}
          <a
            href="#"
            className="flex items-center gap-2 group text-xs tracking-[0.25em] uppercase font-mono text-[#f7df9e]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37] group-hover:rotate-45 transition-transform" />
            <span className="hidden sm:inline font-serif tracking-widest text-sm text-gradient-gold">
              2 Years
            </span>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs tracking-wider uppercase font-light text-[#c5c1b8]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#f7df9e] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Controls: Music, Sound, Fullscreen */}
          <div className="flex items-center gap-3">
            {/* Music Toggle */}
            <button
              onClick={toggleMusic}
              className={`p-2 rounded-full border transition-all duration-300 flex items-center gap-1.5 ${
                isPlayingMusic
                  ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f7df9e] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
              }`}
              title={isPlayingMusic ? 'Pause Ambient Soundtrack' : 'Play Ambient Soundtrack'}
              aria-label="Toggle Soundtrack"
            >
              <Music className={`w-3.5 h-3.5 ${isPlayingMusic ? 'animate-pulse' : ''}`} />
              <span className="text-[10px] uppercase font-mono tracking-wider hidden sm:inline">
                {isPlayingMusic ? 'Playing' : 'Soundtrack'}
              </span>
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
              title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
              aria-label="Toggle Sound Effects"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-[#d89d9b]" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-[#f7df9e]" />
              )}
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors hidden sm:flex"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
