'use client'

import { ChevronLeft, ChevronRight, PanelLeft, Lock, Share, Plus, Copy, RotateCw } from 'lucide-react'
import TrafficLights from './TrafficLights'
import type { WindowId } from '@/data/desktopItems'

type SafariChromeProps = {
  id: WindowId
  isActive: boolean
  url: string
  onMouseDown?: () => void
  children: React.ReactNode
}

export default function SafariChrome({ id, isActive, url, onMouseDown, children }: SafariChromeProps) {
  return (
    <div
      className="flex flex-col w-full h-full rounded-xl overflow-hidden"
      onMouseDown={onMouseDown}
      style={{
        background: 'var(--bg)',
        border: '1px solid var(--panel-border)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06) inset',
      }}
    >
      {/* Safari toolbar — single row, traffic lights inside it, whole row draggable */}
      <div
        className="window-titlebar flex items-center h-12 px-4 gap-3 shrink-0 select-none group/titlebar"
        style={{
          background: 'var(--titlebar-bg)',
          borderBottom: '1px solid var(--border)',
          cursor: 'default',
        }}
      >
        {/* Traffic lights (shared component) */}
        <TrafficLights id={id} isActive={isActive} />

        {/* Sidebar toggle + nav arrows */}
        <div className="flex items-center gap-1 ml-1" style={{ cursor: 'default' }}>
          <button aria-label="Sidebar" className="p-1 rounded hover:bg-white/5" style={{ cursor: 'pointer' }}>
            <PanelLeft size={16} strokeWidth={1.8} style={{ color: 'var(--text-dim)' }} />
          </button>
          <button aria-label="Back" className="p-1 rounded" style={{ cursor: 'default' }}>
            <ChevronLeft size={18} strokeWidth={1.8} style={{ color: 'rgba(255,255,255,0.25)' }} />
          </button>
          <button aria-label="Forward" className="p-1 rounded" style={{ cursor: 'default' }}>
            <ChevronRight size={18} strokeWidth={1.8} style={{ color: 'rgba(255,255,255,0.25)' }} />
          </button>
        </div>

        {/* Address bar */}
        <div
          className="flex-1 flex items-center justify-center gap-1.5 h-7 mx-2 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.06)', cursor: 'default' }}
        >
          <Lock size={11} strokeWidth={2} style={{ color: 'var(--text-dim)' }} />
          <span className="text-[13px]" style={{ color: 'var(--text)' }}>{url}</span>
          <RotateCw size={12} strokeWidth={1.8} style={{ color: 'var(--text-dim)', marginLeft: '4px' }} />
        </div>

        {/* Right-side icons (decorative) */}
        <div className="flex items-center gap-2" style={{ cursor: 'default' }}>
          <Share size={16} strokeWidth={1.8} style={{ color: 'var(--text-dim)' }} />
          <Plus size={17} strokeWidth={1.8} style={{ color: 'var(--text-dim)' }} />
          <Copy size={16} strokeWidth={1.8} style={{ color: 'var(--text-dim)' }} />
        </div>
      </div>

      {/* Content — Deuka/Ledger page scrolls here */}
      <div className="flex-1 overflow-auto" style={{ background: 'var(--bg)' }}>
        {children}
      </div>
    </div>
  )
}