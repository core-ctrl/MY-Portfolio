'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Activity Cards that ROLL OUT from behind the cat ──
   - Vinyl record spins out to the right like a CD ejecting
   - Pixel computer slides up from behind
   - Gaming card rolls out to the right
   All start z-index behind the cat, then animate outward.
   ─────────────────────────────────────────────────── */

interface SpotifyData {
  song: string
  artist: string
  album: string
  album_art_url: string
  timestamps: { start: number; end: number }
}

interface CodingData {
  workspace: string
  file: string
  language: string
}

interface ActivityCardProps {
  visible: boolean
  activityType: 'spotify' | 'coding' | 'gaming' | 'none'
  spotify: SpotifyData | null
  coding: CodingData | null
  gameName: string | null
  onClose: () => void
}

/* ═══════════════════════════════════════════════════
   SPOTIFY — Vinyl Record that spins out from behind
   ═══════════════════════════════════════════════════ */
function VinylCard({ spotify, visible, onClose }: { spotify: SpotifyData; visible: boolean; onClose: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const now = Date.now()
      const total = spotify.timestamps.end - spotify.timestamps.start
      const elapsed = now - spotify.timestamps.start
      setProgress(total > 0 ? Math.min((elapsed / total) * 100, 100) : 0)
    }
    update()
    const i = setInterval(update, 1000)
    return () => clearInterval(i)
  }, [spotify.timestamps.start, spotify.timestamps.end])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          onClick={(e) => { e.stopPropagation(); onClose() }}
          onPointerDown={(e) => e.stopPropagation()}
          initial={{ opacity: 0, x: '-50%', y: 0, scale: 0.3 }}
          animate={{ opacity: 1, x: 40, y: -120, scale: 1 }}
          exit={{ opacity: 0, x: '-50%', y: 0, scale: 0.3 }}
          transition={{ type: 'spring', damping: 20, stiffness: 180 }}
          style={{
            position: 'absolute',
            bottom: 10,
            left: '50%',
            zIndex: 10,
            cursor: 'pointer',
            pointerEvents: 'auto',
          }}
        >
          {/* Container with vinyl + info */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 0,
            background: 'rgba(11, 15, 25, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: 16,
            border: '1px solid rgba(29, 185, 84, 0.25)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 30px rgba(29,185,84,0.1)',
            padding: '0',
            overflow: 'hidden',
          }}>
            {/* Vinyl disc — sticks out to the left */}
            <div style={{
              width: 90, height: 90, flexShrink: 0,
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* Vinyl grooves */}
              <div style={{
                width: 82, height: 82, borderRadius: '50%',
                background: `
                  radial-gradient(circle, transparent 17%, #111 18%, #1a1a2e 19%,
                  #111 28%, #1a1a1a 29%, #222 30%,
                  #111 42%, #1a1a1a 43%, #222 44%,
                  #111 56%, #1a1a1a 57%, #222 58%,
                  #111 68%, #1a1a1a 69%, #222 70%,
                  #1a1a1a 100%)
                `,
                animation: visible ? 'vinylSpin 2.5s linear infinite' : 'none',
                boxShadow: '0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(29,185,84,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #2a2a2a',
              }}>
                {/* Vinyl shine effect */}
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)',
                  pointerEvents: 'none',
                }} />
                {/* Album art center label */}
                <div style={{
                  width: 34, height: 34, borderRadius: '50%', overflow: 'hidden',
                  border: '2px solid #333',
                  boxShadow: '0 0 10px rgba(0,0,0,0.8)',
                }}>
                  <img
                    src={spotify.album_art_url}
                    alt={spotify.album}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                {/* Center hole dot */}
                <div style={{
                  position: 'absolute', width: 4, height: 4, borderRadius: '50%',
                  background: '#050508', border: '1px solid #333',
                }} />
              </div>
            </div>

            {/* Song info panel */}
            <div style={{ padding: '10px 14px 10px 4px', minWidth: 130, maxWidth: 150 }}>
              {/* Now Playing badge */}
              <div style={{
                fontSize: 8, color: '#1DB954', fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4,
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <button
                  onClick={(e) => { e.stopPropagation(); onClose() }}
                  onPointerDown={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute', top: 6, right: 6,
                    background: 'rgba(255,255,255,0.08)', border: 'none',
                    borderRadius: '50%', width: 16, height: 16,
                    color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
                    fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 2,
                  }}
                >✕</button>
                <span style={{
                  display: 'inline-block', width: 5, height: 5,
                  background: '#1DB954', borderRadius: '50%',
                  animation: 'spotifyPulse 1.5s ease-in-out infinite',
                }} />
                NOW PLAYING
              </div>
              {/* Song name */}
              <div style={{
                fontSize: 11, color: '#fff', fontWeight: 600, fontFamily: "var(--font-body)",
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                lineHeight: 1.3,
              }}>
                {spotify.song}
              </div>
              {/* Artist */}
              <div style={{
                fontSize: 9, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-mono)',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                marginTop: 2,
              }}>
                {spotify.artist.split(';')[0].trim()}
              </div>
              {/* Progress bar */}
              <div style={{
                marginTop: 8, height: 3, borderRadius: 2,
                background: 'rgba(255,255,255,0.06)', overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', borderRadius: 2,
                  background: 'linear-gradient(90deg, #1DB954, #1ed760)',
                  width: `${progress}%`, transition: 'width 1s linear',
                  boxShadow: '0 0 6px rgba(29,185,84,0.6)',
                }} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ═══════════════════════════════════════════════════
   CODING — Pixel Computer that slides up from behind
   ═══════════════════════════════════════════════════ */
function CodingCard({ coding, visible, onClose }: { coding: CodingData; visible: boolean; onClose: () => void }) {
  const [cursorBlink, setCursorBlink] = useState(true)

  useEffect(() => {
    const i = setInterval(() => setCursorBlink(b => !b), 530)
    return () => clearInterval(i)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          onClick={(e) => { e.stopPropagation(); onClose() }}
          onPointerDown={(e) => e.stopPropagation()}
          initial={{ opacity: 0, x: '-50%', y: 0, scale: 0.2 }}
          animate={{ opacity: 1, x: '-50%', y: -145, scale: 1 }}
          exit={{ opacity: 0, x: '-50%', y: 0, scale: 0.2 }}
          transition={{ type: 'spring', damping: 22, stiffness: 200 }}
          style={{
            position: 'absolute',
            bottom: 10,
            left: '50%',
            zIndex: 10,
            cursor: 'pointer',
            pointerEvents: 'auto',
          }}
        >
          <div style={{
            width: 195,
            background: 'rgba(11, 15, 25, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: 14,
            border: '1px solid rgba(78, 142, 162, 0.32)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 30px rgba(78,142,162,0.14)',
            padding: '10px 10px 8px',
          }}>
            {/* Monitor */}
            <div style={{
              background: '#000000',
              border: '3px solid #1e293b',
              borderRadius: 6,
              padding: '6px 8px',
              position: 'relative',
              boxShadow: 'inset 0 0 20px rgba(78,142,162,0.1), 0 2px 8px rgba(0,0,0,0.5)',
              imageRendering: 'pixelated',
            }}>
              {/* CRT scanlines */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 4,
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(120,189,235,0.035) 2px, rgba(120,189,235,0.035) 4px)',
                pointerEvents: 'none', zIndex: 1,
              }} />
              {/* Screen glow */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 4,
                background: 'radial-gradient(ellipse at center, rgba(78,142,162,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              {/* Title bar */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 3, marginBottom: 5, paddingBottom: 4,
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#eab308' }} />
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }} />
                <span style={{
                  fontSize: 7, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)',
                  marginLeft: 'auto',
                }}>
                  {coding.language.toUpperCase()}
                </span>
              </div>
              {/* Code lines */}
              <div style={{ fontSize: 8, fontFamily: "var(--font-mono)", lineHeight: 1.7 }}>
                <div>
                  <span style={{ color: '#78BDEB' }}>const </span>
                  <span style={{ color: '#6EA2B3' }}>project</span>
                  <span style={{ color: '#6b7280' }}> = </span>
                  <span style={{ color: '#eab308' }}>&quot;{coding.workspace.substring(0, 18)}&quot;</span>
                </div>
                <div>
                  <span style={{ color: '#78BDEB' }}>file  </span>
                  <span style={{ color: '#6EA2B3' }}>{coding.file.substring(0, 16)}</span>
                  <span style={{ color: '#fff', opacity: cursorBlink ? 1 : 0, transition: 'opacity 0.1s' }}>▌</span>
                </div>
              </div>
            </div>
            {/* Monitor stand */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
              <div style={{ width: 14, height: 5, background: '#1e293b', borderRadius: '0 0 2px 2px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 0 }}>
              <div style={{ width: 28, height: 3, background: '#1e293b', borderRadius: 2 }} />
            </div>
            {/* Label */}
            <div style={{
              fontSize: 8, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)',
              textAlign: 'center', marginTop: 5,
            }}>
              💻 Coding in VS Code
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ═══════════════════════════════════════════════════
   GAMING — Card that rolls out to the right
   ═══════════════════════════════════════════════════ */
function GamingCardView({ name, visible, onClose }: { name: string; visible: boolean; onClose: () => void }) {
  // Detect type from prefix
  const isStreaming = name.startsWith('🔴')
  const isWatching = name.startsWith('📺')
  const displayName = name.replace(/^(🔴|📺)\s*/, '')

  const accent = isStreaming ? '#ff4444' : isWatching ? '#a78bfa' : '#78BDEB'
  const icon = isStreaming ? '🔴' : isWatching ? '📺' : '🎮'
  const label = isStreaming ? 'STREAMING' : isWatching ? 'WATCHING' : 'PLAYING'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          onClick={(e) => { e.stopPropagation(); onClose() }}
          onPointerDown={(e) => e.stopPropagation()}
          initial={{ opacity: 0, x: '-50%', y: 0, scale: 0.2 }}
          animate={{ opacity: 1, x: 30, y: -100, scale: 1 }}
          exit={{ opacity: 0, x: '-50%', y: 0, scale: 0.2 }}
          transition={{ type: 'spring', damping: 20, stiffness: 180 }}
          style={{ position: 'absolute', bottom: 20, left: '50%', zIndex: 10, cursor: 'pointer', pointerEvents: 'auto' }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(11,15,25,0.85)', backdropFilter: 'blur(16px)',
            borderRadius: 14, border: `1px solid ${accent}33`,
            boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 30px ${accent}22`,
            padding: '10px 16px 10px 12px', minWidth: 160,
          }}>
            {/* Close button */}
            <button
              onClick={(e) => { e.stopPropagation(); onClose() }}
              onPointerDown={(e) => e.stopPropagation()}
              style={{
                position: 'absolute', top: 6, right: 6,
                background: 'rgba(255,255,255,0.08)', border: 'none',
                borderRadius: '50%', width: 16, height: 16,
                color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
                fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >✕</button>

            <div style={{
              width: 42, height: 42, borderRadius: 10, flexShrink: 0,
              background: `linear-gradient(135deg, ${accent}33, ${accent}66)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, boxShadow: `0 0 20px ${accent}44`,
            }}>{icon}</div>

            <div style={{ minWidth: 0 }}>
              <div style={{
                fontSize: 8, color: accent, fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 3,
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <span style={{
                  display: 'inline-block', width: 5, height: 5,
                  background: accent, borderRadius: '50%',
                  animation: 'spotifyPulse 1.5s ease-in-out infinite',
                }} />
                {label}
              </div>
              <div style={{
                fontSize: 12, color: '#fff', fontWeight: 600,
                fontFamily: 'var(--font-body)',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                maxWidth: 120,
              }}>{displayName}</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════ */
export default function CatActivityCard({ visible, activityType, spotify, coding, gameName, onClose }: ActivityCardProps) {
  if (activityType === 'none') return null

  return (
    <>
      {activityType === 'spotify' && spotify && (
        <VinylCard spotify={spotify} visible={visible} onClose={onClose} />
      )}
      {activityType === 'coding' && coding && (
        <CodingCard coding={coding} visible={visible} onClose={onClose} />
      )}
      {activityType === 'gaming' && gameName && (
        <GamingCardView name={gameName} visible={visible} onClose={onClose} />
      )}

      <style>{`
        @keyframes vinylSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spotifyPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        @keyframes gameGlow {
          0%, 100% { box-shadow: 0 0 16px rgba(78,142,162,0.3); }
          50% { box-shadow: 0 0 24px rgba(120,189,235,0.45); }
        }
      `}</style>
    </>
  )
}