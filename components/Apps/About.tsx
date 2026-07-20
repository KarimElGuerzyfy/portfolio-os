'use client'

import type { ComponentType } from 'react'
import { Mail, Globe } from 'lucide-react'
import { FaGithub, FaLinkedin, FaXing } from 'react-icons/fa6'

const SOCIALS = [
  { label: 'GitHub',   icon: FaGithub,   href: 'https://github.com/KarimElGuerzyfy' },
  { label: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/karim-el-guerzyfy-775120233/' },
  { label: 'Xing',     icon: FaXing,     href: 'https://www.xing.com/profile/Karim_ElGuerzyfy/web_profiles' },
  { label: 'Email',    icon: Mail,       href: 'mailto:karim.lguerzyfy@gmail.com' },
]

const PROJECTS = [
  { label: 'Deuka', icon: Globe, href: 'https://deuka.app' },
]

type IconComponent = ComponentType<{ size?: number; className?: string }>

function ExtLink({ icon: Icon, label, href }: { icon: IconComponent; label: string; href: string }) {
  const isMailto = href.startsWith('mailto:')
  return (
    <a
      href={href}
      {...(!isMailto && { target: '_blank', rel: 'noopener noreferrer' })}
      className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors hover:bg-white/5 cursor-pointer text-text"
    >
      <Icon size={16} className="text-text-dim" />
      {label}
    </a>
  )
}

export default function About() {
  return (
    <div className="flex w-full h-full">
      {/* Sidebar */}
      <aside
        className="w-48 shrink-0 h-full p-3 flex flex-col gap-1 border-r border-border overflow-y-auto"
        style={{ background: 'rgba(0,0,0,0.25)' }}
      >
        <p className="px-2 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-wider text-text-dim">
          Connect
        </p>
        {SOCIALS.map((s) => (
          <ExtLink key={s.label} {...s} />
        ))}

        <div className="my-2 border-t border-border" />

        <p className="px-2 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-wider text-text-dim">
          Projects
        </p>
        {PROJECTS.map((p) => (
          <ExtLink key={p.label} {...p} />
        ))}
      </aside>

      {/* Content */}
      <div className="flex-1 h-full overflow-y-auto px-10 py-10">
        <div className="max-w-md mx-auto">
          {/* Profile photo placeholder */}
          <div
            className="w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-semibold"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--text-dim)' }}
          >
            K
          </div>

          <h1 className="text-3xl font-semibold text-center text-text">Hi, I&apos;m Karim</h1>
          <p className="mt-3 text-lg text-center text-text-dim leading-snug">
            Self-taught frontend developer, building things for the web.
          </p>

          <div className="mt-8 space-y-4 text-sm leading-relaxed text-text-dim">
            <p>
              I started learning to code in February 2026, and everything you see in this
              portfolio was built in that time. I work with React, Next.js, TypeScript and
              Tailwind CSS.
            </p>
            <p>
              I use AI as part of my workflow — not as a crutch, but as a tool to move faster
              and build bigger. The quality of the output is still mine to own.
            </p>
            <p>
              I&apos;m based in Morocco and open to remote work and relocation abroad. My
              projects speak louder than any resume line — open Deuka to see what I mean.
            </p>
          </div>

          <p className="mt-10 text-center text-xs text-text-dim italic">
            Started from zero. Still going.
          </p>
        </div>
      </div>
    </div>
  )
}