'use client'

import { useRef } from 'react'
import Draggable from 'react-draggable'
import { Resizable } from 're-resizable'
import { motion, AnimatePresence } from 'framer-motion'
import MacChrome from '@/components/WindowChrome/MacChrome'
import { useWindows } from '@/context/WindowContext'
import { desktopItems } from '@/data/desktopItems'
import type { WindowState } from '@/context/WindowContext'
import type { WindowVariant } from '@/data/desktopItems'

type PanelProps = {
  window: WindowState
  children: React.ReactNode
}

const DEFAULT_SIZES: Record<WindowVariant, { width: number; height: number }> = {
  browser: { width: 1200, height: 775 },
  notepad: { width: 700,  height: 550 },
  pdf:     { width: 650,  height: 850 },
  email:   { width: 725,  height: 525 },
}

const MENU_BAR_HEIGHT = 28
const DOCK_HEIGHT = 80

export default function Panel({ window: w, children }: PanelProps) {
  const { focusWindow, moveWindow, windows } = useWindows()
  const nodeRef = useRef<HTMLDivElement>(null)

  const item = desktopItems.find((d) => d.id === w.id)
  const variant = item?.variant ?? 'notepad'
  const defaultSize = DEFAULT_SIZES[variant]

  const maxZ = Math.max(...windows.map((win) => win.zIndex))
  const isActive = w.zIndex === maxZ

  const maximizedSize = {
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined'
      ? window.innerHeight - MENU_BAR_HEIGHT - DOCK_HEIGHT
      : 800,
  }

  const currentSize = w.isMaximized ? maximizedSize : defaultSize
  const currentPosition = w.isMaximized
    ? { x: 0, y: MENU_BAR_HEIGHT }
    : w.position

  return (
    <AnimatePresence>
      {w.isOpen && !w.isMinimized && (
        <Draggable
          nodeRef={nodeRef as React.RefObject<HTMLElement>}
          handle=".window-titlebar"
          disabled={w.isMaximized}
          position={currentPosition}
          onStart={() => focusWindow(w.id)}
          onStop={(_e, data) => moveWindow(w.id, { x: data.x, y: data.y })}
        >
          <div
            ref={nodeRef}
            style={{ position: 'fixed', zIndex: w.zIndex, top: 0, left: 0 }}
          >
            <motion.div
              key={w.id}
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <Resizable
                size={currentSize}
                minWidth={320}
                minHeight={240}
                enable={w.isMaximized ? {
                  top: false, right: false, bottom: false, left: false,
                  topRight: false, bottomRight: false, bottomLeft: false, topLeft: false,
                } : {
                  top: false, right: true, bottom: true, left: false,
                  topRight: false, bottomRight: true, bottomLeft: false, topLeft: false,
                }}
              >
                <MacChrome id={w.id} title={w.title} isActive={isActive} onMouseDown={() => focusWindow(w.id)}>
                  {children}
                </MacChrome>
              </Resizable>
            </motion.div>
          </div>
        </Draggable>
      )}
    </AnimatePresence>
  )
}