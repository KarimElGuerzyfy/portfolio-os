'use client'

import { useState, useEffect } from 'react'

export default function Clock() {
  const [now, setNow] = useState<string>('')

  useEffect(() => {
    function update() {
      const d = new Date()
      const date = d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
      })
      const time = d.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
      setNow(`${date}  ${time}`)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className="tabular-nums px-1 cursor-default text-[14px] font-medium tracking-[0.3px]"
      style={{
        color: '#fff',
        textShadow: '0 0 1px rgba(0,0,0,0.1)',
      }}
    >
      {now}
    </span>
  )
}