'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ImageInput from '@/components/admin/image-input'
import { toast } from 'sonner'

interface PartnerFormProps {
  partner?: {
    id: string
    name: string
    logo: string | null
    website: string | null
    order: number
    active: boolean
  }
}

export default function PartnerForm({ partner }: PartnerFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: partner?.name || '',
    logo: partner?.logo || '',
    website: partner?.website || '',
    order: partner?.order || 0,
    active: partner?.active !== undefined ? partner.active : true,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const url = partner ? `/api/partners/${partner.id}` : '/api/partners'
      const method = partner ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Kayıt başarısız')

      toast.success(partner ? 'Referans güncellendi' : 'Referans oluşturuldu')
      router.push('/karakar/referanslar')
      router.refresh()
    } catch (error) {
      toast.error('Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Firma Adı *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Acme Corporation"
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2">
            <ImageInput
              label="Logo"
              value={formData.logo}
              onChange={(url) => setFormData({ ...formData, logo: url })}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Önerilen boyut: 400x300px (PNG veya SVG tercih edilir)
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Website</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://example.com"
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sıra</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              min="0"
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Küçük sayılar önce gösterilir
            </p>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Aktif</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
        <Link href="/karakar/referanslar">
          <Button type="button" variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
        </Link>
      </div>
    </form>
  )
}
