'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

export type Wallpaper = {
  id: string
  label: string
  src: string
}

export const WALLPAPERS: Wallpaper[] = [
  { id: 'lake',   label: 'The Lake',   src: '/wallpapers/lake.jpg' },
  { id: 'beach',  label: 'The Beach',  src: '/wallpapers/beach.jpg' },
  { id: 'cliffs', label: 'The Cliffs', src: '/wallpapers/cliffs.jpg' },
  { id: 'desert', label: 'The Desert', src: '/wallpapers/desert.jpg' },
]

export type AccentColor = {
  id: string
  label: string
  value: string
}

export const ACCENTS: AccentColor[] = [
  { id: 'orange', label: 'Orange', value: '#d4622a' },
  { id: 'blue',   label: 'Blue',   value: '#2a7fd4' },
  { id: 'green',  label: 'Green',  value: '#2ea043' },
  { id: 'purple', label: 'Purple', value: '#8b5cf6' },
  { id: 'pink',   label: 'Pink',   value: '#e0568a' },
  { id: 'red',    label: 'Red',    value: '#d43b2a' },
  { id: 'gray',   label: 'Graphite', value: '#7d7d85' },
]

interface SettingsContextValue {
  wallpaper: Wallpaper
  setWallpaper: (id: string) => void
  accent: AccentColor
  setAccent: (id: string) => void
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [wallpaper, setWallpaperState] = useState<Wallpaper>(WALLPAPERS[0])
  const [accent, setAccentState] = useState<AccentColor>(ACCENTS[0])

  // Apply accent to the CSS variable so every component using var(--accent) updates
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent.value)
  }, [accent])

  const setWallpaper = useCallback((id: string) => {
    const found = WALLPAPERS.find((w) => w.id === id)
    if (found) setWallpaperState(found)
  }, [])

  const setAccent = useCallback((id: string) => {
    const found = ACCENTS.find((a) => a.id === id)
    if (found) setAccentState(found)
  }, [])

  return (
    <SettingsContext.Provider value={{ wallpaper, setWallpaper, accent, setAccent }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider')
  return ctx
}