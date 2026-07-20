'use client'

import { useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

type DockItemProps = {
  label: string
  children: React.ReactNode
  onClick?: () => void
  isActive?: boolean
}

const BASE_WIDTH = 57.6

export default function DockItem({ label, children, onClick, isActive }: DockItemProps) {
  const bounce = useAnimationControls()
  const [wasActive, setWasActive] = useState(false)

  async function handleClick() {
    // Bounce only when opening something that wasn't already open
    if (!isActive && !wasActive) {
      setWasActive(true)
      await bounce.start({ y: -20, transition: { duration: 0.3, ease: 'easeInOut' } })
      bounce.start({ y: 0, transition: { duration: 0.3, ease: 'easeInOut' } })
      setTimeout(() => setWasActive(false), 300)
    }
    onClick?.()
  }

  return (
    <div className="relative flex flex-col items-center justify-end group">
      {/* Tooltip */}
      <motion.div
        animate={bounce}
        className="absolute -top-9 px-3 py-2 rounded-md text-[14px] tracking-[0.4px] font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap"
        style={{
          background: 'rgba(40,40,50,0.55)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          color: '#fff',
          boxShadow:
            '0 1px 5px 2px rgba(0,0,0,0.3), inset 0 0 0 0.9px rgba(255,255,255,0.08), 0 0 0 1px rgba(0,0,0,0.4)',
        }}
      >
        {label}
      </motion.div>

      {/* Icon */}
      <motion.button
        animate={bounce}
        style={{ width: BASE_WIDTH, height: BASE_WIDTH }}
        onClick={handleClick}
        className="flex items-center justify-center rounded-xl cursor-default"
      >
        {children}
      </motion.button>

      {/* Active dot */}
      <div
        className="w-1 h-1 rounded-full mt-0.2 transition-opacity duration-200 shrink-0"
        style={{
          background: '#fff',
          opacity: isActive ? 1 : 0,
        }}
      />
    </div>
  )
}