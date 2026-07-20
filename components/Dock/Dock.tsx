'use client'

import { Fragment } from 'react'
import DockItem from './DockItem'
import { desktopItems } from '@/data/desktopItems'
import { useWindows } from '@/context/WindowContext'

export default function Dock() {
  const { openWindow, windows } = useWindows()

  return (
    <section className="fixed left-0 bottom-0 z-50 w-full h-[5.2rem] p-[0.4rem] flex justify-center pointer-events-none">
      <div
        className="relative h-full flex items-end p-[0.3rem] rounded-[1.2rem] pointer-events-auto"
        style={{
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow:
            'inset 0 0 0 0.2px rgba(255,255,255,0.5), 0 0 0 0.2px rgba(0,0,0,0.6), 2px 5px 19px 7px rgba(0,0,0,0.3)',
        }}
      >
        {desktopItems.map((item) => {
          const w = windows.find((win) => win.id === item.id)
          return (
            <Fragment key={item.id}>
              {item.dockBreakBefore && (
                <div
                  aria-hidden="true"
                  className="h-full w-px mx-1 self-stretch"
                  style={{ background: 'rgba(255,255,255,0.25)' }}
                />
              )}
              <DockItem
                label={item.label}
                onClick={() => openWindow(item.id)}
                isActive={w?.isOpen === true && w?.isMinimized === false}
              >
                {item.dockIcon}
              </DockItem>
            </Fragment>
          )
        })}

        {/* Divider before Trash */}
        <div
          aria-hidden="true"
          className="h-full w-px mx-1 self-stretch"
          style={{ background: 'rgba(255,255,255,0.25)' }}
        />

        {/* Trash */}
        <DockItem label="Trash">
          <span className="text-3xl">🗑️</span>
        </DockItem>
      </div>
    </section>
  )
}