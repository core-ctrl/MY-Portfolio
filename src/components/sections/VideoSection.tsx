'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/ui/SectionReveal'
import { siteData, type VideoWork } from '@/lib/data'
import { X, Play, Film, Youtube } from 'lucide-react'

// ── VideoCard ──────────────────────────────────────────────────────────────
function VideoCard({ video, onPlay }: { video: VideoWork; onPlay: (v: VideoWork) => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      onClick={() => onPlay(video)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.98 }}
      className="group relative rounded-2xl overflow-hidden text-left w-full aspect-[9/16] bg-surface-700"
      style={{ boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.5)' : '0 4px 16px rgba(0,0,0,0.3)' }}
    >
      {/* Thumbnail */}
      <img
        src={video.thumbnail}
        alt={video.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* YouTube badge */}
      {video.isYouTube && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-red-600/90 text-white text-[10px] font-mono px-2 py-1 rounded-lg">
          <Youtube size={10} />
          YouTube
        </div>
      )}

      {/* Tool badge */}
      {!video.isYouTube && (
        <div className="absolute top-3 right-3 text-[10px] font-mono px-2 py-1 rounded-lg bg-black/50 text-white/60 border border-white/10">
          {video.tool}
        </div>
      )}

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: hovered ? 1 : 0.85, opacity: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.2 }}
          className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center"
        >
          <Play size={18} fill="white" className="text-white ml-0.5" />
        </motion.div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-xs font-mono text-white/40 mb-0.5">{video.client} · {video.year}</p>
        <p className="text-sm font-medium text-white/90 leading-tight">{video.title}</p>
        <span
          className="inline-block mt-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full"
          style={{
            background: categoryColor(video.category) + '18',
            border: `1px solid ${categoryColor(video.category)}30`,
            color: categoryColor(video.category),
          }}
        >
          {video.category}
        </span>
      </div>
    </motion.button>
  )
}

// ── Video Lightbox ─────────────────────────────────────────────────────────
function VideoLightbox({ video, onClose }: { video: VideoWork; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-mono"
        >
          <X size={16} /> Close
        </button>

        {/* Video */}
        <div className="rounded-2xl overflow-hidden bg-black aspect-[9/16] shadow-[0_32px_80px_rgba(0,0,0,0.8)]">
          {video.isYouTube ? (
            <iframe
              src={video.video}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : (
            <video
              src={video.video}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain bg-black"
            />
          )}
        </div>

        {/* Meta below player */}
        <div className="mt-4 px-1">
          <p className="text-white/90 font-medium">{video.title}</p>
          <p className="text-white/40 text-sm font-mono mt-0.5">{video.client} · {video.year} · {video.tool}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Category color map ─────────────────────────────────────────────────────
function categoryColor(cat: string) {
  const map: Record<string, string> = {
    Personal: '#a596ff',
    'Club & Events': '#22d3ee',
    'City Police': '#f43f5e',
    Broadcast: '#f59e0b',
    'Long Format': '#10b981',
  }
  return map[cat] ?? '#6a50ff'
}

// ── VideoSection ───────────────────────────────────────────────────────────
export default function VideoSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [playingVideo, setPlayingVideo] = useState<VideoWork | null>(null)

  const filtered =
    activeCategory === 'All'
      ? siteData.videos
      : siteData.videos.filter((v) => v.category === activeCategory)

  return (
    <section id="videos" className="relative py-32 px-6 overflow-hidden">
      <div
        className="glow-blob w-[400px] h-[400px] top-1/2 right-0 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.08), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <SectionReveal>
          <p className="text-xs font-mono tracking-[0.3em] text-brand-400 uppercase mb-4">— Video Work</p>
        </SectionReveal>

        <SectionReveal delay={80}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl leading-tight"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
            >
              <span className="text-white/90">Cinematic</span>
              <br />
              <em className="gradient-text not-italic">edits</em>
            </h2>

            {/* Stats pill */}
            <div className="flex items-center gap-2 glass rounded-2xl px-5 py-3 self-start md:self-auto">
              <Film size={15} className="text-brand-400" />
              <span className="text-sm text-white/60 font-mono">{siteData.videos.length} works</span>
            </div>
          </div>
        </SectionReveal>

        {/* Filter tabs */}
        <SectionReveal delay={120}>
          <div className="flex flex-wrap gap-2 mb-10">
            {siteData.videoCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="relative px-4 py-2 rounded-xl text-sm font-mono transition-all duration-200"
                style={{
                  color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.4)',
                  background: activeCategory === cat
                    ? (cat === 'All' ? 'rgba(106,80,255,0.2)' : categoryColor(cat) + '18')
                    : 'rgba(255,255,255,0.03)',
                  border: activeCategory === cat
                    ? `1px solid ${cat === 'All' ? 'rgba(106,80,255,0.4)' : categoryColor(cat) + '40'}`
                    : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {cat}
                <span className="ml-2 text-[10px] opacity-50">
                  {cat === 'All'
                    ? siteData.videos.length
                    : siteData.videos.filter((v) => v.category === cat).length}
                </span>
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Video grid — vertical card layout (9:16) */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((video, i) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ delay: i * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <VideoCard video={video} onPlay={setPlayingVideo} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {playingVideo && (
          <VideoLightbox video={playingVideo} onClose={() => setPlayingVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
