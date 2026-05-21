// ── Site Data ──────────────────────────────────────────────────────────────
// Edit this file to update all content across the portfolio.

// ...rest of your data
export type EducationItem = {
  institution: string
  degree: string
  period: string
  grade?: string
  current: boolean
  logo: string
}

export type ClientItem = {
  name: string
  role: string
  type: string
  period: string
}

export type VideoWork = {
  id: number
  title: string
  client: string
  year: number
  tool: string
  category: string
  isYouTube: boolean
  video: string
  thumbnail: string
}

type Achievement = {
  title: string
  subtitle: string
  date: string
  icon: string
  color: string
  description: string
  medals: { lift: string; photo: string }[]
}



export const siteData = {
  name: 'Sai Harshitha',
  fullName: 'Parupalli Sai Harshitha',
  tagline: 'CS & IT Student · Full-Stack Developer · Video Editor · Powerlifter',
  bio: 'CS & IT student building real-world tech products, crafting cinematic video edits, and competing in powerlifting. I live at the intersection of code, creativity, and discipline.',
  location: 'Andhra Pradesh, India',
  university: 'KL University',

  discord: {
    userId: '1446545846244999178',
    guildId: '6Th5RPWF4p',
  },


  photos: {
    primary: 'https://res.cloudinary.com/dkrvtfbor/image/upload/v1775338145/IMG_20260405_025506_s0ne5r.jpg',
    secondary: 'https://res.cloudinary.com/dkrvtfbor/image/upload/v1775338145/IMG_20260405_025506_s0ne5r.jpg',
  },



  contact: {
    email: 'Parupallisaiharshitha@gmail.com',
    phone: '+91 86888 47440',
    instagram_edit: 'https://www.instagram.com/editsz537',
    instagram_personal: 'https://www.instagram.com/its.harshi05',
    linkedin: 'https://www.linkedin.com/in/parupalli-saiharshitha-51087b325',
    github: 'https://github.com/core-ctrl',
    discord: 'https://discord.gg/6Th5RPWF4p',
  },

  education: [
    {
      institution: 'KL University',
      degree: 'B.Tech — Computer Science & Information Technology',
      period: '2022 – Present',
      grade: 'Ongoing',
      current: true,
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Koneru_Lakshmaiah_Education_Foundation_logo.png/200px-Koneru_Lakshmaiah_Education_Foundation_logo.png',
    },
    {
      institution: 'Sri Chaitanya Educational Institutions',
      degree: 'Class 11 & 12 — State Board (MPC)',
      period: '2020 – 2022',
      current: false,
      logo: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100065094917919',
    },
    {
      institution: 'Nava Bharath Public School (CBSE)',
      degree: 'Class 10',
      period: '2019 – 2020',
      current: false,
      logo: 'https://play-lh.googleusercontent.com/M52Gtwlv_N9oO_NrEURHwA-ES0Ya-3cu3Cv4TlNkSXwvuRQ18LxxRECYQWu6lnaPCFuqC3kq60hM-hVhfMrrHbY',
    },
  ] as EducationItem[],

  // ── Skills — categorised ───────────────────
  skills: {
    frontend: [
      'React',
      'React Native',
      'Next.js 14',
      'JavaScript (ES6+)',
      'TypeScript',
      'Redux Toolkit',
      'Tailwind CSS',
      'Framer Motion',
    ],
    backend: [
      'Node.js',
      'REST APIs',
      'JWT Auth',
      'Firebase',
      'Spring Boot',
      'Maven',
    ],
    database: [
      'MongoDB',
      'SQL',
    ],
    cloud: [
      'Docker',
      'AWS EC2',
      'AWS RDS',
      'Git & GitHub',
      'Kubernetes',
      'Nginx',
    ],
    creative: [
      'DaVinci Resolve',
      'CapCut',
      'Color Grading',
      'Video Editing',
      'Figma',
    ],
  },

  // All skills for marquee display
  allSkills: [
    'React',
    'React Native',
    'Next.js 14',
    'JavaScript',
    'TypeScript',
    'Redux Toolkit',
    'Tailwind CSS',
    'Framer Motion',
    'Node.js',
    'MongoDB',
    'JWT Auth',
    'Firebase',
    'Docker',
    'AWS EC2',
    'AWS RDS',
    'SQL',
    'Spring Boot',
    'Git & GitHub',
    'DaVinci Resolve',
    'CapCut',
    'Figma',
    'Kubernetes',
    'Maven',
  ],

  // ── Projects ──────────────────────────────
  projects: [
    {
      id: 'moviefinder',
      title: 'MovieFinder',
      subtitle: 'Full-Stack Movie & Series Discovery Platform',
      status: 'Currently Working',
      description:
        'A cinematic full-stack OTT-style discovery platform with hero slider, Ken Burns parallax, dominant-colour extraction, smart fuzzy search, personalised recommendations, JWT auth, Docker containerisation and a hidden admin portal.',
      tech: [
        'Next.js 14',
        'React 18',
        'Redux Toolkit',
        'Tailwind CSS',
        'Framer Motion',
        'MongoDB Atlas',
        'SUPER BASE',
        'FIRE BASE',
        'JWT',
        'TMDB API',
        'Firebase',
        'Docker',
        'Lenis',
      ],
      category: 'Full-Stack',
      color: '#6a50ff',
      featured: true,
      links: {
        live: 'https://movie-finder-for-you-123-k0ovoe5hh-core-ctrls-projects.vercel.app/',
        github: 'https://github.com/core-ctrl/MovieFinderForYOU',
        demo: null,
      },
      highlights: [
        'Cinematic hero slider with Ken Burns parallax & dominant-colour accent extraction',
        'Redux Toolkit — auth, watchlist & UI slices with MongoDB Atlas + localStorage fallback',
        'JWT auth: HTTP-only cookies, bcrypt, rate limiting, Zod validation on all API routes',
        'Smart search with Levenshtein fuzzy matching, Soundex phonetics & intent detection',
        'Personalised recommendation engine: content-based + TMDB popularity + "Because You Watched"',
        'Firebase Analytics, Google AdSense & affiliate "Where to Watch" monetisation',
        'Docker multi-stage build, docker-compose (App + MongoDB + Nginx), Kubernetes + HPA',
        'Hidden admin portal at /admin — user management, cache stats, system health dashboard',
      ],
    },
    {
      id: 'election-monitor',
      title: 'Election Monitoring System',
      subtitle: 'Full-Stack Civic Tech App',
      description:
        'A real-time election monitoring dashboard with role-based views for admins and public users. Built with React, Node.js and SQL with frontend on Vercel and backend on a separate service.',
      tech: ['React', 'Node.js', 'REST APIs', 'SQL', 'Vercel'],
      category: 'Full-Stack',
      color: '#22d3ee',
      featured: true,
      links: {
        live: 'https://pj-7-election-monitoring-system-fro.vercel.app/',
        github: 'https://github.com/core-ctrl/PJ-7-Election-monitoring-system-FRONTEND',
        githubBackend: 'https://github.com/core-ctrl/PJ-7-Election-monitoring-system-BACKEND',
        demo: null,
      },
      highlights: [
        'Real-time election monitoring dashboard with role-based admin & public views',
        'REST API integration with async state management via useState, useEffect, useContext',
        'Responsive, pixel-accurate UI translating functional requirements to mobile-friendly layouts',
        'Frontend on Vercel, backend on separate service with cross-origin API integration',
      ],
    },
    {
      id: 'lms',
      title: 'LMS Frontend',
      subtitle: 'Learning Management System',
      description:
        'Course listing, enrolment and progress-tracking UI with clean, reusable React architecture integrated with backend APIs for user sessions, course data and progress tracking.',
      tech: ['React', 'Tailwind CSS', 'REST APIs'],
      category: 'Frontend',
      color: '#f59e0b',
      featured: false,
      links: {
        live: null,
        github: null,
        demo: null,
      },
      highlights: [
        'Course listing, enrolment and progress-tracking UI components',
        'Reusable React architecture with clean component boundaries',
        'Backend API integration for sessions, course data and progress',
        'Async state management with hooks',
      ],
    },
    {
      id: 'kl-radio',
      title: 'KL Radio',
      subtitle: 'Promos & Event Reels',
      description:
        'High-energy promotional reels and event content for KL University Radio including Influencers Meet and World Radio Day.',
      tech: ['CapCut', 'Color Grading'],
      category: 'Video',
      color: '#f43f5e',
      featured: false,
      links: { live: null, github: null, demo: null },
      highlights: ['Influencers Meet event reel', 'World Radio Day special', 'Brand-consistent motion graphics'],
    },
    {
      id: 'road-safety',
      title: 'Vijayawada City Police',
      subtitle: 'Road Safety Campaign',
      description:
        'Social media content for the Vijayawada City Police Road Safety Campaign — high-impact reels driving public awareness.',
      tech: ['CapCut', 'Social Media'],
      category: 'Video',
      color: '#10b981',
      featured: false,
      links: { live: null, github: null, demo: null },
      highlights: ['Government safety campaign', 'Public awareness reels', 'Mass reach social content'],
    },
  ],

  // ── React Native Readiness ─────────────────
  reactNativeReadiness: [
    {
      area: 'Component Model',
      detail: 'Deep React experience (hooks, context, Redux) directly transfers — same paradigm, different renderer',
    },
    {
      area: 'State Management',
      detail: 'Production use of Redux Toolkit across MovieFinder — slices, thunks, selectors, persistence',
    },
    {
      area: 'API Integration',
      detail: 'Built and consumed REST APIs with Axios, SWR, async/await error handling across multiple projects',
    },
    {
      area: 'Navigation Awareness',
      detail: 'Next.js file-based & dynamic routing — ready to adopt React Navigation patterns',
    },
    {
      area: 'TypeScript',
      detail: 'Familiar with typed props and interfaces; actively levelling up for RN development',
    },
    {
      area: 'Performance Mindset',
      detail: 'Lazy loading, skeleton loaders, LRU caching and intersection observers for perceived performance',
    },
  ],

  // ── All 14 Video Works ─────────────────────
  videos: [
    {
      id: 1,
      title: 'Personal Branding',
      client: 'Self',
      year: 2025,
      tool: 'CapCut',
      category: 'Personal',
      isYouTube: false,
      video: 'https://res.cloudinary.com/dkrvtfbor/video/upload/v1770879319/lv_0_20260205120809_i4qwms.mp4',
      thumbnail: 'https://res.cloudinary.com/dkrvtfbor/video/upload/so_1,w_600/v1770879319/lv_0_20260205120809_i4qwms.jpg',
    },
    {
      id: 2,
      title: 'Personal Branding 2',
      client: 'Self',
      year: 2025,
      tool: 'CapCut',
      category: 'Personal',
      isYouTube: false,
      video: 'https://res.cloudinary.com/dkrvtfbor/video/upload/v1770954059/YouCut_20250929_000110524_lqgs3n.mp4',
      thumbnail: 'https://res.cloudinary.com/dkrvtfbor/video/upload/so_1,w_600/v1770954059/YouCut_20250929_000110524_lqgs3n.jpg',
    },
    {
      id: 3,
      title: 'Influencers Meet',
      client: 'KL Radio',
      year: 2026,
      tool: 'CapCut',
      category: 'Club & Events',
      isYouTube: false,
      video: 'https://res.cloudinary.com/dkrvtfbor/video/upload/v1770899270/YouCut_20260107_085957314_xjaopq.mp4',
      thumbnail: 'https://res.cloudinary.com/dkrvtfbor/video/upload/so_1,w_600/v1770899270/YouCut_20260107_085957314_xjaopq.jpg',
    },
    {
      id: 4,
      title: 'Radio Day',
      client: 'KL Radio',
      year: 2026,
      tool: 'CapCut',
      category: 'Club & Events',
      isYouTube: false,
      video: 'https://res.cloudinary.com/dkrvtfbor/video/upload/v1771050636/lv_0_20260214000803_qggzy3.mp4',
      thumbnail: 'https://res.cloudinary.com/dkrvtfbor/video/upload/so_1,w_600/v1771050636/lv_0_20260214000803_qggzy3.jpg',
    },
    {
      id: 5,
      title: 'SIH — Smart India Hackathon',
      client: 'KL CIIE',
      year: 2025,
      tool: 'CapCut',
      category: 'Club & Events',
      isYouTube: false,
      video: 'https://res.cloudinary.com/dkrvtfbor/video/upload/v1770954058/YouCut_20250916_020159771_novnea.mp4',
      thumbnail: 'https://res.cloudinary.com/dkrvtfbor/video/upload/so_1,w_600/v1770954058/YouCut_20250916_020159771_novnea.jpg',
    },
    {
      id: 6,
      title: 'DTI CIIE Event',
      client: 'KL CIIE',
      year: 2026,
      tool: 'CapCut',
      category: 'Club & Events',
      isYouTube: false,
      video: 'https://res.cloudinary.com/dkrvtfbor/video/upload/v1770955632/YouCut_20260208_010730832_xv0od1.mp4',
      thumbnail: 'https://res.cloudinary.com/dkrvtfbor/video/upload/so_1,w_600/v1770955632/YouCut_20260208_010730832_xv0od1.jpg',
    },
    {
      id: 7,
      title: 'KL Esports Highlights',
      client: 'KL Esports',
      year: 2026,
      tool: 'CapCut',
      category: 'Club & Events',
      isYouTube: false,
      video: 'https://res.cloudinary.com/dkrvtfbor/video/upload/v1770899259/lv_0_20260210213535_umx0bn.mp4',
      thumbnail: 'https://res.cloudinary.com/dkrvtfbor/video/upload/so_1,w_600/v1770899259/lv_0_20260210213535_umx0bn.jpg',
    },
    {
      id: 8,
      title: 'Road Safety Campaign',
      client: 'Vijayawada City Police',
      year: 2026,
      tool: 'CapCut',
      category: 'City Police',
      isYouTube: false,
      video: 'https://res.cloudinary.com/dkrvtfbor/video/upload/v1770899258/YouCut_20260201_142133807_dnua65.mp4',
      thumbnail: 'https://res.cloudinary.com/dkrvtfbor/video/upload/so_1,w_600/v1770899258/YouCut_20260201_142133807_dnua65.jpg',
    },
    {
      id: 9,
      title: 'Her',
      client: 'Individual Edit',
      year: 2025,
      tool: 'CapCut',
      category: 'Broadcast',
      isYouTube: false,
      video: 'https://res.cloudinary.com/dkrvtfbor/video/upload/v1770899278/YouCut_20251010_162133851_moujji.mp4',
      thumbnail: 'https://res.cloudinary.com/dkrvtfbor/video/upload/so_1,w_600/v1770899278/YouCut_20251010_162133851_moujji.jpg',
    },
    {
      id: 10,
      title: 'Ethnic Day',
      client: 'Individual Edit',
      year: 2025,
      tool: 'CapCut',
      category: 'Broadcast',
      isYouTube: false,
      video: 'https://res.cloudinary.com/dkrvtfbor/video/upload/v1770954060/YouCut_20251008_150550591_ydlgab.mp4',
      thumbnail: 'https://res.cloudinary.com/dkrvtfbor/video/upload/so_1,w_600/v1770954060/YouCut_20251008_150550591_ydlgab.jpg',
    },
    {
      id: 11,
      title: 'Deekshitha',
      client: 'Individual Edit',
      year: 2026,
      tool: 'CapCut',
      category: 'Broadcast',
      isYouTube: false,
      video: 'https://res.cloudinary.com/dkrvtfbor/video/upload/v1770899273/video_20260126_183753_edit_uedfe5.mp4',
      thumbnail: 'https://res.cloudinary.com/dkrvtfbor/video/upload/so_1,w_600/v1770899273/video_20260126_183753_edit_uedfe5.jpg',
    },
    {
      id: 12,
      title: 'Veda',
      client: 'Individual Edit',
      year: 2026,
      tool: 'CapCut',
      category: 'Broadcast',
      isYouTube: false,
      video: 'https://res.cloudinary.com/dkrvtfbor/video/upload/v1770899241/YouCut_20260118_212601980_eiabd1.mp4',
      thumbnail: 'https://res.cloudinary.com/dkrvtfbor/video/upload/so_1,w_600/v1770899241/YouCut_20260118_212601980_eiabd1.jpg',
    },
    {
      id: 13,
      title: 'The Cup Cake',
      client: 'Individual Edit',
      year: 2026,
      tool: 'CapCut',
      category: 'Broadcast',
      isYouTube: false,
      video: 'https://res.cloudinary.com/dkrvtfbor/video/upload/v1770899271/YouCut_20260210_015929581_fazpkr.mp4',
      thumbnail: 'https://res.cloudinary.com/dkrvtfbor/video/upload/so_1,w_600/v1770899271/YouCut_20260210_015929581_fazpkr.jpg',
    },
    {
      id: 14,
      title: 'Vlog Format',
      client: 'PavanGaming Telugu',
      year: 2026,
      tool: 'DaVinci Resolve',
      category: 'Long Format',
      isYouTube: true,
      video: 'https://www.youtube.com/embed/P6BS0dtsX_4?autoplay=1',
      thumbnail: 'https://img.youtube.com/vi/P6BS0dtsX_4/hqdefault.jpg',
    },
  ],

  videoCategories: ['All', 'Personal', 'Club & Events', 'City Police', 'Broadcast', 'Long Format'],

  clients: [
    { name: 'KL Radio', role: 'Promos & Event Reels', type: 'Club', period: '2024 – Present' },
    { name: 'KL CIIE', role: 'Innovation & Hackathon Media', type: 'Club', period: '2025' },
    { name: 'KL Esports', role: 'Gaming Highlights', type: 'Club', period: '2025' },
    { name: 'KL EFIT CS&IT', role: 'Student Body Media', type: 'Club', period: '2025' },
    { name: 'Vijayawada City Police', role: 'Road Safety Campaign', type: 'Campaign', period: '2026' },
    { name: 'PavanGaming Telugu', role: 'Long-Format & Reels', type: 'Freelance', period: '2026' },
  ] as ClientItem[],

  achievements: [
    {
      title: 'District Gold Medalist',
      subtitle: 'Powerlifting — All 3 Categories',
      date: 'February 2026',
      icon: '🏅',
      color: '#f6ac2b',
      description:
        'Won gold in all three powerlifting categories at the district level competition. The discipline of competitive strength training mirrors the focus and patience needed in software development.',
      medals: [
        {
          lift: 'District Gold',
          photo: 'https://res.cloudinary.com/dkrvtfbor/image/upload/v1775379131/IMG_20260209_131906_tgjbd6.jpg',
        },
        {
          lift: 'Appreciation',
          photo: 'https://res.cloudinary.com/dkrvtfbor/image/upload/v1775379131/IMG_20260209_131842_hdr9dv.jpg',
        },
        {
          lift: 'Certified',
          photo: 'https://res.cloudinary.com/dkrvtfbor/image/upload/v1775379131/IMG_20260209_131856_uta9tc.jpg',
        },
      ],
    },
  ],

  stats: [
    { label: 'Projects Built', value: '3+' },
    { label: 'Videos Produced', value: '14+' },
    { label: 'Tech Stack', value: '23+' },
    { label: 'Gold Medals', value: '3' },
  ],
}

export type Project = (typeof siteData.projects)[0]
