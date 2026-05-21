'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useTheme } from 'next-themes'
import { siteData } from '@/lib/data'
import CatActivityCard from './CatActivityCard'

const CAT_W = 64
const CAT_H = 64
const SCALE = 2

type Mood = 'idle' | 'happy' | 'sleepy' | 'surprised'
type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline'

interface LanyardActivity {
  name: string; details?: string; state?: string; type: number
  assets?: { large_text?: string; small_text?: string }
}
interface LanyardData {
  data: {
    discord_status: DiscordStatus
    discord_user: { username: string; global_name: string }
    activities: LanyardActivity[]
    listening_to_spotify: boolean
    spotify?: {
      song: string; artist: string; album: string
      album_art_url: string
      timestamps: { start: number; end: number }
    }
  }
}
interface SpotifyRich {
  song: string; artist: string; album: string
  album_art_url: string
  timestamps: { start: number; end: number }
}
interface CodingRich { workspace: string; file: string; language: string }

const statusColors: Record<DiscordStatus, string> = {
  online: '#22c55e', idle: '#f59e0b', dnd: '#ef4444', offline: '#6b7280',
}
const statusMessages: Record<DiscordStatus, string[]> = {
  online: ["mew! I'm online 🐱", "purrr~ ✨", "Coding! 💻"],
  idle: ["*yawns* sleepy... 💤", "nya~ taking a break", "AFK meow 🐾"],
  dnd: ["shhh... focusing! 🎯", "*intense stare* 😼", "do not disturb nya~"],
  offline: ["zzz... offline 🌙", "sleeping... 💤", "catch you later! 🐾"],
}

// Section scroll tips
const sectionTips: Record<string, string[]> = {
  hero: ["mew! Welcome to Harshitha's portfolio~ 🐱", "nya~ you just arrived! Click me to chat 💕"],
  about: ["purrr~ this is the about section! Harshitha is a CS & IT student 📚", "she's a full-stack dev at KL University~ meow 🎓"],
  projects: ["ooh projects! 👀 click me to ask about any of them~", "mew! These are real-world products she built 💻"],
  skills: ["nya~ so many skills! Ask me which ones to look at 🛠️", "she knows React, AWS, and more~ purr ✨"],
  videos: ["🎬 cinematic edits! meow~ she's a video editor too!", "nya! These edits are high-energy~ ask me about them 🎥"],
  powerlifting: ["💪 she competes in powerlifting! mew~", "nya~ strength + code + edits. triple threat! 😼"],
  contact: ["want to reach her? click me and I'll help~ 📬", "mew! She's open to collabs and opportunities 🐾"],
}

// ── pixel helpers ──
function drawPixel(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, s = 1) {
  ctx.fillStyle = color; ctx.fillRect(x * s, y * s, s, s)
}
function drawRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string, s = 1) {
  ctx.fillStyle = color; ctx.fillRect(x * s, y * s, w * s, h * s)
}

function drawCat(ctx: CanvasRenderingContext2D, opts: {
  eyeOffsetX: number; eyeOffsetY: number; blinking: boolean
  breathOffset: number; tailFrame: number; earTwitch: boolean
  mood: Mood; purring: boolean; walkFrame: number
  direction: 'left' | 'right'; isLight: boolean
}) {
  const s = SCALE
  const { eyeOffsetX, eyeOffsetY, blinking, breathOffset, tailFrame, earTwitch, mood, purring, walkFrame, direction, isLight } = opts
  ctx.clearRect(0, 0, CAT_W * s, CAT_H * s)
  ctx.save()
  if (direction === 'left') { ctx.scale(-1, 1); ctx.translate(-CAT_W * s, 0) }
  const eX = direction === 'left' ? -eyeOffsetX : eyeOffsetX
  const eY = eyeOffsetY
  const bo = breathOffset
  const bodyColor = isLight ? '#232329' : '#f5f0f0'
  const tailColor = isLight ? '#17171d' : '#e8e0e0'
  const earPink = isLight ? '#ff9ebb' : '#ffb0c4'
  const earInner = isLight ? '#ff7597' : '#ff8fab'
  const tailY = 32 + bo
  if (tailFrame === 0 || tailFrame === 2) { drawRect(ctx, 10, tailY - 8, 4, 10, tailColor, s); drawRect(ctx, 8, tailY - 12, 4, 4, tailColor, s) }
  else if (tailFrame === 1) { drawRect(ctx, 8, tailY - 6, 6, 8, tailColor, s); drawRect(ctx, 4, tailY - 10, 4, 4, tailColor, s) }
  else { drawRect(ctx, 12, tailY - 10, 2, 12, tailColor, s); drawRect(ctx, 10, tailY - 14, 4, 4, tailColor, s) }
  const legY = 42 + bo
  let bL_dx = 0, bL_dy = 0, fL_dx = 0, fL_dy = 0, bR_dx = 0, bR_dy = 0, fR_dx = 0, fR_dy = 0
  if (walkFrame === 1) { fR_dx = 2; fR_dy = -1; bL_dx = -2; bL_dy = -1; fL_dx = -2; bR_dx = 2 }
  else if (walkFrame === 2) { fR_dx = 3; bL_dx = -3; fL_dx = -3; fL_dy = -1; bR_dx = 3; bR_dy = -1 }
  else if (walkFrame === 3) { fR_dx = -2; fR_dy = -1; bL_dx = 2; bL_dy = -1; fL_dx = 2; bR_dx = -2 }
  drawRect(ctx, 18 + bL_dx, legY + bL_dy, 3, 10, tailColor, s)
  drawRect(ctx, 34 + fL_dx, legY + fL_dy, 3, 10, tailColor, s)
  const bodyY = 32 + bo
  drawRect(ctx, 16, bodyY, 26, 10, bodyColor, s)
  drawRect(ctx, 14, bodyY + 2, 2, 6, bodyColor, s)
  drawRect(ctx, 42, bodyY + 2, 2, 6, bodyColor, s)
  if (purring) { drawRect(ctx, 22, bodyY + 4, 1, 1, 'rgba(255,192,203,0.5)', s); drawRect(ctx, 28, bodyY + 6, 1, 1, 'rgba(255,192,203,0.5)', s) }
  drawRect(ctx, 22 + bR_dx, legY + bR_dy, 3, 10, bodyColor, s)
  drawRect(ctx, 38 + fR_dx, legY + fR_dy, 3, 10, bodyColor, s)
  const headY = 22 + bo
  drawRect(ctx, 36, headY, 16, 14, bodyColor, s)
  drawRect(ctx, 38, headY - 2, 12, 2, bodyColor, s)
  drawRect(ctx, 34, headY + 2, 2, 10, bodyColor, s)
  drawRect(ctx, 52, headY + 4, 2, 8, bodyColor, s)
  drawRect(ctx, 38, headY - 4, 4, 4, tailColor, s)
  const leftEarY = earTwitch ? headY - 7 : headY - 6
  drawRect(ctx, 44, leftEarY, 6, 6, bodyColor, s)
  drawRect(ctx, 45, leftEarY + 2, 4, 4, earPink, s)
  drawRect(ctx, 46, leftEarY + 3, 2, 3, earInner, s)
  let eyeColor = mood === 'happy' ? '#3a3a4a' : '#2a2a3a'
  let blinkColor = '#3a3a4a'
  if (isLight) { eyeColor = mood === 'happy' ? '#eab308' : '#22c55e'; blinkColor = '#e8e0e0' }
  if (blinking) {
    drawRect(ctx, 42 + eX, headY + 6 + eY, 4, 1, blinkColor, s)
    drawRect(ctx, 50 + eX, headY + 6 + eY, 2, 1, blinkColor, s)
  } else {
    drawRect(ctx, 42 + eX, headY + 4 + eY, 4, 5, eyeColor, s)
    drawRect(ctx, 43 + eX, headY + 5 + eY, 2, 2, '#ffffff', s)
    drawPixel(ctx, 42 + eX, headY + 4 + eY, '#ffffff', s)
    drawRect(ctx, 50 + eX, headY + 4 + eY, 2, 5, eyeColor, s)
    drawRect(ctx, 51 + eX, headY + 5 + eY, 1, 2, '#ffffff', s)
    if (mood === 'surprised') {
      drawPixel(ctx, 42 + eX, headY + 3 + eY, eyeColor, s)
      drawPixel(ctx, 45 + eX, headY + 3 + eY, eyeColor, s)
      drawPixel(ctx, 50 + eX, headY + 3 + eY, eyeColor, s)
    }
  }
  if (mood === 'sleepy' && !blinking) {
    drawRect(ctx, 42, headY + 4, 4, 2, bodyColor, s); drawRect(ctx, 50, headY + 4, 2, 2, bodyColor, s)
    drawRect(ctx, 42, headY + 6, 4, 1, blinkColor, s); drawRect(ctx, 50, headY + 6, 2, 1, blinkColor, s)
    drawPixel(ctx, 53, headY - 2, 'rgba(150,170,255,0.6)', s); drawPixel(ctx, 55, headY - 4, 'rgba(150,170,255,0.5)', s)
  }
  const noseColor = isLight ? '#ff9cb5' : '#ffb6c1'
  const noseColorDark = isLight ? '#ff7597' : '#ff9cb5'
  drawRect(ctx, 52, headY + 8, 2, 1, noseColor, s); drawPixel(ctx, 53, headY + 8, noseColorDark, s)
  const mouthColor = isLight ? '#ff7597' : '#d4a0a0'
  if (mood === 'happy') { drawRect(ctx, 48, headY + 11, 4, 1, mouthColor, s); drawPixel(ctx, 48, headY + 10, mouthColor, s); drawPixel(ctx, 51, headY + 10, mouthColor, s) }
  else if (mood === 'surprised') { drawRect(ctx, 49, headY + 10, 2, 2, mouthColor, s) }
  else { drawRect(ctx, 49, headY + 11, 2, 1, mouthColor, s) }
  const whiskerColor = isLight ? '#8a8a9a' : '#c8c0c0'
  drawRect(ctx, 36, headY + 7, 5, 1, whiskerColor, s); drawRect(ctx, 37, headY + 9, 4, 1, whiskerColor, s)
  if (mood === 'happy' || purring) drawRect(ctx, 38, headY + 9, 3, 2, 'rgba(255,180,200,0.35)', s)
  ctx.restore()
}



export default function PixelCat() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const isLight = mounted && resolvedTheme === 'light'

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 60, y: 500 })
  const velRef = useRef({ x: 0, y: 0 })
  const walkFrame = useRef(0)
  const walkTimer = useRef(0)
  const direction = useRef<'left' | 'right'>('right')
  const lastTime = useRef(0)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const autonomousWalk = useRef({ speed: 0, time: 0 })
  const [isMinimized, setIsMinimized] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const frameRef = useRef(0)
  const blinkTimer = useRef(0)
  const isBlinking = useRef(false)
  const tailFrame = useRef(0)
  const tailTimer = useRef(0)
  const earTwitch = useRef(false)
  const earTimer = useRef(0)
  const breathFrame = useRef(0)
  const breathTimer = useRef(0)
  const purring = useRef(false)
  const moodRef = useRef<Mood>('idle')
  const isDragging = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const dragMoved = useRef(false)

  const [bubbleText, setBubbleText] = useState<string | null>(null)
  const [showBubble, setShowBubble] = useState(false)
  const bubbleTimeout = useRef<ReturnType<typeof setTimeout>>()

  const [discordStatus, setDiscordStatus] = useState<DiscordStatus>('offline')
  const [activity, setActivity] = useState<string | null>(null)
  const [activityType, setActivityType] = useState<'spotify' | 'coding' | 'gaming' | 'none'>('none')
  const [spotifyData, setSpotifyData] = useState<SpotifyRich | null>(null)
  const [codingData, setCodingData] = useState<CodingRich | null>(null)
  const [gameName, setGameName] = useState<string | null>(null)
  const [showActivityCard, setShowActivityCard] = useState(false)
  const [currentSection, setCurrentSection] = useState('hero')

  // ── Section detection on scroll ──
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'skills', 'videos', 'powerlifting', 'contact']
    const detect = () => {
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.3) {
          setCurrentSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', detect, { passive: true })
    detect()
    return () => window.removeEventListener('scroll', detect)
  }, [])

  // ── Auto-show activity card & hide after 5 seconds ──
  const activityTimeout = useRef<ReturnType<typeof setTimeout>>()
  useEffect(() => {
    if (activityType !== 'none') {
      setShowActivityCard(true)
      if (activityTimeout.current) clearTimeout(activityTimeout.current)
      activityTimeout.current = setTimeout(() => {
        setShowActivityCard(false)
      }, 5000)
    } else {
      setShowActivityCard(false)
    }

    return () => {
      if (activityTimeout.current) clearTimeout(activityTimeout.current)
    }
  }, [activityType, activity])

  // ── Fetch Discord / Lanyard ──
  useEffect(() => {
    const userId = siteData.discord?.userId
    if (!userId || userId === 'REPLACE_WITH_YOUR_DISCORD_USER_ID') return

    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`)
        const json: LanyardData = await res.json()
        const d = json.data
        setDiscordStatus(d.discord_status)
        if (d.listening_to_spotify && d.spotify) {
          setActivityType('spotify'); setSpotifyData(d.spotify)
          setActivity(`🎵 ${d.spotify.song} — ${d.spotify.artist}`)
          setCodingData(null); setGameName(null)
        } else {
          const isCoding = (name: string) => name.includes('Visual Studio') || name === 'Code' || name.includes('Cursor') || name === 'WebStorm' || name === 'Vim' || name === 'Neovim'
          const vsCode = d.activities.find(a => isCoding(a.name))
          const game = d.activities.find(a => a.type === 0 && !isCoding(a.name))
          const streaming = d.activities.find(a => a.type === 1)
          const watching = d.activities.find(a => a.type === 3)
          if (vsCode) {
            setActivityType('coding')
            setCodingData({ workspace: vsCode.details ?? 'Workspace', file: vsCode.state ?? 'Editing files', language: vsCode.assets?.large_text ?? 'code' })
            setActivity(`💻 ${vsCode.details ?? 'Coding'}`)
            setSpotifyData(null); setGameName(null)
          } else if (streaming) {
            setActivityType('gaming')
            setGameName(`🔴 ${streaming.name}`)
            setActivity(`🔴 Streaming ${streaming.name}`)
            setSpotifyData(null); setCodingData(null)
          } else if (watching) {
            setActivityType('gaming')
            setGameName(`📺 ${watching.name}`)
            setActivity(`📺 Watching ${watching.name}`)
            setSpotifyData(null); setCodingData(null)
          } else if (game) {
            setActivityType('gaming'); setGameName(game.name)
            setActivity(`🎮 Playing ${game.name}`)
            setSpotifyData(null); setCodingData(null)
          } else {
            setActivityType('none'); setActivity(null)
            setSpotifyData(null); setCodingData(null); setGameName(null)
          }
        }
      } catch { setDiscordStatus('offline'); setActivityType('none') }
    }
    fetchStatus()
    const interval = setInterval(fetchStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  // ── Restore position ──
  useEffect(() => {
    posRef.current = { x: 60, y: window.innerHeight - CAT_H * SCALE }
    try {
      const saved = localStorage.getItem('pixel-cat-pos')
      if (saved) { const d = JSON.parse(saved); if (d.pos) posRef.current = d.pos }
    } catch { /* ignore */ }
    const i = setInterval(() => {
      localStorage.setItem('pixel-cat-pos', JSON.stringify({ pos: posRef.current }))
    }, 2000)
    return () => clearInterval(i)
  }, [])

  // ── Mouse tracking ──
  useEffect(() => {
    const h = (e: MouseEvent) => { mousePos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])

  // ── Mood cycle ──
  useEffect(() => {
    if (isMinimized) return
    const cycle = () => {
      const moods: Mood[] = ['idle', 'idle', 'happy', 'idle', 'sleepy', 'idle', 'happy']
      const next = moods[Math.floor(Math.random() * moods.length)]
      moodRef.current = next
      purring.current = next === 'happy' && Math.random() > 0.5
    }
    const interval = setInterval(cycle, 5000 + Math.random() * 4000)
    return () => clearInterval(interval)
  }, [isMinimized])

  const showBubbleMsg = useCallback((text: string) => {
    setBubbleText(text)
    setShowBubble(true)
    if (bubbleTimeout.current) clearTimeout(bubbleTimeout.current)
    bubbleTimeout.current = setTimeout(() => setShowBubble(false), 4000)
  }, [])

  // ── Random idle bubbles ──
  useEffect(() => {
    if (isMinimized) return
    let messages = ['mew! 🐱', 'purr~ ✨', '*stretches*', '*yawns*', 'nya~ 💕', 'click me to chat! 💬', 'meow? 👀', '*purrs softly*', '♪ ♫', 'ask me anything~ 🐱']
    if (activity) messages = [activity, ...messages]
    else messages = [...messages, ...statusMessages[discordStatus]]
    const showMsg = () => {
      if (Math.random() > 0.35) return
      showBubbleMsg(messages[Math.floor(Math.random() * messages.length)])
    }
    const interval = setInterval(showMsg, 10000 + Math.random() * 8000)
    return () => clearInterval(interval)
  }, [isMinimized, discordStatus, activity, showBubbleMsg])

  // ── Animation loop ──
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || isMinimized) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.imageSmoothingEnabled = false
    let animId: number
    const loop = () => {
      frameRef.current++
      blinkTimer.current++
      if (blinkTimer.current > 180 + Math.random() * 60) { isBlinking.current = true; blinkTimer.current = 0 }
      if (isBlinking.current && blinkTimer.current > 8) isBlinking.current = false
      tailTimer.current++
      if (tailTimer.current > 15) { tailFrame.current = (tailFrame.current + 1) % 4; tailTimer.current = 0 }
      earTimer.current++
      if (earTimer.current > 120 + Math.random() * 100) { earTwitch.current = !earTwitch.current; earTimer.current = 0 }
      breathTimer.current++
      if (breathTimer.current > 30) { breathFrame.current = (breathFrame.current + 1) % 4; breathTimer.current = 0 }
      const breathOffset = breathFrame.current < 2 ? 0 : 1
      const rect = canvas.getBoundingClientRect()
      const catCX = rect.left + rect.width / 2
      const catCY = rect.top + rect.height / 2
      const dx = mousePos.current.x - catCX
      const dy = mousePos.current.y - catCY
      const dist = Math.sqrt(dx * dx + dy * dy)
      let eyeOffsetX = 0, eyeOffsetY = 0
      if (dist > 40) { eyeOffsetX = dx > 30 ? 1 : dx < -30 ? -1 : 0; eyeOffsetY = dy > 30 ? 1 : dy < -30 ? -1 : 0 }
      let currentMood = moodRef.current
      if (dist < 60 && currentMood !== 'sleepy') currentMood = 'surprised'
      else if (dist < 150 && currentMood === 'idle') { currentMood = 'happy'; purring.current = true }
      const now = performance.now()
      const dt = Math.min((now - (lastTime.current || now)) / 16.66, 3)
      lastTime.current = now
      const catH2 = CAT_H * SCALE
      const catW2 = CAT_W * SCALE
      const floorY = window.innerHeight - catH2
      const rightX = window.innerWidth - catW2
      if (!isDragging.current) {
        velRef.current.y += 0.8 * dt; velRef.current.x *= 0.96; velRef.current.y *= 0.99
        posRef.current.x += velRef.current.x * dt; posRef.current.y += velRef.current.y * dt
        let onGround = false
        if (posRef.current.y >= floorY) {
          posRef.current.y = floorY
          if (velRef.current.y > 2) velRef.current.y = -velRef.current.y * 0.4
          else { velRef.current.y = 0; onGround = true }
          if (autonomousWalk.current.time <= 0) velRef.current.x *= 0.85
        }
        if (posRef.current.y <= 0) { posRef.current.y = 0; velRef.current.y = -velRef.current.y * 0.4 }
        if (posRef.current.x <= 0) { posRef.current.x = 0; velRef.current.x = -velRef.current.x * 0.6; autonomousWalk.current.speed *= -1 }
        else if (posRef.current.x >= rightX) { posRef.current.x = rightX; velRef.current.x = -velRef.current.x * 0.6; autonomousWalk.current.speed *= -1 }
        if (autonomousWalk.current.time > 0) {
          autonomousWalk.current.time -= dt; velRef.current.x = autonomousWalk.current.speed
          if (autonomousWalk.current.time <= 0) autonomousWalk.current.speed = 0
        } else if (onGround && Math.abs(velRef.current.x) < 0.5 && !isMinimized && activityType === 'none') {
          if (Math.random() < 0.005) {
            const speed = (Math.random() > 0.5 ? 1 : -1) * (1 + Math.random() * 1.5)
            autonomousWalk.current.speed = speed; autonomousWalk.current.time = 60 + Math.random() * 120
            moodRef.current = 'happy'; setTimeout(() => { if (moodRef.current === 'happy') moodRef.current = 'idle' }, 2000)
          }
        }
      } else {
        const mdx = mousePos.current.x - lastMousePos.current.x
        const mdy = mousePos.current.y - lastMousePos.current.y
        velRef.current.x = velRef.current.x * 0.5 + mdx * 0.5
        velRef.current.y = velRef.current.y * 0.5 + mdy * 0.5
      }
      lastMousePos.current = { ...mousePos.current }
      if (!isDragging.current && posRef.current.y >= floorY - 1 && Math.abs(velRef.current.x) > 0.2) {
        walkTimer.current += Math.abs(velRef.current.x)
        if (walkTimer.current > 15) { walkFrame.current = (walkFrame.current + 1) % 4; walkTimer.current = 0 }
        direction.current = velRef.current.x > 0 ? 'right' : 'left'
      } else {
        walkFrame.current = 0
        if (mousePos.current.x < catCX - 30) direction.current = 'left'
        else if (mousePos.current.x > catCX + 30) direction.current = 'right'
      }
      if (containerRef.current) containerRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`
      drawCat(ctx, { eyeOffsetX, eyeOffsetY, blinking: isBlinking.current, breathOffset, tailFrame: tailFrame.current, earTwitch: earTwitch.current, mood: currentMood, purring: purring.current, walkFrame: walkFrame.current, direction: direction.current, isLight })
      animId = requestAnimationFrame(loop)
    }
    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [isMinimized, isLight, activityType])

  // ── Drag handlers ──
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isMinimized) { setIsMinimized(false); return }
    isDragging.current = true
    dragMoved.current = false
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing'
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    containerRef.current?.setPointerCapture(e.pointerId)
  }, [isMinimized])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return
    dragMoved.current = true
    posRef.current = { x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y }
  }, [])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    isDragging.current = false
    if (containerRef.current) containerRef.current.style.cursor = 'grab'
    containerRef.current?.releasePointerCapture(e.pointerId)
  }, [])

  const handleClick = useCallback(() => {
    if (dragMoved.current) return // don't open chat if user was dragging
    setShowBubble(false)
    moodRef.current = 'happy'; purring.current = true
    setTimeout(() => { moodRef.current = 'idle' }, 3000)
  }, [])

  const handleDoubleClick = useCallback(() => {
    setIsMinimized(true); setShowBubble(false)
  }, [])

  const userId = siteData.discord?.userId
  const hasRealUserId = !!userId && userId !== 'REPLACE_WITH_YOUR_DISCORD_USER_ID'

  return (
    <div
      ref={containerRef}
      className="hidden md:block opacity-80 hover:opacity-100 transition-opacity duration-300"
      style={{
        position: 'fixed', top: 0, left: 0,
        transform: `translate(${posRef.current.x}px, ${posRef.current.y}px)`,
        cursor: 'grab', userSelect: 'none', touchAction: 'none', zIndex: 9990,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      title="Click to chat with Neko! · Drag me anywhere · Double-click to sleep"
    >
      {/* Activity card */}
      {/* See more button — above the cat */}
      {!isMinimized && activityType !== 'none' && !showActivityCard && (
        <div
          onClick={(e) => { e.stopPropagation(); setShowActivityCard(true) }}
          onPointerDown={(e) => e.stopPropagation()}
          style={{
            position: 'absolute', top: -18, left: '50%',
            transform: 'translateX(-50%)',
            padding: '2px 8px', borderRadius: 8, fontSize: 8,
            fontFamily: 'monospace',
            color: activityType === 'spotify' ? '#1DB954' : '#78BDEB',
            background: 'rgba(10,10,20,0.85)',
            border: activityType === 'spotify' ? '1px solid rgba(29,185,84,0.3)' : '1px solid rgba(78,142,162,0.32)',
            cursor: 'pointer', whiteSpace: 'nowrap', pointerEvents: 'auto',
            animation: 'seeMorePulse 2s ease-in-out infinite',
          }}
        >
          ▼ see more
        </div>
      )}

      <CatActivityCard
        visible={showActivityCard}
        activityType={activityType}
        spotify={spotifyData}
        coding={codingData}
        gameName={gameName}
        onClose={() => setShowActivityCard(false)}
      />

      {/* Discord dot */}
      {!isMinimized && hasRealUserId && (
        <div style={{
          position: 'absolute', top: 14, right: 28,
          width: 10, height: 10, borderRadius: '50%',
          background: statusColors[discordStatus],
          border: isLight ? '2px solid #f0eee8' : '2px solid #050508',
          zIndex: 10, boxShadow: `0 0 6px ${statusColors[discordStatus]}`,
        }} />
      )}

      {/* Speech bubble (idle tips) */}
      {showBubble && bubbleText && !isMinimized && (
        <div style={{
          position: 'absolute', bottom: '110%', left: '50%',
          transform: 'translateX(-50%)', marginBottom: 4,
          whiteSpace: 'nowrap', maxWidth: 200,
          background: isLight ? 'rgba(240,238,232,0.95)' : 'rgba(15,15,25,0.92)',
          backdropFilter: 'blur(8px)',
          border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.1)',
          borderRadius: 14, padding: '6px 12px', fontSize: 11,
          color: isLight ? '#1C1A14' : 'rgba(255,255,255,0.8)',
          fontFamily: 'monospace',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          pointerEvents: 'none', animation: 'bubbleFadeIn 0.3s ease-out',
        }}>
          {bubbleText}
          <div style={{
            position: 'absolute', left: '50%', bottom: -5,
            transform: 'translateX(-50%) rotate(45deg)', width: 8, height: 8,
            background: isLight ? 'rgba(240,238,232,0.95)' : 'rgba(15,15,25,0.92)',
            borderRight: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.1)',
            borderBottom: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.1)',
          }} />
        </div>
      )}

      {/* Cat canvas or minimized */}
      {isMinimized ? (
        <div style={{ width: 40, height: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <div style={{ fontSize: 16, opacity: 0.5 }}>🐱</div>
          <div style={{ fontSize: 8, color: isLight ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>zzz...</div>
        </div>
      ) : (
        <canvas ref={canvasRef} width={CAT_W * SCALE} height={CAT_H * SCALE}
          style={{ width: CAT_W * SCALE, height: CAT_H * SCALE, imageRendering: 'pixelated' }}
        />
      )}

      <style>{`
        @keyframes bubbleFadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(4px) scale(0.95); }
          to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
        @keyframes seeMorePulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}