'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { useSettings, WALLPAPERS, ACCENTS } from '@/context/SettingsContext'

export default function ActionCenter() {
  const { wallpaper, setWallpaper, accent, setAccent } = useSettings()

  return (
    <section
      className="w-72 p-3 rounded-xl select-none flex flex-col gap-3"
      style={{
        background: 'rgba(40,40,50,0.55)',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        boxShadow:
          '0 0 16px rgba(0,0,0,0.4), inset 0 0 0 0.9px rgba(255,255,255,0.08), 0 0 0 1px rgba(0,0,0,0.4)',
      }}
    >
      {/* System Color */}
      <div
        className="p-3 rounded-lg"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <p className="text-[13px] font-semibold mb-2.5" style={{ color: '#fff' }}>
          System Color
        </p>
        <div className="flex items-center justify-between">
          {ACCENTS.map((a) => {
            const isSelected = accent.id === a.id
            return (
              <button
                key={a.id}
                onClick={() => setAccent(a.id)}
                aria-label={a.label}
                className="w-6 h-6 rounded-full flex items-center justify-center cursor-default transition-transform duration-150 hover:scale-110"
                style={{ background: a.value }}
              >
                {isSelected && <Check size={13} strokeWidth={3.5} color="#fff" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Wallpaper */}
      <div
        className="p-3 rounded-lg"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <p className="text-[13px] font-semibold mb-2.5" style={{ color: '#fff' }}>
          Wallpaper
        </p>
        <div className="grid grid-cols-4 gap-2">
          {WALLPAPERS.map((w) => {
            const isSelected = wallpaper.id === w.id
            return (
              <button
                key={w.id}
                onClick={() => setWallpaper(w.id)}
                aria-label={w.label}
                className="relative aspect-video rounded-md overflow-hidden cursor-default transition-transform duration-150 hover:scale-105"
                style={{
                  outline: isSelected ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.12)',
                  outlineOffset: isSelected ? '1px' : '0',
                }}
              >
                <Image
                  src={w.src}
                  alt={w.label}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            )
          })}
        </div>
        <p className="text-[12px] mt-2.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {wallpaper.label}
        </p>
      </div>
    </section>
  )
}