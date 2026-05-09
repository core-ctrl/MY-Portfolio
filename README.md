# Sai Harshitha — Portfolio

A premium modern developer portfolio built with Next.js 15, Framer Motion, Tailwind CSS, and TypeScript.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, font imports
│   ├── page.tsx            # Main page — composes all sections
│   └── globals.css         # Global styles, CSS variables, animations
│
├── components/
│   ├── layout/
│   │   ├── LoadingScreen.tsx   # Cinematic loading animation (runs once)
│   │   ├── CustomCursor.tsx    # Dual-layer cursor with lerp lag
│   │   ├── ScrollProgress.tsx  # Gradient progress bar at top
│   │   ├── Navbar.tsx          # Sticky nav with active link detection
│   │   └── Footer.tsx          # Simple social footer
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx         # Full-viewport hero with mouse-follow
│   │   ├── AboutSection.tsx        # Story, timeline, stats, clients
│   │   ├── ProjectsSection.tsx     # Bento grid + modal detail view
│   │   ├── SkillsSection.tsx       # Marquee + category cards
│   │   ├── AchievementsSection.tsx # Powerlifting gold medal highlight
│   │   └── ContactSection.tsx      # Form + social links
│   │
│   └── ui/
│       └── SectionReveal.tsx   # Intersection Observer reveal wrapper
│
└── lib/
    ├── data.ts     # ALL personal content — edit here to update entire site
    └── utils.ts    # cn() tailwind utility merger
```

---

## ✏️ Customizing Content

**All content lives in `src/lib/data.ts`** — name, bio, projects, skills, education, links. Edit that one file and the entire site updates automatically.

## 🎨 Customizing Colors / Fonts

- **Colors**: Edit `tailwind.config.ts` — change `brand.*` and `accent.*` palette
- **Fonts**: Edit `src/app/layout.tsx` (Google Fonts link) and `tailwind.config.ts` fontFamily
- **CSS vars**: Edit `--font-display`, `--font-body`, `--font-mono` in `globals.css`

---

## 🌐 Deploy on Vercel

```bash
npm i -g vercel
vercel
```

Or push to GitHub → connect repo on [vercel.com](https://vercel.com) → auto-deploys on every push.

---

## 🔧 Animation Details

| Animation | Technique | File |
|-----------|-----------|------|
| Loading screen | Framer Motion `AnimatePresence` + progress interval | `LoadingScreen.tsx` |
| Custom cursor | `requestAnimationFrame` + lerp | `CustomCursor.tsx` |
| Scroll progress | CSS `--scroll-progress` custom property | `globals.css` + `page.tsx` |
| Section reveals | `IntersectionObserver` + CSS transitions | `SectionReveal.tsx` |
| Hero stagger | Framer Motion `staggerChildren` | `HeroSection.tsx` |
| Floating chips | CSS `@keyframes float-1/2/3` | `globals.css` |
| Mouse-follow glow | `useMotionValue` + `useSpring` | `HeroSection.tsx` |
| Marquee | CSS `@keyframes marquee` | `globals.css` + `SkillsSection.tsx` |
| Project modal | `AnimatePresence` + spring scale | `ProjectsSection.tsx` |
| Nav pill | `layoutId` shared layout animation | `Navbar.tsx` |
| Magnetic buttons | `whileHover` scale + CSS class | Throughout |

---

## 💡 Suggested Improvements

1. **3D card tilt** — Add `react-three/fiber` or CSS `rotateX/Y` on mouse move for project cards
2. **Blog section** — Add MDX-based `/blog` route for writing
3. **Video showcase** — Embed DaVinci-edited reels directly using `<video>` or YouTube embed
4. **Testimonials** — Add a testimonials section with glassmorphism quote cards
5. **Analytics** — Add Vercel Analytics or Plausible for visitor insights
6. **Dark/Light toggle** — Add `next-themes` toggle for users who prefer light mode
7. **OG Image** — Add dynamic `/api/og` endpoint with `@vercel/og` for social previews
8. **Page transitions** — Wrap routes in Framer Motion `AnimatePresence` for slide-between-page transitions

