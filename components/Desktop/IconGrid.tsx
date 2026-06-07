'use client'

import Icon from './Icon'
import { desktopItems } from '@/data/desktopItems'
import { useWindows } from '@/context/WindowContext'

export default function IconGrid() {
  const { openWindow } = useWindows()

  return (
    <div className="flex flex-col items-start gap-2 p-4 pt-10">
      {desktopItems.map((item) => (
        <Icon
          key={item.id}
          label={item.label}
          onDoubleClick={() => openWindow(item.id)}
        >
          {item.desktopIcon}
        </Icon>
      ))}
    </div>
  )
}