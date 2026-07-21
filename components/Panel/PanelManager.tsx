'use client'

import dynamic from 'next/dynamic'
import { useWindows } from '@/context/WindowContext'
import Panel from './Panel'
import type { WindowId } from '@/data/desktopItems'

// buildlog is rendered entirely by DocChrome (it owns sidebar selection + BuildLog itself),
// so it's intentionally excluded here — Panel's children are unused for that window.
const appMap: Partial<Record<WindowId, React.ComponentType>> = {
  deuka:   dynamic(() => import('@/components/Apps/Deuka')),
  ledger:  dynamic(() => import('@/components/Apps/Ledger')),
  cv:      dynamic(() => import('@/components/Apps/CV')),
  about:   dynamic(() => import('@/components/Apps/About')),
  contact: dynamic(() => import('@/components/Apps/Contact')),
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
              {AppComponent ? <AppComponent /> : null}
            </Panel>
          )
        })}
    </>
  )
}