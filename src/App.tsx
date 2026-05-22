import { useState, useEffect, useRef, FormEvent } from 'react'
import { supabase } from './lib/supabase'
import { ExternalLink, Mail, MapPin, Github, ArrowUpRight, Send } from 'lucide-react'

/* ─── TYPES ─── */
interface Project {
  title: string
  desc: string
  tags: string[]
  link: string
  emoji: string
  type: string
}

const PROJECTS: Project[] = [
  {
    title: 'Crazy Inasal',
    desc: 'Full-featured Filipino restaurant website with live menu management, real-time cart, order submission with receipt generation, and Supabase-backed order tracking.',
    tags: ['React', 'TypeScript', 'Supabase', 'Tailwind'],
    link: 'https://crazy-inasal.vercel.app',
    emoji: '🍗',
    type: 'Restaurant & Ordering System',
  },
  {
    title: 'PharmaHealth OS',
    desc: 'Secure pharmacy management dashboard with Supabase Auth, real patient records, appointment scheduling, live calendar, and clinical audit logs.',
    tags: ['React', 'TypeScript', 'Supabase Auth', 'Dashboard'],
    link: 'https://pharmahealth-os.vercel.app',
    emoji: '💊',
    type: 'Healthcare SaaS',
  },
]

const SKILLS = [
  'React', 'TypeScript', 'Node.js', 'Supabase', 'PostgreSQL',
  'Tailwind CSS', 'REST APIs', 'Vite', 'Git', 'Vercel',
  'Systems Design', 'Data Analysis', 'AI Integration',
]

/* ─── FADE-IN HOOK ─── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('opacity-100', 'translate-y-0'); el.classList.remove('opacity-0', 'translate-y-8') } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transitionDelay = `${delay}ms`
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('opacity-100', 'translate-y-0'); el.classList.remove('opacity-0', 'translate-y-8') } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return (
    <div ref={ref} className="opacity-0 translate-y-8 transition-all duration-700 ease-out">
      {children}
    </div>
  )
}

/* ─── CURSOR BLINK ─── */
function BlinkCursor() {
  return <span className="inline-block w-[3px] h-[0.85em] bg-[#22d3ee] ml-1 align-middle animate-[blink_1s_step-end_infinite]" />
}

/* ─── NAV ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-6 py-5 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-black/60' : ''}`}>
      <div className="flex items-center gap-1 bg-[#111]/90 border border-white/10 rounded-full px-2 py-2 backdrop-blur-sm">
        <a href="#home" className="px-4 py-1.5 text-sm font-semibold text-white/90 hover:text-white rounded-full hover:bg-white/5 transition-colors">Home</a>
        <a href="#work" className="px-4 py-1.5 text-sm font-semibold text-white/60 hover:text-white rounded-full hover:bg-white/5 transition-colors">Work</a>
        <a href="#about" className="px-4 py-1.5 text-sm font-semibold text-white/60 hover:text-white rounded-full hover:bg-white/5 transition-colors">About</a>
        <a href="#contact" className="px-4 py-1.5 text-sm font-semibold text-white/60 hover:text-white rounded-full hover:bg-white/5 transition-colors">Contact</a>
      </div>
    </nav>
  )
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section id="home" className="min-h-screen grid-bg flex flex-col justify-center px-6 pt-24 pb-16 relative overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#22d3ee]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#22d3ee]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full">
        <FadeIn>
          <p className="text-[#22d3ee] font-semibold text-base mb-3 tracking-wide">Hi, my name is</p>
        </FadeIn>
        <FadeIn delay={100}>
          <h1 className="text-[clamp(48px,8vw,96px)] font-black leading-[1.0] tracking-tight text-white mb-2">
            Emeer Drey Mendoza.<BlinkCursor />
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <h2 className="text-[clamp(28px,5vw,60px)] font-black leading-tight tracking-tight text-white/30 mb-8">
            Building digital solutions.
          </h2>
        </FadeIn>
        <FadeIn delay={300}>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed mb-10">
            I'm a{' '}
            <a href="#work" className="text-[#22d3ee] hover:underline">
              Full-Stack Developer & Systems Designer
            </a>{' '}
            based in Edmonton, Alberta. I build modern web applications, data-driven dashboards, and custom business systems.
          </p>
        </FadeIn>
        <FadeIn delay={400}>
          <div className="flex gap-4">
            <a href="#work" className="bg-[#22d3ee] hover:bg-[#06b6d4] text-black font-bold px-6 py-3 rounded-full text-sm transition-colors">
              View My Work
            </a>
            <a href="#contact" className="border border-white/15 hover:border-white/30 text-white/80 hover:text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors">
              Get in Touch
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#22d3ee]" />
        <span className="text-xs text-white/50 tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  )
}

/* ─── SKILLS MARQUEE ─── */
function SkillsMarquee() {
  const doubled = [...SKILLS, ...SKILLS]
  return (
    <div className="border-y border-white/5 py-4 overflow-hidden bg-[#111]/50">
      <div className="flex gap-8 animate-[marquee_25s_linear_infinite] w-max">
        {doubled.map((s, i) => (
          <span key={i} className="text-white/30 text-sm font-semibold whitespace-nowrap flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-[#22d3ee]" />
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── WORK ─── */
function Work() {
  return (
    <section id="work" className="py-24 px-6 grid-bg">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-4 mb-14">
            <div className="w-1 h-8 bg-[#22d3ee]" />
            <h2 className="text-3xl font-black text-white">A Glimpse of My Work</h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <FadeIn key={i} delay={i * 150}>
              <div className="group bg-[#111] border border-white/8 rounded-2xl overflow-hidden hover:border-[#22d3ee]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]">
                {/* Mock preview */}
                <div className="h-52 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] flex items-center justify-center relative overflow-hidden border-b border-white/5">
                  <span className="text-7xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 group-hover:scale-110 transform transition-transform">{p.emoji}</span>
                  <div className="absolute inset-0 grid-bg opacity-40" />
                  <div className="absolute top-3 right-3 bg-[#22d3ee]/10 border border-[#22d3ee]/20 text-[#22d3ee] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {p.type}
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-black text-white mb-3">{p.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tags.map((t, j) => (
                      <span key={j} className="bg-[#22d3ee]/10 border border-[#22d3ee]/20 text-[#22d3ee] text-xs font-semibold px-3 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#22d3ee] text-sm font-bold hover:gap-3 transition-all duration-200">
                    View Project <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── ABOUT ─── */
function About() {
  const services = [
    { icon: '🎨', title: 'Web Design & UI/UX', desc: 'Clean, modern interfaces designed to convert visitors into clients.' },
    { icon: '⚙️', title: 'Web Development', desc: 'Solid React + TypeScript code built to scale and easy to maintain.' },
    { icon: '🗄️', title: 'Full-Stack Systems', desc: 'Custom dashboards, booking tools, and data platforms for your business.' },
    { icon: '🤖', title: 'Data & AI Integration', desc: 'Data pipelines, analysis workflows, and AI-powered business tools.' },
  ]

  return (
    <section id="about" className="py-24 px-6 bg-[#0d0d0d]">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-4 mb-14">
            <div className="w-1 h-8 bg-[#22d3ee]" />
            <h2 className="text-3xl font-black text-white">About Me</h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          <FadeIn>
            <div className="space-y-5 text-white/60 leading-relaxed">
              <p className="text-lg">
                Hi, I'm <span className="text-white font-bold">Emeer Drey Mendoza</span> — a Systems, Data & AI Coordinator and IT Business Analyst turned full-stack developer, based in Edmonton, Alberta.
              </p>
              <p>
                I bridge the gap between business requirements and technical execution. Whether it's a restaurant ordering system, a clinical patient database, or a data dashboard — I design and build systems that actually solve problems.
              </p>
              <p>
                My background in data and AI gives me an edge most front-end developers don't have: I understand <em>why</em> the data matters, not just how to display it.
              </p>
              <div className="pt-4">
                <a href="mailto:emeerdreys@gmail.com" className="inline-flex items-center gap-2 text-[#22d3ee] font-bold hover:underline">
                  <Mail size={16} /> emeerdreys@gmail.com
                </a>
              </div>
              <div>
                <span className="inline-flex items-center gap-2 text-white/40 text-sm">
                  <MapPin size={14} /> Edmonton, Alberta & Across Canada
                </span>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="bg-[#111] border border-white/8 rounded-xl p-5 hover:border-[#22d3ee]/25 transition-colors group">
                  <div className="text-2xl mb-3">{s.icon}</div>
                  <div className="text-sm font-bold text-white mb-2 group-hover:text-[#22d3ee] transition-colors">{s.title}</div>
                  <div className="text-xs text-white/45 leading-relaxed">{s.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CONTACT ─── */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const { error } = await supabase.from('contact_messages').insert([{
        name: form.name,
        email: form.email,
        project_type: form.project,
        message: form.message,
      }])
      if (error) throw error
      setStatus('success')
      setForm({ name: '', email: '', project: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 px-6 grid-bg">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1 h-8 bg-[#22d3ee]" />
            <h2 className="text-3xl font-black text-white">Get in Touch</h2>
          </div>
          <p className="text-white/50 mb-14 ml-5 pl-4 border-l border-transparent">
            Have a question, or want to collaborate? Send me a message.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeIn>
            <div className="space-y-8">
              <div>
                <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-2">Location</p>
                <p className="text-white font-semibold">Edmonton, Alberta & Across Canada</p>
              </div>
              <div>
                <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-2">Email</p>
                <a href="mailto:emeerdreys@gmail.com" className="text-[#22d3ee] font-bold hover:underline">emeerdreys@gmail.com</a>
              </div>
              <div>
                <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-2">Response Time</p>
                <p className="text-white/70">Usually within 24 hours</p>
              </div>
              <div>
                <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-3">Find me on</p>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/10 hover:border-[#22d3ee]/40 text-white/70 hover:text-[#22d3ee] px-4 py-2 rounded-full text-sm font-semibold transition-colors">
                  <Github size={16} /> GitHub
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Full Name</label>
                  <input
                    type="text" placeholder="Your name" required
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full bg-[#111] border border-white/10 focus:border-[#22d3ee]/50 text-white placeholder-white/20 px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Email</label>
                  <input
                    type="email" placeholder="you@email.com" required
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full bg-[#111] border border-white/10 focus:border-[#22d3ee]/50 text-white placeholder-white/20 px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Project Type</label>
                <select
                  value={form.project} onChange={e => setForm(f => ({ ...f, project: e.target.value }))}
                  className="w-full bg-[#111] border border-white/10 focus:border-[#22d3ee]/50 text-white px-4 py-3 rounded-xl text-sm outline-none transition-colors appearance-none"
                >
                  <option value="">Select a service...</option>
                  <option value="Website">Business Website</option>
                  <option value="Web App">Web Application</option>
                  <option value="Dashboard">Dashboard / Admin Portal</option>
                  <option value="E-Commerce">E-Commerce / Ordering System</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  placeholder="Tell me about your project..." rows={5} required
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full bg-[#111] border border-white/10 focus:border-[#22d3ee]/50 text-white placeholder-white/20 px-4 py-3 rounded-xl text-sm outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit" disabled={status === 'sending'}
                className="flex items-center gap-2 bg-[#22d3ee] hover:bg-[#06b6d4] disabled:opacity-60 text-black font-bold px-6 py-3 rounded-full text-sm transition-colors"
              >
                <Send size={16} />
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && (
                <p className="text-[#22d3ee] text-sm font-semibold">✓ Message sent! I'll get back to you within 24 hours.</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm font-semibold">Something went wrong. Email me directly at emeerdreys@gmail.com</p>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/30 text-sm">© 2026 Emeer Drey Mendoza · Edmonton, Alberta</p>
        <a href="#home" className="text-[#22d3ee] text-sm font-bold hover:underline">Back to top ↑</a>
      </div>
    </footer>
  )
}

/* ─── APP ─── */
export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Nav />
      <Hero />
      <SkillsMarquee />
      <Work />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
