'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring, useAnimationControls } from 'framer-motion'

type DockItemProps = {
  label: string
  children: React.ReactNode
  onClick?: () => void
  isActive?: boolean
  mouseX: ReturnType<typeof useMotionValue<number>>
}

// Matching macOS dock magnification curve
const BASE_WIDTH = 57.6
const DISTANCE_LIMIT = BASE_WIDTH * 6 // 345.6

const DISTANCE_INPUT = [
  -DISTANCE_LIMIT,
  -DISTANCE_LIMIT / 1.25,
  -DISTANCE_LIMIT / 2,
  0,
  DISTANCE_LIMIT / 2,
  DISTANCE_LIMIT / 1.25,
  DISTANCE_LIMIT,
]

const WIDTH_OUTPUT = [
  BASE_WIDTH,
  BASE_WIDTH * 1.1,
  BASE_WIDTH * 1.414,
  BASE_WIDTH * 2,
  BASE_WIDTH * 1.414,
  BASE_WIDTH * 1.1,
  BASE_WIDTH,
]

export default function DockItem({ label, children, onClick, isActive, mouseX }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const bounce = useAnimationControls()
  const [wasActive, setWasActive] = useState(false)

  // Signed distance from cursor to icon center (not absolute — the curve is symmetric)
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return DISTANCE_LIMIT + 1
    const center = bounds.left + bounds.width / 2
    return val - center
  })

  const sizeRaw = useTransform(distance, DISTANCE_INPUT, WIDTH_OUTPUT)

  // His spring feel: damping 0.47, stiffness 0.12 (popmotion scale)
  const size = useSpring(sizeRaw, { stiffness: 200, damping: 18, mass: 0.6 })

  async function handleClick() {
    // Bounce only when opening something that wasn't already open
    if (!isActive && !wasActive) {
      setWasActive(true)
      await bounce.start({ y: -40, transition: { duration: 0.2, ease: 'easeInOut' } })
      bounce.start({ y: 0, transition: { duration: 0.2, ease: 'easeInOut' } })
      setTimeout(() => setWasActive(false), 400)
    }
    onClick?.()
  }

  return (
    <div className="relative flex flex-col items-center justify-end group" ref={ref}>
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
        style={{ width: size, height: size }}
        onClick={handleClick}
        className="flex items-center justify-center rounded-xl cursor-default"
        whileTap={{ scale: 0.92 }}
      >
        {children}
      </motion.button>

      {/* Active dot */}
      <div
        className="w-1 h-1 rounded-full mt-0.5 transition-opacity duration-200 shrink-0"
        style={{
          background: '#fff',
          opacity: isActive ? 1 : 0,
        }}
      />
    </div>
  )
}