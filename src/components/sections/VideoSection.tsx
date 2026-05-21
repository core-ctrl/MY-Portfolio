'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteData, type VideoWork } from '@/lib/data'
import { Play, X, Film } from 'lucide-react'

function VideoCard({ video, onPlay }: { video: VideoWork; onPlay: (v: VideoWork) => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onPlay(video)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative cursor-pointer overflow-hidden border border-[var(--gold)]/10 hover:border-[var(--gold)]/40 transition-all duration-500"
      style={{ aspectRatio: '9/16' }}
    >
      {/* Film strip edges */}
      <div className="film-strip absolute inset-0 z-10 pointer-events-none" />

      {/* Thumbnail */}
      <img
        src={video.thumbnail}
        alt={video.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)] via-[var(--black)]/20 to-transparent z-20" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <motion.div
          animate={{ scale: hovered ? 1.1 : 1, opacity: hovered ? 1 : 0.5 }}
          className="w-12 h-12 border border-[var(--gold)] flex items-center justify-center bg-[var(--black)]/60 backdrop-blur-sm"
        >
          <Play size={14} fill="var(--gold)" className="text-[var(--gold)] ml-0.5" />
        </motion.div>
      </div>

      {/* Tool badge */}
      <div className="absolute top-3 right-3 z-30">
        <span className="text-[7px] font-mono px-2 py-0.5 bg-[var(--black)]/80 border border-[var(--gold)]/30 text-[var(--gold)] uppercase tracking-widest">
          {video.isYouTube ? 'YT' : video.tool.toUpperCase()}
        </span>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-30">
        <p className="text-[8px] font-mono text-[var(--gold)]/70 tracking-widest uppercase mb-1">
          {video.client} · {video.year}
        </p>
        <p className="text-xs font-display font-medium text-[var(--cream)] truncate group-hover:text-[var(--gold)] transition-colors">
          {video.title}
        </p>
      </div>
    </motion.div>
  )
}

function VideoLightbox({ video, onClose }: { video: VideoWork; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[700] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-[var(--black)]/95 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={e => e.stopPropagation()}
        className="relative z-10 w-full"
        style={{ maxWidth: 340 }}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 flex items-center gap-2 text-[9px] font-mono text-[var(--gold)] uppercase tracking-widest hover:opacity-70"
        >
          <X size={12} /> Close
        </button>

        <div className="border border-[var(--gold)]/20 overflow-hidden" style={{ aspectRatio: '9/16' }}>
          {video.isYouTube ? (
            <iframe
              src={video.video}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : (
            <video src={video.video} controls autoPlay playsInline className="w-full h-full object-contain bg-black" />
          )}
        </div>

        <div className="mt-4 px-1">
          <p className="text-[var(--cream)] font-display font-medium text-sm uppercase">{video.title}</p>
          <p className="text-[var(--cream-muted)] text-[10px] font-mono mt-1 tracking-widest uppercase">
            {video.client} · {video.year} · {video.tool}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function VideoSection({ limit }: { limit?: number }) {
  const [catFilter, setCatFilter] = useState('All')
  const [playing, setPlaying] = useState<VideoWork | null>(null)

  const filtered = catFilter === 'All'
    ? siteData.videos
    : siteData.videos.filter(v => v.category === catFilter)

  const displayedVideos = limit ? filtered.slice(0, limit) : filtered

  return (
    <section id="videos" className="relative py-32 px-6 bg-[var(--black)] border-t border-[var(--gold)]/10">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[var(--gold)]" />
              <span className="text-[10px] font-mono tracking-[0.4em] text-[var(--gold)] uppercase">Motion Graphics</span>
            </div>
            <div style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.9 }}>
              <div className="text-[var(--cream)]">CINEMATIC</div>
              <div style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--gold)' }}>GALLERY</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 border border-[var(--gold)]/20 px-4 py-3"
          >
            <Film size={12} className="text-[var(--gold)]" />
            <span className="text-[10px] font-mono text-[var(--cream-muted)] tracking-widest uppercase">
              {siteData.videos.length} Reels
            </span>
          </motion.div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {siteData.videoCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              className={`text-[9px] font-mono tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                catFilter === cat
                  ? 'bg-[var(--gold)] text-[var(--black)] border-[var(--gold)]'
                  : 'border-[var(--gold)]/20 text-[var(--cream-muted)] hover:border-[var(--gold)]/50 hover:text-[var(--cream)]'
              }`}
            >
              {cat}
              <span className="ml-2 opacity-60">
                ({cat === 'All' ? siteData.videos.length : siteData.videos.filter(v => v.category === cat).length})
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {displayedVideos.map((v, i) => (
              <motion.div
                key={v.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
              >
                <VideoCard video={v} onPlay={setPlaying} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        {limit && filtered.length > limit && (
          <div className="mt-16 flex justify-center">
            <a
              href="/video"
              className="px-8 py-4 border border-[var(--gold)]/30 text-[var(--cream)] text-[10px] font-mono tracking-[0.2em] uppercase hover:bg-[var(--gold)] hover:text-[var(--black)] transition-all duration-300"
            >
              View More Videos
            </a>
          </div>
        )}
      </div>

      <AnimatePresence>
        {playing && <VideoLightbox video={playing} onClose={() => setPlaying(null)} />}
      </AnimatePresence>
    </section>
  )
}
