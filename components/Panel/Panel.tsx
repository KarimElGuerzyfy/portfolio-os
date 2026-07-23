'use client'

import { useRef, useState, useEffect } from 'react'
import Draggable from 'react-draggable'
import { Resizable } from 're-resizable'
import { motion, AnimatePresence } from 'framer-motion'
import AppChrome from '@/components/WindowChrome/AppChrome'
import SafariChrome from '@/components/WindowChrome/SafariChrome'
import ResumeChrome from '@/components/WindowChrome/ResumeChrome'
import AboutChrome from '@/components/WindowChrome/AboutChrome'
import DocChrome from '@/components/WindowChrome/DocChrome'
import MailChrome from '@/components/WindowChrome/MailChrome'
import { useWindows } from '@/context/WindowContext'
import { desktopItems } from '@/data/desktopItems'
import type { WindowState } from '@/context/WindowContext'
import type { WindowId } from '@/data/desktopItems'

type PanelProps = {
  window: WindowState
  children: React.ReactNode
}

const BROWSER_URLS: Partial<Record<WindowId, string>> = {
  deuka:  'deuka.app',
  ledger: 'ledger.app',
}

const MENU_BAR_HEIGHT = 28
const DOCK_HEIGHT = 80

export default function Panel({ window: w, children }: PanelProps) {
  const { focusWindow, moveWindow, resizeWindow, restoreWindow, windows } = useWindows()
  const nodeRef = useRef<HTMLDivElement>(null)
  const resizeStartPos = useRef({ x: 0, y: 0 })

  // SSR-safe screen measurement for maximized size
  const [screenSize, setScreenSize] = useState({ width: 1280, height: 800 })
  useEffect(() => {
    const measure = () =>
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight - MENU_BAR_HEIGHT - DOCK_HEIGHT,
      })
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const item = desktopItems.find((d) => d.id === w.id)
  const variant = item?.variant ?? 'notepad'

  const maxZ = Math.max(...windows.map((win) => win.zIndex), 0)
  const isActive = w.zIndex === maxZ

  const currentSize = w.isMaximized
    ? { width: screenSize.width, height: screenSize.height }
    : w.size

  const currentPosition = w.isMaximized
    ? { x: 0, y: MENU_BAR_HEIGHT }
    : w.position

  const renderChrome = () => {
    const common = { id: w.id, isActive, onMouseDown: () => focusWindow(w.id) }
    if (w.id === 'deuka')
      return <AppChrome {...common} title="Deuka">{children}</AppChrome>
    if (variant === 'browser')
      return <SafariChrome {...common} url={BROWSER_URLS[w.id] ?? 'localhost'}>{children}</SafariChrome>
    if (variant === 'pdf')
      return <ResumeChrome {...common} title={w.title}>{children}</ResumeChrome>
    if (w.id === 'about')
      return <AboutChrome {...common} title="About the Developer">{children}</AboutChrome>
    if (w.id === 'buildlog')
      return <DocChrome {...common} />
    return <MailChrome {...common}>{children}</MailChrome>
  }

  return (
    <AnimatePresence>
      {w.isOpen && !w.isMinimized && (
        <Draggable
          nodeRef={nodeRef as React.RefObject<HTMLElement>}
          handle=".window-titlebar"
          cancel=".no-drag"
          position={currentPosition}
          onStart={() => {
            focusWindow(w.id)
            if (w.isMaximized) restoreWindow(w.id)
          }}
          onStop={(_e, data) => moveWindow(w.id, { x: data.x, y: data.y })}
        >
          <div
            ref={nodeRef}
            className="fixed top-0 left-0"
            style={{ zIndex: w.zIndex }}
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
                enable={w.isMaximized ? false : {
                  top: true, right: true, bottom: true, left: true,
                  topRight: true, bottomRight: true, bottomLeft: true, topLeft: true,
                }}
                onResizeStart={() => {
                  focusWindow(w.id)
                  resizeStartPos.current = { x: w.position.x, y: w.position.y }
                }}
                onResize={(_e, direction, _ref, delta) => {
                  const movesLeft = direction.toLowerCase().includes('left')
                  const movesTop = direction.toLowerCase().includes('top')
                  if (movesLeft || movesTop) {
                    const base = resizeStartPos.current
                    const newX = movesLeft ? base.x - delta.width : base.x
                    const newY = movesTop ? base.y - delta.height : base.y
                    moveWindow(w.id, { x: newX, y: newY })
                  }
                }}
                onResizeStop={(_e, _direction, ref) => {
                  resizeWindow(w.id, { width: ref.offsetWidth, height: ref.offsetHeight })
                }}
              >
                {renderChrome()}
              </Resizable>
            </motion.div>
          </div>
        </Draggable>
      )}
    </AnimatePresence>
  )
}