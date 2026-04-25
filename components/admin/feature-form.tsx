'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface FeatureFormProps {
  feature?: {
    id: string
    title: string
    description: string
    icon: string
    order: number
    active: boolean
  }
}

export default function FeatureForm({ feature }: FeatureFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: feature?.title || '',
    description: feature?.description || '',
    icon: feature?.icon || '',
    order: feature?.order || 0,
    active: feature?.active !== undefined ? feature.active : true,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const url = feature ? `/api/features/${feature.id}` : '/api/features'
      const method = feature ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/karakar/ozellikler')
        toast.success(feature ? 'Özellik güncellendi' : 'Özellik oluşturuldu')
        router.refresh()
      }
    } catch (error) {
      toast.error('Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Başlık *
        </label>
        <input
          id="title"
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Açıklama *
        </label>
        <textarea
          id="description"
          required
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="icon" className="block text-sm font-medium mb-2">
          İkon (Lucide Icon Adı)
        </label>
        <input
          id="icon"
          type="text"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Örnek: Users, Shield, Phone
        </p>
      </div>

      <div>
        <label htmlFor="order" className="block text-sm font-medium mb-2">
          Sıra
        </label>
        <input
          id="order"
          type="number"
          value={formData.order}
          onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
          className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="active"
          type="checkbox"
          checked={formData.active}
          onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <label htmlFor="active" className="text-sm font-medium">
          Aktif (Ana sayfada göster)
        </label>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/karakar/ozellikler')}
        >
          İptal
        </Button>
      </div>
    </form>
  )
}
