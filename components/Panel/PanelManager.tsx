'use client'

import dynamic from 'next/dynamic'
import { useWindows } from '@/context/WindowContext'
import Panel from './Panel'
import type { WindowId } from '@/data/desktopItems'

const appMap: Record<WindowId, React.ComponentType> = {
  deuka:    dynamic(() => import('@/components/Apps/Deuka')),
  ledger:   dynamic(() => import('@/components/Apps/Ledger')),
  cv:       dynamic(() => import('@/components/Apps/CV')),
  about:    dynamic(() => import('@/components/Apps/About')),
  skills:   dynamic(() => import('@/components/Apps/Skills')),
  buildlog: dynamic(() => import('@/components/Apps/BuildLog')),
  contact:  dynamic(() => import('@/components/Apps/Contact')),
}

export default function PanelManager() {
  const { windows } = useWindows()

  return (
    <>
      {windows
        .filter((w) => w.isOpen)
        .map((w) => {
          const AppComponent = appMap[w.id]
          return (
            <Panel key={w.id} window={w}>
              <AppComponent />
            </Panel>
          )
        })}
    </>
  )
}