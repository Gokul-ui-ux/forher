import React, { useEffect, useState } from 'react';
import { Heart, X, Gift, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MEMORY_CONFIG } from '../config/memoryConfig';
import { audioEngine } from '../utils/audioEngine';

interface EasterEggModalState {
  isOpen: boolean;
  title: string;
  message: string;
}

export const EasterEggsController: React.FC = () => {
  const [modal, setModal] = useState<EasterEggModalState | null>(null);
  const [showScrollHeart, setShowScrollHeart] = useState(false);

  // 1. Secret Key Combo Listener (Konami Code or typing 'love')
  useEffect(() => {
    const konamiSequence = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let keyBuffer: string[] = [];
    let typedLetters = '';

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check Konami Code
      keyBuffer.push(e.key);
      if (keyBuffer.length > konamiSequence.length) {
        keyBuffer.shift();
      }
      if (JSON.stringify(keyBuffer) === JSON.stringify(konamiSequence)) {
        triggerEasterEgg(
          MEMORY_CONFIG.EASTER_EGGS.konamiRewardTitle,
          MEMORY_CONFIG.EASTER_EGGS.konamiRewardMessage
        );
      }

      // Check typing "love"
      typedLetters = (typedLetters + e.key.toLowerCase()).slice(-4);
      if (typedLetters === 'love') {
        triggerEasterEgg(
          "Secret Word Unlocked: LOVE",
          "You typed our secret word! You will always have 100% of my devotion, every day of my life."
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 2. Track scroll progress to reveal hidden completion heart
  useEffect(() => {
    const checkScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = window.scrollY / totalHeight;
        setShowScrollHeart(progress > 0.92);
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const triggerEasterEgg = (title: string, message: string) => {
    audioEngine.playStardust();
    setModal({ isOpen: true, title, message });

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F7DF9E', '#D89D9B'],
    });
  };

  const handleSecretStarClick = () => {
    triggerEasterEgg(
      "You Found A Secret Star ✨",
      MEMORY_CONFIG.EASTER_EGGS.secretMessageText
    );
  };

  return (
    <>
      {/* Hidden Secret Tiny Star in viewport corner */}
      <button
        onClick={handleSecretStarClick}
        className="fixed bottom-4 left-4 z-40 p-2 text-[#d4af37]/30 hover:text-[#d4af37] hover:scale-125 transition-all duration-300 group"
        title="What is this tiny star?"
        aria-label="Secret Easter Egg Star"
      >
        <Star className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '12s' }} />
      </button>

      {/* Hidden Completion Heart (appears when user reaches bottom of memories) */}
      {showScrollHeart && (
        <button
          onClick={() =>
            triggerEasterEgg(
              "You Journeyed Through All Our Memories ❤️",
              "You explored every single step of our two years. Thank you for walking through this journey with me, in this website and in real life."
            )
          }
          className="fixed bottom-20 right-6 z-40 p-3 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/60 text-[#f7df9e] shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform duration-300 animate-bounce"
          title="Secret Memory Reward"
          aria-label="Secret Memory Reward"
        >
          <Heart className="w-5 h-5 fill-current text-[#d89d9b]" />
        </button>
      )}

      {/* Easter Egg Modal */}
      {modal?.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div
            className="relative w-full max-w-lg rounded-3xl glass-panel p-8 border border-[#d4af37]/60 text-center shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center mx-auto mb-6">
              <Gift className="w-7 h-7 text-[#f7df9e]" />
            </div>

            <h3 className="text-2xl font-serif text-[#fbf9f5] mb-4">
              {modal.title}
            </h3>

            <p className="text-base text-[#e5e7eb] font-light leading-relaxed mb-6">
              "{modal.message}"
            </p>

            <button
              onClick={() => setModal(null)}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#e5c158] text-[#05070B] font-medium text-xs tracking-widest uppercase hover:scale-105 transition-transform"
            >
              Keep Our Secret
            </button>
          </div>
        </div>
      )}
    </>
  );
};
