'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

type DockItemProps = {
  label: string
  children: React.ReactNode
  onClick?: () => void
  isActive?: boolean
  mouseX: ReturnType<typeof useMotionValue<number>>
}

const ICON_SIZE = 48
const ICON_MAX = 72
const DISTANCE = 120

export default function DockItem({ label, children, onClick, isActive, mouseX }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return DISTANCE + 1
    const center = bounds.left + bounds.width / 2
    return Math.abs(val - center)
  })

  const sizeRaw = useTransform(
    distance,
    [0, DISTANCE],
    [ICON_MAX, ICON_SIZE]
  )

  const size = useSpring(sizeRaw, { stiffness: 300, damping: 25, mass: 0.5 })

  return (
    <div className="relative flex flex-col items-center group" ref={ref}>
      {/* Tooltip */}
      <div
        className="absolute -top-8 px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap"
        style={{
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          color: 'var(--text)',
          border: '1px solid var(--border)',
        }}
      >
        {label}
      </div>

      {/* Icon */}
      <motion.button
        style={{ width: size, height: size }}
        onClick={onClick}
        className="flex items-center justify-center rounded-xl cursor-default transition-colors duration-150"
        whileTap={{ scale: 0.9 }}
      >
        {children}
      </motion.button>

      {/* Active dot */}
      <div
        className="w-1 h-1 rounded-full mt-0.5 transition-opacity duration-200"
        style={{
          background: 'var(--text)',
          opacity: isActive ? 1 : 0,
        }}
      />
    </div>
  )
}