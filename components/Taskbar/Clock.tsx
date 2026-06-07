'use client'

import { useState, useEffect } from 'react'

export default function Clock() {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    function update() {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className="text-xs tabular-nums cursor-default"
      style={{ color: 'var(--text)' }}
    >
      {time}
    </span>
  )
}