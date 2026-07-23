'use client'

import { createContext, useContext, useReducer, useCallback } from 'react'
import { desktopItems } from '@/data/desktopItems'
import type { WindowId, WindowVariant } from '@/data/desktopItems'

export interface WindowState {
  id: WindowId
  title: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
  savedPosition: { x: number; y: number } | null
}

type ReducerState = {
  windows: WindowState[]
  topZ: number
}

type WindowAction =
  | { type: 'OPEN_WINDOW'; id: WindowId; position: { x: number; y: number }; size: { width: number; height: number } }
  | { type: 'CLOSE_WINDOW'; id: WindowId }
  | { type: 'MINIMIZE_WINDOW'; id: WindowId }
  | { type: 'FOCUS_WINDOW'; id: WindowId }
  | { type: 'MOVE_WINDOW'; id: WindowId; position: { x: number; y: number } }
  | { type: 'RESIZE_WINDOW'; id: WindowId; size: { width: number; height: number } }
  | { type: 'MAXIMIZE_WINDOW'; id: WindowId }
  | { type: 'RESTORE_WINDOW'; id: WindowId }

interface WindowContextValue {
  windows: WindowState[]
  openWindow: (id: WindowId) => void
  closeWindow: (id: WindowId) => void
  minimizeWindow: (id: WindowId) => void
  focusWindow: (id: WindowId) => void
  moveWindow: (id: WindowId, position: { x: number; y: number }) => void
  resizeWindow: (id: WindowId, size: { width: number; height: number }) => void
  maximizeWindow: (id: WindowId) => void
  restoreWindow: (id: WindowId) => void
  getWindow: (id: WindowId) => WindowState | undefined
}

export const SIZES: Record<WindowVariant, { width: number; height: number }> = {
  browser: { width: 1200, height: 775 },
  notepad: { width: 700,  height: 550 },
  pdf:     { width: 650,  height: 850 },
  email:   { width: 725,  height: 525 },
}

const ID_SIZES: Partial<Record<WindowId, { width: number; height: number }>> = {
  buildlog: { width: 1000, height: 858 },
  cv:       { width: 650,  height: 850 },
}

const initialState: ReducerState = {
  topZ: 20,
  windows: desktopItems.map((item) => ({
    id: item.id,
    title: item.label,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 0, y: 0 },
    size: SIZES[item.variant],
    savedPosition: null,
  })),
}

function reducer(state: ReducerState, action: WindowAction): ReducerState {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      const topZ = state.topZ + 1
      return {
        topZ,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? { ...w, isOpen: true, isMinimized: false, isMaximized: false, zIndex: topZ, position: action.position, size: action.size, savedPosition: null }
            : w
        ),
      }
    }
    case 'CLOSE_WINDOW':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, isOpen: false, isMinimized: false, isMaximized: false } : w
        ),
      }
    case 'MINIMIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, isMinimized: true } : w
        ),
      }
    case 'FOCUS_WINDOW': {
      const topZ = state.topZ + 1
      return {
        topZ,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, isMinimized: false, zIndex: topZ } : w
        ),
      }
    }
    case 'MOVE_WINDOW':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, position: action.position } : w
        ),
      }
    case 'RESIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, size: action.size } : w
        ),
      }
    case 'MAXIMIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? { ...w, isMaximized: true, savedPosition: w.position }
            : w
        ),
      }
    case 'RESTORE_WINDOW':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? { ...w, isMaximized: false, position: w.savedPosition ?? w.position, savedPosition: null }
            : w
        ),
      }
    default:
      return state
  }
}

const WindowContext = createContext<WindowContextValue | null>(null)

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openWindow = useCallback((id: WindowId) => {
    const item = desktopItems.find((d) => d.id === id)
    const variant = item?.variant ?? 'notepad'

    const menuBarHeight = 28
    const dockHeight = 80
    const availableWidth = window.innerWidth
    const availableHeight = window.innerHeight - menuBarHeight - dockHeight

    const desiredSize = ID_SIZES[id] ?? SIZES[variant]
    const width = Math.min(desiredSize.width, availableWidth - 40)
    const height = Math.min(desiredSize.height, availableHeight - 40)

    const desiredX = Math.max(80, (availableWidth - width) / 2)
    const desiredY = Math.max(menuBarHeight, menuBarHeight + (availableHeight - height) / 2)

    const x = Math.max(0, Math.min(desiredX, availableWidth - width))
    const y = Math.max(menuBarHeight, Math.min(desiredY, menuBarHeight + availableHeight - height))

    dispatch({ type: 'OPEN_WINDOW', id, position: { x, y }, size: { width, height } })
  }, [])

  const closeWindow = useCallback((id: WindowId) =>
    dispatch({ type: 'CLOSE_WINDOW', id }), [])

  const minimizeWindow = useCallback((id: WindowId) =>
    dispatch({ type: 'MINIMIZE_WINDOW', id }), [])

  const focusWindow = useCallback((id: WindowId) =>
    dispatch({ type: 'FOCUS_WINDOW', id }), [])

  const moveWindow = useCallback((id: WindowId, position: { x: number; y: number }) =>
    dispatch({ type: 'MOVE_WINDOW', id, position }), [])

  const resizeWindow = useCallback((id: WindowId, size: { width: number; height: number }) =>
    dispatch({ type: 'RESIZE_WINDOW', id, size }), [])

  const maximizeWindow = useCallback((id: WindowId) => {
    const w = state.windows.find((w) => w.id === id)
    if (!w) return
    dispatch({ type: w.isMaximized ? 'RESTORE_WINDOW' : 'MAXIMIZE_WINDOW', id })
  }, [state.windows])

  const restoreWindow = useCallback((id: WindowId) =>
    dispatch({ type: 'RESTORE_WINDOW', id }), [])

  const getWindow = useCallback((id: WindowId) =>
    state.windows.find((w) => w.id === id), [state.windows])

  return (
    <WindowContext.Provider value={{
      windows: state.windows,
      openWindow,
      closeWindow,
      minimizeWindow,
      focusWindow,
      moveWindow,
      resizeWindow,
      maximizeWindow,
      restoreWindow,
      getWindow,
    }}>
      {children}
    </WindowContext.Provider>
  )
}

export function useWindows() {
  const ctx = useContext(WindowContext)
  if (!ctx) throw new Error('useWindows must be used inside WindowProvider')
  return ctx
}