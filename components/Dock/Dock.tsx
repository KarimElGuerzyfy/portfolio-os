'use client'

import { useMotionValue } from 'framer-motion'
import DockItem from './DockItem'
import { desktopItems } from '@/data/desktopItems'
import { useWindows } from '@/context/WindowContext'

export default function Dock() {
  const { openWindow, windows } = useWindows()
  const mouseX = useMotionValue(Infinity)

  return (
    <div
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-end gap-2 px-3 py-2 rounded-2xl"
      style={{
        background: 'var(--dock-bg)',
        backdropFilter: 'var(--blur-dock)',
        WebkitBackdropFilter: 'var(--blur-dock)',
        border: '1px solid var(--dock-border)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {desktopItems.map((item) => {
        const w = windows.find((w) => w.id === item.id)
        return (
          <DockItem
            key={item.id}
            label={item.label}
            onClick={() => openWindow(item.id)}
            isActive={w?.isOpen === true && w?.isMinimized === false}
            mouseX={mouseX}
          >
            {item.dockIcon}
          </DockItem>
        )
      })}

      {/* Separator */}
      <div
        className="w-px mx-1 self-stretch"
        style={{ background: 'var(--border-high)' }}
      />

      {/* Recycle bin */}
      <DockItem label="Trash" mouseX={mouseX}>
        <span className="text-3xl">🗑️</span>
      </DockItem>
    </div>
  )
}