'use client'

import { PanelLeft, Download, Share } from 'lucide-react'
import TrafficLights from './TrafficLights'
import type { WindowId } from '@/data/desktopItems'

type ResumeChromeProps = {
  id: WindowId
  isActive: boolean
  title: string
  fileUrl?: string
  onMouseDown?: () => void
  children: React.ReactNode
}

export default function ResumeChrome({
  id,
  isActive,
  title,
  fileUrl = '/resume.pdf',
  onMouseDown,
  children,
}: ResumeChromeProps) {
  const download = () => {
    const a = document.createElement('a')
    a.href = fileUrl
    a.download = 'Karim-El-Guerzyfy-CV.pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div
      onMouseDown={onMouseDown}
      className="flex flex-col w-full h-full rounded-xl overflow-hidden border border-panel-border"
      style={{
        background: 'var(--bg)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06) inset',
      }}
    >
      {/* Toolbar */}
      <div
        className="window-titlebar flex items-center h-12 px-4 gap-3 shrink-0 select-none border-b border-border cursor-default"
        style={{ background: 'var(--titlebar-bg)' }}
      >
        <TrafficLights id={id} isActive={isActive} />

        <div className="flex items-center gap-1 ml-1">
          <button aria-label="Sidebar" className="p-1 rounded hover:bg-white/5 cursor-pointer">
            <PanelLeft size={16} strokeWidth={1.8} className="text-text-dim" />
          </button>
        </div>

        {/* Filename centered */}
        <span
          className="flex-1 text-center text-xs font-medium truncate"
          style={{ color: isActive ? 'var(--text)' : 'var(--text-dim)' }}
        >
          {title}
        </span>

        {/* Download (functional) + share (decorative) */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Download CV"
            onClick={download}
            className="p-1 rounded hover:bg-white/5 cursor-pointer"
          >
            <Download size={16} strokeWidth={1.8} className="text-text-dim" />
          </button>
          <button aria-label="Share" className="p-1 rounded hover:bg-white/5 cursor-pointer">
            <Share size={16} strokeWidth={1.8} className="text-text-dim" />
          </button>
        </div>
      </div>

      {/* Body — dark, scrollable, renders CV content */}
      <div className="flex-1 overflow-auto" style={{ background: 'var(--bg)' }}>
        {children}
      </div>
    </div>
  )
}