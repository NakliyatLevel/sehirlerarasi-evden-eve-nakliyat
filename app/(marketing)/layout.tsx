import Header from '@/components/marketing/Header'
import Footer from '@/components/marketing/Footer'
import { WhatsAppButton } from '@/components/marketing/WhatsAppButton'
import { MobileBottomBar } from '@/components/marketing/MobileBottomBar'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <WhatsAppButton />
      <MobileBottomBar />
    </div>
  )
}
