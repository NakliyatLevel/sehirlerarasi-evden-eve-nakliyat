'use client'

import { Clock, Shield } from 'lucide-react'

export default function TrustBar() {
  return (
    <section className="bg-white border-y-2 border-primary/20 py-6">
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
            <div className="text-sm text-muted-foreground mb-1">Ücretsiz Keşif & Danışmanlık</div>
            <a href="tel:4446502" className="text-3xl font-bold text-secondary hover:text-secondary/80 transition">
              444 65 02
            </a>
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
