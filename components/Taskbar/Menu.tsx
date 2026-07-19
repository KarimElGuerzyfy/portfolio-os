'use client'

import type { MenuItem } from '@/data/menuBarItems'

type MenuProps = {
  items: MenuItem[]
  onSelect: (item: MenuItem) => void
}

export default function Menu({ items, onSelect }: MenuProps) {
  return (
    <section
      className="block min-w-64 w-max p-2 rounded-lg select-none"
      style={{
        background: 'rgba(40,40,50,0.55)',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        boxShadow:
          '0 0 11px rgba(0,0,0,0.35), inset 0 0 0 0.9px rgba(255,255,255,0.06), 0 0 0 1px rgba(0,0,0,0.4)',
      }}
    >
      {items.map((item, i) => (
        <div key={`${item.label}-${i}`}>
          <button
            disabled={item.disabled}
            onClick={() => !item.disabled && onSelect(item)}
            className="flex justify-start w-full text-left px-1.5 py-1 my-0.5 rounded-[5px] text-[14px] font-normal tracking-[0.4px] transition-none disabled:cursor-default cursor-default"
            style={{
              color: item.disabled ? 'rgba(255,255,255,0.35)' : '#fff',
            }}
            onMouseEnter={(e) => {
              if (item.disabled) return
              e.currentTarget.style.background = 'var(--accent)'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.fontWeight = '500'
            }}
            onMouseLeave={(e) => {
              if (item.disabled) return
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.fontWeight = '400'
            }}
          >
            {item.label}
          </button>

          {item.breakAfter && (
            <div
              className="w-full my-0.5"
              style={{ height: '1px', background: 'rgba(255,255,255,0.12)' }}
            />
          )}
        </div>
      ))}
    </section>
  )
}