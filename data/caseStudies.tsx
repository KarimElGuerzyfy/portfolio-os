import type { ReactNode } from 'react'
import { BookOpen, Wallet, Globe, Braces, type LucideIcon } from 'lucide-react'

export type CaseStudy = {
  id: string
  label: string
  icon: LucideIcon
  group: 'projects' | 'meta'
  title: string
  subtitle: string
  tags: string[]
  sections: { heading: string; body: ReactNode }[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'deuka',
    label: 'Deuka',
    icon: BookOpen,
    group: 'projects',
    title: 'Deuka',
    subtitle: 'Language-learning PWA · deuka.app',
    tags: ['Next.js', 'Supabase', 'TypeScript'],
    sections: [
      {
        heading: 'The problem',
        body: <p>Placeholder — what gap Deuka fills and who it&apos;s for.</p>,
      },
      {
        heading: 'What I built',
        body: <p>Placeholder — the core features and how the app is structured.</p>,
      },
      {
        heading: 'What I learned',
        body: <p>Placeholder — the tricky parts and what would change next time.</p>,
      },
    ],
  },
  {
    id: 'ledger',
    label: 'Ledger',
    icon: Wallet,
    group: 'projects',
    title: 'Ledger',
    subtitle: 'Personal finance tracker · ledger.app',
    tags: ['Next.js', 'Supabase', 'TypeScript'],
    sections: [
      {
        heading: 'The problem',
        body: <p>Placeholder — what gap Ledger fills and who it&apos;s for.</p>,
      },
      {
        heading: 'What I built',
        body: <p>Placeholder — the core features and how the app is structured.</p>,
      },
      {
        heading: 'What I learned',
        body: <p>Placeholder — the tricky parts and what would change next time.</p>,
      },
    ],
  },
  {
    id: 'dentist',
    label: 'Dentist site',
    icon: Globe,
    group: 'projects',
    title: 'Dentist site',
    subtitle: 'Marketing site for a dental practice',
    tags: ['Next.js', 'TypeScript'],
    sections: [
      {
        heading: 'The problem',
        body: <p>Placeholder — what gap this site fills and who it&apos;s for.</p>,
      },
      {
        heading: 'What I built',
        body: <p>Placeholder — the core features and how the site is structured.</p>,
      },
      {
        heading: 'What I learned',
        body: <p>Placeholder — the tricky parts and what would change next time.</p>,
      },
    ],
  },
  {
    id: 'driss',
    label: 'Driss portfolio',
    icon: Globe,
    group: 'projects',
    title: 'Driss portfolio',
    subtitle: 'Portfolio site built for a client',
    tags: ['Next.js', 'TypeScript'],
    sections: [
      {
        heading: 'The problem',
        body: <p>Placeholder — what gap this portfolio fills and who it&apos;s for.</p>,
      },
      {
        heading: 'What I built',
        body: <p>Placeholder — the core features and how the site is structured.</p>,
      },
      {
        heading: 'What I learned',
        body: <p>Placeholder — the tricky parts and what would change next time.</p>,
      },
    ],
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: Braces,
    group: 'meta',
    title: 'Skills',
    subtitle: 'What I work with, and how',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    sections: [
      {
        heading: 'Overview',
        body: <p>Placeholder — a summary of tools, languages, and how Karim works.</p>,
      },
    ],
  },
]
