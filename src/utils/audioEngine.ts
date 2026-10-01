/**
 * Luxury Web Audio Engine & Ambient Soundtrack Generator
 * 
 * Provides:
 * 1. Procedural romantic ambient soundtrack (soft cinematic piano & warm celestial pads)
 * 2. Support for custom user MP3 / audio URLs
 * 3. Real-time AnalyserNode for audio visualization waves
 * 4. Tender UI sound effects (envelope seal tear, glass chime, stardust burst)
 */

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private customAudio: HTMLAudioElement | null = null;
  private analyser: AnalyserNode | null = null;
  private gainNode: GainNode | null = null;
  private synthInterval: number | null = null;
  private volume = 0.65;
  private isMuted = false;
  private customAudioUrl = '';

  constructor() {
    // Initialized lazily upon first user interaction to comply with browser autoplay policies
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.85;

      this.gainNode.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setCustomAudioUrl(url: string) {
    this.customAudioUrl = url;
    if (url && url.trim().length > 0) {
      if (this.customAudio) {
        this.customAudio.pause();
        this.customAudio.src = url;
      } else {
        this.customAudio = new Audio(url);
        this.customAudio.loop = true;
      }
    }
  }

  public play() {
    this.initContext();
    if (!this.ctx || !this.gainNode) return;

    if (this.customAudioUrl && this.customAudioUrl.trim().length > 0) {
      if (!this.customAudio) {
        this.customAudio = new Audio(this.customAudioUrl);
        this.customAudio.loop = true;
      }
      this.customAudio.volume = this.isMuted ? 0 : this.volume;
      this.customAudio.play().catch(() => {
        // Fallback to procedural synth if file fails to load
        this.startProceduralAtmosphere();
      });
      this.isPlaying = true;
    } else {
      this.startProceduralAtmosphere();
      this.isPlaying = true;
    }
  }

  public pause() {
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.synthInterval) {
      window.clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    this.isPlaying = false;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.isMuted ? 0 : this.volume;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.setVolume(this.volume);
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getFrequencyData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(16).fill(this.isPlaying ? 25 : 0);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  // Romantic ambient chord generator (Max Richter / Ludovico Einaudi inspired)
  private startProceduralAtmosphere() {
    if (!this.ctx || !this.gainNode) return;
    if (this.synthInterval) return;

    // F Major 7 -> C Major -> D Minor 7 -> Bb Major 9 progression frequencies (Hz)
    const chords = [
      [174.61, 220.00, 261.63, 329.63, 523.25], // F, A, C, E, C5
      [130.81, 196.00, 261.63, 329.63, 392.00], // C, G, C, E, G
      [146.83, 220.00, 261.63, 349.23, 440.00], // D, A, C, F, A
      [116.54, 174.61, 233.08, 293.66, 349.23], // Bb, F, Bb, D, F
    ];

    let chordIndex = 0;

    const playChord = () => {
      if (!this.ctx || !this.gainNode || !this.isPlaying) return;
      const now = this.ctx.currentTime;
      const currentChord = chords[chordIndex % chords.length];
      chordIndex++;

      // Pad synth
      currentChord.forEach((freq, idx) => {
        if (!this.ctx || !this.gainNode) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800 + Math.random() * 200, now);
        filter.Q.setValueAtTime(1.5, now);

        const attack = 1.8 + Math.random() * 0.5;
        const release = 4.5 + Math.random() * 1.0;
        const targetVol = (0.04 / currentChord.length) * (1 - idx * 0.1);

        noteGain.gain.setValueAtTime(0.0001, now);
        noteGain.gain.exponentialRampToValueAtTime(targetVol, now + attack);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + attack + release);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.gainNode);

        osc.start(now);
        osc.stop(now + attack + release + 0.1);
      });

      // Occasional delicate piano chime high notes
      const chimeFreqs = [523.25, 659.25, 783.99, 1046.50, 880.00];
      const chimeNote = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];
      this.playGentleChime(chimeNote, 0.05);
    };

    playChord();
    this.synthInterval = window.setInterval(playChord, 5200);
  }

  // Delicate chime sound effect
  public playGentleChime(freq = 784, volumeMultiplier = 0.1) {
    try {
      this.initContext();
      if (!this.ctx || !this.gainNode || this.isMuted) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.12 * volumeMultiplier, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

      osc.connect(gain);
      gain.connect(this.gainNode);

      osc.start(now);
      osc.stop(now + 1.7);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Envelope seal opening sound effect
  public playPaperFlutter() {
    try {
      this.initContext();
      if (!this.ctx || !this.gainNode || this.isMuted) return;

      const now = this.ctx.currentTime;
      // White noise buffer for gentle paper rustle
      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(2.0, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.gainNode);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.36);

      // Add soft chime at end
      setTimeout(() => this.playGentleChime(880, 0.08), 120);
    } catch {
      // Ignored
    }
  }

  // Stardust chime for easter egg triggers
  public playStardust() {
    const notes = [587.33, 739.99, 880.00, 1174.66, 1479.98];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playGentleChime(freq, 0.08);
      }, idx * 90);
    });
  }
}

export const audioEngine = new AmbientAudioEngine();
