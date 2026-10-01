import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
  Disc,
  Tv,
} from 'lucide-react';
import { MEMORY_CONFIG } from '../config/memoryConfig';
import type { SoundtrackTrack } from '../config/memoryConfig';
import { audioEngine } from '../utils/audioEngine';

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export const VinylRecord3D: React.FC = () => {
  const playlist: SoundtrackTrack[] = MEMORY_CONFIG.PLAYLIST || [
    {
      id: 'track-1',
      title: 'Missing',
      artist: 'Vishnu Vijay • Premalu OST',
      duration: '2:21',
      youtubeId: '7J4reXJBGB4',
      youtubeUrl: 'https://youtu.be/7J4reXJBGB4',
      coverUrl: 'https://i.ytimg.com/vi/7J4reXJBGB4/hqdefault.jpg',
      storyNote: 'The song that captures missing you every single day across the distance.',
    },
    {
      id: 'track-2',
      title: 'Aval',
      artist: 'Santhosh Narayanan • Manithan',
      duration: '4:30',
      youtubeId: 'bfRJtnrEjDc',
      youtubeUrl: 'https://youtu.be/bfRJtnrEjDc',
      coverUrl: 'https://i.ytimg.com/vi/bfRJtnrEjDc/hqdefault.jpg',
      storyNote: 'A song as gentle, captivating, and beautiful as you are.',
    },
    {
      id: 'track-3',
      title: 'Jodi Nilave',
      artist: 'Anirudh Ravichander • Thangamagan',
      duration: '4:10',
      youtubeId: 'ZCyYyG6JbT8',
      youtubeUrl: 'https://youtu.be/ZCyYyG6JbT8',
      coverUrl: 'https://i.ytimg.com/vi/ZCyYyG6JbT8/hqdefault.jpg',
      storyNote: 'Two souls shining together like a pair of moons across the night.',
    },
  ];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [durationSec, setDurationSec] = useState(141); // default 2:21
  const [viewMode, setViewMode] = useState<'vinyl' | 'video'>('vinyl');
  const [freqData, setFreqData] = useState<number[]>(new Array(24).fill(8));
  const [isYtReady, setIsYtReady] = useState(false);

  const playerRef = useRef<any>(null);
  const animFrameRef = useRef<number | null>(null);
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  // ==========================================
  // 1. INITIALIZE YOUTUBE IFRAME API
  // ==========================================
  useEffect(() => {
    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      try {
        if (!playerRef.current) {
          playerRef.current = new window.YT.Player('yt-player-host', {
            height: '100%',
            width: '100%',
            videoId: currentTrack.youtubeId || '7J4reXJBGB4',
            playerVars: {
              autoplay: 0,
              controls: 1,
              disablekb: 0,
              enablejsapi: 1,
              modestbranding: 1,
              rel: 0,
              origin: window.location.origin,
            },
            events: {
              onReady: (event: any) => {
                setIsYtReady(true);
                event.target.setVolume(Math.round(volume * 100));
              },
              onStateChange: (event: any) => {
                // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
                if (event.data === 1) {
                  setIsPlaying(true);
                  audioEngine.pause();
                } else if (event.data === 2) {
                  setIsPlaying(false);
                } else if (event.data === 0) {
                  // Advance to next song automatically when finished
                  handleNextTrack();
                }
              },
            },
          });
        }
      } catch (err) {
        console.error('Error initializing YouTube Player:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const prevHandler = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevHandler) prevHandler();
        initPlayer();
      };

      if (!document.getElementById('yt-iframe-script')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript?.parentNode?.insertBefore(tag, firstScript);
      }
    }

    return () => {
      // Keep player intact across view changes
    };
  }, []);

  // When track index changes, load and play the new video
  useEffect(() => {
    const track = playlist[currentTrackIndex];
    if (track.youtubeId) {
      if (playerRef.current && typeof playerRef.current.loadVideoById === 'function' && isYtReady) {
        if (isPlaying) {
          playerRef.current.loadVideoById(track.youtubeId);
          playerRef.current.playVideo();
          audioEngine.pause();
        } else {
          playerRef.current.cueVideoById(track.youtubeId);
        }
      }
    } else {
      // Local/procedural ambient soundscape
      if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
        playerRef.current.pauseVideo();
      }
      if (isPlaying) {
        audioEngine.play();
      }
    }
  }, [currentTrackIndex, isYtReady]);

  // Sync volume to YouTube and WebAudio
  useEffect(() => {
    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      playerRef.current.setVolume(isMuted ? 0 : Math.round(volume * 100));
    }
    audioEngine.setVolume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  // ==========================================
  // 2. PLAYBACK CONTROLS
  // ==========================================
  const togglePlayback = () => {
    audioEngine.playGentleChime(750, 0.08);

    if (currentTrack.youtubeId && playerRef.current && typeof playerRef.current.playVideo === 'function') {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
        audioEngine.pause();
      }
    } else {
      // Procedural audio
      const nowPlaying = audioEngine.toggle();
      setIsPlaying(nowPlaying);
      if (nowPlaying && playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
        playerRef.current.pauseVideo();
      }
    }
  };

  const handleNextTrack = () => {
    audioEngine.playGentleChime(880, 0.08);
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
    setProgress(0);
    setCurrentTimeSec(0);

    const nextTrack = playlist[nextIndex];
    if (nextTrack.youtubeId && playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
      playerRef.current.loadVideoById(nextTrack.youtubeId);
      playerRef.current.playVideo();
      audioEngine.pause();
    } else {
      if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
        playerRef.current.pauseVideo();
      }
      audioEngine.play();
    }
  };

  const handlePrevTrack = () => {
    audioEngine.playGentleChime(660, 0.08);
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true);
    setProgress(0);
    setCurrentTimeSec(0);

    const prevTrack = playlist[prevIndex];
    if (prevTrack.youtubeId && playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
      playerRef.current.loadVideoById(prevTrack.youtubeId);
      playerRef.current.playVideo();
      audioEngine.pause();
    } else {
      if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
        playerRef.current.pauseVideo();
      }
      audioEngine.play();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (isMuted && val > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    setProgress(pct * 100);

    if (currentTrack.youtubeId && playerRef.current && typeof playerRef.current.seekTo === 'function') {
      const dur = playerRef.current.getDuration() || durationSec;
      const targetTime = pct * dur;
      playerRef.current.seekTo(targetTime, true);
      setCurrentTimeSec(targetTime);
    } else {
      setCurrentTimeSec(pct * durationSec);
    }
  };

  // ==========================================
  // 3. REAL-TIME PROGRESS & VISUALIZER LOOP
  // ==========================================
  useEffect(() => {
    let tickCount = 0;
    const updateLoop = () => {
      if (isPlayingRef.current) {
        tickCount++;

        // Get actual YouTube time if playing video
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          try {
            const cur = playerRef.current.getCurrentTime() || 0;
            const dur = playerRef.current.getDuration() || 141;
            if (dur > 0) {
              setCurrentTimeSec(cur);
              setDurationSec(dur);
              setProgress((cur / dur) * 100);
            }
          } catch {
            // fallback
          }
        } else {
          // Fallback time advance
          setCurrentTimeSec((prev) => {
            const next = prev + 0.05;
            setProgress((next / durationSec) * 100);
            return next >= durationSec ? 0 : next;
          });
        }

        // Animated Equalizer Frequency Wave (rhythmic pulses)
        const bars: number[] = [];
        const count = 24;
        for (let i = 0; i < count; i++) {
          const wave1 = Math.sin(tickCount * 0.12 + i * 0.4) * 35;
          const wave2 = Math.cos(tickCount * 0.08 + i * 0.6) * 25;
          const baseline = i % 2 === 0 ? 55 : 40;
          bars.push(Math.max(12, Math.min(95, baseline + wave1 + wave2)));
        }
        setFreqData(bars);
      } else {
        setFreqData(new Array(24).fill(8));
      }

      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [durationSec]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section id="song" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#d4af37]/6 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#0e121c]/70 backdrop-blur-md mb-6">
          <Music className="w-3.5 h-3.5 text-[#e5c158]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#f7df9e] font-mono">
            Soundtrack of Us
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-gradient-ivory mb-6 tracking-wide uppercase">
          If Our Story Had a Sound…
        </h2>

        <p className="text-base sm:text-lg font-light text-[#a8a29e] max-w-2xl mx-auto leading-relaxed">
          The melody that plays in my head whenever I think of you across the miles. Press play to experience our personal soundtrack.
        </p>

        {/* View Mode Toggle: 3D Turntable vs Music Video */}
        <div className="mt-8 inline-flex items-center p-1 rounded-full bg-[#0a0d14] border border-white/10 shadow-inner">
          <button
            onClick={() => setViewMode('vinyl')}
            className={`flex items-center gap-2 px-5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
              viewMode === 'vinyl'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#f7df9e] text-[#05070B] font-bold shadow-md'
                : 'text-[#9ca3af] hover:text-white'
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            <span>3D TURNTABLE</span>
          </button>
          <button
            onClick={() => setViewMode('video')}
            className={`flex items-center gap-2 px-5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
              viewMode === 'video'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#f7df9e] text-[#05070B] font-bold shadow-md'
                : 'text-[#9ca3af] hover:text-white'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>MUSIC VIDEO</span>
          </button>
        </div>
      </div>

      {/* 3D Turntable & Luxury Music Deck */}
      <div className="max-w-4xl mx-auto rounded-3xl glass-panel border border-[#d4af37]/40 p-6 sm:p-10 shadow-2xl relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left Column: Visual Area (3D Vinyl Disc OR Music Video) */}
          <div className="md:col-span-6 flex flex-col items-center justify-center min-h-[290px]">
            {viewMode === 'vinyl' ? (
              // 3D Revolving Vinyl Record
              <div className="relative w-64 sm:w-72 h-64 sm:h-72">
                {/* Outer Golden Turntable Platter */}
                <div className="absolute inset-0 rounded-full border border-[#d4af37]/30 bg-gradient-to-tr from-[#0e121c] to-[#07090e] shadow-2xl" />

                {/* Rotating Vinyl Disc */}
                <div
                  className={`absolute inset-3 rounded-full bg-[#0a0a0f] border-4 border-[#1a1a24] shadow-2xl flex items-center justify-center ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                  style={{
                    animationDuration: '6s',
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                    backgroundImage: `radial-gradient(circle, #08080c 20%, #151520 22%, #08080c 24%, #12121b 35%, #08080c 37%, #171724 50%, #09090e 52%, #14141e 68%, #07070b 70%)`,
                  }}
                >
                  {/* Center Gold Label */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#c5a059] to-[#f7df9e] border-2 border-[#fff]/40 shadow-inner flex flex-col items-center justify-center p-2 text-center text-[#05070b]">
                    <Disc className="w-5 h-5 mb-0.5 text-[#05070b]" />
                    <span className="text-[9px] font-bold uppercase tracking-wider truncate w-20">
                      {currentTrack.title}
                    </span>
                    <span className="text-[8px] tracking-tight opacity-75">
                      Oct 02 • 2 Yrs
                    </span>
                    {/* Center Spindle Hole */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#05070b] border border-[#d4af37] mt-1" />
                  </div>
                </div>

                {/* Stylized Tonearm */}
                <div
                  className={`absolute top-2 right-2 w-28 h-3 origin-top-right transition-transform duration-700 pointer-events-none ${
                    isPlaying ? 'rotate-[25deg]' : 'rotate-0'
                  }`}
                >
                  <div className="w-full h-1 bg-gradient-to-r from-[#d4af37] to-[#71717a] rounded-full shadow-lg" />
                  <div className="absolute left-0 -top-1 w-3 h-3 bg-[#d4af37] rounded-sm" />
                </div>
              </div>
            ) : (
              // Embedded Video Player Display
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-2xl bg-black">
                {currentTrack.youtubeId ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${currentTrack.youtubeId}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                    title={currentTrack.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0c101a] to-[#05070b]">
                    <Music className="w-10 h-10 text-[#d4af37] mb-3 animate-pulse" />
                    <h4 className="text-lg font-serif text-white">{currentTrack.title}</h4>
                    <p className="text-xs text-[#a8a29e] mt-1">Ambient Piano Reverie</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Audio Track Info & Luxury Controls */}
          <div className="md:col-span-6 flex flex-col justify-center">
            {/* Song Meta */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-mono px-2.5 py-0.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30">
                  Track 0{currentTrackIndex + 1} of 0{playlist.length}
                </span>
                {isPlaying && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#4ade80]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-ping" />
                    PLAYING
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-[#fbf9f5] mb-1">
                {currentTrack.title}
              </h3>
              <p className="text-sm sm:text-base text-[#a8a29e] font-light">
                {currentTrack.artist}
              </p>
              <p className="text-xs text-[#d4af37]/90 font-serif italic mt-1.5">
                "{currentTrack.storyNote}"
              </p>
            </div>

            {/* Real-time Frequency Wave Visualizer */}
            <div className="h-12 rounded-2xl bg-black/40 border border-white/5 p-2.5 flex items-end justify-between gap-1 mb-5">
              {freqData.map((val, idx) => (
                <div
                  key={idx}
                  className="flex-1 rounded-t-full transition-all duration-75"
                  style={{
                    height: `${Math.min(100, Math.max(12, val))}%`,
                    backgroundColor: idx % 2 === 0 ? '#d4af37' : '#d89d9b',
                    opacity: isPlaying ? 0.9 : 0.25,
                  }}
                />
              ))}
            </div>

            {/* Interactive Seekable Progress Bar */}
            <div className="mb-5">
              <div
                onClick={handleSeek}
                className="w-full h-2 rounded-full bg-white/10 relative overflow-hidden mb-2 cursor-pointer group"
                title="Click to seek"
              >
                <div
                  className="h-full bg-gradient-to-r from-[#c5a059] to-[#f7df9e] rounded-full transition-all duration-150 group-hover:brightness-125"
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-[#9ca3af]">
                <span>{formatTime(currentTimeSec)}</span>
                <span>{currentTrack.duration}</span>
              </div>
            </div>

            {/* Player Controls (Prev, Play/Pause, Next + Volume) */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Transport Buttons: Prev, Play/Pause, Next */}
              <div className="flex items-center gap-3">
                {/* Previous Track Button */}
                <button
                  onClick={handlePrevTrack}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 active:scale-95 transition-all"
                  aria-label="Previous Track"
                  title="Previous Song"
                >
                  <SkipBack className="w-4 h-4 fill-current" />
                </button>

                {/* Big Golden Play / Pause Button */}
                <button
                  onClick={togglePlayback}
                  className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7df9e] to-[#d4af37] text-[#05070b] font-medium tracking-wide shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 font-mono text-xs font-bold"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                      <span>PLAY</span>
                    </>
                  )}
                </button>

                {/* Next Track Button */}
                <button
                  onClick={handleNextTrack}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 active:scale-95 transition-all"
                  aria-label="Next Track"
                  title="Next Song"
                >
                  <SkipForward className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Volume Slider & Mute Toggle */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={toggleMute}
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="Mute"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-[#d89d9b]" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#f7df9e]" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 sm:w-20 accent-[#d4af37] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden YouTube IFrame host for background audio execution */}
      <div
        id="yt-player-host"
        className="absolute -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none"
      />
    </section>
  );
};
