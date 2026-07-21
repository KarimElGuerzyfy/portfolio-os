'use client'

import { useState } from 'react'

const TO_ADDRESS = 'karim.lguerzyfy@gmail.com'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [from, setFrom] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const isValid = from.trim() !== '' && EMAIL_RE.test(from.trim()) &&
    subject.trim() !== '' && message.trim() !== ''

  const handleSend = async () => {
    if (honeypot.trim() !== '') {
      setStatus('sent')
      return
    }

    if (!isValid) return

    setStatus('sending')
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: from.trim(), subject: subject.trim(), message: message.trim(), honeypot }),
      })
      const data: { ok: boolean; error?: string } = await res.json()

      if (!res.ok || !data.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('sent')
    } catch {
      setError('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  const handleReset = () => {
    setFrom('')
    setSubject('')
    setMessage('')
    setHoneypot('')
    setStatus('idle')
    setError('')
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-4 px-10 text-center">
        <p className="text-sm text-text">Message sent. Thanks for reaching out.</p>
        <button
          onClick={handleReset}
          className="text-sm px-3 py-1.5 rounded-md border border-border text-text-dim hover:text-text hover:bg-white/5 transition-colors cursor-pointer"
        >
          Write another
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full h-full text-sm">
      {/* Honeypot — visually hidden, not display:none */}
      <input
        type="text"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          opacity: 0,
          left: '-9999px',
        }}
      />

      {/* Header */}
      <div className="shrink-0 px-4">
        <div className="flex items-center gap-2 h-9 border-b border-border">
          <span className="w-16 shrink-0 text-text-dim">To:</span>
          <span className="text-text-dim">{TO_ADDRESS}</span>
        </div>
        <div className="flex items-center gap-2 h-9 border-b border-border">
          <span className="w-16 shrink-0 text-text-dim">From:</span>
          <input
            type="email"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 bg-transparent outline-none text-text placeholder:text-text-dim"
          />
        </div>
        <div className="flex items-center gap-2 h-9 border-b border-border">
          <span className="w-16 shrink-0 text-text-dim">Subject:</span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Let's talk about..."
            className="flex-1 bg-transparent outline-none text-text placeholder:text-text-dim"
          />
        </div>
      </div>

      {/* Body */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message here..."
        className="flex-1 w-full resize-none bg-transparent outline-none px-4 py-3 text-text placeholder:text-text-dim"
      />

      {status === 'error' && (
        <p className="px-4 pb-2 text-xs" style={{ color: '#ff5f57' }}>
          {error}
        </p>
      )}

      {/* Footer */}
      <div className="shrink-0 flex items-center justify-end px-4 py-3 border-t border-border">
        <button
          onClick={handleSend}
          disabled={!isValid || status === 'sending'}
          className="px-4 py-1.5 rounded-md text-sm font-medium text-white transition-opacity cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
          style={{ background: 'var(--accent)' }}
        >
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>
      </div>
    </div>
  )
}
