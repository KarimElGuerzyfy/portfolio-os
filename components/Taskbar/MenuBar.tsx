'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Clock from './Clock'
import Menu from './Menu'
import { menuBarItems } from '@/data/menuBarItems'
import type { MenuItem, MenuConfig } from '@/data/menuBarItems'
import { useWindows } from '@/context/WindowContext'
import ActionCenterToggle from './ActionCenterToggle'

export default function MenuBar() {
  const { windows, openWindow, focusWindow } = useWindows()
  const [active, setActive] = useState<string>('')
  const containerRef = useRef<HTMLDivElement>(null)

  // Close menus on outside click
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActive('')
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  // Build the Window menu from live window state
  const openWindows = windows.filter((w) => w.isOpen)
  const windowMenu: MenuConfig = {
    id: 'window',
    title: 'Window',
    items: openWindows.length
      ? openWindows.map((w) => ({ label: w.title, opensWindow: w.id }))
      : [{ label: 'No Open Windows', disabled: true }],
  }

  // Insert Window menu before Help
  const menus: MenuConfig[] = [
    ...menuBarItems.slice(0, 2),
    windowMenu,
    ...menuBarItems.slice(2),
  ]

  function handleSelect(item: MenuItem) {
    setActive('')

    if (item.downloads) {
      const a = document.createElement('a')
      a.href = item.downloads
      a.download = 'Karim-El-Guerzyfy-CV.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      return
    }

    if (item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer')
      return
    }

    if (item.opensWindow) {
      const existing = windows.find((w) => w.id === item.opensWindow)
      if (existing?.isOpen) focusWindow(item.opensWindow)
      else openWindow(item.opensWindow)
    }
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-8 flex items-center px-2 select-none"
      style={{
        background: 'rgba(255,255,255,0.10)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Menus */}
      <div ref={containerRef} className="flex items-stretch h-full relative">
        {menus.map((menu) => {
          const isOpen = active === menu.id
          const isApple = menu.id === 'apple'
          return (
            <div key={menu.id} className="relative">
              <button
                onMouseDown={(e) => {
                  e.stopPropagation()
                  setActive(isOpen ? '' : menu.id)
                }}
                onMouseEnter={() => active && setActive(menu.id)}
                onFocus={() => setActive(menu.id)}
                className={`relative z-[1] h-7 px-2 rounded cursor-default tracking-[0.3px] text-[14px] ${
                  isApple ? 'font-semibold' : 'font-medium'
                }`}
                style={{
                  color: '#fff',
                  textShadow: '0 0 1px rgba(0,0,0,0.1)',
                }}
              >
                {/* Scale-in highlight */}
                <span
                  aria-hidden
                  className="absolute inset-0 -z-[1] rounded"
                  style={{
                    background: 'rgba(255,255,255,0.14)',
                    transform: `scale(${isOpen ? 1 : 0})`,
                    transformOrigin: 'center center',
                    transition: 'transform 100ms ease',
                  }}
                />

                {isApple ? (
                  <Image
                    src="/icons/Apple.svg"
                    alt="Apple menu"
                    width={16}
                    height={16}
                    className="inline-block align-middle"
                  />
                ) : (
                  menu.title
                )}
              </button>

              {/* Dropdown */}
              <div
                className="absolute left-0 top-full mt-[1.5px] z-50"
                style={{ visibility: isOpen ? 'visible' : 'hidden' }}
              >
                <Menu items={menu.items} onSelect={handleSelect} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Spacer */}
      <span className="flex-1" />

      {/* Right — control center + clock */}
      <ActionCenterToggle />
      <Clock />
    </div>
  )
}