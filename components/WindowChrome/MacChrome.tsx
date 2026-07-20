'use client'

import TrafficLights from './TrafficLights'
import type { WindowId } from '@/data/desktopItems'

type MacChromeProps = {
  id: WindowId
  title: string
  isActive: boolean
  onMouseDown?: () => void
  children: React.ReactNode
}

export default function MacChrome({ id, title, isActive, onMouseDown, children }: MacChromeProps) {
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
        className="window-titlebar flex items-center h-11 px-4 shrink-0 select-none"
        style={{
          background: 'var(--titlebar-bg)',
          borderBottom: '1px solid var(--border)',
          cursor: 'grab',
        }}
      >
        <TrafficLights id={id} isActive={isActive} />

        {/* Title */}
        <span
          className="flex-1 text-center text-xs font-medium truncate"
          style={{ color: isActive ? 'var(--text-dim)' : 'rgba(255,255,255,0.2)' }}
        >
          {title}
        </span>

        {/* Spacer to balance traffic lights */}
        <div style={{ minWidth: '52px', width: '52px' }} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}