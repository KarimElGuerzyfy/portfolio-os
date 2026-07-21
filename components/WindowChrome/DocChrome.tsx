'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import TrafficLights from './TrafficLights'
import { caseStudies } from '@/data/caseStudies'
import type { WindowId } from '@/data/desktopItems'

const BuildLog = dynamic(() => import('@/components/Apps/BuildLog'))

type DocChromeProps = {
  id: WindowId
  isActive: boolean
  onMouseDown?: () => void
}

const GROUPS: { key: 'projects' | 'meta'; label: string }[] = [
  { key: 'projects', label: 'PROJECTS' },
  { key: 'meta', label: 'META' },
]

export default function DocChrome({ id, isActive, onMouseDown }: DocChromeProps) {
  const [selectedId, setSelectedId] = useState(caseStudies[0].id)
  const selected = caseStudies.find((c) => c.id === selectedId) ?? caseStudies[0]

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
          Build Log
        </span>

        <div style={{ width: '52px' }} />
      </div>

      {/* Body: sidebar + content */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside
          className="w-48 shrink-0 h-full p-3 flex flex-col gap-1 border-r border-border overflow-hidden"
          style={{ background: 'rgba(0,0,0,0.25)' }}
        >
          {GROUPS.map(({ key, label }) => {
            const items = caseStudies.filter((c) => c.group === key)
            if (items.length === 0) return null
            return (
              <div key={key} className="flex flex-col gap-0.5">
                <p className="px-2 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-wider text-text-dim">
                  {label}
                </p>
                {items.map((item) => {
                  const isSelected = item.id === selectedId
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm truncate transition-colors hover:bg-white/5 cursor-pointer text-text"
                      style={{ background: isSelected ? 'var(--accent)' : 'transparent' }}
                    >
                      <Icon size={16} className={isSelected ? 'text-text' : 'text-text-dim'} />
                      {item.label}
                    </button>
                  )
                })}
              </div>
            )
          })}
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0 h-full overflow-y-auto">
          <BuildLog selected={selected} />
        </div>
      </div>
    </div>
  )
}
