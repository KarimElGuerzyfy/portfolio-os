'use client'

import IconGrid from './IconGrid'
import { useSettings } from '@/context/SettingsContext'

export default function Desktop() {
  const { wallpaper } = useSettings()

  return (
    <div
      className="fixed inset-0 pt-7"
      style={{
        backgroundImage: `url('${wallpaper.src}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.3s ease',
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-24 flex flex-col">
        <IconGrid />
      </div>
    </div>
  )
}