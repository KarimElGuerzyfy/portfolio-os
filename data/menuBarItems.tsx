import type { WindowId } from './desktopItems'

export type MenuItem = {
  label: string
  disabled?: boolean
  breakAfter?: boolean
  /** Opens a window in the OS */
  opensWindow?: WindowId
  /** Opens an external URL in a new tab */
  href?: string
  /** Triggers a file download */
  downloads?: string
}

export type MenuConfig = {
  id: string
  title: string
  items: MenuItem[]
}

/**
 * Static menus. The "Window" menu is built dynamically in MenuBar
 * from live window state, so it isn't defined here.
 */
export const menuBarItems: MenuConfig[] = [
  {
    id: 'apple',
    title: '⌘',
    items: [
      { label: 'About This Developer', opensWindow: 'about', breakAfter: true },
      { label: 'Download CV', downloads: '/resume.pdf' },
      { label: 'View Résumé', opensWindow: 'cv', breakAfter: true },
      { label: 'Contact', opensWindow: 'contact' },
    ],
  },
  {
    id: 'projects',
    title: 'Projects',
    items: [
      { label: 'Deuka', opensWindow: 'deuka' },
      { label: 'Ledger', opensWindow: 'ledger', breakAfter: true },
      { label: 'Skills', opensWindow: 'skills' },
      { label: 'Build Log', opensWindow: 'buildlog' },
    ],
  },
  {
    id: 'help',
    title: 'Help',
    items: [
      { label: 'Getting Around', disabled: true },
      { label: 'Keyboard Shortcuts', disabled: true, breakAfter: true },
      { label: 'Source on GitHub', href: 'https://github.com/KarimElGuerzyfy/portfolio-os' },
    ],
  },
]