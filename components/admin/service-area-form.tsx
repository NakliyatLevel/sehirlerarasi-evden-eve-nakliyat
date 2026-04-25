'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import TiptapEditor from '@/components/admin/tiptap-editor'
import ImageInput from '@/components/admin/image-input'

interface ServiceAreaFormProps {
  area?: {
    id: string
    city: string
    slug: string
    description: string | null
    content: string | null
    image: string | null
    metaTitle: string | null
    metaDescription: string | null
    order: number
    active: boolean
  }
}

function generateSlug(text: string): string {
  return text
    .replace(/İ/g, 'i')
    .replace(/I/g, 'i')
    .replace(/Ğ/g, 'g')
    .replace(/Ü/g, 'u')
    .replace(/Ş/g, 's')
    .replace(/Ö/g, 'o')
    .replace(/Ç/g, 'c')
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function ServiceAreaForm({ area }: ServiceAreaFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    city: area?.city || '',
    slug: area?.slug || '',
    description: area?.description || '',
    content: area?.content || '',
    image: area?.image || '',
    metaTitle: area?.metaTitle || '',
    metaDescription: area?.metaDescription || '',
    order: area?.order || 0,
    active: area?.active !== undefined ? area.active : true,
  })

  function handleCityChange(city: string) {
    setFormData({
      ...formData,
      city,
      slug: generateSlug(city),
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const url = area ? `/api/service-areas/${area.id}` : '/api/service-areas'
      const method = area ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Kayıt başarısız')

      toast.success(area ? 'Hizmet bölgesi güncellendi' : 'Hizmet bölgesi oluşturuldu')
      router.push('/karakar/hizmet-bolgeleri')
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
          <div>
            <label className="block text-sm font-medium mb-2">Şehir *</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleCityChange(e.target.value)}
              required
              placeholder="İstanbul"
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Slug *</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              placeholder="istanbul"
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">
              URL: /bolge/{formData.slug || 'slug'}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Kısa Açıklama</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Avrupa ve Anadolu yakasında tüm ilçelere hizmet veriyoruz"
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Liste sayfasında gösterilecek kısa açıklama
            </p>
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

      {/* Görsel */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Bölge Görseli</h3>
        <ImageInput
          value={formData.image}
          onChange={(url) => setFormData({ ...formData, image: url })}
          label="Görsel URL"
        />
      </div>

      {/* İçerik Editörü */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Detaylı İçerik</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Bölge detay sayfasında gösterilecek içeriği yazın
        </p>
        <TiptapEditor
          content={formData.content}
          onChange={(content) => setFormData({ ...formData, content })}
        />
      </div>

      {/* SEO */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h3 className="text-lg font-semibold">SEO Ayarları</h3>
        
        <div>
          <label className="block text-sm font-medium mb-2">Meta Başlık</label>
          <input
            type="text"
            value={formData.metaTitle}
            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
            placeholder={`${formData.city} Evden Eve Nakliyat`}
            className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Meta Açıklama</label>
          <textarea
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
            rows={3}
            placeholder={`${formData.city} ve çevresinde profesyonel evden eve nakliyat hizmeti`}
            className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
        <Link href="/karakar/hizmet-bolgeleri">
          <Button type="button" variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
        </Link>
      </div>
    </form>
  )
}
