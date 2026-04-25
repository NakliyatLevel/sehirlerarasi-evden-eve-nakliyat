'use client'

import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const [whatsapp, setWhatsapp] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.whatsapp) setWhatsapp(data.whatsapp)
      })
      .catch(() => {})
  }, [])

  if (!whatsapp) return null

  const whatsappNumber = whatsapp.replace(/[^0-9]/g, '')
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full border border-green-600 hover:bg-green-600 transition z-40 hover:scale-110"
      aria-label="WhatsApp ile iletişime geç"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  )
}
