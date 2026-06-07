type IconProps = {
  label: string
  children: React.ReactNode
  onDoubleClick?: () => void
}

export default function Icon({ label, children, onDoubleClick }: IconProps) {
  return (
    <button
      onDoubleClick={onDoubleClick}
      onClick={(e) => e.detail === 2 && onDoubleClick?.()}
      className="flex flex-col items-center gap-1.5 p-2 rounded-lg cursor-default select-none group w-20 transition-all duration-150"
      style={{ background: 'transparent' }}
      onFocus={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
      onBlur={(e) => e.currentTarget.style.background = 'transparent'}
    >
      <div className="w-12 h-12 flex items-center justify-center transition-transform duration-150 group-hover:scale-110">
        {children}
      </div>
      <span
        className="text-xs text-center leading-tight px-1 py-0.5 rounded max-w-full truncate w-full"
        style={{
          color: 'var(--text)',
          textShadow: '0 1px 3px rgba(0,0,0,0.8)',
        }}
      >
        {label}
      </span>
    </button>
  )
}