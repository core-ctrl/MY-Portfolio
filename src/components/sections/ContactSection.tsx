'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionReveal from '@/components/ui/SectionReveal'
import { siteData } from '@/lib/data'
import { Mail, Phone, Github, Linkedin, Instagram, Send, CheckCircle, MessageSquare } from 'lucide-react'

const Discord = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
  </svg>
)
export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Build mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.open(`mailto:${siteData.contact.email}?subject=${subject}&body=${body}`)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: siteData.contact.github, handle: '@core-ctrl' },
    { icon: Linkedin, label: 'LinkedIn', href: siteData.contact.linkedin, handle: 'parupalli-saiharshitha' },
    { icon: Instagram, label: 'Instagram (Edit)', href: siteData.contact.instagram_edit, handle: '@editsz537' },
    { icon: Instagram, label: 'Instagram (Personal)', href: siteData.contact.instagram_personal, handle: '@its.harshi05' },
    { icon: Discord, label: 'Discord', href: siteData.contact.discord, handle: 'Harshee.exe' },
  ]

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div
        className="glow-blob w-[500px] h-[500px] bg-brand-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-8"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <p className="text-xs font-mono tracking-[0.3em] text-brand-400 uppercase mb-4">
            — Contact
          </p>
        </SectionReveal>

        <SectionReveal delay={80}>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 max-w-2xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
          >
            <span className="text-white/90">Let&apos;s build</span>
            <br />
            <em className="gradient-text not-italic">something together</em>
          </h2>
          <p className="text-white/40 text-sm mb-14 max-w-sm">
            Open to freelance projects, collabs, and opportunities. Drop a message.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left — contact info */}
          <div className="lg:col-span-2 space-y-4">
            <SectionReveal delay={100}>
              {/* Email card */}
              <a
                href={`mailto:${siteData.contact.email}`}
                className="flex items-center gap-4 glass glass-hover rounded-2xl p-5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/20 flex items-center justify-center shrink-0">
                  <Mail size={17} className="text-brand-400" />
                </div>
                <div>
                  <p className="text-xs text-white/30 font-mono mb-0.5">Email</p>
                  <p className="text-sm text-white/80 group-hover:text-white transition-colors break-all">
                    {siteData.contact.email}
                  </p>
                </div>
              </a>
            </SectionReveal>

            <SectionReveal delay={130}>
              {/* Phone card */}
              <div className="flex items-center gap-4 glass rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-accent-500/15 border border-accent-500/20 flex items-center justify-center shrink-0">
                  <Phone size={17} className="text-accent-400" />
                </div>
                <div>
                  <p className="text-xs text-white/30 font-mono mb-0.5">Phone</p>
                  <p className="text-sm text-white/80">{siteData.contact.phone}</p>
                </div>
              </div>
            </SectionReveal>

            {/* Social links */}
            <SectionReveal delay={160}>
              <div className="glass rounded-2xl p-5 space-y-3">
                <p className="text-[10px] font-mono tracking-widest text-white/30 uppercase mb-4">
                  Find me on
                </p>
                {socialLinks.map(({ icon: Icon, label, href, handle }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <Icon size={15} className="text-white/30 group-hover:text-white/70 transition-colors" />
                    <span className="text-xs text-white/40 group-hover:text-white/70 transition-colors">
                      {handle}
                    </span>
                    <span className="text-[10px] text-white/20 ml-auto font-mono">{label}</span>
                  </a>
                ))}
              </div>
            </SectionReveal>
          </div>

          {/* Right — contact form */}
          <SectionReveal delay={120} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-7 space-y-4"
              style={{ border: '1px solid rgba(106,80,255,0.15)' }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-white/30 uppercase mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Eg. Priya Sharma"
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-brand-500/50 focus:bg-white/6 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-white/30 uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-brand-500/50 focus:bg-white/6 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-widest text-white/30 uppercase mb-2">
                  Message
                </label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project, collab idea, or just say hi..."
                  rows={5}
                  className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-brand-500/50 focus:bg-white/6 transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2 magnetic relative overflow-hidden group"
                style={{ background: sent ? '#10b981' : 'linear-gradient(135deg, #6a50ff, #4f3acc)' }}
              >
                {/* Shimmer on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative flex items-center gap-2">
                  {sent ? (
                    <>
                      <CheckCircle size={16} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
