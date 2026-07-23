'use client'

import { useState } from 'react'
import { ExternalLink, Play } from 'lucide-react'

const DEMO_URL = 'https://www.deuka.app/demo'

export default function Deuka() {
  const [launched, setLaunched] = useState(false)

  if (launched) {
    return (
      <iframe
        src={DEMO_URL}
        title="Deuka — live demo"
        className="w-full h-full border-0"
        allow="clipboard-write"
      />
    )
  }

  return (
    <div className="w-full h-full overflow-auto">
      <div className="max-w-xl mx-auto px-8 py-14 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-text">Deuka</h1>
        <p className="mt-2 text-sm text-text-dim">
          German vocabulary, built so you can&apos;t skip ahead
        </p>

        <p className="mt-6 text-sm leading-relaxed text-text-dim">
          A three-tier curriculum over 4,200+ A1–B2 words. Ten words make a bucket,
          ten buckets a centurion. Each bucket ends in a quiz — a perfect 10/10 is
          the only way forward, enforced in the database rather than the UI.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setLaunched(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            <Play size={15} strokeWidth={2.2} />
            Launch live demo
          </button>

          <a
            href="https://deuka.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-text-dim hover:text-text transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <ExternalLink size={15} strokeWidth={2.2} />
            Open in new tab
          </a>
        </div>

        <p className="mt-5 text-xs text-text-dim opacity-60">
          Signs you in automatically as a guest — no account needed.
        </p>
      </div>
    </div>
  )
}