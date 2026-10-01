/**
 * ==============================================================================
 * 🌟 MEMORY CONFIGURATION FILE — GOKUL & INIYA 🌟
 * ==============================================================================
 * Anniversary Date: October 2
 * "Two people. Two places. One story."
 * ==============================================================================
 */

export interface TimelineItem {
  id: string;
  dayNumber?: string;
  date: string;
  title: string;
  description: string;
  photoUrl: string;
  location?: string;
  tag?: string;
  secretNote?: string;
}

export interface EditorialMemory {
  id: string;
  title: string;
  date: string;
  caption: string;
  photoUrl: string;
  span?: 'large' | 'tall' | 'wide' | 'standard';
}

export interface SoundtrackTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  youtubeId?: string;
  youtubeUrl?: string;
  coverUrl?: string;
  storyNote: string;
}

export interface CallTypeCard {
  id: string;
  title: string;
  iconName: string;
  hoursNote: string;
  description: string;
  quote: string;
}

export interface LifeStage {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  symbolicDetail: string;
}

export const MEMORY_CONFIG = {
  // ==========================================
  // 1. NAMES & KEY ANNIVERSARY DATE: OCTOBER 2
  // ==========================================
  BOY_NAME: "Gokul",
  GIRL_NAME: "Iniya",
  HER_NAME: "Iniya",
  MY_NAME: "Gokul",
  COUPLE_TAGLINE: "Gokul & Iniya",
  THEME_TAGLINE: "Two people. Two places. One story.",

  // Primary Anniversary Date (October 2)
  DATE_DISPLAY: "October 2",
  FIRST_MEETING_DATE: "October 2, 2024",
  ANNIVERSARY_DATE: "October 2, 2026",
  YEARS_COUNT: 2,
  DAYS_COUNT: "730+",
  CALL_HOURS_COUNT: "6500+",

  // ==========================================
  // 2. OUR SOUNDTRACK PLAYLIST
  // ==========================================
  PLAYLIST: [
    {
      id: "track-1",
      title: "Missing",
      artist: "Vishnu Vijay • Premalu OST",
      duration: "2:21",
      youtubeId: "7J4reXJBGB4",
      youtubeUrl: "https://youtu.be/7J4reXJBGB4",
      coverUrl: "https://i.ytimg.com/vi/7J4reXJBGB4/hqdefault.jpg",
      storyNote: "The song that captures missing you every single day across the distance.",
    },
    {
      id: "track-2",
      title: "Aval",
      artist: "Santhosh Narayanan • Manithan",
      duration: "4:30",
      youtubeId: "bfRJtnrEjDc",
      youtubeUrl: "https://youtu.be/bfRJtnrEjDc",
      coverUrl: "https://i.ytimg.com/vi/bfRJtnrEjDc/hqdefault.jpg",
      storyNote: "A song as gentle, captivating, and beautiful as you are.",
    },
    {
      id: "track-3",
      title: "Jodi Nilave",
      artist: "Anirudh Ravichander • Thangamagan",
      duration: "4:10",
      youtubeId: "ZCyYyG6JbT8",
      youtubeUrl: "https://youtu.be/ZCyYyG6JbT8",
      coverUrl: "https://i.ytimg.com/vi/ZCyYyG6JbT8/hqdefault.jpg",
      storyNote: "Two souls shining together like a pair of moons across the night.",
    },
  ] as SoundtrackTrack[],

  OUR_SONG: {
    title: "Missing",
    artist: "Vishnu Vijay (Premalu)",
    youtubeId: "7J4reXJBGB4",
    audioUrl: "", // Built-in ambient romantic piano soundscape fallback
    duration: "2:21",
  },

  // ==========================================
  // 3. THE FIRST MEETING ("Where It All Began")
  // ==========================================
  FIRST_MEETING: {
    title: "Where It All Began",
    dayLabel: "Day 1.",
    date: "October 2, 2024",
    leadQuote: "October 2, 2024 • 15:53 — 'Neet aspirant thaana' • 'Yes😂' • 'Appada'",
    handwrittenNote: "If I could go back to the exact notification on October 2 that started our story, I'd open it a thousand times again.",
    photoUrl: "/photos/day1-chat.jpg",
    location: "October 2, 2024 • WhatsApp Chat",
    extendedStory: "On October 2, 2024 at 15:53, a simple greeting turned into the beginning of us. 'Hello' -> 'Hi' -> 'Neet aspirant thaana' -> 'Yes😂' -> 'Appada'. Neither of us could have guessed that a casual question on a regular afternoon would bloom into 6500+ hours of conversations and two unforgettable years together.",
  },

  // ==========================================
  // 4. TIMELINE (REAL PHOTOS & NATURAL CHRONOLOGY)
  // ==========================================
  TIMELINE: [
    {
      id: "timeline-2",
      dayNumber: "Day 1",
      date: "October 2, 2024 • 15:53",
      title: "October 2: Where It All Began",
      description: "The very first WhatsApp conversation that started our world. 'Neet aspirant thaana' • 'Yes😂' • 'Appada'. From that ordinary afternoon, not a single day went by without thinking of you.",
      location: "Our first WhatsApp message",
      photoUrl: "/photos/day1-chat.jpg",
      tag: "The Spark",
      secretNote: "I stared at that 'Yes😂' reply with the biggest smile on my face.",
    },
    {
      id: "timeline-3",
      dayNumber: "Quiet Sanctuary",
      date: "Library Moments",
      title: "Cheek to Cheek in the Library",
      description: "Tucking ourselves into the quiet library aisles between classes, leaning our cheeks together, and snapping this selfie. Every quiet whisper in that room felt like our own secret universe.",
      location: "College Library Aisles",
      photoUrl: "/photos/library-cheek.jpg",
      tag: "Secret Haven",
      secretNote: "Standing this close to you made my heart beat faster than any exam ever could.",
    },
    {
      id: "timeline-4",
      dayNumber: "Pure Joy",
      date: "Unfiltered Happiness",
      title: "The Loudest Laughter & Biggest Smiles",
      description: "Look at how wide our smiles are here! When I'm holding you like this, everything in the world feels completely right. Your laughter has always been my favorite melody.",
      location: "Campus Smiles",
      photoUrl: "/photos/sky-blue-smile.jpg",
      tag: "Pure Joy",
      secretNote: "This photo captures exactly how happy my heart feels whenever I am with you.",
    },
    {
      id: "timeline-5",
      dayNumber: "Comfort",
      date: "Resting Close",
      title: "Safe in Your Warmth",
      description: "Holding onto you tightly, resting right beside your shoulder. In a world full of rush and distance, being right here with you is the only place I ever want to be.",
      location: "Wrapped in each other's warmth",
      photoUrl: "/photos/warm-hug.jpg",
      tag: "Sanctuary",
      secretNote: "Your presence is my home. No matter the miles, you are where my peace lives.",
    },
    {
      id: "timeline-6",
      dayNumber: "Pure Affection",
      date: "Tender Moments",
      title: "A Gentle Kiss on Your Cheek",
      description: "Closing your eyes and leaning softly into my kiss. A quiet, precious moment that captured everything words could never say. I promise to keep kissing your cheek like this forever.",
      location: "Stolen Kisses",
      photoUrl: "/photos/kiss-cheek.jpg",
      tag: "Tender Love",
      secretNote: "The sweetest feeling in the world is kissing your cheek and feeling your smile underneath.",
    },
    {
      id: "timeline-7",
      dayNumber: "2 Years Today",
      date: "October 2, 2026",
      title: "Standing Proudly Beside You",
      description: "Standing tall right behind you, endlessly proud to be yours. Two whole years since that first hello on October 2, and every day I fall in love with you all over again.",
      location: "October 2 • Two Years Strong",
      photoUrl: "/photos/gentle-smile.jpg",
      tag: "Forever Yours",
      secretNote: "Happy 2nd Anniversary of the day we first met ❤️ Forever yours, Iniya.",
    },
  ] as TimelineItem[],

  // ==========================================
  // 5. CALLS SECTION: 6500+ HOURS
  // ==========================================
  CALL_TYPES: [
    {
      id: "call-1",
      title: "GMeet",
      iconName: "Video",
      hoursNote: "Our virtual home",
      description: "Where we set up our laptops for hours, studying, working, eating meals, and living life together across the screen.",
      quote: "Our shared virtual living room through screens across miles.",
    },
    {
      id: "call-2",
      title: "Video Calls",
      iconName: "Camera",
      hoursNote: "Seeing your smile",
      description: "Quick check-ins, walking around our rooms, showing each other things, and making funny faces.",
      quote: "Seeing your smile through the screen always melted the distance away.",
    },
    {
      id: "call-3",
      title: "Late Nights",
      iconName: "Moon",
      hoursNote: "Midnight to dawn",
      description: "When the world grew quiet and it felt like just the two of us existing in the universe.",
      quote: "Some of our favorite conversations happened when the rest of the world was asleep.",
    },
    {
      id: "call-4",
      title: "Random Conversations",
      iconName: "MessageCircle",
      hoursNote: "No agenda, just us",
      description: "From hypothetical questions to debating silly things, laughing until our stomachs hurt.",
      quote: "Talking for hours about everything and nothing at all.",
    },
    {
      id: "call-5",
      title: "Silent Calls",
      iconName: "Headphones",
      hoursNote: "Comfortable presence",
      description: "No pressure to speak. Just the soft click of keyboards and the comfort of knowing you are right there.",
      quote: "Just having you on the call—knowing you were there was always enough.",
    },
    {
      id: "call-6",
      title: "Good Morning Calls",
      iconName: "Sun",
      hoursNote: "Starting the day together",
      description: "Sleepy raspy voices, waking each other up, wishing each other a great day ahead.",
      quote: "The first voice that started my day, no matter the miles.",
    },
    {
      id: "call-7",
      title: "Good Night Calls",
      iconName: "Sparkles",
      hoursNote: "Ending the day in peace",
      description: "Recounting the day's events, whispering sweet nothings, and drifting off with the phone beside the pillow.",
      quote: "Falling asleep with the phone glowing gently beside the pillow.",
    },
  ] as CallTypeCard[],

  // ==========================================
  // 6. OUR FAVORITE MEMORIES (CINEMATIC EDITORIAL GALLERY)
  // Selected best photographs without complex orbit/categories
  // ==========================================
  FAVORITE_MEMORIES: [
    {
      id: "mem-1",
      title: "Side by Side on Campus",
      date: "College Days",
      caption: "Sitting beside you in the campus hallway, sharing laughs between classes. Every ordinary moment felt extraordinary with you.",
      photoUrl: "/photos/campus-sitting.jpg",
      span: "large",
    },
    {
      id: "mem-2",
      title: "The Way I Look at You",
      date: "Unspoken Words",
      caption: "I could look at you forever and never get tired of how your smile lights up everything around us.",
      photoUrl: "/photos/fond-gaze.jpg",
      span: "tall",
    },
    {
      id: "mem-3",
      title: "Stolen Kisses by the Book Stacks",
      date: "Quiet Corners",
      caption: "A quick kiss on your cheek while you beamed with that radiant smile between the library shelves.",
      photoUrl: "/photos/library-kiss.jpg",
      span: "tall",
    },
    {
      id: "mem-4",
      title: "Cheek to Cheek",
      date: "Library Whispers",
      caption: "Tucked between the bookshelves, leaning our cheeks together in quiet warmth.",
      photoUrl: "/photos/library-cheek.jpg",
      span: "standard",
    },
    {
      id: "mem-5",
      title: "A Gentle, Peaceful Kiss",
      date: "Sweet Whispers",
      caption: "Soft, quiet affection. Closing our eyes and feeling the pure comfort of each other's presence.",
      photoUrl: "/photos/tender-kiss.jpg",
      span: "wide",
    },
    {
      id: "mem-6",
      title: "Safe in Your Warmth",
      date: "Safe In Your Arms",
      caption: "Holding you tight, resting right beside your shoulder. In a chaotic world, you are my peace.",
      photoUrl: "/photos/warm-hug.jpg",
      span: "standard",
    },
    {
      id: "mem-7",
      title: "Pure Unfiltered Happiness",
      date: "Campus Smiles",
      caption: "The biggest, brightest smiles. Holding you close while laughing with all our hearts.",
      photoUrl: "/photos/sky-blue-smile.jpg",
      span: "standard",
    },
    {
      id: "mem-8",
      title: "Standing Proudly Beside You",
      date: "October 2, 2026",
      caption: "Two whole years since that first hello on October 2. Endlessly proud to stand beside you, today and forever.",
      photoUrl: "/photos/gentle-smile.jpg",
      span: "large",
    },
  ] as EditorialMemory[],

  // ==========================================
  // 7 & 8. A PERSONAL LETTER FROM GOKUL TO INIYA
  // Written across the distance, sealed with love
  // ==========================================
  ROYAL_SCROLL_LETTER: {
    sectionTitle: "A LETTER FOR YOU",
    subtitle: "Written across the miles, sealed with love • October 2",
    waxSealLabel: "OPEN MY LETTER",
    salutation: "Dear Iniya,",
    paragraphs: [
      "Two years ago on October 2, you entered my life quietly through a screen. I had no idea then that a simple conversation would turn into the most meaningful, grounding part of my world.",
      "Being apart hasn't always been the easiest path. There were days when a screen felt too small, when the miles felt too heavy, and when all I wanted was to sit quietly in the same room as you. But through every single one of those days, you showed me what genuine commitment feels like. You gave 6500+ hours of your life to our calls, your laughter to my darkest evenings, and your honest heart to mine.",
      "Loving you from a distance taught me that love isn't just about physical convenience. It's about showing up every morning with a kind word, listening intently when the other is tired, and holding onto a promise with patient, quiet strength.",
      "Thank you for being my peace, my favorite conversation, and my home across the miles. Distance was always between us, but it was never bigger than what we have.",
      "I cannot wait for the day when the screen finally turns off, and I can look across the room and simply see you there.",
    ],
    valediction: "Forever yours,",
    authorName: "Gokul",
    dateStamp: "October 2",
  },

  // ==========================================
  // 9. THE LIFE WE'RE STILL WRITING (5 LIFE STAGES)
  // ==========================================
  LIFE_WE_ARE_WRITING: {
    sectionTitle: "THE LIFE WE'RE STILL WRITING",
    leadQuote: "The future isn't just about closing a distance; it's about the entire life we are building together, step by step.",
    stages: [
      {
        number: "01",
        title: "THE DAY WE FINALLY DON'T HAVE TO SAY GOODBYE",
        subtitle: "No more countdown timers or disconnecting calls",
        description: "The moment when the miles between us permanently turn to zero. Walking out into the same air, without having to pack bags or say goodbye through a microphone.",
        iconName: "Compass",
        symbolicDetail: "The end of distance, the beginning of everyday presence.",
      },
      {
        number: "02",
        title: "THE DAY WE GET MARRIED",
        subtitle: "A quiet, sacred promise",
        description: "Standing before everyone who matters, looking at the person who was my favorite notification for years, and taking the oath to protect, cherish, and grow beside you for the rest of our lives.",
        iconName: "Heart",
        symbolicDetail: "Two separate paths permanently becoming one.",
      },
      {
        number: "03",
        title: "OUR FIRST HOME",
        subtitle: "One home. Two people. A thousand little memories.",
        description: "Choosing our keys, decorating a living room that doesn't exist on a laptop screen, hanging pictures, and coming back through the front door at the end of the day knowing you are inside.",
        iconName: "Home",
        symbolicDetail: "A sanctuary built out of love, peace, and patience.",
      },
      {
        number: "04",
        title: "BUILDING OUR FAMILY",
        subtitle: "A warmth passed down",
        description: "A home filled with soft laughter, tiny footsteps, and bedtime stories. Creating a little world of our own, built on the steady foundation of everything we learned together.",
        iconName: "Sparkles",
        symbolicDetail: "Two figures with a tiny third light.",
      },
      {
        number: "05",
        title: "GROWING OLD TOGETHER",
        subtitle: "Through every version of ourselves",
        description: "Silver hair, quiet mornings, hands holding on porch chairs. Looking back at two decades, four decades, six decades, and still seeing the same girl I met on October 2.",
        iconName: "Infinity",
        symbolicDetail: "Through every version of ourselves, I still want you beside me.",
      },
    ] as LifeStage[],
  },

  // ==========================================
  // 10. HER DREAMS
  // ==========================================
  HER_DREAMS: {
    title: "YOUR DREAMS",
    quote1: "I want to see you achieve every dream you've ever whispered about.",
    quote2: "Whatever you wish for, I'll always be cheering for you — and whenever I can, I'll help turn those wishes into reality.",
    subtext: "Your ambitions, your passions, your quiet goals—they are precious to me. You will never have to choose between your dreams and being loved.",
  },

  // ==========================================
  // 11. THE LITTLE THINGS (EVERYDAY LIFE TOGETHER)
  // ==========================================
  THE_LITTLE_THINGS: [
    { title: "Waking Up Beside Each Other", note: "No screen brightness, just gentle morning light and messy hair." },
    { title: "Making Breakfast Together", note: "Steaming coffee, spilled flour, and quiet Sunday conversations." },
    { title: "Random Conversations in the Kitchen", note: "Debating the universe while the kettle boils." },
    { title: "Laughing Over Silly Things", note: "The kind of laughter where you can't breathe and your stomach aches." },
    { title: "Watching Movies on the Couch", note: "Under one blanket without worrying about audio desync." },
    { title: "Celebrating Birthdays in Person", note: "Blowing out candles together instead of through a webcam." },
    { title: "Coming Home to Each Other", note: "Unlocking the door and hearing your voice say 'You're home.'" },
    { title: "Growing Together Through Life", note: "Learning, evolving, and choosing each other every single day." },
  ],

  // ==========================================
  // 12. PHOTO + QUOTE SECTION
  // ==========================================
  PHOTO_QUOTE: {
    photoUrl: "/photos/holding-hands.jpg",
    quoteLine1: "Some people enter your life quietly…",
    quoteLine2: "…and somehow become impossible to imagine life without.",
    subtext: "Two years since October 2 • Gokul & Iniya",
  },

  // ==========================================
  // 13. FINAL CLOSING REVEAL (EXACT TEXT)
  // ==========================================
  FINAL_REVEAL: {
    line1: "WE HAVEN'T LIVED ALL OUR BEST DAYS YET.",
    line2: "Some of them are still waiting for us.",
    poemLines: [
      "Marriage.",
      "Our home.",
      "Our family.",
      "Your dreams.",
      "My dreams.",
      "And all the ordinary days in between.",
    ],
    transitionLine: "Whatever life looks like...",
    climaxHeadline: "I WANT TO GROW THROUGH IT WITH YOU.",
    coupleNames: "Gokul & Iniya",
    anniversaryMessage: "Happy 2 Years Since October 2.",
    photoUrl: "/photos/first-photo.jpg",
    buttonLabel: "Send Our Promise ✨",
  },

  // ==========================================
  // 14. HIDDEN EASTER EGGS
  // ==========================================
  EASTER_EGGS: {
    secretMessageText: "You found something I didn't tell you about: October 2 was the best day of my life, and every day since has only proven it.",
    doubleClickPolaroidNote: "October 2, 2024 — the day my favorite story began.",
    konamiRewardTitle: "SECRET UNLOCKED: Lifetime Voucher",
    konamiRewardMessage: "You entered the secret code! Voucher valid for: 1x Lifetime of breakfast in bed, unlimited tight hugs, and unending support for all your dreams.",
  },
};
