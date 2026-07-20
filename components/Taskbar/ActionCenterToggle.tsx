'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import ActionCenter from './ActionCenter'

export default function ActionCenterToggle() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  return (
    <div ref={ref} className="relative flex items-center h-full">
      <button
        aria-label="Control Center"
        onMouseDown={(e) => {
          e.stopPropagation()
          setOpen((o) => !o)
        }}
        className="relative z-[1] h-7 rounded cursor-default flex items-center"
      >
        <span
          aria-hidden
          className="absolute inset-0 -z-[1] rounded"
          style={{
            background: 'rgba(255,255,255,0.14)',
            transform: `scale(${open ? 1 : 0})`,
            transformOrigin: 'center center',
            transition: 'transform 100ms ease',
          }}
        />
        <Image
            src="/icons/actionbtn.svg"
            alt="Control Center"
            width={30}
            height={30}
            className="inline-block align-middle w-8 h-8"
        />
      </button>

      <div
        className="absolute right-0 top-full mt-[1.5px] z-50"
        style={{ visibility: open ? 'visible' : 'hidden' }}
      >
        <ActionCenter />
      </div>
    </div>
  )
}