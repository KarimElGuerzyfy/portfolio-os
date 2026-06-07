'use client'

import { X, Minus, Maximize2 } from 'lucide-react'
import { useWindows } from '@/context/WindowContext'
import type { WindowId } from '@/data/desktopItems'

type MacChromeProps = {
  id: WindowId
  title: string
  isActive: boolean
  onMouseDown?: () => void
  children: React.ReactNode
}

export default function MacChrome({ id, title, isActive, onMouseDown, children }: MacChromeProps) {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindows()

  return (
    <div
      className="flex flex-col w-full h-full rounded-xl overflow-hidden"
      onMouseDown={onMouseDown}
      style={{
        background: 'var(--panel-bg)',
        backdropFilter: 'var(--blur-panel)',
        WebkitBackdropFilter: 'var(--blur-panel)',
        border: '1px solid var(--panel-border)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06) inset',
      }}
    >
      {/* Title bar */}
      <div
        className="window-titlebar flex items-center h-11 px-4 shrink-0 select-none group/titlebar"
        style={{
          background: 'var(--titlebar-bg)',
          borderBottom: '1px solid var(--border)',
          cursor: 'grab',
        }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-2.5" style={{ cursor: 'default' }}>

          {/* Red — close */}
          <button
            aria-label="Close"
            onClick={() => closeWindow(id)}
            className="relative flex items-center justify-center rounded-full transition-all duration-150 hover:brightness-90 active:brightness-75"
            style={{
              width: '18px',
              height: '18px',
              minWidth: '18px',
              cursor: 'pointer',
              background: isActive ? '#ff5f57' : 'rgba(255,255,255,0.18)',
              boxShadow: isActive
                ? 'inset 0 0.5px 1px rgba(255,255,255,0.4), inset 0 -0.5px 1px rgba(0,0,0,0.3)'
                : 'none',
            }}
          >
            <X
              size={9}
              strokeWidth={2.5}
              className="opacity-0 group-hover/titlebar:opacity-100 transition-opacity duration-100"
              style={{ color: 'rgba(0,0,0,0.45)', pointerEvents: 'none' }}
            />
          </button>

          {/* Yellow — minimize */}
          <button
            aria-label="Minimize"
            onClick={() => minimizeWindow(id)}
            className="relative flex items-center justify-center rounded-full transition-all duration-150 hover:brightness-90 active:brightness-75"
            style={{
              width: '18px',
              height: '18px',
              minWidth: '18px',
              cursor: 'pointer',
              background: isActive ? '#febc2e' : 'rgba(255,255,255,0.18)',
              boxShadow: isActive
                ? 'inset 0 0.5px 1px rgba(255,255,255,0.4), inset 0 -0.5px 1px rgba(0,0,0,0.3)'
                : 'none',
            }}
          >
            <Minus
              size={9}
              strokeWidth={2.5}
              className="opacity-0 group-hover/titlebar:opacity-100 transition-opacity duration-100"
              style={{ color: 'rgba(0,0,0,0.45)', pointerEvents: 'none' }}
            />
          </button>

          {/* Green — maximize/restore */}
          <button
            aria-label="Maximize"
            onClick={() => maximizeWindow(id)}
            className="relative flex items-center justify-center rounded-full transition-all duration-150 hover:brightness-90 active:brightness-75"
            style={{
              width: '18px',
              height: '18px',
              minWidth: '18px',
              cursor: 'pointer',
              background: isActive ? '#28c840' : 'rgba(255,255,255,0.18)',
              boxShadow: isActive
                ? 'inset 0 0.5px 1px rgba(255,255,255,0.4), inset 0 -0.5px 1px rgba(0,0,0,0.3)'
                : 'none',
            }}
          >
            <Maximize2
              size={9}
              strokeWidth={2.5}
              className="opacity-0 group-hover/titlebar:opacity-100 transition-opacity duration-100"
              style={{ color: 'rgba(0,0,0,0.45)', pointerEvents: 'none' }}
            />
          </button>
        </div>

        {/* Title */}
        <span
          className="flex-1 text-center text-xs font-medium truncate"
          style={{ color: isActive ? 'var(--text-dim)' : 'rgba(255,255,255,0.2)' }}
        >
          {title}
        </span>

        {/* Spacer to balance traffic lights */}
        <div style={{ minWidth: '18px', width: '18px' }} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}