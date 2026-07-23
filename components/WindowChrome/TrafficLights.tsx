'use client'

import { X, Minus, Expand } from 'lucide-react'
import { useWindows } from '@/context/WindowContext'
import type { WindowId } from '@/data/desktopItems'

type TrafficLightsProps = {
  id: WindowId
  isActive: boolean
}

const ICON_STYLE = {
  color: 'rgba(0,0,0,0.6)',
  pointerEvents: 'none' as const,
}

const ACTIVE_SHADOW = 'inset 0 0.5px 1px rgba(255,255,255,0.4), inset 0 -0.5px 1px rgba(0,0,0,0.2)'

// Whole cluster scales together on hover (your intended behavior)
// before:-inset-1.5 grows the tappable area ~6px past each 15px circle
// without touching the rendered size — the circles themselves stay 15px.
const BUTTON_BASE = `
  relative flex items-center justify-center rounded-full w-[15px] h-[15px]
  transition-transform duration-150 ease-out group-hover/lights:scale-[1.18]
  hover:brightness-90 active:brightness-75
  before:content-[''] before:absolute before:-inset-1.5
`.trim()

const ICON_CLS = 'opacity-0 group-hover/lights:opacity-100 transition-opacity duration-100'

export default function TrafficLights({ id, isActive }: TrafficLightsProps) {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindows()

  return (
    <div
      // "no-drag" matches the `cancel` selector passed to <Draggable> in
      // Panel.tsx. react-draggable checks it via DOM ancestor traversal
      // inside its own drag-start handler, before it calls preventDefault()
      // — so unlike a stopPropagation-based guard, it isn't subject to
      // event-listener ordering and reliably blocks drag-start for touch too.
      className="no-drag flex items-center gap-2 group/lights select-none cursor-default"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <button
        aria-label="Close"
        onClick={() => closeWindow(id)}
        className={BUTTON_BASE}
        style={{
          background: isActive ? '#ff5f57' : 'rgba(255,255,255,0.18)',
          boxShadow: isActive ? ACTIVE_SHADOW : 'none',
        }}
      >
        <X size={11} strokeWidth={3.5} className={ICON_CLS} style={ICON_STYLE} />
      </button>

      <button
        aria-label="Minimize"
        onClick={() => minimizeWindow(id)}
        className={BUTTON_BASE}
        style={{
          background: isActive ? '#febc2e' : 'rgba(255,255,255,0.18)',
          boxShadow: isActive ? ACTIVE_SHADOW : 'none',
        }}
      >
        <Minus size={11} strokeWidth={3.5} className={ICON_CLS} style={ICON_STYLE} />
      </button>

      <button
        aria-label="Maximize"
        onClick={() => maximizeWindow(id)}
        className={BUTTON_BASE}
        style={{
          background: isActive ? '#28c840' : 'rgba(255,255,255,0.18)',
          boxShadow: isActive ? ACTIVE_SHADOW : 'none',
        }}
      >
        <Expand size={10} strokeWidth={3.5} className={ICON_CLS} style={ICON_STYLE} />
      </button>
    </div>
  )
}