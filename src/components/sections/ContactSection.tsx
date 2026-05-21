'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { siteData } from '@/lib/data'
import { Mail, Phone, Github, Linkedin, Instagram, Send, ArrowUpRight } from 'lucide-react'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle')
  const [emailError, setEmailError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError('')
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setEmailError('Invalid email format')
      return
    }

    if (form.email.toLowerCase() === siteData.contact.email.toLowerCase()) {
      setEmailError("You can't use my own email to contact me!")
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setStatus('sent')
        setTimeout(() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }) }, 4000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (err) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const socials = [
    { icon: Github,    label: 'GitHub',    handle: '@core-ctrl',                href: siteData.contact.github },
    { icon: Linkedin,  label: 'LinkedIn',  handle: 'parupalli-saiharshitha',    href: siteData.contact.linkedin },
    { icon: Instagram, label: 'Instagram', handle: '@its.harshi05',             href: siteData.contact.instagram_personal },
    { icon: Instagram, label: 'Edits',     handle: '@editsz537',                href: siteData.contact.instagram_edit },
  ]

  const inputCls = "w-full bg-transparent border border-[var(--gold)]/15 px-4 py-3.5 text-xs font-mono text-[var(--cream)] placeholder-[var(--cream-muted)]/40 focus:outline-none focus:border-[var(--gold)]/60 transition-all duration-200 tracking-wider uppercase"

  return (
    <section id="contact" className="relative bg-[var(--bg-surface)] border-t border-[var(--gold)]/10 overflow-hidden">

      {/* ── Giant background CTA text ── */}
      <div className="w-full overflow-hidden border-b border-[var(--gold)]/10 py-10 select-none">
        <div className="marquee-container">
          <div className="marquee-content gap-0">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(48px, 9vw, 130px)', lineHeight: 1, whiteSpace: 'nowrap', color: 'transparent', WebkitTextStroke: '1px rgba(201,166,107,0.18)' }}
              >
                LET'S BUILD SOMETHING ICONIC ✦&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[var(--gold)]" />
            <span className="text-[10px] font-mono tracking-[0.4em] text-[var(--gold)] uppercase">Transmit</span>
          </div>
          <div style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(56px, 10vw, 140px)', lineHeight: 0.9 }}>
            <div className="text-[var(--cream)] overflow-hidden">
              <motion.div initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
                INITIATE
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
                <span className="font-serif italic lowercase tracking-normal text-[var(--gold)]" style={{ WebkitTextStroke: '0px' }}>Transmission</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left — Details */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[var(--cream-muted)] text-sm leading-relaxed mb-10 border-l border-[var(--gold)]/30 pl-4">
                Open to full-stack collaborations, cybersecurity projects, and cinematic video commissions.
              </p>

              {/* Email & Phone */}
              <div className="space-y-4 mb-10">
                <a href={`mailto:${siteData.contact.email}`}
                  className="group flex items-center justify-between border border-[var(--gold)]/15 px-5 py-4 hover:border-[var(--gold)]/50 transition-all duration-200">
                  <div>
                    <p className="text-[8px] font-mono text-[var(--gold)]/60 tracking-widest uppercase mb-1">Email</p>
                    <p className="text-xs font-mono text-[var(--cream)] break-all">{siteData.contact.email}</p>
                  </div>
                  <Mail size={14} className="text-[var(--cream-muted)] group-hover:text-[var(--gold)] transition-colors shrink-0 ml-3" />
                </a>


              </div>

              {/* Socials */}
              <div className="space-y-3">
                <p className="text-[8px] font-mono tracking-widest text-[var(--gold)]/50 uppercase mb-4">Platforms</p>
                {socials.map(({ icon: Icon, label, handle, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center justify-between py-2 border-b border-[var(--gold)]/10 hover:border-[var(--gold)]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <Icon size={12} className="text-[var(--cream-muted)] group-hover:text-[var(--gold)] transition-colors" />
                      <span className="text-xs font-mono text-[var(--cream-dim)] group-hover:text-[var(--cream)] transition-colors">{handle}</span>
                    </div>
                    <ArrowUpRight size={10} className="text-[var(--cream-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-8">
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="border border-[var(--gold)]/15 p-8 md:p-10 space-y-5 relative"
            >
              <div className="absolute top-3 left-4 text-[8px] font-mono text-[var(--gold)]/30 tracking-widest">[ PROMPT_INPUT ]</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
                <div>
                  <label className="block text-[8px] font-mono tracking-widest text-[var(--gold)]/60 uppercase mb-2">Sender Name</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-[8px] font-mono tracking-widest text-[var(--gold)]/60 uppercase mb-2">Email Address</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => {
                      setForm({ ...form, email: e.target.value })
                      if (emailError) setEmailError('')
                    }}
                    placeholder="you@domain.com"
                    className={inputCls}
                  />
                  {emailError && <p className="text-[10px] text-red-500 font-mono mt-2 uppercase">{emailError}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[8px] font-mono tracking-widest text-[var(--gold)]/60 uppercase mb-2">Message</label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe the project or collaboration..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 bg-[var(--gold)] text-[var(--black)] text-xs font-mono font-bold tracking-[0.25em] uppercase flex items-center justify-center gap-3 hover:bg-[var(--gold-light)] transition-colors duration-200 disabled:opacity-50"
              >
                <Send size={12} />
                {status === 'sending' ? 'TRANSMITTING...' : status === 'sent' ? 'TRANSMISSION COMPLETE ✓' : status === 'error' ? 'FAILED. RETRY?' : 'SEND TRANSMISSION'}
              </motion.button>
            </motion.form>
          </div>

        </div>
      </div>
    </section>
  )
}
