export default function About() {
  return (
    <div
      className="w-full h-full p-8 font-mono text-sm leading-relaxed overflow-auto"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      <pre className="whitespace-pre-wrap">
{`about.txt
─────────────────────────────────────────

Hey there.

I'm a self-taught frontend developer based in Morocco,
open to remote work and relocation abroad.

I started learning to code in February 2026.
Everything you see here was built in that time.

I work with React, Next.js, TypeScript, and Tailwind CSS.
I use AI as part of my workflow — not as a crutch, but as
a tool to move faster and think bigger. The quality of the
output is still entirely mine to own.

My projects speak louder than any resume line.
Open Deuka to see what I mean.

─────────────────────────────────────────

Stack        →  React, Next.js, TypeScript, Tailwind CSS v4
Currently    →  Building in public, learning every day
Available    →  Remote / Relocation abroad
Contact      →  See Contact file on the desktop

─────────────────────────────────────────

"Started from zero. Still going."
`}
      </pre>
    </div>
  )
}