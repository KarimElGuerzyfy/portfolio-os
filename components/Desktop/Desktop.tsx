import IconGrid from './IconGrid'

export default function Desktop() {
  return (
    <div
      className="fixed inset-0 pt-7"
      style={{
        backgroundImage: "url('/wallpaper.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Left icon column */}
      <div className="absolute left-0 top-0 bottom-0 w-24 flex flex-col">
        <IconGrid />
      </div>
    </div>
  )
}