'use client'

import Clock from './Clock'
import { useWindows } from '@/context/WindowContext'

export default function MenuBar() {
  const { windows, focusWindow, minimizeWindow } = useWindows()

  const openWindows = windows.filter((w) => w.isOpen)

  function handleTabClick(id: Parameters<typeof focusWindow>[0], isMinimized: boolean) {
    if (isMinimized) {
      focusWindow(id)
    } else {
      minimizeWindow(id)
    }
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-7 flex items-center px-4 gap-6 select-none"
      style={{
        background: 'var(--menubar)',
        backdropFilter: 'var(--blur-menubar)',
        WebkitBackdropFilter: 'var(--blur-menubar)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Left — Apple-style logo */}
      <span
        className="text-sm font-semibold tracking-tight cursor-default"
        style={{ color: 'var(--accent)' }}
      >
        ⌘
      </span>

      {/* App name */}
      <span
        className="text-xs font-semibold cursor-default"
        style={{ color: 'var(--text)' }}
      >
        Portfolio OS
      </span>

      {/* Divider */}
      <div className="w-px h-3.5" style={{ background: 'var(--border-high)' }} />

      {/* Open window tabs */}
      <div className="flex items-center gap-1 flex-1 overflow-x-auto">
        {openWindows.map((w) => (
          <button
            key={w.id}
            onClick={() => handleTabClick(w.id, w.isMinimized)}
            className="flex items-center gap-1.5 h-5 px-2.5 rounded text-xs transition-all duration-100 cursor-default"
            style={
              w.isMinimized
                ? {
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-dim)',
                  }
                : {
                    background: 'rgba(212,98,42,0.15)',
                    border: '1px solid rgba(212,98,42,0.25)',
                    color: 'var(--text)',
                  }
            }
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: w.isMinimized ? 'var(--text-dim)' : 'var(--accent)' }}
            />
            {w.title}
          </button>
        ))}
      </div>

      {/* Right — clock */}
      <Clock />
    </div>
  )
}