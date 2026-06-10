'use client'

import TrafficLights from './TrafficLights'
import type { WindowId } from '@/data/desktopItems'

type AboutChromeProps = {
  id: WindowId
  isActive: boolean
  title: string
  onMouseDown?: () => void
  children: React.ReactNode
}

export default function AboutChrome({ id, isActive, title, onMouseDown, children }: AboutChromeProps) {
  return (
    <div
      onMouseDown={onMouseDown}
      className="flex flex-col w-full h-full rounded-xl overflow-hidden border border-panel-border"
      style={{
        background: 'var(--bg)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06) inset',
      }}
    >
      {/* Title bar */}
      <div
        className="window-titlebar flex items-center h-11 px-4 shrink-0 select-none border-b border-border cursor-default"
        style={{ background: 'var(--titlebar-bg)' }}
      >
        <TrafficLights id={id} isActive={isActive} />
        <span
          className="flex-1 text-center text-xs font-medium truncate"
          style={{ color: isActive ? 'var(--text)' : 'var(--text-dim)' }}
        >
          {title}
        </span>
        <div style={{ width: '52px' }} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}