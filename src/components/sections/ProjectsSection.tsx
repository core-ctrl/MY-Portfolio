'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { siteData } from '@/lib/data'
import { ArrowUpRight, X, Github, ExternalLink } from 'lucide-react'

type Project = typeof siteData.projects[number]

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useSpring(useTransform(my, [-150, 150], [8, -8]), { stiffness: 150, damping: 30 })
  const rotY = useSpring(useTransform(mx, [-150, 150], [-8, 8]), { stiffness: 150, damping: 30 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    mx.set(e.clientX - r.left - r.width / 2)
    my.set(e.clientY - r.top - r.height / 2)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  const isFeatured = project.featured

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`card-3d group relative cursor-pointer border border-[var(--gold)]/15 bg-[var(--bg-surface)] hover:border-[var(--gold)]/50 transition-all duration-500 overflow-hidden ${
        isFeatured ? 'col-span-1 md:col-span-2' : ''
      }`}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

      <div className="p-7 md:p-10 flex flex-col h-full gap-8">
        {/* Top row */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: project.color || 'var(--gold)' }}
              />
              <span className="text-[9px] font-mono tracking-[0.3em] text-[var(--gold)] uppercase">{project.category}</span>
            </div>
            {'status' in project && project.status && (
              <span className="text-[7px] font-mono px-1.5 py-0.5 bg-[var(--gold)] text-[var(--black)] uppercase tracking-widest font-bold">
                {project.status as string}
              </span>
            )}
          </div>
          <motion.div
            whileHover={{ x: 3, y: -3 }}
            className="text-[var(--cream-muted)] group-hover:text-[var(--gold)] transition-colors"
          >
            <ArrowUpRight size={16} />
          </motion.div>
        </div>

        {/* Title */}
        <div className="flex-1">
          <div
            style={{
              fontFamily: 'var(--font-hero)',
              fontSize: isFeatured ? 'clamp(36px, 5vw, 72px)' : 'clamp(28px, 3.5vw, 48px)',
              lineHeight: 0.9,
              color: 'var(--cream)',
            }}
            className="group-hover:text-[var(--gold)] transition-colors duration-300 mb-4"
          >
            {project.title}
          </div>
          <p className="text-[var(--cream-muted)] text-xs md:text-sm leading-relaxed line-clamp-2">{project.subtitle}</p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, isFeatured ? 6 : 4).map(t => (
            <span key={t} className="text-[8px] font-mono px-2 py-0.5 border border-[var(--gold)]/20 text-[var(--cream-muted)] uppercase tracking-wider">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 50%, ${project.color || 'var(--gold)'}08, transparent 70%)` }}
      />
    </motion.div>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[600] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[var(--black)]/90 backdrop-blur-md" />

      <motion.div
        initial={{ scale: 0.95, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        onClick={e => e.stopPropagation()}
        className="relative bg-[var(--bg-surface)] border border-[var(--gold)]/20 max-w-2xl w-full overflow-hidden z-10"
        style={{ borderTopColor: project.color || 'var(--gold)' }}
      >
        {/* Accent top border */}
        <div className="h-0.5 w-full" style={{ background: project.color || 'var(--gold)' }} />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[var(--cream-muted)] hover:text-[var(--cream)] z-20"
        >
          <X size={18} />
        </button>

        <div className="p-8 md:p-10 max-h-[85vh] overflow-y-auto space-y-6" data-lenis-prevent="true">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: project.color || 'var(--gold)' }} />
              <span className="text-[9px] font-mono tracking-widest text-[var(--gold)] uppercase">{project.category}</span>
            </div>
            {'status' in project && project.status && (
              <span className="text-[8px] font-mono px-2 py-0.5 bg-[var(--gold)] text-[var(--black)] uppercase tracking-widest font-bold">
                {project.status as string}
              </span>
            )}
          </div>

          <div style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 0.9, color: 'var(--cream)' }}>
            {project.title}
          </div>

          <p className="text-xs font-mono text-[var(--cream-muted)] border-l-2 pl-4" style={{ borderColor: project.color || 'var(--gold)' }}>
            {project.subtitle}
          </p>

          <p className="text-[var(--cream-dim)] text-sm leading-7">{project.description}</p>

          <div className="border border-[var(--gold)]/15 p-6 space-y-3">
            <p className="text-[9px] font-mono tracking-widest text-[var(--gold)] uppercase mb-4">Technical Highlights</p>
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3 text-xs text-[var(--cream-dim)] leading-relaxed">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--gold)] shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tech.map(t => (
              <span key={t} className="text-[8px] font-mono px-2 py-0.5 border border-[var(--gold)]/20 text-[var(--cream-muted)] uppercase">
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 border border-[var(--gold)]/25 text-xs font-mono text-[var(--cream-dim)] hover:border-[var(--gold)] hover:text-[var(--cream)] transition-all uppercase tracking-widest">
                <Github size={13} /> Source
              </a>
            )}
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-[var(--gold)] text-[var(--black)] text-xs font-mono font-bold hover:bg-[var(--gold-light)] transition-all uppercase tracking-widest">
                <ExternalLink size={13} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section id="projects" className="relative py-32 px-6 bg-[var(--bg-surface)] border-t border-[var(--gold)]/10">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[var(--gold)]" />
              <span className="text-[10px] font-mono tracking-[0.4em] text-[var(--gold)] uppercase">Technical Archives</span>
            </div>
            <div style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(56px, 10vw, 140px)', lineHeight: 0.9 }}>
              <div className="text-[var(--cream)] overflow-hidden">
                <motion.div initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
                  SELECTED
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
                  <span className="font-serif italic lowercase tracking-normal text-[var(--gold)]" style={{ WebkitTextStroke: '0px' }}>Masterpieces</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-[var(--cream-muted)] text-sm max-w-xs leading-relaxed border-l border-[var(--gold)]/30 pl-4"
          >
            Secure architectures, cinematic interfaces, and real-world deployments.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {siteData.projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onClick={() => setActive(p)} />
          ))}
        </div>

      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
