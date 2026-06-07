import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { WindowProvider } from '@/context/WindowContext'
import MenuBar from '@/components/Taskbar/MenuBar'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

export const metadata: Metadata = {
  title: 'Portfolio OS',
  description: 'Karim El Guerzyfy — Frontend Developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="h-full overflow-hidden">
        <WindowProvider>
          <MenuBar />
          {children}
        </WindowProvider>
      </body>
    </html>
  )
}