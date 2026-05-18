'use client'

import { useEffect, useState } from 'react'
import { Clock, Shield, MessageCircle } from 'lucide-react'

export default function TrustBar() {
  const [whatsapp, setWhatsapp] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data?.whatsapp) {
          setWhatsapp(data.whatsapp as string)
        }
      })
      .catch(() => {})
  }, [])

  const whatsappNumber = whatsapp?.toString().replace(/[^0-9]/g, '')
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}` : null

  return (
    <section className="hidden md:block bg-white border-y-2 border-primary/20 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <div>
              <div className="font-bold text-foreground">7/24 Hizmet</div>
              <div className="text-sm text-muted-foreground">Her Zaman Yanınızdayız</div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">WhatsApp üzerinden hızlıca ulaşın</div>
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold text-lg hover:bg-emerald-700 transition"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            ) : (
              <a href="tel:4446502" className="text-3xl font-bold text-secondary hover:text-secondary/80 transition">
                444 65 02
              </a>
            )}
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-end">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <div className="font-bold text-foreground">Sigortalı Taşıma</div>
              <div className="text-sm text-muted-foreground">%100 Güvence Altında</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
