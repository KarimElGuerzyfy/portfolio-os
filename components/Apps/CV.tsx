'use client'

import { Download, Mail, MapPin, Code } from 'lucide-react'

function downloadCV() {
  const a = document.createElement('a')
  a.href = '/resume.pdf'
  a.download = 'Karim-El-Guerzyfy-CV.pdf'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export default function CV() {
  return (
    <div className="max-w-2xl mx-auto px-8 py-10 text-text">
      {/* Header */}
      <header className="flex items-start justify-between gap-6 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Karim El Guerzyfy</h1>
          <p className="mt-1 text-sm text-text-dim">Frontend Developer</p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-text-dim">
            <span className="flex items-center gap-1.5"><MapPin size={13} /> Morocco · Open to relocation</span>
            <span className="flex items-center gap-1.5"><Mail size={13} /> your-email@example.com</span>
            <span className="flex items-center gap-1.5"><Code size={13} /> KarimElGuerzyfy</span>
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
          [ Short professional summary goes here — 2–3 lines about who you are,
          what you build, and what you&apos;re looking for. ]
        </p>
      </section>

      {/* Experience / Projects */}
      <section className="py-6 border-b border-border">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-dim mb-4">
          Projects
        </h2>

        <div className="space-y-5">
          <div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-medium">Deuka — Language Learning PWA</h3>
              <span className="text-xs text-text-dim">2026</span>
            </div>
            <p className="mt-1 text-sm text-text-dim leading-relaxed">
              [ One or two lines describing the project, your role, and the stack. ]
            </p>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-medium">Ledger — Expense Tracker</h3>
              <span className="text-xs text-text-dim">2026</span>
            </div>
            <p className="mt-1 text-sm text-text-dim leading-relaxed">
              [ One or two lines describing the project, your role, and the stack. ]
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-6 border-b border-border">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-dim mb-4">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Git', 'Figma'].map((s) => (
            <span
              key={s}
              className="px-2.5 py-1 rounded-md text-xs"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text)' }}
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="py-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-dim mb-4">
          Education
        </h2>
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-medium">Meta Frontend Developer Certificate</h3>
          <span className="text-xs text-text-dim">2026</span>
        </div>
        <p className="mt-1 text-sm text-text-dim">Coursera</p>
      </section>
    </div>
  )
}