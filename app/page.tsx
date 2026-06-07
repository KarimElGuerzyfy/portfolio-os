import Desktop from '@/components/Desktop/Desktop'
import Dock from '@/components/Dock/Dock'
import PanelManager from '@/components/Panel/PanelManager'

export default function Home() {
  return (
    <main className="fixed inset-0">
      <Desktop />
      <PanelManager />
      <Dock />
    </main>
  )
}