import type { ReactNode } from 'react'
import Image from 'next/image'

export type WindowId =
  | 'deuka'
  | 'ledger'
  | 'cv'
  | 'about'
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
    dockIcon: (
      <div className="w-full h-full rounded-[22%] overflow-hidden scale-[0.83]">
        <Image src="/icons/deuka.png" alt="" width={114} height={114} priority className="w-full h-full object-cover" />
      </div>
    ),
    desktopIcon: (
      <div className="w-full h-full rounded-[22%] overflow-hidden scale-[0.83]">
        <Image src="/icons/deuka.png" alt="" width={114} height={114} priority className="w-full h-full object-cover" />
      </div>
    ),
  },
  {
    id: 'ledger',
    label: 'Ledger',
    variant: 'browser',
    dockIcon: (
      <div className="w-full h-full rounded-[22%] overflow-hidden scale-[0.83]">
        <Image src="/icons/ledger.svg" alt="" width={114} height={114} priority className="w-full h-full object-cover" />
      </div>
    ),
    desktopIcon: (
      <div className="w-full h-full rounded-[22%] overflow-hidden scale-[0.83]">
        <Image src="/icons/ledger.svg" alt="" width={114} height={114} priority className="w-full h-full object-cover" />
      </div>
    ),
  },
{
    id: 'cv',
    label: 'Resume',
    variant: 'pdf',
    dockBreakBefore: true,
    dockIcon: (
      <div className="w-full h-full scale-[0.83]">
        <Image src="/icons/resume.webp" alt="" width={114} height={114} priority className="w-full h-full" />
      </div>
    ),
    desktopIcon: (
      <div className="w-full h-full scale-[0.83]">
        <Image src="/icons/resume.webp" alt="" width={114} height={114} priority className="w-full h-full" />
      </div>
    ),
  },
  {
    id: 'about',
    label: 'About',
    variant: 'notepad',
    dockIcon: (
      <div className="w-full h-full rounded-[22%] overflow-hidden scale-[0.83]">
        <Image src="/icons/about.jpeg" alt="" width={114} height={114} priority className="w-full h-full object-cover" />
      </div>
    ),
    desktopIcon: (
      <div className="w-full h-full rounded-[22%] overflow-hidden scale-[0.83]">
        <Image src="/icons/about.jpeg" alt="" width={114} height={114} priority className="w-full h-full object-cover" />
      </div>
    ),
  },
  {
    id: 'buildlog',
    label: 'Case Studies',
    variant: 'notepad',
    dockIcon: <Image src="/icons/notes.png" alt="" width={114} height={114} priority className="w-full h-full" />,
    desktopIcon: <Image src="/icons/notes.png" alt="" width={114} height={114} priority className="w-full h-full" />,
  },
  {
    id: 'contact',
    label: 'Contact',
    variant: 'email',
    dockIcon: <Image src="/icons/mail.png" alt="" width={114} height={114} priority className="w-full h-full" />,
    desktopIcon: <Image src="/icons/mail.png" alt="" width={114} height={114} priority className="w-full h-full" />,
  },
]