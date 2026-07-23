'use client'

import { Download, Mail, MapPin } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'

function downloadCV() {
  const a = document.createElement('a')
  a.href = '/resume.pdf'
  a.download = 'Karim-El-Guerzyfy-CV.pdf'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

type Project = {
  name: string
  tagline: string
  year: string
  stack: string
  href?: string
  description: string
}

const PROJECTS: Project[] = [
  {
    name: 'Deuka',
    tagline: 'German vocabulary-mastery PWA',
    year: '2026',
    stack: 'React · TypeScript · Zustand · Supabase · Vite · Workbox',
    href: 'https://deuka.app',
    description:
      'A three-tier learning curriculum over 4,200+ A1–B2 vocabulary entries, with a mandatory 10/10 quiz gate enforced at the data and state layers. Offline-capable, bilingual EN/AR with true RTL, and two privileged Supabase Edge Functions for account deletion and demo protection.',
  },
  {
    name: 'React Ledger',
    tagline: 'Multi-user expense tracker',
    year: '2026',
    stack: 'React 19 · TypeScript · Supabase · Vite · React Router DOM',
    href: 'https://react-ledger-app.vercel.app',
    description:
      'Time modelled as a closing hierarchy (days → weeks → months → years) with server-side period closing on pg_cron, enforcing historical immutability in the database rather than the UI. Multi-user isolation via Row Level Security across all six tables.',
  },
  {
    name: 'Clinic Fès',
    tagline: 'Bilingual client website',
    year: '2026',
    stack: 'Next.js 14 · TypeScript · Tailwind CSS v4 · Vercel',
    href: 'https://local-business-template-rouge.vercel.app',
    description:
      'A real client engagement for a dentist in Fès, built to a designer’s Figma spec. Config-driven white-label architecture makes a new client deployment a single-file edit, with full French/Arabic support and real RTL layout handling.',
  },
  {
    name: 'Portfolio OS',
    tagline: 'macOS desktop environment in the browser',
    year: '2026',
    stack: 'Next.js 16 · React 19 · TypeScript · Framer Motion · Resend',
    href: 'https://github.com/KarimElGuerzyfy/portfolio-os',
    description:
      'This site. A working window manager — drag, eight-handle resize, maximise, minimise and z-index focus stacking — with all window state held in a single useReducer context so nothing is lost when a window closes.',
  },
  {
    name: 'Driss Bourkkadi',
    tagline: 'Designer portfolio site',
    year: '2026',
    stack: 'Next.js · TypeScript · Tailwind CSS · Vercel',
    href: 'https://driss-bourkkadi.vercel.app',
    description:
      'Built from Figma for a working designer, where the design itself is the product being sold. Responsive behaviour for deliberately composed image/text pairings had to be re-decided at every breakpoint rather than scaled.',
  },
]

const SKILL_GROUPS: { label: string; items: string[] }[] = [
  {
    label: 'Core',
    items: ['TypeScript', 'JavaScript', 'React 19', 'Next.js', 'HTML5', 'CSS3', 'SQL'],
  },
  {
    label: 'State & Forms',
    items: ['Zustand', 'React Router DOM', 'React Hook Form', 'Zod'],
  },
  {
    label: 'Styling',
    items: ['Tailwind CSS v4', 'Responsive design', 'RTL layout engineering'],
  },
  {
    label: 'Backend',
    items: ['Supabase', 'PostgreSQL', 'Row Level Security', 'Edge Functions', 'pg_cron', 'REST APIs'],
  },
  {
    label: 'Build & Deploy',
    items: ['Vite', 'Vercel', 'vite-plugin-pwa', 'Workbox'],
  },
  {
    label: 'Tooling',
    items: ['Git', 'GitHub', 'ESLint', 'Vitest', 'Figma'],
  },
]

const LANGUAGES: { name: string; level: string }[] = [
  { name: 'Arabic', level: 'Native' },
  { name: 'English', level: 'C1–C2' },
  { name: 'French', level: 'B2' },
  { name: 'German', level: 'B1' },
]

export default function CV() {
  return (
    <div className="max-w-2xl mx-auto px-8 py-10 text-text">
      {/* Header */}
      <header className="flex items-start justify-between gap-6 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Karim El Guerzyfy</h1>
          <p className="mt-1 text-sm text-text-dim">Frontend Developer</p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-text-dim">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} /> Fès, Morocco · Open to relocation
            </span>
            <a
              href="mailto:karim.lguerzyfy@gmail.com"
              className="flex items-center gap-1.5 hover:text-text transition-colors"
            >
              <Mail size={13} /> karim.lguerzyfy@gmail.com
            </a>
            <a
              href="https://github.com/KarimElGuerzyfy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-text transition-colors"
            >
              <FaGithub size={13} /> KarimElGuerzyfy
            </a>
            <a
              href="https://www.linkedin.com/in/karim-el-guerzyfy-775120233/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-text transition-colors"
            >
              <FaLinkedin size={13} /> LinkedIn
            </a>
          </div>
        </div>

        <button
          onClick={downloadCV}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium shrink-0 cursor-pointer transition-colors"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          <Download size={14} strokeWidth={2} />
          Download PDF
        </button>
      </header>

      {/* Summary */}
      <section className="py-6 border-b border-border">
        <p className="text-sm leading-relaxed text-text-dim">
          Self-taught frontend developer who started coding in February 2026. Since then I have
          designed, built and shipped five production applications — including a German-learning PWA
          with 4,200+ curated vocabulary entries and a paying client website — working in React,
          TypeScript and Supabase. Previously founded and ran a tutoring centre in Fès for two
          years. Based in Morocco, available for remote work and open to relocation.
        </p>
      </section>

      {/* Projects */}
      <section className="py-6 border-b border-border">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-dim mb-4">
          Projects
        </h2>

        <div className="space-y-5">
          {PROJECTS.map((p) => (
            <div key={p.name}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-sm font-medium">
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ textDecorationColor: 'var(--accent)' }}
                    >
                      {p.name}
                    </a>
                  ) : (
                    p.name
                  )}
                  <span className="text-text-dim font-normal"> — {p.tagline}</span>
                </h3>
                <span className="text-xs text-text-dim shrink-0">{p.year}</span>
              </div>

              <p className="mt-1.5 text-sm text-text-dim leading-relaxed">{p.description}</p>

              <p className="mt-1.5 text-xs text-text-dim opacity-70">{p.stack}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="py-6 border-b border-border">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-dim mb-4">
          Experience
        </h2>

        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-sm font-medium">Founder &amp; Director</h3>
          <span className="text-xs text-text-dim shrink-0">Nov 2022 – Jan 2025</span>
        </div>
        <p className="mt-1 text-sm text-text-dim">Allas Language and Tutoring Centre, Fès</p>
        <p className="mt-1.5 text-sm text-text-dim leading-relaxed">
          Founded and ran a multi-subject tutoring centre — hiring, scheduling, curriculum design
          and student progress tracking across concurrent learning tracks. Taught Biology, with a
          focus on breaking complex material down into explainable parts.
        </p>
      </section>

      {/* Skills */}
      <section className="py-6 border-b border-border">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-dim mb-4">
          Skills
        </h2>

        <div className="space-y-3">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="text-xs text-text-dim mb-1.5 opacity-70">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-md text-xs"
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text)' }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="py-6 border-b border-border">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-dim mb-4">
          Education
        </h2>

        <div className="space-y-4">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-sm font-medium">Bachelor&apos;s Degree (Licence) in Biology</h3>
              <span className="text-xs text-text-dim shrink-0">Sep 2021</span>
            </div>
            <p className="mt-1 text-sm text-text-dim">
              Sidi Mohamed Ben Abdellah University, Fès
            </p>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-sm font-medium">
                Baccalaureate in Experimental Sciences (Physics)
              </h3>
              <span className="text-xs text-text-dim shrink-0">Jun 2015</span>
            </div>
            <p className="mt-1 text-sm text-text-dim">Lycée Al Massira, Fès</p>
          </div>
        </div>
      </section>

      {/* Languages */}
      <section className="py-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-dim mb-4">
          Languages
        </h2>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {LANGUAGES.map((l) => (
            <span key={l.name} className="text-sm">
              {l.name} <span className="text-text-dim">{l.level}</span>
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}