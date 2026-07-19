import type { ReactNode } from 'react'

export type WindowId =
  | 'deuka'
  | 'ledger'
  | 'cv'
  | 'about'
  | 'skills'
  | 'buildlog'
  | 'contact'

export type WindowVariant = 'browser' | 'notepad' | 'pdf' | 'email'

export interface DesktopItem {
  id: WindowId
  label: string
  variant: WindowVariant
  dockIcon: ReactNode
  desktopIcon: ReactNode
  dockBreakBefore?: boolean
}

export const desktopItems: DesktopItem[] = [
  {
    id: 'deuka',
    label: 'Deuka',
    variant: 'browser',
    dockIcon: <span className="text-2xl">🌦</span>,
    desktopIcon: <span className="text-3xl">🌦</span>,
  },
  {
    id: 'ledger',
    label: 'Ledger',
    variant: 'browser',
    dockIcon: <span className="text-2xl">📒</span>,
    desktopIcon: <span className="text-3xl">📒</span>,
  },
  {
    id: 'cv',
    label: 'CV.pdf',
    variant: 'pdf',
    dockBreakBefore: true,
    dockIcon: (
      <div className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
        style={{ background: '#d4622a', color: '#fff' }}>
        CV
      </div>
    ),
    desktopIcon: (
      <div className="w-10 h-10 rounded flex items-center justify-center text-sm font-bold"
        style={{ background: '#d4622a', color: '#fff' }}>
        CV
      </div>
    ),
  },
  {
    id: 'about',
    label: 'about.txt',
    variant: 'notepad',
    dockIcon: <span className="text-2xl">📄</span>,
    desktopIcon: <span className="text-3xl">📄</span>,
  },
  {
    id: 'skills',
    label: 'Skills.json',
    variant: 'notepad',
    dockIcon: <span className="text-2xl">⚙️</span>,
    desktopIcon: <span className="text-3xl">⚙️</span>,
  },
  {
    id: 'buildlog',
    label: 'build-log.md',
    variant: 'notepad',
    dockIcon: <span className="text-2xl">📝</span>,
    desktopIcon: <span className="text-3xl">📝</span>,
  },
  {
    id: 'contact',
    label: 'Contact',
    variant: 'email',
    dockIcon: <span className="text-2xl">✉️</span>,
    desktopIcon: <span className="text-3xl">✉️</span>,
  },
]