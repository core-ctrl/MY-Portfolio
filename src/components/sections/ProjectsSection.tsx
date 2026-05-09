'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/ui/SectionReveal'
import { siteData, type Project } from '@/lib/data'
import { ExternalLink, Github, X, ArrowUpRight } from 'lucide-react'

// ── ProjectCard ──────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  className = '',
  onOpen,
}: {
  project: Project
  className?: string
  onOpen: (p: Project) => void
}) {
  return (
    <motion.button
      onClick={() => onOpen(project)}
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.99 }}
      className={`group relative glass glass-hover rounded-3xl overflow-hidden text-left w-full ${className}`}
      style={{
        boxShadow: `0 0 0 0 ${project.color}00`,
        transition: 'box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${project.color}18`
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 transparent'
      }}
    >
      {/* Color accent stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-60"
        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
      />

      {/* Category badge */}
      <div
        className="absolute top-4 right-4 text-[10px] font-mono px-2 py-0.5 rounded-full border"
        style={{
          color: project.color,
          borderColor: `${project.color}30`,
          background: `${project.color}10`,
        }}
      >
        {project.category}
      </div>

      <div className="p-6">
        {project.featured && (
          <p className="text-[10px] font-mono tracking-widest text-white/30 uppercase mb-3">
            Featured Project
          </p>
        )}

        <h3
          className="text-xl font-medium text-white/90 mb-1.5 group-hover:text-white transition-colors"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
        >
          {project.title}
        </h3>
        <p className="text-xs text-white/40 mb-4">{project.subtitle}</p>

        <p className="text-sm text-white/50 leading-relaxed line-clamp-3 mb-5">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="tag-pill">
              {t}
            </span>
          ))}
        </div>

        {/* Arrow hint */}
        <div className="flex items-center gap-1.5 text-xs text-white/30 group-hover:text-brand-400 transition-colors">
          <span>View details</span>
          <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </motion.button>
  )
}

// ── ProjectModal ──────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal card */}
      <motion.div
        initial={{ scale: 0.92, y: 32, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 16, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        onClick={(e) => e.stopPropagation()}
        className="relative glass rounded-3xl max-w-lg w-full overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
        style={{ border: `1px solid ${project.color}25` }}
      >
        {/* Color gradient header */}
        <div
          className="h-1"
          style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
        />

        <div className="p-7">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-xl glass flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
            aria-label="Close"
          >
            <X size={15} />
          </button>

          {/* Category + title */}
          <span
            className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full border mb-4 inline-block"
            style={{ color: project.color, borderColor: `${project.color}30`, background: `${project.color}10` }}
          >
            {project.category}
          </span>
          <h3
            className="text-2xl font-medium text-white/95 mb-1"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
          >
            {project.title}
          </h3>
          <p className="text-sm text-white/40 mb-5">{project.subtitle}</p>

          <p className="text-sm text-white/60 leading-relaxed mb-6">{project.description}</p>

          {/* Highlights */}
          <div className="mb-6">
            <p className="text-[10px] font-mono tracking-widest text-white/30 uppercase mb-3">
              Highlights
            </p>
            <ul className="space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-white/55">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: project.color }}
                  />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.map((t) => (
              <span key={t} className="tag-pill">{t}</span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm text-white/70 hover:text-white border border-white/8 hover:border-white/15 transition-all"
              >
                <Github size={14} />
                GitHub
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white font-medium"
                style={{ background: project.color }}
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── ProjectsSection ───────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const featured = siteData.projects.filter((p) => p.featured)
  const rest = siteData.projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      <div
        className="glow-blob w-[500px] h-[500px] bg-brand-700 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <p className="text-xs font-mono tracking-[0.3em] text-brand-400 uppercase mb-4">
            — Projects
          </p>
        </SectionReveal>

        <SectionReveal delay={80}>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 max-w-xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
          >
            <span className="text-white/90">Things I&apos;ve</span>
            <br />
            <em className="gradient-text not-italic">shipped</em>
          </h2>
          <p className="text-white/40 text-sm mb-14 max-w-md">
            From full-stack applications to cinematic video production for government & brands.
          </p>
        </SectionReveal>

        {/* Featured project */}
        <SectionReveal delay={100}>
          <div className="mb-6">
            {featured.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onOpen={setActiveProject}
                className="min-h-[200px]"
              />
            ))}
          </div>
        </SectionReveal>

        {/* Grid of other projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map((p, i) => (
            <SectionReveal key={p.id} delay={120 + i * 60}>
              <ProjectCard project={p} onOpen={setActiveProject} className="h-full min-h-[220px]" />
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
