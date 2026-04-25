'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'

interface SettingsFormProps {
  initialSettings: Record<string, string>
}

export default function SettingsForm({ initialSettings }: SettingsFormProps) {
  const router = useRouter()
  const [settings, setSettings] = useState(initialSettings)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const settingsFields = [
    { key: 'site_title', label: 'Site Başlığı', type: 'text' },
    { key: 'company_name', label: 'Şirket Adı', type: 'text' },
    { key: 'domain', label: 'Domain', type: 'text' },
    { key: 'phone', label: 'Müşteri Hizmetleri', type: 'tel' },
    { key: 'phone2', label: 'Avrupa Yakası', type: 'tel' },
    { key: 'phone3', label: 'Anadolu Yakası', type: 'tel' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'live_chat', label: 'Canlı Destek Link', type: 'text' },
    { key: 'address', label: 'Adres', type: 'textarea' },
    { key: 'whatsapp', label: 'WhatsApp', type: 'tel' },
    { key: 'facebook', label: 'Facebook Link', type: 'url' },
    { key: 'instagram', label: 'Instagram Link', type: 'url' },
    { key: 'twitter', label: 'Twitter/X Link', type: 'url' },
    { key: 'linkedin', label: 'LinkedIn Link', type: 'url' },
    { key: 'youtube', label: 'YouTube Link', type: 'url' },
    { key: 'google_maps', label: 'Google Maps Iframe', type: 'textarea' },
    { key: 'contact_info_description', label: 'İletişim Bilgileri Açıklama', type: 'textarea' },
    { key: 'contact_form_description', label: 'İletişim Formu Açıklama', type: 'textarea' },
    { key: 'footer_description', label: 'Footer Açıklama', type: 'textarea' },
    { key: 'services_description', label: 'Hizmetlerimiz Açıklama', type: 'textarea' },
    { key: 'features_description', label: 'Neden Bizi Tercih Etmelisiniz? Açıklama', type: 'textarea' },
    { key: 'process_description', label: 'Nasıl Çalışır? Açıklama', type: 'textarea' },
    { key: 'faq_description', label: 'SSS Açıklama', type: 'textarea' },
    { key: 'areas_description', label: 'Hizmet Bölgeleri Açıklama', type: 'textarea' },
    { key: 'partners_description', label: 'Çalıştığımız Firmalar Açıklama', type: 'textarea' },
    { key: 'quote_title', label: 'Hızlı Teklif Başlığı', type: 'text' },
    { key: 'quote_description', label: 'Hızlı Teklif Açıklama', type: 'textarea' },
    { key: 'blog_description', label: 'Son Blog Yazıları Açıklama', type: 'textarea' },
    { key: 'seo_title', label: 'SEO Başlık', type: 'text' },
    { key: 'seo_description', label: 'SEO Açıklama', type: 'textarea' },
    { key: 'seo_keywords', label: 'SEO Anahtar Kelimeler', type: 'text' },
  ]

  const pageDescFields = [
    { key: 'page_desc_iletisim', label: 'İletişim Sayfası' },
    { key: 'page_desc_blog', label: 'Blog Sayfası' },
    { key: 'page_desc_hizmetlerimiz', label: 'Hizmetlerimiz Sayfası' },
    { key: 'page_desc_sss', label: 'SSS Sayfası' },
    { key: 'page_desc_referanslar', label: 'Referanslar Sayfası' },
    { key: 'page_desc_teklif_al', label: 'Teklif Al Sayfası' },
    { key: 'page_desc_galeri', label: 'Galeri Sayfası' },
    { key: 'page_desc_hizmet_bolgeleri', label: 'Hizmet Bölgeleri Sayfası' },
  ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (!response.ok) throw new Error('Kayıt başarısız')

      setMessage('Ayarlar başarıyla kaydedildi')
      router.refresh()
    } catch (error) {
      setMessage('Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsFields.map((field) => (
          <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
            <label htmlFor={field.key} className="block text-sm font-medium mb-2">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.key}
                value={settings[field.key] || ''}
                onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
                placeholder={field.key === 'google_maps' ? 'Tam iframe kodunu yapıştırın (örn: <iframe src="..." ...></iframe>)' : ''}
              />
            ) : (
              <input
                id={field.key}
                type={field.type}
                value={settings[field.key] || ''}
                onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            )}
          </div>
        ))}
      </div>

      {/* Sayfa Açıklamaları */}
      <div className="border-t pt-6 space-y-4">
        <h3 className="text-base font-semibold text-foreground">Sayfa Başlık Açıklamaları</h3>
        <p className="text-xs text-muted-foreground">Her sayfanın üst banner&apos;ındaki açıklama metni</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pageDescFields.map((field) => (
            <div key={field.key}>
              <label htmlFor={field.key} className="block text-sm font-medium mb-2">
                {field.label}
              </label>
              <input
                id={field.key}
                type="text"
                value={settings[field.key] || ''}
                onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          ))}
        </div>
      </div>

      {message && (
        <div
          className={`p-3 rounded-md text-sm ${
            message.includes('başarıyla')
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          {message}
        </div>
      )}

      <Button type="submit" disabled={loading}>
        <Save className="w-4 h-4 mr-2" />
        {loading ? 'Kaydediliyor...' : 'Kaydet'}
      </Button>
    </form>
  )
}
