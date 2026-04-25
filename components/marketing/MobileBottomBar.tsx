'use client'

import { useEffect, useState } from 'react'
import { Phone, MessageCircle } from 'lucide-react'

export function MobileBottomBar() {
  const [phone, setPhone] = useState<string | null>(null)
  const [whatsapp, setWhatsapp] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.phone) setPhone(data.phone)
        if (data.whatsapp) setWhatsapp(data.whatsapp)
      })
      .catch(() => {})
  }, [])

  if (!phone && !whatsapp) return null

  const whatsappNumber = whatsapp?.replace(/[^0-9]/g, '')
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t border-gray-200 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      {phone && (
        <a
          href={`tel:${phone}`}
          className="flex flex-1 items-center justify-center gap-2 py-4 bg-primary text-white font-semibold text-sm active:opacity-90 transition"
        >
          <Phone className="w-5 h-5" />
          <span>Telefon</span>
        </a>
      )}
      {whatsapp && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 py-4 bg-green-500 text-white font-semibold text-sm active:opacity-90 transition"
        >
          <MessageCircle className="w-5 h-5" />
          <span>WhatsApp</span>
        </a>
      )}
    </div>
  )
}
