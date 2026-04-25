'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ImageInput from '@/components/admin/image-input'
import { toast } from 'sonner'

interface GalleryFormProps {
  item?: {
    id: string
    title: string
    description?: string | null
    image: string
    category?: string | null
    order: number
    active: boolean
  }
}

export default function GalleryForm({ item }: GalleryFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: item?.title || '',
    description: item?.description || '',
    image: item?.image || '',
    category: item?.category || '',
    order: item?.order || 0,
    active: item?.active ?? true,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const url = item ? `/api/gallery/${item.id}` : '/api/gallery'
      const method = item ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Kayıt başarısız')

      toast.success(item ? 'Galeri güncellendi' : 'Galeri oluşturuldu')
      router.push('/karakar/galeri')
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
            <label className="block text-sm font-medium mb-2">Başlık *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Açıklama</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2">
            <ImageInput
              label="Görsel"
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Kategori</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Seçiniz</option>
              <option value="vehicles">Araçlarımız</option>
              <option value="packaging">Paketleme</option>
              <option value="other">Diğer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sıra</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2">
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
        <Link href="/karakar/galeri">
          <Button type="button" variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
        </Link>
      </div>
    </form>
  )
}
